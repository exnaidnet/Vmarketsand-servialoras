const db = require('../config/config');

const Shops = {};

// Zona Vmarkets

Shops.getAllV = () => {

    const sql = `
        SELECT
            id,
            name,
            description,
            create_for
        FROM
            tiendasv
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
}

Shops.createV = (shops) => {
    const sql = `
    INSERT INTO
        tiendasv(
            name,
            description,
            create_for,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4, $5) RETURNING id
    `;
    return db.oneOrNone(sql, [
        shops.name,
        shops.description,
        shops.created_for,
        new Date(),
        new Date()
    ]);
}

//Zona Servibambi 

Shops.getAllS = () => {

    const sql = `
        SELECT
            id,
            name,
            description,
            create_for
        FROM
            tiendass
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
}

Shops.createS = (shops) => {
    const sql = `
    INSERT INTO
        tiendass(
            name,
            description,
            create_for,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4, $5) RETURNING id
    `;
    return db.oneOrNone(sql, [
        shops.name,
        shops.description,
        shops.created_for,
        new Date(),
        new Date()
    ]);
}

//Zona AlorasShop 

Shops.getAllA = () => {

    const sql = `
        SELECT
            id,
            name,
            description,
            create_for
        FROM
            tiendasa
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
}

Shops.createA = (shops) => {
    const sql = `
    INSERT INTO
        tiendasa(
            name,
            description,
            create_for,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4, $5) RETURNING id
    `;
    return db.oneOrNone(sql, [
        shops.name,
        shops.description,
        shops.created_for,
        new Date(),
        new Date()
    ]);
}




module.exports = Shops;