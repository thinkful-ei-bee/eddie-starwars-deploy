import React, { Component } from 'react';
import './App.css';
// import {Route} from 'react-router-dom';
import Header from './Header';
import Display from './Display';
import SearchBar from './SearchBar';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      display: [],
      searchTerm: '',
      searchCategory: '',
      formValid: false,
      validationMessages : {
        search: '',
        display: ''
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar />
        <Display />
      </div>
    );
  }
}

export default App;
