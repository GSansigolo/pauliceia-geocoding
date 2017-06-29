/*  
+---------------------------------------------------+
|Var
+---------------------------------------------------+*/
	var express = require('express');
	var router = express.Router();

/*  
+---------------------------------------------------+
|Connection
+---------------------------------------------------+*/
	const pg = require('pg');
	const connectionString = process.env.DATABASE_URL || 'postgres://postgres:teste@localhost/db_pauliceia';

	const client = new pg.Client(connectionString);
	client.connect();

/*  
+---------------------------------------------------+
|Urls
+---------------------------------------------------+*/

/*  
+---------------------------------------------------+
|HomePage
+---------------------------------------------------+*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pauliceia 2.0 WebService' });
});

/*  
+---------------------------------------------------+
|getAllStreets
+---------------------------------------------------+*/
router.get('/getAllStreets', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select * from tb_street order by id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

/*  
+---------------------------------------------------+
|getSingleStreet
+---------------------------------------------------+*/
router.get('/getSingleStreet/:street_id', (req, res, next) => {
  
  const results = [];
  const id = req.params.street_id;

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select * from tb_street where id=($1)',[id]);
    //const query = client.query('select * from tb_street where id=($1)', id);

// Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

/*  
+---------------------------------------------------+
|consoleLog
+---------------------------------------------------+*/
console.log('Listening on port 3000.');
module.exports = router;
