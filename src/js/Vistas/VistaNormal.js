import { Outlet } from "react-router-dom";
import '../../css/Vistas.css';
import { Component} from "react";
import MenuNormal from "../Components/Normal/MenuNormal";
import CardNormal from "../Components/Normal/CardNormal";
import Header from "../Components/ComunesAN/Header";
import { Icon } from '@iconify/react';
import MenuGrandeN from "../Components/Normal/MenuGrandeN";
import $ from 'jquery';

class VistaNormal extends Component{

    constructor(props){
        super(props);
        this.state = {
            visual: <></>
        }
    }  

    componentDidMount(){
        let card = <div id="body">
                            <Header usuario={this.props.usuario}/>
                            <MenuNormal/>
                            <div id='version_grande'>
                                <MenuGrandeN/>
                                <Outlet/>
                                <div id='contenido'>
                                    <CardNormal usuario={this.props.usuario} titulo={"Proximas Reservas"} b={"Nueva Reserva"} name={"btnNew"}/>
                                    <CardNormal usuario={this.props.usuario} titulo={"Historial Reservas"} b={"Más Reservas"} name={"btnMas"}/>
                                </div>
                            </div>
                        
                        <footer>
                            <Icon id="copyright" icon="ant-design:copyright-circle-outlined" /> Lucky Booking
                            <p>Aviso Legal - Politica de privacidad - Cookies</p>
                        </footer>
                    </div>;
        this.setState({visual: card});
    }

    render(){
        return(
            this.state.visual
        );
    }
}

export default VistaNormal;