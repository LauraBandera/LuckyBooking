import $ from 'jquery';
import logo from "../../../img/logo_lucky_booking_light.png";
import { Icon } from '@iconify/react';
import "../../../css/MenuNormal.css";
import { Link } from "react-router-dom";

function MenuNormal(){

    const displayAll = (e) => {
        $("div").css({ display: "block" });
        $("header").css({ display: "block" });
        $("div#menu").css({ display: "none" });
        $("body").css({overflowY: "scroll"});
        $("#body").css({ display: "flex" });
        $(".fondo").css({ display: "block" });
        $("div#menu_grande").css({ display: "none" });
        $("#header_grande").css({ display: "none" });
        $("html, body").animate({ scrollTop: "0" });
    }

    const displayAllNavigate = () => {
        $("div").css({ display: "block" });
        $("header").css({ display: "block" });
        $("div#menu").css({ display: "none" });
        $("div.fondo").css({ display: "none" });
        $("div#contenido").css({ display: "none" });
        $("body").css({overflowY: "scroll"});
        $("div#menu_grande").css({ display: "none" });
        $("#header_grande").css({ display: "none" });
    }

    return(
        <div id='menu'>
            <div id='header'>
                <Link onClick={displayAll} to="/"><img id="App-logo-menu" src={logo} alt="logo" /></Link>
            </div>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/Proximas">Próximas Reservas</Link></h3>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/Historico">Historial Reservas</Link></h3>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/New">Nueva Reserva</Link></h3>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/Perfil">Perfil</Link></h3>
            <div id='footer-menu'>
                <div id='contenido-footer'><Icon id="copyright" icon="ant-design:copyright-circle-outlined" /> Lucky Booking</div>
                <p>Aviso Legal - Politica de privacidad - Cookies</p>
            </div>
        </div>
    );
}

export default MenuNormal;