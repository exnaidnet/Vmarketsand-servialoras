const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue){
    return stringValue;
});

const databaseConfig = {
    'host': 'db-postgresql-sfo3-44369-vsa-do-user-11075757-0.b.db.ondigitalocean.com',
    'port': 25060,
    'database': 'defaultdb',
    'user': 'doadmin',
    'password': 'AVNS_SkY_fOKNX3BF33ghRYi',
    'sslmode' : require,
};

const db = pgp(databaseConfig);

module.exports = db;

//clave digital icean LocoFerr27=)ferr