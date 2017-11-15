import React, { Component } from 'react';


export default class PlayButton extends Component {
    constructor() {
        super();
            this.state = {
                toggle: false
            }  
        }
 
    handleClick=()=>{
        console.log("clicked")
        this.setState({toogle: this.state.toogle ? false : true });
    }

    render(){
        return (
            <div className="play_button" onClick= {()=>this.handleClick()}>
                <div className= { this.state.toogle ? "pause_icon": "play_icon"}></div>
            </div>
        )
    }
}


