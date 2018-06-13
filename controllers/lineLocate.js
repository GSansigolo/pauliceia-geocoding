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

var closestPoint = function(line, point){

    //tratar a string da geometria linha
    var geomLine = line.substr(line.indexOf("(")+2);
    geomLine = geomLine.substr(0,geomLine.indexOf(")"));

    //tratar a string da geometria linha
    var geomPoint = point.substr(point.indexOf("(")+1);
    geomPoint = geomPoint.substr(0,geomPoint.indexOf(")"));

    //divide o endereço em x y
    var coordinates = geomPoint.split(' ');

    //divide a rua em grupo de pontos
    var pointsLine = geomLine.split(',');
    
    //variaveis globais
    var closestPoints = [];
    var distances = [];
    var minDistance = 1000;
    var index = 0;
    var results;
    
    //loop para encontrar qual segmento
    for (var i = 0; i < pointsLine.length-1; i++) {

        //interpola primeiro segmento de reta com x do ponto
        var APx = coordinates[0] - pointsLine[i].split(' ')[0];
        var APy = coordinates[1] - pointsLine[i].split(' ')[1];
        
        //interpola segundo segmento de reta com primeiro segundo
        var ABx = pointsLine[(i+1)].split(' ')[0] - pointsLine[i].split(' ')[0];
        var ABy = pointsLine[(i+1)].split(' ')[1] - pointsLine[i].split(' ')[1];

        //multiplicação entre as interpolações
        var magAB2 = ABx*ABx + ABy*ABy;
        var ABdotAP = ABx*APx + ABy*APy;

        //calculo da determinante
        var t = ABdotAP / magAB2;
        
        //verifica se a determinante é negativa
        if (t < 0){

            //encontra o xmin e ymin do ponto mais proximo da reta
            var xmin = pointsLine[i].split(' ')[0];
            var ymin = pointsLine[i].split(' ')[1];
        }   

        //verifica se a determinante é maior que um
        else if (t > 1){

            //encontra o xmin e ymin do ponto mais proximo da reta
            var xmin = pointsLine[(i+1)].split(' ')[0];
            var ymin = pointsLine[(i+1)].split(' ')[1];
        }

        //verifica se a determinante é de 0 até 1
        else{

            //encontra o xmin e ymin do ponto mais proximo da reta
            var xmin = parseFloat((pointsLine[i].split(' ')[0] + ABx*t));
            var ymin = parseFloat((pointsLine[i].split(' ')[1] + ABy*t));
        }   

        //insere o xmin e o ymin no array closestpoints
        closestPoints[i] = xmin+" "+ymin;

        //insere as distancias no array disstances
        distances[i] = getDistance(coordinates[0], coordinates[1], xmin, ymin);
        
        //compara distancia atual com o maior valor
        if (distances[i] < minDistance){
            minDistance = distances[i];
            index = i;
        }
    }

    return ("POINT("+closestPoints[index]+")");
}
