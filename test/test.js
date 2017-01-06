var chai = require('chai');
var expect = chai.expect, 
    assert = chai.assert, 
    should = chai.should();
var supertest = require('supertest');
var api = supertest('http://localhost:3000');

describe('Server', function() {
  describe('Initialization', function() {
    it('should return 200 response at /', function(done) {
      api.get('/')
      .set('Accept', 'application/json')
      .expect(200, done);
    });
  });
});