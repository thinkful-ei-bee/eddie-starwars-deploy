import React from 'react';

export default class Header extends React.Component {
  render(){
    return(
      <header>
        <h1>Star Wars API Search</h1>
        <p>An app to look up Star Wars Characters using <a href="https://swapi.co/">SWAPI</a></p>
      </header>
    )
  }
}