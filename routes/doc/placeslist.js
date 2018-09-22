/**
 * @api {get} /api/geocoding/placeslist 4 - Places List
 * @apiGroup Routes
 * 
 * @apiSuccess (Success 200) {String} 0 String with the name of the street, number and year of an address.
 *
 * @apiSuccessExample {json} Success-Response:
 *   [
 *      {
 *          [
 *              "alameda ribeiro da silva, 523, 1935",
 *              "alameda ribeiro da silva, 20, 1935",
 *              "alameda ribeiro da silva, 932, 1935",
 *              "avenida tiradentes, 2, 1931",
 *              "avenida tiradentes, 441, 1940"
 *              ...
 *  ]
 * 
 */ 