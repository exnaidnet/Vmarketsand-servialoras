const db = require('../config/config');

const Category = {};

// Zona de Vmarkets

Category.getAllV = () => {

    const sql = `
        SELECT
            id,
            name,
            description
        FROM
            categoriesv
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
}

Category.createV = (category) => {
    const sql = `
    INSERT INTO
        categoriesv(
            name,
            description,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4) RETURNING id
    `;
    return db.oneOrNone(sql, [
        category.name,
        category.description,
        new Date(),
        new Date()
    ]);
}

// Zona de Servibambi

Category.getAllS = () => {

    const sql = `
        SELECT
            id,
            name,
            description
        FROM
            categoriess
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
}

Category.createS = (category) => {
    const sql = `
    INSERT INTO
        categoriess(
            name,
            description,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4) RETURNING id
    `;
    return db.oneOrNone(sql, [
        category.name,
        category.description,
        new Date(),
        new Date()
    ]);
}

// Zona de Alorasshop

Category.getAllA = () => {

    const sql = `
        SELECT
            id,
            name,
            description
        FROM
            categoriesa
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
}

Category.createA = (category) => {
    const sql = `
    INSERT INTO
        categoriea(
            name,
            description,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4) RETURNING id
    `;
    return db.oneOrNone(sql, [
        category.name,
        category.description,
        new Date(),
        new Date()
    ]);
}

module.exports = Category;