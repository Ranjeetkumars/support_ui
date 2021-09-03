/**
 * Created By Ranjeet kumar
 */

                                                        
                                                        
                                                        
                                                        
  $(document).ready(function () {
	
		 //var token_id = localStorage.getItem("token");
	  	 //  var user_id=localStorage.getItem("userID");
	  	 /// var module_id=localStorage.getItem("fms_moduleID");
		  /// var role_id=localStorage.getItem("fms_roleID");

    try {
    	  loadVehicleTypes();
 localStorage.clear();
getSingleRecords();
							
$('#fuel-station-address-id').prop("disabled", true);
//$('#PreviousOdoMeterId').prop("disabled", true);
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
    
  
  function loadVehicleTypes(){

		 $("#vehicleid").empty();
		    var strUrl = Service.loadVehicleType1;
		    console.log("loadVehicleTypes Url is:" + strUrl);
		    $.ajax({
		        type: "GET",
		        url: strUrl,
		        dataType: "json",
		        async: false,
		        crossDomain: false,
		        success: function (data) {
		            var responsecode = data.responseCode;
		            if (200 !== responsecode) {
		                console.log('VehicleTypes not loaded')
		            } else {
		                var jsonArray = data.objVehicleTypeControllerDTO;
		                var selectfirst = "<option value='0'>Select VehicleTypes</option>";
		                $('#vehicleid').append(selectfirst);
		                $.each(jsonArray, function (i, resData) {
		                    var designation = "<option value=" + resData.vehicleTypeId + ">" + resData.vehicleType + "</option>";
		                    $(designation).appendTo('#vehicleid');
		                });
		                $('#vehicleid').trigger("chosen:updated");

		                $("#vehicleid").chosen();
		            }
		        },
		        error: function () {
		            console.log('Error in loading getVehicleTypes Data' + strUrl);
		        }
		    });

	}
function updateFuelDetails(){
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
	var getSerailId = localStorage.getItem('serialId');

	var jObject = { 
			   "serialId":getSerailId,
			   "condition":2,
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
			   "cbyId":user_id,
			   "cbyroleId":role_id,
			   "cbymodId":module_id,
			   "status":true
	}
	

//	var validationStatus = validateFuelFilling(jObject);
//	if(validationStatus===true){
//		console.log("jObjectjObject:"+JSON.stringify(jObject));
		$.ajax({
			 type: 'POST',
			 url:
			 "http://localhost:2000/FleetManagement/fuelController/insertFuelFillingDetails",
			 success: function (data, textStatus, jqXHR) {
                                
				 if(data.result>0||data.result>'0'){
                               
					// toastr.info('Fuel records update Successfully!');
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
	//}
//	else{
//		alert("Something went wrong! try again");
//	}
}