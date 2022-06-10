import $ from 'jquery';
import { Icon } from '@iconify/react';
import { Card, CardTitle, Table } from "reactstrap";

function Proximas(props){

    const obtenerValores = () => {
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        let t = [];
        let row = [];
        $.ajax({
            url: DIR_SERV + '/reservas/' + props.usuario,
            method: "GET",
            dataType: "json",
            async: false
        })
            .done(function (data) {
                if(data.reservas){
                    $.each(data.reservas, function (key, value){
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

    let objRow=obtenerValores().map(fila=>{
        let date = new Date();
        let output = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0')+ "-" + String(date.getDate()).padStart(2, '0');
        //Hora: date.getHours(), Minutos: date.getMinutes()
            if(fila[1] >= output){
            //Filtramos si la reserva está pagada o no para poner el icono correspondiente
            if(fila[4] ==3){
                return(
                    <tr>
                        <td colSpan={2}>{fila[0]}</td>
                        <td>{fila[1].substring(5)}</td>
                        <td>{fila[2] + " " + fila[3]}</td>
                        <td><Icon icon="charm:tick" /></td>
                    </tr>                
                );
            }else{
                return(
                    <tr>
                        <td colSpan={2}>{fila[0]}</td>
                        <td>{fila[1].substring(5)}</td>
                        <td>{fila[2] + " " + fila[3]}</td>
                        <td><Icon icon="charm:cross" /></td>
                    </tr>                
                );
            }
        }
    });    

    return(
        <Card>
                    <CardTitle tag="h2">
                        {props.titulo}
                    </CardTitle>
                    <Table>
                        <thead>
                            <tr>
                                <th colSpan={2}>Hora</th>
                                <th>Día</th>
                                <th>Pista</th>
                                <th>Pago</th>
                            </tr>
                        </thead>
                        <tbody>
                            {objRow}
                        </tbody>
                    </Table>
                </Card>
    );
}

export default Proximas;