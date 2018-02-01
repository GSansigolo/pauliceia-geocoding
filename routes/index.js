
/* ----------------------------------------------------------------------------+
|                                                                              |
|                 Pauliceia Geoocoding API - Gabriel Sansigolo                 |
|                                                                              |
+-----------------------------------------------------------------------------*/

/*--------------------------------------------------+
| Var                                               |
+--------------------------------------------------*/
	var express = require('express');
	var router = express.Router();
  var GeoJSON = require('geojson');
  var postgeo = require("postgeo");
  var js2xmlparser = require("js2xmlparser");
  var Search = require('../controllers/searchPoint');
  var webServiceAddress = process.env.PORT ? "http://localhost:"+process.env.PORT : "http://localhost:3000";
  const request = require('request');


/*--------------------------------------------------+
| Connection                                        |
+--------------------------------------------------*/
  const pg = require('pg');

  const db_user = "postgres";
  const db_pass = "teste";
  const db_adre = "localhost";
  const db_name = "db_pauliceia";

  const connectionString = process.env.DATABASE_URL || 'postgres://'+db_user+':'+db_pass+'@'+db_adre+'/'+db_name;
  const client = new pg.Client(connectionString);
  
  client.connect();
  
/*--------------------------------------------------+
| function getJsonUrl(url)                          |
+--------------------------------------------------*/
function getJsonUrl(url1) {
  request(url1, function (error, response, body) {
    if (!error) {
      var bodyjson = JSON.parse(body);
      console.log(bodyjson[2][0].geom);
      return bodyjson[2][0].geom
      } 
  });
} 

/*-------------------------------------------------+
| function getDateTime()                           |
+-------------------------------------------------*/
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

/*--------------------------------------------------+
|function isEmptyObject(obj)                        |
+--------------------------------------------------*/
function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

/* ------------------------------------------------------------------------+
|                                                                          |
|                              URLS                                        |
|                                                                          |
+-------------------------------------------------------------------------*/

/*--------------------------------------------------+
|Index                                              |
+--------------------------------------------------/
router.get('/', function(req, res, next) {
  res.render('/public/apidocs/index.html', {});
});

*/

