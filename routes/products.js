const express = require('express');
const router = express.Router();

const products = [
  {
    name: 'Red shoes',
    price: 75,
    image:
      'https://images.unsplash.com/photo-1514996242687-4d78a2f38ad4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Black bike',
    price: 300,
    image:
      'https://images.unsplash.com/photo-1529929353612-a4320ffeba41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
];

router.get('/', function (req, res) {
  res.render('products', { products });
});

module.exports = router;
