
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
// import Modal from './Modal/Modal';
import searchImg from '../api/api.api';
import styles from './App.module.css';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

class App extends Component {
  state = {
    images: [],
    search: '',
    // loading: false,
    // error: null,
    page: 1,
    // modalOpen: false,
    status: STATUS.IDLE,
  };

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.fetchImgs();
    }
  }

  async fetchImgs() {
    const { search, page } = this.state;
    try {
      // this.setState({ loading: true });
      this.setState({ status: STATUS.PENDING });
      const imagesApi = await searchImg(search, page);
      const { hits } = imagesApi;
      // console.log(hits);
      const newhits = hits.map(hit => ({
        id: hit.id,
        tags: hit.tags,
        url: hit.webformatURL,
        urlModal: hit.largeImageURL,
      }));
      // console.log(newhits);
      this.setState(({ images }) => ({
        images: newhits?.length ? [...images, ...newhits] : images,
        status: STATUS.RESOLVED,
      }));
    } catch (error) {
      this.setState({
        error: error.message,
        status: STATUS.REJECTED,
      });
    }
  }

  addSearch = searchValue => {
    // console.log('qwe');
    this.setState({ search: searchValue, page: 1, images: [] });
    // this.setState({ search: searchValue });
  };

  addPag = () => {
    // console.log('first');
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { addSearch, addPag } = this;
    const { search, images } = this.state;
    const isImages = Boolean(images.length);

    if (this.state.status === STATUS.IDLE)
      return (
        <>
          <Searchbar search={search} onSubmit={addSearch} />
          <ToastContainer autoClose={3000} />
        </>
      );

    if (this.state.status === STATUS.PENDING) return <Loader />;
    if (this.state.status === STATUS.RESOLVED)
      return (
        <>
          <div className={styles.app}>
            <Searchbar search={search} onSubmit={addSearch} />
            <ImageGallery items={images} />
          </div>
          {isImages && <Button onClick={addPag}>Load more</Button>}
        </>
      );
    if (this.state.status === STATUS.REJECTED)
      return <p className={styles.error}>Error!</p>;
  }
}
export default App;