import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

// Depending on which URL you go to, the AJAX requests bug out...
// So have to go to the same URL that the AJAX requests are using
// const apiUrl = 'http://127.0.0.1:1128/repos';
const apiUrl = 'http://localhost:1128/repos';

const App = () => {

  const [repos, setRepos] = useState([]);
  const [counts, setCounts] = useState({});

  const getRepos = (callback) => {
    $.ajax({
      url: apiUrl,
      method: 'GET',
      contentType: 'application/json',
      success: function(data) {
        callback(data);
      },
      error: function(err) {
        console.error('AJAX GET ERROR: ', err);
      }
    })
  };

  const postUserRepos = (user) => {
    $.ajax({
      url: apiUrl,
      method: 'POST',
      data: JSON.stringify(user),
      contentType: 'application/json',
      success: function(results) {
        setCounts(results);
        getRepos(setRepos);
      },
      error: function(err) {
        console.error('AJAX POST ERROR: ', err);
      }
    })
  };

  useEffect(() => { // on mount will GET the top 25 repos
    getRepos(setRepos);
  }, [])

  const search = (term) => { // will POST search query to database then get updated top 25
    console.log(`${term} was searched`);
    let user = {username: term};
    postUserRepos(user);
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search} />
      {
        Object.keys(counts).length > 0
        ? <div>{counts.newCount} new repos imported, {counts.updateCount} repos updated</div>
        : null
      }
      <RepoList repos={repos} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));