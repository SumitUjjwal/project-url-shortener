const getWeatherInfo = require('./weatherService');

exports.getWeather = async (city, country = '') => {
    return await getWeatherInfo(city, country);
};