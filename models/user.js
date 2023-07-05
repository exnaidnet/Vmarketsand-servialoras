const db = require('../config/config');
const crypto = require('crypto');

const User = {};

// Zona Vmarkets

User.getAllV = () => {
    const sql = `
    SELECT 
        *
    FROM
        usersv
    `;

    return db.manyOrNone(sql);
}

User.findByIdV = (id, callback) => {

    const sql = `
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        phone,
        password,
        session_token
    FROM
        usersv
    WHERE
        id = $1`;
    
    return db.oneOrNone(sql, id).then(user => { callback(null, user); })

}

User.findByUserIdV = (id) => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        U.session_token,
        json_agg(
            json_build_object(
                'id', R.id,
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM 
        usersv AS U
    INNER JOIN
        user_has_rolesv AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        rolesv AS R
    ON
        R.id = UHR.id_rol
    WHERE
        U.id = $1
    GROUP BY
        U.id
    `
    return db.oneOrNone(sql, id);
}

User.findDeliveryMenV = () => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        U.session_token
    FROM
        usersv AS U
    INNER JOIN
        user_has_rolesv AS UHR
    ON 
        UHR.id_user = U.id
    INNER JOIN
        rolesv AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 3  
    `;
    return db.manyOrNone(sql);
}

User.findByEmailV = (email) => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        U.session_token,
        json_agg(
            json_build_object(
                'id', R.id,
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM 
        usersv AS U
    INNER JOIN
        user_has_rolesv AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        rolesv AS R
    ON
        R.id = UHR.id_rol
    WHERE
        U.email = $1
    GROUP BY
        U.id
    `
    return db.oneOrNone(sql, email);
}

User.getAdminsNotificationTokensV = () => {
    const sql = `
    SELECT
        U.notification_token
    FROM 
        usersv AS U
    INNER JOIN
        user_has_rolesv AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        rolesv AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 2
    `
    return db.manyOrNone(sql);
}

User.getUserNotificationTokenV = (id) => {
    const sql = `
    SELECT
        U.notification_token
    FROM 
        usersv AS U
    WHERE
        U.id = $1
    `
    return db.oneOrNone(sql, id);
}

User.createV = (user) => {

    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHashed;

    const sql = `
    INSERT INTO
         usersv(
            email,
            name,
            lastname,
            phone,
            image,
            password,
            created_at,
            updated_at
         )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)RETURNING id
    `;

    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date()
    ]);
}

User.updateV = (user) => {
    const sql = `
    UPDATE
        usersv
    SET
        name = $2,
        lastname = $3,
        phone = $4,
        image = $5,
        updated_at = $6
    WHERE
        id = $1
    `;

    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        new Date()
    ]);
}

User.updateTokenV = (id, token) => {
    const sql = `
    UPDATE
        usersv
    SET
        session_token = $2
    WHERE
        id = $1
    `;

    return db.none(sql, [
        id,
        token
    ]);
}

User.updateNotificationTokenV = (id, token) => {
    const sql = `
    UPDATE
        usersv
    SET
        notification_token = $2
    WHERE
        id = $1
    `;

    return db.none(sql, [
        id,
        token
    ]);
}


// Zona Servibambi

User.getAllS = () => {
    const sql = `
    SELECT 
        *
    FROM
        userss
    `;

    return db.manyOrNone(sql);
}

User.findByIdS = (id, callback) => {

    const sql = `
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        phone,
        password,
        session_token
    FROM
        userss
    WHERE
        id = $1`;
    
    return db.oneOrNone(sql, id).then(user => { callback(null, user); })

}

User.findByUserIdS = (id) => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        U.session_token,
        json_agg(
            json_build_object(
                'id', R.id,
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM 
        userss AS U
    INNER JOIN
        user_has_roless AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roless AS R
    ON
        R.id = UHR.id_rol
    WHERE
        U.id = $1
    GROUP BY
        U.id
    `
    return db.oneOrNone(sql, id);
}

User.findDeliveryMenS = () => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        U.session_token
    FROM
        userss AS U
    INNER JOIN
        user_has_roless AS UHR
    ON 
        UHR.id_user = U.id
    INNER JOIN
        roless AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 3  
    `;
    return db.manyOrNone(sql);
}

User.findByEmailS = (email) => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        U.session_token,
        json_agg(
            json_build_object(
                'id', R.id,
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM 
        userss AS U
    INNER JOIN
        user_has_roless AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roless AS R
    ON
        R.id = UHR.id_rol
    WHERE
        U.email = $1
    GROUP BY
        U.id
    `
    return db.oneOrNone(sql, email);
}

