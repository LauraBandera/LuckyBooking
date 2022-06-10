import { Card, CardTitle, Table, Button } from "reactstrap";
import TablaAdmin from "./TablaAdmin";
import $ from 'jquery';
import { Link } from "react-router-dom";

function CardAdmin(props){

    const displayAllNavigate = () => {
        $("div").css({ display: "block" });
        $("header").css({ display: "block" });
        $("div#menu").css({ display: "none" });
        $("div.fondo").css({ display: "none" });
        $("body").css({overflowY: "scroll"});
    }

    
    const boton = () => {
        if(props.titulo != "Instalaciones"){
            return <Link onClick={displayAllNavigate} to="/ReservasDiarias"><Button type="submit" className="common_button_vistas"><strong>{props.titulo}</strong></Button></Link>;
        }else{
            return <Link onClick={displayAllNavigate} to="/Instalaciones"><Button type="submit" className="common_button_vistas"><strong>{props.titulo}</strong></Button></Link>;
        }
    }

    return (
        <div className="fondo">
            <Card>
                <CardTitle tag="h2">{props.titulo}</CardTitle>
                <Table hover>
                    <tbody>
                        <TablaAdmin titulo={props.titulo}/>
                    </tbody>
                </Table>
                {boton()}
            </Card>
        </div>
    );
}

export default CardAdmin;