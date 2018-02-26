import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import * as Ionicons from 'react-icons/lib/io';
import axios from 'axios';

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
}

class Library extends Component {
  constructor() {
    super();
    this.state={
            songsApidataLoaded:false,
            songs:[],
        }
    }
  
  componentWillMount() {
    axios.get('/rPlayer/getAllTracks')
      .then((res) => {
        console.log(res, 'getAllTracks response')
         this.setState({ 
          songsApidataLoaded:true,
          songs:res.data.data
        })
      })
      .catch((err) => {
        console.log(err, 'getAllTracks err')
      })
  }
   

  onLoadtrack(song){
    this.props.loadTrackStreamURl(song.storeId, song.index)
    this.props.dispatchSetCurrCover(song.albumArtRef[0].url); 
    // this.props.redirectTo('HOME');
  }

  render() {
    const { shift }=this.props;
    return ( 
      <div style={{ position: 'relative', left: shift ? '300px': 0 , height:'90%', overflow: 'scroll',width: "100%"}}> 
          {this.state.songsApidataLoaded ? this.state.songs.map((song, index) => 
          <div>
            <p>{ song.title}</p>
            <p>{ song.artist}</p>
            <p>{ song.album}</p>
            <p>{ song.genre}</p>
            <div className={"song-image"}> 
              <img 
                src={ song.albumArtRef ? song.albumArtRef[0].url : null } 
                mode='fit' 
              />
              <Ionicons.IoPlay 
                className={"edit"}
                width={'30px'} height={'2em'} onClick={this.onLoadtrack.bind(this, song)}/>
              </div>
          </div>) : "loading" }
      </div>  
    )
  }
}


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

export default connect(/*mapStateToProps*/ null, mapDispatchToProps)(Library);

