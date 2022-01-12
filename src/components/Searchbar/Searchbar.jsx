import { PureComponent } from 'react';
import propTypes from 'prop-types';

import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';

import s from './Searchbar.module.scss';
import 'react-toastify/dist/ReactToastify.css';

export default class Searchbar extends PureComponent {
  static propTypes = {
    onSubmit: propTypes.func.isRequired,
  };

  state = {
    searchString: '',
  };

  handleInputChange = e => {
    this.setState({ searchString: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchString.trim() === '') {
      //!!! trim
      toast.error('Введите что будем искать');
      return;
    }

    this.props.onSubmit(this.state.searchString.trim()); // !!! trim
    this.setState({ searchString: '' });
  };

  render() {
    return (
      <header className={s.searchBar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.searchFormButton}>
            <ImSearch />
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            value={this.state.searchString} // !!!
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
