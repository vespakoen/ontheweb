var express = require('express')
var app = express()

app.get('/', (req, res) =>
  res.send('<h1>Welcome to Dwaler</h1>'))

app.listen(process.env.DWALER_PORT, () => 
  console.log(`Example app listening on port ${process.env.DWALER_PORT}!`))
