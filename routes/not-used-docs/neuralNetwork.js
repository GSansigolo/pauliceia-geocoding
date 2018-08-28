/**
 * @api {get} /neuralNetwork 6 - neuralNetwork
 * @apiGroup Service Functions
 * 
 * @apiParam {String} streetName String of the street name
 * @apiParam {Json} trainDataset Neural network train dataset
 * 
 * @apiSuccess (Sucess 200) {String} value Returns the best match between of the street name
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "input":"a tiradentes",
 *      "output":"avenida tiradentes"
 * } 
 */ 