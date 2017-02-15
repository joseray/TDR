<?php
require('Constantes.php');

$db = mysqli_init();
    $db->ssl_set("SSL/4a3ace49077102-key.pem", "SSL/4a3ace49077102-cert.pem", "cleardb-ca.pem", null, null);
    $db->real_connect("us-cdbr-iron-east-04.cleardb.net", "bedc3ba99f7c67", "6d7b5f329401b1e", "ad_e56042784268c04");

//Se almacena la conexion en la variable $enlace,
$enlace = $db;
//La condiciona que permite verificar que se logro conectar y envia el respective mensaje en cualquiera de los casos
if (!$enlace) {
    die('Error de Conexión (' . mysqli_connect_errno() . ') '
            . mysqli_connect_error());
}

 ?>
