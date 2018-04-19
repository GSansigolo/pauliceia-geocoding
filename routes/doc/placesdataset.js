/**
 * @api {get} /api/geocoding/places 5 - Places Dataset
 * @apiGroup Functions
 * 
 * @apiSuccess (Sucess 200) {String} name String with the street name.
 * @apiSuccess (Sucess 200) {Number} year Number with the address year.
 * @apiSuccess (Sucess 200) {Number} number Number with the address number.
 * @apiSuccess (Sucess 200) {String} geom String with the address geom.
 * 
 * @apiSuccessExample {json} Success-Response:
 *   [
 *      {
 *       "name":"rua senador feijo",
 *       "number":2,
 *       "year":1899,
 *       "geom": "POINT(-46.6489132401614 -23.548082948768)"
 *      },
 *      {
 *       "name":"praça marechal deodoro",
 *       "number":2,
 *       "year":1905
 *       "geom": "POINT(-46.652674610004 -23.5313864330752)"
 *      }
 *      ...
 * ]
 * 
 */ 