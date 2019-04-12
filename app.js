const app = require('./main.js');
const cron = require('node-cron');
const accounts = require('./accounts.js');

var randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// *minute, *hour, *day of month, *month, *day of week
for (let i = 0;i < accounts.length;i++) {
  cron.schedule(`${randInt(0, 59)} ${randInt(0, 12)},${randInt(13, 23)} * * *`, () => {
    app.run(accounts[i]);
  });
}
