import React, { Component } from 'react';
import * as Ionicons from 'react-icons/lib/io';
import ClickMenu from '../partials/ClickMenu';
import { connect } from 'react-redux'; 



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


 class SongInfo extends Component {
   onHandleClick(song){
    const { index, setSong} = this.props;
    this.props.loadTrackStreamURl(song.storeId, song.index)
    this.props.dispatchSetCurrCover(song.cover[0].url); 
  }

 render() {
   const { song, shift } = this.props;
   return (<div style={{height:'250px', width:'200px', backgroundColor:'white', margin: '10px' , display:'flex', flexDirection:'column'}}>
            <img 
              src={song.cover[0].url} 
              style={{ width: '200px', height: '180px' }}
            />
            <div style={{display:'flex', flexDirection:'row', alignContent: 'space-between'}}> 
              <div style={{display:'flex', flexDirection:'column'}}> 
                <p style={{ fontSize: '12px', /*lineHeight: '2px',*/ color:'#212121'}}> {song.title}</p>
                <p style={{ fontSize: '12px', /*lineHeight: '2px', */color:'#616161'}}> {song.artist}</p>
              </div>
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
                      onClick={this.onHandleClick.bind(this, song)}
                    />
                  </div>
            </div>
          </div>)
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

export default connect(null, mapDispatchToProps)(SongInfo);



