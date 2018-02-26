import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as Ionicons from 'react-icons/lib/io';

const getArtistInfo = (artistId) => {
  return {
    type: 'REQUEST_ARTIST_DATA',
    payload: artistId
  }
}

const getAllArtists = () => {
  return {
    type: 'REQUEST_ALL_ARTISTS_DATA'
  }
}


class ArtistsComponent extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    this.props.loadArtists();
  }

  getArtistInfo(artistId) {
    this.props.updateArtistInfo(artistId);
    this.props.redirectTo('ARTIST_INFO');
  }

  render(){
      let placeHolderUrl='https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-256.png';
      const { artists, shift }=this.props;
      return ( 
        <div 
         className={'all-artists-container'}
         style={{ position: 'relative', left: shift ? '300px': 0}}

        
            
        >
            {
              artists ? 
              
                <div style={{ flex:1, flexWrap:'wrap', display: 'flex' , overflow:'scroll', paddingTop: '5%'}}  >{
                  artists.map((artist, index) => 
                <div className={'artist-container'} key={index}>
                  <button   onClick={ this.getArtistInfo.bind(this,artist.artistId )}> Info </button>
                  <div className={"song-image"}> 
                    <img 
                      src={ artist.artistArtRef ? artist.artistArtRef : placeHolderUrl } 
                      mode='fit' 
                    />
                  </div>
                  <p className={'song-title'}>{artist.artistId}</p>
                  <p className={'song-title'}>{artist.artistName}</p>
                </div>
                
              ) }</div>
              
              : <h1>Loading</h1>
            }
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    artists: state.main.allArtists
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateArtistInfo(artistId) {
      dispatch(getArtistInfo(artistId));
    },
    loadArtists() {
      dispatch(getAllArtists());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsComponent);
