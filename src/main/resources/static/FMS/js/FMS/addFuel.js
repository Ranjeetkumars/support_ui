$(document).ready(function() {
	//	 var token_id = localStorage.getItem("token");
	//	   var user_id=localStorage.getItem("userID");
	//	   var module_id=localStorage.getItem("fms_moduleID");
	//	   var role_id=localStorage.getItem("fms_roleID");
	try {
		$('#fuel-station-address-id').prop("disabled", true);
		$('#PreviousOdoMeterId').prop("disabled", true);
		$("#hideVoucher").hide();
		$("#hideVoucher-image").hide();
		//loadVehicleType();
		loadListOfStation();
		listOfPaymentMode();
		listOfFleetCardDropdown();
		 getVehicle() ;

	} catch (err) {
		console.log("errror in loading ready funtion" + err);
	}
});
function loadVehicleType() {

	$("#vehicleid").empty();
	var strUrl = Service.loadVehicleType1;
	console.log("loadVehicleTypes Url is:" + strUrl);
	$
			.ajax({
				type : "GET",
				url : strUrl,
				dataType : "json",
				async : false,
				crossDomain : false,
				success : function(data) {

					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						console.log('VehicleTypes not loaded')
					} else {
						var jsonArray = data.objVehicleTypeControllerDTO;
						var selectfirst = "<option value='0'>Select VehicleTypes</option>";
						$('#vehicleid').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var designation = "<option value="
									+ resData.vehicleTypeId + ">"
									+ resData.vehicleType + "</option>";
							$(designation).appendTo('#vehicleid');
						});
						$('#vehicleid').trigger("chosen:updated");

						$("#vehicleid").chosen();
					}
				},
				error : function() {
					console.log('Error in loading getVehicleTypes Data'
							+ strUrl);
				}
			});

}

function loadListOfStation() {
	$("#stationId").empty();
	var strUrl = Service.loadListOfStation;
	console.log("loadListOfStation Url is:" + strUrl);
	$
			.ajax({
				type : "GET",
				url : strUrl,
				dataType : "json",
				async : false,
				crossDomain : false,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						console.log('Fuel Station not loaded')
					} else {
						var jsonArray = data.objControllerDTO;
						var selectfirst = "<option value='0'>Select Fuel Station</option>";
						$('#stationId').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var designation = "<option value="
									+ resData.fuelStationId + ">"
									+ resData.fuelStationName + "</option>";
							$(designation).appendTo('#stationId');
						});
						$('#stationId').trigger("chosen:updated");

						$("#stationId").chosen();
					}
				},
				error : function() {
					console.log('Error in loading loadListOfStation Data'
							+ strUrl);
				}
			});

}

$('#stationId').on('change', function() {

	$('#fuel-station-address-id').empty();
	StationAddress();
});
/* 
 * @Author : Habiboon Patan
 * @Date : 02-12-2019
 * @Desc : Mandal Dropdown based on district Id
 */