/*---------------------------------------------------+
|getAllStreets - GeoJson                             |
+---------------------------------------------------*/
router.get('/street/all/geojson', (req, res, next) => {

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

/*--------------------------------------------------+
|getAllStreets - Json
+--------------------------------------------------*/
router.get('/street/all/json', (req, res, next) => {

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

/*--------------------------------------------------+
|getAllStreets - Xml
+--------------------------------------------------*/
router.get('/street/all/xml', (req, res, next) => {

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

/*--------------------------------------------------+
|getAllPlaces - GeoJson
+---------------------------------------------------*/
router.get('/places/all/geojson', (req, res, next) => {

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

/*---------------------------------------------------+
|getAllPlaces - Json
+---------------------------------------------------*/
router.get('/places/all/json', (req, res, next) => {

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

/*--------------------------------------------------+
|getAllPlaces - Xml
+--------------------------------------------------*/
router.get('/places/all/xml', (req, res, next) => {

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

/*--------------------------------------------------+
|getSingleStreet - Json
+---------------------------------------------------*/
router.get('/street/:street_id/json', (req, res, next) => {

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

/*---------------------------------------------------+
|getSingleStreet - GeoJson
+----------------------------------------------------*/
router.get('/street/:street_id/geojson', (req, res, next) => {

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

/*---------------------------------------------------+
|getSingleStreet - Xml
+---------------------------------------------------*/
router.get('/street/:street_id/xml', (req, res, next) => {

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

/*--------------------------------------------------+
|getSinglePlace - Json
+---------------------------------------------------*/
router.get('/places/:street_id/json', (req, res, next) => {
  
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

/*--------------------------------------------------+
|getSinglePlace- GeoJson
+---------------------------------------------------*/
router.get('/places/:street_id/geojson', (req, res, next) => {
  
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
    const query = client.query('select id, id_street, st_astext(geom) as geom, number, name, first_day, first_month, first_year, last_day, last_month, last_year, description, source from tb_places where number=($1)',[id]);
    //const query = client.query('select * from tb_street where id=($1)', id);

    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = GeoJSON.parse(results, {'Point': 'geom'});

      return res.json(results2);
    });
  });
});

/*--------------------------------------------------+
|getSinglePlace - Xml
+---------------------------------------------------*/
router.get('/places/:street_id/xml', (req, res, next) => {
  
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

/*--------------------------------------------------+
| List Quick Search Json                            |
+--------------------------------------------------*/
router.get('/listQuickSearch', (req, res, next) => {
  
  //Results Variable
  const results = [];
  
  //Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    
    //Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    //Build the SQL Query
    const SQL_Query_Select_List = "select b.name, a.number, a.first_year as year from tb_street as b join tb_places as a on a.id_street = b.id where a.first_year >= 1 and a.last_year >= 1 order by number;";

    //Execute SQL Query
    const query = client.query(SQL_Query_Select_List);

    //Push Results
    query.on('row', (row) => {
      results.push(row.name +', '+ row.number+', '+ row.year);
    });

    //After all data is returned, close connection and return results
    query.on('end', () => {
      done();

    //Resuts
    return res.json(results);

   });
  });
});

/*--------------------------------------------------+
| Geolocation Json                                  |
+--------------------------------------------------*/
router.get('/geolocation/:textpoint,:number,:year/json', (req, res, next) => {    
  
  //Results Variables
  const results = [];
  const head = [];

  //Entering Variables
  const textpoint = req.params.textpoint;
  const year = req.params.year.replace(" ", "");;
  const number = req.params.number.replace(" ", "");
  
  //Check of the entering variables
  if (!number || !textpoint || !year || number == null || textpoint == null || year == null){
    head.push("created_at: " + getDateTime());
    head.push("type: 'GET'");
    results.push({alert: ""});
    head.push(results);
    return res.json(head);
  }

  //Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    
    //Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    
    //Build the SQL Query
    const SQL_Query_Search = "SELECT tb_places.name, ST_ASTEXT(tb_places.geom) AS geom FROM tb_places JOIN tb_street ON tb_places.id_street = tb_street.id WHERE tb_places.number = ($3) AND tb_street.name LIKE ($1) AND tb_places.first_year <= ($2) AND tb_places.last_year >= ($2)";

    //SQL Query > Select Data
    const query = client.query(SQL_Query_Search,['%'+textpoint+'%', year, number]);

    //Stream results back one row at a time
    head.push("created_at: " + getDateTime());
    head.push("type: 'GET'");

    //Push Results
    query.on('row', (row) => {
      results.push(row);
    });
  
    //After all data is returned, close connection and return results
    query.on('end', () => {
      done();

            //if it's empty
            if (isEmptyObject(results)) {
                
                pg.connect(connectionString, (err, client, done) => {
                  
                  //Handle connection errors
                  if(err) {
                    done();
                    console.log(err);
                    return res.status(500).json({success: false, data: err});
                  }

                  /*--------------------------------------------------+
                  | Build Geocode SQL Query                           |
                  +--------------------------------------------------*/

                    //SQL tables
                    const table_street = "tb_street";
                    const table_places = "tb_places";

                    //SQL columns
                    const column_geom = "geom";
                    const column_name = "name";
                    const column_fk_id_street = "id_street";
                    const column_number = "number";
                    const column_first_year = "first_year";
                    const column_last_year = "last_year";
                    const column_id_street = "id";

                    //SQL Selects geometry
                    const SQL_query_geometry_street = "(SELECT(SELECT St_AsText(a."+column_geom+") FROM "+table_street+" AS a WHERE a."+column_name+" LIKE ($1)) AS street";
                    const SQL_query_geometry_startfraction = "(SELECT ST_LineLocatePoint(line, point) FROM (SELECT(SELECT St_AsText(ST_LineMerge(a."+column_geom+")) AS street FROM "+table_street+" AS a WHERE a."+column_name+" LIKE ($1)) AS line, (SELECT(SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM (SELECT (SELECT st_astext(a."+column_geom+") FROM "+table_places+" AS a JOIN "+table_street+" AS b ON a."+column_fk_id_street+" = b."+column_id_street+" WHERE a."+column_number+" = (SELECT MIN("+column_number+") FROM "+table_places+" AS a JOIN "+table_street+" AS b ON a."+column_fk_id_street+" = b."+column_id_street+" WHERE b."+column_name+" LIKE ($1) AND a."+column_number+" > ($3) AND a."+column_first_year+" >= ($2) AND a."+column_last_year+" >= ($2) LIMIT 1) AND b."+column_name+" LIKE ($1)  ) As pt, (SELECT ST_AsText("+column_geom+") FROM "+table_street+" WHERE "+column_name+" LIKE ($1)) As line) As foo)) AS point)AS foo) AS startfraction";
                    const SQL_query_geometry_endfraction = "(SELECT ST_LineLocatePoint(line, point) FROM (SELECT(SELECT St_AsText(ST_LineMerge(a."+column_geom+")) AS street FROM "+table_street+" AS a WHERE a."+column_name+" LIKE ($1)) AS line, (SELECT (SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM (SELECT (SELECT st_astext(a."+column_geom+") FROM "+table_places+" AS a JOIN "+table_street+" AS b ON a."+column_fk_id_street+" = b."+column_id_street+" WHERE a."+column_number+" = (SELECT MAX("+column_number+") FROM "+table_places+" AS a JOIN "+table_street+" AS b ON a."+column_fk_id_street+" = b."+column_id_street+" WHERE b."+column_name+" LIKE ($1) AND a."+column_number+" < ($3) AND a."+column_first_year+" >= ($2) AND a."+column_last_year+" >= ($2) LIMIT 1) AND b."+column_name+" LIKE ($1)) As pt, (SELECT ST_AsText("+column_geom+") FROM "+table_street+" WHERE "+column_name+" LIKE ($1)) As line) As foo)) AS point) AS foo) AS endfraction";
                    
                    //SQL Query geometry
                    const SQL_query_geometry = "(SELECT(SELECT ST_AsText(ST_Line_SubString(street, startfraction, endfraction)) as geometry FROM "+SQL_query_geometry_street+", "+SQL_query_geometry_startfraction+", "+SQL_query_geometry_endfraction+") AS foo) AS geometry";
                    
                    //SQL Query nf
                    const SQL_query_nf = "(SELECT "+column_number+"_max FROM (SELECT (SELECT MIN("+column_number+") FROM "+table_places+" AS a JOIN "+table_street+" AS b ON a."+column_fk_id_street+" = b."+column_id_street+" WHERE b."+column_name+" LIKE ($1) AND a."+column_number+" > ($3) AND a."+column_first_year+" >= ($2) AND a."+column_last_year+" >= ($2) LIMIT 1) as "+column_number+"_max) AS foo) As nf";
                    
                    //SQL Query nl
                    const SQL_query_nl = "(SELECT "+column_number+"_min FROM (SELECT (SELECT MAX("+column_number+") FROM "+table_places+" AS a JOIN "+table_street+" AS b ON a."+column_fk_id_street+" = b."+column_id_street+" WHERE b."+column_name+" LIKE ($1) AND a."+column_number+" < ($3) AND a."+column_first_year+" >= ($2) AND a."+column_last_year+" >= ($2) LIMIT 1) as "+column_number+"_min) AS foo) AS nl)";
                    
                  /*--------------------------------------------------+
                  | Geocode SQL Query                                 |
                  +--------------------------------------------------*/
                    const SQL_Query_Geocode = "SELECT geometry, nf, nl, ($3) AS num FROM "+ SQL_query_geometry +", "+SQL_query_nf+", "+SQL_query_nl+" As foo;";

                  /*--------------------------------------------------+
                  | SQL Query > Select Data                           |
                  +--------------------------------------------------*/
                  const query = client.query(SQL_Query_Geocode, ['%'+textpoint+'%', year, number]);

                  //Push the SQL Query result 
                  query.on('row', (row) => {
                    if (!row.geometry || !row.nf || !row.num || !row.nl) {
                      results.push({alert: "Point not found", msg:{alertMsg: "System did not find " + textpoint+", "+number+", "+year, help: "Make sure the search is spelled correctly. (street, number, year)"}});
                    } else {
                      results.push({name: "Point Geolocated", geom: ("POINT("+Search.getPoint(row.geometry, row.nl, row.nf, row.num).point)+")"});
                    }
                  });

                  //Close connection
                  query.on('end', () => {
                    done(); 

                    //Push Head
                    head.push(results);
                    return res.json(head);
                    });

                });
            } else {

             //Results
              head.push(results);
              return res.json(head);
            }
      });
  }); 
});

/*--------------------------------------------------+
| Multiple Geolocation Json                         |
+--------------------------------------------------*/
router.get('/multiplegeolocation/:jsonquery/json', (req, res, next) => {

  //Results Variables
  const results = [];
  var urlList = [];
  var textList = [];
  var content = "";

  //Entering Variables
  var jsonObject = JSON.parse(req.params.jsonquery);
  const sizeJson = Object.keys(jsonObject).length;
  
  //Count Variables
  var k = 0;
  const head = [];

  //Read all the Json
  for(index in jsonObject)
      for(product in jsonObject[index])
          content = (Object.keys(jsonObject[index]));
  
  //Geolocate all Address
  for ( var j = 0; j < sizeJson ; j++ ) {
    url = webServiceAddress + '/geolocation/' + jsonObject[j][content] +"/json"
    urlList.push(url);
    textList.push(jsonObject[j][content]);
  }
  //Push all results
  for (i in urlList) {
    request(urlList[i], function (error, response, body) {
      if (!error) {
        var bodyjson = JSON.parse(body);
        results.push({address: textList[k], geom:  bodyjson[2][0].geom, url: urlList[k] });
      
        //Count the id results
       k=k+1;

       if (k >= urlList.length){
        
        // Stream results back one row at a time
        head.push("created_at: " + getDateTime());
        head.push("type: 'GET'");
      
        //Results
        head.push(results);
        return res.json(head);

      }

     } 
      });  
  }  
});

/*---------------------------------------------------+
| Console Log                                        |
+---------------------------------------------------*/
console.log(process.env.PORT ? 'Listening on port '+process.env.PORT : 'Listening on port 3000');
module.exports = router;