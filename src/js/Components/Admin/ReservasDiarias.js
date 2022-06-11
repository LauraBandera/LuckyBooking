import $ from 'jquery';
import React, { useState } from 'react';
import {Button} from "reactstrap";
import CardDiaria from './CardDiaria';
import '../../../css/ReservasDiarias.css';

function ReservasDiarias(props){
    var[arrayFechas, setArrayFecha] = useState(props.fechas);
    var[pos, setPos] = useState(arrayFechas.length-1);

    const obtenerValores = () => {
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        let t = [];
        let row = [];
        $.ajax({
            url: DIR_SERV + '/ocupadas/' + arrayFechas[pos],
            method: "GET",
            dataType: "json",
            async: false
        })
            .done(function (data) {
                if(data.ocupadas){
                    $.each(data.ocupadas, function (key, value){
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
            url: DIR_SERV + '/pistas/' + arrayFechas[pos],
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
        return <CardDiaria pos={pos} ocupadas={obtenerValores()} deporte={fila[0]} num={fila[1]}/>
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

    const generarDia = (e) => {
        e.preventDefault();
        console.log('Generamos Día');
        let date = new Date(arrayFechas[arrayFechas.length-1]);
        let newDate = new Date();
        newDate.setDate(date.getDate() + 1);
        let output = newDate.getFullYear() + "-" + String(newDate.getMonth() + 1).padStart(2, '0')+ "-" + String(newDate.getDate()).padStart(2, '0')
        console.log(output);

        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        $.ajax({
            url: encodeURI(DIR_SERV + "/generarDia/" + output),
            type: "GET",
            dataType: "json"
        }).done(function(data) {
            if(data.mensaje){
                console.log('Día generado con éxito');
                arrayFechas.push([output]);
                console.log(arrayFechas);
            }else{
                console.log(data.error);
            }
        }).fail(function() {
            console.log('ERROR');
        });
    }

    return <div id='diaria'>
                <Button onClick={generarDia} className='common_button_vistas'>Generar Nuevo Día</Button>
                <h2>Reservas Diarias</h2>
                <div id='cabeceraReserva'>
                    <Button className='cambioFecha' onClick={moverFechaAnt}><strong>{'<'}</strong></Button>
                    <h4 className='big'><strong>{arrayFechas[pos]}</strong></h4>
                    <Button className='cambioFecha' onClick={moverFechaPos}><strong>{'>'}</strong></Button>
                </div>
                {objCards}
            </div>
    }

export default ReservasDiarias;