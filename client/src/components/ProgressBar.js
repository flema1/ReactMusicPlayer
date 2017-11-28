
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ProgressBar extends Component {
 constructor() {
    super();
     this.state = {
         active:false,
         toggle: false,
         x:800
    }
}

 componentDidUpdate= (props, state) =>{
    // if (this.state.dragging && !state.dragging) {
    //   document.addEventListener('mousemove', this.onMouseMove)
    //   document.addEventListener('mouseup', this.onMouseUp)
    // } else if (!this.state.dragging && state.dragging) {
    //   document.removeEventListener('mousemove', this.onMouseMove)
    //   document.removeEventListener('mouseup', this.onMouseUp)
    // }
  }


//  getDefaultProps=()=>{
//     return {
//       // allow the initial position to be passed in as a prop
//       initialPos: {x: 0, y: 0}
//     }
//   }

//   getInitialState= ()=> {
//     return {
//       pos: this.props.initialPos,
//       dragging: false,
//       rel: null // position relative to the cursor
//     }
//   }

// // calculate relative position to the mouse and set dragging=true
//   onMouseDown= (e) =>{
//     // only left mouse button
//     if (e.button !== 0) return
//     // var pos = $(this.getDOMNode()).offset()
// var pos = ReactDOM.findDOMNode(this).getBoundingClientRect();
// //console.log(pos);

//     this.setState({
//       dragging: true,
//       rel: {
//         x: e.pageX - pos.left,
//         y: e.pageY - pos.top
//       }
//     })
//     e.stopPropagation()
//     e.preventDefault()
//   }
//   onMouseUp=(e)=>{
//     this.setState({dragging: false})
//     e.stopPropagation()
//     e.preventDefault()
//   }

//   onMouseMove= (e)=> {
//     if (!this.state.dragging) return
//     this.setState({
//       pos: {
//         x: e.pageX - this.state.rel.x,
//         y: e.pageY - this.state.rel.y
//       }
//     })
//     e.stopPropagation()
//     e.preventDefault()
//   }

 _onMouseMove(e) {
   console.log(e.screenX);
    this.setState({ x: e.screenX });
    console.log(this.state.x);
  }

render() {
    return (
          <div>
              <div id="audio-player-container"  onClick={this._onMouseMove.bind(this) } onMouseDown={this.onMouseDown}>
                <div  className={"audio-progress"} id="audio-progress">
                  <div id="draggable-point" style={{left:this.state.x-515,position:'absolute'}}  
                  
                    className={"draggable ui-widget-content"}>
                    <div id="audio-progress-handle"></div>
                    </div>
                    <div id="audio-progress-bar"  className={"bar"} style={{width: ((this.state.x-800))}}>
                    </div>
                  </div>
                </div>
                <div id="posX"></div>
          </div>  
                )
        }


}


