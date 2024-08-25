const fs = require('fs');
const path = require('path');

const env = process.env;

const templatePath = path.resolve(__dirname, 'build', 'firebase-messaging-sw.js');
const templateContent = fs.readFileSync(templatePath, 'utf8');

const config = {
  apiKey: env.REACT_APP_FIREBASE_API_KEY,
  authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_FIREBASE_APP_ID
};

let outputContent = templateContent
  .replace('__FIREBASE_API_KEY__', config.apiKey)
  .replace('__FIREBASE_AUTH_DOMAIN__', config.authDomain)
  .replace('__FIREBASE_PROJECT_ID__', config.projectId)
  .replace('__FIREBASE_STORAGE_BUCKET__', config.storageBucket)
  .replace('__FIREBASE_MESSAGING_SENDER_ID__', config.messagingSenderId)
  .replace('__FIREBASE_APP_ID__', config.appId);

fs.writeFileSync(templatePath, outputContent);
