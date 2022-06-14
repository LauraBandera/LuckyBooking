import { Icon } from '@iconify/react';
import $ from 'jquery';
import {Button } from "reactstrap";

function TablaDiaria(props){

    const actualizarPago = async (e) =>{
        e.preventDefault();
        $(e.target).parent().html('&#10003;');
        actualizarBBD(e.target.name);
    }

    const actualizarBBD = (id) => {
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
                $.ajax({
                    url: encodeURI(DIR_SERV + "/updateEstado/" + id),
                    type: "GET",
                    dataType: "json"
                }).done(function(data) {
                    if(data.mensaje){
                        console.log('exito');
                    }else{
                        console.log(data.error);
                    }
                }).fail(function() {
                    console.log('ERROR');
                });
    }

    const filas = props.ocupadas.map(fila =>{
        if(props.deporte == fila[1] && props.num == fila[2]){
            if(fila[4] == 3){
                return(
                    <tr className="contenidoTabla">
                        <td>{fila[0]}</td>
                        <td>{fila[3]}</td>
                        <td>&#10003;</td>
                    </tr>  
                )
            }else{
                return(
                    <tr className="contenidoTabla">
                        <td>{fila[0]}</td>
                        <td>{fila[3]}</td>
                        <td><form name={fila[5]} onSubmit={actualizarPago}><Icon icon="charm:cross" /> <Button>Pagar</Button></form></td>
                    </tr>  
                )
            }
        }
    });

    return(
        filas
    );

}

export default TablaDiaria;