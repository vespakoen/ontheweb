import config from './config'

function createJsonFetcher(method) {
  return (uri, json) => {
    let opts = {}
    if (method !== 'GET') {
      opts = {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      }
    }
    console.log(`${config.API_URL}/${uri}`, opts)
    return fetch(`${config.API_URL}/${uri}`, opts)
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          return res.json()
            .then((res) => {
              throw new Error(`Bad response from server: ${res.error}`)
            })
        }
        return res.json()
      })
  }
}

export const getJson = createJsonFetcher('GET')
export const postJson = createJsonFetcher('POST')
export const putJson = createJsonFetcher('PUT')
