import React, { Component } from 'react';
import PlaylistList from './components/PlaylistList';
import SearchBar from './components/SearchBar';
import Main from './components/Main';
import PlayListMenu from './components/PlayListMenu';
import SideNav from './partials/SideNav';
import Login from './components/LoginPage';
import View from './components/SearchResult';
import Favorites from './components/Favorites';
import Library from './components/Library';
import Artists from './components/Artists.component';
import ArtistInfo from'./components/ArtistInfo.component';
import * as Ionicons from 'react-icons/lib/io';
import { connect } from 'react-redux';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      shift:null,
      auth: false,
      redirect:'HOME'
      }
    }

  componentWillMount(){
    axios.get(`/auth/checkloggedIn`)
    .then((res) => {
      this.setState({ auth:true})
        //dispatch(setLoginSuccess(true));
    })
    .catch((err) => {
      console.log(err, 'err, fE, regis')
      //console.log(err.response.data);
      //console.log(err.response.status);
      //dispatch(setLoginError(err.response.status));
    })
  }

  toggleShift(){
    this.setState({shift:!this.state.shift})
  }

  redirectTo(path){
    console.log(path);
    this.setState({ redirect:path})
  }
  
  render(){
    const {redirect,shift,auth}=this.state; 
    const { isLoginSuccess }=this.props;
    if (!isLoginSuccess && !auth) {
      return (<div className="App">
                <Login />
              </div>
      );
    }

    return (
      <div className="App">
        <SideNav toggleShift={this.toggleShift.bind(this)} redirectTo={ this.redirectTo.bind(this) }/>
        {
          redirect === 'HOME' ? (
            <Main shift={ shift } redirectTo={ this.redirectTo.bind(this)} />
          ) : redirect === 'SEARCH' ? (
            <View shift={ shift }/> 
          ) : redirect === 'FAVORITES' ? (
            <Favorites shift={ shift }/> 
          ) :redirect === 'ALL_SONGS' ? (
            <Library shift={ shift }/> 
          ) :redirect === 'ARTISTS' ? (
            <Artists shift={ shift } redirectTo={ this.redirectTo.bind(this)} />
          ) : redirect === 'ARTIST_INFO' ? (
            <ArtistInfo shift={ shift }/> 
            )
          :
          null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.auth.isLoginPending,
    isLoginSuccess: state.auth.isLoginSuccess,
    loginError: state.auth.loginError
  };
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginUser: (email, password) => {
//       dispatch(login(email, password))
//     }
//   }
// }

export default connect(mapStateToProps, /*mapDispatchToProps*/ null)(App);




