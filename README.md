# webnudge
NPM module to make simple web requests to keep containers active. 
This was primarily developed to keep Pantheon Drupal containers active and to ensure drupal crons get executed but could be used for other environments. Pantheon environment containers shut down due to inactivity preventing crons from running and disabling access to the backend database. The Pantheon documentation states that this happens within 1-2 hours of inactivity but I have observed unpaid containers being spun down after 5-10 minutes.

See the following link for more information:
[Cron for Drupal](https://pantheon.io/docs/drupal-cron/#run-cron-more-often)

## Install
npm install --save webnudge

## Usage
```javascript
webnudge({
  url: 'www.example.com',
  get: '?foo=bar',
  userAgent: 'webnudge/0.0.1'
  }, 
  callback)
 ```

#### Options
* **url:** (REQUIRED) The URL to request.
   Must be in the format of https://some.domain.tld/
* **get:** (optional) Additional get variable to append to request url. 
   For instance, ?foo=randomstring can be appended to the request in an attempt to dodge cache.
* **userAgent:** (optional) User Agent to include with the request.
   This can be used to make the request appear to be coming from a real browser.

## Example
```javascript
var webnudge=require('webnudge');

var options = {
  url: 'www.example.com',
  get: '?foo='+Math.random(),
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
}

webnudge(options,function(error, response) {
  if(error) {
    console.log(error);
  } else { 
    console.log("Response: "+JSON.stringify(response,null,2));
  }
});

/*
Response: {
  "statusCode": 200,
  "GET": "/?foo=0.1629607049731303",
  "x-cache": "HIT"
}
*/
```
