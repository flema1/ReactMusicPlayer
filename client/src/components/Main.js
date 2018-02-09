import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import Controls from './Controls';
import SongInfo from './SongInfo';
import axios from 'axios';
import * as Ionicons from 'react-icons/lib/io';


const setTrackStreamURlRedux = (storeId,trackIndex) => {
  console.log("herere",storeId);
  return {
    type: 'SET_Track_STREAM_URL',
    storeId:storeId,
    trackIndex:trackIndex
  };
};


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


 class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
         streamURl:null,
    }
  }


  onHandleClick(song){
    const { /*song, */index, setSong} = this.props;
    this.props.loadTrackStreamURl(song.storeId, song.index)
    this.props.dispatchSetCurrCover(song.cover[0].url);
  }
  
 render() {   
    const {streamURl} = this.state;
    const { playListId,apidataLoaded, songs, currCover, shift, songsApidataLoaded, songsResults} = this.props;
    console.log(songsApidataLoaded, 'songsApidataLoaded---------------------', songsResults )
        return (
             <div 
                style={{  
                    backgroundImage: `url(${currCover})`,
                    overflow: 'hidden',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    left: shift ? '300px': 0, position:'fixed', height:'100%', width: shift? '70%':'100%', backgroundColor:'#4c4b63',
                    display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems: 'center', top:'-10px'}}
            > 
                {
                  currCover ?
                            <div>
                              <img src={currCover}  resizeMode="contain"  className={'mainCover'}  style={{  flex: 1, width: null, height: null}} />
                              <Controls/>
                            </div>:null
                }
                {
                  songsApidataLoaded ? 
                  <div style={{ flex:1, flexWrap:'wrap', display: 'flex' , overflow:'scroll'}}>
                   { songsResults.map((song)=><SongInfo song={song} onClick={this.onHandleClick.bind(this, song)}/>) }
                  </div>
                  :null
                }
        </div>
            )
    }
}




const mapStateToProps = (state) => { 
  return { 
         playListId: state.playListId,
         apidataLoaded:state.SinglePlaylistSongsApidataLoaded,
         songs:state.SinglePlaylistSongs,
         currCover:state.currCover,
         songsApidataLoaded:state.songsApidataLoaded,
         songsResults: state.songs
   };
};

const mapDispatchToProps = (dispatch) =>{
  return {
     loadPlaylistSongs(playListId) {
            dispatch(getPlaylistSongsRedux(playListId));
    },
       loadTrackStreamURl(storeId,trackIndex) {
        dispatch(setTrackStreamURlRedux(storeId,trackIndex));
    },
    dispatchSetCurrCover(coverUrl){
           dispatch(setCurrCover(coverUrl));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
