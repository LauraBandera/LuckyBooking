import { Card, CardTitle, Table } from "reactstrap";
import TablaDiaria from "./TablaDiaria";

function CardDiaria(props){
    return(
        <Card>
                <CardTitle><strong>{props.deporte+' '+props.num}</strong></CardTitle>
                <Table>
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Usuario</th>
                            <th>Pagado</th>
                        </tr>
                    </thead>
                    <TablaDiaria pos={props.pos} ocupadas={props.ocupadas} deporte={props.deporte} num={props.num}/>
                </Table>
            </Card>
    );
}

export default CardDiaria;