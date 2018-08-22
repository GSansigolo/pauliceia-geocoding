/**
 * @api {get} /api/geocoding/geolocation/:streetName,:number,:year/json 1 - Geolocation
 * @apiGroup Routes
 * 
 * @apiParam {String} streetName Street name
 * @apiParam {Number} number Number of the address
 * @apiParam {number} year Year of the searched address
 * 
 * @apiSuccess (Sucess 200) {String} name Name of the searched address
 * @apiSuccess (Sucess 200) {String} geom  Geometry of the searched address
 *
 * @apiSuccessExample {json} Success-Response:
 *    [
 *    "created_at": "16:15:12 17/01/2018",
 *    "type": "GET",
 *      [
 *          {
 *            "name": "Point Geolocated",
 *            "geom": "POINT(-46.634276069248784 -23.54643605378835)"
 *          }
 *      ]
 *    ]
 * 
 * @apiError {String} name Name of the error
 * @apiError {String} alertMsg Text description of the error
 *
 * @apiErrorExample {json} Error-Response:
 *  [
 *    "created_at": "11:09:28 18/04/2018",
 *    "type": "GET",
 *    [
 *        {
 *           "name":"Point not found",
 *           "alertMsg":"System did not find (, 17, 1931)"
 *        }
 *    ]
 *  ]
 *
 */ 