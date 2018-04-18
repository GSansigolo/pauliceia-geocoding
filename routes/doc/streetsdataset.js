/**
 * @api {get} /api/geocoding/streets 6 - Streets Dataset
 * @apiGroup Functions
 * 
 * @apiSuccess (Sucess 200) {String} name Name of the searched address.
 * @apiSuccess (Sucess 200) {String} geom  Geometry of the searched address.
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