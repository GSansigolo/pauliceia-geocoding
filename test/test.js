var supertest = require('supertest');  
var chai = require('chai');  
var uuid = require('uuid');  
var app = require('../app.js');

global.app = app;  
global.uuid = uuid;  
global.expect = chai.expect;  
global.request = supertest(app);

describe('getAllStreetsJson', function() {
    it('Sucess', function(done) {
        request.get('/api/street/all/json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body[2]).not.have.lengthOf(0);
                expect(res.body).to.be.a('array');
                done();
            });
    });
  });

describe('getAllStreetsGeoJson', function() {
    it('Sucess', function(done) {
        request.get('/api/street/all/geojson')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.features).not.have.lengthOf(0);
                expect(res.body.features).to.be.a('array');
                done();
            });
    });
  });

describe('getAllStreetsXml', function() {
    it('Sucess.', function(done) {
        request.get('/api/street/all/xml')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.data).not.have.data;
                done();
            });
    });
  });

  describe('getAllPlacesJson', function() {
    it('Sucess', function(done) {
        request.get('/api/places/all/json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body[2]).not.have.lengthOf(0);
                expect(res.body).to.be.a('array');
                done();
            });
    });
  });

describe('getAllPlacesGeoJson', function() {
    it('Sucess', function(done) {
        request.get('/api/places/all/geojson')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.features).not.have.lengthOf(0);
                expect(res.body.features).to.be.a('array');
                done();
            });
    });
  });

describe('getAllPlacesXml', function() {
    it('Sucess.', function(done) {
        request.get('/api/places/all/xml')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.data).not.have.data;
                done();
            });
    });
  });

  describe('getSingleStreetJson', function() {
    it('Sucess', function(done) {
        request.get('/api/street/1/json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body[2]).not.have.lengthOf(0);
                expect(res.body).to.be.a('array');
                expect(res.body[2]).have.lengthOf(1);
                done();
            });
    });
  });

  describe('getSingleStreetGeoJson', function() {
    it('Sucess', function(done) {
        request.get('/api/street/1/geojson')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.features).not.have.lengthOf(0);
                expect(res.body.features).to.be.a('array');
                expect(res.body.features).have.lengthOf(1);
                done();
            });
    });
  });

  describe('getSingleStreetXml', function() {
    it('Sucess', function(done) {
        request.get('/api/street/1/xml')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.data).not.have.data;
                done();
            });
    });
  });

  describe('getSinglePlaceJson', function() {
    it('Sucess', function(done) {
        request.get('/api/places/71/json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body[2]).not.have.lengthOf(0);
                expect(res.body).to.be.a('array');
                expect(res.body[2]).have.lengthOf(1);
                done();
            });
    });
  });

  describe('getSinglePlaceGeoJson', function() {
    it('Sucess', function(done) {
        request.get('/api/places/71/geojson')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.features).not.have.lengthOf(0);
                expect(res.body.features).to.be.a('array');
                expect(res.body.features).have.lengthOf(1);
                done();
            });
    });
  });

  describe('getSinglePlaceXml', function() {
    it('Sucess', function(done) {
        request.get('/api/places/71/xml')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.data).not.have.data;
                done();
            });
    });
  });
  
  describe('getListQuickSearchJson', function() {
    it('Sucess', function(done) {
        request.get('/api/geolocation//json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body).is.not.null;
                done();
            });
    });
  });
  
  describe('getGeolocationJson', function() {
    it('Sucess', function(done) {
        request.get('/api/geolocation/rua quinze de novembro, 17, 1900/json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body[2]).not.have.lengthOf(0);
                expect(res.body).to.be.a('array');
                expect(res.body[2]).have.lengthOf(1);
                done();
            });
    });
  });
  
  describe('getMultipleGeolocationJson', function() {
    it('Sucess', function(done) {
        request.get('/api/multiplegeolocation/[{"adress": "rua oriente, 41, 1911"},{"adress": "rua rodrigues dos santos, 2, 1902"}]/json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body[2]).not.have.lengthOf(0);
                expect(res.body).to.be.a('array');
                expect(res.body[2]).have.lengthOf(2);
                done();
            });
    });
  });