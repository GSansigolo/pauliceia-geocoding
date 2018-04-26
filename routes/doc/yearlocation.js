/**
 * @api {get} /api/geocoding/yearlocation/:year/json 4 - Yearlocation
 * @apiGroup Functions
 * 
 * @apiParam {Number} number Number of the address
 * @apiParam {number} year Year of the searched address
 * 
 * @apiSuccess (Sucess 200) {String} name Name of the searched address.
 * @apiSuccess (Sucess 200) {String} geom  Geometry of the searched address.
 *
 * @apiSuccessExample {json} Success-Response:
 *    [
 *    "created_at: 16:15:12 17/01/2018",
 *    "type: 'GET'",
 *      [
 *          {
 *            "name": "Point Geolocated",
 *            "geom": "POINT(-46.634276069248784 -23.54643605378835)"
 *          }
 *      ]
 *    ]
 * 
 * @apiError PointNotFound The <code>geom</code> in the searched address was not found or could not be calculated.
 * 
 * @apiErrorExample {json} Error-Response:
 *  [
 *    "created_at: 11:09:28 18/04/2018",
 *    "type: 'GET'",
 *    [
 *        {
 *           "alert": "Point not found",
 *           "alertMsg": "System did not find (rua caio prado, 999, 1930)",
 *           "help": "Make sure the search is spelled correctly. (street, number, year)"
 *        }
 *    ]
 *  ]
 *
*/ 