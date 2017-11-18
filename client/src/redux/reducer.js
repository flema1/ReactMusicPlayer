import initialState from './initialState'
import * as types from './action-types'

 const reducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SET_PLAYLIST_ID:
            console.log("SET_PLAYLIST_ID");
            return Object.assign({}, state, {
                playListId: action.playListId
            })

        case types.GET_PLAYLISTS_DATA_RECEIVED:
            console.log("PLAYLISTS recieved");
            return Object.assign({}, state, {
                playlists: action.data
            })
        case types.GET_SEARCH_DATA_RECEIVED:
            console.log("SEARCH recieved");
            return Object.assign({}, state, {
                songs: action.data,
                songsApidataLoaded:true
            })

        case types.GET_PLAYLIST_SONGS_DATA_RECEIVED:
            console.log("PLAYLIST_SONGS recieved");
            return Object.assign({}, state, {
                SinglePlaylistSongs: action.data,
                SinglePlaylistSongsApidataLoaded:true
            })

        default:
            return state
    }
}

export default reducer