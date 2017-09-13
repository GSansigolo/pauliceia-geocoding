/*  
+---------------------------------------------------+
|Var
+---------------------------------------------------+*/
	var express = require('express');
	var router = express.Router();
  var GeoJSON = require('geojson');
  var postgeo = require("postgeo");
  var js2xmlparser = require("js2xmlparser");

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
|getDateTime
+---------------------------------------------------+*/
function getDateTime() {
  
      var date = new Date();
  
      var hour = date.getHours();
      hour = (hour < 10 ? "0" : "") + hour;
  
      var min  = date.getMinutes();
      min = (min < 10 ? "0" : "") + min;
  
      var sec  = date.getSeconds();
      sec = (sec < 10 ? "0" : "") + sec;
  
      var year = date.getFullYear();
  
      var month = date.getMonth() + 1;
      month = (month < 10 ? "0" : "") + month;
  
      var day  = date.getDate();
      day = (day < 10 ? "0" : "") + day;
  
      return  hour + ":" + min + ":" + sec+ " "+ day + "/" + month  + "/" + year;
  
  } 
  
/*  
+---------------------------------------------------+
|Urls
+---------------------------------------------------+*/

/*  
+---------------------------------------------------+
|HomePage - Index of Pages
+---------------------------------------------------+*/
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Documentação do Desenvolvedor Pauliceia 2.0' });

});

/*  
+---------------------------------------------------+
|getAllStreets - GeoJson
+---------------------------------------------------+*/
router.get('/api/street/all/geojson', (req, res, next) => {

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
    const query = client.query('select *, st_astext(geom) as geom from tb_street order by id ASC;');

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = GeoJSON.parse(results, {'MultiLineString': 'geom'});
      //console.log(results2);

      return res.json(results2);
    });
  });
});

/*  
+---------------------------------------------------+
|getAllStreets - Json
+---------------------------------------------------+*/
router.get('/api/street/all/json', (req, res, next) => {

const results = [];
const head = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select *, st_astext(geom) as geom from tb_street order by id ASC;');
    
    head.push("created_at: " + getDateTime());
    head.push("type: 'GET'");

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      
      head.push(results);

      return res.json(head);
    });
  });
});

/*  
+---------------------------------------------------+
|getAllStreets - Xml
+---------------------------------------------------+*/
router.get('/api/street/all/xml', (req, res, next) => {

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
    const query = client.query('select *, st_astext(geom) as geom from tb_street order by id ASC;');

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      
      const results2 = js2xmlparser.parse("data", results);
      
      return res.end(results2);
    });
  });
});


/*  
+---------------------------------------------------+
|getAllPlaces - GeoJson
+---------------------------------------------------+*/
router.get('/api/places/all/geojson', (req, res, next) => {

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
    const query = client.query('select *, st_astext(geom) as geom from tb_places order by id ASC;');

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = GeoJSON.parse(results, {'Point': 'geom'});
      //console.log(results2);

      return res.json(results2);
    });
  });
});

/*  
+---------------------------------------------------+
|getAllPlaces - Json
+---------------------------------------------------+*/
router.get('/api/places/all/json', (req, res, next) => {

const results = [];
const head = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select *, st_astext(geom) as geom from tb_places order by id ASC;');
    
    head.push("created_at: " + getDateTime());
    head.push("type: 'GET'");

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      head.push(results);
      
      return res.json(head);
    });
  });
});

/*  
+---------------------------------------------------+
|getAllPlaces - Xml
+---------------------------------------------------+*/
router.get('/api/places/all/xml', (req, res, next) => {

const results = [];
const head = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select *, st_astext(geom) as geom from tb_places order by id ASC;');
    
    head.push("created_at: " + getDateTime());
    head.push("type: 'GET'");

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      
      const results2 = js2xmlparser.parse("data", results);
      
      //console.log(results2);
      
      return res.end(results2);

    });
  });
});

/*  
+---------------------------------------------------+
|getSingleStreet - Json
+---------------------------------------------------+*/
router.get('/api/street/:street_id/json', (req, res, next) => {

  const results = [];
  const head = [];
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
    const query = client.query('select *, st_astext(geom) as geom from tb_street where id=($1)',[id]);
    //const query = client.query('select * from tb_street where id=($1)', id);

    head.push("created_at: " + getDateTime());
    head.push("type: 'GET'");

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      //const results2 = GeoJSON.parse(results, {'MultiLineString': 'geom'});
      //console.log(results2);

      head.push(results);

      return res.json(head);
    });
  });
});

