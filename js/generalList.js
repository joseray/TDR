function contador(){

  var fecha_entrada = $('#diaEntradaPaciente').val();
  var fecha_salida = $('#diaSalidaPaciente').val();
  if(fecha_entrada && fecha_salida){
    var aFecha1 = moment(fecha_entrada);
    var aFecha2 = moment(fecha_salida);
    var diferencia = aFecha2.diff(aFecha1, 'days');
    $('#diasAtencion').val(diferencia);
  }
  else {
    $('#diasAtencion').val("0");
  }
}

window.addEventListener('load', fecha, false);
function fecha() {

  var select = $('#tipoLista');

  $.ajax({
      type: "POST",
      url: "BD/getLista.php",
      success: function (respuesta) {
        var listas = jQuery.parseJSON(respuesta);
        $.each(listas, function(key, value){
            select.append('<option value=' + value.idLista + ' consecutivo=' + value.consecutivoLista + ' subLista=' + value.subLista + '>' + value.nombreLista + '</option>');
        });
      }
    });

  var f = new Date();
  var D = "" + (f.getDate());
  var DD = "0" + D;
  DD = DD.substring(DD.length-2, DD.length);
  var M = "" + (f.getMonth()+1);
  var MM = "0" + M;
  MM = MM.substring(MM.length-2, MM.length);
  var fecha = MM + DD;
  document.getElementById('fechaDiagnostico').value = fecha;
}

function tipoLista(sel) {
var selected = sel.options[sel.selectedIndex].text;

$('#titulo1').text("Lista de Chequeo " + selected);

var subLista = $("#tipoLista option:selected").attr("subLista");
var consecutivo = $("#tipoLista option:selected").attr("consecutivo");
$('#concecutivo').val(consecutivo);
datosPaciente = document.getElementById("datosPaciente");
datosPaciente.style.display="";
if (subLista == 1) {

  var idLista = sel.options[sel.selectedIndex].value;
  var dataString = 'idLista=' + idLista;
  var selectSubLista = $('#selectsubLista');

  $.ajax({
      type: "POST",
      url: "BD/getSubLista.php",
      data: dataString,
      dataType: "json",
      success: function (respuesta) {

        var cantidadOpnciones = $("#selectsubLista").find("option").length;
        var opciones = $("#selectsubLista").find("option").length;
        if (cantidadOpnciones == 1) {
          $.each(respuesta, function(key, value){
              selectSubLista.append("<option value=" + value.idsubLista + " subLista='1'>" + value.NombreSubLista + "</option>");
            });
          }
          else {
            for (var i = 0; i < cantidadOpnciones ; i++) {
              $("#selectsubLista").find("option[value='"+ i +"']").remove();
            }
            selectSubLista.append("<option value='0' subLista='1'></option>");
            $.each(respuesta, function(key, value){
                selectSubLista.append("<option value=" + value.idsubLista + " subLista='1'>" + value.NombreSubLista + "</option>");
              });
          }
        }
      });

      $.ajax({
          type: "POST",
          url: "BD/selectLista.php",
          data: dataString,
          dataType: "json",
          success: function (respuesta) {
            if ($('div#dominio').length !=0) {
              $("div#dominio").remove();
              $("div#criterio").remove();
              $("select#respuesta").remove();
              $("input#observaciones").remove();
            }
              var criterioslista;

              $.each(respuesta, function(i, item1){
                criterioslista = item1.criterios;

                $('#dominioPadre').append("<div class='dominio' id='dominio' style='height: 34px;'>" +item1.nombredominio+ "</div>");

                for (var i = 0; i < criterioslista.length - 1; i++) {
                  $('#dominioPadre').append("<div class='dominio' id='dominio' style='height: 34px;'>.</div>");
                }
                    $.each(criterioslista, function(a, item){
                      $('#criterioPadre').append("<div class='criterio' id='criterio' style='height: 34px;'>"  +item.nombrecriterio+ "</div>");
                      var select = "<select name='select_tp_dcmt' class='form-control' autofocus='' id='respuesta' idCriterio= '"+ item.idCriterio +"' >\
                      <option value='01'>SI</option>\
                      <option value='02'>NO</option>\
                      <option value='01'>N/A</option>";
                      $('#padrerespuesta').append(select);
                      var inputobservaciones = "<input type='text' name='' value='' class='form-control' id='observaciones'>";
                      $('#padreobservaciones').append(inputobservaciones);
                    });
                });
              }
        });

  $("#divSubLista").css("display", "");
}else {
  $("div#dominio").remove();
  $("div#criterio").remove();
  $("select#respuesta").remove();
  $("input#observaciones").remove();

var subLista = $("#selectsubLista option:selected").attr("subLista");

if (subLista == 1){
  $("div#sudDominio").remove();
  $("div#subcriterio").remove();
  $("select#subRespuesta").remove();
  $("input#subobservaciones").remove();
}

  $("#subListaLoaded").css("display", "none");
  $("#divSubLista").css("display", "none");


  var value = sel.options[sel.selectedIndex].value;
  var dataString = 'idLista=' + value;

  $.ajax({
      type: "POST",
      url: "BD/selectLista.php",
      data: dataString,
      dataType: "json",
      success: function (respuesta) {
          var criterioslista;

          $.each(respuesta, function(i, item1){
            criterioslista = item1.criterios;

            $('#dominioPadre').append("<div class='dominio' id='dominio' style='height: 34px;'>" +item1.nombredominio+ "</div>");

            for (var i = 0; i < criterioslista.length - 1; i++) {
              $('#dominioPadre').append("<div class='dominio' id='dominio' style='height: 34px;'>.</div>");
            }
                $.each(criterioslista, function(a, item){
                  $('#criterioPadre').append("<div class='criterio' id='criterio' style='height: 34px;'>"  +item.nombrecriterio+ "</div>");
                  var select = "<select name='select_tp_dcmt' class='form-control' autofocus='' id='respuesta' idCriterio= '"+ item.idCriterio +"' >\
                  <option value='01'>SI</option>\
                  <option value='02'>NO</option>\
                  <option value='01'>N/A</option>";
                  $('#padrerespuesta').append(select);
                  var inputobservaciones = "<input type='text' name='' value='' class='form-control' id='observaciones'>";
                  $('#padreobservaciones').append(inputobservaciones);
                });
            });
          }
    });
}

if (selected == "Pacientes") {
  horaIngreso = document.getElementById("horaIngreso");
  horaIngreso.style.display="none";

  horaEgreso = document.getElementById("horaEgreso");
  horaEgreso.style.display="none";
}else {
  horaIngreso = document.getElementById("horaIngreso");
  horaIngreso.style.display="";

  horaEgreso = document.getElementById("horaEgreso");
  horaEgreso.style.display="";
  }
}

