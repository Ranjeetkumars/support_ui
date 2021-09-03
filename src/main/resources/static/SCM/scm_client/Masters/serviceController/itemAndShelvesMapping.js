var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");
	
	
	loadStore();
	//saveItemShelfDetails
});



function loadStore(){
	console.log('zone javascript function executed');
	var strUrl = Service.store;
	console.log(strUrl);
	try {
		$('#store-id').empty();
		console.log("store Url is:" + strUrl);
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
							var jsonArray = data.objShelveRackControllerDTO;
							var selectfirst = "<option value='0'>Select One </option>";
							$('#store-id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
							var store = "<option value="
										+ resData.counterId + ">"
										+ resData.counterName + "</option>";
								$(store).appendTo(
										'#store-id');
							});
						}
					},
					error : function(err) {
						console.error("Error in store"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in store()' + err);
	}
	$('#store-id').trigger("chosen:updated");
	$('#store-id').chosen();
	
}
function storeAction(){
	var storeId = $('#store-id').val();
	var rtnLoadRacksbyStore =  loadRacksbyStore(storeId);
    var rtnLoadItems  = loadItems(storeId);
     loadShelfRacks(storeId);
}

function loadRacksbyStore(storeId){
	console.log("loadRacksbyStore function executed with store id--->"+storeId);
	try {
 		var strUrl = Service.loadRackByStores;
 		$('#racks-Id').empty();
 		console.log("loadRacksbyStore Url is:" + strUrl);
 		var  storeObj = { 
 				"storeId":storeId
 		}
 		$.ajax({
 			type : "POST",
 			url : strUrl,
 			dataType : "json",
 			data : JSON.stringify(storeObj),
 			contentType : "application/json",
 			async : false,
 			crossDomain : true,
 					success : function(data) {
 						console.log('succes!');
 						var responsecode = data.responseCode;
// 						if (200 !== responsecode) {
//
// 						}
 						if(responsecode === 600 || responsecode === '600'){
 							toastr.info("Rack not found");
 						}
 						else {
 							var jsonArray = data.objItemShelvesDetailsControllerDTO;
 							var selectfirst = "<option value='0'>Select One </option>";
 							$('#racks-Id').append(selectfirst);
 							$.each(jsonArray, function(i, resData) {
 							var rack = "<option value="
 										+ resData.rackId + ">"
 										+ resData.rackName + "</option>";
 								$(rack).appendTo(
 										'#racks-Id');
 							});
 						}
 					},
 					error : function(err) {
 						console.log("Error in racks"
 								+ JSON.stringify(err));
 					}
 				});
 	} catch (err) {
 		console.log('Error in racks' + err);
 	}
 	$('#racks-Id').trigger("chosen:updated");
 	$('#racks-Id').chosen();
}



function loadItems(storeId){
	console.log("loadItems function executed with store id--->"+storeId);
	try {
		var strUrl = Service.loadItems;
        console.log('loadItems Url--->'+strUrl);
 		$('#items-id').empty();
 		console.log("base location Url is:" + strUrl);
 		var  storeObj = { 
 				"storeId":storeId
 		}
 		$.ajax({
 			type : "POST",
 			url : strUrl,
 			dataType : "json",
 			data : JSON.stringify(storeObj),
 			contentType : "application/json",
 			async : false,
 			crossDomain : true,
 					success : function(data) {
 						console.log('succes!'+JSON.stringify(data));
 						var responsecode = data.responseCode;
 						if (200 !== responsecode) {

 						} else {
 							var jsonArray = data.objLoadItemControllerDTO;
 							var selectfirst = "<option value='0'>Select One </option>";
 							$('#items-id').append(selectfirst);
 							$.each(jsonArray, function(i, resData) {
 								
 							var inventoryFrom = "<option value="
 										+ resData.drugId + ">"
 										+ resData.drugname + "</option>";
 								$(inventoryFrom).appendTo(
 										'#items-id');
 							});
 						}
 					},
 					error : function(err) {
 						console.log("Error in items ajax call"
 								+ JSON.stringify(err));
 					}
 				});
 	} catch (err) {
 		console.log('Error in items' + err);
 	}
 	$('#items-id').trigger("chosen:updated");
 	$('#items-id').chosen();
	
}


