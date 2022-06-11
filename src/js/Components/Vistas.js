import React, { Component} from 'react';
import $ from 'jquery';
import VistaNormal from "../Vistas/VistaNormal";
import New from './ComunesAN/New';
import Historico from './Normal/Historico';
import Proximas from './Normal/Proximas';
import Perfil from './ComunesAN/Perfil';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import InicioAdmin from './Admin/InicioAdmin';
import Login from './Login';
import VistaAdmin from '../Vistas/VistaAdmin';
import ReservasDiarias from './Admin/ReservasDiarias';
import Instalaciones from './Admin/Instalaciones';

class Vistas extends Component{
    constructor(props){
        super(props);
        this.state = {
            component:  <div> </div>,
            log: 0,
            componentContent: 0
        }
    }
    
    handleCerrarSesion(e){
        e.preventDefault();
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        $.ajax({
            url: DIR_SERV + '/salir',
            method: "GET",
            dataType: "json",
        })
        .done(function () {
            console.log("cerrar sesion");

        })
        .fail(function () {
            console.log("error");
        });
    }

    obtenerFechas(){
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        let t = [];
        let row = [];
        let date = new Date();
        let output = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0')+ "-" + String(date.getDate()).padStart(2, '0')
        $.ajax({
            url: DIR_SERV + '/fechas/' + output,
            method: "GET",
            dataType: "json",
            async: false
        })
            .done(function (data) {
                if(data.fechas){
                    $.each(data.fechas, function (key, value){
                        row = [];
                        $.each(value, function (key, columns){
                            row.push(columns);
                        });
                        t.push(row);
                    });
                    
                }else if(data.mensaje){
                    console.log(data.mensaje);
                }else{
                    console.log("error");
                }
            })
            .fail(function () {
                console.log("ERROR");
            });

            return t;
    }

    obtenerTodasFechas(){
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        let t = [];
        let row = [];
        let date = new Date();
        let output = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0')+ "-" + String(date.getDate()).padStart(2, '0')
        $.ajax({
            url: DIR_SERV + '/todasFechas/' + output,
            method: "GET",
            dataType: "json",
            async: false
        })
            .done(function (data) {
                if(data.fechas){
                    $.each(data.fechas, function (key, value){
                        row = [];
                        $.each(value, function (key, columns){
                            row.push(columns);
                        });
                        t.push(row);
                    });
                    
                }else if(data.mensaje){
                    console.log(data.mensaje);
                }else{
                    console.log("error");
                }
            })
            .fail(function () {
                console.log("ERROR");
            });

            return t;
    }

    render(){
        if(this.props.tipo != "admin"){
            return <BrowserRouter>
                        <Routes>
                        <Route path="/" element={<VistaNormal usuario={this.props.usuario}/>}>
                            <Route path="New" element={<New id={this.props.id} usuario={this.props.usuario} fechas={this.obtenerFechas}/>} />
                            <Route path="Historico" element={<Historico usuario={this.props.usuario} titulo={"Histórico Reservas"}/>} />
                            <Route path="Proximas" element={<Proximas usuario={this.props.usuario} titulo={"Próximas Reservas"}/>}/>
                            <Route path="Perfil" element={<Perfil id={this.props.id}/>} />
                            <Route path="*" element={
                                <main style={{ padding: "3rem" }}>
                                    <h1>Error la ruta no existe</h1>
                                </main>
                            }
                            />
                        </Route>
                        </Routes>
                    </BrowserRouter>
        }else{
            return <BrowserRouter>
                        <Routes>
                        <Route path="/" element={<VistaAdmin usuario={this.props.usuario}/>}>
                            <Route path="ReservasDiarias" element={<ReservasDiarias fechas={this.obtenerTodasFechas}/>} />
                            <Route path="NuevaReserva" element={<New id={this.props.id} usuario={this.props.usuario} fechas={this.obtenerFechas}/>} />
                            <Route path="Instalaciones" element={<Instalaciones/>} />
                            <Route path="Perfil" element={<Perfil id={this.props.id}/>} />
                            <Route path="*" element={
                                <main style={{ padding: "3rem" }}>
                                    <h1>Error la ruta no existe</h1>
                                </main>
                            }
                            />
                        </Route>
                        </Routes>
                    </BrowserRouter>
            /*
            return <BrowserRouter>
                        <Routes>
                        <Route path="/" element={<InicioAdmin acceder={(c, u, i, t) => this.props.acceder(c, u, i, t)} handleCerrarSesion={this.handleCerrarSesion}/>}>
                            <Route path="Login" element={<Login/>} />
                            <Route path="*" element={
                                <main style={{ padding: "3rem" }}>
                                    <h1>Error la ruta no existe</h1>
                                </main>
                            }
                            />
                        </Route>
                        </Routes>
                    </BrowserRouter>
            */
        }
    }
}
export default Vistas;