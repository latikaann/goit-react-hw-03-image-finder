import React from 'react';
import { nanoid } from 'nanoid';
import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ cards, onClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {cards.map(card => (
        <ImageGalleryItem
          key={nanoid(7)}
          webformatURL={card.webformatURL}
          largeImageURL={card.largeImageURL}
          tags={card.tags}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
