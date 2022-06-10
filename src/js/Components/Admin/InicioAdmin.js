import logo from "../../../img/logo_lucky_booking_light.png";
import VistaAdmin from "../../Vistas/VistaAdmin";
import { Icon } from '@iconify/react';
import { Link, Outlet } from "react-router-dom";
import $ from 'jquery';

function InicioAdmin(props){
    const mostrarLogin = () =>{
        $("#body").css({display: 'none'});
    }
    return (<>
        <Outlet/>
        <div id="body">
            <header>
                <img src={logo} id="App-logo" alt="logo" />
                <Icon id="hamburger" icon="dashicons:menu" />
            </header>
            <Link onClick={console.log("salimos") && props.acceder(false, "", "", "") && props.handleCerrarSesion && mostrarLogin} to='/Login'><button>Cerrar Sesion</button></Link>
            <VistaAdmin/>
            <footer>
                <div><Icon id="copyright" icon="ant-design:copyright-circle-outlined" /> Lucky Booking</div>
                <p>Aviso Legal - Politica de privacidad - Cookies</p>
            </footer>
        </div>
    </>
        
    );
}

export default InicioAdmin;