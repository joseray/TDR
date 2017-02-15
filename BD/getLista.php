<?php
require('conexion.php');

$sql = 'SELECT idListas, nombreLista, consecutivoLista, subLista FROM listas';

$result_getLista = mysqli_query($enlace, $sql);
if ($result_getLista) {
  while ($row = mysqli_fetch_array($result_getLista)) {
      $listas[] = array('idLista'=> $row['idListas'], 'nombreLista'=> utf8_encode($row['nombreLista']), 'consecutivoLista'=> $row['consecutivoLista'], 'subLista'=> $row['subLista']);
    }
  }
mysqli_close($enlace);
echo json_encode($listas);
?>
