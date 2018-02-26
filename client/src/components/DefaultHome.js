
import React, { Component } from 'react';

class Default extends Component {
constructor(){
    super();
  }

  render(){
    const { shift }=this.props;
    return ( 
        <div 
        style={{ position: 'relative', left: shift ? '300px': 0,  height:'90%', width:'100%', 
          display:'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center', top:'-10px',
          flex: 1, overflow:'scroll'
          }}
        > 
          <div className={'default-home-container'}>
            <div 
              className={'default-home-item'}
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
      </div>
    )
  }

}
export default Default 



