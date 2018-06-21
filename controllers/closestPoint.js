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

    //declara variavel P
    var P = [];
    P.x = geomPoint.split(' ')[0];
    P.y = geomPoint.split(' ')[1];
    
    console.log('P: '+P.x +' '+P.y);

    //declara variavel A
    var A = [];
    A.x = pointsLine[(index-1)].split(' ')[0]
    A.y = pointsLine[(index-1)].split(' ')[1]

    console.log('A: '+A.x +' '+A.y);
    
    //declara variavel B
    var B = [];
    B.x = pointsLine[(index)].split(' ')[0]
    B.y = pointsLine[(index)].split(' ')[1]

    console.log('B: '+B.x +' '+B.y);
    
    //P = (4,2) 
    //A = (2,2) 
    //B = (3,3)
    
    var AP = [];
    AP.x = P.x - A.x;
    AP.y = P.y - A.y;

    console.log('AP: '+AP.x +' '+AP.y);

    var AB = [];
    AB.x = B.x - A.x; 
    AB.y = B.y - A.y;

    console.log('AB: '+AB.x+' '+AB.y);
    
    var AB2 = AB.x*AB.x + AB.y*AB.y;
    var AP_AB = AP.x*AB.x + AP.y*AB.y;
    var t = AP_AB / AB2;

    console.log('AB2: '+AB2);
    console.log('AP_AB: '+AP_AB);
    console.log('t: '+t);
    
    var closestPoint = [];
    closestPoint.x = A.x + AB.x * t;
    closestPoint.y = A.y + AB.y * t;

    console.log(closestPoint);

    /*
    Vector A, Vector B, Vector P,
    
    Vector AP = P - A:
    Vector AB = B - A;
    float ab2 = AB.x*AB.x + AB.y*AB.y;
    float ap_ab = AP.x*AB.x + AP.y*AB.y;
    float t = ap_ab / ab2;
    if (segmentClamp)
    {
         if (t < 0.0f) t = 0.0f;
         else if (t > 1.0f) t = 1.0f;
    }
    Vector Closest = A + AB * t;
    return Closest;*/

}

//FUNÇÕES AUXILIARES
var getDistance = function(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}