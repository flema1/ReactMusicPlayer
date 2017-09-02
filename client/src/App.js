import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PlayButton from './components/PlayButton';



class App extends Component {
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
        <div className="player_container">
            <img className="album_cover" src="http://myegy.tv/files/img/content/3/736/1495064508.500_1000.jpg"/>
           
          
             
               <PlayButton/>
           
                        
        </div>
      </div>
    );
  }
}






export default App;
