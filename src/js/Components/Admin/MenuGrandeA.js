import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import $ from 'jquery';

function MenuGrandeA(){

    const displayAllNavigate = () => {
        $("div.fondo").css({ display: "none" });
        $("div#contenido").css({ display: "none" });
        $("div#version_grande").css({ display: "block" });
    }

    return (
        <div id='menu_grande'>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/ReservasDiarias">Reservas Diarias</Link></h3>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/NuevaReserva">Nueva Reserva</Link></h3>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/Instalaciones">Instalaciones</Link></h3>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/Perfil">Perfil</Link></h3>
        </div>
    );
}

export default MenuGrandeA;