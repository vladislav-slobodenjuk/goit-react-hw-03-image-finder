import React from 'react';
// import { Component } from 'react/cjs/react.production.min';
// import propTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import s from './ImageGallery.module.scss';

export default function ImageGalleryDataView({ imageArray, toggleModal }) {
  return (
    <ul className={s.gallery}>
      {imageArray.map(image => {
        const { id, webformatURL, largeImageURL, user } = image;
        // console.log(image);
        // console.log(webformatURL);

        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            id={id}
            user={user}
            toggleModal={toggleModal}
          />
        );
      })}
    </ul>
  );
}

// {imageArray.map(image => {
//   console.log(image)
//   const {} = image

//   return ((
//   <li></li>
// ))
