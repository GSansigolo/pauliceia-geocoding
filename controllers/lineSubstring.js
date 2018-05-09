//street -> geometria da rua
//startfraction-> porcentagem onde se inicia o trecho em relação a rua
//endfraction-> porcentagem onde se termina o trecho em relação a rua

exports.lineSubstring = function(street, startfraction, endfraction){

    //tratar a string da geometria linha
    var geomStreet = street.substr(line.indexOf("(")+2);
    geomStreet = geomStreet.substr(0,geomStreet.indexOf(")"));
    
    //logica
    
}

//FUNÇÕES AUXILIARES
var getInterval = function(distances, distDesired){
    //encontra o indice do trecho em que o ponto deve ser inserido na rua
    var i;
    for(i=0; i<distances.length; i++){
        if(distances[i]>=distDesired) return i;
    }
    return i-1;
}