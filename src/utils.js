export function log(...messages) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log(...messages);
}
