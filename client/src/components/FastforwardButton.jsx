import React, { Component } from 'react';


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
                <div className="f_foward_inner"></div>
                <div className="f_foward_inner"></div>
            </div>
          
        )
    }
}
