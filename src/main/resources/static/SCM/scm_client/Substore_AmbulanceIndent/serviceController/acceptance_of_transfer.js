var userId;
var roleId;
var moduleId;

$(document).ready(function() {
	userId = localStorage.getItem('userID');
	roleId = localStorage.getItem("scmRoleId");
	moduleId = localStorage.getItem("scmModuleId");

	zone();

});

$('#accepted-quantity-id').on("input", function() {
	$('#transfer-stock-id').empty();
	var acceptedQty = this.value;
	var transferQty = $('#transferred-quantity-id').val();

	var intvalue = Math.round(transferQty);
	if (intvalue > acceptedQty) {
		$('#transfer-stock-id').val(acceptedQty);
	} else if (intvalue == acceptedQty) {
		$('#transfer-stock-id').val(0);
	}
});

function zone() {
	console.log('zone javascript function executed');
	var strUrl = subStoreAmbulance.load_zones;
	console.log(strUrl);
	try {
		$('#zone-id').empty();
		console.log("zone Url is:" + strUrl);
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
					$('#zone-id').append(selectfirst);
					$.each(jsonArray, function(i, resData) {
						var inventoryFrom = "<option value="
								+ resData.locationId + ">"
								+ resData.locationName + "</option>";
						$(inventoryFrom).appendTo('#zone-id');
					});
				}
			},
			error : function(err) {
				console.error("Error in zone" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.error('Error in zone()' + err);
	}
	$('#zone-id').trigger("chosen:updated");
	$('#zone-id').chosen();
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
			"zoneId" : zoneId
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
						$(inventoryFrom).appendTo('#base-location-id');
					});
				}
			},
			error : function(err) {
				console.log("Error in base-location" + JSON.stringify(err));
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
			"baselocation" : baselocationId
		}
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(baselocationObj),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				console.log('succes ---> ' + JSON.stringify(data));
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
						$(inventoryFrom).appendTo('#ambulance-id');
					});
				}
			},
			error : function(err) {
				console.log("Error in ambulance" + JSON.stringify(err));
			}
		});
	} catch (err) {
		console.log('Error in ambulance' + err);
	}
	$('#ambulance-id').trigger("chosen:updated");
	$('#ambulance-id').chosen();
}

function loadVehicleTransferItems() {
	$('#TransferredItemsTble').DataTable().clear().destroy();
	var ambulanceId = $('#ambulance-id').val();
	var strUrl = subStoreAmbulance.loadVehicleTransferItems;
	console.log('loadVehicleTransferItems Url-->::' + strUrl);
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"vehicleid" : ambulanceId
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			transferred_Table(data.vehicleTransferItemsControllerDtos);
			transferred_DataTable();
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});
}

var listOfData;
function transferred_Table(strData) {

	listOfData = strData;
	$('#list_of_data_transferred_id').empty();
	try {
		var sum = 0;
		for (var i = 0; i < strData.length; i++) {

			var tbleRow = document.createElement("tr");
			// var drugidList = strData[i].drugidlist;
			var tablcol1 = document.createElement("td");
			$(tablcol1).html(strData[i].dr_Short_Unic_Code);
			$(tbleRow).append(tablcol1);

			var tablcol2 = document.createElement("td");
			$(tablcol2).html(strData[i].dr_drug_Name);
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			$(tablcol3).html(strData[i].drr_Batch_Number);
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			$(tablcol4).html(strData[i].pt_Packing_Type);
			$(tbleRow).append(tablcol4);

			var tablcol5 = document.createElement("td");
			$(tablcol5).html(strData[i].drr_Expire_Date);
			$(tbleRow).append(tablcol5);

			var tablcol6 = document.createElement("td");
			$(tablcol6).html(strData[i].arr_Available_Stock);
			$(tbleRow).append(tablcol6);

			var tablcol7 = document.createElement("td");
			$(tablcol7).html(strData[i].dt_No_Strips);
			$(tbleRow).append(tablcol7);

			var tablcol8 = document.createElement("td");
			$(tablcol8).html(strData[i].drr_Purchase_Price);
			$(tbleRow).append(tablcol8);

			var tablcol9 = document.createElement("td");
			$(tablcol9).html(strData[i].drr_mrp);
			$(tbleRow).append(tablcol9);

			var tablcol10 = document.createElement("td");
			$(tablcol10).html(strData[i].drr_Unit_Cost);
			$(tbleRow).append(tablcol10);

			var tablcol11 = document.createElement("td");
			$(tablcol11)
					.html(
							'<button type="button" class="btn btn-primary btn-sm"   onClick="getSingleRowData('
									+ i
									+ ','
									+ strData[i].drr_Purchase_Price
									+ ');" >Add Item</button>');
			$(tbleRow).append(tablcol11);

			$(tablcol11).css('height', '36px');
			$(tbleRow).append(tablcol11);

			$("#list_of_data_transferred_id").append(tbleRow);
		}

	} catch (err) {
		console.log("list_of_data_transferred ERROR" + err);
	}
}
function transferred_DataTable() {
	$('#TransferredItemsTble').DataTable(
			{// Data table
				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [ {
					customize : function(win) {
						$(win.document.body).addClass('white-bg');
						$(win.document.body).css('font-size', '10px');

						$(win.document.body).find('table').addClass('compact')
								.css('font-size', 'inherit');
					}
				} ]

			});
}
var strDrugId;
var strBatchNumber;
var strTransferSerialId;
var intFromVehicleId;
var intSerialId;
function getSingleRowData(index, drr_Purchase_Price) {

	console.log("single row data----->" + JSON.stringify(listOfData));

	$('#accepted-quantity-id').val('');
	$('#no-of-strips-id').val('');
	$('#transfer-stock-id').val('');

	//$('#registration_and_update_modal').modal('show');
	
	
	$('#registration_and_update_modal').modal({
		  backdrop: 'static',
		  keyboard: true
		})
	// set input in model box
	$('#short-code-id').val(listOfData[index].dr_Short_Unic_Code);
	$('#inventory-item-name-id').val(listOfData[index].dr_drug_Name);
	$('#batch-number-id').val(listOfData[index].drr_Batch_Number);
	$('#packing-type-id').val(listOfData[index].pt_Packing_Type);
	$('#expiry-date-id').val(listOfData[index].drr_Expire_Date);
	$('#transferred-quantity-id').val(listOfData[index].arr_Available_Stock);
	$('#no-of-strips-transfer-id').val(listOfData[index].dt_No_Strips);
	var acceptedQuantity = $('#accepted-quantity-id').val();
	var noOfStrips = $('#no-of-strips-id').val();
	$('#transfer-stock-id').val();
	$('#purchase-price-id').val(listOfData[index].drr_Purchase_Price);
	$('#mrp-strip-id').val(listOfData[index].drr_mrp);
	$('#unit-price-strip-id').val(listOfData[index].drr_Unit_Cost);

	strDrugId = listOfData[index].dt_Drug_Id;
	strBatchNumber = listOfData[index].drr_Batch_Number;
	strTransferSerialId = listOfData[index].dt_transfer_SerialId;

	intFromVehicleId = listOfData[index].dt_from_VehicleId;
	intSerialId = listOfData[index].dt_Serial_Id;

}

