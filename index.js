const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const productRouter = require('./routes/products');
const productsApiRouter = require('./routes/api/products');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/products', productRouter);
app.use('/api/products', productsApiRouter);

app.use(bodyParser.json());

const server = app.listen(3000, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
});
