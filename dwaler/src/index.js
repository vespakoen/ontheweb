import 'whatwg-fetch'
import config from '../config'

fetch(config.TOP_TRACKS_URL)
  .then(res => res.json())
  .then(result => {
    console.log(result)
  })
