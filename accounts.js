// popularTags: '#format #like #this' and don't add more than 5 ideally
// Make sure `searchLimit` is smaller than the total number of search results of that category
require('dotenv').config();

var accounts = [
  {
    username: 'daia.nature',
    password: process.env.PASS_DAIANATURE,
    category: 'nature',
    popularTags: '#nature #naturephotography #naturelovers #photography #nature_seekers',
    searchLimit: 10000
  },
  {
    username: 'daia.architecture',
    password: process.env.PASS_DAIAARCHITECTURE,
    category: 'architecture',
    popularTags: '#architecture #architecturelovers #architecturephotography #archilovers',
    searchLimit: 10000
  },
  {
    username: 'daia.models',
    password: process.env.PASS_DAIAMODELS,
    category: 'female',
    popularTags: '#model #female #girl',
    searchLimit: 10000
  }
];

module.exports = accounts;
