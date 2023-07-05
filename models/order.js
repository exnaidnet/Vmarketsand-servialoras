const db = require('../config/config');

const Order = {};

//Zona Vmarkets
Order.findByStatusV = (status) => {

    const sql = `
    SELECT 
        O.id,
        O.id_client,
        O.id_address,
        O.id_delivery,
        O.status,
        O.timestamp,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P.id,
                'name', P.name,
                'description', P.description,
                'price', P.price,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'quantity', OHP.quantity
            )
        )AS products,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image
        ) AS client,
        JSON_BUILD_OBJECT(
            'id', U2.id,
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image
        ) AS delivery,
        JSON_BUILD_OBJECT(
            'id', A.id,
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address
    FROM 
        ordersv AS O
    INNER JOIN
        usersv AS U
    ON
        O.id_client = U.id	
    LEFT JOIN
        usersv AS U2
    ON
        o.id_delivery = U2.id
    INNER JOIN
        addressv AS A
    ON
        A.id = O.id_address
    INNER JOIN
        order_has_productsv AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        productsv AS P
    ON
        P.id = OHP.id_product
    WHERE
        status = $1
    GROUP BY 
        O.id, U.id, A.id, U2.id;
    `;

    return db.manyOrNone(sql, status);

}

Order.findByDeliveryAndStatusV = (idDelivery, status) => {

    const sql = `
    SELECT 
        O.id,
        O.id_client,
        O.id_address,
        O.id_delivery,
        O.status,
        O.timestamp,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P.id,
                'name', P.name,
                'description', P.description,
                'price', P.price,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'quantity', OHP.quantity
            )
        )AS products,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image
        ) AS client,
        JSON_BUILD_OBJECT(
            'id', U2.id,
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image
        ) AS delivery,
        JSON_BUILD_OBJECT(
            'id', A.id,
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address
    FROM 
        ordersv AS O
    INNER JOIN
        usersv AS U
    ON
        O.id_client = U.id	
    LEFT JOIN
        usersv AS U2
    ON
        o.id_delivery = U2.id
    INNER JOIN
        addressv AS A
    ON
        A.id = O.id_address
    INNER JOIN
        order_has_productsv AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        productsv AS P
    ON
        P.id = OHP.id_product
    WHERE
        O.id_delivery = $1 AND status = $2
    GROUP BY 
        O.id, U.id, A.id, U2.id;
    `;

    return db.manyOrNone(sql,[idDelivery, status ] );

}

Order.findByClientAndStatusV = (id_client, status) => {

    const sql = `
    SELECT 
        O.id,
        O.id_client,
        O.id_address,
        O.id_delivery,
        O.status,
        O.timestamp,
        O.lat,
        O.lng,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P.id,
                'name', P.name,
                'description', P.description,
                'price', P.price,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'quantity', OHP.quantity
            )
        ) AS products,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image
        ) AS client,
		JSON_BUILD_OBJECT(
            'id', U2.id,
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image
        ) AS delivery,
        JSON_BUILD_OBJECT(
            'id', A.id,
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address
    FROM 
        ordersv AS O
    INNER JOIN
        usersv AS U
    ON
        O.id_client = U.id
	LEFT JOIN
		usersv AS U2
	ON
		O.id_delivery = U2.id
    INNER JOIN
        addressv AS A
    ON
        A.id = O.id_address
    INNER JOIN
        order_has_productsv AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        productsv AS P
    ON
        P.id = OHP.id_product
    WHERE
        O.id_client = $1 AND status = $2 
    GROUP BY
        O.id, U.id, A.id, U2.id
    `;

    return db.manyOrNone(sql, [id_client, status]);

}

Order.createV = (order) => {
    const sql = `
    INSERT INTO
        ordersv(
            id_client,
            id_address,
            status,
            timestamp,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6) RETURNING id
    `;

    return db.oneOrNone(sql, [
        order.id_client,
        order.id_address,
        order.status,
        Date.now(),
        new Date(),
        new Date()
    ]);
}

Order.updateV = (order) => {
    const sql = `
    UPDATE
        ordersv
    SET
        id_client = $2,
        id_address = $3,
        id_delivery = $4,
        status = $5,
        updated_at = $6
    WHERE
        id = $1
    `;
    return db.none(sql, [
        order.id,
        order.id_client,
        order.id_address,
        order.id_delivery,
        order.status,
        new Date()
    ]);
}

Order.updateLatLngV = (order) => {
    const sql = `
    UPDATE
        ordersv
    SET
        lat = $2,
        lng = $3
    WHERE
        id = $1
    `;
    return db.none(sql, [
        order.id,
        order.lat,
        order.lng
    ]);
}

