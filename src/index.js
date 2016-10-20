/* jshint node: true */
'use strict';

// modules
const cp = require('child_process');

// request functon
exports.request = (url) => {

    // we return a promise
    return new Promise((resolve, reject) => {

        // we gonna make a separate worker for this to make sure
        // multiple calls are working properly
        const worker = cp.fork(`${__dirname}/worker.js`);

        // send data
        worker.send({
            url: url
        });

        // wait for it to come back
        worker.on('message', (m) => {

        	// check error
        	if(m.err){

        		return reject(m.err);

        	}

        	// done here
            resolve(m.result);

        });


    });


};