import React, { Component } from 'react';

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

  this.setState({ top: e.screenY, left: e.screenX, visibile: true},
  ()=>{console.log(this.state.visibile)}
  );
  
}
setToNone=()=>{
    this.setState({ visibile: false },
    console.log(this.state.visibile));

}

  render() {
    const {handleChange, handleSubmit} = this.props;
    return (
      <div display={'relative'}>
          <Ionicons.IoAndroidMoreVertical
                className={'hi'} 
                onContextMenu={this.handleClick}
                className={"edit"}
                width={'500px'} 
                height={'7em'} />
          {this.state.visibile? <InnerMenu 
          left ={this.state.left-40} top={this.state.top-200} 
          song={this.props.song}
         
          setToNone={this.setToNone}/>:null} 
    </div>
    );
  };
}

