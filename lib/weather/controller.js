var exports = (module.exports = {});
var _ = require("lodash");
var unirest = require("unirest");

exports.get = {
  weatherByCity: (req, res) => {
    var params = _.pick(req.params, ["city"]);
    GetWeather(params.city)
      .then(parseWeatherData)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
};

function GetWeather(city) {
  return new Promise((resolve, reject) => {
    var APPID = process.env.APPID;
    unirest
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric" +
          "&APPID=" +
          APPID
      )
      .headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
      .end(
        response => {
          if (response.status == 200) {
            resolve(response.body);
          } else {
            reject({
              error: true,
              message: "Ip server error",
              data: response.body
            });
          }
        },
        error => {
          console.log(error);
          reject({
            error: true,
            message: "Ip server error",
            data: error
          });
        }
      );
  });
}

function parseWeatherData(data) {
  return new Promise((resolve, reject) => {
    data = _.pick(data, ["coord", "main", "wind"]);
    resolve(data);
  });
}
