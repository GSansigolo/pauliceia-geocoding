/**
 * @api {get} /api/geocoding/geolocation/:streetName,:number,:year/json Geolocation
 * @apiGroup Functions
 * 
 * @apiParam {String} streetName Street name
 * @apiParam {Number} number Number of the address
 * @apiParam {number} year Year of the searched address
 * 
* @apiParamExample {String} Request-Example: 
 *      { "rua do seminario, 10, 1908" }
 * 
 * @apiSuccessExample {json} Sucess
 *    [
 *    "created_at: 16:15:12 17/01/2018",
 *    "type: 'GET'",
 *      [
 *          {
 *          "name": "Mignon Theatre",
 *            "geom": "POINT(-46.635331 -23.54447)"
 *            }
 *      ]
 *    ]
 * 
 * @apiErrorExample {json} Point not found
 *        [
 *        "created_at: 16:31:06 17/01/2018",
 *        "type: 'GET'",
 *          [
 *              {
 *              "alert": "Point not found",
 *              "msg": {
 *                  "alertMsg": "System did not find rua do seminario, 999, 1908",
 *                  "help": "Make sure the search is spelled correctly. (street, number, year)"
 *              }
 *              }
 *          ]
 *        ]
 *
 */ 