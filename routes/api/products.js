const express = require('express');
const passport = require('passport');

const Joi = require('joi');

const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
} = require('../../utils/schemas/products');

// JWT strategy
require('../../utils/auth/strategies/jwt');

const validation = require('../../utils/middlewares/validationHandler');

const ProductService = require('../../services/products');
const productService = new ProductService();

function productsApi(app) {
  const router = express.Router();
  app.use('/api/products', router);

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;
    try {
      const products = await productService.getProducts({ tags });
      res.status(200).json({
        data: products,
        message: 'products listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:productId', async function (req, res, next) {
    const { productId } = req.params;
    try {
      const product = await productService.getProduct({ productId });
      res.status(200).json({
        data: product,
        message: 'products listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', validation(createProductSchema), async function (req, res, next) {
    const { body: product } = req;
    try {
      const createdProduct = await productService.createProduct({ product });
      res.status(201).json({
        data: createdProduct,
        message: 'product created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    validation(Joi.object({ productId: productIdSchema }), 'params'),
    validation(updateProductSchema),
    async function (req, res, next) {
      const { productId } = req.params;
      const { body: product } = req;
      try {
        const updatedProduct = await productService.updateProduct({ productId, product });
        res.status(200).json({
          data: updatedProduct,
          message: 'product updated',
        });
      } catch (error) {
        next(error);
      }
    },
  );

  router.delete('/:productId', passport.authenticate('jwt', { session: false }), async function (
    req,
    res,
    next,
  ) {
    const { productId } = req.params;
    try {
      const deletedProduct = await productService.deleteProduct({ productId });
      res.status(200).json({
        data: deletedProduct,
        message: 'product deleted',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = productsApi;
