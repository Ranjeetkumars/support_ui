var userId;
var roleId;
var moduleId;
$(document).ready(function() {
		userId = localStorage.getItem('userID');
		roleId = localStorage.getItem("scmRoleId");
		moduleId = localStorage.getItem("scmModuleId");
	loadForm();
});

function getActive_Inactive_Item() {

	
	var active = 2; // for active need to pass 2
	var inactive = 4; // for inactive need to pass 4
	
	
	var short_codeId = $('#short_codeId').val();
	var itemName = $('#item_name_for_filter').val();
	var brandNameId = $('#brandNameId').val();
	var material_form_id = $('#material_form_id').val();
	var manufactureId = $('#manufactureId').val();
	
	var drugsStatusForActive_InActive = $("input[name='requestFor']:checked").val();
	console.log('active/inactive---->'+drugsStatusForActive_InActive);
	
	if (drugsStatusForActive_InActive == 'undefined'
			|| drugsStatusForActive_InActive == undefined) {
		toastr.warning('Please select either Active/InActive');
		return false;
	}
	
	if(drugsStatusForActive_InActive === "active" || drugsStatusForActive_InActive == 'active'){
		
		drugsStatusForActive_InActive = active;
	}
	else{
		drugsStatusForActive_InActive = inactive;
	}
	
	if (short_codeId == "" && itemName == "" && brandNameId == "0"
			&& material_form_id == "0" && manufactureId == "0") {
		toastr.warning('Please select any field');
		return false;
	}
	
	if (brandNameId == "0") {
		brandNameId = 0;
	}
	if (itemName == "") {
		itemName = "¥";
	}
	if (short_codeId == "") {
		short_codeId = "¥";
	}
	if (material_form_id == "0") {
		material_form_id = 0;
	}
	if (manufactureId == "0") {
		manufactureId = 0;
	}
	var intSystemId = 0;
	var intGenericGroupId = 0;
	var intGenericMoleculeId = 0;
	var jsonObj = {
		"actveOrInActieId" : drugsStatusForActive_InActive,
		"brandId" : brandNameId,
		"genericGroupId" : intGenericGroupId,
		"genericMoleculeId" : intGenericMoleculeId,
		"genericName" : itemName,
		"manufacfuredId" : manufactureId,
		"matrialFromId" : material_form_id,
		"uniCode" : short_codeId,
		"systemId" : intSystemId
	};
	try {
		var strUrl = itemRegistration.getAllActiveInactiveCount;
		console.log("loadForm Url is:" + strUrl);
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(jsonObj),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				getAllActiveInactive(jsonObj);
			},
			error : function(err) {
				console.error("Error in material_form" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in material_form' + err);
	}
}

function getAllActiveInactive(jsonObj) {
	$("#active_inactive_dom").empty();
	try {
		var strUrl =itemRegistration.getAllActiveInactive;
		
		console.log("loadForm Url is:" + strUrl);
		$
				.ajax({
					type : "POST",
					url : strUrl,
					dataType : "json",
					data : JSON.stringify(jsonObj),
					contentType : "application/json",
					async : false,
					crossDomain : true,
					success : function(data) {
						console.log('data value::' + data.objControllerDto);
						if (data.status == "NO_DATA_FOUND"
								|| data.status == 'NO_DATA_FOUND') {
							toastr.warning('NO Stock For this Item');
						} else {
							appendIntoTableForActiveInActiveItem(data.objControllerDto);
						}
					},
					error : function(err) {
						console.error("Error in material_form"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in material_form' + err);
	}
}
function appendIntoTableForActiveInActiveItem(jsonArray) {
	$("#active_inactive_dom").empty();
	for (var i = 0; i < jsonArray.length; i++) {
		$('#active_inactive_dom')
				.append(
						'<tr>'
								+ '<td><label class="check">'
								+ '<input type="checkbox" class="child" onClick="activeOrInActive('
								+ jsonArray[i].serialId
								+ ')">'
								+ '<span class="checkmark"></span>'
								+ '</label></td>'
								+ '<td>'
								+ jsonArray[i].drugName
								+ '</td>'
								+ '<td>'
								+ jsonArray[i].drugBrandLang1
								+ '</td>'
								+ '<td>'
								+ jsonArray[i].shortUnicCode
								+ '</td>'
								+ '<td>'
								+ jsonArray[i].fromType
								+ '</td>'
								+ '<td>'
								+ jsonArray[i].strength
								+ '</td>'
								+ '<td>'
								+ jsonArray[i].companyName
								+ '</td> </tr>');
	}
	$('#serviceRemainder1').DataTable(
			{// Data table
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						/*{
							extend : 'copy'
						},
						{
							extend : 'csv'
						},
						{
							extend : 'excel',
							title : 'ExampleFile'
						},*/
						// {extend: 'pdf', title: 'ExampleFile'},
						{
							//extend : 'print',
							customize : function(win) {
								$(win.document.body).addClass('white-bg');
								$(win.document.body).css('font-size', '10px');

								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]

			});
}

var global_serialId = [];
function activeOrInActive(serialId) {
	global_serialId.push(serialId);
	console.log('console.log::' + serialId);
	console.log('array length::' + global_serialId);

}

function activeInactiveItem() {

	var active = 3; // for active need to pass 3
	var inactive = 5; // for inactive need to pass 5
	
	var activeId;
	var size = global_serialId.length;
	
	var drugsStatusForActive_InActive = $("input[name='requestFor']:checked").val();
	console.log('active/inactive---->'+drugsStatusForActive_InActive);
	
	if (drugsStatusForActive_InActive == 'undefined'
			|| drugsStatusForActive_InActive == undefined) {
		toastr.warning('Please select either Active/InActive');
		return false;
	}
	
	if(drugsStatusForActive_InActive === "active" || drugsStatusForActive_InActive == 'active'){
		
		drugsStatusForActive_InActive = active;
	}
	else{
		drugsStatusForActive_InActive = inactive;
	}
	
	if (global_serialId == "" || global_serialId == ''
			|| global_serialId == null || global_serialId == undefined
			|| global_serialId == 'undefined') {
		toastr.warning('Please select any item');
		return false;
	}
	var remarks = $('#remarks_id').val();
	if (remarks == "" || remarks == '') {
		toastr.warning('Please enter remarks for the items');
		return false;
	}

	var strUrl = itemRegistration.saveInActiveDrugs;
	
	
	
	var jsonObj = {
			"listSize" : size,
			"statudId" : drugsStatusForActive_InActive,
			"remarks" : remarks,
			"activeDrugs" : global_serialId.toString()
		};
		saveInactiveDrug(strUrl, jsonObj);
	
}
function saveInactiveDrug(strUrl, jsonObj) {
	console.log('saveInactiveDrug method is executed');
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(jsonObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data.rtnReponseCount == 0) {
				toastr.success('ActiveItem transferred successfully');
				$('#remarks_id').val('');
				
				getActive_Inactive_Item();
			} else if (data.rtnReponseCount == 1) {
				toastr.success('InactiveItem transferred successfully');
				$('#remarks_id').val('');
				getActive_Inactive_Item();
			}
		},
		error : function(err) {
			console.log("Error in saveInactiveDrug" + JSON.stringify(err));
		}
	});
}
function saveActiveDrug(strUrl, jsonObj) {
	console.log('saveActiveDrug method is executed');
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(jsonObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data.rtnReponseCount == 0) {
				toastr.success('Active Item transferd successfully');
				// location.reload(true);
			} else if (data.rtnReponseCount == 1) {
				toastr.success('Active Item transferd successfully');
				// location.reload(true);
			}
		},
		error : function(err) {
			console.log("Error in saveActiveDrug" + JSON.stringify(err));
		}
	});
}

function loadForm() {
	try {
		$('#material_form_id').empty();
		var strUrl = Service.LOAD_FORM;
		// console.log("loadForm Url is:" + strUrl);
		$
				.ajax({
					type : 'GET',
					url : strUrl,
					dataType : 'json',
					async : false,
					success : function(data) {
						var responsecode = data.responseCode;
						if (200 !== responsecode) {
						} else {
							var jsonArray = data.objAddNewLocalDrugControllerDTO;
							var selectfirst = "<option value='0'>Select Material Form </option>";
							$('#material_form_id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
								var loadForm = "<option value="
										+ resData.from_id + ">"
										+ resData.formType + "</option>";
								$(loadForm).appendTo('#material_form_id');
							});
						}
					},
					error : function(err) {
						console.error("Error in material_form"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in material_form' + err);
	}
	$('#material_form_id').trigger("chosen:updated");
	$('#material_form_id').chosen();
}