import React, { Component } from 'react';
import * as Ionicons from 'react-icons/lib/md'


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
        this.state.toogle ? <Ionicons.MdPauseCircleOutline  
        onClick={()=>this.handleClick()}
        className={"play-button"}  width={'500px'} height={'7em'} /> : <Ionicons.MdPlayCircleOutline 
        onClick={()=>this.handleClick()}
        className={"play-button"}
        width={'500px'} height={'7em'}  />  
        )
    }
}


