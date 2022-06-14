<?php
session_name("lucky_booking_21_22");
session_start();

require "funciones_servicios.php";
require __DIR__ . '/Slim/autoload.php';

//Necesario para poder usarlo en ordenadores Mac
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With');

$app= new \Slim\App;

$app->get('/salir',function(){
    session_destroy();
    echo json_encode( array("nada"=>"nada"), JSON_FORCE_OBJECT);
});

$app->post('/login',function($request){
    $datos[]=$request->getParam('usuario');
    $datos[]=$request->getParam('clave');
    
    echo json_encode( login_usuario($datos), JSON_FORCE_OBJECT);
});

$app->get('/reservas/{usuario}',function($request){
    $datos[] = $request->getAttribute("usuario");
  
    echo json_encode(reservas($datos), JSON_FORCE_OBJECT);
});

$app->get('/disponibles/{fecha}',function($request){
    $datos[] = $request->getAttribute("fecha");

    echo json_encode(obtenerDisponibles($datos), JSON_FORCE_OBJECT);
});

$app->get('/fechas/{actual}',function($request){
    $datos[] = $request->getAttribute("actual");
  
    echo json_encode(obtenerFechas($datos), JSON_FORCE_OBJECT);
});

$app->get('/deportes/{actual}',function($request){
    $datos[] = $request->getAttribute("actual");
  
    echo json_encode(obtenerDeportes($datos), JSON_FORCE_OBJECT);
});

$app->post('/updateReserva/{id_usuario}/{id}',function($request){
    $datos[] = $request->getAttribute("id_usuario");
    $datos[] = $request->getAttribute("id");
  
    echo json_encode(updateReserva($datos), JSON_FORCE_OBJECT);
});

$app->get('/perfil/{id_usuario}',function($request){
    $datos[] = $request->getAttribute("id_usuario");
  
    echo json_encode(obtenerPerfil($datos), JSON_FORCE_OBJECT);
});

$app->post('/updateEmail/{email}/{id}',function($request){
    $datos[] = $request->getAttribute("email");
    $datos[] = $request->getAttribute("id");
  
    echo json_encode(updateEmail($datos), JSON_FORCE_OBJECT);
});

$app->post('/updateTel/{tel}/{id}',function($request){
    $datos[] = $request->getAttribute("tel");
    $datos[] = $request->getAttribute("id");
  
    echo json_encode(updateTel($datos), JSON_FORCE_OBJECT);
});

$app->get('/instalaciones',function(){
  
    echo json_encode(obtenerInstalaciones(), JSON_FORCE_OBJECT);
});

$app->get('/ocupadas/{fecha}',function($request){
    $datos[] = $request->getAttribute("fecha");

    echo json_encode(obtenerOcupadas($datos), JSON_FORCE_OBJECT);
});

$app->get('/instalacionesId/{numero}/{deporte}',function($request){
    $datos[] = $request->getAttribute("numero");
    $datos[] = $request->getAttribute("deporte");

    echo json_encode(obtenerInstalacionesId($datos), JSON_FORCE_OBJECT);
});

$app->post('/deleteReserva/{id_instalacion}',function($request){
    $datos[] = $request->getAttribute("id_instalacion");

    echo json_encode(deleteReserva($datos), JSON_FORCE_OBJECT);
});

$app->post('/deletePlantilla/{id_instalacion}',function($request){
    $datos[] = $request->getAttribute("id_instalacion");

    echo json_encode(deletePlantilla($datos), JSON_FORCE_OBJECT);
});

$app->post('/deleteInstalacion/{id}',function($request){
    $datos[] = $request->getAttribute("id");

    echo json_encode(deleteInstalacion($datos), JSON_FORCE_OBJECT);
});

$app->post('/insertarInstalacion/{numero}/{deporte}',function($request){
    $datos[] = $request->getAttribute("numero");
    $datos[] = $request->getAttribute("deporte");
  
    echo json_encode(insertarInstalacion($datos), JSON_FORCE_OBJECT);
});

$app->get('/insertarPlantilla/{fecha}/{id_instalacion}',function($request){
    $datos[] = $request->getAttribute("fecha");
    $datos[] = $request->getAttribute("id_instalacion");
  
    echo json_encode(insertarPlantilla($datos), JSON_FORCE_OBJECT);
});

$app->get('/instalacionId/{numero}/{deporte}',function($request){
    $datos[] = $request->getAttribute("numero");
    $datos[] = $request->getAttribute("deporte");

    echo json_encode(obtenerInstalacionId($datos), JSON_FORCE_OBJECT);
});

$app->get('/pistas/{actual}',function($request){
    $datos[] = $request->getAttribute("actual");
  
    echo json_encode(obtenerPistas($datos), JSON_FORCE_OBJECT);
});

$app->get('/todasFechas/{actual}',function($request){
    $datos[] = $request->getAttribute("actual");
  
    echo json_encode(obtenerTodasFechas($datos), JSON_FORCE_OBJECT);
});

$app->get('/generarDia/{fecha}',function($request){
    $datos[] = $request->getAttribute("fecha");
  
    echo json_encode(generarDia($datos), JSON_FORCE_OBJECT);
});

$app->post('/addUser',function($request){
    $datos[] = $request->getParam("usuario");
    $datos[] = $request->getParam("clave");
    $datos[] = $request->getParam("nombre");
    $datos[] = $request->getParam("apellido");
    $datos[] = $request->getParam("telefono");
    $datos[] = $request->getParam("email");
  
    echo json_encode(addUser($datos), JSON_FORCE_OBJECT);
});

$app->get('/obtenerUsuarios',function(){
  
    echo json_encode(obtenerUsuarios(), JSON_FORCE_OBJECT);
});

// Una vez creado servicios los pongo a disposición
$app->run();
?>
