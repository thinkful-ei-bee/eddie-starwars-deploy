import React from 'react';
// import {Link} from 'react-router-dom';

export default class Header extends React.Component {
  render(){
    return(
      <header>
        {/* <Link to='/'> */}
          <h1>Star Wars API Search</h1>
        {/* </Link> */}
        <p>An app to look up Star Wars Characters using <a href="https://swapi.co/">SWAPI</a></p>
      </header>
    )
  }
}