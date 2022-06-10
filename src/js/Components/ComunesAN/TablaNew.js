import { Button } from "reactstrap";
import '../../../css/New.css';
import $ from 'jquery';
import '../../../css/CardNew.css';

function TablaNew (props){

    const reservamos = (f) => {
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        $.ajax({
            url: encodeURI(DIR_SERV + "/updateReserva/" + props.id + "/" + f),
            type: "POST",
            dataType: "json"
        }).done(function(data) {
            if(data.mensaje){
                console.log(DIR_SERV + "/updateReserva/" + props.id + "/" + f);
                console.log('INSERTADO CON ÉXITO');
                $('#reserva'+f+props.fecha).css({display: 'none'});
            }else{
                console.log(data.error);
            }
        }).fail(function() {
            console.log('ERROR');
        });
    }
    
    const filas = props.disponibles.map(fila =>{
            if(props.deporte == fila[2]){
                return(
                    <tr id={'reserva'+fila[1]+props.fecha} className="contenidoTabla">
                        <td>{fila[0]}</td>
                        <td>{fila[3]}</td>
                        <td><Button className="btnUpdate" onClick={() => reservamos(fila[1])}>Reservar</Button></td>
                    </tr>  
                )
            }
        });

    return(
        filas
    );
}

export default TablaNew;