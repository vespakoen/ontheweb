var express = require('express')
var app = express()

app.get('/', (req, res) => {
  res.send('Hello, World. This is dwaler, served by express yall');
})

app.listen(process.env.DWALER_PORT, () => 
  console.log(`Example app listening on port ${process.env.DWALER_PORT}!`))
