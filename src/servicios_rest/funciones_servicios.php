<?php
require "config_bd.php";
define ('MINUTOS',1);

function login_usuario($datos){
    try{
        $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
        $consulta="select * from Usuario where usuario=? and clave=?";
        $sentencia=$conexion->prepare($consulta);
        if($sentencia->execute($datos)){
            if($sentencia->rowCount()>0){
                $respuesta["usuario"]=$sentencia->fetch(PDO::FETCH_ASSOC);
            }else{
                $respuesta["mensaje"]="El usuario no se encuentra registrado en la BD";
            }
        }else{
            $respuesta["error"]= "Error en la consulta. Error n&uacute;mero:".$sentencia->errorInfo()[1]." : ".$sentencia->errorInfo()[2];
        }
        $sentencia=null;
        $conexion=null;
    }catch(PDOException $e){
        $respuesta["error"]="Imposible conectar:".$e->getMessage();
    }
    return $respuesta;
}

/**
 * 
 * FUNCIONES USUARIO NORMAL
 * 
 */
function reservas($datos){
    try{
        $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
        $consulta="select Plantilla.text_hora as hora, Reserva.fecha as fecha, Instalacion.deporte as pista, Instalacion.numero as numero, Reserva.estado as estado
                    from Usuario, Reserva, Plantilla, Instalacion 
                    where usuario=? and Usuario.id=Reserva.id_usuario and Reserva.id_plantilla=Plantilla.id and Instalacion.id=Reserva.id_instalacion";
        $sentencia=$conexion->prepare($consulta);
        if($sentencia->execute($datos)){
            if($sentencia->rowCount()>0){
                $respuesta["reservas"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            }else{
                $respuesta["mensaje"]="No tiene reservas";
            }
        }else{
            $respuesta["error"]= "Error en la consulta. Error n&uacute;mero:".$sentencia->errorInfo()[1]." : ".$sentencia->errorInfo()[2];
        }
        $sentencia=null;
        $conexion=null;
    }catch(PDOException $e){
        $respuesta["error"]="Imposible conectar:".$e->getMessage();
    }
    return $respuesta;
}


function obtenerDisponibles($datos){
    try{
        $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
        $consulta="SELECT Plantilla.text_hora as hora, Reserva.id as id, Instalacion.deporte as deporte, Instalacion.numero as numero 
                    FROM Plantilla, Reserva, Instalacion 
                    WHERE Plantilla.id=Reserva.id_plantilla and Instalacion.id=Reserva.id_instalacion and Reserva.estado=1 and Reserva.fecha=?";
        $sentencia=$conexion->prepare($consulta);
        if($sentencia->execute($datos)){
            $respuesta["disponibles"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
        }else{
            $respuesta["error"]= "Error en la consulta. Error n&uacute;mero:".$sentencia->errorInfo()[1]." : ".$sentencia->errorInfo()[2];
        }
        $sentencia=null;
        $conexion=null;
    }catch(PDOException $e){
        $respuesta["error"]="Imposible conectar:".$e->getMessage();
    }
    return $respuesta;
}

function obtenerFechas($datos){
    try{
        $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
        $consulta="SELECT DISTINCT fecha FROM Reserva where fecha>=?";
        $sentencia=$conexion->prepare($consulta);
        if($sentencia->execute($datos)){
            if($sentencia->rowCount()>0){
                $respuesta["fechas"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            }else{
                $respuesta["mensaje"]="No hay fechas disponibles";
            }
        }else{
            $respuesta["error"]= "Error en la consulta. Error n&uacute;mero:".$sentencia->errorInfo()[1]." : ".$sentencia->errorInfo()[2];
        }
        $sentencia=null;
        $conexion=null;
    }catch(PDOException $e){
        $respuesta["error"]="Imposible conectar:".$e->getMessage();
    }
    return $respuesta;
}

function obtenerDeportes($datos){
    try{
        $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
        $consulta="SELECT DISTINCT Instalacion.deporte FROM Reserva, Instalacion where fecha>=?";
        $sentencia=$conexion->prepare($consulta);
        if($sentencia->execute($datos)){
            if($sentencia->rowCount()>0){
                $respuesta["deportes"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            }else{
                $respuesta["mensaje"]="No hay deportes disponibles";
            }
        }else{
            $respuesta["error"]= "Error en la consulta. Error n&uacute;mero:".$sentencia->errorInfo()[1]." : ".$sentencia->errorInfo()[2];
        }
        $sentencia=null;
        $conexion=null;
    }catch(PDOException $e){
        $respuesta["error"]="Imposible conectar:".$e->getMessage();
    }
    return $respuesta;
}

function updateReserva($datos){
    try{
      $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
      $consulta = "update Reserva set estado=3, id_usuario=? where id=?";
      $sentencia = $conexion->prepare($consulta);
      if($sentencia->execute($datos)){
        $respuesta["mensaje"] = "Cambio realizado con éxito";
      }else{
        $respuesta["error"] = "Error en la consulta";
      }
      
      $conexion = null;
      $sentencia = null;
    }catch(PDOException $e){
      $respuesta["error"] = "Error en la conexion";
    }
    return $respuesta;
}

function obtenerPerfil($datos){
    try{
        $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
        $consulta="SELECT * FROM Usuario where id=?";
        $sentencia=$conexion->prepare($consulta);
        if($sentencia->execute($datos)){
            $respuesta["usuario"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
        }else{
            $respuesta["error"]= "Error en la consulta. Error n&uacute;mero:".$sentencia->errorInfo()[1]." : ".$sentencia->errorInfo()[2];
        }
        $sentencia=null;
        $conexion=null;
    }catch(PDOException $e){
        $respuesta["error"]="Imposible conectar:".$e->getMessage();
    }
    return $respuesta;
}

function updateTel($datos){
    try{
      $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
      $consulta = "update Usuario set telefono=? where id=?";
      $sentencia = $conexion->prepare($consulta);
      if($sentencia->execute($datos)){
        $respuesta["mensaje"] = "Cambio realizado con éxito";
      }else{
        $respuesta["error"] = "Error en la consulta";
      }
      
      $conexion = null;
      $sentencia = null;
    }catch(PDOException $e){
      $respuesta["error"] = "Error en la conexion";
    }
    return $respuesta;
}

function updateEmail($datos){
    try{
      $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
      $consulta = "update Usuario set email=? where id=?";
      $sentencia = $conexion->prepare($consulta);
      if($sentencia->execute($datos)){
        $respuesta["mensaje"] = "Cambio realizado con éxito";
      }else{
        $respuesta["error"] = "Error en la consulta";
      }
      
      $conexion = null;
      $sentencia = null;
    }catch(PDOException $e){
      $respuesta["error"] = "Error en la conexion";
    }
    return $respuesta;
}

/**
 * 
 * FUNCIONES USUARIO ADMIN
 * 
 */

function obtenerInstalaciones(){
    try{
        $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
        $consulta="SELECT * FROM Instalacion";
        $sentencia=$conexion->prepare($consulta);
        if($sentencia->execute()){
            if($sentencia->rowCount()>0){
                $respuesta["instalaciones"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
            }else{
                $respuesta["mensaje"]="No hay deportes disponibles";
            }
        }else{
            $respuesta["error"]= "Error en la consulta. Error n&uacute;mero:".$sentencia->errorInfo()[1]." : ".$sentencia->errorInfo()[2];
        }
        $sentencia=null;
        $conexion=null;
    }catch(PDOException $e){
        $respuesta["error"]="Imposible conectar:".$e->getMessage();
    }
    return $respuesta;
}

function obtenerOcupadas($datos){
    try{
        $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
        $consulta="SELECT Plantilla.text_hora as hora, Instalacion.deporte as deporte, Instalacion.numero as numero 
                    FROM Plantilla, Reserva, Instalacion 
                    WHERE Plantilla.id=Reserva.id_plantilla and Instalacion.id=Reserva.id_instalacion and Reserva.estado<>1 and Reserva.fecha=?";
        $sentencia=$conexion->prepare($consulta);
        if($sentencia->execute($datos)){
            $respuesta["ocupadas"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
        }else{
            $respuesta["error"]= "Error en la consulta. Error n&uacute;mero:".$sentencia->errorInfo()[1]." : ".$sentencia->errorInfo()[2];
        }
        $sentencia=null;
        $conexion=null;
    }catch(PDOException $e){
        $respuesta["error"]="Imposible conectar:".$e->getMessage();
    }
    return $respuesta;
}

function obtenerInstalacionesId($DATOS){
    try{
        $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
        $consulta="SELECT id FROM Instalacion WHERE numero > ? and deporte=?";
        $sentencia=$conexion->prepare($consulta);
        if($sentencia->execute($DATOS)){
            $respuesta["instalacionesId"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
        }else{
            $respuesta["error"]= "Error en la consulta. Error n&uacute;mero:".$sentencia->errorInfo()[1]." : ".$sentencia->errorInfo()[2];
        }
        $sentencia=null;
        $conexion=null;
    }catch(PDOException $e){
        $respuesta["error"]="Imposible conectar:".$e->getMessage();
    }
    return $respuesta;
}


function deleteReserva($datos){
    try{
        $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
        $consulta = "delete from Reserva where id_instalacion=?";
        $sentencia = $conexion->prepare($consulta);
        if($sentencia->execute($datos)){
          $respuesta["mensaje"] = "Reserva borrada con éxito";
        }else{
          $respuesta["error"] = "Error en la consulta";
        }
        $conexion = null;
        $sentencia = null;
      }catch(PDOException $e){
        $respuesta["error"] = "Error en la conexion";
      }
      return $respuesta;
}

function deletePlantilla($datos){
    try{
        $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
        $consulta = "delete from Plantilla where id_instalacion=?";
        $sentencia = $conexion->prepare($consulta);
        if($sentencia->execute($datos)){
          $respuesta["mensaje"] = "Plantilla borrada con éxito";
        }else{
          $respuesta["error"] = "Error en la consulta";
        }
        $conexion = null;
        $sentencia = null;
      }catch(PDOException $e){
        $respuesta["error"] = "Error en la conexion";
      }
      return $respuesta;
}

function deleteInstalacion($datos){
    try{
        $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
        $consulta = "delete from Instalacion where id=?";
        $sentencia = $conexion->prepare($consulta);
        if($sentencia->execute($datos)){
          $respuesta["mensaje"] = "Instalacion borrada con éxito";
        }else{
          $respuesta["error"] = "Error en la consulta";
        }
        $conexion = null;
        $sentencia = null;
      }catch(PDOException $e){
        $respuesta["error"] = "Error en la conexion";
      }
      return $respuesta;
}

function obtenerInstalacionId($DATOS){
    try{
        $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
        $consulta="SELECT id FROM Instalacion WHERE numero=? and deporte=?";
        $sentencia=$conexion->prepare($consulta);
        if($sentencia->execute($DATOS)){
            $respuesta["instalacionesId"]=$sentencia->fetchAll(PDO::FETCH_ASSOC);
        }else{
            $respuesta["error"]= "Error en la consulta. Error n&uacute;mero:".$sentencia->errorInfo()[1]." : ".$sentencia->errorInfo()[2];
        }
        $sentencia=null;
        $conexion=null;
    }catch(PDOException $e){
        $respuesta["error"]="Imposible conectar:".$e->getMessage();
    }
    return $respuesta;
}

function insertarInstalacion($datos){
    try{
      $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
      $consulta = "insert into Instalacion (numero, deporte) value (?,?)";
      $sentencia = $conexion->prepare($consulta);
      if($sentencia->execute($datos)){
        $respuesta["mensaje"] = "Instalacion insertada con éxito";
      }else{
        $respuesta["error"] = "Error en la consulta";
      }
      $conexion = null;
      $sentencia = null;
    }catch(PDOException $e){
      $respuesta["error"] = "Error en la conexion";
    }
    return $respuesta;
}

function insertarPlantilla($datos){
    try{
      $conexion= new PDO("mysql:host=".SERVIDOR_BD.";dbname=".NOMBRE_BD,USUARIO_BD,CLAVE_BD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES 'utf8'"));
      $consulta = "insert into Plantilla (text_hora, precio, estado, id_instalacion) value (?, 5, 1, ?)";
      $sentencia = $conexion->prepare($consulta);
      if($sentencia->execute($datos)){
        $respuesta["mensaje"] = "Plantilla insertada con éxito";
      }else{
        $respuesta["error"] = "Error en la consulta";
      }
      $conexion = null;
      $sentencia = null;
    }catch(PDOException $e){
      $respuesta["error"] = "Error en la conexion";
    }
    return $respuesta;
}

function updateInstalacionesMenor($datos){
    //1º Insertar nueva Instalacion con deporte y num

    //2º Insertar Nuevas Plantillas con id anterior
}

