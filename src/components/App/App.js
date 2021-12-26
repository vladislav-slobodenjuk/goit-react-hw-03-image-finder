import { Component } from 'react';
// import { ImSearch } from 'react-icons/im';
import Searchbar from './Searchbar/Searchbar';

import { ToastContainer } from 'react-toastify';
import { Zoom } from 'react-toastify';

// import logo from 'logo.svg';
import s from './App.module.scss';

class App extends Component {
  state = {
    searchString: '',
  };

  handleFormSubmit = data => {
    this.setState({ searchString: data });
  };

  render() {
    console.log(this.state);

    return (
      <div className={s.app}>
        {/* <header className={s.appHeader}>
          <img src={logo} className={s.appLogo} alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. <ImSearch />
          </p>
          <a
            className={s.appLink}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={4000} theme="colored" transition={Zoom} />
      </div>
    );
  }
}

export default App;
