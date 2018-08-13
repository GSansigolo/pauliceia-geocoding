var bayes = require('bayes')
var classifier = bayes()

//streetName -> searched text

exports.neuralNetwork = function(streetName){

    //teach it positive phrases
    classifier.learn('amazing', 'positive')
    classifier.learn('sweet', 'positive')
    classifier.learn('sweet', 'positive')
    
    //teach it a negative phrase
    classifier.learn('terrible', 'negative') 

    //now ask it to categorize a document it has never seen before
    var a = classifier.categorize('avesome')
    
    console.log(a);

    //return the matched name
    return streetName
}