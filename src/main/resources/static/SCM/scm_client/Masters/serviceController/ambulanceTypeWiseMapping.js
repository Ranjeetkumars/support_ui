var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	
	
	ambulanceType();


});

function ambulanceType() {
	console.log('ambulanceType function executed');
	var strUrl = AmbulanceTypeWiseMapping.ambulanceType;
	console.log("ambulanceType Url is:" + strUrl);
	try {
		$('#ambulanceId').empty();
		console.log("zone Url is:" + strUrl);
		$
			.ajax({
				type: 'GET',
				url: strUrl,
				dataType: 'json',
				async: false,
				success: function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {

					} else {
						var jsonArray = data.objVehicleTypeDrugsControllerDTO;
						var selectfirst = "<option value='-1'>Select One </option>";
						$('#ambulanceId').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var ambulanceType = "<option value="
								+ resData.vehicleTypeId + ">"
								+ resData.vehicleType + "</option>";
							$(ambulanceType).appendTo(
								'#ambulanceId');
						});
					}
				},
				error: function(err) {
					console.error("Error in ambulanceType"
						+ JSON.stringify(err));
				}
			});
	} catch (err) {
		console.error('Error in ambulanceType()' + err);
	}
	$('#ambulanceId').trigger("chosen:updated");
	$('#ambulanceId').chosen();
}





function load_vehicle_types_wise_drugs_1() {

	var ambulanceTypeId = $('#ambulanceId').val();
	var displayTypeId = $('#displayTypeId').val();

	if (ambulanceTypeId == "-0" || ambulanceTypeId == '-0' || ambulanceTypeId === undefined || ambulanceTypeId === 'undefined') {
		return false
	}

	var jsonObj = {
		"vehicleType": ambulanceTypeId,
		"mappedType": displayTypeId
	}
	var strUrl = AmbulanceTypeWiseMapping.loadVehicleTypeWiseDrugDetails;
	console.log('@@@@@@@@@@@@@@@@@@@@@::' + strUrl);
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(jsonObj),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {
			console.log('Success'
				+ JSON.stringify(data));
			if (data.responseCode === 200 || data.responseCode === '200') {
				var aarData = data.objVehicleTypeDrugsControllerDTO;
				/* appendInItemApprovalTable(aarData);
				 dataTable();*/
			}
			if (data.responseCode == 500 || data.responseCode == '500') {
				toastr.error('Something went wrong');
			}
		},
		error: function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});
}


