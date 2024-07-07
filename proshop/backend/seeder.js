import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

async function importData() {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const admin = createdUsers[0]._id;
    const sampleProducts = products.map((product) => ({
      ...product,
      user: admin,
    }));
    await Product.insertMany(sampleProducts);
    console.log('Data have been seeded');
    process.exit();
  } catch (error) {
    console.log('Failed to seed data', error);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data have been destroed');
    process.exit();
  } catch (error) {
    console.log('Failed to destroy data', error);
    process.exit(1);
  }
}

switch (process.argv[2]) {
  case '-d':
    destroyData();
    break;
  default:
    importData();
}
