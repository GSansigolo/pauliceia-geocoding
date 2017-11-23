function onload(){
    var url = (localStorage.getItem("storageURL"));
    console.log(url);
    
    var request = new XMLHttpRequest();  
    request.open("GET", url, false);   
    request.send(null);  
    
    if (request.status === 200) 
    {  
        var obj = JSON.parse(request.responseText); 
        localStorage.setItem("lonlat","");
        localStorage.setItem("lonlat", JSON.stringify(obj[2][0].geom));
    }

    var geom2 = (localStorage.getItem("lonlat"));
    
    //alert('LonLat: ', geom2);
    geom2 = geom2.replace("POINT(", "");
    geom2 = geom2.replace(')"', '');
    geom2 = geom2.replace('"', '');

    localStorage.setItem("lonlat", "");
    localStorage.setItem("lonlat", geom2);
    //location.reload(); 
}

