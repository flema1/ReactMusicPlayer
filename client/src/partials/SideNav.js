import React, { Component } from 'react';
import PlaylistList from '../components/PlaylistList';
import SearchBar from '../components/SearchBar';
import PlayListMenu from '../components/PlayListMenu';
import * as Ionicons from 'react-icons/lib/md';
import axios from 'axios';

export default class SideNav extends Component {
  constructor() {
    super();
    this.state = {
      searchSong: null,
      loadComponent: false,
      apidataLoaded: false,
      allPlayLists: null,
      show: false,
    }
  }

  componentWillMount() {
  }

  handleChange(e) {
    this.props.redirectTo("SEARCH")
  };

  toggleShow() {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const { searchSong, loadComponent, playlist,show } = this.state;
    console.log(playlist, 'playlist home');
    console.log('search', this.state.searchSong)
    console.log('show----', show)
    return ( 
      <nav role = "navigation" className={'menu-container'}>
        <div id = "menuToggle" >
          <input type = "checkbox" onClick = { () => this.props.toggleShift() }/> 
          <span> </span> 
          <span> </span> 
          <span> </span> 
          <ul className= "menu" style = {{ backgroundColor:'#F8F8F8', display: 'flex', flexDirection: 'column', color: '#fff'}}>
             <li style={{marginTop:'-30px', textAlign:'left' , paddingBottom: '20px' }}>
               <Ionicons.MdClose width={'30px'} 
                  height={'2em'} 
                  fill={'#ff7675'}
              />
            </li>
            <li> 
              <SearchBar 
                value={ this.state.searchSong } 
                handleChange={this.handleChange.bind(this)} 
              />
              </li>
            <li>
              <a href="#" style={{ /*color: 'tomato'*/}} onClick={()=>this.props.redirectTo("DEFAULT")}>Home</a>
            </li>
            <li>
              <a href="#" style={{ /*color: 'tomato'*/}}>Albums</a>
            </li>
            <li>
              <a href="#" style={{/*color: 'tomato'*/}} onClick={()=>this.props.redirectTo("ARTISTS")}>Artists</a>
            </li>
            <li>
              <a href="#" style={{ /*color: 'tomato'*/}} onClick={()=>this.props.redirectTo("FAVORITES")}>Favorites</a>
            </li>
            <li>
              <a href="#" style={{ /*color: 'tomato'*/}}  onClick ={this.toggleShow.bind(this)}>Playlists</a>
            </li>
            <li style={{ display:this.state.show ? 'flex':'none', }}>
              <PlaylistList />
            </li>
            <li>
              <PlayListMenu show={ this.state.show } redirectTo={ this.props.redirectTo} />
            </li>
          </ul>  
        </div>
      </nav>
    );
  }
}



