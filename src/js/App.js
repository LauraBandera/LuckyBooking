import React, { Component } from 'react';
import Login from './Components/Login';
import Vistas from './Components/Vistas';

class App extends Component {

  //Cookies para conectado
  //Para routin navigate
  constructor(props){
    super(props);
    this.state = {
      conectado: false,
      usuario: "",
      id_usuario: "",
      tipo: "normal"
    }
  }

  acceder(estado, user, id, tip){
    if(estado == true){
      this.setState({
        conectado: estado,
        usuario: user,
        id_usuario: id,
        tipo: tip
      });
    }else{
      this.setState({
        conectado: estado,
        usuario: "",
        id_usuario: "",
        tipo: "normal"
      });
    }
  }

  render(){
    if (!this.state.conectado) {
      return <Login acceder={(v, u, i, p) => this.acceder(v, u, i, p)}/>;
    } else {
      return <Vistas tipo={this.state.tipo} id={this.state.id_usuario} usuario={this.state.usuario} acceder={(v, u, i, p) => this.acceder(v, u, i, p)}/>;
    }
  }
}

export default App;
