import React from 'react';


export default class Display extends React.Component {

  render(){
    const list = this.props.names.map(data => <li key={data}>{data}</li>)
    return(
      <ul>
        {list}
      </ul>
    )
  }
}