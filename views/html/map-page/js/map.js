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

    alert();
}
