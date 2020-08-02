import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state ={
      loggedIn : params.access_token ? true: false,
      nowPlaying:{
        name: 'idk',
        image: 'not yet'
       }
    }
    if( params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
  }

  render(){
    return (
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        <div> Now Playing: {this.state.nowPlaying.name} </div>
        <div> {<img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/> } </div>
        
        <button onClick={ ()=>this.getNowPlaying()}> Check now playing </button>
      </div>
    );
  }

}

export default App;
