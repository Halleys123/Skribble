const express = require("express");
const env = require("dotenv");

env.config({
  path: "./config/config.env",
});
const app = express();

module.exports = app;