User.getAdminsNotificationTokensS = () => {
    const sql = `
    SELECT
        U.notification_token
    FROM 
        userss AS U
    INNER JOIN
        user_has_roless AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roless AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 2
    `
    return db.manyOrNone(sql);
}

User.getUserNotificationTokenS = (id) => {
    const sql = `
    SELECT
        U.notification_token
    FROM 
        userss AS U
    WHERE
        U.id = $1
    `
    return db.oneOrNone(sql, id);
}

User.createS = (user) => {

    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHashed;

    const sql = `
    INSERT INTO
         userss(
            email,
            name,
            lastname,
            phone,
            image,
            password,
            created_at,
            updated_at
         )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)RETURNING id
    `;

    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date()
    ]);
}

User.updateS = (user) => {
    const sql = `
    UPDATE
        userss
    SET
        name = $2,
        lastname = $3,
        phone = $4,
        image = $5,
        updated_at = $6
    WHERE
        id = $1
    `;

    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        new Date()
    ]);
}

User.updateTokenS = (id, token) => {
    const sql = `
    UPDATE
        userss
    SET
        session_token = $2
    WHERE
        id = $1
    `;

    return db.none(sql, [
        id,
        token
    ]);
}

User.updateNotificationTokenS = (id, token) => {
    const sql = `
    UPDATE
        userss
    SET
        notification_token = $2
    WHERE
        id = $1
    `;

    return db.none(sql, [
        id,
        token
    ]);
}

// Zona Alorasshop

User.getAllA = () => {
    const sql = `
    SELECT 
        *
    FROM
        usersa
    `;

    return db.manyOrNone(sql);
}

User.findByIdA = (id, callback) => {

    const sql = `
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        phone,
        password,
        session_token
    FROM
        usersa
    WHERE
        id = $1`;
    
    return db.oneOrNone(sql, id).then(user => { callback(null, user); })

}

User.findByUserIdA = (id) => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        U.session_token,
        json_agg(
            json_build_object(
                'id', R.id,
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM 
        usersa AS U
    INNER JOIN
        user_has_rolesa AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        rolesa AS R
    ON
        R.id = UHR.id_rol
    WHERE
        U.id = $1
    GROUP BY
        U.id
    `
    return db.oneOrNone(sql, id);
}

User.findDeliveryMenA = () => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        U.session_token
    FROM
        usersa AS U
    INNER JOIN
        user_has_rolesa AS UHR
    ON 
        UHR.id_user = U.id
    INNER JOIN
        rolesa AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 3  
    `;
    return db.manyOrNone(sql);
}

User.findByEmailA = (email) => {
    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        U.session_token,
        json_agg(
            json_build_object(
                'id', R.id,
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM 
        usersa AS U
    INNER JOIN
        user_has_rolesa AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        rolesa AS R
    ON
        R.id = UHR.id_rol
    WHERE
        U.email = $1
    GROUP BY
        U.id
    `
    return db.oneOrNone(sql, email);
}

User.getAdminsNotificationTokensA = () => {
    const sql = `
    SELECT
        U.notification_token
    FROM 
        usersa AS U
    INNER JOIN
        user_has_rolesa AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        rolesa AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 2
    `
    return db.manyOrNone(sql);
}

User.getUserNotificationTokenA = (id) => {
    const sql = `
    SELECT
        U.notification_token
    FROM 
        usersa AS U
    WHERE
        U.id = $1
    `
    return db.oneOrNone(sql, id);
}

User.createA = (user) => {

    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHashed;

    const sql = `
    INSERT INTO
         usersa(
            email,
            name,
            lastname,
            phone,
            image,
            password,
            created_at,
            updated_at
         )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)RETURNING id
    `;

    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date()
    ]);
}

User.updateA = (user) => {
    const sql = `
    UPDATE
        usersa
    SET
        name = $2,
        lastname = $3,
        phone = $4,
        image = $5,
        updated_at = $6
    WHERE
        id = $1
    `;

    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        new Date()
    ]);
}

User.updateTokenA = (id, token) => {
    const sql = `
    UPDATE
        usersa
    SET
        session_token = $2
    WHERE
        id = $1
    `;

    return db.none(sql, [
        id,
        token
    ]);
}

User.updateNotificationTokenA = (id, token) => {
    const sql = `
    UPDATE
        usersa
    SET
        notification_token = $2
    WHERE
        id = $1
    `;

    return db.none(sql, [
        id,
        token
    ]);
}

User.isPasswordMatched = (userPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if (myPasswordHashed === hash) {
        return true;
    }
    return false;
}

module.exports = User;