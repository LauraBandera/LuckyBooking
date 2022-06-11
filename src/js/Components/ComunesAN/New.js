import $ from 'jquery';
import {Button} from "reactstrap";
import './../../../css/New.css';
import React, { useState } from 'react';
import CardNew from './CardNew';

function New(props){

    var[arrayFechas, setArrayFecha] = useState(props.fechas);
    var[pos, setPos] = useState(0);

    const obtenerValores = () => {
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        let t = [];
        let row = [];
        $.ajax({
            url: DIR_SERV + '/disponibles/' + arrayFechas[pos],
            method: "GET",
            dataType: "json",
            async: false
        })
            .done(function (data) {
                if(data.disponibles){
                    $.each(data.disponibles, function (key, value){
                        row = [];
                        $.each(value, function (key, columns){
                            row.push(columns);
                        });
                        t.push(row);
                    });
                    
                }else if(data.mensaje){
                    console.log("mensaje");
                }else{
                    console.log("error");
                }
            })
            .fail(function () {
                console.log("ERROR");
            });

            return t;
    }

    const obtenerDeportes = () => {
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        let t = [];
        let row = [];
        $.ajax({
            url: DIR_SERV + '/deportes/' + arrayFechas[pos],
            method: "GET",
            dataType: "json",
            async: false
        })
            .done(function (data) {
                if(data.deportes){
                    $.each(data.deportes, function (key, value){
                        row = [];
                        $.each(value, function (key, columns){
                            row.push(columns);
                        });
                        t.push(row);
                    });
                    
                }else if(data.mensaje){
                    console.log("mensaje");
                }else{
                    console.log("error");
                }
            })
            .fail(function () {
                console.log("ERROR");
            });

            return t;
    }

    const objCards=obtenerDeportes().map(fila=>{
        return <CardNew id={props.id} pos={pos} disponibles={obtenerValores()} deporte={fila} usuario={props.usuario}/>
    });

    const moverFechaAnt = () => {
        let pos2 = pos - 1;
        if(pos != 0){
            setPos(pos2);
        }
    }

    const moverFechaPos = () => {
        let pos2 = pos +1;
        if(pos != arrayFechas.length-1){
            setPos(pos2);
        }
    }
    
    return(
        <div id='nuevaReserva'>
            <h2>Nueva Reserva</h2>
            <div id='cabeceraReserva'>
                <Button className='cambioFecha' onClick={moverFechaAnt}><strong>{'<'}</strong></Button>
                <h4><strong>{arrayFechas[pos]}</strong></h4>
                <Button className='cambioFecha' onClick={moverFechaPos}><strong>{'>'}</strong></Button>
            </div>
            {objCards}
        </div>
    );
}

export default New;