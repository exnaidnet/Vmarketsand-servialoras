const CategoriesController = require('../controllers/categoriesController');
const passport = require('passport');

module.exports = (app) => {

    /*
    *  Vmarkets GET ROUTES
    */
   app.get('/api/categories/getAllV', passport.authenticate('jwt', {session: false}), CategoriesController.getAllV);

    /*
    * POST ROUTES
    */
   app.post('/api/categories/createV', passport.authenticate('jwt', {session: false}), CategoriesController.createV);


    /*
    * Servibambi GET ROUTES
    */
    app.get('/api/categories/getAllS', passport.authenticate('jwt', {session: false}), CategoriesController.getAllS);

    /*
    * POST ROUTES
    */
   app.post('/api/categories/createS', passport.authenticate('jwt', {session: false}), CategoriesController.createS);

    /*
    * Aloras Shop GET ROUTES
    */
    app.get('/api/categories/getAllA', passport.authenticate('jwt', {session: false}), CategoriesController.getAllA);

    /*
    * POST ROUTES
    */
   app.post('/api/categories/createA', passport.authenticate('jwt', {session: false}), CategoriesController.createA);

}