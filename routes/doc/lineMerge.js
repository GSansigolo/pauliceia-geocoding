/**
 * @api {get} /lineMerge 4 - lineMerge
 * @apiGroup Service Functions
 * 
 * @apiParam {geom} line Geometry of the line
 * 
 * @apiSuccess (Sucess 200) {geom} geom Returns a LineString formed by sewing together the constituent line
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "LINESTRING(-46.6332985663243 -23.5432145259969,-46.6331435613077 -23.543308297667...)"
 * } 
 */ 

