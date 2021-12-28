import React, { Component } from 'react';
// import propTypes from 'prop-types';
import axiosFetch from 'services/pixabayAPI';

import ImageGalleryPendingView from './ImageGalleryPendingView';
import ImageGalleryErrorView from './ImageGalleryErrorView';
import ImageGalleryDataView from './ImageGalleryDataView';
import Button from 'components/Button/Button';

// import s from './ImageGallery.module.scss';

export default class ImageGallery extends Component {
  state = {
    imageArray: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchString;
    const nextSearch = this.props.searchString;
    const searchPage = this.props.page;

    if (prevSearch !== nextSearch) {
      console.log('search chanched');

      this.setState({ status: 'pending' });

      axiosFetch(nextSearch, searchPage)
        .then(result => {
          console.log('result', result);

          if (result.length === 0) {
            return Promise.reject(
              new Error(`По запросу ${nextSearch} ничего нет`),
              //сделать тост
            );
          }

          // this.setState(prevState => ({
          //   imageArray: [...prevState.imageArray, ...result],
          //   status: 'resolved',

          this.setState({
            imageArray: [...result],
            status: 'resolved',
          });
          // сделать тост
          // console.log(this.state);
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
      // .finally(() => this.setState({ loading: false }));
    }
  }

  incrPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    console.log(this.state.imageArray);

    const { imageArray, error, status } = this.state;

    if (status === 'idle') {
      return (
        <h2
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Введите имя поиска
        </h2>
      );
    }

    if (status === 'pending') {
      return <ImageGalleryPendingView />;
    }

    if (status === 'rejected') {
      return <ImageGalleryErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGalleryDataView
            imageArray={imageArray}
            toggleModal={this.props.toggleModal}
          />
          <Button pageDown={this.incrPage} />;
        </>
      );
    }
  }
}

//это аналог инфо / view
