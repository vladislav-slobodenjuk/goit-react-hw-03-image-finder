import React, { Component } from 'react';
// import propTypes from 'prop-types';
import axiosFetch from 'services/pixabayAPI';

import ImageGalleryIdleView from './ImageGalleryIdleView';
import ImageGalleryPendingView from './ImageGalleryPendingView';
import ImageGalleryErrorView from './ImageGalleryErrorView';
import ImageGalleryDataView from './ImageGalleryDataView';
import Button from 'components/Button/Button';

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
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch) {
      this.setState({ status: 'pending', page: 1 });

      axiosFetch(nextSearch, nextPage)
        .then(result => {
          if (result.length === 0) {
            return Promise.reject(
              new Error(`По запросу ${nextSearch} ничего нет`),
              //сделать тост
            );
          }

          this.setState({
            imageArray: [...result],
            status: 'resolved',
          });
          // сделать тост
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      axiosFetch(nextSearch, nextPage)
        .then(result => {
          if (result.length === 0) {
            return Promise.reject(
              new Error(`По запросу ${nextSearch} ничего нет`),
              //сделать тост
            );
          }

          this.setState(prevState => ({
            imageArray: [...prevState.imageArray, ...result],
            status: 'resolved',
            // сделать тост
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  incrPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { imageArray, error, status } = this.state;

    if (status === 'idle') {
      return <ImageGalleryIdleView />;
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
