import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PlayButton from './components/PlayButton';
import Library from './components/Library';
import axios from 'axios';

class Test extends Component {
  constructor() {
    super();
     this.state = {
         active:false,
         currentSong:null,
         streamURl:null,
         apidataLoaded:false,
         songs:null,
         img:null
        
    }
  
}


 activateLasers=()=>{
   console.log('lasers');
   axios(`/rPlayer/test`, {method: 'GET'})
      .then(res => {
         console.log(res.data);
        this.setState({
           streamURl:res.data.data.music,
           img:res.data.data.img,
           apidataLoaded:true,
           songs:res.data.data.songs
        })
      this.audio.src= res.data;
      this.audio.play();
      }).catch(function (error) {
        console.log(error);
    });}


render() {
      const dataloaded = this.state.apidataLoaded;
      let component= null;
      if (dataloaded===true){
        {console.log(this.state.streamURl)}
        component= <div><audio
          src={this.state.streamURl}
          autoPlay
          controls>
          Your browser does not support the <code>audio</code> element.
        </audio>
        {/*<img         source={'https://vetstreet.brightspotcdn.com/dims4/default/a1a90c7/2147483647/thumbnail/180x180/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F0d%2Ff2e4c0b3a611e092fe0050568d634f%2Ffile%2Fhub-cats-senior.jpg'}
        />*/}
        <img src={this.state.img} width={500} height={300} mode='fit' />
         {this.state.songs.map((song, index) => <div key={index}>
                                                    <h1 >{song.titl}</h1>
                                                    <img src={song.cover[0].url} width={500} height={300} mode='fit' />
                                                </div>
         )}

        </div>
      }else {
        component=<h1>hi</h1>
      }
    return (
      <div>
      <button onClick={()=>this.activateLasers()}>
                  Activate Lasers
      </button>
      {component}
        </div>
    )}

}


class App extends Component {
  constructor() {
    super();
     this.state = {
         active:false,
         currentSong:null,
         streamURl:null,
         apidataLoaded:false
        
    }
    
 
       this.handleClickCurrentSong =this.handleClickCurrentSong.bind(this);
       this.handleClickActive =this.handleClickActive.bind(this); 
}

 handleClickCurrentSong(song_name){
     this.setState({
        currentSong: song_name
  
      })
 }

 handleClickActive(ActiveNotActive){
     this.setState({
        active:ActiveNotActive
      })
 }

 activateLasers=()=>{
   console.log('lasers');
   axios(`/rPlayer/test`, {method: 'GET'})
      .then(res => {
         console.log(res.data);
        this.setState({
           streamURl:res.data,
           apidataLoaded:true
        })
      this.audio.src= res.data;
      this.audio.play();
      }).catch(function (error) {
        console.log(error);
    });

    
 }
  render() {
    return (
      <div className="App">
        <div >
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<h2>Welcome to React</h2>*/}
        </div>
        <p className="App-intro">
          {/*<h1>React MusicPlayer</h1>*/}
        </p>
        {/*<div className="player_container">
            <img className="album_cover" src="http://myegy.tv/files/img/content/3/736/1495064508.500_1000.jpg"/>
           
          
             
               <PlayButton/>
           
                        
        </div>*/}
        <div className="main">
        <Library className="library" 
          handleClickCurrentSong={this.handleClickCurrentSong}
          handleClickActive={this.handleClickActive}
          />
        <PlayButton className="play"/>
        <audio id="beep" loop>
         <source src={this.state.streamURl} type="audio/wav" />
         
      </audio>
       <button onClick={()=>this.activateLasers()}>
                  Activate Lasers
        </button>
        

        
        }

        <Test/>
        </div>
      </div>
    );
  }
}






export default App;
