const request = require("postman-request");

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7254612680024b25d3306f91f654b69e&query=${lat},${lng}&units=m`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(`Unable to connect to weatherstack!`, undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
