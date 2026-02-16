"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi, getUserToken, removeAuthToken } from "@/lib/api";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
    });
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleAuthError = (status: number) => {
        if (status === 401 || status === 403) {
            removeAuthToken();
            router.push("/login");
            return true;
        }
        return false;
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const token = getUserToken();
            if (!token) {
                router.push("/login");
                return;
            }

            try {
                const response = await authApi.getProfile(token);
                if (handleAuthError(response.status)) return;

                if (response.success) {
                    setUser(response.data);
                    setFormData({
                        firstName: response.data.firstName || "",
                        lastName: response.data.lastName || "",
                        email: response.data.email || "",
                        phone: response.data.phone || "",
                        password: ""
                    });
                    setPreviewUrl(response.data.profilePhoto || null);
                } else {
                    setError(response.message || "Failed to load profile");
                }
            } catch (err) {
                setError("Something went wrong loading your profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    const handleLogout = () => {
        removeAuthToken();
        router.push("/login");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfilePhoto(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdateLoading(true);
        setError(null);
        setUpdateSuccess(false);

        const token = getUserToken();
        if (!token) return;

        try {
            const data = new FormData();
            data.append("firstName", formData.firstName);
            data.append("lastName", formData.lastName);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            if (formData.password) {
                data.append("password", formData.password);
            }
            if (profilePhoto) {
                data.append("profilePhoto", profilePhoto);
            }

            const response = await authApi.updateProfile(token, data);
            if (handleAuthError(response.status)) return;

            if (response.success) {
                setUser(response.data);
                setIsEditing(false);
                setUpdateSuccess(true);
                setProfilePhoto(null);
                // Clear success message after 3 seconds
                setTimeout(() => setUpdateSuccess(false), 3000);
            } else {
                setError(response.message || "Update failed");
            }
        } catch (err) {
            setError("Something went wrong updating your profile.");
        } finally {
            setUpdateLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="bg-background-dark text-white min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-border-dark/50 bg-background-dark/90 backdrop-blur-md">
                <div className="max-w-[1440px] mx-auto text-slate-900 dark:text-white">
                    <Navbar />
                </div>
            </header>

            <main className="flex-grow max-w-[1440px] mx-auto px-4 sm:px-6 py-8 md:py-12 w-full">
                <div className="max-w-2xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-8">
                        <div className="flex items-center gap-6">
                            {/* Avatar Display */}
                            <div className="relative group">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[3px] bg-gradient-to-tr from-primary via-red-500 to-primary/20 shadow-2xl">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-background-dark flex items-center justify-center border-2 border-surface-dark">
                                        {user?.profilePhoto ? (
                                            <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="material-symbols-outlined text-gray-700 text-4xl">account_circle</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">My Garage</h1>
                                <p className="text-gray-400 mt-1 uppercase text-[10px] md:text-xs font-bold tracking-widest">Profile & Settings</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center justify-center gap-2 border border-primary/20 px-4 py-3 sm:py-2 rounded-lg hover:bg-primary/10 w-full sm:w-auto"
                        >
                            <span className="material-symbols-outlined text-[18px]">logout</span>
                            Logout
                        </button>
                    </div>

                    <div className="bg-surface-dark border border-border-dark rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                        <div className="h-1.5 md:h-2 w-full bg-gradient-to-r from-primary via-red-500 to-primary/50"></div>

                        <div className="p-6 md:p-10">
                            {updateSuccess && (
                                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded text-green-500 text-xs md:text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined">check_circle</span>
                                    Profile updated successfully!
                                </div>
                            )}

                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-xs md:text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined">error</span>
                                    {error}
                                </div>
                            )}

                            {!isEditing ? (
                                <div className="space-y-6 md:space-y-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                        <div>
                                            <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">First Name</h3>
                                            <p className="text-lg md:text-xl font-bold">{user?.firstName}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Last Name</h3>
                                            <p className="text-lg md:text-xl font-bold">{user?.lastName}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Email Address</h3>
                                        <p className="text-lg md:text-xl font-bold break-all">{user?.email}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Phone Number</h3>
                                        <p className="text-lg md:text-xl font-bold">{user?.phone || <span className="text-gray-600 italic font-normal text-sm">Not provided</span>}</p>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="w-full h-14 bg-white hover:bg-gray-100 text-black font-extrabold uppercase tracking-widest text-sm rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined">edit</span>
                                            Update Profile
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Edit Mode Photo Upload */}
                                    <div className="flex flex-col items-center mb-8">
                                        <div
                                            className="relative group cursor-pointer"
                                            onClick={() => document.getElementById('profilePhoto')?.click()}
                                        >
                                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-border-dark group-hover:border-primary transition-colors overflow-hidden flex items-center justify-center bg-background-dark">
                                                {previewUrl ? (
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="material-symbols-outlined text-gray-600 text-4xl">add_a_photo</span>
                                                )}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 bg-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-white text-sm">upload</span>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            id="profilePhoto"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mt-3">Change Profile Photo</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500" htmlFor="firstName">First Name</label>
                                            <input
                                                className="w-full h-12 bg-background-dark border border-border-dark rounded px-4 text-white text-sm focus:outline-none focus:border-primary transition-all"
                                                id="firstName"
                                                type="text"
                                                required
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500" htmlFor="lastName">Last Name</label>
                                            <input
                                                className="w-full h-12 bg-background-dark border border-border-dark rounded px-4 text-white text-sm focus:outline-none focus:border-primary transition-all"
                                                id="lastName"
                                                type="text"
                                                required
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500" htmlFor="email">Email Address</label>
                                        <input
                                            className="w-full h-12 bg-background-dark border border-border-dark rounded px-4 text-white text-sm focus:outline-none focus:border-primary transition-all"
                                            id="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500" htmlFor="phone">Phone Number</label>
                                        <input
                                            className="w-full h-12 bg-background-dark border border-border-dark rounded px-4 text-white text-sm focus:outline-none focus:border-primary transition-all"
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500" htmlFor="password">Change Password</label>
                                            <span className="text-[10px] text-gray-600 uppercase font-bold px-2 py-0.5 rounded border border-border-dark">Optional</span>
                                        </div>
                                        <input
                                            className="w-full h-12 bg-background-dark border border-border-dark rounded px-4 text-white text-sm focus:outline-none focus:border-primary transition-all placeholder-gray-800"
                                            id="password"
                                            type="password"
                                            placeholder="Leave blank to keep current"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-4 pt-4">
                                        <button
                                            type="submit"
                                            disabled={updateLoading}
                                            className="flex-1 h-14 bg-primary hover:bg-red-600 text-white font-extrabold uppercase tracking-widest text-sm rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {updateLoading ? "Saving..." : "Save Changes"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 h-14 bg-transparent border border-border-dark hover:border-gray-500 text-white font-extrabold uppercase tracking-widest text-sm rounded-lg transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
