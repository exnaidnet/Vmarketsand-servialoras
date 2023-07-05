const OrdersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {
    //Vmarkets 
    /*
    * GET ROUTES
    */
   app.get('/api/orders/findByStatusV/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByStatusV);
   app.get('/api/orders/findByDeliveryAndStatusV/:id_delivery/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByDeliveryAndStatusV);
   app.get('/api/orders/findByClientAndStatusV/:id_client/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByClientAndStatusV);

    /*
    * POST ROUTES
    */
   app.post('/api/orders/createV', passport.authenticate('jwt', {session: false}), OrdersController.createV);
   app.post('/api/orders/contraentregaV', passport.authenticate('jwt', {session: false}), OrdersController.contraentregaV);

   
   /*
   * PUT ROUTES
   */
   app.put('/api/orders/updateToDispatchedV', passport.authenticate('jwt', {session: false}), OrdersController.updateToDispatchedV);
   app.put('/api/orders/updateToOnTheWayV', passport.authenticate('jwt', {session: false}), OrdersController.updateToOnTheWayV);
   app.put('/api/orders/updateToDeliveredV', passport.authenticate('jwt', {session: false}), OrdersController.updateToDeliveredV);
   app.put('/api/orders/updateLatLngV', passport.authenticate('jwt', {session: false}), OrdersController.updateLatLngV);


   // Servibambi 

    /*
    * GET ROUTES
    */
    app.get('/api/orders/findByStatusS/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByStatusS);
    app.get('/api/orders/findByDeliveryAndStatusS/:id_delivery/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByDeliveryAndStatusS);
    app.get('/api/orders/findByClientAndStatusS/:id_client/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByClientAndStatusS);
 
     /*
     * POST ROUTES
     */
    app.post('/api/orders/createS', passport.authenticate('jwt', {session: false}), OrdersController.createS);
    app.post('/api/orders/contraentregaS', passport.authenticate('jwt', {session: false}), OrdersController.contraentregaS);
 
    
    /*
    * PUT ROUTES
    */
    app.put('/api/orders/updateToDispatchedS', passport.authenticate('jwt', {session: false}), OrdersController.updateToDispatchedS);
    app.put('/api/orders/updateToOnTheWayS', passport.authenticate('jwt', {session: false}), OrdersController.updateToOnTheWayS);
    app.put('/api/orders/updateToDeliveredS', passport.authenticate('jwt', {session: false}), OrdersController.updateToDeliveredS);
    app.put('/api/orders/updateLatLngS', passport.authenticate('jwt', {session: false}), OrdersController.updateLatLngS);
    
    // Aloras shop 

     /*
    * GET ROUTES
    */
   app.get('/api/orders/findByStatusA/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByStatusA);
   app.get('/api/orders/findByDeliveryAndStatusA/:id_delivery/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByDeliveryAndStatusA);
   app.get('/api/orders/findByClientAndStatusA/:id_client/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByClientAndStatusA);

    /*
    * POST ROUTES
    */
   app.post('/api/orders/createA', passport.authenticate('jwt', {session: false}), OrdersController.createA);
   app.post('/api/orders/contraentregaA', passport.authenticate('jwt', {session: false}), OrdersController.contraentregaA);

   
   /*
   * PUT ROUTES
   */
   app.put('/api/orders/updateToDispatchedA', passport.authenticate('jwt', {session: false}), OrdersController.updateToDispatchedA);
   app.put('/api/orders/updateToOnTheWayA', passport.authenticate('jwt', {session: false}), OrdersController.updateToOnTheWayA);
   app.put('/api/orders/updateToDeliveredA', passport.authenticate('jwt', {session: false}), OrdersController.updateToDeliveredA);
   app.put('/api/orders/updateLatLngA', passport.authenticate('jwt', {session: false}), OrdersController.updateLatLngA);


}