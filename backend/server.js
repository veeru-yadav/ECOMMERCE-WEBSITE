const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const User = require('./models/UserModel'); // import model
const Product = require('./models/ProductModel');
const Cart = require('./models/CartModel');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const path = require('path');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

//authentication
app.use('/api/auth',authRoutes);

//User profile
app.use('/api/user', userRoutes);

//products
app.use('/api/products', productRoutes);
// Serve static files from /public
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

//cart
app.use('/api', cartRoutes);

//order
app.use('/api', orderRoutes);

const protectedRoutes = require('./routes/protectedRoutes');
app.use('/api/protected', protectedRoutes);


// Connect DB and start server
sequelize.authenticate()
  .then(() => {
    console.log('MySQL connected...');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.log('DB connection error:', err));

sequelize.sync({ alter: true }) // sync DB
  .then(() => {
    console.log('All models synced.');
  })
  .catch((err) => {
    console.error('Error syncing models:', err);
  });


