import React, { Component } from 'react';
import axios from 'axios';

import Playlist from './SinglePlaylist';
import Sound from './Sound';
import {Link } from 'react-router-dom';
import { connect } from 'react-redux'; 

const getPlaylistsRedux = () => {
  return {
    type: 'GET_PLAYLIST_LIST_DATA'
  };
};

const setPlaylistIdRedux = (playListId) => {
  console.log("herere");
  return {
    type: 'SET_PLAYLIST_ID',
    playListId:playListId
  };
};

class PlaylistList extends Component {
        constructor() {
        super();
        this.state = {
            streamURl:null,
        }
  }

  componentWillMount(){
                this.props.getPL() 
        }

        render() {
            const { streamURl } = this.state; 
            const {  playlists, loadPlaylistId } = this.props; 
            return (
                    <div className={'playlistList'}>
                        {playlists ? playlists.map((playlist, index) => <div key={index}>
                                  <h1>{playlist.name}</h1>
                                  <h1>{playlist.id}</h1>
                                  <Link to={'/SinglePlaylist'} onClick={()=>loadPlaylistId(playlist.id)} > Load Playlist </Link>
                                </div>)
                            : <h1>Loading</h1>}
                    </div>
                    )
        }
}

const mapStateToProps = (state) => { 
  return { 
    playlists: state.playlists
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPL() {
        dispatch(getPlaylistsRedux());
    },
    loadPlaylistId(playListId) {
        dispatch(setPlaylistIdRedux(playListId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);
