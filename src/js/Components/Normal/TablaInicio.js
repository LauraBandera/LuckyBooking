import $ from 'jquery';
import { Icon } from '@iconify/react';

function TablaInicio (props){

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
        //Filtramos según si es reserva proxima o anterior
        if(props.name == "btnNew"){
            if(fila[1] >= output){
                //Filtramos si la reserva está pagada o no para poner el icono correspondiente
                if(fila[4] == 3){
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
        }else{
            if(fila[1] < output){
                //Filtramos si la reserva está pagada o no para poner el icono correspondiente
                if(fila[4] == 3){
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
        }
    });    

   return objRow;
}

export default TablaInicio;