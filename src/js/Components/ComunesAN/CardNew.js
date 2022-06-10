import { Card, CardTitle, Table } from "reactstrap";
import TablaNew from './TablaNew';
import '../../../css/CardNew.css';

function CardNew(props){
    

    return(
        <Card>
                <CardTitle><strong>{props.deporte}</strong></CardTitle>
                <Table>
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Pista</th>
                            <th>Reservar</th>
                        </tr>
                    </thead>
                    <TablaNew id={props.id} pos={props.pos} usuario={props.usuario} disponibles={props.disponibles} deporte={props.deporte}/>
                </Table>
            </Card>
    );
}

export default CardNew;