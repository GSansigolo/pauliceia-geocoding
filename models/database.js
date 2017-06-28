const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:teste@localhost/db_pauliceia';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query('select * from tb_street');
console.log('Done!')
query.on('end', () => { client.end(); });

