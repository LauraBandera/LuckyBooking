import { useEffect, useState } from "react";
import { Button, Card, CardTitle } from "reactstrap";
import '../../../css/Perfil.css';
import $ from 'jquery';
import validator from "validator";

function Perfil(props){

    const [usuario, setUsuario] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState(null);
    const [newTelefono, setNewTelefono] = useState(null);
    const [newEmail, setNewEmail] = useState(null);

    useEffect( () => {
        obtenerPerfil().map((listado) => {
            listado.map(
               (tupla) => {
                    switch (tupla[0]) {
                        case "usuario":
                            setUsuario(tupla[1]);
                            break;
                        case "nombre":
                            setNombre(tupla[1]);
                            break;
                        case "apellido":
                            setApellidos(tupla[1]);
                            break;
                        case "email":
                            setEmail(tupla[1]);
                            break;
                        case "telefono":
                            setTelefono(tupla[1]);
                    }   
                }
            )}
        );
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if((!newTelefono || newTelefono.length == 9) &&  (!newEmail|| validacionEmail)){
            if(newTelefono){
                let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
                $.ajax({
                    url: encodeURI(DIR_SERV + "/updateTel/" + newTelefono + "/" + props.id),
                    type: "POST",
                    dataType: "json"
                }).done(function(data) {
                    if(data.mensaje){
                        console.log(DIR_SERV + "/updateTel/" + newTelefono + "/" + props.id);
                        console.log('INSERTADO CON ÉXITO');
                        $('.error').css({display: 'none'});
                        setTelefono(newTelefono);
                    }else{
                        console.log(data.error);
                    }
                }).fail(function() {
                    console.log('ERROR');
                });
            }
            
            if(newEmail){
                let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
                $.ajax({
                    url: encodeURI(DIR_SERV + "/updateEmail/" + newEmail + "/" + props.id),
                    type: "POST",
                    dataType: "json"
                }).done(function(data) {
                    if(data.mensaje){
                        setEmail(newEmail);
                    }else{
                        console.log(data.error);
                    }
                }).fail(function() {
                    console.log('ERROR');
                });
            }
        }else{
            if(newTelefono != 9){
                $('.error').css({display: 'block'});
            }else{
                $('.error').css({display: 'none'});
            }
        }       
    }

    const handleChange = async (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case "email":
                setNewEmail(e.target.value);
                break;
            case "telefono":
                setNewTelefono(e.target.value);
                console.log(newTelefono + " " + e.target.value);
        }        
    }

    const validacionEmail = () => {
        let valido = true;
        if (!validator.isEmail(newEmail)) {
            valido = false;
        }
        return valido;
    }

    const obtenerPerfil = () => {
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        let t = [];
        let row = [];
        $.ajax({
            url: DIR_SERV + '/perfil/' + props.id,
            method: "GET",
            dataType: "json",
            async: false
        })
            .done(function (data) {
                if(data.usuario){
                    $.each(data.usuario, function (key, value){
                        row = [];
                        $.each(value, function (key, columns){
                            row.push([key,columns]);
                        });
                        t.push(row);
                    });
                }else{
                    console.log("error");
                }
            })
            .fail(function () {
                console.log("ERROR");
            });

            return t;
    }

    return(
        <form id="perfil" onSubmit={handleSubmit}>
            <Card>
                <CardTitle><strong>Información</strong></CardTitle>
                <p><strong>Usuario:</strong><br/>{usuario}</p>
                <p><strong>Nombre:</strong><br/>{nombre}</p>
                <p><strong>Apellidos:</strong><br/>{apellidos}</p>
                <p>
                    <strong>Email:</strong><br/>{email}
                    <input placeholder="Nuevo Email" id='email_perfil' type='email' name='email' maxLength='20' onChange={handleChange}/>
                </p>
                <p>
                    <strong>Teléfono:</strong><br/>{telefono}<br/>
                    <p className="error">El télefono debe ser de 9 cifras</p>
                    <input placeholder="Nuevo Teléfono" id='tel_perfil' type='number' name='telefono' onChange={handleChange}/>
                </p>
            </Card>
            <Button className="common_button_vistas">Guardar Perfil</Button>
        </form>
    );
}

export default Perfil;