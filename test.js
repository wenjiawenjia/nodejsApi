var expect = require('chai').expect;
var request = require('request');
var app = require('./app');
const {
    post
} = require('request');


it('story 1 scenario 1', function (done) {
    const options = {
        url: 'http://127.0.0.1:3000/api/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        json: {
            "teacher": "teacherken@gmail.com",
            "students": [
                "studenthon1@gmail.com"
            ]
        }

    };
    request.post(options, function (error, response, body) {
        // console.log(response)
        expect(response.statusCode).to.equal(204);
        done();
    });
});

it('story 2 scenario 1', function (done) {
    request('http://127.0.0.1:3000/api/commonstudents?teacher=teacherken%40gmail.com', function (error, response, body) {
        // console.log(response)
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('story 2 scenario 2', function (done) {
    request('http://127.0.0.1:3000/api/commonstudents?teacher=teacherken%40gmail.com&teacher=teacherjoe%40gmail.com', function (error, response, body) {
        // console.log(response)
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('story 3 scenario 1', function (done) {
    const options = {
        url: 'http://127.0.0.1:3000/api/suspend',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        json: {
            "teacher": "teacherken@gmail.com",
            "students": [
                "studenthon1@gmail.com"
            ]
        }

    };
    request.post(options, function (error, response, body) {
        // console.log(response)
        expect(response.statusCode).to.equal(204);
        done();
    });
});

it('story 4 scenario 1', function (done) {
    const options = {
        url: 'http://127.0.0.1:3000/api/retrievefornotifications',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        json: {
            "teacher": "teacherken@gmail.com",
            "notification": "hello"

        }
    };
    request.post(options, function (error, response, body) {

        expect(response.statusCode).to.equal(200);
        done();
    });
});