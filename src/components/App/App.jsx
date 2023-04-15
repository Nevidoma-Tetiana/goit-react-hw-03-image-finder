import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Searchbar from 'components/Searchbar/Searchbar';
import { getImages } from 'Api/api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    search: '',
    images: [],
    isLoading: false,
    page: 1,
    totalImages: 0,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { page, search } = this.state;
    if (prevState.page !== page || prevState.search !== search) {
      try {
        this.setState({ isLoading: true });
        const { images, totalImages } = await getImages(search, page);
        if (images.length === 0) {
          Notify.failure('Nothing founded');
          return;
        }
        this.setState(state => ({
          images: [...state.images, ...images],
          totalImages,
        }));
      } catch (error) {
        Notify.failure(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  onLoadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  filterChanging = searchValue => {
    if (searchValue === '') {
      Notify.failure('Nothing to search');
      return;
    }
    this.setState({ search: searchValue, images: [], page: 1 });
  };

  render() {
    const { images, totalImages, isLoading } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.filterChanging} />
        {images.length !== 0 && <ImageGallery images={images} />}
        {totalImages !== images.length && !isLoading && (
          <Button onLoad={this.onLoadMore}>LOAD MORE...</Button>
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}
