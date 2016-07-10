var express = require('express')
var app = express()

app.use(express.static('public'));

app.listen(process.env.DWALER_PORT, () => 
  console.log(`Example app listening on port ${process.env.DWALER_PORT}!`))
