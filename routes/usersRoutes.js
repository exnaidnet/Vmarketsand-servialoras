const UsersController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app, upload) => {
    // Vmarkets
    // TRAER DATOS
    app.get('/api/users/getAllV', UsersController.getAllV);
    app.get('/api/users/findByIdV/:id', passport.authenticate('jwt', {session:false}),UsersController.findByIdV);
    app.get('/api/users/findDeliveryMenV', passport.authenticate('jwt', {session: false}), UsersController.findDeliveryMenV);
    app.get('/api/users/getAdminsNotificationTokensV', passport.authenticate('jwt', {session: false}), UsersController.getAdminsNotificationTokensV);

    // GUARDAR DATOS
    app.post('/api/users/createV', upload.array('image', 1), UsersController.registerWithImageV);
    app.post('/api/users/loginV', UsersController.loginV);
    app.post('/api/users/logoutV', UsersController.logoutV);

    // ACTUALIZAR DATOS
    app.put('/api/users/updateV', passport.authenticate('jwt', {session:false}), upload.array('image', 1), UsersController.updateV );
    app.put('/api/users/updateNotificationTokenV', UsersController.updateNotificationTokenV);

    // Servibambi 
     // TRAER DATOS
     app.get('/api/users/getAllS', UsersController.getAllS);
     app.get('/api/users/findByIdS/:id', passport.authenticate('jwt', {session:false}),UsersController.findByIdS);
     app.get('/api/users/findDeliveryMenS', passport.authenticate('jwt', {session: false}), UsersController.findDeliveryMenS);
     app.get('/api/users/getAdminsNotificationTokensS', passport.authenticate('jwt', {session: false}), UsersController.getAdminsNotificationTokensS);
 
     // GUARDAR DATOS
     app.post('/api/users/createS', upload.array('image', 1), UsersController.registerWithImageS);
     app.post('/api/users/loginS', UsersController.loginS);
     app.post('/api/users/logoutS', UsersController.logoutS);
 
     // ACTUALIZAR DATOS
     app.put('/api/users/updateS', passport.authenticate('jwt', {session:false}), upload.array('image', 1), UsersController.updateS );
     app.put('/api/users/updateNotificationTokenS', UsersController.updateNotificationTokenS);

     //AlorasShop 
      // TRAER DATOS
    app.get('/api/users/getAllA', UsersController.getAllA);
    app.get('/api/users/findByIdA/:id', passport.authenticate('jwt', {session:false}),UsersController.findByIdA);
    app.get('/api/users/findDeliveryMenA', passport.authenticate('jwt', {session: false}), UsersController.findDeliveryMenA);
    app.get('/api/users/getAdminsNotificationTokensA', passport.authenticate('jwt', {session: false}), UsersController.getAdminsNotificationTokensA);

    // GUARDAR DATOS
    app.post('/api/users/createA', upload.array('image', 1), UsersController.registerWithImageA);
    app.post('/api/users/loginA', UsersController.loginA);
    app.post('/api/users/logoutA', UsersController.logoutA);

    // ACTUALIZAR DATOS
    app.put('/api/users/updateA', passport.authenticate('jwt', {session:false}), upload.array('image', 1), UsersController.updateA );
    app.put('/api/users/updateNotificationToken', UsersController.updateNotificationTokenA);

}