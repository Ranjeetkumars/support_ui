
$(document).ready(function () {
	 var token_id = localStorage.getItem("token");
	   var user_id=localStorage.getItem("userID");
	   var module_id=localStorage.getItem("fms_moduleID");
	   var role_id=localStorage.getItem("fms_roleID");
    try {
   localStorage.clear();
   getSingleRecords();
   $('#fuel-station-address-id').prop("disabled", true);
   $('#PreviousOdoMeterId').prop("disabled", true);
   $("#hideVoucher").hide();
   $("#hideVoucher-image").hide();
   loadFuelType();
   loadVehicleType();
   loadListOfVendar();
   listOfPaymentMode();
   listOfFleetCardDropdown();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});


function assignFuelToVechile(){

	var vehicleId = $("#vehicleid").val();
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
	if(serialId!=null){
		assignSerailId =serialId;
		condition="2";
	}
	else{
		assignSerailId = "null";
		condition="1";
	}
	
	var jObject = { 
            
  
			   "condition":condition,
			   "fueltktId":3,
			   "vehicleId":vehicleId,
			   "baseLocationId":1,
			   "stationId":stationId,
			   "otherStationDetails":"hyderabad",
			   "startOdo":previousOdoMeterId,
			   "endOdo":endOdoMtr,
			   "expectedMileage":"1",
			   "fuelQty":fuelQuantityId,
			   "fuelPricePerLiter":priceUnitId,
			   "fuelTotalAmount":parseInt(fuelQuantityId)*parseInt(priceUnitId),
			   "paymenTypeId":paymentModeId,
			   "paymentVocherNum":1,
			   "fillingDate":"now()",
			   "remarks":comment,
			   "pilotId":pid,
			   "emtId":emtId,
			   "latitude":"1",
			   "longitude":"1",
			   "cbyId":1,
			   "cbyroleId":1,
			   "cbymodId":1,
			   "status":true
	
	}


		

		var strUrl = Service.saveFuelDetails;
		console.log("assignFuelToVechile  details Url is:" + strUrl);
		console.log("Input is:::::::" + JSON.stringify(jObject));
		alert("JSON.stringify(jObject)================="+JSON.stringify(jObject));
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
	
//	else{
//		alert("Something went wrong! try again");
//	}}




function addOrUpDateNewFuel() {
	var vehicleId = $("#vehicleId").val().split(",");
	var shiftTypesId = $("#shift-types-id").val();
	var pid = $("#pilot-id").val();
	var pName = $("#pilot-name").val();
	var emtId = $("#emt-id").val();
	var emtName = $("#emt-name").val();
	var stationId = $("#stationId").val().split(",");
	var fuelStationAddressId = $("#fuel-station-address-id").val();
	var phoneNumberId = $("#phone-number-id").val();
	var mobileNumberId = $("#mobile-number-id").val();
	var previousOdoMeterId = $("#PreviousOdoMeterId").val();
	var endOdoMtr = $("#end-odo-mtr").val();
	var datetimepickerId = $("#datetimepickerId").val();
	var fuelQuantityId = $("#fuel-quantity-id").val();
	var priceUnitId = $("#price-Unit-Id").val();
	var paymentModeId = $("#paymentModeId").val();
	var fuelCardNo = $("#fuel-card-no").val();
	var swipingTypeId = $("#swiping-type-id").val();
	var voucherId = $("#voucherId").val();
	var voucherImageId = $("#voucher-image-id").val();
	var comment = $("#remarksId").val();
	
	var jObject = { 
			   "condition":1,
			   "fueltktId":3,
			   "vehicleId":vehicleId[0],
			   "baseLocationId":1,
			   "stationId":stationId[0],
			   "otherStationDetails":stationId[1],
			   "startOdo":previousOdoMeterId,
			   "endOdo":endOdoMtr,
			   "expectedMileage":"null",
			   "fuelQty":fuelQuantityId,
			   "fuelPricePerLiter":priceUnitId,
			   "fuelTotalAmount":priceUnitId,
			   "paymenTypeId":paymentModeId,
			   "paymentVocherNum":voucherId,
			   "fillingDate":datetimepickerId,
			   "remarks":comment,
			   "pilotId":pid,
			   "emtId":emtId,
			   "latitude":"null",
			   "longitude":"null",
			   "cbyId":user_id,
			   "cbyroleId":role_id,
			   "cbymodId":module_id,
			   "status":true
	
	};
	$.ajax({
		 type: 'POST',
		 url:
		 "http://localhost:2000/FleetManagement/fuelController/insertFuelFillingDetails",
		 success: function (data, textStatus, jqXHR) {
		
		 },
		 data: JSON.stringify(objJson),
		 error: function (e) {
		
		 },
		 dataType: "json",
		 contentType: "application/json"
		 });

}





function selctPayMentMode(){
	console.log('selctPayMentMode method is executed');
	var paymentModeId = $("#paymentModeId").val();
	console.log("paymentModeId::"+paymentModeId);
	if(paymentModeId=="3" || paymentModeId=='3'||paymentModeId==3){
		$("#hideVoucher").show();
		$("#hideVoucher-image").show();
		$("#hide-Fuel-CardNo").hide();
		$("#hide-swiping").hide();
	}
	else{
		$("#hideVoucher").hide();
		$("#hideVoucher-image").hide();
		$("#hide-Fuel-CardNo").show();
		$("#hide-swiping").show();
		
	}
}



//function appendEndOdoMtr(){
//	$("#PreviousOdoMeterId").val("");
//	var endOdoMtr = $("#vehicleid").val().split(",");
//	alert("endOdoMtr=============="+endOdoMtr);
//	$('#PreviousOdoMeterId').val($('#PreviousOdoMeterId').val() + endOdoMtr[1]);
//	
//}



$("#end-odo-mtr").keyup(function (e) {
	//alert("@@@@@@@@@@@@@@@@@@@@@s");
	 var preOdoMtr = $("#PreviousOdoMeterId").val();
	 $("#error-msg-of-odo-mtr").text('');
	 var endOdoMtr = $("#end-odo-mtr").val();
	 if(preOdoMtr==undefined || preOdoMtr=='validate' || preOdoMtr==''||preOdoMtr==""){
		 $("#error-msg-of-odo-mtr").text('');
 		 $("#error-msg-of-odo-mtr").append('Fisrt select vehicle types');
 	 }
	 else{
		 console.log("preOdoMtrpreOdoMtrpreOdoMtr::"+preOdoMtr);
		 console.log("endOdoMtrendOdoMtrendOdoMtr::"+endOdoMtr);
		if(preOdoMtr===endOdoMtr){
			console.log("if------->part");
			 $("#error-msg-of-odo-mtr").text('');
			 $("#error-msg-of-odo-mtr").append('End odo meter should not be same or Less to Previous Odo meter');
		 }
		else if(endOdoMtr<preOdoMtr){
			console.log("else-if------->part");
			 $("#error-msg-of-odo-mtr").text('');
			 $("#error-msg-of-odo-mtr").append('End odo meter should not be same or Less to Previous Odo meter');
		}
		else{
			 $("#error-msg-of-odo-mtr").text('');
		}
	 }
});
//function appendAppendAddress (){
//	$("#fuel-station-address-id").val("");
//	var fuelAddress = $("#stationId").val().split(",");
//	
//	alert("fuelAddress===="+fuelAddress);
//	alert("fuelAddress[1]------"+fuelAddress[1]);
//	//alert('fuelAddressfuelAddress::'+fuelAddress);
//	$('#fuel-station-address-id').val($('#fuel-station-address-id').val() +fuelAddress[1]);
//	
//}


$('#stationId').on('change', function() {
	alert("piku");
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
        	"stationId":stationId 
         
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                	
                    var jsonArray = data.objGetFuelDataBasedOnVehicleIdControllerDTO;
                 
                    $.each(jsonArray, function(i, resData) {
                    	alert("resData.otherStationDetails============"+resData.otherStationDetails);
                        $("#fuel-station-address-id").val(resData.otherStationDetails);
                    });
                }
            },
            error: function(err) {
                console.error("Error in StationAddress" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in StationAddress()' + err);
    }
  
}




























