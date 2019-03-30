import React from 'react';


export default class Display extends React.Component {

  render(){
    const list = this.props.names.map(data => <li key={data}>{data}</li>)
    if (this.props.loading){
      return (<p>Loading...</p>)
    }else{
      return(
        <ul>
          {list}
        </ul>
      )
    }
  }
}