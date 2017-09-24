function onload(){
    var url = (localStorage.getItem("storageURL"));

    $.getJSON(geocodingAPI, function (json) {

        // Set the variables from the results array
        var lonlat = json.results[0].geom;
        console.log('Latitude : ', geom);
        // Set the table td text
        $('#lonlat').text(geom);
        localStorage.setItem("lonlat", geom);
    });

    var geom2 = localStorage.setItem("lonlat", geom);
    geom2 = geom2.replace("POINT(", "");
    geom2 = geom2.replace(")", "");
    
    localStorage.setItem("lonlat", geom2);

}

