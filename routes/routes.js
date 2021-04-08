module.exports = (app) => {
    const products = require('../controllers/category.controller.js');

    app.post('/products', products.create);

    app.get('/products', products.findAll);

    app.put('/products', products.update);

    app.delete('/products/category', products.delete);
}