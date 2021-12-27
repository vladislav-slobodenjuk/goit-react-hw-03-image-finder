import React from 'react';
import { Component } from 'react/cjs/react.production.min';
// import propTypes from 'prop-types';
// import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import s from './ImageGallery.module.scss';

export default class ImageGallery extends Component {
  render() {
    return (
      <ul className={s.gallery}>
        {this.props.searchString}
        {/* <!-- Набор <li> с изображениями --> */}
      </ul>
    );
  }
}
