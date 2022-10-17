import React from 'react';
import PropTypes from 'prop-types';
import { StyledBtnLoadMore } from './Button.styled';

export default function ButtonLoadMore({onClick} ) {
  return (
    <StyledBtnLoadMore type="button" onClick={onClick}>
      Load more
    </StyledBtnLoadMore>
  );
}

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};