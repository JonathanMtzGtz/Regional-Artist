$(document).ready(function() {
    //const part2 = "http://localhost";
const part2 = "https://apirest2";
const button = document.getElementById("btn_form");
 //const part1 = ":3001/api/regionalartist";
 const part1 = "-mysql.onrender.com/api/regionalartist";

    $('#file').on('change', function(event) {
        const file = event.target.files[0];
        const fileType = file ? file.type : '';
        const validFileTypes = ['application/pdf'];

        if (!validFileTypes.includes(fileType)) {
            $('#file').addClass('is-invalid');
            $('#fileFeedback').show();
            $('#filePreview').hide();
            $('#file').val(''); // Limpiar el campo de file
        } else {
            $('#file').removeClass('is-invalid');
            $('#fileFeedback').hide();

            const fileReader = new FileReader();
            fileReader.onload = function() {
                $('#filePreview').attr('src', fileReader.result);
                $('#filePreview').show();
            };
            fileReader.readAsDataURL(file);
        }
    });

    $('#registroForm').on('submit', function(event) {
        event.preventDefault();

        button.disabled = true;
  
        $("#bnt_form").append("<div class='spinner-border text-dark' role='status'>"+
            "<span class='sr-only'>Loading...</span>"+
          "</div>");

        if ($('#file').hasClass('is-invalid')) {
            alert('Por favor, selecciona un file PDF válido.');
            return;
        }

        const formData = new FormData(this);

        fetch(part2+part1+"/saveusuario", {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
           // alert('Formulario enviado exitosamente.');

           setTimeout(() => {
            window.location.href = "carga.html";
           },1000)     
        })
    });
});

function validarNombre(input) { 
    // Eliminar números
    let valor = input.value.replace(/[0-9]/g, '');
    
    // Convertir la primera letra después de cada espacio a mayúscula y el resto a minúscula
    valor = valor.toLowerCase().replace(/\b\w/g, function (letra) {
        return letra.toUpperCase();
    });

    // Actualizar el valor del input
    input.value = valor;
}

function validarTelefono(input) {
    // Eliminar cualquier carácter que no sea un número
    let valor = input.value.replace(/\D/g, '');
    
    // Limitar el valor a 10 dígitos
    if (valor.length > 10) {
        valor = valor.slice(0, 10);
    }
    
    // Actualizar el valor del input
    input.value = valor;

    // Validar la longitud del número
    if (valor.length === 10) {
        input.setCustomValidity('');
    } else {
        input.setCustomValidity('El número de teléfono debe tener 10 dígitos');
    }
}



