var userId;
var roleId;
var moduleId;
$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	
	
	loadMaterialManufacture();

});

function manufactureNameModel() {
	//$('#manufactureName').modal('show');
	
	$('#manufactureName').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	$("#update_disable").attr("disabled", true);
	$("#reset_disable").attr("disabled", false);
	$("#save_disable").attr("disabled", false);
}

function saveManufacture() {
	var manufactureName = $('#manufactureNameId').val();
	var isStatus = ($('input:checkbox[name="statusCheckBox"]').is(':checked'));
	console.log('manufactureName::' + manufactureName);
	console.log('isStatus::' + isStatus);
	if (manufactureName == "" || manufactureName == undefined) {
		toastr.error('Please enter manufacturer name');
		return false;
	}

	
	
	var strUrl = MASTER_END_POINT.saveManufacture;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"manufactureName" : manufactureName,
			"userId" : userId,
			"moduleId" : roleId,
			"roleId" : moduleId,
			"status" : isStatus
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 0 || data.rtnReponseCount === "0"
					|| data.rtnReponseCount === '0') {
				loadMaterialManufacture();
				toastr.info('Manufacturer name is already existy!');
				// clearDrugRegistration();
			}
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Successfully saved');
				$('#manufactureName').modal('hide');
				loadMaterialManufacture();
				
			}
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});
}

function loadMaterialManufacture() {
	
	
	
	var strUrl = MASTER_END_POINT.loadMaterialManufacture;
	
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {
			if (data.responseCode == 200 || data.responseCode == "200") {
				loadList(data.objMaterialManufactureControllerDTO);
				dataTable();
			}
		},
		error : function(err) {

			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});

}

function loadList(strData) {
	$('#manufactureTableId').dataTable().fnClearTable();
	$('#manufactureTableId').dataTable().fnDestroy();
	arrData = strData;
	$('#manufacturedTableId').empty();
	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {
			var index = i + 1;
			var tbleRow = document.createElement("tr");

			var tablcol1 = document.createElement("td");
			$(tablcol1).html(strData[i].manufactureId);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].manufactureName);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].status);
			$(tbleRow).append(tablcol3);

			var tablcol9 = document.createElement("td");
			$(tablcol9).addClass('text-center');
			$(tablcol9)
					.append(
							'<button class="btn btn-primary btn-sm" data-toggle="modal" ><i class="fa fa-edit p-r-xs"></i>Update</button>');
			$(tablcol9).attr(
					'onclick',
					'get_RowData("' + strData[i].manufactureId + '","'
							+ strData[i].manufactureName + '","'
							+ strData[i].status + '")');

			$(tablcol9).append(tablcol9);
			$(tablcol9).css('height', '36px');
			$(tbleRow).append(tablcol9);
			$("#manufacturedTableId").append(tbleRow);
		}

	} catch (err) {
		console.log("get_All_Sites_Details_DOM ERROR" + err);
	}

}
var intmanufacterId;
function get_RowData(manufacterId, ManufactureName, ManufactureStatus) {
	intmanufacterId = manufacterId;
	//$('#manufactureName').modal('show');
	
	$('#manufactureName').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	$("#update_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", true);
	$("#save_disable").attr("disabled", true);
	$('#manufactureNameId').val(ManufactureName);

	if (ManufactureStatus == "Active" || ManufactureStatus == 'Active') {
		$('#checkBoxId').prop('checked', true);
	} else {
		$('#checkBoxId').prop('checked', false);
	}
}





function updateManufacture(){
	
	var manufactureName = $('#manufactureNameId').val();
	var isStatus = ($('input:checkbox[name="statusCheckBox"]').is(':checked'));
	console.log('manufactureName::' + manufactureName);
	console.log('isStatus::' + isStatus);
	if (manufactureName == "" || manufactureName == undefined) {
		toastr.error('Please enter manufacturer name');
		return false;
	}
	
	var strUrl = MASTER_END_POINT.updateManufacture;	
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({"manufactureName":manufactureName,"status":isStatus, "manufactureId":intmanufacterId} ),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Updated Successfully');
				loadMaterialManufacture();
				$('#manufactureName').modal('hide');
				
				
			}
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});
	
	
	
}
function dataTable(){
	 $('#manufactureTableId').DataTable({// Data table
         "aLengthMenu": [[05, 10, 15, 25, -1], [05, 10, 15, 25, "All"]],
         pageLength: 5,
         responsive: true,
         dom: '<"html5buttons"B>lTfgitp',
         buttons: [
//             {extend: 'copy'}, {extend: 'csv'},
//             {extend: 'excel', title: 'ExampleFile'},
             //                                                    {extend: 'pdf', title: 'ExampleFile'},
             {
            	 //extend: 'print',
                 customize: function(win) {
                     $(win.document.body).addClass('white-bg');
                     $(win.document.body).css('font-size', '10px');

                     $(win.document.body).find('table')
                             .addClass('compact')
                             .css('font-size', 'inherit');
                 }
             }
         ]

     });
}