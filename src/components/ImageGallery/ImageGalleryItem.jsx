import React from 'react';
import css from './ImageGallery.module.css';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
