import React, { Component } from 'react';


export default class BacktaceButton extends Component {
    constructor() {
        super();
            this.state = {
                toggle: false
            }  
        }
 
    handleClick=()=>{
        console.log("clicked FF_right")
        this.setState({toogle: this.state.toogle ? false : true });
    }

    render(){
        return (
            <div className="f_foward_right">
                        <div className="b_b_inner"></div>
                        <div className="b_b_inner"></div>
            </div>
      
        )
    }
}

            
