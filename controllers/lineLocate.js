//line -> geometria do rua
//point-> geometria do ponto

//exports.lineLocate = function(line, point){
function lineLocate(line, point){
    
    //tratar a string da geometria ponto
    var geomPoint = closestPoint(line, point).substr(closestPoint(line, point).indexOf("(")+1);
    geomPoint = geomPoint.substr(0,geomPoint.indexOf(")"));

    //tratar a string da geometria linha
    var geomLine = line.substr(line.indexOf("(")+2);
    geomLine = geomLine.substr(0,geomLine.indexOf(")"));

    //divide a rua em grupo de pontos
    var pointsLine = geomLine.split(',');
    
    //variaveis globais
    var distances = [];
    var distTotal = 0;
    var minDistance = 1000;
    var index = 0;
    var distDesired = 0;
    
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

    //checa se o dado se encontra no primeiro intervale
    if (index==1){

        //soma as distancias com a distancia entre o entre o ultimo ponto e ponto buscado
        distDesired = distDesired + getDistance(geomPoint.split(' ')[0], geomPoint.split(' ')[1], pointsLine[0].split(' ')[0], pointsLine[0].split(' ')[1]);

        alert((distDesired)/(distTotal));
        //return (distDesired)/(distTotal)

    }else{
    
        //loop para somar a distancia entre o ponto inicial e o ponto procurado
        for (var i = 1; i < index+1; i++) {
            
            //insere as distancias no array 
            distDesired = distDesired + getDistance(pointsLine[(i-1)].split(' ')[0], pointsLine[(i-1)].split(' ')[1], pointsLine[(i)].split(' ')[0], pointsLine[(i)].split(' ')[1]);

            console.log(i+"-"+(i+1));
        }

        //soma as distancias com a distancia entre o entre o ultimo ponto e ponto buscado
        distDesired = distDesired + getDistance(geomPoint.split(' ')[0], geomPoint.split(' ')[1], pointsLine[index].split(' ')[0], pointsLine[index].split(' ')[1]);

        alert((distDesired)/(distTotal));
        //return (distDesired)/(distTotal)
    }

}

//FUNÇÕES AUXILIARES
var getDistance = function(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}

//var function cloosestPoint()