const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

const mercadopago = require('mercadopago');

/* Mercado pago Configuracion */
mercadopago.configure({
    access_token: 'TEST-6865763280561961-091819-a1a70e670b628a4c98a4fa9bc897f522-829418553'
});

/* SOCKETS*/
const orderDeliverySocket = require('./sockets/orders_delivery_socket');

/* INICIALIZACION DE FIREBASE ADMIN */

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)

})
const upload = multer({
    storage: multer.memoryStorage()
})

/*Rutas*/
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const shops = require('./routes/shopsRoutes');
const products = require('./routes/productsRoutes');
const address = require('./routes/addressRoutes');
const orders = require('./routes/ordersRoutes');
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');


app.set('port', port);
//LLAMAR LOS SOCKETS    
orderDeliverySocket(io);

users(app, upload );
shops(app);
categories(app);
address(app);
orders(app);
products(app, upload );
mercadoPagoRoutes(app);



server.listen(3000, '24.199.69.187' || 'localhost', function(){
    console.log('Aplicacion de Node Vmarket, servibamvi, alorasshop en el puerto: ' + port + ' iniciada...')
});




// ERROR HANDLER

app.use((err, req, res, next) =>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

// 200 = RESPUESTA EXITOSA
// 404 = URL NO EXISTE
// 500 = ERROR SERVIDOR INTERNO 

module.exports = {
    app:app,
    server: server
}