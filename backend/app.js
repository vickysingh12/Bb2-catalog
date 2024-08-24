const express = require('express');
const sequelize = require('./config/database');
const Product = require('./models/Product');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
let finallybuddy = "test";
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Sync database and seed data
sequelize.sync().then(async () => {
  console.log('Database synced');
  
  // Seed default user
  const hashedPassword = await bcrypt.hash('password', 10);
  User.findOrCreate({
    where: { username: 'business_user' },
    defaults: { password: hashedPassword }
  }).then(([user, created]) => {
    if (created) {
      console.log('Default user created');
    } else {
      console.log('Default user already exists');
    }
  });

  // Seed sample products
  const products = [
    {
      dataCategory: 'Firmographic',
      recordCount: 5250,
      fields: 'Company name, Company address, Website'
    },
    {
      dataCategory: 'Demographic',
      recordCount: 10200,
      fields: 'Age, Gender, Income'
    },
    {
      dataCategory: 'Technographic',
      recordCount: 7450,
      fields: 'Technology used, Software, Hardware'
    }
  ];

  for (const product of products) {
    await Product.findOrCreate({
      where: { dataCategory: product.dataCategory },
      defaults: product
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
