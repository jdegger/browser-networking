/* jshint node: true */
'use strict';

// modules
const phantom = require('phantom');
const crypto = require('crypto');
const fs = require('fs');

// messages
process.on('message', (m) => {

    // check
    check(m.url);

});

const callback = (err, result) => {

    // send it back
    process.send({
        err: err,
        result: result
    });

};

// check function
const check = (url) => {

    let _ph;
    let _page;
    let _outObj;

    // create our phantomjs instance
    phantom.create().then(ph => {

        // page object
        _ph = ph;
        return _ph.createPage();

    }).then(page => {

        // initiate out object
        _page = page;
        _outObj = _ph.createOutObject();

        _outObj.urls = [];

        // catch resources
        _page.property('onResourceRequested', function(requestData, networkRequest, out) {

            out.urls.push(requestData.url);

        }, _outObj);

        // open!
        return _page.open(url);

    }).then(status => {

        // get the urls from the status
        return _outObj.property('urls');

    }).then(urls => {

        // call it back to the parent process
        callback(null, urls);

        // done here
        _page.close();
        _ph.exit();
        process.exit();


    }).catch(err => {

        // give error to parent process
        callback(err, false);

        // close the process
        _page.close();
        _ph.exit();
        process.exit();


    });
};