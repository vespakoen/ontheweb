"use strict";
// import FBSDK, {
//   GraphRequest,
//   GraphRequestManager
// } from 'react-native-fbsdk'
Object.defineProperty(exports, "__esModule", { value: true });
function getProfile(accessToken) {
    return new Promise(function (resolve, reject) {
        // const profileRequest = new GraphRequest(
        //   '/me',
        //   {
        //     httpMethod: 'GET',
        //     version: 'v2.5',
        //     parameters: {
        //       fields: {
        //         string: 'id, name, email, first_name'
        //       }
        //     },
        //     accessToken
        //   },
        //   (err, result) => {
        //     if (err) {
        //       reject(err)
        //       return
        //     }
        //     resolve(result)
        //   }
        // )
        // new GraphRequestManager()
        //   .addRequest(profileRequest)
        //   .start()
    });
}
exports.getProfile = getProfile;