// Allow only number in input tag
$('#accepted-quantity-id').keypress(function(e) {
	var charCode = (e.which) ? e.which : event.keyCode
	if (String.fromCharCode(charCode).match(/[^0-9]/g))
		return false;
});

// Allow only number in input tag
$('#no-of-strips-id').keypress(function(e) {
	var charCode = (e.which) ? e.which : event.keyCode
	if (String.fromCharCode(charCode).match(/[^0-9]/g))
		return false;
});

function SaveUpdateItems() {

	// read input
	var dr_Short_Unic_Code = $('#short-code-id').val();

	var dr_drug_Name = $('#inventory-item-name-id').val();
	var drr_Batch_Number = $('#batch-number-id').val();
	var pt_Packing_Type = $('#packing-type-id').val();
	var drr_Expire_Date = $('#expiry-date-id').val();
	var arr_Available_Stock = $('#transferred-quantity-id').val();
	var dt_No_Strips = $('#no-of-strips-transfer-id').val();
	var acceptedQuantity = $('#accepted-quantity-id').val();
	var noOfStrips = $('#no-of-strips-id').val();
	var transfer_stock = $('#transfer-stock-id').val();
	var drr_Purchase_Price = $('#purchase-price-id').val();
	var drr_mrp = $('#mrp-strip-id').val();
	var drr_Unit_Cost = $('#unit-price-strip-id').val();

	if (acceptedQuantity == "" || acceptedQuantity == '') {
		toastr.error('Please enter issued/Accepted quantity');
		return false
	}

	if (noOfStrips == "" || noOfStrips == '') {
		toastr.error('Please enter no of Strips');
		return false
	}

	if (acceptedQuantity == '0' || acceptedQuantity == 0 && noOfStrips == '0'
			|| noOfStrips == 0 && transfer_stock == 0 || transfer_stock == '0') {
		toastr
				.error("Please don't enter zero in issued quantity,No of Strips,No of Units for "
						+ dr_drug_Name);
		return false

	}

	var intvalue = Math.round(arr_Available_Stock);
	if (acceptedQuantity > intvalue) {
		toastr.error('Acceptancy qty is not more than the Transferred qty');
		return false
	}
	if (noOfStrips > dt_No_Strips) {
		toastr
				.error('No of Strips entered not more than the  no of strips transfered');
		return false
	}

	var toVehiId = $('#ambulance-id').val();

	var remaningQty = intvalue - acceptedQuantity;
	var remaningStripsQty = dt_No_Strips - noOfStrips;

	console.log("@@@@@@@@@-acceptedQuantity" + acceptedQuantity);
	console.log("@@@@@@@@@-noOfStrips" + noOfStrips);
	console.log("@@@@@@@@@@@@@@-remaningQty" + remaningQty);
	console.log("@@@@@@@@@@@@@@-remaningStripsQty" + remaningStripsQty);

	var strUrl = "http://localhost:2000/scmservice/AcceptTransferItemsController/saveUpdateItems";
	var jsonObject = {
		"drug_idlist" : strDrugId,
		"drug_batchlist" : strBatchNumber,
		"stock_ref_list" : strTransferSerialId,
		"dr_expt" : drr_Expire_Date,
		"drug_qtylist" : acceptedQuantity,
		"drug_noofstrips" : noOfStrips,
		"dr_pr_price" : drr_Purchase_Price,
		"dr_uni_cost" : drr_Unit_Cost,
		"from_vehicle_id" : intFromVehicleId,
		"to_vehidi" : toVehiId,
		"size" : 1,
		"dr_reaminingqty" : remaningQty,
		"dr_remainingstrips" : remaningStripsQty,
		"userid" : 1,
		"moduleid" : 1,
		"roleid" : 1,
		"dr_transferid" : intSerialId,
		"dr_mrp" : drr_mrp
	}

	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(jsonObject),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));

			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Successfully Accepted');
				loadVehicleTransferItems();
				$('#registration_and_update_modal').modal('hide');

			}

		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});

}
