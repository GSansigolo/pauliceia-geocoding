//line -> geometria do rua
//point-> geometria do ponto

exports.lineLocatePoint = function(line, point){

    //tratar a string da geometria linha
    var geomLine = line.substr(line.indexOf("(")+2);
    geomLine = geomLine.substr(0,geomLine.indexOf(")"));
    
    //tratar a string da geometria linha
    var geomPoint = point.substr(point.indexOf("(")+1);
    geomPoint = geomPoint.substr(0,geomPoint.indexOf(")"));
    
    //logica

    //porcentagem do numero e distancia que ele possue nessa rua
    var percNum = (num-nf)/(nl-nf);
    var distDesired = distTotal*percNum;

}