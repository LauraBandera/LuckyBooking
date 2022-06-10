import $ from 'jquery';

function TablaAdmin(props){

    //CARD DE INSTALACIONES
    const obtenerInstalaciones = () => {
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        let t = [];
        let row = [];
        let aux = [];
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
            <tr className='f_inicio_adm'>
                <td className='c_inicio_adm'>{fila.deporte}</td>
                <td>{fila.numero}</td>
            </tr>                
        );
    });

    //CARDS DE RESERVAS ACTUALES
    const obtenerOcupadas = () => {
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        let t = [];
        let row = [];
        let date = new Date();
        let output = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0')+ "-" + String(date.getDate()).padStart(2, '0')
        $.ajax({
            url: DIR_SERV + '/ocupadas/' + output,
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

    let objRowOcupadas=obtenerOcupadas().map(fila=>{
        return(
            <tr className='f_inicio_adm'>
                <td className='c_inicio_adm'>{fila[0]}</td>
                <td>{fila[1]+' '+fila[2]}</td>
            </tr>                
        );
    });

    if(props.titulo == 'Instalaciones'){
        return objRowInstalaciones;
    }else{
        return objRowOcupadas;
    }
}

export default TablaAdmin;