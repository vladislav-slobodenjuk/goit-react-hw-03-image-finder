import React from 'react';
// import propTypes from 'prop-types';

import s from './ImageGalleryItem.module.scss';

export default function ImageGalleryItem(props) {
  const { webformatURL, largeImageURL, user, id } = props;
  const alt = `${user}'s photo №${id}`;
  return (
    <li className={s.galleryItem}>
      <img className={s.galleryImage} src={webformatURL} alt={alt} />
    </li>
  );
}
