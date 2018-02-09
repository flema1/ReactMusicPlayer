import React, { Component } from 'react';
import PlaylistList from './components/PlaylistList';
import SearchBar from './components/SearchBar';
import Main from './components/Main';
import PlayListMenu from './components/PlayListMenu';
import SideNav from './partials/SideNav';
import * as Ionicons from 'react-icons/lib/io'
import axios from 'axios';
import './App.css';

 export default class App extends Component {
    constructor() {
      super();
      this.state = {
        shift:null
      }
    }

    componentWillMount(){
      axios('/rPlayer/playlists', {method: 'GET'})
      .then(res => {
        console.log(res.data.data);
        this.setState({
          apidataLoaded:true,
          allPlayLists:res.data.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log('-----------------');    
    }
    
    toggleShift(){
      this.setState({shift:!this.state.shift})
    }
    

    render() {
      return (
            <div className="App">
              <SideNav toggleShift={this.toggleShift.bind(this)} playlist/>
              <Main shift={this.state.shift}/>
            </div>
      );
    }
}



