import { Card, CardTitle, Table } from "reactstrap";
import $ from 'jquery';
import TablaInicio from './TablaInicio';
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function CardNormal(props){

    const displayAllNavigate = () => {
        $("div").css({ display: "block" });
        $("header").css({ display: "block" });
        $("div#menu").css({ display: "none" });
        $("div.fondo").css({ display: "none" });
        $("body").css({overflowY: "scroll"});
    }

    
    const boton = () => {
        if(props.name == "btnNew"){
            return <Link onClick={displayAllNavigate} to="/New"><Button type="submit" className="common_button_vistas"><strong>{props.b}</strong></Button></Link>;
        }
    }

        return(
            <div className="fondo">
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
                            <TablaInicio usuario={props.usuario} name={props.name}/>
                        </tbody>
                    </Table>
                        {boton()}
                </Card>
            </div>
        );
}

export default CardNormal;