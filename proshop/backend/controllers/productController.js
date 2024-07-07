import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    res.status(400);
    throw new Error('Product not found');
  }
  res.json(product);
});
