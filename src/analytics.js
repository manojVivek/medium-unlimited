import AmplitudeClient from 'amplitude';
import {amplitudeApiKey} from './utils';

const amplitude = new AmplitudeClient(amplitudeApiKey(), {
  user_id: 'user_id',
});

export function track(event_type) {
  return amplitude.track({event_type});
}
