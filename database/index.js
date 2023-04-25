const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});


const repoSchema = mongoose.Schema({
  repo_id: {type: Number, required: true},
  owner: {type: String, required: true},
  repo_name: {type: String, required: true},
  url: {type: String, required: true},
  description: String,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number,
});

const Repo = mongoose.model('Repo', repoSchema);

const save = (reposArray) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let newCount = 0;
  let updateCount = 0;

  const promises = reposArray.map(repoObj => {

    const newRepo = {
      repo_id: repoObj.id,
      owner: repoObj.owner.login,
      repo_name: repoObj.name,
      url: repoObj.html_url,
      description: repoObj.description,
      stargazers_count: repoObj.stargazers_count,
      watchers_count: repoObj.watchers_count,
      forks_count: repoObj.forks_count,
    }

    return Repo.find({repo_id: repoObj.id})
      .then(results => {
        if (results.length === 0) { // create new document if no duplicates
          newCount++;
          return Repo.create(newRepo);
        } else { // Update exising documents
          updateCount++;
          let oldRepo = results[0];

          for (const key in newRepo) {
            oldRepo[key] = newRepo[key];
          }

          return oldRepo.save();
        }
      })
  });

  // Return a promise that waits for the all the promises in the array to fulfill first
  return Promise.all(promises)
                .then(() => {return {newCount, updateCount}});
};

const getTop25Repos = () => {
  return Repo.find()
             .sort({forks_count: 'desc'})
             .limit(25);
}

module.exports.getTop25Repos = getTop25Repos;
module.exports.save = save;