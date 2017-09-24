function onload(){
    var url = (localStorage.getItem("storageURL"));
    //alert(url);
    loadJSON(function(response) {
        // Do Something with the response e.g.
        var jsonresponse = JSON.parse(response);
        // Assuming json data is wrapped in square brackets as Drew suggests
        alert(jsonresponse[0].geom);
    });
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}