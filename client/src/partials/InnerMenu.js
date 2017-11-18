import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import axios from 'axios';



const addToPlaylistRedux = (songId,playListId) => {
  console.log("addToPlaylistRedux");
  return {
    type: 'SAVE_TO_PLAYLIST_ID',
    songId:songId,
    playListId:playListId
  };
};

class InnerMenu extends Component {
constructor(props) {
        super(props);
        this.state = {
          mounted:false,
          top:0,
          left:0,
      }
                  
       
    }
    
   
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
         this.setState({ top:this.props.top,
         left:this.props.left })
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        //alert("fone");
    }

    
    // Set the wrapper ref
    setWrapperRef=(node)=> {
        this.wrapperRef = node;
    }

    
     //Alert if clicked on outside of element
    handleClickOutside=(event)=>{
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            //alert('You clicked outside of me!');
            this.props.setToNone();

        }
    }

render() {
  return <nav  ref={ this.setWrapperRef} style={{
      color      : 'red',
      background : 'green',
      top:this.state.top,
      left:this.state.left,
      position: 'absolute'
    }}>
  
          <ul className={'innerMenu'}>
                <li> 
                    <div className={"dropdown"}>
                    <div className={"dropbtn"}>Add to playlist<div/>
                    <div className={"dropdown-content"}>
                           { this.props.allPlayLists ? this.props.allPlayLists.map((playlist, index) => <h1
                         className={"info"}
                         onClick={()=> this.props.savePlaylistId(this.props.song.storeId, playlist.id)}
                           >{playlist.name}</h1>):null}
                    </div>
                    </div>
                    </div> 
                </li>
             <li><a href="#">Link 1</a></li>
         </ul>
       </nav>

}
}

const mapStateToProps = (state) => { 
  return {  
            allPlayLists: state.playlists,
   };
};


const mapDispatchToProps = (dispatch) => {
  return {

    savePlaylistId(songId,playListId) {
        dispatch(addToPlaylistRedux(songId,playListId));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(InnerMenu);
