<?php
require('conexion.php');

$lista = $_POST['data'];
$listadecode = json_decode($lista, true);

$horaIngreso = false;

foreach ($listadecode as $item => $criterio){
    if ($item == "horaIngresoPaciente") {
      $horaIngreso = true;
      return;
    }
}

if ($horaIngreso) {
  $CHCP = $listadecode['concecutivo'].$listadecode['cedula'].$listadecode['dia'];
  $sqlDatsGenerales = 'CALL insertPaciente("'.mysqli_real_escape_string($enlace, $CHCP).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['tdpaciente']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['ips']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['servicio']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['barrio']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['estrato']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['diaEntraPaciente']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['horaIngresoPaciente']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['diaSalePaciente']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['horaEgresoPaciente']).'",
                                            '.mysqli_real_escape_string($enlace, $listadecode['diasAtencionPaciente']).',
                                            '.mysqli_real_escape_string($enlace, $listadecode['edadPaciente']).',
                                            "'.mysqli_real_escape_string($enlace, $listadecode['sexoPaciente']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['tipoRegimen']).'")';
}else {
  $CHCP = $listadecode['concecutivo'].$listadecode['cedula'].$listadecode['dia'];
  $sqlDatsGenerales = 'CALL insertPaciente("'.mysqli_real_escape_string($enlace, $CHCP).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['tdpaciente']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['ips']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['servicio']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['barrio']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['estrato']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['diaEntraPaciente']).'",
                                            NULL,
                                            "'.mysqli_real_escape_string($enlace, $listadecode['diaSalePaciente']).'",
                                            NULL,
                                            '.mysqli_real_escape_string($enlace, $listadecode['diasAtencionPaciente']).',
                                            '.mysqli_real_escape_string($enlace, $listadecode['edadPaciente']).',
                                            "'.mysqli_real_escape_string($enlace, $listadecode['sexoPaciente']).'",
                                            "'.mysqli_real_escape_string($enlace, $listadecode['tipoRegimen']).'")';
}

$result_datos_generales = mysqli_query($enlace, $sqlDatsGenerales);
if ($result_datos_generales) {
  $row = mysqli_fetch_array($result_datos_generales, MYSQLI_ASSOC);
  $respuesta['idPaciente'] = $row["idpaciente"];
  echo json_encode($respuesta);
}
mysqli_close($enlace);
?>
