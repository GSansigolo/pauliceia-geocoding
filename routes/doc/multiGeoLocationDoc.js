/**
 * @api {get} /api/multiplegeolocation/:jsonquery/json multiGeolocation
 * @apiGroup Functions
 * 
 * @apiParam {json} jsonquery Json with the list of address
 * 
 * @apiParamExample {json} Request-Example: 
 *      [  {    "adress": "rua quinze de novembro, 38, 1900"  },  {    "adress": "rua quinze de novembro, 38, 1901"  }]
 * 
 * @apiSuccessExample {json} Sucess
 *   ["created_at: 17:02:50 17/01/2018","type: 'GET'",[{"address":"rua quinze de novembro, 38, 1900","geom":"POINT(-46.634287297440025 -23.546309616811836)","url":"http://localhost:3000/api/geolocation/rua quinze de novembro, 38, 1900/json"},{"address":"rua quinze de novembro, 38, 1901","geom":"POINT(-46.634287297440025 -23.546309616811836)","url":"http://localhost:3000/api/geolocation/rua quinze de novembro, 38, 1901/json"}]]
 * 
 * @apiErrorExample {json} Point not found
 *  ["created_at: 17:03:21 17/01/2018","type: 'GET'",[{"address":"rua quinze de novembro, 99999, 1900","url":"http://localhost:3000/api/geolocation/rua quinze de novembro, 99999, 1900/json"},{"address":"rua quinze de novembro, 99999, 1901","url":"http://localhost:3000/api/geolocation/rua quinze de novembro, 99999, 1901/json"}]]
 *
 */ 