function load_vehicle_types_wise_drugs() {

	var ambulanceTypeId = $('#ambulanceId').val();
	var displayTypeId = $('#displayTypeId').val();


	if (ambulanceTypeId == "-0" || ambulanceTypeId == '-0' || ambulanceTypeId === undefined || ambulanceTypeId === 'undefined') {
		return false
	}

	var strURL = "http://localhost:2000/scmservice/DrugVehicleTypeMappingController/loadVehicleTypeWiseDrugDetails_Rak/" + ambulanceTypeId + "/" + displayTypeId + ""
	
	var table = $('#example').DataTable({
		ajax: {
			"url": strURL,
			"crossDomain": true,
			"dataSrc": "objVehicleTypeDrugsControllerDTO"
		},

		'orderFixed': [1, 'asc'],
		'rowGroup': {
			'dataSrc': 'mgGroupName',
			'startRender': function(rows, group) {
				// Assign class name to all child rows
				var groupName = 'group-' + group.replace(/[^A-Za-z0-9]/g, '');
				var rowNodes = rows.nodes();
				rowNodes.to$().addClass(groupName);

				// Get selected checkboxes
				var checkboxesSelected = $('.dt-checkboxes:checked', rowNodes);


				// Parent checkbox is selected when all child checkboxes are selected
				var isSelected = (checkboxesSelected.length == rowNodes.length);


				return '<label><input type="checkbox" class="group-checkbox" data-group-name="'
					+ groupName + '"' + (isSelected ? ' checked' : '') + '> ' + group + ' (' + rows.count() + ')</label>';
			}
		},
		'columns': [
			{
				'data': 'id',
				'checkboxes': {
					'selectRow': true
				}
			},
			{ 'data': 'mgGroupName' },
			{ 'data': 'drShortunicCode' },
			{ 'data': 'drDrugName' },
			{ 'data': 'materialGroupId' },
			{ 'data': 'drSerialId' },
		],
		'select': {
			'style': 'multi'
		},
		'order': [[2, 'asc']],
		"bDestroy": true
	});

	// Handle click event on group checkbox
	$('#example').on('click', '.group-checkbox', function(e) {
		// Get group class name
		var groupName = $(this).data('group-name');

		// Select all child rows
		table.cells('tr.' + groupName, 0).checkboxes.select(this.checked);

	});

	// Handle click event on "Select all" checkbox
	$('#example').on('click', 'thead .dt-checkboxes-select-all', function(e) {
		var $selectAll = $('input[type="checkbox"]', this);

		setTimeout(function() {
			// Select group checkbox based on "Select all" checkbox state
			$('.group-checkbox').prop('checked', $selectAll.prop('checked'));
		}, 0);
	});





	$('#btnSelectedRows').on('click', function() {

		var groupId = '';
		var materialGroupId = '';
		var sum1 = 0;

		$.each(table.rows('.selected').nodes(), function(i, item) {

			var id = item.id;
			var data = table.row(this).data();

			sum1 = sum1 + 1;
			groupId += parseInt(data.materialGroupId) + ",";
			materialGroupId += parseInt(data.drSerialId) + ",";

		});


		var grpId = groupId.substring(0, groupId.length - 1);
		var materialGrpId = materialGroupId.substring(0, materialGroupId.length - 1);

	    var ambulanceTypeId = $('#ambulanceId').val();
		var displayTypeId = $('#displayTypeId').val();

		
		
		
		var jsonObj = {
			"vehicleId": ambulanceTypeId,
			"records": sum1,
			"groupId": grpId,
			"drugId": materialGrpId,
			"operationType": displayTypeId,
			"userId": userId,
			"roleId": roleId,
			"moduleId": moduleId,
		}

		
		var strUrl = AmbulanceTypeWiseMapping.saveMapDrugToVehicle;
	
		$.ajax({
			type: "POST",
			url: strUrl,
			dataType: "json",
			data: JSON.stringify(jsonObj),
			contentType: "application/json",
			async: false,
			crossDomain: true,
			success: function(data) {
				console.log('Success' + JSON.stringify(data));
				if (data.responseCode === 200 || data.responseCode === '200') {
					
					window.location.reload();
				}
				if (data.responseCode == 500 || data.responseCode == '500') {
					toastr.error('Something went wrong');
				}
			},
			error: function() {
				console.log('something went wrong');
				console.log("Error In insertDrugDetails");
			}
		});
	})




}


function getCheckBoxValues() {

}









function appendInItemApprovalTable(jsonArray) {
	$('#dynamicTable').empty();

	for (var i = 0; i < jsonArray.length; i++) {

		var trow = document.createElement('tr');

		var tdmain0 = document.createElement('td');
		//$(tdmain1).html(i+1);
		$(trow).append(tdmain0);

		var tdmain1 = document.createElement('td');
		$(tdmain1).html(jsonArray[i].mgGroupName);
		$(tdmain1).addClass('bg-dark');
		$(trow).append(tdmain1);

		var tdmain2 = document.createElement('td');
		$(tdmain2).html(jsonArray[i].drDrugName);
		$(trow).append(tdmain2);

		var tdmain3 = document.createElement('td');
		$(tdmain3).html(jsonArray[i].drShortunicCode);
		$(trow).append(tdmain3);

		var tdmain4 = document.createElement('td');
		$(trow).append(tdmain4);

		var label = document.createElement('label');
		$(label).addClass('check text-center');
		$(tdmain4).append(label);

		var inputtag = document.createElement('input');
		$(inputtag).attr('type', 'checkbox');
		$(label).append(inputtag);

		var spantag = document.createElement('span');
		$(spantag).addClass('checkmark');
		$(label).append(spantag);

		$(trow).append(tdmain4);
		$("#dynamicTable").append(trow);
	}
}

