import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const getPlaylistsRedux = () => {
  return {
    type: 'GET_PLAYLIST_LIST_DATA'
  };
};

const getPlaylistSongsRedux = (playListId) => {
  console.log("GET_PLAYLIST_SONGS_DATA");
  return {
    type: 'GET_PLAYLIST_SONGS_DATA',
    playListId: playListId
  };
};

// const setPlaylistIdRedux = (playListId) => {
//   console.log("herere");
//   return {
//     type: 'SET_PLAYLIST_ID',
//     playListId:playListId
//   };
// };

class PlaylistList extends Component {
  componentWillMount() {
    this.props.getPL()
  }

  render() {
    const {  playlists } = this.props; 
    console.log(playlists, "plat")
    return (<div style = {{ backgroundColor:'#F8F8F8', flexDirection: 'column', color: '#fff', height:'300px', width: '250px'}} >
              { playlists ? playlists.map((playlist, index) => <p style={{ fontSize:12, color:'red' }} key={index}  onClick={()=> this.props.loadPlaylistSongs(playlist.id)}> {playlist.name }</p> ) : <h1>Loading</h1>}
            </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    playlists: state.main.playlists
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPL() {
      dispatch(getPlaylistsRedux());
    },

    loadPlaylistSongs(playListId) {
      dispatch(getPlaylistSongsRedux(playListId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);
