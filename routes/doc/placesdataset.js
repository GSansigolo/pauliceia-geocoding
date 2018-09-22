/**
 * @api {get} /api/geocoding/places 2 - Places Dataset
 * @apiGroup Routes
 * 
 * @apiSuccess (Success 200) {String} street_name String with the name of the street where this address are.
 * @apiSuccess (Success 200) {String} place_name String with the name of the place.
 * @apiSuccess (Success 200) {Number} place_number Number with the place address.
 * @apiSuccess (Success 200) {Number} place_firstyear Number with the place first year.
 * @apiSuccess (Success 200) {Number} place_lastyear  Number with the place last year.
 * @apiSuccess (Success 200) {String} place_geom  String with the geometry of the place.
 * 
 * @apiSuccessExample {json} Success-Response:
 *   [
 *      {
 *          "street_name":" rua caio prado",
 *          "place_name": null,
 *          "place_number": 1,
 *          "place_firstyear": 1930,
 *          "place_lastyear": 1930,
 *          "place_geom": "POINT(-46.6489132401614 -23.548082948768)"
 *      },
 *      {
 *          "street_name": "rua albuquerque lins",
 *          "place_name": "Grupo Escolar Barra Funda",
 *          "place_number": 1,
 *          "place_firstyear": 1931,
 *          "place_lastyear": 1931,
 *          "place_geom": "POINT(-46.652674610004 -23.5313864330752)"}
 *      ...
 *  ]
 * 
 */ 