function loadSubLista(sel){
  var value = sel.options[sel.selectedIndex].value;
  var dataString = 'idSubLista=' + value;

  $.ajax({
      type: "POST",
      url: "BD/selectSubLista.php",
      data: dataString,
      dataType: "json",
      success: function (respuestasublista) {
        subListaLoaded = document.getElementById("subListaLoaded");
        subListaLoaded.style.display="";
          var subcriterioslista;

          $.each(respuestasublista, function(i, item1){
            subcriterioslista = item1.subcriterios;
            var subDominio = "<div class='sudDominio' id='sudDominio' style='height: 34px;'>" +item1.nameSubdominio+ "</div>";
            $('#SubDominioPadre').append(subDominio);

            for (var i = 0; i < subcriterioslista.length - 1; i++) {
              $('#SubDominioPadre').append("<div class='sudDominio' id='sudDominio' style='height: 34px;'>.</div>");
            }
                $.each(subcriterioslista, function(a, item){
                  var subCriterio = "<div class='subcriterio' id='subcriterio' style='height: 34px;'>"  +item.nombresubcriterio+ "</div>";
                  $('#SubCriterioPadre').append(subCriterio);
                  var select = "<select name='select_tp_dcmt' class='form-control' autofocus='' id='subRespuesta' idSubCriterio= '"+ item.idsubcriterio +"' >\
                  <option value='01'>SI</option>\
                  <option value='02'>NO</option>\
                  <option value='01'>N/A</option>";
                  $('#subRespuesta').append(select);
                  var inputobservaciones = "<input type='text' name='' value='' class='form-control' id='subobservaciones'>";
                  $('#subobservaciones').append(inputobservaciones);
                });
            });
          }
    });


}

$(document).ready(function () {
    $("#guardarLista").click(function () {

      function guardaPaciente(arrayDatosPersonales){
        jsonDatosPersonales = JSON.stringify(arrayDatosPersonales);
        $.ajax({
            type: "POST",
            url: "BD/guardaDatosGenerales.php",
            data: {'data' : jsonDatosPersonales},
            dataType: "json",
            success: function (respuesta){

            }
          });
      }

      var datosGenerales = {};
        datosGenerales["concecutivo"] = $('#concecutivo').val();
        datosGenerales["cedula"] = $('#cedulaPaciente').val();
        datosGenerales["dia"] = $('#fechaDiagnostico').val();
        datosGenerales["tdpaciente"] = $("#select_tp_dcmt option:selected").text();
        datosGenerales["ips"] = $("#ips option:selected").text();
        datosGenerales["servicio"] = $("#servicio option:selected").text();
        datosGenerales["barrio"] = $("#barrio option:selected").text();
        datosGenerales["estrato"] = $("#estrato option:selected").text();
        datosGenerales["diaEntraPaciente"] = $('#diaEntradaPaciente').val();
        datosGenerales["diaSalePaciente"] = $('#diaSalidaPaciente').val();
        datosGenerales["diasAtencionPaciente"] = $('#diasAtencion').val();
        datosGenerales["edadPaciente"] = $('#edadPaciente').val();
        datosGenerales["sexoPaciente"] = $("#sexoPaciente option:selected").text();
        datosGenerales["tipoRegimen"] = $("#tipoRegimen option:selected").text();

      var tipoListaSeleccionada = $("#tipoLista option:selected").text();

      if (tipoListaSeleccionada != "Pacientes") {
        var horaIngresoPaciente = $('#horaIngresoPaciente').val();
        var horaEgresoPaciente = $('#horaEgresoPaciente').val();

        datosGenerales["horaIngresoPaciente"] = horaIngresoPaciente;
        datosGenerales["horaEgresoPaciente"] = horaEgresoPaciente;
      }

      var flagGuardar;

      for(campo in datosGenerales){
        if (datosGenerales[campo] == ""){
          toastr.error("Alguno de los datos generales estan vacios, por favor revisarlos");
          flagGuardar = false;
          return;
        }
        else {
          flagGuardar = true;
        }
      }

      if (flagGuardar) {
        alert("guardo");
        guardaPaciente(datosGenerales);
      }


    });
  });
