

import React, { Component } from 'react';
import PlayButton from './Play';
import FastforwardButton from './FastforwardButton';
import BacktaceButton from './BacktaceButton';
import * as Ionicons from 'react-icons/lib/md'
import { connect } from 'react-redux'; 


const setTrackStreamURlRedux = (storeId,trackIndex) => {
  console.log("herere",storeId);
  return {
    type: 'SET_Track_STREAM_URL',
    storeId:storeId,
    trackIndex:trackIndex
  };
};


const setNextTrackRedux = (trackId) => {
  console.log("setNextTrackRedux", trackId);
  return {
    type: 'TRACK_INDEX_UPDATED',
    updatedTrackId: trackId
  };
};

const setPreviousTrackRedux = () => {
  console.log("setPreviousTrackRedux");
  return {
    type: 'PREVIOUS_TRACK_INDEX',
    updatedTrackIndex: this.props.trackIndex -1,
  };
};



class Sound extends Component {
 constructor() {
    super();
     this.state = {
         active:false,
         toggle: false
    }
}
    componentWillReceiveProps(nextProps){
        if (nextProps !== this.props && nextProps.streamURl!==null) {
        // alert(nextProps.streamURl,"change", this.props.streamURl)
            this.setState({toogle : true });
            console.log(this.props)
            return true
        }
    }

  	handlePlay() {
		this.audio.play();
        this.handleToggle();
        console.log(this.props.trackIndex);
	}
	
	handleStop() {
		this.audio.pause(); 
        this.handleToggle();
	}

    handleSkipNext() {
        let updatedTrackIndex=null;
        this.props.trackIndex===this.props.songs.length-1 ? updatedTrackIndex=0 : updatedTrackIndex=this.props.trackIndex+1;
        let updatedTrackId=this.props.songs[updatedTrackIndex].storeId;
		console.log(updatedTrackId,"Next");
        this.props.loadTrackStreamURl(updatedTrackId, updatedTrackIndex);
	}

    handleSkipPrevious() {
        let updatedTrackIndex=null;
        this.props.trackIndex===0 ? updatedTrackIndex=this.props.songs.length-1 : updatedTrackIndex=this.props.trackIndex-1;
        let updatedTrackId=this.props.songs[updatedTrackIndex].storeId;
		console.log(updatedTrackId,"previous");
        this.props.loadTrackStreamURl(updatedTrackId, updatedTrackIndex);
	}

    handleToggle=()=>{
        console.log("clicked")
        this.setState({toogle: this.state.toogle ? false : true });
    }

 
    render() {
        const {streamURl} = this.props;
        return (
            <div className={'controls'}>
                <audio
                    src={streamURl} 
                    autoPlay={true} 
                    preload="auto" 
                    ref={(audio) => { this.audio = audio }}>
                        Your browser does not support the <code>audio</code> element.
                </audio>
                <div className="f_foward_right">
                    <Ionicons.MdSkipPrevious 
                        onClick={this.handleSkipPrevious.bind(this)}
                        className={"play-button"}
                        width={'50px'} height={'3em'} />  
                </div>
                {this.state.toogle ?  
                    <Ionicons.MdPauseCircleOutline  
                        onClick={this.handleStop.bind(this)}
                        className={"play-button"}  width={'50px'} height={'3em'} />:

                    <Ionicons.MdPlayCircleOutline 
                            onClick={this.handlePlay.bind(this)}
                            className={"play-button"}
                            width={'50px'} height={'3em'}  />
                        }
                <div className="f_foward_left">
                    <Ionicons.MdSkipNext 
                        onClick={this.handleSkipNext.bind(this)}
                        className={"play-button"}
                        width={'50px'} height={'3em'}  />   
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => { 
  return { 
    streamURl: state.streamURl,
    trackIndex: state.trackIndex,
    songs:state.SinglePlaylistSongs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    skipNextTrack(trackId) {
        dispatch(setNextTrackRedux(trackId));
    },
    skipPreviousTrack() {
        dispatch(setPreviousTrackRedux());
    },
  loadTrackStreamURl(storeId,trackIndex) {
        dispatch(setTrackStreamURlRedux(storeId,trackIndex));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Sound);
