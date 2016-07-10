import 'whatwg-fetch'
import config from '../config'

fetch(config.TOP_TRACKS_URL)
  .then(result => {
    console.log(result)
  })
