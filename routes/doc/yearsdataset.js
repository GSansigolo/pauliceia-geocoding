/**
 * @api {get} /api/geocoding/years 7 - Years Dataset
 * @apiGroup Functions
 * 
 * @apiSuccess (Sucess 200) {String} name Name of the searched address.
 * @apiSuccess (Sucess 200) {String} geom  Geometry of the searched address.
 *
 * @apiSuccessExample {json} Success-Response:
 *   [
 *        {
 *            "year":1930
 *        },
 *        {
 *            "year":1931
 *        },
 *        {
 *            "year":1935
 *        },
 *        {
 *            "year":1936
 *        }
 *        ...
 *    ]
 * 
*/ 
