import '../../css/Vistas.css';
import Header from "../Components/ComunesAN/Header";
import { Icon } from '@iconify/react';
import CardAdmin from "../Components/Admin/CardAdmin";
import MenuAdmin from "../Components/Admin/MenuAdmin";
import { Outlet } from "react-router-dom";
import MenuGrandeA from '../Components/Admin/MenuGrandeA';

function VistaAdmin(props){
    
    return(
            <div id='body'>
                <Header usuario={props.usuario}/>
                <MenuAdmin/>
                <div id='version_grande'>
                    <MenuGrandeA/>
                    <Outlet/>
                    <div id='contenido'>
                        <CardAdmin titulo='Reservas Diarias' btn='Ver Reservas'/>
                        <CardAdmin titulo='Instalaciones' btn='Modificar'/>
                    </div>
                </div>
                <footer>
                    <Icon id="copyright" icon="ant-design:copyright-circle-outlined" /> Lucky Booking
                    <p>Aviso Legal - Politica de privacidad - Cookies</p>
                </footer>
            </div>
    );
}

export default VistaAdmin;