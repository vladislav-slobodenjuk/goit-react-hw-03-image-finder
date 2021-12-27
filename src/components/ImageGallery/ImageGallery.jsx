import React, { Component } from 'react';
// import propTypes from 'prop-types';
// import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import axiosFetch from 'services/getImageAPI';

import s from './ImageGallery.module.scss';

export default class ImageGallery extends Component {
  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchString;
    const nextSearch = this.props.searchString;

    if (prevSearch !== nextSearch) {
      // console.log(prevProps.searchString);
      // console.log(this.props.searchString);
      console.log('search chanched');

      axiosFetch(nextSearch);
    }
  }
  render() {
    return (
      <ul className={s.gallery}>
        {this.props.searchString}
        {/* <!-- Набор <li> с изображениями --> */}
      </ul>
    );
  }
}
