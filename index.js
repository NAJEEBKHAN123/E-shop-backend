const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./Routes/authRoute');
const productRoutes = require('./Routes/productRoutes');
const userRoutes = require('./Routes/userRoutes');
const cartRoutes = require('./Routes/CartRoute');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/uploads/*', (req, res, next) => {
  console.log(`Serving file: ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// ❌ REMOVE `app.listen(PORT)`
// ✅ Export app for Vercel
module.exports = app;
