var supertest = require('supertest');  
var chai = require('chai');  
var uuid = require('uuid');  
var app = require('../app.js');

global.app = app;  
global.uuid = uuid;  
global.expect = chai.expect;  
global.request = supertest(app);

  describe('getAllStreetsJson', function() {
    it('', function(done) {
        request.get('/api/street/all/json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body[2]).to.have.lengthOf(546);
                done();
            });
    });
  });

  describe('getSingleStreetJson', function() {
    it('', function(done) {
        request.get('/api/street/1/json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body[2]).to.have.lengthOf(1);
                done();
            });
    });
  });

  describe('getGeolocationJson 1', function() {
    it('', function(done) {
        request.get('/api/geolocation/rua%20monsenhor%20andrade,%20120,%201931/json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body[2]).to.have.lengthOf(1);
                done();
            });
    });
  });




 