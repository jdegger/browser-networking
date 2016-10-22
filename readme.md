[![NPM](https://nodei.co/npm/browser-networking.png?downloads=true)](https://nodei.co/npm/browser-networking/)

[![GitHub version](https://badge.fury.io/gh/jdegger%2Fbrowser-networking.svg)](https://badge.fury.io/gh/jdegger%2Fbrowser-networking) [![npm version](https://badge.fury.io/js/browser-networking.svg)](https://badge.fury.io/js/browser-networking) [![dependencies](https://david-dm.org/jdegger/browser-networking.svg)](https://david-dm.org/)

# Install
run `npm install`. This installs one dependecy:
- `phantom`: https://www.npmjs.com/package/phantom

# Test
To run the tests execute `npm test`. Please install the dev dependencies first.

# When to use this
Please note that executing the `browserNetworking.request` function is _insanely slow_ compared to normal HTTP networking (which is slow already). This package should *only be used if speed is not an issue*.

Example implementations:
- Check wether or not a certain website includes your banner or copyright image
- Check if certain scripts make certain calls as expected (for testing maybe, but there are better ways to achieve that)

It is recommended to run the script from a queue or cronjob in seperate non-blocking calls. The process is CPU intensive. This is what happens:
- The request function is called with an URL
- PhantomJS is started. PhantomJS is a headless browser (no GUI).
- We navigate to the given URL
- We wait for the page to completely load and catch all called URLs
- We return the result and close the workers in the background

# API
Exposes a `request` function which takes one argument: the `url` of the request. The function returns a `Promise`. The promises resolves to an `Array` of urls or rejects to an error object.

# Example
```javascript
browserNetworking.request('http://www.google.com').then(urls => {

        // urls is an array of resources requested by the browser

    },
    error => {

        // handle error

    });
```

The result for Google (depending on your geolocation, the IP, etc) would look something like this:

```
[ 'http://www.google.com/',
  'http://www.google.nl/?gfe_rd=cr&ei=gxQJWOlji9zwB_W1ssgI',
  'http://ssl.gstatic.com/gb/images/b_8d5afc09.png',
  'http://www.google.nl/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png',
  'http://www.google.nl/images/nav_logo229.png',
  'http://www.google.nl/client_204?&atyp=i&biw=400&bih=300&ei=gxQJWKjUAonhaPyBsOAO',
  'http://www.google.nl/xjs/_/js/k=xjs.hp.en_US.e4-85eyk8Bs.O/m=sb_he,d/rt=j/d=1/t=zcms/rs=ACT90oGwhtLZKDuRRfajPNxXQ_iRSPiqWw',
  'http://clients1.google.nl/generate_204' ]
```