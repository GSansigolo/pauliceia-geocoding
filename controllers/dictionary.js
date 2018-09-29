//function dictionary
exports.dictionary = function(streetName){
    let myDict = {
        "rua": "r",
        "avenida": "a"
    }
    let words = streetName.toLowerCase().split(' ')
    for (let word in words) {
        for (let key in myDict) {
            if (myDict[key] == words[word]) {
                words[word] = key
            }
        }
    }
    return words.join(' ');
}