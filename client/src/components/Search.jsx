import React, { useState } from 'react';
import $ from 'jquery';

const Search = ({ onSearch }) => {

  const[term, setTerm] = useState('')

  const onChange = (e) => {
    setTerm(e.target.value);
  }

  const search = () => {
    onSearch(term);
  }

  return (
    <div>
      <h4>Add more repos!</h4>
      Enter a github username: <input id='search-bar' onChange={onChange}/>
      <button onClick={search}> Add Repos </button>
    </div>
  );
}

export default Search;