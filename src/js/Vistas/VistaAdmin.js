import '../../css/Vistas.css';
import Header from "../Components/ComunesAN/Header";
import { Icon } from '@iconify/react';
import CardAdmin from "../Components/Admin/CardAdmin";
import MenuAdmin from "../Components/Admin/MenuAdmin";
import { Outlet } from "react-router-dom";

function VistaAdmin(){
    return(
            <div id='body'>
                <Header/>
                <MenuAdmin/>
                <Outlet/>
                <div id="contenido">
                    <CardAdmin titulo='Reservas de Hoy' btn='Ver Reservas'/>
                    <CardAdmin titulo='Instalaciones' btn='Modificar'/>
                </div>
                <footer>
                    <Icon id="copyright" icon="ant-design:copyright-circle-outlined" /> Lucky Booking
                    <p>Aviso Legal - Politica de privacidad - Cookies</p>
                </footer>
            </div>
    );
}

export default VistaAdmin;