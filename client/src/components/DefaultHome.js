
import React, { Component } from 'react';

class Default extends Component {


constructor(){
    super();
   
  }

  render(){
    return ( 
       <div className={'default-home-container'}>
        <div 
          className={'default-home-item'}
          onClick={()=>this.props.redirectTo('PLAYLISTS')}
          >
          <p>Playlists</p>
        </div>
        <div 
          className={'default-home-item'}
           onClick={()=>this.props.redirectTo('ALL_SONGS')}
          >
          <p>All songs</p>
        </div>
        <div 
          className={'default-home-item'}
          onClick={()=>this.props.redirectTo('FAVORITES')}
          >
          <p>Favorites</p>  
        </div>
        <div 
          className={'default-home-item'}
          onClick={()=>this.props.redirectTo('ARTISTS')}
          >
          <p>Artists</p>
        </div>
       </div>
    )
  }

}
export default Default 



