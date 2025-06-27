const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const User = require('./models/UserModel'); // import model
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

//authentication
app.use('/api/auth',authRoutes);

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


