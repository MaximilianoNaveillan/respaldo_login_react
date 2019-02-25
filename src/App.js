import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import firebase from 'firebase';

import Home from './Component/Home';
import About from './Component/About';
import Misapka from './Component/Misapka';
import Navigation from './Component/Navigation';
import Login from './Component/Login';
import Userinfo from './Component/Userinfo';
import CreateUser from './Component/CreateUser';


import M from 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'




  window.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();
  });


class App extends Component {

  constructor () {
    super()
    this.state = {
      user: null,
      displayName:'',
      photoURL:null,
      email:''
    }
    this.handleAuth = this.handleAuth.bind(this)
    this.handleAuthEmail = this.handleAuthEmail.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount () {
  firebase.auth().onAuthStateChanged(user => {
    if(user){
      console.log(user);
                this.setState({
                   user,
                   displayName:user.displayName,
                   photoURL:user.photoURL,
                   email:user.email
                 })
    }

          //    var usuario ={
          //    uid:user.uid,
          //    displayName:nwdisplayName,
          //    email:user.email,
          //    photoURL:nwphotoURL
          //  }


          //  firebase.database().ref(`Usuarios/${user.uid}`)
          //  .set(usuario)

  })
}
handleAuthEmail ( email, password) {

}



handleAuth () {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/plus.login')

  firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha iniciado sesión`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`))
}

handleLogout () {
  firebase.auth().signOut()
    .then(result =>{
       console.log('Te has desconectado correctamente');
       this.setState({
         user:'',
          displayName:'',
          photoURL:'',
          email:''
        })
     })
    .catch(error => console.log(`Error ${error.code}: ${error.message}`))
}

handleDisplayName(name1,name2){
  this.setState({
     displayName:`${name1} ${name2}`,
   })
}

handleOnChange (name,value){
  this.setState({
    [name]: value
  });
}

renderMessages () {

  if (this.state.user) {
    return ''
  } else {
    return <div>Debes estar autenticado para poder leer y enviar mensajes</div>
  }
}

handleChangeDislayName(name1,name2){
  this.setState({ displayName:name1+" "+name2})
}
  render() {
    return (
      <div>
          <Navigation
          appName='APKA'
          photoURL={this.state.photoURL}
          user={this.state.user}
          onLogout={this.handleLogout.bind(this)}
          />

           {/**
                 *  route to diffrent component
                 */}

         <Route exact={true} path={'/'} component={Home}  />
         <Route exact={true} path={'/about'} component={About} />
         <Route exact={true} path={'/misapka'} component={Misapka} />
          {this.renderMessages()}


          <div id="modalUser" className="modal">
          <Userinfo
          photoURL={this.state.photoURL}
          displayName={this.state.displayName}
          email={this.state.email}
          onLogout={this.handleLogout.bind(this)}
          onHandleOnChange ={this.handleOnChange.bind(this)}
          />
          </div>

          <div id="modalLogin" className="modal grey lighten-3 loginmodal">
          <Login
          onAuth={this.handleAuth.bind(this)}
          onAuthEmail = {this.handleAuthEmail.bind(this)}
          />
          </div>

          <div id="modalCreateUser" className="modal grey lighten-3 loginmodal">
          <CreateUser
          onAuthEmail = {this.handleAuthEmail.bind(this)}
          handleDisplayName = {this.handleDisplayName.bind(this)}
          />
          </div>



      </div>
    );


  }
}

export default App;
