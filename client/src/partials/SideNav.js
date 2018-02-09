import React, { Component } from 'react';
import PlaylistList from '../components/PlaylistList';
import SearchBar from '../components/SearchBar';
import PlayListMenu from '../components/PlayListMenu';
import * as Ionicons from 'react-icons/lib/io'
import axios from 'axios';

 export default class SideNav extends Component {
   constructor() {
      super();
      this.state = {
          searchSong:null,
          loadComponent:false,
          apidataLoaded:false,
          allPlayLists:null,
          show:false,
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
  }

   handleChange(e){
    this.setState({searchSong: e.target.value})
   };

    toggleShow(){
      this.setState({show:!this.state.show})
    }
    

    render() {
      const {searchSong, loadComponent, playlist } = this.state;
      console.log(playlist, 'playlist home');
      console.log('search', this.state.searchSong )
      return (
             <nav role="navigation">
                <div id="menuToggle">
                  <input type="checkbox"  onClick={()=>this.props.toggleShift()}/>
                  <span></span>
                  <span></span>
                  <span></span>
                  <ul id="menu" style={{backgroundColor:'#493e42', display:'flex', flexDirection:'column', color:'#fff' }} >
                   <SearchBar value={ this.state.searchSong } handleChange={this.handleChange.bind(this)  }  /*handleSubmit={ }*//>
                    <a href="#" style={{ color: 'tomato'}}><li>Home</li></a>
                    <a href="#" style={{ color: 'tomato'}}><li>Albums</li></a>
                    <a href="#" style={{ color: 'tomato'}}><li>Artists</li></a>
                    <a href="#" style={{ color: 'tomato'}}  onClick ={this.toggleShow.bind(this)} ><li>Playlists</li></a>
                    <li style={{ display:this.state.show ? 'flex':'none', }}>
                      <PlaylistList />
                    </li>
                    <li>
                      <PlayListMenu />
                    </li>
                  </ul>
                </div>
              </nav>
      );
    }
}



