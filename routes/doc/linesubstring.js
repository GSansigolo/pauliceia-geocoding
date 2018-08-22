/**
 * @api {get} /lineMerge 5 - lineSubString
 * @apiGroup Service Functions
 *
 * @apiParam {geom} line Geometry of the line
 * @apiParam {float} p1 Float between 0 and 1 representing a location of the closest point on line to the given point
 * @apiParam {float} p2 Float between 0 and 1 representing a location of the closest point on line to the given point
 * 
 * @apiSuccess (Sucess 200) {geom} geom Return a linestring being a substring of the input one starting and ending at the given fractions of total 2d length
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "LINESTRING(-46.6324477046101 -23.5434330807683,-46.6320216094765 -23.5435043924584)"
 * } 
 */ 