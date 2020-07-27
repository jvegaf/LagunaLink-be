'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const config = require('../config');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000';




describe('User tests:', () => {

	before(function (done) {
		// TODO: cambiar la forma de borrado
		mongoose.Promise = global.Promise;
		mongoose.connect(config.db, { useNewUrlParser: true })
			.then(() => {
				mongoose.connection.dropDatabase();
				done();
			})
			.catch(err => console.log(err));
	});

	it('should register a user', (done) => {
		chai.request(url)
			.post('/api/v1/register/user')
			.send({ email: "user@api.com", password: "123123", role: "ROLE_STUDENT" })
			.end(function (err, res) {
				if (err) console.log(err.message);
				console.log(res.body);
				expect(res).to.have.status(200);
				done();
			});
	});

	it('should get a 403 error when register a same user', (done) => {
		chai.request(url)
			.post('/api/v1/register/user')
			.send({ email: "user@api.com", password: "123123", role: "ROLE_STUDENT" })
			.end(function (err, res) {
				if (err) console.log(err.message);
				console.log(res.body);
				expect(res).to.have.status(403);
				done();
			});
	});


	it('should get access token with email', (done) => {
		chai.request(url)
			.post('/user/sign_in')
			.send({ email: "user@api.com", password: "123123" })
			.end(function (err, res) {
				if (err) console.log(err.message);
				console.log(`res.body : ${res.body}`)
				expect(res).to.have.status(200);
				done();
			});
	});
});

