import React from 'react';
import { nanoid } from 'nanoid';
import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ cards, onClick }) => {
  return (
    <ul className={css.ImageGallery} onClick={onClick}>
      {cards.map(card => (
        <ImageGalleryItem
          key={nanoid(7)}
          webformatURL={card.webformatURL}
          largeImageURL={card.largeImageURL}
          tags={card.tags}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
