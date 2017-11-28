import React, { Component } from 'react';
import SingleSong from './SingleSong';
import Sound from './Sound';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'; 
import axios from 'axios';


const getPlaylistSongsRedux = (playListId) => {
  console.log("GET_PLAYLIST_SONGS_DATA");
  return {
    type: 'GET_PLAYLIST_SONGS_DATA',
    playListId:playListId
  };
};


 class Playlist extends Component {
  constructor() {
    super();
    this.state = {
         streamURl:null,
    }
  }

 componentWillMount() {
    this.props.loadPlaylistSongs(this.props.playListId);    
    }

    setSong=(songUrl)=>{
                this.setState({
                        streamURl:songUrl
            })
        }
  

 render() {   
    const {streamURl} = this.state;
    const { playListId,apidataLoaded, songs} = this.props;
        return (
            <div className={'playListContainer'} >
                 {apidataLoaded ? songs.map((song, index) => <SingleSong 
                
                 song={song} key={index} />):<h1>Search</h1>}
            </div>
            )
    }
}



const mapStateToProps = (state) => { 
  return { 
         playListId: state.playListId,
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
