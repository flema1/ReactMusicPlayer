import React, { Component } from 'react';
import SingleSong from './SingleSong';
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
}

class AllSongs extends Component {

constructor(){
    super();
    this.state={
        songsApidataLoaded:false,
        songs:[]
    }
   
  }
   componentWillMount(){         
     axios.get('/rPlayer/favorites')
    .then((res) => {
      console.log(res, 'Favs************************')
      this.setState({ 
          songsApidataLoaded:true,
          songs:res.data.data.track
      })
    })
    .catch((err) => {
      console.log(err, 'err, fE, regis')
    })
  }

  onLoadtrack(song){
     this.props.loadTrackStreamURl(song.storeId, song.index)
     this.props.dispatchSetCurrCover(song.artistImage[0].url); 
    //  this.props.redirectTo('HOME');
  }

  render() {
    console.log(this.state.songs, "songs ", this.state.songsApidataLoaded )
    const { shift }= this.props;
    console.log('shift 12', shift)
    return ( 
          <div className={'favorites-container'}
             style={{ position: 'relative', left: shift ? '300px': 0}}
          >
            {
              this.state.songsApidataLoaded ? 
              
            <div style={{ flex:1, flexWrap:'wrap', display: 'flex' , overflow:'scroll', paddingTop: '5%'}}  >{
              this.state.songs.map((song, index) =>
                <div className={'song-container'} style={{padding:'10px'}} key={index}>
                  <div className={"song-image"}> 
                    <img 
                      src={ song.cover? song.cover[0].url : song.artistImage[0].url } 
                      mode='fit' 
                    />
                  </div>
                  <p className={'fav-song-title'}>{song.title}</p>
                  {/*<p className={'fav-song-album'}>{song.album}</p>
                  <p className={'fav-song-durationMillis'}>{song.durationMillis}</p>*/}
                  <p className={'fav-song-artist'}>{song.artist}</p>
                  <div className={'fav-song-buttons'}>
                    <ClickMenu   
                      className={'clickmenu'} 
                      song={this.props.song} 
                      allPlayLists={this.props.allPlayLists}
                      shift={ shift }
                    />
                    <Ionicons.IoPlay 
                      className={"edit"}
                      width={'30px'}
                      height={'2em'} 
                      onClick={this.onLoadtrack.bind(this, song)}
                    />
                  </div>
               
              </div> ) 
                 }</div>
              :null 
            }
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

export default connect(/*mapStateToProps*/ null, mapDispatchToProps)(AllSongs);
