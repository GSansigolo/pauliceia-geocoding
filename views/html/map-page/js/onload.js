function onload(){
    var url = (localStorage.getItem("storageURL"));
    //var url = "http://127.0.0.1:3000/api/geolocation/rua%20jose%20bonifacio,%207,%201933/json";
    
    var request = new XMLHttpRequest();  
    request.open("GET", url, false);   
    request.send(null);  
    
    if (request.status === 200) 
    {  
        var obj = JSON.parse(request.responseText); 
        localStorage.setItem("lonlat", JSON.stringify(obj[2][0].geom));
    }

    var geom2 = (localStorage.getItem("lonlat"));
    //alert('LonLat: ', geom2);
    geom2 = geom2.replace("POINT(", "");
    geom2 = geom2.replace(')"', '');
    geom2 = geom2.replace('"', '');
    localStorage.setItem("lonlat", geom2);
}

