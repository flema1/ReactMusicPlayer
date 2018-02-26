import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import axios from 'axios';
import * as Ionicons from 'react-icons/lib/io';
import ClickMenu from '../partials/ClickMenu';


const setTrackStreamURlRedux = (storeId,trackIndex) => {
  console.log("herere",storeId);
  return {
    type: 'SET_Track_STREAM_URL',
    storeId:storeId,
    trackIndex:trackIndex
  };
};


const setCurrCover = (coverUrl) => {
  return {
    type: 'SET_CURR_COVER',
    payload:coverUrl
  };
};

 class Playlist extends Component {
   
  onHandleClick(song){
    const { index, setSong} = this.props;
    this.props.loadTrackStreamURl(song.storeId, song.index)
    this.props.dispatchSetCurrCover(song.cover[0].url); 
  }

 render() {   
  const { apidataLoaded, songs } = this.props;
  console.log(apidataLoaded, 'apidataLoaded', songs)
  return (
              <div style={{  overflow: 'scroll', height:'300px', width: '250px'}}>
                 {apidataLoaded ? songs.map((song, index) => 
                    <div key={index} style={{ display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                        <div style={{   flex:1, flexDirection:'column', alignContent:'flex-start' }}>
                            <p style={{ fontSize:12 , lineHeight: '1px', fontWeight: 500 }}>{song.title}</p>
                            <p style={{ fontSize:12 , lineHeight: '1px', color:'#af9c9c' }}>{song.artist}</p>
                        </div>
                        <div style={{ flexDirection:'column', justifyContent:'center'}}>
                          <Ionicons.IoPlay 
                              className={"edit"}
                              width={'16px'}
                              height={'1em'} 
                              onClick={this.onHandleClick.bind(this, song)}
                          />
                        </div>
                    </div>
                 ):<h1>Search</h1>}
              </div>
            )
    }
}


const mapStateToProps = (state) => { 
  return { 
         apidataLoaded:state.main.SinglePlaylistSongsApidataLoaded,
         songs:state.main.SinglePlaylistSongs
   };
};

const mapDispatchToProps = (dispatch) =>{
  return {
    loadTrackStreamURl(storeId,trackIndex){
        dispatch(setTrackStreamURlRedux(storeId,trackIndex));
    },
    dispatchSetCurrCover(coverUrl){
           dispatch(setCurrCover(coverUrl));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
