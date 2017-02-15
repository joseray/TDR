<?php
require('conexion.php');
$sublista = strip_tags($_POST['idSubLista']);

function getSubCriterios($enlace, $id_subdomimio){
  mysqli_next_result ($enlace);
  $sqlCriterios = 'CALL select_subcriteriosXsubLista('.mysqli_real_escape_string($enlace, $id_subdomimio).')';
  $result_criterios = mysqli_query($enlace, $sqlCriterios);
  if ($result_criterios) {
    while ($row = mysqli_fetch_array($result_criterios)) {
        $subcriterios[] = array('idsubcriterio'=> $row['idsubcriterio'], 'nombresubcriterio'=> utf8_encode($row['nombreSubCriterio']));
      }
      return $subcriterios;
  }
}

$sqlDominios = 'CALL select_subdominiosXsubLista('.mysqli_real_escape_string($enlace, $sublista).')';

$result_dominios = mysqli_query($enlace, $sqlDominios);
if ($result_dominios) {
  $dominios = array();
  $criterios = array();

    while ($row = mysqli_fetch_array($result_dominios)) {
      $id_subdomimio = $row['idsubdominio'];
        $subdominios[] = array('idsubdominio'=> $row['idsubdominio'], 'nameSubdominio'=> utf8_encode($row['nameSubDominio']), 'subcriterios'=> getSubCriterios($enlace, $id_subdomimio));
    }
    echo json_encode($subdominios);
}
mysqli_close($enlace);
 ?>
