/**
 * @api {get} /api/geocoding/multiplegeolocation/:jsonquery/json 5 - Multi Geolocation
 * @apiGroup Functions
 * 
 * @apiParam {json} jsonquery Json with the list of address
 * 
 * @apiSuccess (Sucess 200) {String} address The searched address.
 * @apiSuccess (Sucess 200) {String} geom  Geometry of the searched address.
 * @apiSuccess (Sucess 200) {String} url  Url that generate the <code>geom</code> of the searched address. 
 *
 * @apiSuccessExample {json} Success-Response:
 *   ["created_at: 17:02:50 17/01/2018","type: 'GET'",[{"address":"rua quinze de novembro, 38, 1900","geom":"POINT(-46.634287297440025 -23.546309616811836)","url":"http://localhost:3000/api/geolocation/rua quinze de novembro, 38, 1900/json"},{"address":"rua quinze de novembro, 38, 1901","geom":"POINT(-46.634287297440025 -23.546309616811836)","url":"http://localhost:3000/api/geolocation/rua quinze de novembro, 38, 1901/json"}]]
 */ 