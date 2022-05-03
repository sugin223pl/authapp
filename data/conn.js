var path = require('path');
const conn = require('knex')({
    client: 'better-sqlite3',
    connection: {
        filename: path.join(__dirname, 'db/db.sqlite')
    },
    useNullAsDefault: true
});

module.exports = conn;
