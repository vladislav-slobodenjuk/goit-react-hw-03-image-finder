import { Component } from 'react';
import propTypes from 'prop-types';
import axiosFetch from 'services/pixabayAPI';
import { toast } from 'react-toastify';

import ImageGalleryIdleView from './statuses/ImageGalleryIdleView';
import ImageGalleryPendingView from './statuses/ImageGalleryPendingView';
import ImageGalleryErrorView from './statuses/ImageGalleryErrorView';
import ImageGalleryDataView from './statuses/ImageGalleryDataView';
import Button from 'components/Button/Button';

import 'react-toastify/dist/ReactToastify.css';

export default class ImageGallery extends Component {
  static propTypes = {
    searchString: propTypes.string.isRequired,
    toggleModal: propTypes.func.isRequired,
  };

  state = {
    imageArray: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchString;
    const nextSearch = this.props.searchString;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch) {
      this.setState({ status: 'pending', page: 1 });

      try {
        const fetchResult = await axiosFetch(nextSearch, nextPage);

        if (fetchResult.length === 0) {
          toast.warn('Ничего не нашли :(');
          throw new Error(`По запросу ${nextSearch} ничего нет`);
        }

        this.setState({
          imageArray: [...fetchResult],
          status: 'resolved',
        });
        toast.success('Ура, нашли!');
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      this.setState({ status: 'pending' });

      try {
        const fetchResult = await axiosFetch(nextSearch, nextPage);

        if (fetchResult.length === 0) {
          toast.warn('Больше ничего нет, это все :(');
          throw new Error(`Больше ничего нет`);
        }

        this.setState(prevState => ({
          imageArray: [...prevState.imageArray, ...fetchResult],
          status: 'resolved',
        }));
        toast.success('Ура, еще нашли!');
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  incrPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { imageArray, error, status } = this.state;

    return (
      <>
        {status === 'idle' && <ImageGalleryIdleView />}
        {status === 'pending' && <ImageGalleryPendingView />}
        {status === 'rejected' && (
          <ImageGalleryErrorView message={error.message} />
        )}
        {status === 'resolved' && (
          <>
            <ImageGalleryDataView
              imageArray={imageArray}
              toggleModal={this.props.toggleModal}
            />
            <Button pageDown={this.incrPage} />;
          </>
        )}
      </>
    );
  }
}
