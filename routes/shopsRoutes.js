const shopsController = require('../controllers/shopsController');
const passport = require('passport');

module.exports = (app) => {

    /*
    * GET ROUTES
    */
   app.get('/api/shops/getAllV', passport.authenticate('jwt', {session: false}), shopsController.getAllV);

    /*
    * POST ROUTES
    */
   app.post('/api/shops/createV', passport.authenticate('jwt', {session: false}), shopsController.createV);


   // servibambi 

    /*
    * GET ROUTES
    */
    app.get('/api/shops/getAllS', passport.authenticate('jwt', {session: false}), shopsController.getAllS);

    /*
    * POST ROUTES
    */
   app.post('/api/shops/createS', passport.authenticate('jwt', {session: false}), shopsController.createS);

   // Aloras shop 

    /*
    * GET ROUTES
    */
    app.get('/api/shops/getAllA', passport.authenticate('jwt', {session: false}), shopsController.getAllA);

    /*
    * POST ROUTES
    */
   app.post('/api/shops/createA', passport.authenticate('jwt', {session: false}), shopsController.createA);


}