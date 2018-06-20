/*--------------------------------------------------+
| Connection                                        |
+-------------------------------------------------*/
const pg = require('pg');

const db_user = process.env.DATABASE_USER || "postgres";
const db_pass = process.env.DATABASE_PASS || "teste";
const db_host = process.env.DATABASE_HOST || "localhost";
const db_name = process.env.DATABASE_NAME || "db_pauliceia";

const connectionString = {
  host: db_host,
  port: 5432,
  user: db_user,
  database: db_name,
  password: db_pass
}

const client = new pg.Client(connectionString);

client.connect();

//line -> geometria do rua
//point-> geometria do ponto

exports.lineMerge = function(line){

    //Results Variable
    var results;
  
    //Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
      
      //Handle connection errors
      if(err) {
        done();
        console.log(err);
        //return res.status(500).json({success: false, data: err});
      }

    //Build the SQL Query
    const SQL_Query_Select_List = "select St_asText(ST_LineMerge($1));";

    //Execute SQL Query
    const query = client.query(SQL_Query_Select_List,[line]);
  
      //Push Results
      query.on('row', (row) => {
        results = row.st_astext;
      });
  
      //After all data is returned, close connection and return results
      query.on('end', () => {
        done();
  
      return results;
    });
  });
}