
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
+--------------------------------------------------/
router.get('/', function(req, res, next) {
  res.render('/public/apidocs/index.html', {});
});

*/

/*-----------------------------------------------+
| places Json                                    |
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
| places Dataset Json                            |
+--------------------------------------------------*/

router.get('/placesdataset', (req, res, next) => {
  
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
      //results.push(row.name +', '+ row.number+', '+ row.year);
      results.push({name: row.name, number: row.number, year: row.year});
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
  var waitDataExtrapolation;
  const Extrapolation = [];
  const urlList = [];

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

                    /*--------------------------------------------------+
                    | Extrapolation Check                               |
                    +--------------------------------------------------*/
                    if (!row.geometry || !row.nf || !row.num || !row.nl) {

                    /*--------------------------------------------------+
                    | If The Geom wasn't found                          |
                    +--------------------------------------------------*/
                    
                      //build url of the call
                      url = webServiceAddress + '/api/geocoding/placesdataset'

                      //request to get the street name
                      waitDataExtrapolation = new Promise((resolve, reject) => {
                        
                        request(url, function (error, response, body) {
                          if (!error) {
 
                            //request body
                            var bodyjson = JSON.parse(body);

                            //request body filtered
                            var filteredArray = bodyjson.filter(el=>el.name == textpoint);

                            //request body filtered size
                            const sizeJson = Object.keys(filteredArray).length;
                            
                            console.log(sizeJson);

                            //if sizeJson == 1
                            if (sizeJson == 1){

                              //build the json
                              const jsonAddressStreet = [{address: filteredArray[0].name +", "+filteredArray[0].number+", "+filteredArray[0].year}]; 
  
                              //build the next call with the json
                              url = webServiceAddress + '/api/geocoding/multiplegeolocation/'+JSON.stringify(jsonAddressStreet)+'/json'
                              
                              //request to get all places of the street
                              request(url, function (error, response, body) {
                                if (!error) {

                                  bodyjson = JSON.parse(body);
                                  
                                  Extrapolation.push({address: bodyjson[2][0].address, geom: bodyjson[2][0].geom});

                                  resolve(Extrapolation)
                                }
                              })

                            //if sizeJson > 1
                            } else {

                              //for to build urlList 
                              for (var j = 0; j < sizeJson-1 ; j++ ) {
                              
                                //build the json
                                const jsonAddressStreet = {address: filteredArray[j].name +", "+filteredArray[j].number+", "+filteredArray[j].year}; 
                                
                                //append the json
                                urlList.push(jsonAddressStreet);
                              
                              }

                              //build the url
                              url = webServiceAddress + '/api/geocoding/multiplegeolocation/'+JSON.stringify(urlList)+'/json'

                              //request to get all places of the street
                              request(url, function (error, response, body) {
                                if (!error) {

                                  bodyjson = JSON.parse(body);

                                  //for to get all the data
                                  for (var j = 0; j < sizeJson-1 ; j++ ) {

                                    //append all the data from the request
                                    Extrapolation.push({address: bodyjson[2][j].address, geom: bodyjson[2][j].geom});

                                  }
                                  //resolve
                                  resolve(Extrapolation)
                                }
                                }) 
                              }
                            }
                       })

                      })

                      //Result
                      results.push({alert: "Point not found", data: Extrapolation});
                      
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
                    waitDataExtrapolation.then(() => {
                      head.push(results);
                      return res.json(head);
                    })
                    
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

/*
+---------------------------------------------------+
|multiplegeolocation-Json
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

/*---------------------------------------------------+
| Console Log                                        |
+---------------------------------------------------*/
console.log(process.env.PORT ? 'Listening on port '+process.env.PORT : 'Listening on port 3000');
module.exports = router;