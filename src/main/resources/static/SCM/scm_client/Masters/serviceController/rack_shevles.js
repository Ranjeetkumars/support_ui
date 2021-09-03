var userId;
var roleId;
var moduleId;
$(document).ready(function() {
		userId = localStorage.getItem('userID');
		roleId = localStorage.getItem("scmRoleId");
		moduleId = localStorage.getItem("scmModuleId");
	loadRackShelveDetails();
	loadStore();
});

function openModalBox() {
	console.log('openModalBox  javascript function is executed');
	clearAllFilds();
	//$('#rackShelves').modal('show');
	
	
	$('#rackShelves').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	$("#save_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", false);
	$("#update_disable").attr("disabled", true);

}

function clearAllFilds() {
	$("#load_store_id").val('').trigger("chosen:updated");
	$("#rack_id").val('').trigger("chosen:updated");
	$('#shelves_id').val('');
	$('#status_id').prop("checked", false);

}


//validation on key press
$('#shelves_id').keypress(function (e) {    
    
    var charCode = (e.which) ? e.which : event.keyCode    

    if (String.fromCharCode(charCode).match(/[^a-zA-Z]/g))    

        return false;                        

});



function saveRackShelveDetails() {
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
	var store = $('#load_store_id').val();
	var rack = $('#rack_id').val();
	var shelves = $('#shelves_id').val();

	if (store == "0" || store == 0) {
		toastr.error('Please select store');
		return false;
	}
	if (rack == "0" || rack == 0) {
		toastr.error('Please select Rack');
		return false;
	}
	shelves
	if (shelves == "" || shelves == '') {
		toastr.error('Please enter shelves');
		return false;
	}

	var strUrl = MASTER_END_POINT.saveRackShelveDetails;
	console.log('save Rack Shelve Details::' + strUrl);
	
	
	
	var jsonObj = {

		"shelveName" : shelves,
		"userId" : userId,
		"roleId" : roleId,
		"moduleId" : moduleId,
		"storeId" : store,
		"rackId" : rack,
		"status" : isStatus
	};

	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(jsonObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Successfully saved');
				$('#rackShelves').modal('hide');
				clearAllFilds();
				loadRackShelveDetails();
			}
			if (data.responseCode == 500 || data.responseCode == '500') {
				toastr.error('Something went wrong');
			}
			if (data.rtnReponseCount === 0 || data.rtnReponseCount === "0"
					|| data.rtnReponseCount === '0') {
				toastr.success('Item is already Exists');
				$('#rackShelves').modal('hide');
				clearAllFilds();
				loadRackShelveDetails();
			}
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});

}

function loadRackByStoress() {
	console.log('loadRackByStoress javascript function executed');
	var load_store_id = $('#load_store_id').val();
	var strUrl = MASTER_END_POINT.loadRackByStores;
	$('#rack_id').empty();
	console.log("loadForm Url is:" + strUrl);
	console.log('store Id' + load_store_id);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"storeId" : load_store_id
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {

			console.log('data' + JSON.stringify(data));
			if (data.status == "NO_DATA_FOUND") {
				toastr.info('Rack not found');
			} else {
				var jsonArray = data.objItemShelvesDetailsControllerDTO;
				var selectfirst = "<option value='0'>Select One </option>";
				$('#rack_id').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var store = "<option value=" + resData.rackId + ">"
							+ resData.rackName + "</option>";
					$(store).appendTo('#rack_id');
				});
			}
		},
		error : function(err) {
			console.error("Error in loadStores" + JSON.stringify(err));
		}
	});
	$('#rack_id').trigger("chosen:updated");
	$('#rack_id').chosen();
}

function loadStore() {
	var strUrl = MASTER_END_POINT.loadStores;
	$('#load_store_id').empty();
	console.log("loadForm Url is:" + strUrl);
	$.ajax({
		type : 'GET',
		url : strUrl,
		dataType : 'json',
		async : false,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode) {

			} else {
				var jsonArray = data.objControllerDto;
				var selectfirst = "<option value='0'>Select One </option>";
				$('#load_store_id').append(selectfirst);
				$.each(jsonArray, function(i, resData) {
					var store = "<option value=" + resData.countryId + ">"
							+ resData.countryName + "</option>";
					$(store).appendTo('#load_store_id');
				});
			}
		},
		error : function(err) {
			console.error("Error in loadStores" + JSON.stringify(err));
		}
	});
	$('#load_store_id').trigger("chosen:updated");
	$('#load_store_id').chosen();
}

