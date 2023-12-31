const Category = require('../models/category');

module.exports = {

    async getAllV(req, res, next) {

        try {
            const data = await Category.getAllV();
            console.log(`Categorias ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las categorias',
                error: error,
                success: false
            })
        }

    },

    async createV(req, res, next) {
        try {
            const category = req.body;
            console.log(`Categoria enviada: ${category}`);

            const data = await Category.createV(category);

            return res.status(201).json({
                message: 'La categoria se creo correctamente',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al crear la categoria',
                success: false,
                error: error
            });
        }
    },

    //------> Servibambi 

    async getAllS(req, res, next) {

        try {
            const data = await Category.getAllS();
            console.log(`Categorias ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las categorias',
                error: error,
                success: false
            })
        }

    },

    async createS(req, res, next) {
        try {
            const category = req.body;
            console.log(`Categoria enviada: ${category}`);

            const data = await Category.createS(category);

            return res.status(201).json({
                message: 'La categoria se creo correctamente',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al crear la categoria',
                success: false,
                error: error
            });
        }
    },

    //-------------> Alorashop 

    async getAllA(req, res, next) {

        try {
            const data = await Category.getAllA();
            console.log(`Categorias ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las categorias',
                error: error,
                success: false
            })
        }

    },

    async createA(req, res, next) {
        try {
            const category = req.body;
            console.log(`Categoria enviada: ${category}`);

            const data = await Category.createA(category);

            return res.status(201).json({
                message: 'La categoria se creo correctamente',
                success: true,
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al crear la categoria',
                success: false,
                error: error
            });
        }
    }

}