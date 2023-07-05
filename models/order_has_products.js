const db = require('../config/config');

const OrderHasProducts = {};

// Zona Vmarkets

OrderHasProducts.createV = (id_order, id_product, quantity) => {
    const sql = `
    INSERT INTO
        order_has_productsv(
            id_order,
            id_product,
            quantity,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5)
    `;

    return db.none(sql, [
        id_order,
        id_product,
        quantity,
        new Date(),
        new Date()
    ]);
}

// Zona Servibambi 

OrderHasProducts.createS = (id_order, id_product, quantity) => {
    const sql = `
    INSERT INTO
        order_has_productss(
            id_order,
            id_product,
            quantity,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5)
    `;

    return db.none(sql, [
        id_order,
        id_product,
        quantity,
        new Date(),
        new Date()
    ]);
}

// Zona Alorashop

OrderHasProducts.createA = (id_order, id_product, quantity) => {
    const sql = `
    INSERT INTO
        order_has_productsa(
            id_order,
            id_product,
            quantity,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5)
    `;

    return db.none(sql, [
        id_order,
        id_product,
        quantity,
        new Date(),
        new Date()
    ]);
}

module.exports = OrderHasProducts;