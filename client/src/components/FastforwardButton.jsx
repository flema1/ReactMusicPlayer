import React, { Component } from 'react';
import * as Ionicons from 'react-icons/lib/md'


export default class FastforwardButton extends Component {
    constructor() {
        super();
            this.state = {
                toggle: false
            }  
        }
 
    handleClick=()=>{
        console.log("clicked FF_left")
        this.setState({toogle: this.state.toogle ? false : true });
    }

    render(){
        return (
            <div className="f_foward_left">
                    <Ionicons.MdSkipNext 
        onClick={()=>this.handleClick()}
        className={"play-button"}
        width={'500px'} height={'7em'}  />   
            </div>
          
        )
    }
}
