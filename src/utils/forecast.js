const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=29715d72286ac19254caf732b045ad65&query=" +
    latitude +
    "," +
    longitude +
    "";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services.", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another match.", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out, feels like " +
          body.current.feelslike +
          ". Humidity is " +
          body.current.humidity +
          "."
      );
    }
  });
};

module.exports = forecast;
