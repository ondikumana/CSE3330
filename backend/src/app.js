var express = require('express')
var app = express()
var path = require('path')
const sql = require('mssql')
const async = require("async")
const bodyParser = require('body-parser')

connectToDatabase()

// to read body parser required
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes in different files
require('./account')(app, sql)
require('./profile')(app, sql)
require('./page')(app, sql)

async function connectToDatabase() {
  // creates connection to databse
  try {
    await sql.connect('mssql://sa:$uP3RC0mpl3Xp@$$w0rD@localhost/master')
  }
  catch (e) {
    console.log(e);
  }
}

app.listen(8080);

console.log('running....')
