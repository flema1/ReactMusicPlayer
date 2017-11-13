import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PlayButton from './components/PlayButton';
import Library from './components/Library';

import Search from './components/Search';

import axios from 'axios';
import './App.css';
import * as Ionicons from 'react-icons/lib/io'




class App extends Component {
  constructor() {
    super();
     this.state = {
         active:false,
         currentSong:null,
         streamURl:null,
         apidataLoaded:false
        
    }
}
  render() {
    return (
      <div className="App">
        <Search/>
        </div>
    );
  }
}






export default App;
