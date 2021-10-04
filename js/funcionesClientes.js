function traerInformacion(){
	$.ajax({    
    url : 'https://gee0b27b2df2698-dbciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
	data: '{}',
    type : 'GET',
    dataType : 'json',
    contentType: 'application/json; charset=utf-8',
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#contenedor").empty();
        let dataTable = '<table>';
		dataTable += '<th>---Id---</th>';
		dataTable += '<th>---Name---</th>';
		dataTable += '<th>---Email---</th>';
		dataTable += '<th>---Age---</th>';
		
		if(respuesta.items.length==0){
			dataTable += '<tr>';
	        dataTable += '<td>No hay registros</td>';
			dataTable += '</tr>';
		}
		for (i=0; i<respuesta.items.length; i++){
			dataTable += '<tr>';
	        dataTable += '<td>'+ respuesta.items[i].id+ '</td>'; 		
	        dataTable += '<td>'+ respuesta.items[i].name+ '</td>'; 		
	        dataTable += '<td>'+ respuesta.items[i].email+ '</td>'; 		
	        dataTable += '<td>'+ respuesta.items[i].age+ '</td>'; 		

            dataTable += '<td><button onclick="editarRegistro('+respuesta.items[i].id+')">Editar</button>';				
			dataTable += '<td><button onclick="borrarRegistro('+respuesta.items[i].id+')">Eliminar</button>';				
	        dataTable += '</tr>';

	
		}
        dataTable += '</table>';
	    $("#contenedor").append(dataTable);    
	},
    error : function(xhr, status) {
        alert('Ha ocurrido un Error:'+ status );
    }
});
}



function nuevaInformacion(){
	let misDatos = {
		id: $("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val(),
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'https://gee0b27b2df2698-dbciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Creado Exitosamente.");
			$("#id").val("");
			$("#name").val("");
			$("#email").val("");
			$("#age").val("");
        	traerInformacion();	
			}
		}
	});
}

function editarRegistro(id){
	$.ajax({    
    url : 'https://gee0b27b2df2698-dbciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/'+id,
	data: "{}",
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		for (i=0; i<respuesta.items.length; i++){
			$("#id").val(respuesta.items[i].id);
			$("#name").val(respuesta.items[i].name);
			$("#email").val(respuesta.items[i].email);
			$("#age").val(respuesta.items[i].age);
		}
	},
    error : function(xhr, status) {
        alert('Ha ocurrido un Error::'+ status);
    }
});
}

function actualizarInformacion(){
	let misDatos = {
		id: $("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val(),
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'https://gee0b27b2df2698-dbciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Actualizado.");
			$("#id").val("");
			$("#name").val("");
			$("#email").val("");
			$("#age").val("");
			traerInformacion();	
			}
		}
	});
}

function borrarRegistro(idBorrar){

	
	
	
	let misDatos = {
	id: idBorrar
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax({    
    url : 'https://gee0b27b2df2698-dbciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
	data: datosJson,
    type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		alert("Registro Eliminado.");
		traerInformacion();
	},
    error : function(xhr, status) {
        alert('Ha ocurrido un Error de Borrado 2:'+ status);
    }
});
}
