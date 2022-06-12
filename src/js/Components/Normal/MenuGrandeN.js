import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import $ from 'jquery';

function MenuGrandeN(){

    const displayAllNavigate = () => {
        $("div.fondo").css({ display: "none" });
        $("div#contenido").css({ display: "none" });
    }

    return (
        <div id='menu_grande'>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/Proximas">Próximas Reservas</Link></h3>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/Historico">Historial Reservas</Link></h3>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/New">Nueva Reserva</Link></h3>
            <h3><Icon icon="ant-design:right-outlined" /><Link className='link' onClick={displayAllNavigate} to="/Perfil">Perfil</Link></h3>
        </div>
    );
}

export default MenuGrandeN;