function getinventoryItemFormwithoutInputDropDown() {
	var id = $('up_drug_inventoryItemFormId').val();
  $('#inventoryItemFormId').empty();
	var strUrl = MASTER_END_POINT.loadMaterialForm;
	console.log("getinventoryItemFormwithoutInputDropDown Url is:" + strUrl);
	     $.ajax({
				type : 'GET',
				url : strUrl,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {

					} else {
						var jsonArray = data.dto;
						var selectfirst = "<option value='0'>Select InventoryForm</option>";
						$('#inventoryItemFormId').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var FormId = "<option value=" + resData.serialId
									+ ">" + resData.fromType + "</option>";
							$(FormId).appendTo('#inventoryItemFormId');
						});
					}
				},
				error : function(err) {
					console
							.log("Error in getinventoryItemFormwithoutInputDropDown"
									+ JSON.stringify(err));
				}
			});

	$('#inventoryItemFormId').trigger("chosen:updated");
	$('#inventoryItemFormId').chosen();
}

function openModalBox() {
	console.log('openModalBox  javascript function is executed');
	//$('#packingVolume').modal('show');
	
	$('#packingVolume').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	$("#save_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", false);
	$("#update_disable").attr("disabled", true);
	
	// enable choosen drop down
	$('#items-id').prop('disabled', false).trigger("chosen:updated");
	$('#store-id').prop('disabled', false).trigger("chosen:updated");

}

function saveItemShelfDetails() {
	
	var storeId = $('#store-id').val();
    var racksId = $('#racks-Id').val();
    var shelvesId = $('#shelves-id').val();
    var itemsId = $('#items-id').val();
    var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
    
    console.log("Status-->"+isStatus);
	if (storeId == "0") {
		toastr.error('Please select Store/Ambulance');
		return false;
	}
	if (racksId == "0") {
		toastr.error('Please select Racks');
		return false;
	}
	if (shelvesId == "0") {
		toastr.error('Please select Shelves');
		return false;
	}
	if (itemsId == "0") {
		toastr.error('Please select items');
		return false;
	}
	if(isStatus==false){
		toastr.error('Please select Status');
		return false;
	}
	
	
	
	var saveItemShelfDetailsJsonObj =
	{
			"storeId":storeId,
			"rackId":racksId,
			"shelveId":shelvesId,
			"itemId":itemsId,
			"userId":userId,
			"roleId":roleId,
			"moduleId":moduleId,
			"status":isStatus
	}
	var strUrl = Service.saveItemShelveDetails;
	console.log('@@@@@@@@@@@@@@@@@@@@@::'+strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(saveItemShelfDetailsJsonObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('data'+JSON.stringify(data))
		 if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
				|| data.rtnReponseCount === '1') {
			toastr.success('Successfully Saved');
			loadShelfRacks(storeId);
			$('#packingVolume').modal('hide');
			
		}
		if(data.responseCode==500 ||data.responseCode=='500'){
			toastr.error('Something went wrong');
		}
		
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In saveItemShelveDetails");
		}
	});
}








function validation() {
	
	console.log('validation javascript function executd');
	
	var zoneId = $('#store-id').val();
	
//	var baseLocationId = $('#base-location-id').val();
//	var ambulanceId = $('#ambulance-id').val();
//	var subStoreId = $('#store-id').val();
//	var descriptionId = $('#descriptionId').val();
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
	
	console.log("zoneId-->"+zoneId);
//	console.log("baseLocationId--->"+baseLocationId);
//	console.log("ambulanceId---->"+ambulanceId);
//	console.log("subStoreId----->"+subStoreId);
//	console.log("descriptionId--->"+descriptionId);
	
	console.log("Status-->"+isStatus);
	
	if (zoneId == "0") {
		toastr.error('Please select Store/Ambulance');
		return false;
	}

	if (baseLocationId == "0") {
		toastr.error('Please select base location');
		return false;
	}

	if (ambulanceId == "0") {
		toastr.error('Please select ambulance');
		return false;
	}
	
	if (subStoreId == "0") {
		toastr.error('Please select sub store');
		return false;
	}
	
	
	
	var saveVehicleJsonObj ={ 
		   "subStoreId":subStoreId,
		   "vehicleId":ambulanceId,
		   "description":descriptionId,
		   "userId":userId,
		   "moduleId":moduleId,
		   "roleId":roleId,
		   "status":isStatus}
   return saveVehicleJsonObj;

}



