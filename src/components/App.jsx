
import { useState,useEffect } from 'react';
import { ToastContainer,toast } from 'react-toastify';
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

useEffect(()=>{
const fetchImgs = async() => {
  try {
    setStatus(STATUS.PENDING);
    const imagesApi = await searchImg(search, page);
      const { hits } = imagesApi;
      if (hits.length === 0){
        setStatus(STATUS.IDLE)
        return alert('Sorry, nothing was found for your request.')
      }
      // console.log(hits);
      const newhits = hits.map(hit => ({
        id: hit.id,
        tags: hit.tags,
        url: hit.webformatURL,
        urlModal: hit.largeImageURL,
      }));
      // console.log(newhits);
setImages(prevItems => (newhits?.length ? [...prevItems, ...newhits] : prevItems));
setStatus(STATUS.RESOLVED);     
  }
  catch(error) {
    // error: error.message;
setStatus(STATUS.REJECTED)
  }
  
}
if(search || page > 1) {
  fetchImgs()
}

},[page, search])

  const addSearch = searchValue => {
    if(searchValue === search) {
      toast.warn(`you are already viewing ${search}`);
      // return
      return alert(`you are already viewing ${search}`)
    }
    setSearch(searchValue);
    setPage(1);
    setImages([]);
  };

  const addPag = () => {
    console.log('first');
    setPage(prevPage => prevPage + 1);
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