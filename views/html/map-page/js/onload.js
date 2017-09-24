function onload(){

    var url = (localStorage.getItem("storageURL"));
    alert(url);
    (function () {
      var myData;

      function test(callback) {
        $.getJSON(url, function (data) {
          callback(data);
        });
      }

      test(function (data) {
        geom = data.geom;
      });
    });

    alert(geom);
}
