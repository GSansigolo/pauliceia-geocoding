/**
 * @api {get} /api/geocoding/geolocation/:streetName,:number,:year/json 1 - Geolocation
 * @apiGroup Routes
 * 
 * @apiParam {String} streetName Street name
 * @apiParam {Number} number Number of the address
 * @apiParam {number} year Year of the searched address
 * 
 * @apiSuccess (Success 200) {String} name Name or type of the searched address
 * @apiSuccess (Success 200) {String} geom  Geometry of the searched address
 * @apiSuccess (Success 200) {Float} confidenceRate  Value between 0 and 1 that rank how confident the geom is
 *
 * @apiSuccessExample {json} Success-Response:
 *  [
 *      {
 *          "createdAt":"14:00:31 22/09/2018",
 *          "type":"GET"
 *      },
 *      [
 *          {
 *              "name":"Point Geolocated",
 *              "geom":"POINT(-46.620251683128686 -23.553659708808045)",
 *              "confidenceRate":0.9752400542667046
 *          }
 *      ]
 *  ]
 * 
 * @apiError {String} name Name of the error
 * @apiError {String} alertMsg Text description of the error
 *
 * @apiErrorExample {json} Error-Response:
 *  [
 *      {
 *          "createdAt":"14:00:30 22/09/2018",
 *          "type":"GET"
 *      },
 *      [
 *          {
 *              "name":"Point not found",
 *              "alertMsg":"System did not find (rua da moca, 177, 1938)"
 *          }
 *      ]
 *  ]
 *
 */ 