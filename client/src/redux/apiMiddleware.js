import axios from 'axios';

export const apiMiddleware = store => next => action => {
    // Pass all actions through by default
    next(action)
    switch (action.type) {
    

   
    case 'NEXT_TRACK_INDEX':
    console.log(store.state,"SinglePlaylistSongs")
    break;

    case 'SET_Track_STREAM_URL':
        console.log('-----------------',action.storeId);
        axios.post('/rPlayer/song', {
            storeId:action.storeId
        })
        .then(res => {
                console.log('back');
                console.log(res.data.data);
        return next({
                        type: 'Track_STREAM_URL_RECIEVED',
                        streamURl:res.data.data,
                        trackIndex: action.trackIndex
                    })
      }).catch(function (error) {
        console.log(error);
    });

    break;

    
    case 'SAVE_TO_PLAYLIST_ID':
        console.log('SAVE_TO_PLAYLIST_ID',action.songId,action.playListId);
        axios.post('/rPlayer/addToPlaylist', {
            songId: action.songId,
            playlistID:action.playListId
        })
            .then(res => {
                          console.log('back');
                          console.log(res.data);
                            // return next({
                            // type: 'GET_SEARCH_DATA_RECEIVED',
                            // data:res.data.data.songs
                            // })
                        }).catch( (error)=> {
                            console.log(error);
                        });
    break;
    
    case 'GET_PLAYLIST_LIST_DATA':
        console.log("GET_PLAYLIST_LIST_DATA");
        axios('/rPlayer/playlists', {method: 'GET'})
            .then(res => {
                console.log(res.data.data);
                return next({
                              type: 'GET_PLAYLISTS_DATA_RECEIVED',
                              data:res.data.data
                            })
                    }).catch((error)=>{
                            console.log(error);
                        });
    break;

    case 'GET_PLAYLIST_SONGS_DATA':
        console.log("GET_PLAYLIST_SONGS_DATA");
        axios.post('/rPlayer/loadPlaylist', {
            playlistId: action.playListId
        }).then(res => {
                            console.log(res.data.data, "heheheheeeheh");
                            return next({
                                type: 'GET_PLAYLIST_SONGS_DATA_RECEIVED',
                                data:res.data.data
                            })
                    }).catch ((error)=> {
                            console.log(error);
                    });
    break;

    case 'GET_SEARCH_LIST_DATA':
        console.log("GET_SEARCH_LIST_DATA");
        axios.post('/rPlayer/search', {
            song: action.title
        }).then(res => {
                            console.log(res.data.data);
                            return next({
                                type: 'GET_SEARCH_DATA_RECEIVED',
                                data:res.data.data.songs
                            })
                    }).catch((error)=> {
                            console.log(error);
                    });

        
    break;
 
    // Do nothing if the action does not interest us
    default:
    //console.log("defualt activated");
    break;
  }
};

