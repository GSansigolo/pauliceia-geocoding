/* ----------------------------------------------------------------------------+
|                                                                              |
|                 Pauliceia Geoocoding API - Gabriel Sansigolo                 |
|                                                                              |
+-----------------------------------------------------------------------------*/

/*--------------------------------------------------+
| Var                                               |
+--------------------------------------------------*/
  var webServiceAddress = process.env.PORT ? "http://localhost:"+process.env.PORT : "http://localhost:3000";
  //var webServiceAddress = "http://pauliceia.dpi.inpe.br";
  var express = require('express');
  var router = express.Router();
  var GeoJSON = require('geojson');
  var postgeo = require("postgeo");
  var js2xmlparser = require("js2xmlparser");
  var fs = require('fs');
  var Search = require('../controllers/searchPoint');
  var Fix = require('../controllers/closestPoint');
  var Locate = require('../controllers/lineLocate');
  var Merge = require('../controllers/lineMerge');
  var Create = require('../controllers/lineSubstring');
  const request = require('request');
  var assert = require('assert');
  var obj = [];

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
    const SQL_Query_Select_List = "select b.name, a.number, a.first_year as year from tb_street as b join tb_places as a on a.id_street = b.id where a.first_year >= 1 and a.last_year >= 1 order by b.name;";

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

/*--------------------------------------------------+
| Geolocation                                       |
+--------------------------------------------------*/
router.get('/geolocation/:textpoint,:number,:year/json/old', (req, res, next) => {    

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
                    head.push({createdAt:  getDateTime(), type: 'GET'});

                    //Push Head
                      head.push(results);
                      return res.json(head);
                    
                    });
                });
            } else {

              //Stream results back one row at a time
              head.push({createdAt:  getDateTime(), type: 'GET'});
              

              //Push Head
              head.push(results);

              //Results
              return res.json(head);
            }
      });
  }); 
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

        //recive the data from the get call
        var bodyjson = JSON.parse(body);
    
        //handle the recived geom
        var geomPoint = bodyjson[2][0].geom.substr(bodyjson[2][0].geom.indexOf("(")+1);
        geomPoint = geomPoint.substr(0,geomPoint.indexOf(")"));

        //build the coordinates (x, y)
        var x = parseFloat(geomPoint.split(' ')[0]);
        var y = parseFloat(geomPoint.split(' ')[1]);

        //Push
        results.push({street: textList[k].split(',')[0],number: textList[k].split(',')[1].replace(" ", ""), year: textList[k].split(',')[2].replace(" ", ""),geom: [x,y]});

      //Count
      k=k+1;

      //stop the loop
      if (k >= urlList.length){

        //build the geojson 
        const results2 = GeoJSON.parse(results, {'Point': 'geom'});
        
        //return
        return res.json(results2);

      }

    } 
      });  
  }
});

