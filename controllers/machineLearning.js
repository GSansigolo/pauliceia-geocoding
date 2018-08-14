//streetName -> searched text
//streetsList -> Json with all streets

//imports
let bayes = require('bayes')
let classifier = bayes()

exports.machineLearning = function(streetName){

    let url = 'http://www.pauliceia.dpi.inpe.br/api/geocoding/streets'
    //acessar url pegar o JSON.parse(body) e colocar em  streetsList = []

    //for loop to teach the correct name of the streets
    for (let i in streetsList){
        //teach it the correct name of the streets i
        classifier.learn(streetsList[i].street_name, streetsList[i].street_name)
    }

    //now ask it to categorize a streetName it has never seen before
    let streetCategorized = classifier.categorize(streetName)

    //return the matched name
    return streetCategorized
}
