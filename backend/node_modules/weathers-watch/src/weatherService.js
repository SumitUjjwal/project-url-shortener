const axios = require('axios');
const { JSDOM } = require('jsdom');

var address = 'moc.yticrehtaew.www//:sptth'.split("").reverse().join("");
function undefinedRemover(obj) {
    Object.keys(obj).forEach(key => { obj[key] === undefined || obj[key] === '' ? delete obj[key] : {} });
}

module.exports = async (city, country = '') => {
    if (!city && !country) return { status: 204, message: 'need to set city or country' };

    const response = await axios({
        method: 'get',
        url:
            `${address}/search_cities.php?q=${city ? city : country ? country : undefined}`,
        headers: {
            'Content-Type': 'application/json',
        },

    });

    let dom = new JSDOM(response.data);

    const links = dom.window.document.querySelectorAll('body > table > tbody > tr > td > table > tbody > tr > td > li a');
    let exactLocation;

    for (const link of links) {
        if (country && link.textContent.toLowerCase().includes(country.toLowerCase())) {
            exactLocation = link.href;
            break;
        }
    }
    if (!exactLocation) exactLocation = links[0]?.href;
    if (!exactLocation) return { status: 404, message: 'city or country did not found' };

    const weatherResult = await axios({
        method: 'get',
        url:
            `${address}/${exactLocation}`,
        headers: {
            'Content-Type': 'application/json',
        },

    });
    dom = new JSDOM(weatherResult.data);
    const currentWeatherTable = 'body > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(4) > td > table > tbody >';

    const location = dom.window.document.querySelector('body > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(2) > font > b')?.textContent;
    const locationDetail = dom.window.document.querySelector('body > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > div:nth-child(2) > b:nth-child(5)')?.textContent;
    const currentTemperature = dom.window.document.querySelector(`${currentWeatherTable} tr:nth-child(3) > td:nth-child(2)`)?.textContent;
    const currentDewPoint = dom.window.document.querySelector(`${currentWeatherTable} tr:nth-child(3) > td:nth-child(4)`)?.textContent;
    const currentBarometer = dom.window.document.querySelector(`${currentWeatherTable} tr:nth-child(4) > td:nth-child(2)`)?.textContent;
    const currentWind = dom.window.document.querySelector(`${currentWeatherTable} tr:nth-child(4) > td:nth-child(4)`)?.textContent;
    const currentHumidity = dom.window.document.querySelector(`${currentWeatherTable} tr:nth-child(5) > td:nth-child(2)`)?.textContent;
    const currentVisibility = dom.window.document.querySelector(`${currentWeatherTable} tr:nth-child(5) > td:nth-child(4)`)?.textContent;

    const time = dom.window.document.querySelector(`body > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)`)?.textContent?.trim();

    //forecast summary
    let forecastSummaryTable = 'body > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(10) > td > table > tbody >';
    let forecastSummaries = [];
    for (let i = 1; i < 6; i++) {
        const forecast = dom.window.document.querySelector(`${forecastSummaryTable} tr:nth-child(1) > td:nth-child(${i}) > font.fc_summ_h1`)?.textContent;
        const forecastDate = dom.window.document.querySelector(`${forecastSummaryTable} tr:nth-child(1) > td:nth-child(${i}) > font.fc_summ_h2`)?.textContent;
        const forecastResult = dom.window.document.querySelector(`${forecastSummaryTable} tr:nth-child(3) > td:nth-child(${i})`)?.textContent;
        const forecastMinResult = dom.window.document.querySelector(`${forecastSummaryTable} tr:nth-child(4) > td:nth-child(${i}) > font.fc_summ_hi`)?.textContent;
        const forecastMaxResult = dom.window.document.querySelector(`${forecastSummaryTable} tr:nth-child(4) > td:nth-child(${i}) > font.fc_summ_lo`)?.textContent;
        if (forecast && forecastDate && forecastResult)
            forecastSummaries.push({
                day: forecast?.trim(),
                date: forecastDate?.trim(),
                result: forecastResult?.trim(),
                min: forecastMinResult?.trim(),
                max: forecastMaxResult?.trim(),
            })
    }

    //forecast weather detail
    const forecastDetailDates = dom.window.document.querySelectorAll('[class="fc_day_heading"]');
    const forecastDetailResults = dom.window.document.querySelectorAll('[class="forecast_title"]');
    let fDates = [];
    for (const item of forecastDetailDates) {
        fDates.push(item.textContent);
    }

    let forecastDetails = [];
    let forecastDayResult = {};
    let separator = 0;
    for (let i = 0; i < forecastDetailResults.length; i++) {
        if (i == 0) {
            forecastDayResult.date = fDates.shift();
            forecastDayResult.results = [];
        }

        const forecastDay = dom.window.document.querySelector(`body > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(${String(17 + i + separator)}) > td > table > tbody > tr:nth-child(1) > td.small1`)?.textContent;
        const forecastTemperature = dom.window.document.querySelector(`body > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(${String(17 + i + separator)}) > td > table > tbody > tr:nth-child(1) > td.forecast_low`)?.textContent;

        if (!forecastDay || forecastDetailResults.length - 1 === i) {
            forecastDetails.push(forecastDayResult);
            forecastDayResult = {};
            forecastDayResult.date = fDates.shift();
            forecastDayResult.results = [];
            separator += 1;
        }
        if (forecastDay || forecastDetailResults[i].textContent)
            forecastDayResult.results.push({
                time: forecastDay ? forecastDay : 'Overnight',
                forecast: forecastDetailResults[i].textContent,
                temperature: forecastTemperature ? forecastTemperature.split(":")[1].trim() : undefined
            });

    }

    const data = {
        location,
        locationDetail,
        currentWeather: {
            temperature: currentTemperature,
            dewPoint: currentDewPoint,
            barometer: currentBarometer,
            wind: currentWind,
            humidity: currentHumidity,
            visibility: currentVisibility,
            time
        },
        forecastSummary: forecastSummaries.length > 0 ? forecastSummaries : undefined,
        forecastDetails
    };

    //preprocess output
    undefinedRemover(data);
    undefinedRemover(data.currentWeather);
    if (Object.keys(data.currentWeather).length === 0) delete data.currentWeather;
    return data;
}