const axios = require('axios');

exports.fetchIpInfo = async (ip) => {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const data = response.data;
    const formattedData = {
        Country: `${data.country} (${data.countryCode})`,
        City: data?.city,
        Continent: `${data.country})`,
        Zip: data?.zip,
        RegionName: data?.regionName,
        ISP: data?.isp,
        Coordinates: `${data.lat} (lat) / ${data.lon} (long)`,
        Time: `${data.timezone}`,
        CountryCode: data.countryCode,
        ipAddress: ip,
        hostname: ip,
        provider: data.org,
        ASN: data.as,
        lat: String(data.lat),
        lon: String(data.lon)
    };
    return formattedData;
};