function loadShelfRacks(storeId){
	console.log("loadShelfRacks function executed");
	var strUrl = Service.loadShelvesRack;
	console.log(strUrl);
	console.log('loadShelvesRack'+strUrl);
	
	var loadShelvesRackJsonObj = {
		"storeId":storeId
	}
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(loadShelvesRackJsonObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('datadata::' + JSON.stringify(data));
			var arrData = data.objShelveRackControllerDTO;
			listOfdata(arrData);
		},
		error : function(err) {
			console.log("Error in loadMaterialForm" + JSON.stringify(err));
		}
	});
}




var garrData;
function listOfdata(arrData) {
	garrData = arrData;
	$('#masterIem').dataTable().fnClearTable();
	$('#masterIem').dataTable().fnDestroy();
	var index =1;
	for (var i = 0; i < arrData.length; i++) {
		$('#list_of_data_id')
				.append(
						'<tr>'
								+ '<td>'
								+ index++
								+ '</td>'
								+ '<td>'
								+ arrData[i].counterName
								+ '</td>'
								+ '<td>'
								+ arrData[i].drugName
								+ '</td>'
								+ '<td>'
								+ arrData[i].rackName + '-' + arrData[i].selveName
								+ '</td>'
								+ '<td>'
								+ arrData[i].status
								+ '</td>'
								+ '<td><button type="button" class="btn btn-primary btn-sm"  onClick="getId('+i+','+arrData[i].serialId+')"><i class="fa fa-edit p-r-xs"></i>Update</button></td></tr>');
	}

	$('#masterIem').DataTable(
			{ // Data table

				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
//						{
//							extend : 'copy'
//						},
//						{
//							extend : 'csv'
//						},
//						{
//							extend : 'excel',
//							title : 'ExampleFile'
//						},
//						{
//							extend : 'pdf',
//							title : 'ExampleFile'
//						},
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

var drugFieldserialId;
var intAmbulanceId;
var intSubVehicleId;
function getId(serialId,serialIds) {
	
	//$('#packingVolume').modal('show');
	
	
	$('#packingVolume').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	
	drugFieldserialId = garrData[serialId].drugField;
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@::' + serialId);
	
	$("#store-id option:contains(" + garrData[serialId].counterName+ ")").attr(
			'selected', 'selected').trigger("chosen:updated");
	
	$("#items-id option:contains(" + garrData[serialId].drugName+ ")").attr(
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
	
	
	
	// disable choosen drop down
	$('#items-id').prop('disabled', true).trigger("chosen:updated");
	$('#store-id').prop('disabled', true).trigger("chosen:updated");
	
	
	
	
	
	
	
	
	
	
}


function zone() {
	console.log('zone javascript function executed');
    var strUrl = subStoreAmbulance.load_zones;
	console.log(strUrl);
	try {
		$('#zone-id').empty();
		console.log("zone Url is:" + strUrl);
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
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select One </option>";
							$('#zone-id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
							var inventoryFrom = "<option value="
										+ resData.locationId + ">"
										+ resData.locationName + "</option>";
								$(inventoryFrom).appendTo(
										'#zone-id');
							});
						}
					},
					error : function(err) {
						console.error("Error in zone"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in zone()' + err);
	}
	$('#zone-id').trigger("chosen:updated");
	$('#zone-id').chosen();
}


function getBasedLocation(){
	console.log("getBasedLocation javascript function executed");
	var zoneId = $('#zone-id').val();
	console.log(zoneId);
	try {
		$('#base-location-id').empty();
		 var strUrl = subStoreAmbulance.load_baselocations;
		console.log("base location Url is:" + strUrl);
		
		var  subStoreObj = {
				"zoneId":zoneId
		 }
		
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(subStoreObj),
			contentType : "application/json",
			async : false,
			crossDomain : true,
					success : function(data) {
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
					error : function(err) {
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


function loadShelves(){
	console.log('loadShelves javascript function executed');
	
	var rackId = $('#racks-Id').val();
	var storeId = $('#store-id').val();
	console.log('rackId--->'+rackId);
	console.log('storeId--->'+storeId);
		
	try {
			$('#shelves-id').empty();
			 var strUrl = Service.loadShelves;
			 console.log("loadShelves Url is:" + strUrl);
			var  loadShelvesObj = { 
					"storeId":storeId,
					"rackId":rackId
				}
			$.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(loadShelvesObj),
				contentType : "application/json",
				async : false,
				crossDomain : true,
						success : function(data) {
							console.log('succes!'+JSON.stringify(data));
							var responsecode = data.responseCode;
							if (200 !== responsecode) {

							} else {
								var jsonArray = data.objLoadShelvesControllerDTO;
								var selectfirst = "<option value='0'>Select One </option>";
								$('#shelves-id').append(selectfirst);
								$.each(jsonArray, function(i, resData) {
								var shelves = "<option value="
											+ resData.shelveId + ">"
											+ resData.shelvename + "</option>";
									$(shelves).appendTo(
											'#shelves-id');
								});
							}
						},
						error : function(err) {
							console.log("Error in shelves"
									+ JSON.stringify(err));
						}
					});
		} catch (err) {
			console.log('Error in shelves' + err);
		}
		$('#shelves-id').trigger("chosen:updated");
		$('#shelves-id').chosen();
}





function updateShelveItems(){
	alert('updateShelveItems function executed');
	
	
	var storeId = $('#store-id').val();
    var racksId = $('#racks-Id').val();
    var shelvesId = $('#shelves-id').val();
    var itemsId = $('#items-id').val();
    var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
    
    console.log("Status-->"+isStatus);
	
	if (racksId == "0") {
		toastr.error('Please select Racks');
		return false;
	}
	if (shelvesId == "0") {
		toastr.error('Please select Shelves');
		return false;
	}
	if(isStatus==false){
		toastr.error('Please select Status');
		return false;
	}
	
	
	
	var strUrl = Service.updateShelveItems;
	console.log('updateShelveItems : ---->' + strUrl);
	 var updateShelveItemsJObj ={
		"storeId":storeId,
		"rackId":racksId,
		"shelveId":shelvesId,
		"itemId":itemsId,
		"userId":userId,
		"roleId":roleId,
		"moduleId":moduleId,
		"status":isStatus,
		"rackShelveId":drugFieldserialId
	}
	
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(updateShelveItemsJObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			alert('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Successfully Updated');
				loadShelfRacks(storeId);
				$('#packingVolume').modal('hide');
				
			}
			if(data.responseCode==500 ||data.responseCode=='500'){
				toastr.error('Something went wrong');
			}
			
			
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});
	
}


function update(){
	
	console.log('javascript update function executed');
	if(getStatusVehiclecount()==0){
		console.log("inside if condition ");
		var rtnUpdateVehicleSubStoreMapping = updateVehicleSubStoreMapping();
		console.log("rtnUpdateVehicleSubStoreMappingrtnUpdateVehicleSubStoreMapping==="+rtnUpdateVehicleSubStoreMapping);
		if(rtnUpdateVehicleSubStoreMapping==1){
			console.log("inside if condition");
			// reset function need to call here.
			toastr.info("Successfully updated");
		}
	}
	else{
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


function updateVehicleSubStoreMapping(){
	
	var rtnReponseCount;
	
	console.log('updateVehicleSubStoreMapping javascript function is executed');
	
	var subStoreId = $('#store-id').val();
	var descriptionId = $('#descriptionId').val();
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
	
    console.log("subStoreId----->"+subStoreId);
	console.log("descriptionId--->"+descriptionId);
	console.log("Status-->"+isStatus);
	console.log("intSubVehicleId--------->"+intSubVehicleId);
	
	if (subStoreId == "0") {
		toastr.error('Please select sub store');
		return false;
	}
	
	var strUrl = subStoreAmbulance.updateVehicleSubStoreMapping;
	console.log("updateVehicleSubStoreMapping Url is:" + strUrl);
	
	
	
	
	
	var updateVehicleSubStoreMappingJsonObj = {
	    "subStoreId": subStoreId,
	    "description": descriptionId,
	    "userId": userId,
	    "moduleId": roleId,
	    "roleId": moduleId,
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
	        rtnReponseCount  = data.rtnReponseCount;

	        
	    },

	    error: function() {
	        console.log('something went wrong');

	    }
	});
	return rtnReponseCount;
}




