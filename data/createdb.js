const conn = require('./conn.js');

conn.schema.hasTable('users').then(function(exists) {
    console.log('Table exists? ', exists);
    if (!exists) {
        conn.schema.createTable('users', function(table) {
            table.increments('id').primary();
            table.string('name', 100).nullable();
            table.string('firstName', 50).nullable();
            table.string('lastName', 50).nullable();
            table.string('email', 100).nullable();
            table.string('password', 100);
            table.string('avatar', 255).nullable();
            table.string('provider', 50);
            table.integer('provider_id').unique();
            table.timestamps();
        }).then(function(table) {
            console.log('table created');
            console.log(table.toString());
        }).catch(function(err) {
            console.log('Error: ', err);
        });
    } else {
        console.log('Table users already exists');
    }
});