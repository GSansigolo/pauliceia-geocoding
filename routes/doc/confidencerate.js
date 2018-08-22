/**
 * @api {get} /confidenceRate 2 - confidenceRate
 * @apiGroup Service Functions
 * 
 * @apiParam {geom} p1 Geometry of the point 1
 * @apiParam {geom} p2 Geometry of the point 2
 * @apiParam {geom} year Year of the search
 * 
 * @apiSuccess (Sucess 200) {float} value Returns a float between 0 and 1 that rank how confident the date is
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "0.950875"
 * } 
 */ 

 