'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const app = require('../app');

chai.use(chaiHttp);
const url = 'http://localhost:3000';



describe('Register a User:', () => {

	it('should register a user', (done) => {
		chai.request(url)
			.post('/api/v1/register/user')
			.send({ email: "user@api.com", password: "123123", role: "ROLE_USER" })
			.end(function (err, res) {
				if (err) console.log(err.message);
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

	it('should get all languages', (done) => {
		chai.request(url)
			.get('/api/v1/language')
			.end(function (err, res) {
				if(err) console.log(err.message);
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
});

