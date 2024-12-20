const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    // Test 1: Convert a valid input such as 10L
    test('Convert a valid input such as 10L', (done) => {
        chai
          .request(server)
          .get('/api/convert') //gets the res.json from here, which contains the .initNum, .initUnit etc. (see api.js)
          .query({ input: '10L' })
          .end((err, res) => {
            assert.strictEqual(res.status, 200, 'Response status should be 200')
            assert.strictEqual(res.body.initNum, 10, 'Initial number should be 10')
            assert.strictEqual(res.body.initUnit, 'L', 'Initial unit should be L')
            assert.strictEqual(res.body.returnNum, 2.64172, 'Return number should be 2.64172')
            assert.strictEqual(res.body.returnUnit, 'gal', 'Return unit should be gal')
            assert.exists(res.body.string, '10 litres converts to 2.64172 gallons')
            done()
          });
      });

      test('Convert an invalid input such as 32g', (done) => {
        chai
        .request(server)
        .get('/api/convert')
        .query({ input: '32g' })
        .end((err, res) => {
          assert.strictEqual(res.status, 200, 'Response status should be 200')
          assert.strictEqual(res.body.error, 'invalid unit', 'Should return an error of \'invalid unit\'')
          done()
        })
      })

      test('Convert an invalid number such as 3/7.2/4kg', (done) => {
        chai
        .request(server)
        .get('/api/convert')
        .query({ input: '3/7.2/4kg' })
        .end((err, res) => {
          assert.strictEqual(res.status, 200, 'Response status should be 200')
          assert.strictEqual(res.body.error, 'invalid number')
          done()
        })
      })

      test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', (done) => {
        chai
        .request(server)
        .get('/api/convert')
        .query( { input: '3/7.2/4kilomegagram' })
        .end((err, res) => {
          assert.strictEqual(res.status, 200, 'Response status should be 200')
          assert.strictEqual(res.body.error, 'invalid number and unit', 'Response error should be \'invalid number and unit\'')
          done()
        })
      })

      test('Convert with no number such as kg', (done) => {
        chai
        .request(server)
        .get('/api/convert')
        .query({ input: 'kg' })
        .end((err, res) => {
          assert.strictEqual(res.status, 200, 'Response status should be 200')
          assert.strictEqual(res.body.initNum, 1, 'Initial number should be 1')
            assert.strictEqual(res.body.initUnit, 'kg', 'Initial unit should be kg')
            assert.strictEqual(res.body.returnNum, 2.20462, 'Return number should be 2.20462')
            assert.strictEqual(res.body.returnUnit, 'lbs', 'Return unit should be lbs')
            assert.exists(res.body.string, '1 kg converts to 2.20462 pounds')
          done()
        })
      })

});
