import React from 'react';
import ValidationError from './ValidationError';

export default class SearchBar extends React.Component {

  render(){
    return(
      <form onSubmit={this.props.onSubmit}>

        <label htmlFor="category">Category: </label>
        <select name="category" onChange={e => this.props.onChangeCategory(e.currentTarget.value)}>
          <option value="people">Character</option>
          <option value="films">Films</option>
          <option value="planets">Planets</option>
          <option value="starships">Spaceships</option>
          <option value="species">Species</option>
          <option value="vehicles">Vehicles</option>
        </select>
        
        <label htmlFor="search">Enter: </label>
        <input id="search" type='text' name="search-term" onChange={e => this.props.onChange(e.currentTarget.value)}></input>
        <button type='submit'>Search</button>
        <ValidationError 
          hasError={!this.props.searchTermValid}
          message={this.props.message.search} />
      </form>
    )
  }
}