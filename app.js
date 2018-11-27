const app = require('./main.js');
const express = require('express');
const expApp = express();
const cron = require('node-cron');
const accounts = require('./accounts');


expApp.use(express.static('webpage'));
expApp.listen(3000, function () {});

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// *minute, *hour, *day of month, *month, *day of week
// Upload every day between 11:00-11:59 AM and 11:00-11:59 PM
for (var i = 0;i < accounts.length;i++) {
  cron.schedule(randomInt(1, 59).toString() + ' */11 * * *', () => {
    //app.run(accounts[i]);
  });
}