function StationAddress() {

	var stationId = $('#stationId').val();
	try {

		$("#fuel-station-address-id").empty();
		var strUrl = Service.StationAddress;

		var obj_Insert = {
			"stationId" : stationId

		};
		$
				.ajax({
					type : "POST",
					url : strUrl,
					dataType : "json",
					data : JSON.stringify(obj_Insert),
					contentType : "application/json",
					async : false,
					crossDomain : true,
					success : function(data) {
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {

							var jsonArray = data.objGetFuelDataBasedOnVehicleIdControllerDTO;

							$.each(jsonArray, function(i, resData) {
								$("#fuel-station-address-id").val(
										resData.otherStationDetails);
							});
						}
					},
					error : function(err) {
						console.error("Error in StationAddress"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in StationAddress()' + err);
	}

}

function listOfPaymentMode() {

	$("#paymentModeId").empty();
	var strUrl = Service.listOfPaymentMode;
	console.log("listOfPaymentMode Url is:" + strUrl);
	$
			.ajax({
				type : "GET",
				url : strUrl,
				dataType : "json",
				async : false,
				crossDomain : false,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						console.log('listOfPaymentMode not loaded')
					} else {
						var jsonArray = data.objControllerDTO;
						var selectfirst = "<option value='0'>Select Payment Mode</option>";
						$("#paymentModeId").append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var designation = "<option value="
									+ resData.serailId + ">"
									+ resData.paymentType + "</option>";
							$(designation).appendTo("#paymentModeId");
						});
						$("#paymentModeId").trigger("chosen:updated");

						$("#paymentModeId").chosen();
					}
				},
				error : function() {
					console.log('Error in loading getVehicleTypes Data'
							+ strUrl);
				}
			});
}
function listOfPaymentMode() {

	$("#paymentModeId").empty();
	var strUrl = Service.listOfPaymentMode;
	console.log("listOfPaymentMode Url is:" + strUrl);
	$
			.ajax({
				type : "GET",
				url : strUrl,
				dataType : "json",
				async : false,
				crossDomain : false,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						console.log('listOfPaymentMode not loaded')
					} else {
						var jsonArray = data.objControllerDTO;
						var selectfirst = "<option value='0'>Select Payment Mode</option>";
						$("#paymentModeId").append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var designation = "<option value="
									+ resData.serailId + ">"
									+ resData.paymentType + "</option>";
							$(designation).appendTo("#paymentModeId");
						});
						$("#paymentModeId").trigger("chosen:updated");

						$("#paymentModeId").chosen();
					}
				},
				error : function() {
					console.log('Error in loading getVehicleTypes Data'
							+ strUrl);
				}
			});
}
function listOfFleetCardDropdown() {

	$("#fuel-card-no").empty();
	var strUrl = Service.listOfFleetCardDropdown;
	console.log("listOfPaymentMode Url is:" + strUrl);
	$
			.ajax({
				type : "GET",
				url : strUrl,
				dataType : "json",
				async : false,
				crossDomain : false,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {
						console.log('listOfPaymentMode not loaded')
					} else {
						var jsonArray = data.objControllerDTO;
						var selectfirst = "<option value='0'>Select Fleet Card</option>";
						$("#fuel-card-no").append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var designation = "<option value="
									+ resData.fleetcardId + ">"
									+ resData.cardVendor + "</option>";
							$(designation).appendTo("#fuel-card-no");
						});
						$("#fuel-card-no").trigger("chosen:updated");

						$("#fuel-card-no").chosen();
					}
				},
				error : function() {
					console.log('Error in loading getVehicleTypes Data'
							+ strUrl);
				}
			});
}

$('#paymentModeId').on('change', function() {


	selctPayMentMode();
});
function selctPayMentMode() {
	var paymentModeId = $("#paymentModeId").val();
	console.log("paymentModeId::" + paymentModeId);
	if (paymentModeId == "3" || paymentModeId == '3' || paymentModeId == 3) {
		$("#hideVoucher").show();
		$("#hideVoucher-image").show();
		$("#hide-Fuel-CardNo").hide();
		$("#hide-swiping").hide();
	} else {
		$("#hideVoucher").hide();
		$("#hideVoucher-image").hide();
		$("#hide-Fuel-CardNo").show();
		$("#hide-swiping").show();

	}
}

