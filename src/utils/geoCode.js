const request = require("postman-request");

const geoCode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=690d5e02d6d3819eaae70ebfca52334d&query=${address}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(`Unable to connect to location services!`, undefined);
    } else if (body.data === undefined || body.data.length === 0) {
      callback(`Unable to find location. Try another search.`, undefined);
    } else {
      callback(undefined, {
        lat: body.data[0].latitude,
        lng: body.data[0].longitude,
        location: body.data[0].label,
      });
    }
  });
};

module.exports = geoCode;
