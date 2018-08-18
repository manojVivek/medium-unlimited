import config from './config';

export function log(...messages) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log(...messages);
}

export function amplitudeApiKey() {
  if (process.env.NODE_ENV === 'production') {
    return config.amplitude.api_key;
  }
  return 'test_api_key';
}
