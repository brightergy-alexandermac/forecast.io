# forecast.io
Bluebird pomises wrapper around forecast.io weather API

### Install
```sh
npm install forecast.io -S --registry https://npm.brighterlink.io
```

### Using
```js
// Create forecast provider
var forecastProvider = new Forecast({
    apiKey: config.forecast.apiKey
});

// Get weather for today
forecastProvider
  .fetch(latitude, longitude, options)
  .then(function(forecastData) {
    // forecastData.currently contains weather data
  })
  .catch(errorUtil.throwFailedDependencyError);

// Get weather for the selected day
forecastProvider
  .fetch(latitude, longitude, day, options)
  .then(function(forecastData) {
    // forecastData.hourly or forecastData.daily contains weather data
  })
  .catch(errorUtil.throwFailedDependencyError);
```

### Links
- [forecast.io service](http://forecast.io)
