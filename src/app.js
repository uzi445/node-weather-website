const request = require("postman-request");
const geoCode = require(`./utils/geoCode`);
const forecast = require(`./utils/forecast`);

const path = require("path");
const express = require("express");
const hbs = require("hbs");
console.log(__dirname);

const app = express();

const port = process.env.PORT || 3000;
// Define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// Setup handlebars egnine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    text: "Use this website to get weather",
    name: "Richard",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Richard",
  });
});

//  app.com
// app/com
// // app/com/help

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Must provide address",
    });
  } else if (req.query.address) {
  }

  geoCode(req.query.address, (error, { lat, lng, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(lat, lng, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});
app.get("/help/", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Richard",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 ",
    name: "Richard",
    errorMessage: "Page not found",
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
