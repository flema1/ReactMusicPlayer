import React, { Component } from 'react';
import * as Ionicons from 'react-icons/lib/io'
import {Link } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'; 


const updateSearchVal = (song) => {
  //console.log(song, "song->")
  return {
    type: 'UPDATE_SEARCH_VAL',
    payload:song
  };
};

const updateSearchResults=(songs)=>{
    return {
        type:'GET_SEARCH_DATA_RECEIVED',
        payload:songs
    }
}

 class SearchBar extends Component {

    searchSong(song){
        this.props.search('');
        console.log('searchSong function-----------');
        axios.post('/rPlayer/search', {
            song: song 
        })
        .then(res => {
            console.log('searchSong res',res.data);
            this.props.updateResults(res.data.data.songs)
        }).catch(function (error) {
            console.log(error);
        });
    }

    onSearchChange(event) {
        this.props.search(event.target.value);
    }

    render() {
        const {value, handleChange, handleSubmit} = this.props;
        return (
            <div className={'searchBar'} style={{ display:'flex', flexDirection:'row'}}>
                <form >
                    <textarea style={{  borderRadius: '20px',width: '200px', paddingTop:'10px', paddingLeft: '23px'}} value={value}  onChange={this.onSearchChange.bind(this)}/>       
                    <a to={'/SearchResults'} style={{ marginLeft: '-47px', marginTop: '-37px' , color:'tomato' }}>
                        <Ionicons.IoSearch width={'60px'} height={'2em'} onClick={ this.searchSong.bind(this, this.props.searchValue)} viewBox={"0 -10 50 50"}/>
                    </a>
                </form>   
            </div>
        )}  
}





const mapStateToProps = (state) => { 
  return {   
      searchValue: state.searchValue
   };
};

const mapDispatchToProps = (dispatch) =>{
  return {
     search(title){
         dispatch(updateSearchVal(title));
    },
    updateResults(bool){
          dispatch(updateSearchResults(bool));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
