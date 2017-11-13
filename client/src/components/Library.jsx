import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';




class Library extends Component {
  constructor() {
    super();
    this.state = {
      apidata:null,
      apidataLoaded:false,
      active:false,
    }
    this.renderSaved = this.renderSaved.bind(this); 
    this.handleClick = this.handleClick.bind(this);
 }
 
  componentDidMount() {
     axios(`/rPlayer/songs`, {method: 'GET'})
      .then(res => {
         console.log(res.data);
        this.setState({
           apidata:res.data.data,
           apidataLoaded:true
        })
      }).catch(function (error) {
        console.log(error);
    });
  }
  handleClick(song_name){
      console.log(song_name);
    
  }

 toggleClass() {
      console.log("bob")
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

 renderSaved() {
           console.log('here')
           return this.state.apidata.map((song, index) => {
                 return (  
                        <div className="session-outer" key={index}>    
                                 <li onClick= {()=>this.props.handleClickCurrentSong(song.name)}>{song.name}</li>
                        </div>
                        );
                     })

                 }

   render() {
           return (
                 <div 
                  className={this.state.active ? "library_whole": "library_partial"} 
                  onClick={()=>this.toggleClass()} 
                 >
                      <h2>Library</h2>
                      {(this.state.apidataLoaded) ? this.renderSaved() : <p>Loading...</p>}
                 </div>
       )
   }
}

 

export default Library;