"use strict";

var request       = require("request");
var Promise       = require("bluebird");
var queryString   = require("querystring");
var ForecastError = require("./forecast-error");

function Forecast(options) {
  if (!options || !options.apiKey) {
      throw new ForecastError("apiKey must be set on Forecast options");
  }
  this.apiKey = options.apiKey;
}

Forecast.prototype.buildUrl = function(latitude, longitude, time, options) {
    var url = "https://api.forecast.io/forecast/" + this.apiKey + "/" + latitude + "," + longitude;

    if (typeof(time) === "number") {
        url += "," + time.toString().substr(0, 10);
    } else if (typeof(time) === "object") {
        options = time;
    }
    if (typeof(options) === "object") {
        url += "?" + queryString.stringify(options);
    }

    return url;
};

Forecast.prototype.fetch = function(latitude, longitude, time, options) {
    if (!latitude || !longitude) {
        throw new ForecastError("Latitude and longitude are required parameters!");
    }

    var url = this.buildUrl(latitude, longitude, time, options);
    return new Promise(function(resolve, reject) {
        request.get({ url: url }, function(err, res, body) {
            var invalidBody;
            if (body) {
                try {
                    body = JSON.parse(body);
                } catch (parserErr) {
                    invalidBody = true;
                }
            }
            if (err || res.statusCode !== 200 || invalidBody) {
                if (!err) {
                    var msg = invalidBody ? "Forecast.io error: invalid body" : "Unexpected forecast.io error";
                    err = new ForecastError(msg);
                } else {
                    err = new ForecastError("Forecast.io error: " + err.message);
                }
                return reject(err);
            }
            resolve(body);
        });
    });
};

module.exports = Forecast;
