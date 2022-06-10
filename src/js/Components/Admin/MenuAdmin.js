import $ from 'jquery';
import logo from "../../../img/logo_lucky_booking_light.png";
import { Icon } from '@iconify/react';
import "../../../css/MenuNormal.css";
import { Link } from "react-router-dom";

function MenuAdmin(){

    const displayAll = (e) => {
        $("div").css({ display: "block" });
        $("header").css({ display: "block" });
        $("div#menu").css({ display: "none" });
        $("body").css({overflowY: "scroll"});
        $("#body").css({ display: "flex" });
        $(".fondo").css({ display: "block" });
    }

    const displayAllNavigate = () => {
        $("div").css({ display: "block" });
        $("header").css({ display: "block" });
        $("div#menu").css({ display: "none" });
        $(".fondo").css({ display: "none" });
        $("body").css({overflowY: "scroll"});
    }

    return(
        <div id='menu'>
            <div id='header'>
                <Link onClick={displayAll} to="/"><img id="App-logo-menu" src={logo} alt="logo" /></Link>
            </div>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/ReservasDiarias">Reservas Diarias</Link></h3>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/NuevaReserva">Nueva Reserva</Link></h3>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/Instalaciones">Instalaciones</Link></h3>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/Perfil">Perfil</Link></h3>
            <div id='footer-menu'>
                <div id='contenido-footer'><Icon id="copyright" icon="ant-design:copyright-circle-outlined" /> Lucky Booking</div>
                <p>Aviso Legal - Politica de privacidad - Cookies</p>
            </div>
        </div>
    );
}

export default MenuAdmin;