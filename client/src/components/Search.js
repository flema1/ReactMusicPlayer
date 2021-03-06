import React, { Component } from 'react';
// import logo from './logo.svg';

import SingleSong from './SingleSong';
import Sound from './Sound';

import axios from 'axios';
import * as Ionicons from 'react-icons/lib/io'


class Search extends Component {
  constructor() {
    super();
     this.state = {
         active:false,
         currentSong:null,
         streamURl:null,
         apidataLoaded:false,
        
         img:null,
         //
         value:''
         //
        
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSong = this.setSong.bind(this);
  
}

 handleChange(event) {
    this.setState({value: event.target.value});
  }

  


 activateLasers=()=>{
   console.log('lasers');
    this.props.search();

console.log('-----------------');
axios.post('/rPlayer/search', {
    song: this.state.value
  })
  .then(res => {
         console.log('back');
         console.log(res.data);
        this.setState({
        //    streamURl:res.data.data.music,
           img:res.data.data.img,
           apidataLoaded:true,
        //    songs:res.data.data.songs
        })
    //   this.audio.src= res.data;
    //   this.audio.play();
      }).catch(function (error) {''
        console.log(error);
    });

}

handleSubmit(event) {
    // alert('song submitted: ' + this.state.value);
    // this.activateLasers();
    event.preventDefault();

  }


setSong(songUrl){
//    alert("setsong");
    this.setState({
           streamURl:songUrl
        //    img:res.data.data.img,
        //    apidataLoaded:true,
        //    songs:res.data.data.songs
    })
//   alert(this.state.streamURl);
    // alert(songUrl);
    // this.forceUpdate();
}



render() {
      const dataloaded = this.state.apidataLoaded;
      let component= null;
      if (dataloaded===true){
        {console.log(this.state.streamURl)}
        component= <div><Sound streamURl={this.state.streamURl}/><div>
         {this.props.songs.map((song, index) => <SingleSong song={song} key={index} setSong={this.setSong}/>
     
         )}
         </div>

        </div>
      }else {
        component=<h1>Search</h1>
        
      }
    return (
      <div>
          <div className={'searchBar'}>
          <form onSubmit={this.handleSubmit}>
                        <label>
                            <textarea value={this.state.value} onChange={this.handleChange} 
                            /> 
                        </label>
                        <Ionicons.IoSearch
                                width={'500px'} height={'3em'} 
                                onClick={this.handleSubmit}
                            /> 
                        {/*<input outline={ 'none'} type="submit" value="Search" />*/}
                    </form>
                    
          </div>
      {/*<button onClick={()=>this.activateLasers()}>
                  Activate Lasers
      </button>*/}
      <h1>hello</h1>
      {component}
        </div>
    )}

}


const mapStateToProps = (state) => { 
  return { test: state.test, 
          playlists: state.playlists,
          songs: state.songs
   };
};

const mapDispatchToProps = (dispatch) =>{
  return {
      update() {
      dispatch(decrement());
    },
    search() {
            dispatch(getPlaylistsRedux());
    }
    
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
