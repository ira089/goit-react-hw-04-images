import { Component } from 'react';
import { SiSearxng } from 'react-icons/si';
// import { toast } from 'react-toastify';

import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.search.trim() === '') {
      toast.error('Fill in the search field.');
      return;
    }

    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };

  handleChange = ({ target }) => {
    // console.log(target.value);
    this.setState({
      search: target.value,
    });
  };

  render() {
    const { handleSubmit, handleChange } = this;
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.searchFormButton}>
            <SiSearxng style={{ color: 'aqua', width: 30, height: 30 }} />

            <span className={styles.searchFormButtonLabel}></span>
          </button>

          <input
            className={styles.searchFormInput}
            onChange={handleChange}
            type="text"
            name="serch"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;