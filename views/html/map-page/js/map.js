
function mapa(){
    var map;

    var mercator = new OpenLayers.Projection("EPSG:3857");

    map = new OpenLayers.Map("map",{
        projection: mercator,
        allOverlays: true,
        displayProjection: "EPSG:4326",
        numZoomLevels: 24,
        tileManager: new OpenLayers.TileManager({
            cacheSize:2048
        }),
        eventListeners: {
            //"moveend": mapEventMoveEnd
            //"zoomend": mapEventZoomend,
            //"mousemove": mapEventMouseMove
        },
        controls: [ new OpenLayers.Control.Navigation()]});
    
    osm = new OpenLayers.Layer.OSM( "OpenStreetMap", null,
               {			        				    	
           visibility: false,			        				
           numZoomLevels: 24,
           minZoomLevel:  10,
           maxZoomLevel:  24,			        						
           });
    map.addLayers([osm]);
}
