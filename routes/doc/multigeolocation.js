/**
 * @api {get} /api/geocoding/multiplegeolocation/:jsonquery/json 2 - Multi Geolocation
 * @apiGroup Routes
 * 
 * @apiParam {json} jsonquery Decoded json with the list of address
 * 
 * @apiSuccess (Sucess 200) {Json} geometry Json build with <code>type</code> and <code>coordinates</code>
 * @apiSuccess (Sucess 200) {Json} properties Json build with <code>street</code>,  <code>number</code> and <code>year</code>
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *    "type": "FeatureCollection",
 *    "features": [
 *     {
 *     "type": "Feature",
 *     "geometry": {
 *       "type": "Point",
 *       "coordinates": [
 *         -46.6531396058257,
 *         -23.5465662154437
 *       ]
 *     },
 *     "properties": {
 *       "street": "avenida tiradentes",
 *       "number": "17",
 *       "year": "1931"
 *     }
 *   },
 *   {
 *     "type": "Feature",
 *     "geometry": {
 *       "type": "Point",
 *       "coordinates": [
 *         -46.6222783584245,
 *         -23.5349383778133
 *       ]
 *     },
 *     "properties": {
 *       "street": "avenida vautier",
 *       "number": "54",
 *       "year": "1937"
 *     }
 *   }
  ]
}
 */ 