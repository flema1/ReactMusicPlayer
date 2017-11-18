import React, { Component } from 'react';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom'

export default class Nav extends Component {
  render() {
    const {handleChange, handleSubmit} = this.props;
    return (
      <nav>
          <ul>
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/PlayListsList">PlayLists</Link></li>
            <li><Link to="/PlayList">Playlist</Link></li>
            <li><div><SearchBar handleChange={handleChange} handleSubmit={handleSubmit}/></div></li>
           </ul>
      </nav>
    );
  };
}