// Zona Servibambi 

Order.findByStatusS = (status) => {

    const sql = `
    SELECT 
        O.id,
        O.id_client,
        O.id_address,
        O.id_delivery,
        O.status,
        O.timestamp,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P.id,
                'name', P.name,
                'description', P.description,
                'price', P.price,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'quantity', OHP.quantity
            )
        )AS products,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image
        ) AS client,
        JSON_BUILD_OBJECT(
            'id', U2.id,
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image
        ) AS delivery,
        JSON_BUILD_OBJECT(
            'id', A.id,
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address
    FROM 
        orderss AS O
    INNER JOIN
        userss AS U
    ON
        O.id_client = U.id	
    LEFT JOIN
        userss AS U2
    ON
        o.id_delivery = U2.id
    INNER JOIN
        addresss AS A
    ON
        A.id = O.id_address
    INNER JOIN
        order_has_productss AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        productss AS P
    ON
        P.id = OHP.id_product
    WHERE
        status = $1
    GROUP BY 
        O.id, U.id, A.id, U2.id;
    `;

    return db.manyOrNone(sql, status);

}

Order.findByDeliveryAndStatusS = (idDelivery, status) => {

    const sql = `
    SELECT 
        O.id,
        O.id_client,
        O.id_address,
        O.id_delivery,
        O.status,
        O.timestamp,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P.id,
                'name', P.name,
                'description', P.description,
                'price', P.price,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'quantity', OHP.quantity
            )
        )AS products,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image
        ) AS client,
        JSON_BUILD_OBJECT(
            'id', U2.id,
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image
        ) AS delivery,
        JSON_BUILD_OBJECT(
            'id', A.id,
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address
    FROM 
        orderss AS O
    INNER JOIN
        userss AS U
    ON
        O.id_client = U.id	
    LEFT JOIN
        userss AS U2
    ON
        o.id_delivery = U2.id
    INNER JOIN
        addresss AS A
    ON
        A.id = O.id_address
    INNER JOIN
        order_has_productss AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        productss AS P
    ON
        P.id = OHP.id_product
    WHERE
        O.id_delivery = $1 AND status = $2
    GROUP BY 
        O.id, U.id, A.id, U2.id;
    `;

    return db.manyOrNone(sql,[idDelivery, status ] );

}

Order.findByClientAndStatusS = (id_client, status) => {

    const sql = `
    SELECT 
        O.id,
        O.id_client,
        O.id_address,
        O.id_delivery,
        O.status,
        O.timestamp,
        O.lat,
        O.lng,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P.id,
                'name', P.name,
                'description', P.description,
                'price', P.price,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'quantity', OHP.quantity
            )
        ) AS products,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image
        ) AS client,
		JSON_BUILD_OBJECT(
            'id', U2.id,
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image
        ) AS delivery,
        JSON_BUILD_OBJECT(
            'id', A.id,
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address
    FROM 
        orderss AS O
    INNER JOIN
        userss AS U
    ON
        O.id_client = U.id
	LEFT JOIN
		userss AS U2
	ON
		O.id_delivery = U2.id
    INNER JOIN
        addresss AS A
    ON
        A.id = O.id_address
    INNER JOIN
        order_has_productss AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        productss AS P
    ON
        P.id = OHP.id_product
    WHERE
        O.id_client = $1 AND status = $2 
    GROUP BY
        O.id, U.id, A.id, U2.id
    `;

    return db.manyOrNone(sql, [id_client, status]);

}

Order.createS = (order) => {
    const sql = `
    INSERT INTO
        orderss(
            id_client,
            id_address,
            status,
            timestamp,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6) RETURNING id
    `;

    return db.oneOrNone(sql, [
        order.id_client,
        order.id_address,
        order.status,
        Date.now(),
        new Date(),
        new Date()
    ]);
}

Order.updateS = (order) => {
    const sql = `
    UPDATE
        orderss
    SET
        id_client = $2,
        id_address = $3,
        id_delivery = $4,
        status = $5,
        updated_at = $6
    WHERE
        id = $1
    `;
    return db.none(sql, [
        order.id,
        order.id_client,
        order.id_address,
        order.id_delivery,
        order.status,
        new Date()
    ]);
}

Order.updateLatLngS = (order) => {
    const sql = `
    UPDATE
        orderss
    SET
        lat = $2,
        lng = $3
    WHERE
        id = $1
    `;
    return db.none(sql, [
        order.id,
        order.lat,
        order.lng
    ]);
}

// Zona Alorasshop

