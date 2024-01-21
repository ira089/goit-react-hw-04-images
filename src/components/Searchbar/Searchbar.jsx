import { useState } from 'react';
import { SiSearxng } from 'react-icons/si';
import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';

const Searchbar =( {onSubmit}) =>{
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    // console.log(target.value);
    setSearch(target.value)
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (search.trim() === '') {
      toast.error('Fill in the search field.');
      return;
    }
    onSubmit(search)
    setSearch('')
  };

    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.searchFormButton}>
            <SiSearxng style={{ color: 'aqua', width: 30, height: 30 }} />
            <span className={styles.searchFormButtonLabel}></span>
          </button>

          <input
            className={styles.searchFormInput}
            // required
            onChange={handleChange}
            type="text"
            name="serch"
            value={search}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}

export default Searchbar;