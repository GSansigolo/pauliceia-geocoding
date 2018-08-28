/**
 * @api {get} /lineLocate 3 - lineLocate
 * @apiGroup Service Functions
 * 
 * @apiParam {geom} line Geometry of the line
 * @apiParam {geom} point Geometry of the point
 * 
 * @apiSuccess (Sucess 200) {float} value Returns a float between 0 and 1 representing the location of the closest point on line to the given point
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "0.8866"
 * } 
 */ 

