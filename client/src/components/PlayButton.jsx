import React, { Component } from 'react';

import soundFile from  '../songs/One_More_Light.mp4';
import LG from  '../songs/LoveGalore.mp4';


import FastforwardButton from '../components/FastforwardButton'
import BacktaceButton from '../components/BacktaceButton'

class PlayButton extends Component {
  constructor() {
    super();
    this.state = {
         playing: false,
        //  songs=[soundFile, LG]
    }
    this.audio = new Audio(LG);
    this.handleClick = this.handleClick.bind(this);
    this.handleBackClick= this.this.handleBackClick.bind(this);
    this.handleForwardClick= this.this.handleForwardClick.bind(this);
 }
 
 
  handleBackClick(){
    console.log("back");
  }
  handleForwardClick(){
    console.log("forward");
  }
  handleClick(){
      console.log("clicked")
      console.log(this.state.playing)
       if (this.state.playing===false){
          this.setState({
               playing: true
          });
        this.audio.play();
      }
      else {
           this.setState({
               playing: false
          });
          this.audio.pause();
      }   
  }

   renderPlayButton(){
       if (this.state.playing===true){
            return(
                    <div className="play_icon">
                        </div>
                   
            )
       }
       else{
           return(
            <div className="pause_icon">
            
                </div>
           )
       }
     
  }

   render() {
    return (
         <div className="contols">
       {/*<div>   <img src={LinkinPark} className="App-logo" alt="logo" />*/}
                 <BacktaceButton onClick= {()=>this.handleBackClick()}/>
                <div className="play_button" onClick= {()=>this.handleClick()}>
                        { this.renderPlayButton()}
                        <audio id="music" src={LG} />
                   <FastforwardButton onClick= {()=>this.handleForwardClick()}/>
                        </div>
            </div>
    )
  }

}


export default PlayButton;
