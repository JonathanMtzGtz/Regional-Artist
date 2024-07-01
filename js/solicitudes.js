$(document).ready(() => {
  //const part2 = "http://localhost";
const part2 = "https://apirest2";
  const solicitudes = document.getElementById("solicitudes");
  const logout = document.getElementById("logout");
   //const part1 = ":3001/api/regionalartist";
   const part1 = "-mysql.onrender.com/api/regionalartist";
 
  llenarTabla();

function llenarTabla(){
    $("#tbody_solicitudes").html("");
    var data = {
        proceso: 1
      }
    
      var options = {
        method : "POST",
        body: JSON.stringify(data),
        headers : {
            'Content-Type':'application/json'
        }
      }
    
        fetch(part2+part1+"/getSolicitudes",options)
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp.length)
            solicitudes.innerHTML = resp.length;
            resp.forEach(element => {
                $("#tbody_socitudes").append('<tr class="fila-table mt-3"  >'+
                    '<td><img src="images/Avatar.png" alt=""></td>'+ 
                    '<td>'+element.nombre+'</td>'+
                    '<td>'+element.escuela+'</td>'+
                    '<td>'+element.email+'</td>'+
                    '<td>'+element.telefono+'</td>'+
                    '<td ><button id = "viewPdfButton'+element.archivo+'"  class="archivo" data-archivo='+element.archivo+'>'+
                    '<img src="images/icons/ver.svg" alt="" class="icono" >'+
                    '</button></td>'+     
                    '<td ><button class="rechazar" data-id='+element.id_usuario+'><img src="images/icons/rechazados.svg" class="icono" alt=""></button></td>'+
                    '<td ><button class="aprobar" data-id='+element.id_usuario+'><img src="images/icons/aprobados.svg" class="icono" alt=""></button></td></tr>')
            });
        })
}

$(document).on("click", ".aprobar", function(){
    const clave = $(this).data("id");
    console.log(clave);

var respuesta = confirm("¿Esta seguro de aprobar el usuario?");

if (respuesta) {
var data = {
    id_usuario: clave
   }

   var options = {
    method : "PUT",
    body: JSON.stringify(data),
    headers : {
        'Content-Type':'application/json'
    }
  }

   fetch(part2+part1+"/Aprobarusuario", options)
   .then(resp => resp.json())
   .then(resp => {
      if (resp.estatus == "EXITO") {
        llenarTabla();
        Aprobar();  
      }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: resp.mensaje,
            showConfirmButton: false,
            timer: 4000
          })
      }
   }) 
}

 

})

  

    $(document).on("click", ".rechazar", function(){
        const clave = $(this).data("id");
        console.log(clave);

var respuesta = confirm("¿Esta seguro de rechazar el usuario?");

if (respuesta) {
    var data = {
        id_usuario: clave
       }
  
       var options = {
        method : "PUT",
        body: JSON.stringify(data),
        headers : {
            'Content-Type':'application/json'
        }
      }
  
       fetch(part2+part1+"/Rechazarusuario", options)
       .then(resp => resp.json())
       .then(resp => {
          if (resp.estatus == "EXITO") {
            llenarTabla();
          }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: resp.mensaje,
                showConfirmButton: false,
                timer: 4000
              })
          }
       }) 
}

     

    })
   
    $(document).on("click", ".archivo", function(){
       let archivo = $(this).data("archivo");
       console.log(archivo)
       const evidencia = document.getElementById("pdfViewer");
     $("#pdfModal").show('slow')
     


         //  modal
         var modal = document.getElementById("pdfModal");

         // Obtenemos el botón que abre el modal
         var btn = document.getElementById("viewPdfButton"+archivo);
 
         // Obtenemos el elemento <span> que cierra el modal
         var span = document.getElementsByClassName("close")[0];
 
         // Cuando el usuario hace clic en el botón, abrimos el modal
         btn.onclick = function() {
             modal.style.display = "block";
         }
         evidencia.src   = "http://localhost:3001/api/archivos/getArchivosRegionalArtist/"+archivo;
         // Cuando el usuario hace clic en <span> (x), cerramos el modal
         span.onclick = function() {
             modal.style.display = "none";
         }
 
         // Cuando el usuario hace clic en cualquier lugar fuera del modal, lo cerramos
         window.onclick = function(event) {
             if (event.target == modal) {
                 modal.style.display = "none";

             }
         }
    })


    function Aprobar(){

     /* Email.send({
        SecureToken : "6d556efa-35c9-4d5c-a354-2dff4e01491f",
        To : "esmeraldavieyra91@gmail.com",
        From : "veyraabram@gmail.com",
        Subject : "PRUEBA DE CORREOS",
        Body : "<div style='background-color: #ececec; padding: 0; margin: 0 auto; font-weight: 200; width: 100%!important;'> "+
        "<p> </p>"+
        "<center>"+
          "<h2 style='color: #3b693c;'>APROBADO</h2>"+
        "</center><br />"+
        "<table style='width: 600px; margin-left: auto; margin-right: auto; background-color: #ffffff; height: 165px;'>"+
          "<tbody>"+
            "<tr style='height: 61px;'>"+
              "<td style='width: 590px; background-color: #3b693c; text-align: center; height: 61px;' colspan='2'>"+
               "<h2><span style='color: #ffffff;'><strong>FELICIDADES HA SIDO APROBADO</strong></span></h2>"+
              "</td>"+
            "</tr>"+
      
          "</tbody>"+
        "</table>"+
        "<p> </p>"+
        "<p> </p>"+
      "</div>"
        
    }).then(resp => {
      alert(resp)
    });*/
    }

    logout.addEventListener("click", () => {
      logout.innerHTML = '...cerrando sessión';
      sessionStorage.removeItem('token');

      setTimeout(() => {
        window.location.href = "admin.html"
      },1500)
    })

    
      $("#solicitudes_search").on("keyup", function() {
    
     
        var value = $(this).val().toLowerCase();
        $("#tbody_socitudes tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

      if (!sessionStorage.getItem("token")) {
        window.location.href = "admin.html";
      }
  

})