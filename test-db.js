
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    console.error('MONGODB_URL not found in .env');
    process.exit(1);
}

console.log('Attempting to connect to MongoDB...');
mongoose.connect(MONGODB_URL, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('Successfully connected to MongoDB!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    });
