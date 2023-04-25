import React from 'react';

const RepoListEntry = ({repo}) => {
  return (
    <div className='repo'>
      <a href={repo.url}>
      <h3>{repo.repo_name}</h3>
      </a>
    </div>
  )
};

export default RepoListEntry;