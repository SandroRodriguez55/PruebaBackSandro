/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

//****** Carga todos los Bienes********//
function cargarTodosBienes(){
  var cont = 0;
  $.getJSON('data-1.json', function(data) {
      $.each(data, function(i, f) {
        var tblRow = "<div class='tituloContenido card' style='justify-content: center;'>" 
          + "<table class='tableBienes'><tr>" 
            + "<td class='tdImagenBienes' rowspan='6'><img src='img/home.jpg' width=170 height=130></td>"
            + "<td class='tdLabelsBienes'><b> Direcci&oacute;n: </b></td>" + "<td>" + f.Direccion + "</td>"
          + "</tr>"
          + "<tr>" 
            + "<td class='tdLabelsBienes'><b> Ciudad: </b></td>" + "<td>" + f.Ciudad + "</td>" 
          + "</tr>"
          + "<tr>" 
            + "<td class='tdLabelsBienes'><b> Tel&eacute;fono: </b></td>" + "<td>" + f.Telefono + "</td>" 
          + "</tr>"
          + "<tr>" 
            + "<td class='tdLabelsBienes'><b> C&oacute;digo Postal: </b></td>" + "<td>" + f.Codigo_Postal + "</td>" 
          + "</tr>"
          + "<tr>" 
            + "<td class='tdLabelsBienes'><b> Tipo: </b></td>" + "<td>" + f.Tipo + "</td>" 
          + "</tr>"
          + "<tr>" 
            + "<td class='tdLabelsBienes'><b> Precio: </b></td>" + "<td>" + f.Precio + "</td>" 
          + "</tr></table>"
          + "<div id='resultado'><input type='button' class='btn btn-success' value='GUARDAR' onclick='insertarBienes(" + f.Id
          + ")'></div>"
          + "</div>";
          $(tblRow).appendTo("#tabs-1 #divBienes");
          cont++;
    });
    $("#totalBienes").html(cont);
  });
}

//****** Carga lista de ciudades (sin repetidos) ********//
function cargarListaCiudades(){
  $.getJSON('data-1.json', function(data) {
    var ciudades = []; $.each(data, 
    function(index, value) { 
      if($.inArray(value.Ciudad, ciudades)==-1) { ciudades.push(value.Ciudad); } 
    });

    $.each(ciudades, function(i, ciudad) {
        $("#selectCiudad").append(new Option(ciudad, ciudad));
    });
  });
}

//****** Carga lista de tipos de Bienes (sin repetidos) ********//
function cargarListaTipos(){
  $.getJSON('data-1.json', function(data) {
    var tipos = []; $.each(data, 
    function(index, value) { 
      if($.inArray(value.Tipo, tipos)==-1) { tipos.push(value.Tipo); } 
    });

    $.each(tipos, function(i, Tipo) {
        $("#selectTipo").append(new Option(Tipo, Tipo));
    });
  });
}

//****** Carga los Bienes de acuardo al filtro Ciudad y Tipo ********//
function cargarBienesFiltro(Ciudad, Tipo){
  var cont = 0;
  $.getJSON('data-1.json', function(data) {
      var bienes = []; $.each(data, 
      function(index, value) { 
        if(Ciudad != "" && Tipo != ""){
          if(value.Tipo == Tipo && value.Ciudad == Ciudad) { bienes.push(value); } 
        }
        else if(Ciudad != ""){
          if(value.Ciudad == Ciudad) { bienes.push(value); }
        }
        else if(Tipo != ""){
          if(value.Tipo == Tipo) { bienes.push(value); }
        }
        else{
          bienes.push(value);
        }
      });
      $("#tabs-1 #divBienes").html("");
      $.each(bienes, function(i, f) {
        var tblRow = "<div class='tituloContenido card' style='justify-content: center;'>" 
          + "<table class='tableBienes'><tr>" 
            + "<td class='tdImagenBienes' rowspan='6'><img src='img/home.jpg' width=170 height=130></td>"
            + "<td class='tdLabelsBienes'><b> Direcci&oacute;n: </b></td>" + "<td>" + f.Direccion + "</td>"
          + "</tr>"
          + "<tr>" 
            + "<td class='tdLabelsBienes'><b> Ciudad: </b></td>" + "<td>" + f.Ciudad + "</td>" 
          + "</tr>"
          + "<tr>" 
            + "<td class='tdLabelsBienes'><b> Tel&eacute;fono: </b></td>" + "<td>" + f.Telefono + "</td>" 
          + "</tr>"
          + "<tr>" 
            + "<td class='tdLabelsBienes'><b> C&oacute;digo Postal: </b></td>" + "<td>" + f.Codigo_Postal + "</td>" 
          + "</tr>"
          + "<tr>" 
            + "<td class='tdLabelsBienes'><b> Tipo: </b></td>" + "<td>" + f.Tipo + "</td>" 
          + "</tr>"
          + "<tr>" 
            + "<td class='tdLabelsBienes'><b> Precio: </b></td>" + "<td>" + f.Precio + "</td>" 
          + "</tr></table>"
          + "<div id='resultado'><input type='button' class='btn btn-success' value='GUARDAR' onclick='insertarBienes(" + f.Id
          + ")'></div>"
          + "</div>";
          $(tblRow).appendTo("#tabs-1 #divBienes");
          cont++;
      });
      $("#totalBienes").html(cont);
  });
}

