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
|Urls
+---------------------------------------------------+*/

/*  
+---------------------------------------------------+
|HomePage - Index of Pages
+---------------------------------------------------+*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pauliceia 2.0 WebService' });

});

/*  
+---------------------------------------------------+
|searchPage
+---------------------------------------------------+*/
router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Pauliceia 2.0' });

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
    const query = client.query('select *, st_astext(st_transform(geom,4326)) as geom from tb_street order by id ASC;');
    
    // Stream results back one row at a time
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

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select *, st_astext(st_transform(geom,4326)) as geom from tb_street order by id ASC;');
    
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
    const query = client.query('select *, st_astext(st_transform(geom,4326)) as geom from tb_street order by id ASC;');
    
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      
      const results2 = js2xmlparser.parse("tb_street", results);
      //console.log(results2);

      return res.end(results2);;
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
    
    // Stream results back one row at a time
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
|getAllPlaces - Xml
+---------------------------------------------------+*/
router.get('/api/places/all/xml', (req, res, next) => {
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
    
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      
      const results2 = js2xmlparser.parse("tb_places", results);
      //console.log(results2);

      return res.end(results2);;
    });
  });
});

/*  
+---------------------------------------------------+
|getSingleStreet - Json
+---------------------------------------------------+*/
router.get('/api/street/:street_id/json', (req, res, next) => {
  
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
    const query = client.query('select *, st_astext(st_transform(geom,4326)) as geom from tb_street where id=($1)',[id]);
    //const query = client.query('select * from tb_street where id=($1)', id);

// Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      //const results2 = GeoJSON.parse(results, {'MultiLineString': 'geom'});
      //console.log(results2);

      return res.json(results);
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
    const query = client.query('select *, st_astext(st_transform(geom,4326)) as geom from tb_street where id=($1)',[id]);
    //const query = client.query('select * from tb_street where id=($1)', id);

// Stream results back one row at a time
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
    const query = client.query('select *, st_astext(st_transform(geom,4326)) as geom from tb_street where id=($1)',[id]);
    //const query = client.query('select * from tb_street where id=($1)', id);

// Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = js2xmlparser.parse("tb_street", results);
      //console.log(results2);

      return res.end(results2);;
    });
  });
});

/*  
+---------------------------------------------------+
|getSinglePoint - Json
+---------------------------------------------------+*/
router.get('/api/places/:street_id/json', (req, res, next) => {
  
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

// Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      //const results2 = GeoJSON.parse(results, {'MultiLineString': 'geom'});
      //console.log(results2);

      return res.json(results);
    });
  });
});

/*  
+---------------------------------------------------+
|getSinglePoint - GeoJson
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
    const query = client.query('select id, id_street, (st_x(st_astext(geom)) as lat, st_y(st_astext(geom)) as lng), number, name, first_day, first_month, first_year, last_day, last_month, last_year, description, source from tb_places where number=($1)',[id]);
    //const query = client.query('select * from tb_street where id=($1)', id);

// Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = GeoJSON.parse(results, {Point: ['lat', 'lng']});
      //console.log(results2);

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

// Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = js2xmlparser.parse("tb_places", results);
      //console.log(results2);

      return res.end(results2);;
    });
  });
});

/*  
+---------------------------------------------------+
|getListNomeYear - Json
+---------------------------------------------------+*/
router.get('/api/places/all/name/json', (req, res, next) => {
const results = [];
const newResults = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select * from tb_places union select * from tb_places union select * from tb_places union select * from tb_places');

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
|geolocation-Json
+---------------------------------------------------+*/
router.get('/api/geolocation/:textpoint,:year/json', (req, res, next) => {
  const results = [];
  const textpoint = req.params.textpoint;
  const year = req.params.year;
  const typeofsearch = "";
  //console.log(textpoint);
  //console.log(year);
  
  //Condição que determina o tipo do texto.
    if(textpoint.match(/^[0-9]+$/) != null){
    //console.log("O 'textpoint' digitado é composto por numeros");
      // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data

      const query = client.query("SELECT number, ST_ASTEXT(geom) FROM tb_places WHERE number = ($1) AND first_year >= ($2) OR last_year <= ($2) AND number != null ",[textpoint,year]);

      // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = GeoJSON.parse(results, {'MultiLineString': 'geom'});

      //console.log(results);
      return res.json(results2);
    });
  });  
} else {
    //console.log("O 'textpoint' digitado é composto por letras");
      // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    
    // SQL Query > Select Data
       const query = client.query("SELECT name, ST_ASTEXT(geom) FROM tb_places WHERE name LIKE ($1) AND first_year >= ($2) OR last_year <= ($2) AND name != '' UNION SELECT name, ST_ASTEXT(st_transform(geom,4326)) FROM tb_street WHERE name LIKE ($1) AND first_year = ($2) AND name != '' ",['%'+textpoint+'%',year]);

      // Stream results back one row at a time
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
}
});

/*  
+---------------------------------------------------+
|consoleLog
+---------------------------------------------------+*/
console.log('Listening on port 3000.');
module.exports = router;