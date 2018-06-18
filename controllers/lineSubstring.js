//street -> geometria da rua
//startfraction-> porcentagem onde se inicia o trecho em relação a rua
//endfraction-> porcentagem onde se termina o trecho em relação a rua

//exports.lineSubstring = function(street, startfraction, endfraction){
function lineSubstring(street, startfraction, endfraction){

    //tratar a string da geometria linha
    var geomStreet = street.substr(street.indexOf("(")+2);
    geomStreet = geomStreet.substr(0,geomStreet.indexOf(")"));
    
    //divide a rua em grupo de pontos
    var pointsLine = geomStreet.split(',');

     //variaveis globais
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
        
        //verifica se a fração é a buscada
        if (frac[i] == startfraction){
            
            //adiciona as coordenadas da fração buscada no resultado
            results = pointsLine[(i)].split(' ')[0] + ' '+ pointsLine[(i)].split(' ')[1];
            
            //loop para percorer o restante da linha
            for (var j = i; j < distances.length; j++){

                //checa se a fração é a segunda buscada
                if (frac[j] == endfraction){

                    //checa se estamos no último ponto
                    if (j == distances.length-1){

                        //adiciona o ultimo ponto ao resultado
                        results = results +', '+ pointsLine[(j+1)].split(' ')[0] + ' '+ pointsLine[(j+1)].split(' ')[1];;
                    }
                    //retorn resultado
                    alert('LINESTRING('+results+')')
                    //return('LINESTRING('+results+')')
                }

                //adiciona ponto ao resultado
                results = results +', '+ pointsLine[(j+1)].split(' ')[0] + ' '+ pointsLine[(j+1)].split(' ')[1];
            }
        }
    }
}

//FUNÇÕES AUXILIARES
var getDistance = function(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
