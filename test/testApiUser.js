'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const config = require('../config');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000';


function dropDB(done) {
	// TODO: cambiar la forma de borrado
	mongoose.Promise = global.Promise;
	mongoose.connect(config.db, { useNewUrlParser: true })
		.then(() => {
			mongoose.connection.dropDatabase();
			done();
		})
		.catch(err => console.log(err));
}


describe('User:', () => {

	before(dropDB);

	after(dropDB);

	it('should get a 403 when try a register without email', (done) => {
		chai.request(url)
			.post('/api/v1/account/register')
			.send({ password: "123123", role: "ROLE_STUDENT" })
			.end(function (err, res) {
				if (err) console.log(err.message);
				expect(res).to.have.status(403);
				done();
			});
	});

	it('should get a 403 when try a register without password', (done) => {
		chai.request(url)
			.post('/api/v1/account/register')
			.send({ email: "user@api.com", role: "ROLE_STUDENT" })
			.end(function (err, res) {
				if (err) console.log(err.message);
				expect(res).to.have.status(403);
				done();
			});
	});

	it('should get a 403 when try a register without role', (done) => {
		chai.request(url)
			.post('/api/v1/account/register')
			.send({ email: "user@api.com", password: "123123"})
			.end(function (err, res) {
				if (err) console.log(err.message);
				expect(res).to.have.status(403);
				done();
			});
	});

	it('should get a 403 when try a register with bad role', (done) => {
		chai.request(url)
			.post('/api/v1/account/register')
			.send({ email: "user@api.com", password: "123123", role: "ROLE_PAROLE"})
			.end(function (err, res) {
				if (err) console.log(err.message);
				expect(res).to.have.status(403);
				done();
			});
	});


	it('should register a user', (done) => {
		chai.request(url)
			.post('/api/v1/account/register')
			.send({ email: "user@api.com", password: "123123", role: "ROLE_STUDENT" })
			.end(function (err, res) {
				if (err) console.log(err.message);
				expect(res).to.have.status(200);
				done();
			});
	});

	it('should get a 403 error when register a same user', (done) => {
		chai.request(url)
			.post('/api/v1/account/register')
			.send({ email: "user@api.com", password: "123123", role: "ROLE_STUDENT" })
			.end(function (err, res) {
				if (err) console.log(err.message);
				expect(res).to.have.status(403);
				done();
			});
	});

	it('should get access token with email', (done) => {
		chai.request(url)
			.post('/api/v1/account/sign_in')
			.send({ email: "user@api.com", password: "123123" })
			.end(function (err, res) {
				if (err) console.log(err.message);
				expect(res).to.have.status(200);
				done();
			});
	});

	it('should get 404 error with non exist email', (done) => {
		chai.request(url)
			.post('/api/v1/account/sign_in')
			.send({ email: "baduser@api.com", password: "123123" })
			.end(function (err, res) {
				if (err) console.log(err.message);
				expect(res).to.have.status(404);
				done();
			});
	});

	it('should get 404 error with bad password', (done) => {
		chai.request(url)
			.post('/api/v1/account/sign_in')
			.send({ email: "baduser@api.com", password: "777777" })
			.end(function (err, res) {
				if (err) console.log(err.message);
				expect(res).to.have.status(404);
				done();
			});
	});

	it('should get 404 error with not send password', (done) => {
		chai.request(url)
			.post('/api/v1/account/sign_in')
			.send({ email: "baduser@api.com" })
			.end(function (err, res) {
				if (err) console.log(err.message);
				expect(res).to.have.status(404);
				done();
			});
	});

	it('should get 404 error with not send email', (done) => {
		chai.request(url)
			.post('/api/v1/account/sign_in')
			.send({ password: "baduser@api.com" })
			.end(function (err, res) {
				if (err) console.log(err.message);
				expect(res).to.have.status(404);
				done();
			});
	});
});

