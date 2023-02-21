const expect = require('chai').expect;
var { getWeather } = require("../index");

describe('Testing Response of weather service" ', () => {

  it('extract simple weather data', async () => {

    const weatherResult = await getWeather('london', 'united kingdom');
    expect(weatherResult.location).to.equal('London');
    expect(weatherResult.locationDetail).to.equal('England, United Kingdom');
  }).timeout(5000);

});