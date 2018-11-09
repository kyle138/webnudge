'use strict';
// Version 0.0.1

var request = require('request');

exports = module.exports = function (options, cb) {
  if(!options.url) { // url is required
    if(typeof cb === 'function' && cb("Error: No url specified", null));
    return false;
  } else {

    // url must be provided in https://some.domain.tld/ format
    options.url = /^(https?:\/\/)/.test(options.url) ? options.url : `https://${options.url}`; // If missing, prepend https://
    options.url = /^(https:\/\/){1}([^\/]+)$/.test(options.url) ? `${options.url}/` : options.url; // If missing path, append /

    var reqOptions = {
      url: options.url
    };

    // If options.get argument provided, append to reqOptions.url
    if(options.get && 0 !== options.get.length) {
      options.get=stripGet(options.get);
      reqOptions.url+=options.get;
    } // End if options.get

    // If options.userAgent argument provided, add to reqOptions{}
    if(options.userAgent && 0 !== options.userAgent.length) {
      reqOptions.headers = {
        'User-Agent': options.userAgent
      }
    } // End if options.userAgent

    // Perform the http(s) request
    request(reqOptions, function(err, res) {
      if(!err) {
        if(res.statusCode === 200) {
          var result = {
            "statusCode": res.statusCode,
            "GET": res.request.uri.path,
            "x-drupal-cache": res.headers["x-drupal-cache"],
            "x-drupal-dynamic-cache": res.headers["x-drupal-dynamic-cache"],
            "x-cache": res.headers["x-cache"],
            "x-cache-hits": res.headers["x-cache-hits"]
          };
          if(typeof cb === 'function' && cb(null, result));;
          return true;
        } else {  // ifelse status200
          if(typeof cb === 'function' && cb("HTTP Error: "+res.statusCode, null));
          return false;
        } // End ifelse statusCode
      } else {  // request failed
        if(typeof cb === 'function' && cb("Request Error: "+err,null));
        return false;
      } // End ifelse !err status200
    }); // End request
  } // End ifelse !options.url

  function stripGet(val) {
    while(/^\/.+/.test(val)) {  //Strip all the /////s from front of val
      val=val.substring(1);
    }
    return val;
  }
} // End exports
