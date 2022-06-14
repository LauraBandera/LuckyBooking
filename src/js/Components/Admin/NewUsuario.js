import { Component, useState } from "react";
import validator from "validator";
import $ from 'jquery';
import md5 from 'md5';
import { Button, Card, CardTitle } from "reactstrap";
import '../../../css/NewUsuario.css';
import { Table } from "reactstrap";

function NewUsuario(props){

    const[usuario, setUsuario] = useState('');
    const[password, setPassword] = useState('');
    const[nombre, setNombre] =useState('');
    const[apellidos, setApellidos] = useState('');
    const[email, setEmail] = useState('');
    const[telefono, setTelefono] =useState('');

    const handleChange = async (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case "user":
                setUsuario(e.target.value);
                console.log(usuario);
                break;
            case "password":
                setPassword(e.target.value);
                console.log(password);
                break;
            case "nombre":
                setNombre(e.target.value);
                console.log(nombre);
                break;
            case "apellidos":
                setApellidos(e.target.value);
                console.log(apellidos);
                break;
            case "email":
                setEmail(e.target.value);
                console.log(email);
                break;
            case "telefono":
                setTelefono(e.target.value);
                console.log(telefono);
        }        
    }

    const validacionEmail = () => {
        let valido = true;
        if (!validator.isEmail(this.state.email)) {
            valido = false;
        }
        return valido;
    }

    const obtenerValores = () => {
        let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
        let t = [];
        let row = [];
        $.ajax({
            url: DIR_SERV + '/obtenerUsuarios',
            method: "GET",
            dataType: "json",
            async: false
        })
            .done(function (data) {
                if(data.usuarios){
                    $.each(data.usuarios, function (key, value){
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

    const addUser = (e) => {
        e.preventDefault();
        if(usuario == '' || password == '' || nombre == '' || apellidos == '' || email == '' || telefono == ''){
            $('.error_new').css({display: 'block'});
        }else if(obtenerValores().find(item => item[0] == usuario)){
            $('#usuario_repetido').css({display: 'block'});
        }else if(telefono.length == 9 && validacionEmail){
            let DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
            $.ajax({
                url: encodeURI(DIR_SERV + "/addUser"),
                type: "POST",
                dataType: "json",
                data: { 
                    "usuario": usuario, 
                    "clave": md5(password), 
                    "nombre": nombre, 
                    "apellido": apellidos, 
                    "telefono": telefono, 
                    "email": email
                }
                }).done(function(data) {
                    if(data.mensaje){
                        console.log('INSERTADO CON ÉXITO');
                        $('.error').css({display: 'none'});
                        $('.error_new').css({display: 'none'});
                        $('#confirmacion_new').css({display: 'block'});
                    }else{
                        console.log(data.error);
                    }
                }).fail(function() {
                    console.log('ERROR');
            });
        }else{
            if(telefono != 9){
                $('.error_tel').css({display: 'block'});
            }else{
                $('.error_tel').css({display: 'none'});
            }
        }       
    }

    let objRow=obtenerValores().map(fila=>{
        return(
            <tr>
                <td>{fila[0]}</td>
                <td>{fila[1]}</td>
                <td>{fila[2]}</td>
                <td>{fila[3]}</td>
                <td>{fila[4]}</td>

            </tr>                
        );
    });

    return (
        <div id='newUser'>
            <h2>Nuevo Usuario</h2>
            <div id='confirmacion_new'><strong>Usuario Insertado con Éxito</strong></div>
            <form id='newUserForm' onSubmit={addUser}>
                <div className="error_new"><strong>Debe rellenar todos los valores</strong></div>
                <label>Usuario:</label>
                <div id='usuario_repetido'>Usuario repetido</div>
                <input onChange={handleChange} type='text' name='user' id='user'/>
                <br/>
                <label>Contraseña:</label>
                <input onChange={handleChange} type='password' name='password' id='password'/>
                <br/>
                <label>Nombre:</label>
                <input onChange={handleChange} type='text' name='nombre' id='nombre'/>
                <br/>
                <label>Apellidos:</label>
                <input onChange={handleChange} type='text' name='apellidos' id='apellidos'/>
                <br/>
                <label>Email:</label>
                <input onChange={handleChange} type='email' name='email' id='email'/>
                <br/>
                <label>Teléfono:</label>
                <div className="error_tel">El teléfono debe tener 9 cifras</div>
                <input onChange={handleChange} type='number' name='telefono' id='telefono'/>
                <br/>
                <Button type="submit" className="common_button_vistas">Guardar Usuario</Button>
            </form>
            <Card id='EspecialCard'>
                <CardTitle>Usuarios</CardTitle>
                <Table>
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                    </tr>
                    {objRow}
                </Table>
            </Card>
        </div>
    );
    
}

export default NewUsuario;