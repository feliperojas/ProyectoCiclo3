function traerInformacion(){
	$.ajax({    
    url : 'https://gee0b27b2df2698-dbciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
	data: '{}',
    type : 'GET',
    dataType : 'json',
    contentType: 'application/json; charset=utf-8',
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#contenedor").empty();
        let dataTable = '<table>';
		dataTable += '<th>---Id---</th>';
		dataTable += '<th>---Owner---</th>';
		dataTable += '<th>---Capacity---</th>';
		dataTable += '<th>---Category Id---</th>';
		dataTable += '<th>---Name---</th>';
		if(respuesta.items.length==0){
			dataTable += '<tr>';
	        dataTable += '<td>No hay registros</td>';
			dataTable += '</tr>';
		}
		for (i=0; i<respuesta.items.length; i++){
			dataTable += '<tr>';
	        dataTable += '<td>'+ respuesta.items[i].id+ '</td>'; 		
	        dataTable += '<td>'+ respuesta.items[i].owner+ '</td>'; 		
	        dataTable += '<td>'+ respuesta.items[i].capacity+ '</td>'; 		
	        dataTable += '<td>'+ respuesta.items[i].category_id+ '</td>'; 		
	        dataTable += '<td>'+ respuesta.items[i].name+ '</td>';
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
        owner: $("#owner").val(),
        capacity: $("#capacity").val(),
        category_id: $("#category_id").val(),
        name: $("#name").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'https://gee0b27b2df2698-dbciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Creado Exitosamente.");
			$("#id").val("");
			$("#owner").val("");
			$("#capacity").val("");
			$("#category_id").val("");
			$("#name").val("");
        	traerInformacion();	
			}
		}
	});
}

function editarRegistro(id){
	$.ajax({    
    url : 'https://gee0b27b2df2698-dbciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom/'+id,
	data: "{}",
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		for (i=0; i<respuesta.items.length; i++){
			$("#id").val(respuesta.items[i].id);
			$("#owner").val(respuesta.items[i].owner);
			$("#capacity").val(respuesta.items[i].capacity);
			$("#category_id").val(respuesta.items[i].category_id);
			$("#name").val(respuesta.items[i].name);
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
        owner: $("#owner").val(),
        capacity: $("#capacity").val(),
        category_id: $("#category_id").val(),
        name: $("#name").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'https://gee0b27b2df2698-dbciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Actualizado.");
			$("#id").val("");
			$("#owner").val("");
			$("#capacity").val("");
			$("#category_id").val("");
			$("#name").val("");
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
    url : 'https://gee0b27b2df2698-dbciclo3.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
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
