import React, { Component } from 'react';
// import propTypes from 'prop-types';
import axiosFetch from 'services/getImageAPI';
import Loader from 'react-loader-spinner';

import ImageGalleryErrorView from './ImageGalleryErrorView';
import ImageGalleryDataView from './ImageGalleryDataView';
import Button from 'components/Button/Button';

import s from './ImageGallery.module.scss';

export default class ImageGallery extends Component {
  state = {
    imageArray: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchString;
    const nextSearch = this.props.searchString;

    if (prevSearch !== nextSearch) {
      console.log('search chanched');

      this.setState({ status: 'pending' });

      axiosFetch(nextSearch)
        .then(result => {
          console.log('result', result);

          // console.log(result.length);
          if (result.length === 0) {
            return Promise.reject(
              new Error(`По запросу ${nextSearch} ничего нет`),
              //сделать тост
            );
          }

          this.setState(prevState => ({
            imageArray: [...prevState.imageArray, ...result],
            status: 'resolved',
          }));
          // console.log(this.state);
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    console.log(this.state.imageArray);

    const { imageArray, error, status } = this.state;
    // const { searchString } = this.props;

    if (status === 'idle') {
      return (
        <h2
          style={{
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'rgba(0, 0, 0, 0.05)',
            // zIndex: '1200',
          }}
        >
          Введите имя поиска
        </h2>
      );
    }

    if (status === 'pending') {
      // return <div>Zagruzka</div>;
      return (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            zIndex: '1200',
          }}
        >
          <Loader type="Bars" color="#3f51b5" height={80} width={80} />
        </div>
      );
    }

    if (status === 'rejected') {
      // return <div>{error.message}</div>;
      return <ImageGalleryErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      // return (
      //   <ul className={s.gallery}>
      //     {imageArray.length > 0 && <p>render li</p>}
      //     {/* <!-- Набор <li> с изображениями --> */}
      //   </ul>
      // );
      return (
        <>
          <ImageGalleryDataView imageArray={imageArray} />
          <Button />;
        </>
      );
    }
  }
}

//это аналог инфо / view
