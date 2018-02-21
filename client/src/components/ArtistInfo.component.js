import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Ionicons from 'react-icons/lib/md';


class ArtistInfoComponent extends Component {
    constructor() {
        super();
        this.state = {}
    }
    
    componentWillMount() {
    }

    renderArtistInfo(){
        const placeHolderUrl='https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-256.png';
        const {artist } = this.props;
      
        return(
            <div>
                <p> {artist.name }</p>
                <p>{artist.artistBio}</p>
                <img 
                    src={ artist.artistArtRef ? artist.artistArtRef : placeHolderUrl } 
                    mode='fit' 
                />
                <div /*className={'related-artists-containter'}*/>
                    { artist.related_artists ? 
                        artist.related_artists.map((relatedArtist, index) =>  
                            <div key={index}  /*className={'related-artist-item'}*/>
                                <p>{relatedArtist.name}</p>
                                <img 
                                    src={ relatedArtist.artistArtRef ? relatedArtist.artistArtRef : placeHolderUrl } 
                                    mode='fit' 
                                />
                            </div>
                            ) : null
                    }              
                </div>
            </div>
        )
    }

    render() {
        const {artist, shift} = this.props;
        return (
                <div
                 style={{  
                        position: 'relative',
                    left: shift ? '300px': 0}}
                    >
                { artist ? this.renderArtistInfo(): <h1>Loading</h1> }
                </div>
            )
    }
}


const mapStateToProps = (state) => {
        return {
          artist: state.main.artistInfo
        };
      };

    //   const mapDispatchToProps = (dispatch) => {
    //     return {
    //       updateArtistInfo(artistData) {
    //         dispatch(setArtistInfo(artistData));
    //       }
    //     }
    //   };

export default connect(mapStateToProps, /*mapDispatchToProps*/)(ArtistInfoComponent);

