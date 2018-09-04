import AmplitudeClient from 'amplitude';
import {amplitudeApiKey} from './utils';
import {getUserId} from './storage';

const amplitude = new AmplitudeClient(amplitudeApiKey(), {
  user_id: getUserId() || 'user_id',
});

export function track(event_type) {
  return amplitude.track({event_type});
}
