import morgan from 'morgan';

// Simple logger setup using Morgan for HTTP requests.
// Can be expanded with Winston/Pino for more advanced logging to files later.

export const requestLogger = morgan('dev');

export const logger = {
  info: (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`),
  error: (msg, err = '') => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, err),
  warn: (msg) => console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`),
};
