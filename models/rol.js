const db = require('../config/config');

const Rol = {};

//Zona Vmarkets

Rol.createV = (id_user, id_rol) => {
    const sql = `
    INSERT INTO
        user_has_rolesv(
            id_user,
            id_rol,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4)
    `;

    return db.none(sql, [
        id_user,
        id_rol,
        new Date(),
        new Date()
    ]);
}

//Zona Servibambi

Rol.createS = (id_user, id_rol) => {
    const sql = `
    INSERT INTO
        user_has_roless(
            id_user,
            id_rol,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4)
    `;

    return db.none(sql, [
        id_user,
        id_rol,
        new Date(),
        new Date()
    ]);
}

//Zona Alorashop

Rol.createA = (id_user, id_rol) => {
    const sql = `
    INSERT INTO
        user_has_rolesa(
            id_user,
            id_rol,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4)
    `;

    return db.none(sql, [
        id_user,
        id_rol,
        new Date(),
        new Date()
    ]);
}



module.exports = Rol;