//street -> geometria da rua
//startfraction-> porcentagem onde se inicia o trecho em relação a rua
//endfraction-> porcentagem onde se termina o trecho em relação a rua

//exports.lineSubstring = function(street, startfraction, endfraction){
function lineSubstring(street, startfraction, endfraction){

    //tratar a string da geometria linha
    var geomStreet = street.substr(street.indexOf("(")+2);
    geomStreet = geomStreet.substr(0,geomStreet.indexOf(")"));
    
    alert("street: "+ street+ "\n"+"startfraction: "+ startfraction + "\n" + "endfraction: " + endfraction);
    
}