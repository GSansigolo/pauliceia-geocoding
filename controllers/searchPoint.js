//geometry -> geometria do trecho 
//nf-> numero ponto inicial (mais proximo melhor)
//nl-> numero ponto final (mais proximo melhor)
//num -> numero ponto desejado

exports.getPoint = function(geometry, nf, nl, num){

    //validações dos dados
    if( isNaN(nf) || isNaN(nl) || isNaN(num) ) return { 
            point: null, error: "nf, nl and num are necessary be integers" 
        };
    if(geometry=="" || geometry.toUpperCase().indexOf("LINESTRING") == -1 || geometry.indexOf(",") == -1) return {
            point: null, error: "coordinates of geometry invalid"
        };

    //tratar a string da geometria
    var geom = geometry.substr(geometry.indexOf("(")+2);
    var geom = geom.substr(0,geom.indexOf(")"));

    //separa os pontos da linha
    var distTotal = 0;
    var points = geom.split(',');
    
    //verfica se o numero esta entre o inicial e o final da rua
    if(num<nf) return { point: points[0], error: null};
    if(num>nl) return { point: points[points.length-1], error: null};
    
    //criar vetor com as distancias entre os pontos daa linha
    var distances = [];
    for(var i=0; i<points.length; i++){
        if(i==0){
            distances[i]=0;
        }else{
            v1=points[i-1].split(" ");
            v2=points[i].split(" ");
            distances[i]=getDistance(parseFloat(v1[0]), parseFloat(v1[1]), parseFloat(v2[0]), parseFloat(v2[1]));
            distTotal+=distances[i];
        }
    }

    //porcentagem do numero e distancia que ele possue nessa rua
    var percNum = (num-nf)/(nl-nf);

    var distDesired = distTotal*percNum;

    var indice = getInterval(distances, distDesired);    
    
    return getRes(distDesired, indice, points, distances);
}

//FUNÇÕES AUXILIARES
    var getDistance = function(x1, y1, x2, y2){
        // calcula a distância
        /* d = sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1)) */ 
        return Math.sqrt( (Math.pow((parseFloat(x2)-parseFloat(x1)),2)) + (Math.pow((parseFloat(y2)-parseFloat(y1)),2)) );
    }

    var getInterval = function(distances, distDesired){
        //encontra o indice do trecho em que o ponto deve ser inserido na rua
        var i, c;
        for(i=0, c=distances[0]; i<distances.length; i++){
            if(c>=distDesired) {
                c+=distances[i+1]
                return i;
            }
        }
        return i-1;
    }

    var getRes = function(distDesired, indice, points, distances){
        
        let sum = 0;

        for (let i=0; i <= indice; i++){ 
            sum += distances[i] 
        }

        //encontra as coordenadas X e Y
        var distSearch = (distDesired-distances[indice-1])/sum;

        var v1=points[indice-1].split(" ");
        var v2=points[indice].split(" ");

        var x = ((parseFloat(v2[0])-parseFloat(v1[0]))*distSearch)+parseFloat(v1[0]);
        var y = ((parseFloat(v2[1])-parseFloat(v1[1]))*distSearch)+parseFloat(v1[1]);

        return {
            point: x+" "+y, error: null
        };
    }