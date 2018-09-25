//p1 -> latitude, longitude, year
//p2 -> latitude, longitude, year

exports.confidenceRateCode = function(p1, p2, year){
    
    //define references
    var pointRef = [-46.63617,-23.54360];
    var firstYear = 1860;
    var lastYear = 1940;

    //calculate distances
    var distP1 = getDistance(p1[0], p1[1], year, pointRef[0], pointRef[1], year);
    var distP2 = getDistance(p2[0], p2[1], year, pointRef[0], pointRef[1], year);
    
    //calculate rate 
    var meanDist = (distP1+distP2)/2;
    var total = getDistance(pointRef[0], pointRef[1], firstYear, pointRef[0], pointRef[1], lastYear);
    var distRel = getDistance(pointRef[0], pointRef[1], firstYear, pointRef[0], pointRef[1], year);

    //coenficent
    var confidenceRate = (distRel+meanDist)/total; //  (((distRel+meanDist)/total)-0.9)*10;

    //return the rate
    return confidenceRate
}

exports.confidenceRateLocate = function(year){
    
    //return the rate
    return 1

}

//Euclidian Distance
var getDistance = function(x1, y1, z1, x2, y2, z2){
    return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(z2-z1)*(z2-z1));
}


