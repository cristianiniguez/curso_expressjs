const express = require('express');
const path = require('path');
const app = express();
const productRouter = require('./routes/products');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/products', productRouter);

const server = app.listen(3000, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
});
