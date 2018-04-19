/**
 * @api {get} /api/geocoding/streets 6 - Streets Dataset
 * @apiGroup Functions
 * 
 * @apiSuccess (Sucess 200) {String} name String with the street name.
 * @apiSuccess (Sucess 200) {Number} year Number with the address year.
 *
 * @apiSuccessExample {json} Success-Response:
 *
 *   [
 *     {
 *      "name":"rua caio prado",
 *      "year":1930
 *     },
 *     {
 *      "name":"rua albuquerque lins",
 *      "year":1931
 *     },
 *     { 
 *      "name":"rua elisa whitacker",
 *      "year":1930
 *     }
 *     ...
 *  ]
 */ 