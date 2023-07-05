const ProductsController = require('../controllers/productsController');
const passport = require('passport');

module.exports = (app, upload) => {
    // Vmarkets
    app.get('/api/products/findByCategoryV/:id_category', passport.authenticate('jwt', {session: false}), ProductsController.findByCategoryV);
    app.get('/api/products/findByCategoryAndProductNameV/:id_category/:product_name', passport.authenticate('jwt', {session: false}), ProductsController.findByCategoryAndProductNameV);

    app.post('/api/products/createV', passport.authenticate('jwt', {session: false}), upload.array('image', 3), ProductsController.createV);

     // Sertvibambi 
     app.get('/api/products/findByCategoryS/:id_category', passport.authenticate('jwt', {session: false}), ProductsController.findByCategoryS);
     app.get('/api/products/findByCategoryAndProductNameS/:id_category/:product_name', passport.authenticate('jwt', {session: false}), ProductsController.findByCategoryAndProductNameS);
 
     app.post('/api/products/createS', passport.authenticate('jwt', {session: false}), upload.array('image', 3), ProductsController.createS);
 
      // Aloras shop 
    app.get('/api/products/findByCategoryA/:id_category', passport.authenticate('jwt', {session: false}), ProductsController.findByCategoryA);
    app.get('/api/products/findByCategoryAndProductNameA/:id_category/:product_name', passport.authenticate('jwt', {session: false}), ProductsController.findByCategoryAndProductNameA);

    app.post('/api/products/createA', passport.authenticate('jwt', {session: false}), upload.array('image', 3), ProductsController.createA);


}