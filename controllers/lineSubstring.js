//street -> geometria da rua
//startfraction-> porcentagem onde se inicia o trecho em relação a rua
//endfraction-> porcentagem onde se termina o trecho em relação a rua

exports.lineSubstring = function(street, startfraction, endfraction){
//function lineSubstring(street, startfraction, endfraction){

    //tratar a string da geometria linha
    var geomStreet = street.substr(street.indexOf("(")+2);
    geomStreet = geomStreet.substr(0,geomStreet.indexOf(")"));
    
    //divide a rua em grupo de pontos
    var pointsLine = geomStreet.split(',');

     //variaveis globais
     var results = [];
     var distances = [];
     var frac = [];
     var index = 0;
     var distDesired = 0;
     var distTotal = 0;

     //loop para somar as distancias e 
     for (var i = 1; i < pointsLine.length; i++) {

         //insere as distancias no array distances
         distances[i-1] = getDistance(pointsLine[(i-1)].split(' ')[0], pointsLine[(i-1)].split(' ')[1], pointsLine[(i)].split(' ')[0], pointsLine[(i)].split(' ')[1]);
         
         //soma as distancias para criar o distTotal
         distTotal = distTotal + getDistance(pointsLine[(i-1)].split(' ')[0], pointsLine[(i-1)].split(' ')[1], pointsLine[(i)].split(' ')[0], pointsLine[(i)].split(' ')[1]);
         
    }
    
    distances[pointsLine.length-1] = distTotal;

    //loop para calcular frações
    for (var i = 0; i < distances.length; i++) {

        //variavel para calcular distancia até um ponto
        var distPoint = 0;

        //loop para somar as distancias até aquele ponto
        for (var j = 0; j < i; j++) {
            
            //somatoria
            distPoint = distPoint + distances[j]
        }

        //fração
        frac[i] = distPoint/distTotal;
    }

    //loop para percorer as frações 
    for (var i = 0; i < distances.length; i++) {

        //verifica o último ponto
        if (frac[i] > endfraction){

            //retorna resultado
            return(results + ",");
        } 
        
        //verifica se o último ponto é o último
        if (frac[i] == endfraction){
            
            //retorna resultado
            return(results);
        }         

        //busca o primeiro ponto
        if (frac[i] > startfraction){

            //adiciona as coordenadas da fração buscada no resultado
            results.push(pointsLine[(i)].split(' ')[0] +' '+ pointsLine[(i)].split(' ')[1]);
        } 
    }
}

//FUNÇÕES AUXILIARES
var getDistance = function(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
