import React, { Component } from 'react';
import PlayButton from './components/PlayButton';
import PlaylistList from './components/PlaylistList';
import Controls from './components/Controls';
import Nav from './partials/Nav';
import SearchResults from './components/SearchResults'
import SearchBar from './components/SearchBar';
import * as Ionicons from 'react-icons/lib/io'
import axios from 'axios';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


export default class App extends Component {
    constructor() {
      super();
      this.state = {
          streamURl:null,
          searchSong:null,
          loadComponent:false
      }
    }

    handleChange=(e)=> this.setState({searchSong: e.target.value})
    handleSubmit=()=> this.setState({loadComponent: true}, ()=>{ this.setState({loadComponent: false}) })

    render() {
      const {searchSong, loadComponent } = this.state;
      return (
        <Router>
            <div className="App">
                <Controls/>
                <Nav handleChange={this.handleChange} value={searchSong} handleSubmit={this.handleSubmit}/>
                <Route exact path={"/PlayListsList"} component={PlaylistList}/>
                <Route exact path={"/SearchResults"} render={()=> <SearchResults title={searchSong} load={loadComponent}/>}/>
            </div>
          </Router>
      );
    }
}




