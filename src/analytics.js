import AmplitudeClient from 'amplitude';
import {amplitudeApiKey, log} from './utils';
import {getUserId} from './storage';
import {FETCH_USER_ID} from './constants';

let client;

function _getAmplitudeClient() {
  if (client) {
    return Promise.resolve(client);
  }
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({type: FETCH_USER_ID}, response => {
      log('Received response for userId', response);
      if (response.status != 'SUCCESS') {
        return reject(response);
      }
      client = new AmplitudeClient(amplitudeApiKey(), {
        user_id: response.userId,
      });
      return resolve(client);
    });
  });
}

export function track(event_type) {
  _getAmplitudeClient().then(client => client.track({event_type}));
}
