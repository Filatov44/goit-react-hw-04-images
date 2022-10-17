import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import {
  StyledHeader,
  StyledForm,
  StyledSearchBtn,
  StyledSearchInput,
} from './Searchbar.styled';

export default function Searchbar(props) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const reset = () => {
    setQuery('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a valid request');
      return;
    }
    props.onSubmit(query);
    reset();
  };

  const searchId = nanoid();

  return (
    <StyledHeader>
      <StyledForm onSubmit={handleSubmit}>
        <StyledSearchBtn onClick={handleSubmit} type="submit">
          <BsSearch size={20} />
        </StyledSearchBtn>
        <StyledSearchInput
          onChange={handleChange}
          id={searchId}
          value={query}
          name="query"
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
        ></StyledSearchInput>
      </StyledForm>
    </StyledHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
