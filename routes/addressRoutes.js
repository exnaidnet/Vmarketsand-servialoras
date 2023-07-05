const AddressController = require('../controllers/addressController');
const passport = require('passport');

module.exports = (app) => {

    /*
    * Vmarkets GET ROUTES
    */
   app.get('/api/address/findByUserV/:id_user', passport.authenticate('jwt', {session: false}), AddressController.findByUserV);

    /*
    * POST ROUTES
    */
   app.post('/api/address/createV', passport.authenticate('jwt', {session: false}), AddressController.createV);


    /*
    * Servibambi GET ROUTES
    */
    app.get('/api/address/findByUserS/:id_user', passport.authenticate('jwt', {session: false}), AddressController.findByUserS);

    /*
    * POST ROUTES
    */
   app.post('/api/address/createS', passport.authenticate('jwt', {session: false}), AddressController.createS);



    /*
    * Alorashop GET ROUTES
    */
    app.get('/api/address/findByUserA/:id_user', passport.authenticate('jwt', {session: false}), AddressController.findByUserA);

    /*
    * POST ROUTES
    */
   app.post('/api/address/createA', passport.authenticate('jwt', {session: false}), AddressController.createA);
}