function dataTable() {

	$(document).ready(function() {
		var table = $('#example').DataTable({
			'ajax': 'https://gyrocode.github.io/files/jquery-datatables/objects.json',
			'orderFixed': [3, 'asc'],
			'rowGroup': {
				'dataSrc': 'office',
				'startRender': function(rows, group) {
					// Assign class name to all child rows
					var groupName = 'group-' + group.replace(/[^A-Za-z0-9]/g, '');
					var rowNodes = rows.nodes();
					rowNodes.to$().addClass(groupName);

					// Get selected checkboxes
					var checkboxesSelected = $('.dt-checkboxes:checked', rowNodes);

					// Parent checkbox is selected when all child checkboxes are selected
					var isSelected = (checkboxesSelected.length == rowNodes.length);

					return '<label><input type="checkbox" class="group-checkbox" data-group-name="'
						+ groupName + '"' + (isSelected ? ' checked' : '') + '> ' + group + ' (' + rows.count() + ')</label>';
				}
			},
			'columns': [
				{
					'data': 'id',
					'checkboxes': {
						'selectRow': true
					}
				},
				{ 'data': 'name' },
				{ 'data': 'position' },
				{ 'data': 'office' },
				{ 'data': 'salary' }
			],
			'select': {
				'style': 'multi'
			},
			'order': [[2, 'asc']]
		});

		// Handle click event on group checkbox
		$('#example').on('click', '.group-checkbox', function(e) {
			// Get group class name
			var groupName = $(this).data('group-name');

			// Select all child rows
			table.cells('tr.' + groupName, 0).checkboxes.select(this.checked);
		});

		// Handle click event on "Select all" checkbox
		$('#example').on('click', 'thead .dt-checkboxes-select-all', function(e) {
			var $selectAll = $('input[type="checkbox"]', this);
			setTimeout(function() {
				// Select group checkbox based on "Select all" checkbox state
				$('.group-checkbox').prop('checked', $selectAll.prop('checked'));
			}, 0);
		});

	});
}


function appendInItemApprovalTable_1(jsonArray) {

	//$('#dynamicTable').empty();


	for (var i = 0; i < jsonArray.length; i++) {

		var tbody = document.createElement('tbody');


		var trow = document.createElement('tr');
		$(tbody).append(trow)//--

		var thmain = document.createElement('th');
		$(thmain).addClass('bg-dark');
		$(trow).append(thmain);

		var thchild = document.createElement('th');
		$(thchild).addClass('bg-dark text-white');
		$(thchild).html(jsonArray[i].mgGroupName);
		$(trow).append(thchild);

		var thchild1 = document.createElement('th');
		$(trow).append(thchild1);

		var label = document.createElement('label');
		$(label).addClass('check text-center');
		$(thchild1).append(label);

		var inputtag = document.createElement('input');
		$(inputtag).attr('type', 'checkbox');
		$(label).append(inputtag);


		var spantag = document.createElement('span');
		$(spantag).addClass('checkmark');
		$(label).append(spantag);





		var trowchild = document.createElement('tr');
		$(tbody).append(trowchild)//--


		var tdmain = document.createElement('td');
		$(tdmain).html(jsonArray[i].drShortunicCode);
		$(trowchild).append(tdmain);


		var tdmain1 = document.createElement('td');
		$(tdmain1).html(jsonArray[i].drDrugName);
		$(trowchild).append(tdmain1);

		var tdmain2 = document.createElement('td');
		$(trowchild).append(tdmain2);


		var label1 = document.createElement('label');
		$(label1).addClass('check text-center');
		$(tdmain2).append(label1);

		var inputtag1 = document.createElement('input');
		$(inputtag1).attr('type', 'checkbox');
		$(label1).append(inputtag1);


		var spantag1 = document.createElement('span');
		$(spantag1).addClass('checkmark');
		$(label1).append(spantag1);


		//		$("#dynamicTable").append(trow);
		//		$("#dynamicTable").append(trowchild);
		//$(trow).append(trowchild);	

		$("#masterIem").append(tbody);

	}







	/*$('#dynamicTable').empty();
	
	for (var i = 0; i < jsonArray.length; i++) {
		console.log("appendInItemApprovalTable function::"
				+ jsonArray[i].seriaalId);
		
		var dom = '<tr>' + '<td><label class="check">'
				+ '<input type="checkbox" class="child"  onClick="test('
				+ jsonArray[i].seriaalId + ')">'
				
				+ '<span class="checkmark"></span>' + '</label></td>' + '<td>'
				+ jsonArray[i].drShortunicCode + '</td>'
				+ '<td>'+ jsonArray[i].drDrugName+'</td>' + '<td>'
				+ jsonArray[i].mgGroupName + '</td>'
				+ '</tr>'
		$("#dynamicTable").append(dom);
	}*/

}

