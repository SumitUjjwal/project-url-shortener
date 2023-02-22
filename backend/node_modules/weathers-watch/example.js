const util = require('util')
const { getWeather } = require('./src/index.js');
(async () => {
    var weatherResult = await getWeather('london', 'united kingdom');
    console.log(util.inspect(weatherResult, false, null, true /* enable colors */))

})()