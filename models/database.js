const pg = require('pg');

const db_user = process.env.DATABASE_USER || "postgres";
const db_pass = process.env.DATABASE_PASS || "teste";
const db_host = process.env.DATABASE_HOST || "localhost";
const db_name = process.env.DATABASE_NAME || "db_pauliceia";

//console.log("-user: "+db_user+" -pass: "+db_pass+" -host: "+db_host+" -name: "+db_name);

const connectionString = {
  host: db_host,
  port: 5432,
  user: db_user,
  database: db_name,
  password: db_pass
}

const client = new pg.Client(connectionString);

const query = connectionString.query('select * from tb_street');
console.log('Done!')
query.on('end', () => { connectionString.end(); });

