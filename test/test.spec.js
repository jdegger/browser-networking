/* jshint node: true */
/*global describe, it */

'use strict';

// packages
const should = require('should');
const browserNetworking = require('../index.js');

// desribe the api
describe("browser-networking", function() {

    // set wait time
    this.timeout(15000);

    // test
    it('Should return an array of URLs when doing a request', done => {

        // go
        var url = 'http://www.google.com';
        browserNetworking.request(url).then(urls => {

                urls.should.be.a.Array();
                done();

            },
            error => {

                done(error);

            });

    });

    // test
    it('Should return an an array with a single item for non existing paths', done => {

        // go
        var url = 'http://non-existend-url-to-something-non-existing/';
        browserNetworking.request(url).then(urls => {

                urls[0].should.equal(url);
                done();

            },
            error => {

                done(error);

            });

    });

});