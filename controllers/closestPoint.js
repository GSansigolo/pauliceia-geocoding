//line -> geometria do rua
//point-> geometria do ponto

//exports.closestPoint = function(line, point){
function closestPoint(line, point){

    //tratar a string da geometria linha
    var geomLine = line.substr(line.indexOf("(")+2);
    geomLine = geomLine.substr(0,geomLine.indexOf(")"));

    //tratar a string da geometria ponto
    var geomPoint = point.substr(point.indexOf("(")+1);
    geomPoint = geomPoint.substr(0,geomPoint.indexOf(")"));

    //variaveis globais
    var distances = [];
    var distTotal = 0;
    var minDistance = 1000;

    //divide o endereço em x y
    var coordinates = geomPoint.split(' ');

    //divide a rua em grupo de pontos
    var pointsLine = geomLine.split(',');
     
    //loop para somar as distancias
    for (var i = 1; i < pointsLine.length; i++) {

        //insere as distancias no array distances
        distances[i] = getDistance(pointsLine[(i-1)].split(' ')[0], pointsLine[(i-1)].split(' ')[1], pointsLine[(i)].split(' ')[0], pointsLine[(i)].split(' ')[1]);
        distTotal = distTotal + distances[i];

        //descobre onde se encontre o endereço buscados
        if (getDistance(geomPoint.split(' ')[0], geomPoint.split(' ')[1], pointsLine[(i)].split(' ')[0], pointsLine[(i)].split(' ')[1]) < minDistance) {
        	minDistance = getDistance(geomPoint.split(' ')[0], geomPoint.split(' ')[1], pointsLine[(i)].split(' ')[0], pointsLine[(i)].split(' ')[1])
        	index = i;
        }
    }

    //declara variavel P1
    var P1 = [];
    P1.x = geomPoint.split(' ')[0];
    P1.y = geomPoint.split(' ')[1];
    
    //declara variavel P1
    var P2 = [];
    P2.x = pointsLine[(index-1)].split(' ')[0]
    P2.y = pointsLine[(index-1)].split(' ')[1]
    
    //declara variavel P1
    var P3 = [];
    P3.x = pointsLine[(index)].split(' ')[0]
    P3.y = pointsLine[(index)].split(' ')[1]
    
    //usar triangulo para descobrir a altura

}

//FUNÇÕES AUXILIARES
var getDistance = function(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}