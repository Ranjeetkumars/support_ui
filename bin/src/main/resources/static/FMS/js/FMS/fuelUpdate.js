
$(document).ready(function () {

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

	var vehicleId = $("#vehicleId").val();
	var shiftTypesId = $("#shift-types-id").val();
	var pid = $("#pilot-id").val();
	var pName = $("#pilot-name").val();
	var emtId = $("#emt-id").val();
	var emtName = $("#emt-name").val();
	var stationId = $("#stationId").val();
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
	
	var getSerailId = sessionStorage.getItem('serialId');
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
			   "vehicleId":vehicleId[0],
			   "baseLocationId":1,
			   "stationId":stationId[0],
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

	//var validationStatus = validateFuelFilling(jObject);
	//if(validationStatus===true){
		console.log("jObjectjObject:"+JSON.stringify(jObject));
		$.ajax({
			 type: 'POST',
			 url:
			 "http://192.168.1.106:2000/FleetManagement/fuelController/insertFuelFillingDetails",
			 success: function (data, textStatus, jqXHR) {
			
				 
				 if(data.result>0||data.result>'0'){
                                     
					 //toastr.info('Fuel Added Successfully!');
				 }
				 else{
					 //toastr.warning('Something went wrong! try again'); 
				 }
			 },
			 data: JSON.stringify(jObject),
			 error: function (e) {
			
			 },
			 dataType: "json",
			 contentType: "application/json"
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
			   "cbyId":1,
			   "cbyroleId":1,
			   "cbymodId":1,
			   "status":true
	};
	$.ajax({
		 type: 'POST',
		 url:
		 "http://192.168.0.102:2000/FleetManagement/fuelController/insertFuelFillingDetails",
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



function appendEndOdoMtr(){
	$("#PreviousOdoMeterId").val("");
	var endOdoMtr = $("#vehicleId").val().split(",");
	$('#PreviousOdoMeterId').val($('#PreviousOdoMeterId').val() + endOdoMtr[1]);
	
}



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
function appendAppendAddress (){
	$("#fuel-station-address-id").val("");
	var fuelAddress = $("#stationId").val().split(",");
	//alert('fuelAddressfuelAddress::'+fuelAddress);
	$('#fuel-station-address-id').val($('#fuel-station-address-id').val() +fuelAddress[1]);
	
}
