function assignFuelToVechile(){

	var vehicleId = $("#ResisterNumberid").val();
	//var shiftTypesId = $("#shift-types-id").val();
	var pid = $("#pilot-id").val();
	var pName = $("#pilot-name").val();
	var emtId = $("#emt-id").val();
	var emtName = $("#emt-name").val();
	var stationId = $("#stationId").val();
	var fuelStationAddressId = $("#fuel-station-address-id").val();
	var phoneNumberId = $("#phone-number-id").val();
	var mobileNumberId = $("#mobile-number-id").val();
	var previousOdoMeterId = $("#PreviousOdoMeterid").val();
	var endOdoMtr = $("#end-odo-mtr").val();
	var datetishiftTypesIdmepickerId = $("#datetimepickerId").val();
	var fuelQuantityId = $("#fuel-quantity-id").val();
	var priceUnitId = $("#price-Unit-Id").val();
	var paymentModeId = $("#paymentModeId").val();
	var fuelCardNo = $("#fuel-card-no").val();
	var swipingTypeId = $("#swiping-type-id").val();
	var voucherId = $("#voucherId").val();
	var voucherImageId = $("#voucher-image-id").val();
	var comment = $("#remarksId").val();
	
	//var getSerailId = sessionStorage.getItem('serialId');
	var getSerailId=1;
	var serialId=1;
	var assignSerailId;
	var condition;
  var voucherImage = $('#installationManualid').val();

	var jObject = { 

		"in_condition":1,
				"par_serialid":1,
				"par_fuel_tkt_id":"1",
				"par_vehicle_id":vehicleId,
				"par_baselocation_id":1,
				"par_fuel_stationid":stationId,
				"par_other_station_details":fuelStationAddressId,
				"par_startodo_meterreading":previousOdoMeterId,
				"par_endodo_meterreading":endOdoMtr,
				"par_expected_mileage":"12",
				"par_fuel_qty":fuelQuantityId,
				"par_fuel_price_per_liter":priceUnitId,
				"par_fuel_total_amount":parseInt(fuelQuantityId)*parseInt(priceUnitId),
				"par_payment_typeid":paymentModeId,
				"par_payment_vocher_num":voucherId,
				"par_filling_date":"now()",
				"par_remarks":comment,
				"par_pilotid":pid,
				"par_emtid":emtId,
				"par_latitude":"1",
				"par_longitude":1,
				"par_createdbyid":1,
				"par_createdbyroleid":1,
				"par_createdbymoduleid":1,
					
			  "par_oil_quantity":fuelQuantityId,
				"par_fuel_type":fuelCardNo,
				"par_vendorid":1,
				"par_voucherimage":voucherImage,

            
  
//			   "condition":1,
//			   "fueltktId":3,
//			   "vehicleId":vehicleId,
//			   "baseLocationId":1,
//			   "stationId":stationId,
//			   "otherStationDetails":"hyderabad",
//			   "startOdo":previousOdoMeterId,
//			   "endOdo":endOdoMtr,
//			   "expectedMileage":"1",
//			   "fuelQty":fuelQuantityId,
//			   "fuelPricePerLiter":priceUnitId,
//			   "fuelTotalAmount":parseInt(fuelQuantityId)*parseInt(priceUnitId),
//			   "paymenTypeId":paymentModeId,
//			   "paymentVocherNum":1,
//			   "fillingDate":"now()",
//			   "remarks":comment,
//			   "pilotId":pid,
//			   "emtId":emtId,
//			   "latitude":"1",
//			   "longitude":"1",
//			   "cbyId":1,
//			   "cbyroleId":1,
//			   "cbymodId":1,
//			   "status":true
	
	}


		

		var strUrl = Service.saveFuelDetails;
		console.log("assignFuelToVechile  details Url is:" + strUrl);
		console.log("Input is:::::::" + JSON.stringify(jObject));
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(jObject),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				var responseCode = data.responseCode;
				if (200 !== responseCode) {

					showNotificationError("not Inserted ",
							"saveFuelId", "error");

				} else {

					showNotificationError("SAVE Successfully",
							"saveFuelId", "success");

				}
			},
			error : function() {

				console.log('In Error of  assignFuelToVechile');
			}
		});
	}



$("#customSiteLogoBtn").blur(function() {
	$('#sitereg_image_UrlId').empty();
	var file_data = $('#actualSiteLogo').prop('files')[0];
	if (file_data === undefined) {
		return false;
	} else {
		var form_data = new FormData();
		form_data.append('file', file_data);
		imageUpload(form_data,'installationManualid');
	}
});


