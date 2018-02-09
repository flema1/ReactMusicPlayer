import React, { Component } from 'react';
import * as Ionicons from 'react-icons/lib/io';

export default class SongInfo extends Component {
 render() {  
    const { song } = this.props;
                    return (
                        <div style={{height:'250px', width:'200px', backgroundColor:'white', margin: '10px' }}>
                              <img 
                                src={song.cover[0].url} 
                                style={{ width: '200px', height: '180px' }}
                              />
                              <p style={{ fontSize: '12px', lineHeight: '2px', color:'#212121'}}> {song.title}</p>
                              <p style={{ fontSize: '12px', lineHeight: '2px', color:'#616161'}}> {song.artist}</p>
                              <Ionicons.IoPlay 
                                className={"edit"}
                                width={'16px'}
                                height={'1em'} 
                                onClick={()=>this.props.onClick(song)}
                              />
                            </div>)

    }
}


