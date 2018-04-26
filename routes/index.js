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
  var assert = require('assert');

/*--------------------------------------------------+
| Connection                                        |
+--------------------------------------------------
  const { Pool, Client } = require('pg')

  // create a pool
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "db_pauliceia",
    password: "teste",
    port:5432,
  })

  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "db_pauliceia",
    password: "teste",
    port:5432,
  })

  client.connect()  */

//

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
+--------------------------------------------------*/

/*-----------------------------------------------+
| Places List                                    |
+-----------------------------------------------*/
router.get('/placeslist', (req, res, next) => {

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

/*-----------------------------------------------+
| Places Dataset                                 |
+-----------------------------------------------*/
router.get('/places', (req, res, next) => {

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
    const SQL_Query_Select_List = "select b.name as name_s, a.name as name_p, a.number, a.first_year as firstyear, a.last_year as lastyear, ST_AsText(a.geom) as geom from tb_street as b join tb_places as a on a.id_street = b.id where a.first_year >= 1 and a.last_year >= 1 order by number;";

    //Execute SQL Query
    const query = client.query(SQL_Query_Select_List);

    //Push Results
    query.on('row', (row) => {
      //results.push(row.name +', '+ row.number+', '+ row.year);
      results.push({street_name: row.name_s, place_name: row.name_p, place_number: row.number, place_firstyear: row.firstyear, place_lastyear: row.lastyear, place_geom: row.geom});
    });

    //After all data is returned, close connection and return results
    query.on('end', () => {
      done();

    //Resuts
    return res.json(results);

  });
  });
});

/*-----------------------------------------------+
| Street Dataset                                 |
+-----------------------------------------------*/
router.get('/streets', (req, res, next) => {

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
    const SQL_Query_Select_List = "select b.name, b.first_year as firstyear, b.last_year as lastyear, ST_astext(b.geom) as geom from tb_street as b join tb_places as a on a.id_street = b.id where a.first_year >= 1 and a.last_year >= 1 order by number;";

    //Execute SQL Query
    const query = client.query(SQL_Query_Select_List);

    //Push Results
    query.on('row', (row) => {
      //results.push(row.name +', '+ row.number+', '+ row.year);
      results.push({street_name: row.name, street_geom: row.geom, street_firstyear: row.firstyear, street_lastyear: row.lastyear});
    });

    //After all data is returned, close connection and return results
    query.on('end', () => {
      done();

    //Resuts
    return res.json(results);

  });
  });
  });

  /*-----------------------------------------------+
  | Years Dataset                                 |
  +-----------------------------------------------*/
  router.get('/years', (req, res, next) => {

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
    const SQL_Query_Select_List = "select a.first_year as year from tb_street as b join tb_places as a on a.id_street = b.id where a.first_year >= 1 and a.last_year >= 1 GROUP BY year order by year;";

    //Execute SQL Query
    const query = client.query(SQL_Query_Select_List);

    //Push Results
    query.on('row', (row) => {
      //results.push(row.name +', '+ row.number+', '+ row.year);
      results.push({year: row.year});
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
| Geolocation                                       |
+--------------------------------------------------*/
router.get('/geolocation/:textpoint,:number,:year/json', (req, res, next) => {    

  //Results Variables
  const results = [];
  const head = [];

  //Entering Variables
  const textpoint = req.params.textpoint;
  const year = req.params.year.replace(" ", "");;
  const number = req.params.number.replace(" ", "");

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
                    const SQL_query_geometry_endfraction = "(SELECT ST_LineLocatePoint(line, point) FROM (SELECT(SELECT St_AsText(ST_LineMerge(a."+column_geom+")) AS street FROM "+table_street+" AS a WHERE a."+column_name+" LIKE ($1)) AS line, (SELECT (SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM (SELECT (SELECT st_astext(a."+column_geom+") FROM "+table_places+" AS a JOIN "+table_street+" AS b ON a."+column_fk_id_street+" = b."+column_id_street+" WHERE a."+column_number+" = (SELECT MAX("+column_number+") FROM "+table_places+" AS a JOIN "+table_street+" AS b ON a."+column_fk_id_street+" = b."+column_id_street+" WHERE b."+column_name+" LIKE ($1) AND a."+column_number+" > ($3) AND a."+column_first_year+" >= ($2) AND a."+column_last_year+" >= ($2) LIMIT 1) AND b."+column_name+" LIKE ($1)) As pt, (SELECT ST_AsText("+column_geom+") FROM "+table_street+" WHERE "+column_name+" LIKE ($1)) As line) As foo)) AS point) AS foo) AS endfraction";
                    
                    //SQL Query geometry
                    const SQL_query_geometry = "(SELECT(SELECT ST_AsText(ST_LineSubstring(street, startfraction, endfraction)) as geometry FROM "+SQL_query_geometry_street+", "+SQL_query_geometry_startfraction+", "+SQL_query_geometry_endfraction+") AS foo) AS geometry";
                    //const SQL_query_geometry = "(SELECT(SELECT ST_AsText(ST_LineSubstring(street, endfraction, startfraction)) as geometry FROM "+SQL_query_geometry_street+", "+SQL_query_geometry_startfraction+", "+SQL_query_geometry_endfraction+") AS foo) AS geometry";
                    
                    //SQL Query nf
                    const SQL_query_nf = "(SELECT "+column_number+"_max FROM (SELECT (SELECT MIN("+column_number+") FROM "+table_places+" AS a JOIN "+table_street+" AS b ON a."+column_fk_id_street+" = b."+column_id_street+" WHERE b."+column_name+" LIKE ($1) AND a."+column_number+" > ($3) AND a."+column_first_year+" >= ($2) AND a."+column_last_year+" >= ($2) LIMIT 1) as "+column_number+"_max) AS foo) As nf";
                    
                    //SQL Query nl
                    const SQL_query_nl = "(SELECT "+column_number+"_min FROM (SELECT (SELECT MAX("+column_number+") FROM "+table_places+" AS a JOIN "+table_street+" AS b ON a."+column_fk_id_street+" = b."+column_id_street+" WHERE b."+column_name+" LIKE ($1) AND a."+column_number+" > ($3) AND a."+column_first_year+" >= ($2) AND a."+column_last_year+" >= ($2) LIMIT 1) as "+column_number+"_min) AS foo) AS nl)";
                    
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

                    /*--------------------------------------------------+
                    | Extrapolation Check                               |
                    +--------------------------------------------------*/
                    if (!row.geometry || !row.nf || !row.num || !row.nl) {

                      //Result
                      results.push({alert: "Point not found", alertMsg: "System did not find ("+ textpoint +", "+ number +", "+ year + ")", help: "Make sure the search is spelled correctly. (street, number, year)"});
                      
                    } else {

                    /*--------------------------------------------------+
                    | If The Geom was found                             |
                    +--------------------------------------------------*/

                      //Result
                      results.push({name: "Point Geolocated", geom: ("POINT("+Search.getPoint(row.geometry, row.nl, row.nf, row.num).point)+")"});

                    }
                  });

                  //Close connection
                  query.on('end', () => {
                    done(); 

                    //Stream results back one row at a time
                    head.push("created_at: " + getDateTime());
                    head.push("type: 'GET'");

                    //Push Head
                      head.push(results);
                      return res.json(head);
                    
                    });
                });
            } else {

              //Stream results back one row at a time
              head.push("created_at: " + getDateTime());
              head.push("type: 'GET'");

              //Push Head
              head.push(results);

              //Results
              return res.json(head);
            }
      });
  }); 
});

