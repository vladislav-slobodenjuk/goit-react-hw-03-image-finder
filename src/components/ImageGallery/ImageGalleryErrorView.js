import React from 'react';
import errorImage from 'error.jpg';

export default function ImageGalleryErrorView({ message }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.05)',
        // zIndex: '1200',
      }}
    >
      <h1>{message}</h1>
      <img src={errorImage} alt="sadCat" width="240" />
    </div>
  );
}
