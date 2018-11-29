const fs = require('fs');
const http = require('http');
require('dotenv').config();

global.fetch = require('node-fetch');
const toJson = require("unsplash-js").toJson;
const Unsplash = require('unsplash-js').default;
const Client = require('instagram-private-api').V1;
const download = require('images-downloader').images;
const jimp = require('jimp');
const imageSize = require('image-size');

module.exports.run = function run(account) {
  const device = new Client.Device(account.username);
  const storage = new Client.CookieFileStorage(__dirname + '/cookies/' + account.username + '.json');
  const session = new Client.Session(device, storage);

  const unsplash = new Unsplash({
    applicationId: process.env.UNSPLASH_API_ID,
    secret: process.env.UNSPLASH_SECRET,
    callbackUrl: process.env.UNSPLASH_CALLBACK_URL
  });

  Client.Session.login(session, account.username, account.password);
  Client.Session.create(device, storage, account.username, account.password);

  var category = account.category;
  var popularTags = account.popularTags;

  var random = Math.floor(Math.random() * account.searchLimit);
  var imageURL, instagram, photographer;
  var tags = '';
  var caption = '';

  unsplash.search.photos(category, random, 1)
    .then(toJson)
    .then(json => {
      imageURL = json['results'][0]['urls']['full'];
      instagram = json['results'][0]['user']['instagram_username'];
      instagram = (instagram == null ? '' : '@' + instagram.replace(/\s/g, '') + ' ');

      photographer = json['results'][0]['user']['name'];
      var tagsArr = json['results'][0]['tags'];

      console.log();

      for (var i = 0;i < tagsArr.length-1;i++) {
        tags = tags + '#' + tagsArr[i]['title'].replace(/\s/g, "") + ' ';
      }
      tags.slice(0, -1); // Remove final space

      // TODO: Space issue before 'on'
      caption = 'Photo taken by ' + photographer + ' ' + instagram + 'on Unsplash\n\n' + popularTags + ' ' + tags;
    }).then(() => {
      download([imageURL], __dirname)
        .then(res => {
          var dir = res[0]['filename'];

          // Crop the image if it's too wide or tall
          jimp.read(dir, (e, img) => {
            if (e) throw e;
            var dim = imageSize(dir);

            // Recommended maximum landscape resolution: 1080x566 (540:283)
            // Recommended maximum portrait resolution: 1080x1350 (4:5)

            if (dim.width > dim.height && dim.width / dim.height > 1080 / 566) {
              img.resize(1080, 566).write(dir);
            } else if (dim.height > dim.width && dim.width / dim.height < 1080 / 1350) {
              img.resize(1080, 1350).write(dir);
            }
          });

          Client.Upload.photo(session, dir)
            .then(function (upload) {
              return Client.Media.configurePhoto(session, upload.params.uploadId, caption);
            })
            .then(() => {
              fs.unlink(dir, (e) => {
                if (e) throw e;
              });
            });
        })
        .catch(e => {
          console.log('An error occurred whilst trying to obtain the image:\n' + e);
        });
    });
}
