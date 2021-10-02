function crearCliente(){

    var dato = {
        name: document.getElementById('fname').value, 
        email: document.getElementById('femail').value, 
        age: document.getElementById('fage').value
    }

    var datoToSend = JSON.stringify(dato); 
    
    console.log(dato); 
}

function leerBD(){
    
}