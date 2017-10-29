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