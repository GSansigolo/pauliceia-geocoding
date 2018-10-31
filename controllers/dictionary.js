//function dictionary
exports.dictionary = function(streetName){
    let myDict = {
        "r": "rua",
        "r.": "rua",
        "a":"avenida",
        "a.":"avenida",
        "av":"avenida",
        "av.":"avenida",
        "avn":"avenida",
        "avn.":"avenida",
        "11":"onze",
        "15":"quinze"
    }
    let words = streetName.split(' ')
    for (let word in words) {
        for (let key in myDict) {
            if (key == words[word]) {
                words[word] = myDict[key]
            }
        }
    }
    return words.join(' ');
}