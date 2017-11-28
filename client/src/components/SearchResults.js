import React, { Component } from 'react';
import SingleSong from './SingleSong';
import Sound from './Sound';
import axios from 'axios';
import { connect } from 'react-redux'; 

const searchRedux = (title) => {
  return {
    type: 'GET_SEARCH_LIST_DATA',
    title
  };
};

 class SearchResults extends Component {
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
        this.props.search(this.props.title);

       
    }
}

handleSubmit=(event)=>event.preventDefault();
setSong=(songUrl)=>this.setState({ streamURl:songUrl })

render() {
    const { streamURl} = this.state;
    const {songs, songsApidataLoaded} = this.props;
    return (
        <div className={"results"}>
            {/*<Sound streamURl={streamURl}/>*/}
            {songsApidataLoaded ? this.props.songs.map((song, index) => <SingleSong  allPlayLists={this.props.allPlayLists} song={
                song} key={index} setSong={this.setSong}/>):<h1>Searching</h1>}
        </div>
    )}

}





const mapStateToProps = (state) => { 
  return {  test: state.test, 
            playlists: state.playlists,
            songs: state.songs,
            songsApidataLoaded:state.songsApidataLoaded
   };
};

const mapDispatchToProps = (dispatch) =>{
  return {
     
    search(title) {
            dispatch(searchRedux(title));

    }
    
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
