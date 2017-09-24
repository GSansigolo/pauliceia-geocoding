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

function handleXML(){
    txt = xhttp;
    checkState(xmlhttp, function() {
    
    txt=xmlhttp.responseText + "";
    txt.replace(/<&#91;^>&#93;*>/g, "");
    //Convert txt into a string so that I can use it
    });
}

function onload(){
    var url = (localStorage.getItem("storageURL"));

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           document.getElementById("geom").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

    handleXML();
    
    alert(txt);
}
