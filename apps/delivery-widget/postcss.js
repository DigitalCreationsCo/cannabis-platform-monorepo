// dependencies
var fs = require("fs")
var postcss = require("postcss")
var namespace = require("postcss-namespace")
var tailwindcss = require("tailwindcss")
var autoprefixer = require("autoprefixer")

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

// process css
var output = postcss()
  .use(namespace())
  .use(tailwindcss())
  .use(autoprefixer())
  .process(css)
  .css