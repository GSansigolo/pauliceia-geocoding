/**
 * @api {get} /api/geocoding/streetlocation/:streetName,:year/json 3 - Streetlocation 
 * @apiGroup Functions
 * 
 * @apiParam {String} streetName Street name.
 * @apiParam {number} year Year of the searched street.
 * 
 * @apiSuccess (Sucess 200) {String} name Name of the searched street.
 * @apiSuccess (Sucess 200) {String} geom  Geometry of the searched street.
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *  [
 *    "created_at: 16:36:59 02/05/2018",
 *    "type: 'GET'",
 *    [
 *      {
 *        "name": "travessa beneficiencia portugueza",
 *        "geom": "MULTILINESTRING((-46.6353013672327 -23.5402423760828,-46.6354807082508 -23.5401903360375,-46.6363356920746 -23.5399473886395))"
 *      }
 *   ]
 * ]
 * 
 * @apiError PointNotFound The <code>geom</code> in the searched address was not found.
 * 
 * @apiErrorExample {json} Error-Response:
 * [
 *   "created_at: 16:42:05 02/05/2018",
 *   "type: 'GET'",
 *   [
 *     {
 *       "alert": "Street not found",
 *       "alertMsg": "System did not find (travessa beneficiencia port, 1939)",
 *       "help": "Make sure the search is spelled correctly. (street, year)"
 *     }
 *   ]
 * ]
 *
*/ 