function loadRackShelveDetails() {
	var strUrl = MASTER_END_POINT.loadRackShelveDetails;
	 console.log('loadRackShelveDetails:: '+strUrl)  
	   $.ajax({
				type : 'GET',
				url : strUrl,
				dataType : 'json',
				async : false,
				success : function(data) {
					if (data.responseCode == 200 || data.responseCode == '200') {
						loaListOfdRackShelve(data.objRackShelveDetailsControllerDTO);
						masterDataTable();
					}
					if (data.objRackShelveDetailsControllerDTO.length <= 0) {
						toastr.info('Data Not Found');
					}
					if (data.responseCode == 500 || data.responseCode == '500') {
						toastr.info('Postgres issue! try aftre some time');
					}

				},
				error : function(err) {
					console.error("Error in inventoryItemFormId"
							+ JSON.stringify(err));
				}
			});

}
var gArrData;
function loaListOfdRackShelve(arrData) {
	gArrData = arrData;
	destorTableBeforeLoad();
	for (var k = 1; k < arrData.length; k++) {
		$('#list_of_data_id')
				.append(
						'<tr>'
								+ '<td>'
								+ k
								+ '</td>'
								+ '<td>'
								+ arrData[k].shelveName
								+ '</td>'
								+ '<td>'
								+ arrData[k].rackName
								+ '</td>'
								+ '<td>'
								+ arrData[k].counterName
								+ '</td>'
								+ '<td>'
								+ arrData[k].status
								+ '</td>'
								+ '<td><button type="button"  onClick="getIndex('
								+ k
								+ ','
								+ arrData[k].shelveId
								+ ')"      class="btn btn-primary btn-sm"><i class="fa fa-edit p-r-xs"></i>Update</button></td></tr>');

	}
}
var shelveId;
function getIndex(index, sId) {
	
	//clearAllFilds();
	$("#save_disable").attr("disabled", true);
	$("#reset_disable").attr("disabled", true);
	$("#update_disable").attr("disabled", false);
	console.log("sIdsId::" + sId);
	shelveId = sId;
	console.log(index);
	
	
	
	$('#rackShelves').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	
	//$('#rackShelves').modal('show');

	$('#shelves_id').val(gArrData[index].shelveName);

	if (gArrData[index].status == "Active"
			|| gArrData[index].shelveName == 'Active') {
		$('#status_id').prop('checked', true);
	} else {
		$('#status_id').prop('checked', false);
	}

	$("#load_store_id option:contains(" + gArrData[index].counterName + ")")
			.attr('selected', 'selected').trigger("chosen:updated");

	loadRackByStoress();
	$("#rack_id option:contains(" + gArrData[index].rackName + ")").attr(
			'selected', 'selected').trigger("chosen:updated");

}

function updateRackShelveDetails() {

	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
	var store = $('#load_store_id').val();
	var rack = $('#rack_id').val();
	var shelves = $('#shelves_id').val();

	if (store == "0" || store == 0) {
		toastr.error('Please select store');
		return false;
	}
	if (rack == "0" || rack == 0) {
		toastr.error('Please select Rack');
		return false;
	}

	if (shelves == "" || shelves == '') {
		toastr.error('Please enter shelves');
		return false;
	}

	var strUrl = MASTER_END_POINT.updateRackShelveDetails;
	console.log('update Rack Shelves Details ::' + strUrl);
	
	
	
	
	var jsonObj = {
		"shelveName" : shelves,
		"userId" : userId,
		"roleId" : roleId,
		"moduleId" : moduleId,
		"storeId" : store,
		"rackId" : rack,
		"status" : isStatus,
		"shelveId" : shelveId
	}
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(jsonObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Successfully saved');
				$('#rackShelves').modal('hide');

				loadRackShelveDetails();
			}
			if (data.responseCode == 500 || data.responseCode == '500') {
				toastr.error('Something went wrong');
			}
			if (data.rtnReponseCount === 0 || data.rtnReponseCount === "0"
					|| data.rtnReponseCount === '0') {
				toastr.success('Item is already Exists');
				$('#rackShelves').modal('hide');

				loadRackShelveDetails();
			}
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});

}
