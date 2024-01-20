
import { useState,useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import searchImg from '../api/api.api';
import styles from './App.module.css';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};


const App =()=> {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const[page, setPage] = useState(1);
  const[status, setStatus]= useState(STATUS.IDLE);

  // async componentDidUpdate = (_, prevState) => {
  //   const { search, page } = this.state;
  //   if (search && (search !== prevState.search || page !== prevState.page)) {
  //     this.fetchImgs();
  //   }
  // }
useEffect(()=>{
const fetchImgs = async() => {
  try {
    setStatus(STATUS.PENDING);
    const imagesApi = await searchImg(search, page);
      const { hits } = imagesApi;
      console.log(hits);
      const newhits = hits.map(hit => ({
        id: hit.id,
        tags: hit.tags,
        url: hit.webformatURL,
        urlModal: hit.largeImageURL,
      }));
      console.log(newhits);
// строка под ?
setImages(newhits?.length ? [...images, ...newhits] : images);
setStatus(STATUS.RESOLVED);     
  }
  catch(error) {
    // error: error.message;
setStatus(STATUS.REJECTED)
  }
  // finally {
    
  // }
}
fetchImgs()
},[page, search])

  const addSearch = searchValue => {
    if(searchValue === search) {
      return alert(`you are already viewing ${search}`)
    }
    setSearch(searchValue);
    setPage(1);
    setImages([]);
  };

  const addPag = () => {
    console.log('first');
    setPage(page + 1)
  };
   
    const isImages = Boolean(images.length);

    if (status === STATUS.IDLE)
      return (
        <>
          <Searchbar search={search} onSubmit={addSearch} />
          <ToastContainer autoClose={3000} />
        </>
      );

    if (status === STATUS.PENDING) return <Loader />;
    if (status === STATUS.RESOLVED)
      return (
        <>
          <div className={styles.app}>
            <Searchbar search={search} onSubmit={addSearch} />
            <ImageGallery items={images} />
          </div>
          {isImages && <Button onClick={addPag}>Load more</Button>}
        </>
      );
    if (status === STATUS.REJECTED)
      return <p className={styles.error}>Error!</p>;
  
}
export default App;