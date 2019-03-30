import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Display from './Display'
import SearchBar from './SearchBar';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      display: [],
      searchTerm: '',
      searchCategory: 'people',
      multiPage: false,
      searchTermValid: false,
      displayValid: false,
      validationMessages : {
        search: '',
        display: ''
      }
    }
  }

  componentDidUpdate = () => {
    if (this.state.loading && !this.state.multiPage){  
      this.apiCall(this.state.searchTerm,this.state.category)
        .then(res=>res.json())
        .then((data)=> {
          this.updateData(data)
        })
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

  updateCategory = (category) => {
    this.setState({category})
  }

  updateData = (data) => {
    const displayList= [...this.state.display];
    let key = 'name';
    if (this.state.category === 'films'){
      key = 'title';
    }
    let count = 0;
    if (Object.entries(data).length !== 0){
      count = data.results.length;
    }
    for (let index = 0; index < count; index++){
      console.log()
      displayList.push(data.results[index][key]);
      }
      
    if (data.next !== null){
      this.apiCall(this.state.searchTerm,this.state.category,data.next)
        .then(res=>res.json())
        .then(resData => {
          this.setState({
            ...this.state,
            multiPage: true,
            display: displayList
          },() => this.updateData(resData))
        })
    }
    else{
      this.setState({
        ...this.state, 
        display:displayList, 
        loading:false,
      })
    }
  }

  validateSearchTerm = (fieldValue) =>{
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.search = 'A search term is required';
      hasError = true;
    } else {
      fieldErrors.search = '';
      hasError = false;
      }

    this.setState({
      validationMessages: fieldErrors,
      searchTermValid: !hasError
    }, this.searchFormValid);
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    
    const searchTerm = e.currentTarget['search-term'].value;
    const category = e.currentTarget['category'].value;
    
    if (this.state.searchTermValid){  
      
      this.setState({
        searchTerm, category, display:[], loading:true,
      })
    }
    
  }

  apiCall(searchTerm, category,complexUrl){

    let url = 'https://swapi.co/api/';
    let queryString = `?search=${searchTerm}`;
    url += category;
    url += '/'
    url += queryString;
    if (complexUrl){
      url = complexUrl
    }
    return fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
      })
  }

  render() {
    return (
      <main className="App">
        <Header />
      
        <SearchBar 
            onChange={this.updateSearchTerm} 
            onSubmit = {this.handleSubmit} 
            searchFormValid={this.searchFormValid}
            message={this.state.validationMessages}
            onChangeCategory={this.updateCategory}/>
        <Display 
          names={this.state.display}
          loading={this.state.loading}/>
        
      </main>
    );
  }
}

export default App;
