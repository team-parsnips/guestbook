var chai = require('chai');
var expect = chai.expect, 
    assert = chai.assert, 
    should = chai.should();
var supertest = require('supertest');
var api = supertest('http://localhost:3000');
var mysql = require('mysql');

//Server and MySQL need to be running to pass tests

describe('Server', function() {
  describe('Initialization', function() {
    it('should return 200 response at /', function(done) {
      api.get('/')
      .set('Accept', 'application/json')
      .expect(200, done);
      // .expect(200, /guestbook/, done); will implement once homepage made
    });

    it('should return 404 response at fake path', function(done) {
      api.get('/whywouldi')
      .expect(404, done);
    });
  });

  describe('User registration', function() {
    it('should receive necessary user info upon registration', function(done) {
      api.post('/register')
      .set('Accept','application/json')
      .send({'firstName': 'Emerson', 'lastName': 'Hum', 'email': 'extra@example.com', 'password': 'extra', 'type': 'owner'})
      .expect(200, done);
    })
  })
});

describe('Database', function() {
  var dbConnection;

  beforeEach(function(done) {
      dbConnection = mysql.createConnection({
        user: 'root',
        password: '',
        database: 'guestbook'
      });
      dbConnection.connect();

      var tableName = 'users';

      dbConnection.query('truncate ' + tableName, done);
  });

  describe('User creation', function() {
    it('should save user to database', function(done) {
      api.post('/register')
      .send({'firstName': 'Emerson', 'lastName': 'Hum', 'email': 'hello@example.com', 'password': 'extra', 'type': 'owner'});

      dbConnection.query('SELECT * FROM users', function(err, results) {
        expect(results.length).to.equal(1);
        expect(results[0].firstName).to.equal('Emerson');
        done();
      });

    });
  })

  afterEach(function(done) {
    dbConnection.end();
  })

});