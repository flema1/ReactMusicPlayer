import React, { Component } from 'react';
import PlayButton from './Play';
import FastforwardButton from './FastforwardButton';
import BacktaceButton from './BacktaceButton';
import Sound from './Sound';
import * as Ionicons from 'react-icons/lib/md'

export default class Controls extends Component {
        constructor() {
                super();
                this.state = {
                    active:false,
                    currentSong:null,
                    streamURl:null,
                    apidataLoaded:false,
                    songs:null,
                    img:null,
                    value:null    
                }
        }

        render() {
            const {streamURl} = this.props;
                return (
                        <div className={'controls'}>
                            <Ionicons.MdSkipPrevious  className={"edit"}
                         width={'500px'} height={'7em'}  /> 
                            <Ionicons.MdPlayCircleOutline width={'500px'} height={'3em'} /> <br/>
                            <Ionicons.MdSkipNext  width={'500px'} height={'3em'}/> <br/>
<Ionicons.IoPlay 
                      
                        className={"edit"}
                         width={'500px'} height={'7em'} onClick={()=>this.getSong(song.storeId, setSong)}/>
                          <Sound />
                    </div>


                               
                     
                )
        }


}
