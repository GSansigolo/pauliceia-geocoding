//line -> geometria do rua
//point-> geometria do ponto

//exports.closestPoint = function(line, point){

function closestPoint(line, point){

    //tratar a string da geometria linha
    var geomLine = line.substr(line.indexOf("(")+2);
    geomLine = geomLine.substr(0,geomLine.indexOf(")"));

    //tratar a string da geometria linha
    var geomPoint = point.substr(point.indexOf("(")+2);
    geomPoint = geomPoint.substr(0,geomPoint.indexOf(")"));

    alert("geomPoint: " + geomPoint + "\n \n" + "geomLine: " + geomLine);

 	//return geomPoint, geomLine;
}