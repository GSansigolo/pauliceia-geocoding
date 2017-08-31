// Get the <datalist> and <input> elements.
var dataList = document.getElementById('json-datalist');
var input = document.getElementById('ajax');

// Create a new XMLHttpRequest.
var request = new XMLHttpRequest();

// Handle state changes for the request.
request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      // Parse the JSON
      var jsonOptions = JSON.parse(request.responseText);
  
      // Loop over the JSON array.
      jsonOptions.forEach(function(item) {
        // Create a new <option> element.
        var option = document.createElement('option');
        // Set the value using the item in the JSON array.
        option.value = item;
        // Add the <option> element to the <datalist>.
        dataList.appendChild(option);
      });
      
      // Update the placeholder text.
      input.placeholder = "";
    } else {
      // An error occured :(
      input.placeholder = "Couldn't load datalist options :(";
    }
  }
};

// Update the placeholder text.
input.placeholder = "Loading options...";

// Set up and make the request.
request.open('GET', 'https://api.myjson.com/bins/mgez9', true);

//exemple right json: https://api.myjson.com/bins/mgez9

request.send();

function getData(){
  var requestURL = 'http://localhost:3000/api/geolocation/'+document.getElementById('ajax').value+'/json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
}
function CallURL(){
  request.onload = getData();{
    var jsondatatext = request.response;
    var jsondata = JSON.parse(jsondatatext);
  }
  alert(jsondata);
}
