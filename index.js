const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./Routes/authRoute');
const productRoutes = require('./Routes/productRoutes');
const userRoutes = require('./Routes/userRoutes');
const cartRoutes = require('./Routes/CartRoute');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

// Enable CORS for your frontend
app.use(cors({
  origin: 'https://e-shop-frontend-ten.vercel.app', // Replace with your frontend URL
  credentials: true, // Allow cookies and credentials
}));

// Middleware
app.use(express.json());

// Static folder for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});