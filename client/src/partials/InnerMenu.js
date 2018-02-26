import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const addToPlaylistRedux = (songId, playListId) => {
  console.log("addToPlaylistRedux");
  return {
    type: 'SAVE_TO_PLAYLIST_ID',
    songId: songId,
    playListId: playListId
  };
};

class InnerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      top: 0,
      left: 0,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.setState({
      top: this.props.top,
      left: this.props.left
    })
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // Set the wrapper ref
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  //Alert if clicked on outside of element
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      //alert('You clicked outside of me!');
      this.props.setToNone();
    }
  }

render() {
    const {allPlayLists }=this.props;
    return <nav ref={ this.setWrapperRef} style={{
                color      : 'red',
                background : '#f5f5f5',
                top:this.state.top,
                left:this.state.left,
                position: 'absolute',
                padding:0
                }}
            >
                <ul className={'innerMenu'}>
                    <li> 
                        <div className={"dropdown"}>
                            <div className={"dropbtn"}>
                                Add to playlist
                            <div/>
                            <div className={"dropdown-content"}>
                                {  allPlayLists ? allPlayLists.map((playlist, index) => <p style={{color:'grey'}} className={"info"} onClick={()=> this.props.savePlaylistId(this.props.song.storeId, playlist.id)}> {playlist.name}</p> ) : null }
                            </div>
                            </div>
                        </div> 
                    </li>
                <li>
                    <a href="#"> 
                        <div className={"dropbtn"}>Artist</div> 
                    </a>
                </li>
            </ul>
        </nav>
    }
}

const mapStateToProps = (state) => {
  return {
    allPlayLists: state.main.playlists,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    savePlaylistId(songId, playListId) {
      dispatch(addToPlaylistRedux(songId, playListId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InnerMenu);
