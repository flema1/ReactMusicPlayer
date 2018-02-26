import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import PlayButton from './Play';
import ProgressBar from './ProgressBar';
import FastforwardButton from './FastforwardButton';
import BacktaceButton from './BacktaceButton';
import * as Ionicons from 'react-icons/lib/md'
import {
  connect
} from 'react-redux';


const setTrackStreamURlRedux = (storeId, trackIndex) => {
  console.log("herere", storeId);
  return {
    type: 'SET_Track_STREAM_URL',
    storeId: storeId,
    trackIndex: trackIndex
  };
};

const setCurrCover = (coverUrl) => {
  return {
    type: 'SET_CURR_COVER',
    payload: coverUrl
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
    updatedTrackIndex: this.props.trackIndex - 1,
  };
};



class Sound extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      toggle: false,
      barPosition: 0,
      button: 0,
      duration: null,
      volume: null,
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props && nextProps.streamURl !== null) {
      // alert(nextProps.streamURl,"change", this.props.streamURl)
      this.setState({
        toogle: true,
        button: 0
      });
       if (this.audio.currentTime){
      this.audio.addEventListener("timeupdate", () => {

       
           this.setState({
          barPosition: (this.audio.currentTime / this.audio.duration) * 100,
          duration: this.audio.duration,
          button: this.state.barPosition * 5
        });
        
       
        // console.log(this.state.barPosition*5,"barPosition");
      });
       }
      return true
    }
  }

  _onMouseMove(e) {
    var width = ReactDOM.findDOMNode(this).getBoundingClientRect();
    console.log(width, "width");
    console.log(e.nativeEvent.offsetX / 500, "screenX", e.pageX);
    this.setState({
      button: e.nativeEvent.offsetX
    });
    //console.log(this.state.button, "button");
    this.audio.currentTime = e.nativeEvent.offsetX / 500 * this.state.duration;
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
    let updatedTrackIndex = null;
    this.props.trackIndex === this.props.songs.length - 1 ? updatedTrackIndex = 0 : updatedTrackIndex = this.props.trackIndex + 1;
    let updatedTrackId = this.props.songs[updatedTrackIndex].storeId;
    console.log(updatedTrackId, "Next");
    this.props.dispatchSetCurrCover(this.props.songs[updatedTrackIndex].cover[0].url);
    this.props.loadTrackStreamURl(updatedTrackId, updatedTrackIndex);
  }

  handleSkipPrevious() {
    let updatedTrackIndex = null;
    this.props.trackIndex === 0 ? updatedTrackIndex = this.props.songs.length - 1 : updatedTrackIndex = this.props.trackIndex - 1;
    let updatedTrackId = this.props.songs[updatedTrackIndex].storeId;
    console.log(updatedTrackId, "previous");
    this.props.dispatchSetCurrCover(this.props.songs[updatedTrackIndex].cover[0].url);
    this.props.loadTrackStreamURl(updatedTrackId, updatedTrackIndex);
  }

  handleToggle = () => {
    console.log("clicked")
    this.setState({
      toogle: this.state.toogle ? false : true
    });
  }

  handleChange = (event) => {
    this.setState({
      volume: event.target.value
    });
    console.log(event.target.value);
    this.audio.volume = event.target.value / 100;
  }


  renderPlayIcon() {
      if (this.state.toogle) {
        return ( < Ionicons.MdPauseCircleFilled onClick = {
            this.handleStop.bind(this)
          }
           fill={ this.props.streamURl? '#ff7675': '#cdcdcd' }
          className = {
            "play-button"
          }
          width = {
            '200px'
          }
          height = {
            '4em'
          }
          />)
        }
        return ( < Ionicons.MdPlayCircleFilled onClick = {
            this.handlePlay.bind(this)
          }
           fill={ this.props.streamURl? '#ff7675': '#cdcdcd' }
          className = {
            "play-button"
          }
          width = {
            '200px'
          }
          height = {
            '4em'
          }
          />)
        }


        render() {
          const { streamURl, shift, fullScreen} = this.props;
          console.log(shift, 'sound')
            console.log(fullScreen, 'fullScreen')
          return ( 
          <div >
            <audio 
              src = {streamURl } 
              autoPlay = {true} 
              preload = "auto" 
              ref = { (audio) => { this.audio = audio}} 
            >
              Your browser does not support the < code > audio </code> element. 
            </audio> 
            <div style = {{ left: shift ? '300px': 0,/* width: shift? '70%':'100%', */
            position: 'relative',
            display: 'flex', flexDirection: 'row', background: 'red', justifyContent: 'center',/*margin:'-50px'*/ backgroundColor: 'rgba(0,0,0,0)'}} >
              <div className = "f_foward_right" >
                <Ionicons.MdSkipPrevious 
                  onClick = { this.handleSkipPrevious.bind(this)}
                  fill={ streamURl? '#ff7675': '#cdcdcd' }
                  className = { "play-button"}
                  width = {'50px'}
                  height = {'3em'}
                />   
              </div> { this.renderPlayIcon() } 
              <div className = "f_foward_left" >
                <Ionicons.MdSkipNext onClick = { this.handleSkipNext.bind(this) }
                  className = { "play-button" }
                  fill={ streamURl? '#ff7675': '#cdcdcd' }
                  width = { '50px' }
                  height = { '3em'}
                />    
              </div> 
               <p style={{ display: fullScreen ? 'none' : 'flex' }} onClick={ ()=>this.props.redirectTo('HOME')}>fullscreen</p>
            </div>  
            </div>
          )
        }
      }


      const mapStateToProps = (state) => {
        return {
          streamURl: state.main.streamURl,
          trackIndex: state.main.trackIndex,
          songs: state.main.SinglePlaylistSongs
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
          loadTrackStreamURl(storeId, trackIndex) {
            dispatch(setTrackStreamURlRedux(storeId, trackIndex));
          },
          dispatchSetCurrCover(coverUrl) {
            dispatch(setCurrCover(coverUrl));
          }
        }
      };

      export default connect(mapStateToProps, mapDispatchToProps)(Sound);
