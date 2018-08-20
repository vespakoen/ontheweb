import config from '../config'
import { Dimensions, Platform } from 'react-native'

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 812 || dimen.width === 812)
  );
}

function createJsonFetcher(method) {
  return (uri, json) => {
    let opts = {}
    if (method !== 'GET') {
      opts = {
        method,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(json)
      }
    }
    return fetch(`${config.API_URL}/${uri}`, opts)
      .then(res => {
        if (res.status >= 400 && res.status < 600) {
          return res.json()
            .then(res => {
              throw new Error(`Bad response from server: ${res.error}`)
            })
        }
        return res
      })
      .then(res => res.json())
  }
}

export const getJson = createJsonFetcher('GET')
export const postJson = createJsonFetcher('POST')
export const putJson = createJsonFetcher('PUT')
