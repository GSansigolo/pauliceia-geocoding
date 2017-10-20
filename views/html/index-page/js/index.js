// Get the <datalist> and <input> elements.
localStorage.setItem("lonlat", "");
localStorage.setItem("storageURL", "");
var dataList = document.getElementById('json-datalist');
var input = document.getElementById('ajax');
var webServiceAdress = "http://localhost:3000";
var json = {};

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
  if (document.getElementById('ajax').value.substring(0, 5) == "File:" ){

  } else {
    localStorage.setItem("storageURL", webServiceAdress +'/api/geolocation/'+document.getElementById('ajax').value+'/json');
    var strWindowFeatures = "location=ye,scrollbars=yes,status=yes";
    var URL = "map.html";
    var win = window.open(URL, "_self", strWindowFeatures);
}
}


function openAttachment() {
  document.getElementById('attachement').click();
}

function fileSelected(input){
  document.getElementById('ajax').value = "File: " + input.files[0].name;
  //json =  input.files[0].name;
  var reader = new FileReader();
  reader.onload = function () {
    var text = reader.result;
    var node = document.getElementById('output');
    json = text;
};
reader.readAsText(input.files[0]);
}

var openFile = function (event) {
  var input = event.target;
};


function serchinservice(){
      
      if (document.getElementById('ajax').value.substring(0, 5) == "File:" ){

        localStorage.setItem("storageURL", webServiceAdress +'/api/multiplegeolocation/'+json+'/json');
        var strWindowFeatures = "location=ye,scrollbars=yes,status=yes";
        var win = window.open(webServiceAdress +'/api/multiplegeolocation/'+json+'/json', "_self", strWindowFeatures);
        
       } else {

        var strWindowFeatures = "location=ye,scrollbars=yes,status=yes";
        var win = window.open(webServiceAdress +'/api/geolocation/'+document.getElementById('ajax').value+'/json', "_self", strWindowFeatures);
       
      }
    }