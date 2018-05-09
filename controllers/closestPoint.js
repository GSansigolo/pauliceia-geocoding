//line -> geometria do rua
//point-> geometria do ponto

//exports.closestPoint = function(line, point){
function closestPoint(line, point){

    //tratar a string da geometria linha
    var geomLine = line.substr(line.indexOf("(")+2);
    geomLine = geomLine.substr(0,geomLine.indexOf(")"));

    //tratar a string da geometria linha
    var geomPoint = point.substr(point.indexOf("(")+1);
    geomPoint = geomPoint.substr(0,geomPoint.indexOf(")"));

    //divide o endereço em x y
    var coordinatesPoint = geomPoint.split(' ');

    //divide a rua em grupo de pontos
    var pointsLine = geomLine.split(',');

    //logica
    
    //alerta para testar valores
    alert("coordinatesPoint: " + coordinatesPoint + "\n \n" + "pointsLine: " + pointsLine);
    
 	//return geomPoint, geomLine;
}