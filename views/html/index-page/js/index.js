// Get the <datalist> and <input> elements.
localStorage.setItem("lonlat", "");
localStorage.setItem("storageURL", "");
var dataList = document.getElementById('json-datalist');
var input = document.getElementById('ajax');
var webServiceAdress = "http://localhost:3000";
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
request.open('GET', webServiceAdress +'/api/listQuickSearch', false);


request.send();

function CallURL(){

  localStorage.setItem("storageURL", webServiceAdress +'/api/geolocation/'+document.getElementById('ajax').value+'/json');
  var strWindowFeatures = "location=ye,scrollbars=yes,status=yes";
  var URL = "map.html";
  var win = window.open(URL, "_self", strWindowFeatures);
}

