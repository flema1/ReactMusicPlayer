
import React, { Component } from 'react';
// import logo from './logo.svg';
import axios from 'axios';
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


class SingleSong extends Component {
  constructor() {
    super();
     this.state = {
         active:false,
         currentSong:null,
         streamURl:null,
         apidataLoaded:false,
         songs:null,
         img:null,
         //
         value:null,
         trackIndex:null

         //   
         
    }    

    this.showIcon = this.showIcon.bind(this)
    this.hideIcon = this.hideIcon.bind(this)

}


    showIcon=()=> {
        this.refs.edit.style.height = '15em';
    };
    hideIcon=()=> {
        this.refs.edit.style.height = '5em';
    };


    render() {
        const { song, index, setSong, shift } = this.props;
            return (
                <div className={'container'} key={index}>
                    <div className={"image"}> 
                        <img 
                            src={ song.cover? song.cover[0].url : song.artistImage[0].url } 
                            mode='fit' 
                        />
                        </div>
                            <h1 className={'title'}>{song.title}</h1>
                            <h1 className={'album'}>{song.album}</h1>
                            <h1 className={'durationMillis'}>{song.durationMillis}</h1>
                            <h1 className={'artist'}>{song.artist}</h1>
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
                            onClick={()=>this.props.loadTrackStreamURl(song.storeId, song.index)}
                        /> 
                    </div>
            )
    }
}


const mapDispatchToProps = (dispatch) =>{
  return {
      loadTrackStreamURl(storeId,trackIndex) {
        dispatch(setTrackStreamURlRedux(storeId,trackIndex));
    }
  }
};

export default connect(null, mapDispatchToProps)(SingleSong);
