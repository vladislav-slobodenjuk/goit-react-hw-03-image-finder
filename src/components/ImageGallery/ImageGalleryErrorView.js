import React from 'react';
// import propTypes from 'prop-types';
import errorImage from 'error.jpg';

export default function ImageGalleryErrorView({ message }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>{message}</h1>
      <img src={errorImage} alt="sadCat" width="240" />
    </div>
  );
}
