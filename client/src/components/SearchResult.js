import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import SongInfo from './SongInfo';
import axios from 'axios';


 class View extends Component {
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
    // const {streamURl} = this.state;
    const { playListId,apidataLoaded, songs, currCover, shift, songsApidataLoaded, songsResults} = this.props;
    console.log(songsApidataLoaded, 'songsApidataLoaded---------------------', songsResults )
        return (<div className={'search-results-container'} style={{ left: shift ? '300px': 0 }}>
        {
                  songsApidataLoaded ? 
                  <div style={{ flex:1, flexWrap:'wrap', display: 'flex' , overflow:'scroll'}}>
                   { songsResults.map((song)=><SongInfo shift={shift} song={song} onClick={this.onHandleClick.bind(this, song)}/>) }
                  </div>
                  :null
                }
        </div>)
    }
}




const mapStateToProps = (state) => { 
  return { 
         playListId: state.main.playListId,
         apidataLoaded:state.main.SinglePlaylistSongsApidataLoaded,
         songs:state.main.SinglePlaylistSongs,
         currCover:state.main.currCover,
         songsApidataLoaded:state.main.songsApidataLoaded,
         songsResults: state.main.songs
   };
};

// const mapDispatchToProps = (dispatch) =>{
//   return {
//      loadPlaylistSongs(playListId) {
//             dispatch(getPlaylistSongsRedux(playListId));
//     },
//        loadTrackStreamURl(storeId,trackIndex) {
//         dispatch(setTrackStreamURlRedux(storeId,trackIndex));
//     },
//     dispatchSetCurrCover(coverUrl){
//            dispatch(setCurrCover(coverUrl));
//     }
//   }
// };

export default connect(mapStateToProps, /*mapDispatchToProps*/ null)(View);

//export default View;
