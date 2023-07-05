const Shops = require('../models/shop');

module.exports = {
// Zona Vmarkets
    async getAllV(req, res, next) {

        try {
            const data = await Shops.getAllV();
            console.log(`Tiendas ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las tiendas',
                error: error,
                success: false
            })
        }

    },

    async createV(req, res, next) {
        try {
            const shop = req.body;
            console.log(`Tienda enviada: ${shop}`);

            const data = await Shops.createV(shop);

            return res.status(201).json({
                message: 'La tienda se creo correctamente',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al crear la tienda',
                success: false,
                error: error
            });
        }
    },

    // Zona Servibambi 

    async getAllS(req, res, next) {

        try {
            const data = await Shops.getAllS();
            console.log(`Tiendas ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las tiendas',
                error: error,
                success: false
            })
        }

    },

    async createS(req, res, next) {
        try {
            const shop = req.body;
            console.log(`Tienda enviada: ${shop}`);

            const data = await Shops.createS(shop);

            return res.status(201).json({
                message: 'La tienda se creo correctamente',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al crear la tienda',
                success: false,
                error: error
            });
        }
    },

    // Zona Alorasshop 

    async getAllA(req, res, next) {

        try {
            const data = await Shops.getAllA();
            console.log(`Tiendas ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las tiendas',
                error: error,
                success: false
            })
        }

    },

    async createA(req, res, next) {
        try {
            const shop = req.body;
            console.log(`Tienda enviada: ${shop}`);

            const data = await Shops.createA(shop);

            return res.status(201).json({
                message: 'La tienda se creo correctamente',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al crear la tienda',
                success: false,
                error: error
            });
        }
    }

}