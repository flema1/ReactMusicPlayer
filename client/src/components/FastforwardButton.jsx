import React, { Component } from 'react';


class FastforwardButton extends Component {
  constructor() {
    super();
    this.state = {
         playing: false,
    }
  
    this.handleClick = this.handleClick.bind(this);
 }
 
 
 
  handleClick(){
      console.log("clicked")
      console.log(this.state.playing)
       if (this.state.playing===false){
          this.setState({
               playing: true
          });
        this.audio.play();
      }
      else {
           this.setState({
               playing: false
          });
          this.audio.pause();
      }   
  }

   
            

   render() {
    return (
        <div>
        <div className="f_foward_left">
                        <div className="f_foward_inner">
                           </div>
                           <div className="f_foward_inner">
                         </div>
                    </div>
            </div>
    )
  }

}


export default FastforwardButton;
