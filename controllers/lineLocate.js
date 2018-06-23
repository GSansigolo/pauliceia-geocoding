//line -> geometria do rua
//point-> geometria do ponto

exports.lineLocate = function(line, point){
    
    //tratar a string da geometria ponto
    var geomPoint = point.substr(point.indexOf("(")+1);
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
       
        //retorna o resultado
        return (distDesired)/(distTotal)

    }else{
    
        //loop para somar a distancia entre o ponto inicial e o ponto procurado
        for (var i = 1; i < index; i++) {
            
            //insere as distancias no array 
            distDesired = distDesired + getDistance(pointsLine[(i-1)].split(' ')[0], pointsLine[(i-1)].split(' ')[1], pointsLine[(i)].split(' ')[0], pointsLine[(i)].split(' ')[1]);

        }

        //soma as distancias com a distancia entre o entre o ultimo ponto e ponto buscado
        distDesired = distDesired + getDistance(geomPoint.split(' ')[0], geomPoint.split(' ')[1], pointsLine[index-1].split(' ')[0], pointsLine[index-1].split(' ')[1]);
        
        //retorna o resultado
        return (distDesired)/(distTotal)
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
            if (getDistance(geomPoint.split(' ')[0], geomPoint.split(' ')[1], pointsLine[(i-1)].split(' ')[0], pointsLine[(i-1)].split(' ')[1]) < minDistance) {
                minDistance = getDistance(geomPoint.split(' ')[0], geomPoint.split(' ')[1], pointsLine[(i-1)].split(' ')[0], pointsLine[(i-1)].split(' ')[1])
                index = i;
            }
        }
    
        //declara variavel P
        var P = [];
        P.x = geomPoint.split(' ')[0];
        P.y = geomPoint.split(' ')[1];
    
        //declara variavel A
        var A = [];
        A.x = pointsLine[(index-1)].split(' ')[0];
        A.y = pointsLine[(index-1)].split(' ')[1];
    
        
        //declara variavel B
        var B = [];
        B.x = pointsLine[(index)].split(' ')[0];
        B.y = pointsLine[(index)].split(' ')[1];
        
        //declara variavel AP
        var AP = [];
        AP.x = P.x - A.x;
        AP.y = P.y - A.y;
    
        //declara variavel AB    
        var AB = [];
        AB.x = B.x - A.x;
        AB.y = B.y - A.y;
    
        //declara variavel ab2, ap_ab e t
        var ab2 = AB.x*AB.x + AB.y*AB.y;
        var ap_ab = AP.x*AB.x + AP.y*AB.y;
        var t = ap_ab / ab2;
        
        //calcula closestPoint usando primeiro ponto mais a distancia total vezes t
        closestPoint.x = parseFloat(A.x) + parseFloat(AB.x) * parseFloat(t);
        closestPoint.y = parseFloat(A.y) + parseFloat(AB.y) * parseFloat(t);
    
        //alert("POINT("+closestPoint.x +" "+closestPoint.y+")");
        return("POINT("+closestPoint.x +" "+closestPoint.y+")");
        
}
        