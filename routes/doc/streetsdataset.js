/**
 * @api {get} /api/geocoding/streets 3 - Streets Dataset
 * @apiGroup Routes
 * 
 * @apiSuccess (Success 200) {String} street_name String with the name of the street.
 * @apiSuccess (Success 200) {String} street_geom  String with the geometry of the street.
 * @apiSuccess (Success 200) {Number} street_firstyear Number with the first date of the street.
 * @apiSuccess (Success 200) {Number} street_lastyear Number with the last date of the street.
 *
 * @apiSuccessExample {json} Success-Response:
 *
 *   [
 *      {
 *          "street_name": "rua caio prado",
 *          "street_geom": "MULTILINESTRING((-46.6489442168316 -23.547993799908,-46.6487994520019 -23.5484104003636, ...))",
 *          "street_firstyear": 1920,
 *          "street_lastyear": 1930
 *      },
 *      {
 *          "street_name": "rua albuquerque lins",
 *          "street_geom": "MULTILINESTRING((-46.6560276150948 -23.5349697133848,-46.6551309875705 -23.5338546256294, ...))",
 *          "street_firstyear": 1920,
 *          "street_lastyear": 1930
 *      }
 *     ...
 *  ]
 */ 