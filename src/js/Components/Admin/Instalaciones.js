import CardInstalaciones from "./CardInstalaciones";
import $ from 'jquery';

function Instalaciones(){

    //CARD DE INSTALACIONES
    const obtenerInstalaciones = () => {
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        let t = [];
        $.ajax({
            url: DIR_SERV + '/instalaciones',
            method: "GET",
            dataType: "json",
            async: false
        })
            .done(function (data) {
                if(data.instalaciones){
                    $.each(data.instalaciones, function (key, columnas){
                        if(t.some(e => (e.deporte === columnas.deporte && e.numero < columnas.numero))){
                            t.map(e=> {if(e.deporte === columnas.deporte){e.numero = columnas.numero}})
                        }else{
                            t.push(columnas);
                        }
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

    let objRowInstalaciones=obtenerInstalaciones().map(fila=>{
        return(
            <CardInstalaciones deporte={fila.deporte} num={fila.numero}/>            
        );
    });

    return <div id="contenido">
                <h2>Instalaciones</h2>
                {objRowInstalaciones}
            </div>
}

export default Instalaciones;