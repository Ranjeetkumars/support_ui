function loadListOfDispatchedRecords() {
	console.log("loadListOfDispatchedRecords method is executed");
	
	//$('#driverTable').DataTable();
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
		async: false,
		url: 'http://localhost:2706/api/version_1/getListOfDispatch',
		success: function (data, textStatus, jqXHR) {
			console.log("Status" + textStatus);
			console.log("status is ::" + textStatus);
			var obj = JSON.stringify(data.controllerDto);
			JSON.parse(obj).forEach(item => {
				$('#dispatchView').append('<tr>'+
                        '<!-- <td><label class="check" style="top: -5px"> <input'+
                        'type="checkbox" name=""> <span class="checkmark"></span>'+
                '</label></td> -->'+
            '<td>'+item.parentMailId+'</td>'+
            '<td>'+item.callerName+'</td>'+
            '<td>'+item.victimName+'</td>'+
            '<td>'+item.victimAge+'</td>'+
            '<td>'+item.address+'</td>'+
        '</tr>');
			});
			
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log('update Stock error: ' + textStatus);
		}
	});
	$('#driverTable').DataTable();
}





