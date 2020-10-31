const express = require('express');
const router = express.Router();

const ProductService = require('../../services/products');
const productService = new ProductService();

const config = require('../../config');

router.get('/', async function (req, res, next) {
  const { tags } = req.query;
  try {
    const products = await productService.getProducts({ tags });
    res.render('products', { products, dev: config.dev });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
