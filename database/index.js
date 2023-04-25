const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});


const repoSchema = mongoose.Schema({
  repo_id: {
    type: Number,
    required: true,
    unique: true // each repo id must be unique
  },
  owner: {type: String, required: true},
  owner_id: {type: Number, required: true},
  repo_name: {type: String, required: true},
  url: {type: String, required: true},
  description: String,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number,
  open_issues_count: Number
});

const Repo = mongoose.model('Repo', repoSchema);

const save = (reposArray) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  const promises = reposArray.map(repoObj => {
    const repo = new Repo({
      repo_id: repoObj.id,
      owner: repoObj.owner.login,
      owner_id: repoObj.owner.id,
      repo_name: repoObj.name,
      url: repoObj.html_url,
      description: repoObj.description,
      stargazers_count: repoObj.stargazers_count,
      watchers_count: repoObj.watchers_count,
      forks_count: repoObj.forks_count,
      open_issues_count: repoObj.open_issues_count
    });

    return Repo.find({repo_id: repo.repo_id})
      .then(results => {
        if (results.length === 0) return repo.save();
      })
  });

  // Return a promise that waits for the all the promises in the array to fulfill first
  return Promise.all(promises);
};

const getTop25Repos = () => {
  return Repo.find()
             .sort({forks_count: 'desc'})
             .limit(25);
}

module.exports.getTop25Repos = getTop25Repos;
module.exports.save = save;