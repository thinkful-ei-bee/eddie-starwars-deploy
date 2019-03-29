import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import Header from './Header';
import Display from './Display'
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
      <main className="App">
        <Route exact path='/' render ={()=> <Header />}/>
        <Route exact path='/' render={()=> <SearchBar />} />
        <Route exact path='/' render={()=> <Display />} />
        
      </main>
    );
  }
}

export default withRouter(App);
