import React, { Component } from 'react';
import SingleSong from './SingleSong';
import Sound from './Sound';
import axios from 'axios';


export default class SearchResults extends Component {
  constructor() {
    super();
     this.state = {
         currentSong:null,
         streamURl:null,
         apidataLoaded:false
    }
}

componentWillReceiveProps(nextProps){
    if (this.props.load===true){
    // alert(this.props.title)
        axios.post('/rPlayer/search', {
          song: this.props.title
        })
        .then(res => {
        // console.log(res.data);
        this.setState({
        //    streamURl:res.data.data.music,
           img:res.data.data.img,
           apidataLoaded:true,
           songs:res.data.data.songs
        })
      }).catch(function (error) {
            console.log(error);
        });
    }}

handleSubmit=(event)=>event.preventDefault();
setSong=(songUrl)=>this.setState({ streamURl:songUrl })

render() {
    const {apidataLoaded, streamURl, songs} = this.state;
    return (
        <div>
            <Sound streamURl={streamURl}/>
            {apidataLoaded ? songs.map((song, index) => <SingleSong song={song} key={index} setSong={this.setSong}/>):<h1>Searching</h1>}
        </div>
    )}

}