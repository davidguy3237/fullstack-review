import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = ({ repos }) => {

  return (
  <div>
    <h2> Top 25 Repos </h2>
    {repos.map((repo, index) => <RepoListEntry key={index} repo={repo} />)}
  </div>
)
};

export default RepoList;