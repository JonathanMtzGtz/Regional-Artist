$(document).ready(() => {
  const solicitudes = document.getElementById("solicitudes");
 
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

    fetch("http://localhost:3001/api/regionalartist/getusuarios",options)
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp.length)
        solicitudes.innerHTML = resp.length;
        resp.forEach(element => {
            $("#tbody").append('<tr class="fila-table mt-3"  >'+
                '<td><img src="images/Avatar.png" alt=""></td>'+ 
                '<td>'+element.nombre+'</td>'+
                '<td>'+element.escuela+'</td>'+
                '<td>'+element.email+'</td>'+
                '<td>'+element.telefono+'</td>'+
                '<td ><button id = "viewPdfButton'+element.archivo+'"  class="archivo" data-archivo='+element.archivo+'>'+
                '<img src="images/icons/ver.svg" alt="" class="icono" >'+
                '</button></td>'+     
                '<td ><button class="rechazar" data-id='+element.id_usuario+'><img src="images/icons/rechazados.svg" class="icono" alt=""></button></td>'+
                '<td ><button><img src="images/icons/aprobados.svg" class="icono" alt=""></button></td></tr>')
        });
    })

    $(document).on("click", ".rechazar", function(){
        const clave = $(this).data("id");
        console.log(clave);
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
})