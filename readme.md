# Install
run `npm install`

# Test
`npm test`

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