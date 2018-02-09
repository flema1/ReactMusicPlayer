import React, { Component } from 'react';
import SingleSong from './SingleSong';
import { connect } from 'react-redux'; 
import axios from 'axios';


const getPlaylistSongsRedux = (playListId) => {
  console.log("GET_PLAYLIST_SONGS_DATA");
  return {
    type: 'GET_PLAYLIST_SONGS_DATA',
    playListId:playListId
  };
};


const setCurrCover = (coverUrl) => {
  return {
    type: 'SET_CURR_COVER',
    payload:coverUrl
  };
};


 class Playlist extends Component {
   componentWillMount() {
    console.log(this.props.playListId, 'this.props.playListId')
    this.props.loadPlaylistSongs(this.props.playListId);    
   }

  render() {   
      const { apidataLoaded, songs} = this.props;
      console.log(apidataLoaded, 'apidataLoaded', songs)
      return (<div style={{  paddingTop:'100px',overflow: 'scroll', height:'200px'}}>
                      {apidataLoaded ? songs.map((song, index) => <SingleSong song={song} key={index} />):<h1>Search</h1>}
              </div>)
    }
}


const mapStateToProps = (state) => { 
  return { 
         apidataLoaded:state.SinglePlaylistSongsApidataLoaded,
         songs:state.SinglePlaylistSongs
   };
};

const mapDispatchToProps = (dispatch) =>{
  return {
     loadPlaylistSongs(playListId) {
            dispatch(getPlaylistSongsRedux(playListId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
