/* ----------------------------------------------------------------------------+
|                                                                              |
|                 Pauliceia Geoocoding API - Gabriel Sansigolo                 |
|                                                                              |
+-----------------------------------------------------------------------------*/

/*--------------------------------------------------+
| Var                                               |
+--------------------------------------------------*/
  //var webServiceAddress = process.env.PORT ? "http://localhost:"+process.env.PORT : "http://localhost:3000";
  var webServiceAddress = "http://pauliceia.dpi.inpe.br";
  var express = require('express');
  var router = express.Router();
  var GeoJSON = require('geojson');
  var Search = require('../controllers/searchPoint');
  var Locate = require('../controllers/lineLocate');
  var Create = require('../controllers/lineSubstring');
  var Match = require('../controllers/neuralNetwork');
  var Calculate = require('../controllers/confidenceRate');
  var request = require('request');

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
    //const SQL_Query_Select_List = "select b.name, a.number, a.first_year as year from streets_pilot_area as b join places_pilot_area as a on a.id_street = b.gid where a.first_year >= 1 and a.last_year >= 1 order by b.name;";
    const SQL_Query_Select_List = "select b.name, a.number::float, a.first_year::integer as year from streets_pilot_area as b join places_pilot_area as a on a.id_street::integer = b.gid::integer where a.number::float >= 1 and  a.first_year::integer is not null and  b.name is not null order by b.name;";
    
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
    const SQL_Query_Select_List = "select b.name as name_s, a.name as name_p, a.number::float, a.first_year::integer as firstyear, a.last_year::integer as lastyear, ST_AsText(a.geom) as geom from streets_pilot_area as b join places_pilot_area as a on a.id_street::integer = b.gid::integer order by number;";
    //const SQL_Query_Select_List = "select b.gid, b.name as name_s, a.name as name_p, a.number, a.first_year as firstyear, a.last_year as lastyear, ST_AsText(a.geom) as geom from streets_pilot_area as b join places_pilot_area as a on a.id_street = b.gid where a.first_year >= 1 and a.last_year >= 1 order by number;";

    //Execute SQL Query
    const query = client.query(SQL_Query_Select_List);

    //Push Results
    query.on('row', (row) => {
      //results.push(row.name +', '+ row.number+', '+ row.year);
      results.push({id_street: row.gid, street_name: row.name_s, place_name: row.name_p, place_number: row.number, place_firstyear: row.firstyear, place_lastyear: row.lastyear, place_geom: row.geom});
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

    //Build the SQL Query ::float
    const SQL_Query_Select_List = "select b.name, b.first_year::integer as firstyear, b.last_year::integer as lastyear, ST_astext(b.geom) as geom from streets_pilot_area as b join places_pilot_area as a on a.id_street::integer = b.gid::integer order by number;";
    //const SQL_Query_Select_List = "select b.name, b.first_year as firstyear, b.last_year as lastyear, ST_astext(b.geom) as geom from streets_pilot_area as b join places_pilot_area as a on a.id_street = b.gid where a.first_year >= 1 and a.last_year >= 1 order by number;";

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
| Train Dataset                                 |
+-----------------------------------------------*/
router.get('/traindataset', (req, res, next) => {

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
    const SQL_Query_Select_List = "select b.name, b.first_year::integer as firstyear, b.last_year::integer as lastyear, ST_astext(b.geom) as geom from streets_pilot_area as b join places_pilot_area as a on a.id_street::integer = b.gid::integer where b.name is not null order by number;";

    //Execute SQL Query
    const query = client.query(SQL_Query_Select_List);

    //Push Results
    query.on('row', (row) => {
      results.push({input:row.name, output: row.name});
      //results.push({input:row.name.replace("rua", ""), output: row.name});
      //results.push({input:row.name.replace("avenida", ""), output: row.name});
      //results.push({input:row.name.replace("rua", "r."), output: row.name});
      //results.push({input:row.name.replace("avenida", "av."), output: row.name});
      //results.push({input:row.name.replace("avenida", "avevida"), output: row.name});
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
| Geolocation                                   |
+--------------------------------------------------*/
router.get('/geolocation/:textpoint,:number,:year/json', async function(req, res, next) {

  //Results variables
  let results = [];
  let head = [];

  //Develop variables
  let url;

  //Entering variables  
  let textpoint = await Match.neuralNetwork(req.params.textpoint);
  const year = req.params.year.replace(" ", "");
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

    //Check if the street is empty, year is less then 1869 ou higher then current year
    if (places_filter.length == 0){

      //Result
      results.push({name: "Point not found 1", alertMsg: "System did not find ("+ textpoint +", "+ number +", "+ year + ")"});

      //Write header
      head.push({createdAt:  getDateTime(), type: 'GET'});
      
      //Push Head
      head.push(results);

      //Return the json with results
      return res.json(head);   

    }

    places_filter = places_filter.filter(el=>el.place_number == number);
    places_filter = places_filter.filter(el=>el.place_lastyear >= year);
    places_filter = places_filter.filter(el=>el.place_firstyear <= year);

    //Check if only one result was found
    if (places_filter.length == 1){

      //Organize the Json results
      results.push({name: places_filter[0].place_name, geom: places_filter[0].place_geom, confidenceRate: Calculate.confidenceRateLocate(year)});

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
             results.push({name: "Point not found", alertMsg: "System did not find ("+ textpoint +", "+ number +", "+ year + ")"});
            
            
         
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
            p1_geom = p1_geom.substr(0,p1_geom.indexOf(")"));
            var p1_g = p1_geom;

            //take the geom number of p2_geom
            p2_geom = p2_geom.substr(p2_geom.indexOf("(")+1);
            p2_geom = p2_geom.substr(0,p2_geom.indexOf(")"));
            var p2_g = p2_geom;

            if (sublinestring == ','){

              //build the street geom
              var geometry  = ("MULTILINESTRING(("+ p1_geom+","+p2_geom +"))");

            }else{
              if(!sublinestring){

                //build the street geom
                var geometry  = ("MULTILINESTRING(("+ p1_geom+","+ p2_geom +"))");
              
              }else{
              
                //build the street geom
                var geometry  = ("MULTILINESTRING(("+ p1_geom+","+sublinestring + p2_geom +"))");
              
              }
            }
            
            //get the four variable to geocode
            var nl =  p2[0].place_number;
            var nf = p1[0].place_number;
            var num = parseInt(number);

            //Organize the Json results
            results.push({name: "Point Geolocated", geom: ("POINT("+Search.getPoint(geometry, parseInt(nf), parseInt(nl), parseInt(num)).point+")"), confidenceRate: Calculate.confidenceRateCode(p1_g.split(" "), p2_g.split(" "), year)});
            
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

/*---------------------------------------------------+
| Console Log                                        |
+---------------------------------------------------*/
console.log(process.env.PORT ? 'Listening on port '+process.env.PORT : 'Listening on port 3000');
module.exports = router;