function test(seriaalId) {

	/*alert('@@@@@@@@@@@@@@@@' + seriaalId)*/

}











function saveAmbulanceAndSubStoreMapping() {

	var rtnValidationStatus = validation();

	if (rtnValidationStatus != false) {
		console.log("rtnValidationStatus::" + rtnValidationStatus);
	}

	var strUrl = subStoreAmbulance.saveVehicleSubStoreMapping;
	console.log('@@@@@@@@@@@@@@@@@@@@@::' + strUrl);
	// localhost:2000/scmservice/VehicleSubStoreMappingController/saveVehicleSubStoreMapping
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(rtnValidationStatus),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
				+ JSON.stringify(data));
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
				|| data.rtnReponseCount === '1') {
				toastr.success('Successfully saved');
				$('#packingVolume').modal('hide');
				loadMaterialForm();
			}

			if (data.rtnReponseCount === 0 || data.rtnReponseCount === "0"
				|| data.rtnReponseCount === '1') {
				toastr.success('Ambulance alreday mapped to substore, Please update it');
				$('#packingVolume').modal('hide');
				loadMaterialForm();
			}

			if (data.responseCode == 500 || data.responseCode == '500') {
				toastr.error('Something went wrong');
			}


		},
		error: function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});
}

function viewListOfAmbulanceAndSubStore() {
	var strUrl = subStoreAmbulance.loadVehicleSubStoreMapping;

	console.log('viewListOfAmbulanceAndSubStore' + strUrl);
	$.ajax({
		type: 'GET',
		url: strUrl,
		success: function(data) {
			console.log('datadata::' + JSON.stringify(data));
			var arrData = data.objVehicleSubStoreControllerDTO;
			// console.log("@@@@@@@@@@@@@@@@@@@@@@@"+arrData);
			listOfdata(arrData);
		},
		error: function(err) {
			console.log("Error in loadMaterialForm" + JSON.stringify(err));
		}
	});
}


var garrData;
function listOfdata(arrData) {
	garrData = arrData;
	$('#masterIem').dataTable().fnClearTable();
	$('#masterIem').dataTable().fnDestroy();
	var index = 1;
	for (var i = 0; i < arrData.length; i++) {
		$('#list_of_data_id')
			.append(
				'<tr>'
				+ '<td>'
				+ index++
				+ '</td>'
				+ '<td>'
				+ arrData[i].vehicleName
				+ '</td>'
				+ '<td>'
				+ arrData[i].subStoreName
				+ '</td>'
				+ '<td>'
				+ arrData[i].description
				+ '</td>'
				+ '<td>'
				+ arrData[i].status
				+ '</td>'
				+ '<td><button type="button" class="btn btn-primary btn-sm"  onClick="getId(' + i + ',' + arrData[i].serialId + ')">Edit</button></td></tr>');
	}

	$('#masterIem').DataTable(
		{ // Data table

			"aLengthMenu": [[05, 10, 15, 25, -1],
			[05, 10, 15, 25, "All"]],
			pageLength: 5,
			responsive: true,
			dom: '<"html5buttons"B>lTfgitp',
			buttons: [
				{
					extend: 'copy'
				},
				{
					extend: 'csv'
				},
				{
					extend: 'excel',
					title: 'ExampleFile'
				},
				{
					extend: 'pdf',
					title: 'ExampleFile'
				},
				{
					extend: 'print',
					customize: function(win) {
						$(win.document.body).addClass('white-bg');
						$(win.document.body).css('font-size', '10px');

						$(win.document.body).find('table').addClass(
							'compact').css('font-size', 'inherit');
					}
				}]

		});

}


