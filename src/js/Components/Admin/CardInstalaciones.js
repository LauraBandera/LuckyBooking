import { useState } from "react";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import $ from 'jquery';

function CardInstalaciones(props){

    const[nValor, setNValor] = useState(null);
    const[valorMostrar, setValorMostrar] =useState(props.num);

    const updateValores = (e) => {
        e.preventDefault();
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        if(nValor != null){
            if(nValor < valorMostrar){
                //1º Selecccionamos todas las instalaciones con un número mayor al elegido
                $.ajax({
                    url: DIR_SERV + '/instalacionesId/' + nValor + '/' + props.deporte,
                    method: "GET",
                    dataType: "json",
                    async: false
                })
                    .done(function (data) {
                        console.log(data.instalacionesId);
                        $.each(data.instalacionesId, function (key, value) {
                            console.log(value.id);
                            //2º Borramos las reservas con el número de id_instalacion
                            $.ajax({
                                url: DIR_SERV + '/deleteReserva/' + value.id,
                                method: "POST",
                                dataType: "json",
                                async: false
                            })
                                .done(function (data) {
                                    console.log(data.mensaje);
                                })
                                .fail(function () {
                                    console.log("ERROR");
                                });
                            //3º Borramos las plantillas con el número de id_instalacion
                            $.ajax({
                                url: DIR_SERV + '/deletePlantilla/' + value.id,
                                method: "POST",
                                dataType: "json",
                                async: false
                            })
                                .done(function (data) {
                                    console.log(data.mensaje);
                                })
                                .fail(function () {
                                    console.log("ERROR");
                                });
                            //4º Borramos la instalacion con el número de id_instalacion
                            $.ajax({
                                url: DIR_SERV + '/deleteInstalacion/' + value.id,
                                method: "POST",
                                dataType: "json",
                                async: false
                            })
                                .done(function (data) {
                                    if(data.mensaje){
                                        console.log(data.mensaje);
                                    }else{
                                        console.log(data.error);
                                    }
                                    setValorMostrar(nValor);
                                })
                                .fail(function () {
                                    console.log("ERROR");
                                });
                        });
                    })
                    .fail(function () {
                        console.log("ERROR");
                    });
            }else if(nValor > valorMostrar){
                //1º Insertamos las nuevas instalaciones
                let diferencia = parseInt(nValor)-parseInt(valorMostrar);
                let horas = ['10:00-11:30', '17:00-18:30', '18:30-20:00'];
                while(diferencia > 0){
                    let nuevoNum = diferencia+parseInt(valorMostrar);
                    $.ajax({
                        url: DIR_SERV + '/insertarInstalacion/' + nuevoNum + '/' + props.deporte,
                        method: "POST",
                        dataType: "json",
                        async: false
                    })
                        .done(function (data) {
                            console.log(data.mensaje);
                            let pos = 0;
                            while(pos<horas.length){
                                $.ajax({
                                    url: DIR_SERV + '/instalacionId/' + nValor + '/' + props.deporte,
                                    method: "GET",
                                    dataType: "json",
                                    async: false
                                })
                                    .done(function (data) {
                                        $.ajax({
                                            url: DIR_SERV + '/insertarPlantilla/' + horas[pos] + '/' + data.instalacionesId[0].id,
                                            method: "GET",
                                            dataType: "json",
                                            async: false
                                        })
                                            .done(function (data) {
                                                if(data.mensaje){
                                                    console.log(data.mensaje);
                                                }else{
                                                    console.log(data.error);
                                                }
                                                diferencia--;
                                                pos++;
                                                setValorMostrar(nValor);
                                            })
                                            .fail(function () {
                                                console.log("ERROR");
                                            });
                                    });
                            }
                        })
                        .fail(function () {
                            console.log("ERROR");
                        });
                }
            }
        }
        console.log('update con valores: '+ nValor + ' ' + props.deporte + props.num);
    }

    const handleChange = async (e) => {
        e.preventDefault();
        setNValor(e.target.value);          
    }  

    return (
        <Card>
            <CardTitle>{props.deporte}</CardTitle>
            <CardBody>
                {valorMostrar} Pistas
                <form onSubmit={updateValores}>
                    <input placeholder="Nuevo Número de Pistas" id='nuevoNum' type='number' onChange={handleChange}/>
                    <Button className="btnUpdate">Cambiar</Button>
                </form>
            </CardBody>
        </Card>
    );
}

export default CardInstalaciones;