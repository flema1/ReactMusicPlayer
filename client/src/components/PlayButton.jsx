import React, { Component } from 'react';

import soundFile from  '../songs/One_More_Light.mp4';
import LG from  '../songs/LoveGalore.mp4';
 
import FastforwardButton from '../components/FastforwardButton';
import BacktaceButton from '../components/BacktaceButton';
import axios from 'axios';


//


var itunes = require('itunes-library-stream')
var userhome = require('userhome')
var path = require('path')
var fs = require('fs')

var dir = require('node-dir');

class PlayButton extends Component {
  constructor() {
    super();
    this.state = {
         playing: false,
         songs:null,
         current: null,
         currSong:null,
         currentSong:null
        
    }
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleForwardClick= this.handleForwardClick.bind(this);
    // this.audio = new Audio();
    this.handleClick = this.handleClick.bind(this);
    this.loadPlaylist =this.loadPlaylist.bind(this); 
    this.getcurrentSongIndex=this.getcurrentSongIndex.bind(this);
    this.handleClickPlayList = this.handleClickPlayList.bind(this);
    this.handleClickCurrentSong =this.handleClickCurrentSong.bind(this);
    
 }
 
get(){
      console.log ('getting'); 
      var temp='bob';
      axios.get('/rPlayer/songs')
            .then(res => {
                  //console.log(res.data)
                  //console.log(res.data.data)
                  var songTitles = res.data.data.map((song)=>{
                        //console.log("x= "+ obj.name)
                        return song.name
                })

                  this.setState({
                      songs:songTitles
                  })

                  console.log ("songs songs "+songTitles)
            }).catch(err =>{console.log(err.response)
        });              
 }

loadPlaylist(){
      this.get(); 
      var title="One_More_Light";
      //var title="LoveGalore";
      //var title= this.state.songs[0];

      this.setState({
          current:`http://127.0.0.1:1337/?song=${title}`
        })

      this.audio=new Audio(this.state.current);
      console.log(this.audio);
      console.log (this.state.current +"SONG");
      //console.log (this.state.songs[0])
  }

  handleBackClick(){
      console.log("back");
      console.log(this.getcurrentSongIndex + "back");
      console.log(this.state.current);
      this.setState({
        //current:`http://127.0.0.1:1337/?song=${this.state.songs[this.getcurrentSongIndex()-1]}`,
        currSong: this.state.songs[this.getcurrentSongIndex()-1]
      })
      // console.log("currSong1"+ this.state.songs[this.getcurrentSongIndex()-1])
      // console.log("currSong "+ this.state.currSong);
      console.log(this.state.current);
      console.log(this.state.currSong);
      this.audio.src= this.state.current;
      this.audio.play();
  }

  handleForwardClick(){
      console.log("forward");
     
      this.setState({
        current:`http://127.0.0.1:1337/?song=${this.state.songs[this.getcurrentSongIndex()+1]}`,
        currSong: this.state.songs[this.getcurrentSongIndex()+1]
      })
      console.log(this.getcurrentSongIndex + "forward");
      console.log(this.state.current);
      console.log(this.state.currSong);

      this.audio.src= this.state.current;
      this.audio.play();
  }

  getcurrentSongIndex(){
      let currIndex= this.state.songs.indexOf(this.state.current);
      return currIndex;
  }

  handleClick(){
      console.log("clicked")

      console.log (this.audio);
     
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
  renderAudioTag(){
   return <audio id="music" src={this.state.current} />
   
  }

handleClickPlayList(title){
console.log(title);
 this.setState({
        current:`http://127.0.0.1:1337/?song=${title}`,
        currSong:title
      })

      this.audio.src= this.state.current;
      console.log("playing "+ this.audio.src);
      this.audio.play();
}


renderPlayList(){
 if (this.state.songs){
    return    <div className="playslist_container">
   
{this.state.songs.map((song) => {
                    return (<div>
                              <li onClick= {()=>this.handleClickPlayList(song)}>{song}</li>
                            </div>)
                  })}
  </div>
 }
}

handleClickCurrentSong(song_name){
     this.setState({
        currentSong: song_name
  
      })
}


   render() {
    return (
         <div className="contols">
        {this.renderPlayList()}
                  {this.renderAudioTag()};
            <div className="loadPlaylist" onClick= {()=>this.loadPlaylist()}>
                        Load Playlist </div>
       {/*<div>   <img src={LinkinPark} className="App-logo" alt="logo" />*/}
                 {/*<BacktaceButton onClick= {()=>this.handleBackClick()}/>*/}

                   <div onClick= {()=>this.handleBackClick()}>
        <div className="f_foward_right">
                        <div className="b_b_inner">
                           </div>
                           <div className="b_b_inner">
                         </div>
                    </div>
            </div>

                <div className="play_button" onClick= {()=>this.handleClick()}>
                        { this.renderPlayButton()}
                
                  
                        </div>
                         {/*<FastforwardButton onClick= {()=>this.handleForwardClick()}/>*/}
                            <div className="f_foward_left" onClick= {()=>this.handleForwardClick()}>
                        <div className="f_foward_inner">
                           </div>
                           <div className="f_foward_inner">
                         </div>
                    </div>
                       
            </div>
    )
  }

}


export default PlayButton;
