
import React, { Component } from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import * as Ionicons from 'react-icons/lib/io'



export default class SingleSong extends Component {
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

    this.showIcon = this.showIcon.bind(this)
    this.hideIcon = this.hideIcon.bind(this)

}

activateLasers=(storeId, setSong)=>{
   console.log('lasers');
//    axios(`/rPlayer/test`, {method: 'GET'})
//       .then(res => {
//          console.log(res.data);
//         this.setState({
//            streamURl:res.data.data.music,
//            img:res.data.data.img,
//            apidataLoaded:true,
//            songs:res.data.data.songs
//         })
//       this.audio.src= res.data;
//       this.audio.play();
//       }).catch(function (error) {
//         console.log(error);
//     });
console.log('-----------------');
axios.post('/rPlayer/song', {
    // song: this.state.value
    storeId:storeId
  })
  .then(res => {
         console.log('back');
         console.log(res.data.data);
        this.setState({
           streamURl:res.data.data,
        //    img:res.data.data.img,
        //    apidataLoaded:true
        //    songs:res.data.data.songs
    })
    // alert(res.data.data.music);
      setSong(res.data.data);

      this.audio.src= res.data;
      this.audio.play();
      }).catch(function (error) {
        console.log(error);
    });}

    showIcon=()=> {
        this.refs.edit.style.height = '15em';
    };
    hideIcon=()=> {
        this.refs.edit.style.height = '5em';
    };


render() {
    const { song, index, setSong} = this.props;
        return (
            <div className={'container'} key={index}>
                <div className={'positioner'}>
                    <h1 >{song.title}</h1>
                   
                    <img 
                        src={song.cover[0].url} 
                        width={500} 
                        height={300} 
                        mode='fit' />
                    {/*<button >
                        Activate Lasers
                    </button>*/}
                    
                    <Ionicons.IoPlay 
                        className={"edit"}
                         width={'500px'} height={'7em'} onClick={()=>this.activateLasers(song.storeId, setSong)}/> 
                    </div>
                     
            </div>

        )
}
}