const express = require('express');
const github = require('../helpers/github');
const db = require('../database');
let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.use(express.static('client/dist'));
app.use(express.json()); // parse incoming JSON requests

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  github.getReposByUsername(req.body.username)
    .then(repos => db.save(repos))
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  db.getTop25Repos()
    .then(sortedRepos => {
      res.json(sortedRepos);
    });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

