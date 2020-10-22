const productsMock = require('../utils/mocks/products');

class ProductsService {
  constructor() {}

  getProducts({ tags }) {
    return Promise.resolve(productsMock);
  }

  getProduct({ productId }) {
    return Promise.resolve(productsMock[0]);
  }

  createProduct({ product }) {
    return Promise.resolve(productsMock[0]);
  }

  updateProduct({ productId, product }) {
    return Promise.resolve(productsMock[0]);
  }

  deleteProduct({ productId }) {
    return Promise.resolve(productsMock[0]);
  }
}

module.exports = ProductsService;