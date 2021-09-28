const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Vk",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Satoru Gojou",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Vk",
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Andrew",
//     },
//     {
//       name: "Hello",
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  //   res.send({
  //     location: "Philadelphia",
  //     forecast: "It is snowing",
  //     address: req.query.address,
  //   });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//app.com
//app.com/help
//app.com/about

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vk",
    errorMessage: "Help Article not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vk",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