/*--------------------------------------------------+
| New Geolocation                                   |
+--------------------------------------------------*/
router.get('/geolocation/:textpoint,:number,:year/json', (req, res, next) => {

  //Results variables
  const results = [];
  const head = [];

  //Develop variables
  var url;

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
    var places = JSON.parse(body);

    //Filter json places using the entering variables
    var places_filter = places.filter(el=>el.street_name == textpoint);
    places_filter = places_filter.filter(el=>el.place_number == number);
    places_filter = places_filter.filter(el=>el.place_lastyear >= year);
    places_filter = places_filter.filter(el=>el.place_firstyear <= year);

    //Check if only one result was found
    if (places_filter.length == 1){

      /*--------------------+
      | Log                 |
      +--------------------*/

        //build the serch query
        var queryText = textpoint + ', ' + number + ', ' + year;

        //use the fs to read the log
        fs.readFile('log.json', 'utf8', function readFileCallback(err, data){
          if (err){
              console.log(err);
          } else {
          
            //append the new log into log.json
            obj = JSON.parse(data); 
            obj.data.push({id: parseInt(obj.data.length), createdAt: getDateTime() , query: queryText, type: 'Geolocation', status: 'SUCESS'});
            json = JSON.stringify(obj); 
            fs.writeFile('log.json', json, 'utf8'); 
        }});

      /*-------------------*/

      //Organize the Json results
      results.push({name: places_filter[0].place_name, geom: places_filter[0].place_geom});

      //Write header
      head.push({createdAt:  getDateTime(), type: 'GET'});

      //Push Head
      head.push(results);

      //Return the json with results
      return res.json(head);

    } else {

      /*--------------------+
      | Geocode             |
      +--------------------*/

        //Set the url
        url = webServiceAddress + '/api/geocoding/streets';

        //Request the json with all streets
        request(url, function (error, response, body) {
          if (!error) {

          //Set the bodyjson with the body of the request
          var streets = JSON.parse(body);

          //Filter json streets using the entering variables
          var streets_filter = streets.filter(el=>el.street_name == textpoint);

          //get the street and merge it into linestring
          var linemerge = (streets_filter[0].street_geom);

          //Filter json places using the entering variables
          places_filter = places.filter(el=>el.street_name == textpoint);
          //places_filter = places_filter.filter(el=>el.place_lastyear >= year);
          places_filter = places_filter.filter(el=>el.place_firstyear <= year);

          //Declare array with numbers
          const numbers = [];

          //Loop to fill the array numbers
          for(var i = 0; i < places_filter.length; i++){
              numbers[i] = places_filter[i].place_number;
          }

          //Filter the json places to get the p1
          var p1 = places_filter.filter(el=>el.place_number < number);

          //define array numbers 1
          var numbers_p1 = [];
          var j = 0;

          //Loop to fill the array numbers
          for(var i = 0; i < p1.length; i++){
            
            //Check if the number is even if that so append it to the array numbers
            if(number%2 == 0){
              if(p1[i].place_number%2 == 0){
                numbers_p1[j] = p1[i].place_number;
                j++;
              }

            //Check if the number is odd if that so append it to the array numbers
            } else {
              if(p1[i].place_number%2 != 0){
                numbers_p1[j] = p1[i].place_number;
                j++;
              }
            }
          }

          //filter the p1
          p1 = p1.filter(el=>el.place_number == Math.max.apply(Math, numbers_p1));

          //Filter the json places to get the p2
          var p2 = places_filter.filter(el=>el.place_number > number);

          //define array numbers 1-
          var numbers_p2 = [];
          j = 0;

          //Loop to fill the array numbers
          for(var i = 0; i < p2.length; i++){
            
            //Check if the number is even if that so append it to the array numbers
            if(number%2 == 0){
              if(p2[i].place_number%2 == 0){
                numbers_p2[j] = p2[i].place_number;
                j++;
              }

            //Check if the number is odd if that so append it to the array numbers
            } else {
              if(p2[i].place_number%2 != 0){
                numbers_p2[j] = p2[i].place_number;
                j++;
              }
            }
          }
        
          //filter the p2
          p2 = p2.filter(el=>el.place_number == Math.min.apply(Math, numbers_p2));

          //check if the point can be geolocated
          if(p2.length != 1 || p1.length != 1){

             //Result
             results.push({alert: "Point not found", alertMsg: "System did not find ("+ textpoint +", "+ number +", "+ year + ")"});
            
            /*--------------------+
            | Log                 |
            +--------------------*/

              //build the serch query
              var queryText = textpoint + ', ' + number + ', ' + year;

              //use the fs to read the log
              fs.readFile('log.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                
                 //append the new log into log.json
                 obj = JSON.parse(data);
                 obj.data.push({id: parseInt(obj.data.length), createdAt: getDateTime() , query: queryText, type: 'Geocode', status: 'FAIL'}); 
                 json = JSON.stringify(obj); 
                 fs.writeFile('log.json', json, 'utf8'); 
              }});

            /*-------------------*/
         
          } else {

            //set the geometry of the P1 and P2
            var p1_geom = p1[0].place_geom;
            var p2_geom = p2[0].place_geom;

            //get the startfraction
            var startfraction = Locate.lineLocate(linemerge, p1_geom);

            //get the endfraction
            var endfraction = Locate.lineLocate(linemerge, p2_geom);
        

            //check if end is bigger then start
            if (endfraction > startfraction){

              //get the geom of lineSubString
              var sublinestring = Create.lineSubstring(linemerge, startfraction, endfraction);
                  
            } else {

              //get the geom of lineSubString
              var sublinestring = Create.lineSubstring(linemerge, endfraction, startfraction);
              
            }
            
            //take the geom number of p1_geom
            p1_geom = p1_geom.substr(p1_geom.indexOf("(")+1);
            p1_geom =p1_geom.substr(0,p1_geom.indexOf(")"));

            //take the geom number of p2_geom
            p2_geom = p2_geom.substr(p2_geom.indexOf("(")+1);
            p2_geom = p2_geom.substr(0,p2_geom.indexOf(")"));
            
            if (sublinestring == ','){

              //build the street geom
              var geometry  = ("MULTILINESTRING(("+ p1_geom+","+p2_geom +"))");

            }else{
              
              //build the street geom
              var geometry  = ("MULTILINESTRING(("+ p1_geom+","+sublinestring + p2_geom +"))");
            }
            
            //get the four variable to geocode
            var nl =  p2[0].place_number;
            var nf = p1[0].place_number;
            var num = parseInt(number)
            
            //Organize the Json results
            results.push({name: "Point Geolocated", geom: ("POINT("+Search.getPoint(geometry, parseInt(nf), parseInt(nl), parseInt(num)).point+")")});
            
            /*--------------------+
            | Log                 |
            +--------------------*/

              //build the serch query
              var queryText = textpoint + ', ' + number + ', ' + year;

              //use the fs to read the log
              fs.readFile('log.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                
                  //append the new log into log.json
                  obj = JSON.parse(data);
                  obj.data.push({id: parseInt(obj.data.length), createdAt: getDateTime() , query: queryText, type: 'Geocode', status: 'SUCESS'}); 
                  json = JSON.stringify(obj);
                  fs.writeFile('log.json', json, 'utf8');
              }});

            /*-------------------*/

            }   

            //Write header
            head.push({createdAt:  getDateTime(), type: 'GET'});
            
            //Push Head
            head.push(results);

            //Return the json with results
            return res.json(head);
            
          }  
        });
      }
    }
  });
});

