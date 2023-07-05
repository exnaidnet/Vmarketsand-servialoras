const db = require('../config/config');

const Address = {};

// Zona de Vmarkets
Address.findByUserV = (id_user) => {
    const sql = `
    SELECT
        id,
        id_user,
        address,
        neighborhood,
        lat,
        lng
    FROM
        addressv
    WHERE 
        id_user = $1
    `;

    return db.manyOrNone(sql, id_user);
}

Address.createV = (address) => {
    const sql = `
    INSERT INTO
        addressv(
            id_user,
            address,
            neighborhood,
            lat,
            lng,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `;

    return db.oneOrNone(sql, [
        address.id_user,
        address.address,
        address.neighborhood,
        address.lat,
        address.lng,
        new Date(),
        new Date()
    ]);
}

// Zona de Servibambi
Address.findByUserS = (id_user) => {
    const sql = `
    SELECT
        id,
        id_user,
        address,
        neighborhood,
        lat,
        lng
    FROM
        addresss
    WHERE 
        id_user = $1
    `;

    return db.manyOrNone(sql, id_user);
}

Address.createS = (address) => {
    const sql = `
    INSERT INTO
        addresss(
            id_user,
            address,
            neighborhood,
            lat,
            lng,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `;

    return db.oneOrNone(sql, [
        address.id_user,
        address.address,
        address.neighborhood,
        address.lat,
        address.lng,
        new Date(),
        new Date()
    ]);
}

// Zona de Alorashop
Address.findByUserA = (id_user) => {
    const sql = `
    SELECT
        id,
        id_user,
        address,
        neighborhood,
        lat,
        lng
    FROM
        addressa
    WHERE 
        id_user = $1
    `;

    return db.manyOrNone(sql, id_user);
}

Address.createA = (address) => {
    const sql = `
    INSERT INTO
        addressa(
            id_user,
            address,
            neighborhood,
            lat,
            lng,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `;

    return db.oneOrNone(sql, [
        address.id_user,
        address.address,
        address.neighborhood,
        address.lat,
        address.lng,
        new Date(),
        new Date()
    ]);
}

module.exports = Address;


