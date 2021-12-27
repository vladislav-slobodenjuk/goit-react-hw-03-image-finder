import React from 'react';
// import propTypes from 'prop-types';

import s from './ImageGalleryItem.module.scss';

export default function ImageGalleryItem() {
  return (
    <li className={s.galleryItem}>
      <img className={s.galleryImage} src="" alt="" />
    </li>
  );
}
