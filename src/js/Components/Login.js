import '../../css/App.css';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Outlet, Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import md5 from 'md5';
import logo from "../../img/logo_lucky_booking_light.png";
import $ from 'jquery';

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordIcon, setPasswordIconShown] = useState("ant-design:eye-invisible-filled");

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
        if (passwordIcon == "ant-design:eye-filled") {
            setPasswordIconShown("ant-design:eye-invisible-filled");
        } else {
            setPasswordIconShown("ant-design:eye-filled");
        }
    };

    const handleChange = (e) => {
        switch (e.target.name) {
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          "usuario": email,
          "clave": md5(password)
        };
        begin();
      }

    const DIR_SERV = "http://localhost/Proyectos/lucky_booking_/src/servicios_rest";
    
    const begin = () => {
        $.ajax({
            url: DIR_SERV + '/login',
            method: "POST",
            dataType: "json",
            data: { "usuario": email, "clave": md5(password)}
        })
            .done(function (data) {
                if (data.usuario) {
                    props.acceder(true, data.usuario.usuario, data.usuario.id, data.usuario.tipo);
                }
                else if (data.error) {
                    props.acceder(false, "", "", "");
                }
                else if (data.mensaje) {
                    props.acceder(false, "", "", "");
                    $("#error_login").removeClass("oculto");
                }
    
            })
            .fail(function () {
                props.acceder(false, "", "", "");
            });
    }

    return(
        <div className='login'>
        <form onSubmit={handleSubmit} className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br/>
          <input className='login_input' name='email' type="text" placeholder='Usuario' onChange={handleChange}/>
          <div>
            <input placeholder="Contraseña" name='password' type={passwordShown ? "text" : "password"} onChange={handleChange}/> <Icon onClick={togglePassword} color={"#F2F2F2"}className="big_icon" icon={passwordIcon}/>
          </div>
          <div id='error_login' className='oculto error'>Usuario/Contraseña no valido</div>
          <Button type='submit' className="common_button">Login</Button>
          <Button type='submit' value={"nuevo"} className="common_button double_width">Nuevo Registro</Button>
        </form>
      </div>
    );
    
}

export default Login;