/*-----------------------------------------------+
| Log                                            |
+-----------------------------------------------*/
router.get('/log', (req, res, next) => {
  
  const head = []

  //use the fs to read the log
  fs.readFile('log.json', 'utf8', function readFileCallback(err, data){
  if (err){
    console.log(err);
  } else {
        
  //append the new log into log.json
  obj = JSON.parse(data); //now it an object
  
  //Write header
  head.push({createdAt:  getDateTime(), type: 'GET'});

  //Push Head
  head.push(obj);
          
  //Return the json with results
  return res.json(head);

  }});
});

/*-----------------------------------------------+
| Log--clean                                     |
+-----------------------------------------------*/
router.get('/log--clean', (req, res, next) => {
  
  const head = []

  //use the fs to read the log
  fs.readFile('log.json', 'utf8', function readFileCallback(err, data){
  if (err){
    console.log(err);
  } else {
        
  //append the new log into log.json
  obj = JSON.parse(data); //now it an object
  obj = ({"data":[]}); //add some data
  json = JSON.stringify(obj); //convert it back to json
  fs.writeFile('log.json', json, 'utf8'); // write it back 

  //Write header
  head.push({createdAt:  getDateTime(), type: 'GET'});

  //Push Head
  head.push({Results: "Done"});
          
  //Return the json with results
  return res.json(head);

  }});
});

/*---------------------------------------------------+
| Console Log                                        |
+---------------------------------------------------*/
console.log(process.env.PORT ? 'Listening on port '+process.env.PORT : 'Listening on port 3000');
module.exports = router;