/*
 * @DESC : Image uploaded file store into server system. @AuthorName : priyadarshini
 * @DATE : 20-11-2019
 */

function imageUpload(form_data,installationManualid) {
    var id = '#' + installationManualid;
    $(id).empty();

	try {
		var strUrl = Service.ViewImage;
		$.ajax({
			type : 'post',
			url : strUrl, // point to server-side controller method
			dataType : 'text',
			cache : false,
			contentType : false,
			processData : false,
			data : form_data,
			success : function(data) {
				var data = JSON.parse(data);
				$(id).val(data.fileViewUri);
				//$(state).appendTo(id);
			},
			error : function(e) {
				console.log("imageUpload error" + e);
			}
		});
	} catch (err) {
		console.log("imageUpload error" + err);
	}
}




/* 
 * @Author : priyadarshini
 * @Date : 19-12-2019
 * @Desc : getVehicle
 */
function getVehicle() {
    try {
        $('#vehicleid').empty();
        var strUrl = Service.getVehicle;
        console.log("getVehicle Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                    console.log('Vehicles not loaded');

                } else {
                    var jsonArray = data.objVehicleControllerDTO;
                    var selectfirst = "<option value='0'>Please Select vehicle</option>";
                    $('#vehicleid').append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var vehicleName = "<option value=" + resData.vehicleId + ">" + resData.vehicleName + "</option>";
                        $(vehicleName).appendTo('#vehicleid');
                    });
                }
            },
            error: function (err) {
                console.error("Error in getVehicle" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getVehicle()' + err);
    }
    $('#vehicleid').trigger("chosen:updated");
    $('#vehicleid').chosen();

}
$('#vehicleid').on('change', function () {
    var vehicleName = $('#vehicleid :selected').text();
    $("#ResisterNumberid").empty();
    getRegsertNo(vehicleName);
});

/*
 * For getting RegsertNo.
 * priyadarshini
 * 30-11-2019
 */
function getRegsertNo(vehicleName) {
    var strUrl = Service.GetRegisterNo;
    console.log("getRegsertNo Url is:" + strUrl);
    var obj_Insert =
            {"vehicleName": vehicleName}
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        //"Content-Type": "application/json",
        async: false,
        crossDomain: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('RegsertNo not loaded');
            } else {
                var jsonArray = data.objControllerDTO;
                var selectfirst = "<option value='0'>Select RegisterNo</option>";
                $('#ResisterNumberid').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var DistrictData = "<option value=" + resData.vehicleID + ">" + resData.registerNo + "</option>";
                    $(DistrictData).appendTo('#ResisterNumberid');
                });
            }
        },
        error: function (err) {
            console.error("Error in  getBaseLoc" + JSON.stringify(err));
        }
    });
    $('#ResisterNumberid').trigger("chosen:updated");
    $('#ResisterNumberid').chosen();
}
function showNotificationError(msg, id, msgType) {

	var boxId = '#' + id;

	var options = {
		// whether to hide the notification on click
		clickToHide : true,
		// whether to auto-hide the notification
		autoHide : true,
		// if autoHide, hide after milliseconds
		autoHideDelay : 2000,
		// show the arrow pointing at the element
		arrowShow : true,
		// arrow size in pixels
		arrowSize : 5,
		// position defines the notification position though uses the defaults below
		position : 'right',
		// default positions
		elementPosition : 'top right',
		globalPosition : 'top right',
		// default style
		style : 'bootstrap',
		// default class (string or [string])
		className : msgType,
		// show animation
		showAnimation : 'slideDown',
		// show animation duration
		showDuration : 400,
		// hide animation
		hideAnimation : 'slideUp',
		// hide animation duration
		hideDuration : 200,
		// padding between element and notification
		gap : 2
	};

	$(boxId).notify(msg, options);
}









	
//	else{
//		alert("Something went wrong! try again");
//	}}