var express = require('express')
var config = require('./config')
var app = express()

app.use(express.static('public'));

app.get(config.TOP_TRACKS_URL, (req, res) => {
  res.json({
    results: [
      {
        name_nl: 'Top track test'
      }
    ],
    page: 1,
    totalPages: 1
  })
})

app.listen(process.env.DWALER_PORT, () => 
  console.log(`Example app listening on port ${process.env.DWALER_PORT}!`))