function hideDropDownAndDisplayTextField() {
	console.log('Display text fileds');
	$('#hideZone').hide();
	$('#hideBaseLocation').hide();
	$('#hideAmbulance').hide();

	$('#zone-text-id').show();
	$('#baselocation-text-id').show();
	$('#ambulance-text-id').show();

}




var globalSerialId;
var intAmbulanceId;
var intSubVehicleId;
function getId(serialId, serialIds) {

	$('#packingVolume').modal('show');

	hideDropDownAndDisplayTextField();
	globalSerialId = serialIds;
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@::' + serialId);

	$('#append-zone-text-id').val(garrData[serialId].location);
	$('#append-base-location-text').val(garrData[serialId].baseLocation);
	$('#append-text-ambulance').val(garrData[serialId].vehicleName);

	intAmbulanceId = garrData[serialId].vehicleId;
	intSubVehicleId = garrData[serialId].subVehicleId;

	console.log('base location ::' + garrData[serialId].baseLocation);
	console.log('location ::' + garrData[serialId].location);
	console.log('vehicleName ::' + garrData[serialId].vehicleName);
	// var packingType = garrData[serialId].packingType;
	// var arr = packingType.split('X');
	// $('#no_of_strips_id').val(arr[0]);
	// $('#no_of_quantity_id').val(arr[1]);

	$("#sub-store-id option:contains(" + garrData[serialId].subStoreName + ")").attr(
		'selected', 'selected').trigger("chosen:updated");

	var status = garrData[serialId].status;
	if (status == "Active" || status == 'Active') {
		$('#stausId').prop('checked', true);
	} else {
		$('#stausId').prop('checked', false);
	}

	$("#update_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", true);
	$("#save_disable").attr("disabled", true);




}





function getBasedLocation() {
	console.log("getBasedLocation javascript function executed");
	var zoneId = $('#zone-id').val();
	console.log(zoneId);
	try {
		$('#base-location-id').empty();
		var strUrl = subStoreAmbulance.load_baselocations;
		console.log("base location Url is:" + strUrl);

		var subStoreObj = {
			"zoneId": zoneId
		}

		$.ajax({
			type: "POST",
			url: strUrl,
			dataType: "json",
			data: JSON.stringify(subStoreObj),
			contentType: "application/json",
			async: false,
			crossDomain: true,
			success: function(data) {
				console.log('succes!');
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objControllerDto;
					var selectfirst = "<option value='0'>Select One </option>";
					$('#base-location-id').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var inventoryFrom = "<option value="
							+ resData.baseLocationId + ">"
							+ resData.baseLocationName + "</option>";
						$(inventoryFrom).appendTo(
							'#base-location-id');
					});
				}
			},
			error: function(err) {
				console.log("Error in base-location"
					+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.log('Error in base-location' + err);
	}
	$('#base-location-id').trigger("chosen:updated");
	$('#base-location-id').chosen();
}


function loadAmbulance() {
	console.log('loadAmbulance javascript function executed');
	var baselocationId = $('#base-location-id').val();
	console.log(baselocationId);
	try {
		$('#ambulance-id').empty();
		var strUrl = subStoreAmbulance.load_vehicles;
		console.log("ambulance Url is:" + strUrl);
		var baselocationObj = {
			"baselocation": baselocationId
		}
		$.ajax({
			type: "POST",
			url: strUrl,
			dataType: "json",
			data: JSON.stringify(baselocationObj),
			contentType: "application/json",
			async: false,
			crossDomain: true,
			success: function(data) {
				console.log('succes!' + JSON.stringfy(data));
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objControllerDto;
					var selectfirst = "<option value='0'>Select One </option>";
					$('#ambulance-id').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var inventoryFrom = "<option value="
							+ resData.vehicleId + ">"
							+ resData.permanentRegNo + "</option>";
						$(inventoryFrom).appendTo(
							'#ambulance-id');
					});
				}
			},
			error: function(err) {
				console.log("Error in ambulance"
					+ JSON.stringify(err));
			}
		});
	} catch (err) {
		console.log('Error in ambulance' + err);
	}
	$('#ambulance-id').trigger("chosen:updated");
	$('#ambulance-id').chosen();
}





