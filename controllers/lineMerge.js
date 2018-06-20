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

//line -> geometria do rua
//point-> geometria do ponto

exports.lineMerge = function(line){

    //Build the SQL Query
    const SQL_Query_Select_List = "select St_asText(ST_LineMerge($1));";
    
    const exec = (err) => {
        if (err) { 
          one();
          console.log(err); 
        }
        
        client.query(SQL_Query_Select_List,[line], (err, result) => {
            if(err) { 
              one();
              console.log(err); 
            }
            
            console.log(result.rows)
            return result.rows
            
            client.end()
        })
    }
    
    client.connect(exec);

}