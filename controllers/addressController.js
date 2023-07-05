const Address = require('../models/address');


module.exports = {

    async findByUserV(req, res, next) {

        try {
            const id_user = req.params.id_user;
            const data = await Address.findByUserV(id_user);
            console.log(`Address ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las direcciones',
                error: error,
                success: false
            })
        }

    },

    async createV(req, res, next) {
        try {
            
            const address = req.body;
            const data = await Address.createV(address);

            return res.status(201).json({
                success: true,
                message: 'La direccion se creo correctamente',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la direccion',
                error: error
            });
        }
    },

    // -> Servibambi

    async findByUserS(req, res, next) {

        try {
            const id_user = req.params.id_user;
            const data = await Address.findByUserS(id_user);
            console.log(`Address ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las direcciones',
                error: error,
                success: false
            })
        }

    },

    async createS(req, res, next) {
        try {
            
            const address = req.body;
            const data = await Address.createS(address);

            return res.status(201).json({
                success: true,
                message: 'La direccion se creo correctamente',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la direccion',
                error: error
            });
        }
    },

    // -> Alorashop 

    async findByUserA(req, res, next) {

        try {
            const id_user = req.params.id_user;
            const data = await Address.findByUserA(id_user);
            console.log(`Address ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las direcciones',
                error: error,
                success: false
            })
        }

    },

    async createA(req, res, next) {
        try {
            
            const address = req.body;
            const data = await Address.createA(address);

            return res.status(201).json({
                success: true,
                message: 'La direccion se creo correctamente',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la direccion',
                error: error
            });
        }
    }

}