var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
  });

function onload(){
    var url = (localStorage.getItem("storageURL"));
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();

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
            }
        }
    };
    alert(document.getElementById('option'));
}
