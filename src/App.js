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
      data: {},
      display: [],
      searchTerm: '',
      searchCategory: '',
      searchTermValid: false,
      validationMessages : {
        search: '',
        display: ''
      }
    }
  }

  searchFormValid = () => {
    this.setState({
      searchFormValid: this.state.searchTermValid 
    });
  }

  updateSearchTerm = (searchTerm) => {
    this.setState({searchTerm}, () => {this.validateSearchTerm(searchTerm)})
  }

  updateData = (data) =>{
    this.setState({
      ...this.state,
      data,
    }, this.updateDisplay)
  }

  updateDisplay = () => {
    console.log('Updating Display...')
    //parse through this.state.data and put into this.state.display
    const newDisplay= [];
    let count = 0;
    let index = 0;
    let data = this.state.data;
    if (Object.entries(this.state.data).length !== 0){
      count = this.state.data.count;
    }
    while (index < count){
      newDisplay.push(this.state.data.results[index].name);
      index++;
      if (index === 9){
        index = 0;
        console.log(data.next);
        break;
        // data = data.next;

      }
    }
    this.setState({
      ...this.state,
      display: newDisplay
    })

  }

  validateSearchTerm = (fieldValue) =>{
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.search = 'A search term is required';
      hasError = true;
    } else {
      // if (fieldValue.length < 2) {
      //   fieldErrors.search = 'Term must be at least 2 characters long';
      //   hasError = true;
      // } else {
        fieldErrors.search = '';
        hasError = false;
      }
    // }

    this.setState({
      validationMessages: fieldErrors,
      searchTermValid: !hasError
    }, this.searchFormValid);
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    let url = 'https://swapi.co/api/';
    const searchTerm = e.currentTarget['search-term'].value;
    let queryString = `?search=${searchTerm}`;
    const category = e.currentTarget['category'].value;
    url += category;
    url += '/'
    url += queryString;
    console.log('final url:',url);
    if (this.state.searchTermValid){  
      console.log('Fetching...')
      fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
        })
        .then(res=>res.json())
        .then((data)=> {
          console.log('Fresh data: ',data);         /////////////////////////////console.log
          this.setState({
            searchTerm,
          }, ()=>this.updateData(data))
          
        })
    }
    
  }

  render() {
    return (
      <main className="App">
        <Route exact path='/' render ={()=> <Header />}/>
        <Route exact path='/' 
        render={(props)=> 
          <SearchBar 
            onChange={this.updateSearchTerm} 
            onSubmit = {this.handleSubmit} 
            searchFormValid={this.searchFormValid}
            message={this.state.validationMessages}/>} />
        <Route exact path='/' render={(props)=> <Display names={this.state.display}/>} />
        
      </main>
    );
  }
}

export default withRouter(App);
