<?php
require('conexion.php');
$lista = strip_tags($_POST['idLista']);

function getCriterios($enlace, $id_domimio){
  mysqli_next_result ($enlace);
  $sqlCriterios = 'CALL select_criteriosXLista('.mysqli_real_escape_string($enlace, $id_domimio).')';
  $result_criterios = mysqli_query($enlace, $sqlCriterios);
  if ($result_criterios) {
    while ($row = mysqli_fetch_array($result_criterios)) {
        $criterios[] = array('idCriterio'=> $row['idcriterios'], 'nombrecriterio'=> utf8_encode($row['nombreCriterio']));
      }
      return $criterios;
  }
}

$sqlDominios = 'CALL select_dominiosXLista('.mysqli_real_escape_string($enlace, $lista).')';

$result_dominios = mysqli_query($enlace, $sqlDominios);
if ($result_dominios) {
  $dominios = array();
  $criterios = array();

    while ($row = mysqli_fetch_array($result_dominios)) {
      $id_domimio = $row['iddominio'];
        $dominios[] = array('iddominio'=> $row['iddominio'], 'nombredominio'=> utf8_encode($row['nombreDominio']), 'criterios'=> getCriterios($enlace, $id_domimio));
    }
    echo json_encode($dominios);
}
mysqli_close($enlace);
 ?>