//****** Guardar mis Bienes ********//
function insertarBienes(id){
  var direccion = ""; 
  var ciudad = "";
  var telefono = "";
  var codigo_postal = "";
  var tipo = "";
  var precio = "";
  $.getJSON('data-1.json', function(data) {
    $.each(data, 
    function(index, value) { 
      if(value.Id == id) { 
        direccion = value.Direccion; 
        ciudad = value.Ciudad;
        telefono = value.Telefono;
        codigo_postal = value.Codigo_Postal;
        tipo = value.Tipo;
        precio = value.Precio;
        var parametros = {
          "direccion" : direccion,
          "ciudad" : ciudad,
          "telefono" : telefono,
          "codigo_postal" : codigo_postal,
          "tipo" : tipo,
          "precio" : precio
        };
        $.ajax({
                data:  parametros, //datos que se envian a traves de ajax
                url:   'registraBienes/IngresarBienes.php', //archivo que recibe la peticion
                type:  'post', //método de envio
                beforeSend: function () {
                        $("#resultado").hide();
                },
                success:  function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
                        $("#resultado").show();
                        if(response == "ok"){
                          alert('Registro insertado correctamente');
                        }
                }
        });
      } 
    });
  });

}

//****** Consulta mis Bienes ********//
function consultarMisBienes(){
  var cont = 0;
  $("#tabs-2 #divBienes").html("");
  $.ajax({
      url:   'consultarMisBienes/ConsultarMisBienes.php', //archivo que recibe la peticion
      type:  'get', //método de envio
      beforeSend: function () {
      },
      success:  function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
        if(response != ""){
            data=$.parseJSON(response);
            $.each(data, function(i, f) {
              var tblRow = "<div class='tituloContenido card' style='justify-content: center;'>" 
                + "<table class='tableBienes'><tr>" 
                  + "<td class='tdImagenBienes' rowspan='6'><img src='img/home.jpg' width=170 height=130></td>"
                  + "<td class='tdLabelsBienes'><b> Direcci&oacute;n: </b></td>" + "<td>" + f.direccion + "</td>"
                + "</tr>"
                + "<tr>" 
                  + "<td class='tdLabelsBienes'><b> Ciudad: </b></td>" + "<td>" + f.ciudad + "</td>" 
                + "</tr>"
                + "<tr>" 
                  + "<td class='tdLabelsBienes'><b> Tel&eacute;fono: </b></td>" + "<td>" + f.telefono + "</td>" 
                + "</tr>"
                + "<tr>" 
                  + "<td class='tdLabelsBienes'><b> C&oacute;digo Postal: </b></td>" + "<td>" + f.codigo_postal + "</td>" 
                + "</tr>"
                + "<tr>" 
                  + "<td class='tdLabelsBienes'><b> Tipo: </b></td>" + "<td>" + f.tipo + "</td>" 
                + "</tr>"
                + "<tr>" 
                  + "<td class='tdLabelsBienes'><b> Precio: </b></td>" + "<td>" + f.precio + "</td>" 
                + "</tr></table>"
                + "</div>";
                $(tblRow).appendTo("#tabs-2 #divMisBienes");
                cont++;
          });
          $("#totalMisBienes").html(cont);
        }
      }
  });
  
}
