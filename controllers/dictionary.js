//function dictionary
exports.dictionary = function(streetName){
    let myDict = {
        "r": "rua",
        "a":"avenida" 
    }
    let words = streetName.toLowerCase().split(' ')
    for (let word in words) {
        for (let key in myDict) {
            if (key == words[word]) {
                words[word] = myDict[key]
            }
        }
    }
    return words.join(' ');
}