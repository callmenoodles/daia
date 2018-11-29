const app = require('./main.js');
const express = require('express');
const expApp = express();
const cron = require('node-cron');
const accounts = require('./accounts');

expApp.set('port', process.env.PORT || 8080);
expApp.use(express.static('webpage'));
expApp.listen(expApp.get('port'));

var randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// *minute, *hour, *day of month, *month, *day of week
for (var i = 0;i < accounts.length;i++) {
  cron.schedule(`${randInt(0, 59)} ${randInt(0, 12)},${randInt(13, 23)} * * *`, () => {
    app.run(accounts[i]);
  });
}
