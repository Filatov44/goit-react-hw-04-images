import React from 'react';
import PropTypes from 'prop-types';
import { StyledGalleryList } from './ImageGallery.styled';
import { StyledImg, StyledItem } from '../ImageGalleryItem/ImageGalleryItem.styled';


export default function ImageGallery({ pictures, onClick }) {
    
    
  return (
      <StyledGalleryList >
      {pictures.map(({ id, largeImageURL, tags, webformatURL }) => {
        return (
          <StyledItem key={id}>
            <StyledImg
              onClick={() => onClick({ largeImageURL, tags })}
              id={id}
              src={webformatURL}
              alt={tags}
              largeImageURL={largeImageURL}
            />
          </StyledItem>
        );
      })}
    </StyledGalleryList>
  );
}

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  pictures: PropTypes.array,
};