/*  
+---------------------------------------------------+
|getSingleStreet - GeoJson
+---------------------------------------------------+*/
router.get('/api/street/:street_id/geojson', (req, res, next) => {

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
    const query = client.query('select *, st_astext(geom) as geom from tb_street where id=($1)',[id]);
    //const query = client.query('select * from tb_street where id=($1)', id);

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = GeoJSON.parse(results, {'MultiLineString': 'geom'});
      //console.log(results2);

      return res.json(results2);
    });
  });
});

/*  
+---------------------------------------------------+
|getSingleStreet - Xml
+---------------------------------------------------+*/
router.get('/api/street/:street_id/xml', (req, res, next) => {

  const results = [];
  const head = [];
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
    const query = client.query('select *, st_astext(geom) as geom from tb_street where id=($1)',[id]);

    head.push("created_at: " + getDateTime());
    head.push("type: 'GET'");

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = js2xmlparser.parse("data", results);
      
      //console.log(results2);
      
      return res.end(results2);
    });
  });
});

/*  
+---------------------------------------------------+
|getSinglePlace - Json
+---------------------------------------------------+*/
router.get('/api/places/:street_id/json', (req, res, next) => {
  
  const results = [];
  const head = [];
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
    const query = client.query('select id, id_street, st_x(st_astext(geom)) as lat, st_y(st_astext(geom)) as lng, number, name, first_day, first_month, first_year, last_day, last_month, last_year, description, source from tb_places where number=($1)',[id]);
    //const query = client.query('select * from tb_street where id=($1)', id);

    head.push("created_at: " + getDateTime());
    head.push("type: 'GET'");

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      head.push(results);      

      return res.json(head);
    });
  });
});

/*  
+---------------------------------------------------+
|getSinglePlace- GeoJson
+---------------------------------------------------+*/
router.get('/api/places/:street_id/geojson', (req, res, next) => {
  
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
    const query = client.query('select id, id_street, st_x(st_astext(geom)) as lat, st_y(st_astext(geom)) as lng, number, name, first_day, first_month, first_year, last_day, last_month, last_year, description, source from tb_places where number=($1)',[id]);
    //const query = client.query('select * from tb_street where id=($1)', id);

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = GeoJSON.parse(results, {'MultiLineString': 'geom'});

      return res.json(results2);
    });
  });
});

/*  
+---------------------------------------------------+
|getSinglePlace - Xml
+---------------------------------------------------+*/
router.get('/api/places/:street_id/xml', (req, res, next) => {
  
  const results = [];
  const head = [];
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
    const query = client.query('select id, id_street, st_x(st_astext(geom)) as lat, st_y(st_astext(geom)) as lng, number, name, first_day, first_month, first_year, last_day, last_month, last_year, description, source from tb_places where number=($1)',[id]);

    head.push("created_at: " + getDateTime());
    head.push("type: 'GET'");

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = js2xmlparser.parse("data", results);

      //console.log(results2);

      return res.end(results2);
    });
  });
});

/*  
+---------------------------------------------------+
|getList - Json
+---------------------------------------------------+*/
router.get('/api/listQuickSearch', (req, res, next) => {
  const results = [];
  
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data avenida tiradentes, 1, 1931
    const query = client.query("select b.name, a.number, a.first_year as year from tb_street as b join tb_places as a on a.id_street = b.id where a.first_year >= 1 union select b.name, a.number, a.last_year as year from tb_street as b join tb_places as a on a.id_street = b.id where a.last_year >= 1 order by number;");

    query.on('row', (row) => {
      results.push(row.name +', '+ row.number+', '+ row.year);
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
|geolocation-Json
+---------------------------------------------------+*/
router.get('/api/geolocation/:textpoint,:number,:year/json', (req, res, next) => {
  const results = [];
  const head = [];
  const textpoint = req.params.textpoint;
  const year = req.params.year;
  const number = req.params.number;
  const total = []

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    
    // SQL Query > Select Data
       const query = client.query("SELECT tb_places.name, ST_ASTEXT(tb_places.geom) AS geom FROM tb_places JOIN tb_street ON tb_places.id_street = tb_street.id WHERE tb_places.number = ($3) AND tb_street.name LIKE ($1) AND tb_places.first_year <= ($2) UNION SELECT tb_places.name, ST_ASTEXT(tb_places.geom) AS geom FROM tb_places JOIN tb_street ON tb_places.id_street = tb_street.id WHERE tb_places.number = ($3) AND tb_street.name LIKE ($1) AND tb_places.last_year >= ($2);",['%'+textpoint+'%', year, number]);

      // Stream results back one row at a time
    
    head.push("created_at: " + getDateTime());
    head.push("type: 'GET'");

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      head.push(results);

      return res.json(head);
    });
  }); 
});

/*  
+---------------------------------------------------+
|consoleLog
+---------------------------------------------------+*/
console.log('Listening on port 3000.');
module.exports = router;