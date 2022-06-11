import { Icon } from '@iconify/react';

function TablaDiaria(props){
    const filas = props.ocupadas.map(fila =>{
        if(props.deporte == fila[1] && props.num == fila[2]){
            if(fila[4] == 3){
                return(
                    <tr className="contenidoTabla">
                        <td>{fila[0]}</td>
                        <td>{fila[3]}</td>
                        <td><Icon icon="charm:tick" /></td>
                    </tr>  
                )
            }else{
                return(
                    <tr className="contenidoTabla">
                        <td>{fila[0]}</td>
                        <td>{fila[3]}</td>
                        <td><Icon icon="charm:cross" /></td>
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