Order.findByStatusA = (status) => {

    const sql = `
    SELECT 
        O.id,
        O.id_client,
        O.id_address,
        O.id_delivery,
        O.status,
        O.timestamp,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P.id,
                'name', P.name,
                'description', P.description,
                'price', P.price,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'quantity', OHP.quantity
            )
        )AS products,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image
        ) AS client,
        JSON_BUILD_OBJECT(
            'id', U2.id,
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image
        ) AS delivery,
        JSON_BUILD_OBJECT(
            'id', A.id,
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address
    FROM 
        ordersa AS O
    INNER JOIN
        usersa AS U
    ON
        O.id_client = U.id	
    LEFT JOIN
        usersa AS U2
    ON
        o.id_delivery = U2.id
    INNER JOIN
        addressa AS A
    ON
        A.id = O.id_address
    INNER JOIN
        order_has_productsa AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        productsa AS P
    ON
        P.id = OHP.id_product
    WHERE
        status = $1
    GROUP BY 
        O.id, U.id, A.id, U2.id;
    `;

    return db.manyOrNone(sql, status);

}

Order.findByDeliveryAndStatusA = (idDelivery, status) => {

    const sql = `
    SELECT 
        O.id,
        O.id_client,
        O.id_address,
        O.id_delivery,
        O.status,
        O.timestamp,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P.id,
                'name', P.name,
                'description', P.description,
                'price', P.price,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'quantity', OHP.quantity
            )
        )AS products,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image
        ) AS client,
        JSON_BUILD_OBJECT(
            'id', U2.id,
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image
        ) AS delivery,
        JSON_BUILD_OBJECT(
            'id', A.id,
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address
    FROM 
        ordersa AS O
    INNER JOIN
        usersa AS U
    ON
        O.id_client = U.id	
    LEFT JOIN
        usersa AS U2
    ON
        o.id_delivery = U2.id
    INNER JOIN
        addressa AS A
    ON
        A.id = O.id_address
    INNER JOIN
        order_has_productsa AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        productsa AS P
    ON
        P.id = OHP.id_product
    WHERE
        O.id_delivery = $1 AND status = $2
    GROUP BY 
        O.id, U.id, A.id, U2.id;
    `;

    return db.manyOrNone(sql,[idDelivery, status ] );

}

Order.findByClientAndStatusA = (id_client, status) => {

    const sql = `
    SELECT 
        O.id,
        O.id_client,
        O.id_address,
        O.id_delivery,
        O.status,
        O.timestamp,
        O.lat,
        O.lng,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P.id,
                'name', P.name,
                'description', P.description,
                'price', P.price,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'quantity', OHP.quantity
            )
        ) AS products,
        JSON_BUILD_OBJECT(
            'id', U.id,
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image
        ) AS client,
		JSON_BUILD_OBJECT(
            'id', U2.id,
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image
        ) AS delivery,
        JSON_BUILD_OBJECT(
            'id', A.id,
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address
    FROM 
        ordersa AS O
    INNER JOIN
        usersa AS U
    ON
        O.id_client = U.id
	LEFT JOIN
		usersa AS U2
	ON
		O.id_delivery = U2.id
    INNER JOIN
        addressa AS A
    ON
        A.id = O.id_address
    INNER JOIN
        order_has_productsa AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        productsa AS P
    ON
        P.id = OHP.id_product
    WHERE
        O.id_client = $1 AND status = $2 
    GROUP BY
        O.id, U.id, A.id, U2.id
    `;

    return db.manyOrNone(sql, [id_client, status]);

}

Order.createA = (order) => {
    const sql = `
    INSERT INTO
        ordersa(
            id_client,
            id_address,
            status,
            timestamp,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6) RETURNING id
    `;

    return db.oneOrNone(sql, [
        order.id_client,
        order.id_address,
        order.status,
        Date.now(),
        new Date(),
        new Date()
    ]);
}

Order.updateA = (order) => {
    const sql = `
    UPDATE
        ordersa
    SET
        id_client = $2,
        id_address = $3,
        id_delivery = $4,
        status = $5,
        updated_at = $6
    WHERE
        id = $1
    `;
    return db.none(sql, [
        order.id,
        order.id_client,
        order.id_address,
        order.id_delivery,
        order.status,
        new Date()
    ]);
}

Order.updateLatLngA = (order) => {
    const sql = `
    UPDATE
        ordersa
    SET
        lat = $2,
        lng = $3
    WHERE
        id = $1
    `;
    return db.none(sql, [
        order.id,
        order.lat,
        order.lng
    ]);
}


module.exports = Order;