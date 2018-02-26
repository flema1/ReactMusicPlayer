import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import InnerMenu from './InnerMenu'
import * as Ionicons from 'react-icons/lib/io'

export default class ClickMenu extends Component {
    constructor() {
      super();
      this.state = {
          load:false,
          top:0,
          left:0,
          visibile:false
      }
    }

  handleClick=(e)=>{
  e.preventDefault()

  this.setState({ top: e.clientY, left: e.clientX, visibile: true},
  ()=>{console.log(this.state.visibile)}
  );
  
}
setToNone=()=>{
    this.setState({ visibile: false },
    console.log(this.state.visibile));

}

  render() {
    const {handleChange, handleSubmit, shift, song} = this.props;
   
    return (
      <div className="click-menu"  style={{backgroundColor:"#f5f5f5"}}>
          <Ionicons.IoAndroidMoreVertical
                onContextMenu={this.handleClick}
                className={"edit"}
                width={'50px'} 
                height={'2em'} />
          {this.state.visibile? <InnerMenu 
          left ={shift ? this.state.left-295 : this.state.left-5 } top={this.state.top} 
          song={song}
         
          setToNone={this.setToNone}/>:null} 
    </div>
    );
  };
}

