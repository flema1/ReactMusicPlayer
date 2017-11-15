import React, { Component } from 'react';
import PlayButton from './Play';
import FastforwardButton from './FastforwardButton';
import BacktaceButton from './BacktaceButton';
import Sound from './Sound';




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
            const {streamURl} = this.props;
                return (
                        <div className={'controls'}>
                                <BacktaceButton/>
                                <PlayButton/>
                                <FastforwardButton/>
                                <Sound streamURl={this.state.streamURl}/>
                        </div>
                )
        }


}
