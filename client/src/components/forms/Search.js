import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

import { SEARCH_QUERY } from '../../actions/types';

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const history = useHistory();
  const { text } = search;

  const handleChange = (e) => {
    dispatch({ type: SEARCH_QUERY, payload: { text: e.target.value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
      <input
        type='search'
        value={text}
        className='form-control mr-sm-2'
        placeholder='Search'
        onChange={handleChange}
      />{' '}
      <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
    </form>
  );
};

export default Search;
