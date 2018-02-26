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
            // this.handleChange = this.handleChange.bind(this);
            // this.handleSubmit = this.handleSubmit.bind(this);
        
        }

        render() {
            const {streamURl, shift, fullScreen} = this.props;
                return (
                        // <div className={'controls-container'}>
                         <div  style={{display:'flex',
                         flexDirection:'row', justifyContent:'center'
                         }}/*style={{ paddingBottom: '40px'}}*/ >
                                {/*<BacktaceButton/>
                                <PlayButton/>
                                <FastforwardButton/>*/}
                                <Sound shift={shift}  redirectTo={this.props.redirectTo} fullScreen={fullScreen}/>
                    {/*<input 
                    id="typeinp" 
                    className={'mdl-slider mdl-js-slider'}
                    type="range" 
                    min="0" max="10" 
                    value={this.state.value} 
                    onChange={this.handleChange}
                    step="1"/>*/}
                   
                        </div>
                )
        }


}