function updatePackingType() {

	var rtnValidationStatus = validation();
	if (rtnValidationStatus != false) {
		console.log("rtnValidationStatus::" + rtnValidationStatus);
	}
	rtnValidationStatus.unitId = globalSerialId;
	rtnValidationStatus.operationType = 2;// This is for update
	console.log("rtnValidationStatus.unitId::" + rtnValidationStatus.unitId);
	console.log("rtnValidationStatus.operationType::" + rtnValidationStatus.operationType);
	var strUrl = MASTER_END_POINT.saveorUpdateMaterialUnit;
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(rtnValidationStatus),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
				+ JSON.stringify(data));
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
				|| data.rtnReponseCount === '1') {
				toastr.success('Successfully Updated');
				$('#packingVolume').modal('hide');
				loadMaterialForm();
			}
			if (data.responseCode == 500 || data.responseCode == '500') {
				toastr.error('Something went wrong');
			}


		},
		error: function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});

}


function update() {

	console.log('javascript update function executed');
	if (getStatusVehiclecount() == 0) {
		console.log("inside if condition ");
		var rtnUpdateVehicleSubStoreMapping = updateVehicleSubStoreMapping();
		console.log("rtnUpdateVehicleSubStoreMappingrtnUpdateVehicleSubStoreMapping===" + rtnUpdateVehicleSubStoreMapping);
		if (rtnUpdateVehicleSubStoreMapping == 1) {
			console.log("inside if condition");
			// reset function need to call here.
			toastr.info("Successfully updated");
		}
	}
	else {
		toastr.info("Don't update substore to Pharmacy, if Pharmacy has raised indents");
		return

	}

}

function getStatusVehiclecount() {
	console.log('getStatusVehiclecount javascript function executed');
	console.log('intAmbulanceId--->' + intAmbulanceId);

	var strUrl = subStoreAmbulance.getStatusVehicleCount;
	console.log("getStatusVehiclecount Url is:" + strUrl);
	var ambulanceJsonObj = {
		"vehicleId": intAmbulanceId
	}
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(ambulanceJsonObj),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {
			console.log('succes!');
			var rtnReponseCount = data.rtnReponseCount;

			return rtnReponseCount;
		},

		error: function() {
			console.log('something went wrong');

		}
	});
}


function updateVehicleSubStoreMapping() {

	var rtnReponseCount;

	console.log('updateVehicleSubStoreMapping javascript function is executed');

	var subStoreId = $('#sub-store-id').val();
	var descriptionId = $('#descriptionId').val();
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));

	console.log("subStoreId----->" + subStoreId);
	console.log("descriptionId--->" + descriptionId);
	console.log("Status-->" + isStatus);
	console.log("intSubVehicleId--------->" + intSubVehicleId);

	if (subStoreId == "0") {
		toastr.error('Please select sub store');
		return false;
	}

	var strUrl = subStoreAmbulance.updateVehicleSubStoreMapping;
	console.log("updateVehicleSubStoreMapping Url is:" + strUrl);

	var updateVehicleSubStoreMappingJsonObj = {
		"subStoreId": subStoreId,
		"description": descriptionId,
		"userId": "171",
		"moduleId": 40,
		"roleId": 100,
		"status": isStatus,
		"serialId": intSubVehicleId
	}
	$.ajax({
		type: "POST",
		url: strUrl,
		dataType: "json",
		data: JSON.stringify(updateVehicleSubStoreMappingJsonObj),
		contentType: "application/json",
		async: false,
		crossDomain: true,
		success: function(data) {
			console.log('in ajax succes of updateVehicleSubStoreMapping ');
			rtnReponseCount = data.rtnReponseCount;


		},

		error: function() {
			console.log('something went wrong');

		}
	});
	return rtnReponseCount;
}




