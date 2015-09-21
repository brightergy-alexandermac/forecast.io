"use strict";

function ForecastError(message) {
    this.message = message;
}

ForecastError.prototype = new Error();

ForecastError.prototype.toString = function(){
    return "ForecastError: " + this.message;
};

module.exports = ForecastError;