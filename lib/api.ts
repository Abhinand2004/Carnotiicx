const API_BASE_URL = '/api';

export interface Product {
  _id: string;
  productName: string;
  price: number;
  description: string;
  color: string | string[];
  type: 'car' | 'bike' | 'f1';
  discountPercentage: number;
  productImage: string | string[];
  cloudinaryPublicId: string | string[];
  discountedPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: AdminUser;
  };
}

// Public API functions
export const api = {
  // Get all products with optional filters, pagination, and search
  getProducts: async (params?: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ success: boolean; data: Product[]; total: number; page: number; limit: number; count: number }> => {
    const queryParams = new URLSearchParams();
    if (params?.type) queryParams.append('type', params.type);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
    return response.json();
  },

  // Get single product by ID
  getProduct: async (id: string): Promise<{ success: boolean; data: Product; message?: string }> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return response.json();
  },

  // Submit a review for a product
  submitReview: async (id: string, reviewData: { rating: number; comment: string }, token: string): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });
    return response.json();
  },

  // Get products by type
  getProductsByType: async (type: string): Promise<{ success: boolean; data: Product[]; count: number }> => {
    const response = await fetch(`${API_BASE_URL}/products/type/${type}`);
    return response.json();
  },

  // Get discounted products
  getDiscountedProducts: async (): Promise<{ success: boolean; data: Product[]; count: number }> => {
    const response = await fetch(`${API_BASE_URL}/products/featured/discounted`);
    return response.json();
  },
};

// Admin API functions
export const adminApi = {
  // Login
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  },

  // Get all products (admin)
  getProducts: async (token: string): Promise<{ success: boolean; data: Product[] }> => {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Create product
  createProduct: async (token: string, formData: FormData): Promise<{ success: boolean; data: Product; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return response.json();
  },

  // Update product
  updateProduct: async (token: string, id: string, formData: FormData): Promise<{ success: boolean; data: Product; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return response.json();
  },

  // Delete product
  deleteProduct: async (token: string, id: string): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// User Auth API functions
export const authApi = {
  // Login
  login: async (credentials: any): Promise<{ success: boolean; message: string; data?: any; errors?: any }> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  // Register
  register: async (userData: any): Promise<{ success: boolean; message: string; data?: any; errors?: any }> => {
    const isFormData = userData instanceof FormData;
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: isFormData ? {} : {
        'Content-Type': 'application/json',
      },
      body: isFormData ? userData : JSON.stringify(userData),
    });
    return response.json();
  },

  // Get Profile
  getProfile: async (token: string): Promise<{ success: boolean; data?: any; message?: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Update Profile
  updateProfile: async (token: string, userData: any): Promise<{ success: boolean; message: string; data?: any; errors?: any }> => {
    const isFormData = userData instanceof FormData;
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: isFormData ? {
        'Authorization': `Bearer ${token}`,
      } : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: isFormData ? userData : JSON.stringify(userData),
    });
    return response.json();
  },
};

// Utility function to get auth token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken') || localStorage.getItem('userToken');
  }
  return null;
};

// Utility function to set admin token
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminToken', token);
  }
};

// Utility functions for User Token
export const setUserToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userToken', token);
  }
};

export const getUserToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userToken');
  }
  return null;
};

export const removeUserToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userToken');
  }
};

// Utility function to remove all tokens
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
  }
};