/*--------------------------------------------------+
| Street Location                                   |
+--------------------------------------------------*/
router.get('/streetlocation/:textpoint,:year/json', (req, res, next) => {

  //Results Variables
  const results = [];
  const head = [];

  //Entering Variables
  const textpoint = req.params.textpoint;
  const year = req.params.year.replace(" ", "");
  
  return res.json();
});

/*--------------------------------------------------+
| Year Location                                     |
+--------------------------------------------------*/
router.get('/yearlocation/:year/json', (req, res, next) => {

  //Results Variables
  const results = [];
  const head = [];

  //Entering Variables
  const year = req.params.year.replace(" ", "");

  return res.json();
});

/*--------------------------------------------------+
| Multiple Geolocation                               |
+---------------------------------------------------+*/
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
  for (var j = 0; j < sizeJson ; j++ ) {
    url = webServiceAddress + '/api/geocoding/geolocation/' + jsonObject[j][content] +"/json"
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

/*--------------------------------------------------+
| New Geolocation                                   |
+--------------------------------------------------*/
router.get('/geolocation/:textpoint,:number,:year/json/new', (req, res, next) => {

  //Results variables
  const results = [];
  const head = [];

  //Develop variables
  var url;
  const places = [];
  const places_filter = [];

  //Entering variables
  const textpoint = req.params.textpoint;
  const year = req.params.year.replace(" ", "");;
  const number = req.params.number.replace(" ", "");

 //Set the url
 url = webServiceAddress + '/api/geocoding/places';

 //Request the json with all places
 request(url, function (error, response, body) {
  if (!error) {
    
    //Set the bodyjson with the body of the request
    var bodyjson = JSON.parse(body);

    //Set places with bodyjson
    places.push(bodyjson)

    //Filter json places using the entering variables

    //console.log(places.filter(el=>el.street_name == textpoint));

    //places_filter.push();
    //places_filter = places.filter(el=>el.place_number = number);
    //places_filter = places.filter(el=>el.place_lastyear > year);
    //places_filter = places.filter(el=>el.place_firstyear < year);

    //Organize the Json results
    //results.push({address: places_filter[0].place_name, geom: places_filter[0].place_geom});

    //Write header
    head.push("created_at: " + getDateTime());
    head.push("type: 'GET'");

    //Push Head
    head.push(results);

    //Return the json with results
    return res.json(head);
 
  }
 })
});

/*---------------------------------------------------+
| Console Log                                        |
+---------------------------------------------------*/
console.log(process.env.PORT ? 'Listening on port '+process.env.PORT : 'Listening on port 3000');
module.exports = router;