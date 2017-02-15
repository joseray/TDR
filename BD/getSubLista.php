<?php
require('conexion.php');
$lista = strip_tags($_POST['idLista']);

$sql = 'SELECT sb.idsubLista, sb.NombreSubLista FROM tdr.listas l INNER JOIN tdr.sublista sb ON sb.idLista = l.idListas WHERE l.idListas = '.mysqli_real_escape_string($enlace, $lista).'';

$result_getSubLista = mysqli_query($enlace, $sql);
if ($result_getSubLista) {
  while ($row = mysqli_fetch_array($result_getSubLista)) {
      $sublista[] = array('idsubLista'=> $row['idsubLista'], 'NombreSubLista'=> utf8_encode($row['NombreSubLista']));
    }
  }
mysqli_close($enlace);
echo json_encode($sublista);

?>
