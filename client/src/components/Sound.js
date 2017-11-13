

import React, { Component } from 'react';



export default class Sound extends Component {

 constructor() {
    super();
     this.state = {
         active:false,
         currentSong:null,
         streamURl:null,
         apidataLoaded:false,
         songs:null,
         img:null,
         //
         value:null
         //
        
    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  
}
 componentWillReceiveProps(nextProps){
      if (nextProps !== this.props) {
        // alert(nextProps.streamURl,"change", this.props.streamURl)
        this.setState({currentSong: nextProps.streamURl})
        // alert(this.state.streamURl)
        return true

    }
    
  }

render() {
     const {streamURl} = this.props;
    return (
        <div>
         <audio
          src={streamURl}
          autoPlay
          controls>
          Your browser does not support the <code>audio</code> element.
        </audio>
        </div>

    )
}


}
