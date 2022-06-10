import logo from "../../../img/logo_lucky_booking_light.png";
import { Icon } from '@iconify/react';
import {Button } from "reactstrap";
import $ from 'jquery';
import { Link } from "react-router-dom";

function Header(){
    const displayNone = () => {
        $("div").css({ display: "none" });
        $("header").css({ display: "none" });
        $("div#root").css({ display: "block" });
        $("div#body").css({ display: "block" });
        $("div#menu").css({ display: "block" });
        $("div#header").css({ display: "block" });
        $("div#footer-menu").css({ display: "block" });
        $("div#contenido-footer").css({ display: "block" });
        $("body").css({overflowY: "hidden"});
    }

    const displayAll = () => {
        $("div").css({ display: "block" });
        $("header").css({ display: "block" });
        $("div#menu").css({ display: "none" });
        $("div#footer-menu").css({ display: "none" });
    }
    
    return(
        <header>
            <Link onClick={displayAll} to="/"><img id="App-logo" src={logo} alt="logo" /></Link>
            <Icon onClick={displayNone} id="hamburger" icon="dashicons:menu"/>
        </header>
    );
}

export default Header;