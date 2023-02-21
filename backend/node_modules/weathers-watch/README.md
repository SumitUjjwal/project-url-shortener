# weathers-watch
[![npm](https://img.shields.io/npm/v/weathers-watch.svg?style=flat-square)](https://www.npmjs.com/package/weathers-watch)
![building workflow](https://github.com/hamedpa/weathers-watch/actions/workflows/nodejs.yml/badge.svg)
[![license](https://img.shields.io/npm/l/@vitalets/google-translate-api.svg)](https://www.npmjs.com/package/weathers-watch)
![alt text](./img/logo.png?raw=true)


A stable and free API to get weather forecast worldwide.

## Features

* unlimited request
* don't require any API key
* service  available more than 10 years
* fetch fresh data

## Installation
Install via NPM:

```bash
npm install weathers-watch
```

## Usage

first parameter is city: string
second parameter is country: string
fetch weather data by following:

#### javascript

```javascript

var { getWeather } = require("weathers-watch");

var weatherResult = await getWeather('london', 'united kingdom');
console.log(weatherResult);
```

#### TypeScript

```typescript

import { getWeather } from 'weathers-watch';

var weatherResult = await getWeather('london', 'united kingdom');
console.log(weatherResult);
```

#### Result 
```javascript
{
  location: 'London',
  locationDetail: 'England, United Kingdom',
  currentWeather: {
    temperature: '4°C',
    dewPoint: '2°C',
    barometer: '98.4 kPa',
    wind: 'NNW 15 km/h',
    humidity: '86.8 %',
    visibility: 'n/a',
    time: 'Updated Jan 16, 2023 08:50 AM'
  },
  forecastSummary: [
    {
      day: 'Today',
      date: 'Jan 16th',
      result: 'Mostly Cloudy',
      min: '3°C',
      max: undefined
    },
    {
      day: 'Tuesday',
      date: 'Jan 17th',
      result: 'Mostly Sunny',
      min: '1°C',
      max: '-2°C'
    },
    {
      day: 'Wednesday',
      date: 'Jan 18th',
      result: 'Mostly Cloudy',
      min: '3°C',
      max: '-2°C'
    },
    {
      day: 'Thursday',
      date: 'Jan 19th',
      result: 'Mix of Cloud and Sun',
      min: '2°C',
      max: '1°C'
    },
    {
      day: 'Friday',
      date: 'Jan 20th',
      result: 'Mix of Cloud and Sun',
      min: '3°C',
      max: '-2°C'
    }
  ],
  forecastDetails: [
    {
      date: 'Monday, January 16th, 2023',
      results: [
        {
          time: 'Monday Morning',
          forecast: 'Cloudy with a few showers or wet flurries. 4 to 9 mm of rain. Windy at times.',
          temperature: '2°C'
        },
        {
          time: 'Monday Afternoon',
          forecast: 'Cloudy with a slight chance of showers. Showers possibly mixed with wet flurries. Windy at times.',
          temperature: '3°C'
        },
        {
          time: 'Monday Evening',
          forecast: 'Cloudy with clear periods. Windy at times.',
          temperature: '1°C'
        }
      ]
    },
    {
      date: 'Tuesday, January 17th, 2023',
      results: [
        {
          time: 'Overnight',
          forecast: 'Clear with cloudy periods.',
          temperature: undefined
        },
        {
          time: 'Tuesday Morning',
          forecast: 'Cloudy.',
          temperature: '-1°C'
        },
        {
          time: 'Tuesday Afternoon',
          forecast: 'A mix of cloud and sun.',
          temperature: '1°C'
        },
        {
          time: 'Tuesday Evening',
          forecast: 'Clear with cloudy periods.',
          temperature: '-2°C'
        }
      ]
    },
    {
      date: 'Wednesday, January 18th, 2023',
      results: [
        {
          time: 'Overnight',
          forecast: 'Mostly clear.',
          temperature: undefined
        },
        {
          time: 'Wednesday Morning',
          forecast: 'Cloudy with sunny periods with a slight chance of flurries. Windy at times.',
          temperature: '0°C'
        },
        {
          time: 'Wednesday Afternoon',
          forecast: 'Cloudy with sunny periods with a slight chance of showers. Showers possibly mixed with wet flurries. Windy at times.',
          temperature: '3°C'
        },
        {
          time: 'Wednesday Evening',
          forecast: 'Cloudy with clear periods with a slight chance of flurries or showers. Windy.',
          temperature: '1°C'
        }
      ]
    },
    {
      date: 'Thursday, January 19th, 2023',
      results: [
        {
          time: 'Overnight',
          forecast: 'Cloudy with clear periods. Windy.',
          temperature: undefined
        },
        {
          time: 'Thursday Morning',
          forecast: 'Sunny with cloudy periods. Windy.',
          temperature: '1°C'
        },
        {
          time: 'Thursday Afternoon',
          forecast: 'A mix of cloud and sun. Windy at times.',
          temperature: '2°C'
        },
        {
          time: 'Thursday Evening',
          forecast: 'A mix of cloudy and clear skies. Windy at times.',
          temperature: '1°C'
        }
      ]
    },
    {
      date: 'Friday, January 20th, 2023',
      results: [
        {
          time: 'Overnight',
          forecast: 'Clear.',
          temperature: undefined
        },
        {
          time: 'Friday Morning',
          forecast: 'Sunny.',
          temperature: '1°C'
        },
        {
          time: 'Friday Afternoon',
          forecast: 'Sunny.',
          temperature: '3°C'
        },
        {
          time: 'Friday Evening',
          forecast: 'A mix of cloudy and clear skies.',
          temperature: '-0°C'
        }
      ]
    },
    {
      date: 'Saturday, January 21st, 2023',
      results: [
        {
          time: 'Overnight',
          forecast: 'Cloudy.',
          temperature: undefined
        },
        {
          time: 'Saturday Morning',
          forecast: 'Cloudy with a slight chance of showers. Windy at times.',
          temperature: '3°C'
        },
        {
          time: 'Saturday Afternoon',
          forecast: 'Cloudy with a chance of showers. Showers possibly mixed with wet flurries. 1 to 3 mm of rain. Windy at times.',
          temperature: '4°C'
        },
        {
          time: 'Saturday Evening',
          forecast: 'Cloudy with a chance of showers. 1 to 3 mm of rain. Windy at times.',
          temperature: '3°C'
        }
      ]
    },
    {
      date: 'Sunday, January 22nd, 2023',
      results: [
        {
          time: 'Overnight',
          forecast: 'Cloudy with a slight chance of showers. Windy at times.',
          temperature: undefined
        },
        {
          time: 'Sunday Morning',
          forecast: 'Cloudy with sunny periods.',
          temperature: '4°C'
        }
      ]
    }
  ]
}
```

## Support
  - [Bug Reports](https://github.com/hamedpa/weathers-watch/issues/)

## Contributors
<p>
Pull requests are always welcome! Please base pull requests against the main branch and follow the contributing guide.

if your pull requests makes documentation changes, please update readme file.
</p>

## License

This project is licensed under the terms of the
MIT license
