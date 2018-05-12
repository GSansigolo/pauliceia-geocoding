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

    //divide o endereço em x y
    var coordinates = geomPoint.split(' ');

    //divide a rua em grupo de pontos
    var pointsLine = geomLine.split(',');
    
    //variaveis globais
    var closestPoints = [];
    var distances = [];
    var minDistance = 1000;
    var indexminDistance = 0;
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
            indexminDistance = i;
        }
    }

    alert("POINT("+closestPoints[indexminDistance]+")");
 	//return ("POINT("+closestPoints[indexminDistance]+")");
}

//FUNÇÕES AUXILIARES
var getDistance = function(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}