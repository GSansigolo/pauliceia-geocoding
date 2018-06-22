//line -> geometria do rua

  exports.lineMerge = function(line){
  //function lineMerge(line){

    //tratar a string da geometria linha
    var geomLine = line.substr(line.indexOf("(")+2);
    geomLine = geomLine.substr(0,geomLine.indexOf(")"));

    return ('LINESTRING('+ geomLine +')')
}