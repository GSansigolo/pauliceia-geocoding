/**
 * @api {get} /closestPoint 1 - closestPoint
 * @apiGroup Service Functions
 * 
 * @apiParam {geom} line Geometry of the line
 * @apiParam {geom} point Geometry of the point
 * 
 * @apiSuccess (Sucess 200) {geom} geom Returns the 2-dimensional point on point that is closest to line
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "POINT(-46.6401641692189 -23.5410923553266)"
 * } 
 */ 