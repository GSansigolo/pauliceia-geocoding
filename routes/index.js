//Variaveis padrões

	var express = require('express');
	var router = express.Router();

//Variaveis Connection
	const pg = require('pg');
	const connectionString = process.env.DATABASE_URL || 'postgres://postgres:teste@localhost/db_pauliceia';

	const client = new pg.Client(connectionString);
	client.connect();

//URLS
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
    const query = client.query('select * from tb_street;');
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

console.log('Listening on port 3000.');

module.exports = router;
