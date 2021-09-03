/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    try {
        getListOfDistrict_fuel();
       // getSwiping();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

$('#registration').on('shown.bs.modal', function (e) {
    getListOfDistrict_fuel();
    get_shiftTypes();
     $('#hideSelect_swiping').hide();
     getSwiping();

   // getPaymentMode();
});



/*
 * For loading the Districs based on the state ID calling to masterdata
 * priyadarshini
 * 06-05-2019
 * state id is the input
 */
function getListOfDistrict_fuel() {
    $("#districs_id").empty();
    $("#districs_id_reg").empty();
    loadingDistrictsMaster();
    var selectfirst = "<option value='0'>Select District</option>";
    $('#districs_id').append(selectfirst);
    $('#districs_id_reg').append(selectfirst);
    $.each(district, function (i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#districs_id');
        $(districts).appendTo('#districs_id_reg');

    });
    $('#districs_id').trigger("chosen:updated");
    $('#districs_id_reg').trigger("chosen:updated");
    $('#districs_id').chosen();
    $('#districs_id_reg').chosen();
}

;
$('#districs_id').on('change', function () {
    var listOfDistrict = $('#districs_id').val();
    $("#baselocation_id").empty();
    baseLocation_fuel(listOfDistrict);

});
/*
 * For loading the baseloc based on the district ID calling to masterdata
 * priyadarshini
 * 06-05-2019
 * state id is the input
 */
function baseLocation_fuel(listOfDistrict) {
	 $("#baselocation_id").empty();
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#baselocation_id').append(selectfirst);
    $.each(baselocations, function (i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#baselocation_id');
    });
    $('#baselocation_id').trigger("chosen:updated");
    $("#baselocation_id").chosen();

}
;

$('#baselocation_id').on('change', function () {
    var baseLocation = $('#baselocation_id').val();
    $("#Ambulance_Id").empty();
    getAmbulance_fuel(baseLocation);
});
/*
 * For loading the Ambulance  based on the baseLocation calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */
function getAmbulance_fuel(baseLocation) {
    $("#Ambulance_Id").empty();
    loadingAmbulanceMaster(baseLocation);
    var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#Ambulance_Id').append(selectfirst);
    $.each(ambulances, function (i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#Ambulance_Id');
    });

    $('#Ambulance_Id').trigger("chosen:updated");
    $("#Ambulance_Id").chosen();
}
;

/*
 * For loading the ShiftType  calling to masterdata
 * priyadarshini
 * 06-05-2019
 *no input
 */
function get_shiftTypes() {
    if (shiftType.length < 1 || shiftType === []) {
        // here calling masterdata ajax call
        loadingShiftTypeMaster();
        $.each(shiftType, function (i, resData) {
            var shiftType = "<option value=" + resData.shiftTypeID + ">" + resData.shiftTypeName + "</option>";
            $(shiftType).appendTo('#shiftTypeId');

        });
    }
    $("#shiftTypeId").chosen();
}
;
//function getListOfDistrict_reg() {
//    getListOfDistrict_fuel();
//}
$('#districs_id_reg').on('change', function () {
    var listOfDistrict = $('#districs_id_reg').val();
    $("#basloc_id_reg").empty();
    baseLocation_reg(listOfDistrict);
});
/*
 * For loading the baseloc  for reg based on the district ID calling to masterdata
 * priyadarshini
 * 06-05-2019
 * state id is the input
 */
function baseLocation_reg(listOfDistrict) {
	 $("#basloc_id_reg").empty();
    loadingBaseLocationMaster(listOfDistrict);

    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#basloc_id_reg').append(selectfirst);
    $.each(baselocations, function (i, resData) {
    var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
    $(baselocation).appendTo('#basloc_id_reg');
    });
    $('#basloc_id_reg').trigger("chosen:updated");
    $("#basloc_id_reg").chosen();



}
;
$('#basloc_id_reg').on('change', function () {
    var baseLocation = $('#basloc_id_reg').val();
    $("#ambulance_id_reg").empty();
    getAmbulance_reg(baseLocation);
});
/*
 * For loading the Ambulance on reg  based on the baseLocation calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */
function getAmbulance_reg(baseLocation) {
	 $("#ambulance_id_reg").empty();
    // here calling masterdata ajax call
    loadingAmbulanceMaster(baseLocation);
    var selectfirst ="<option value='0'>Select Ambulance</option>";
    $('#ambulance_id_reg').append(selectfirst);

    $.each(ambulances, function (i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#ambulance_id_reg');
    });
    $('#ambulance_id_reg').trigger("chosen:updated");
    $("#ambulance_id_reg").chosen();

}
;

$('#ambulance_id_reg').on('change', function () {
    var ambualceId = $('#ambulance_id_reg').val();
    getOdoMeter_reg(ambualceId);

});

$('#ambulance_id_reg').on('change', function () {
    var ambualceId = $('#ambulance_id_reg').val();
    $('#fleetcardNoId').empty();
    getFuelCardNoBasedOnAmbulanceId(ambualceId);
    $('#paymentMode_id').val('1');
    $('#hideSelect_swiping').show();
    $("#hidevoucherNo").hide();

});



/*
 * For loading the previous OdoMeter  based on the ambualceId calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */

function getOdoMeter_reg(ambualceId) {

   // alert("getOdoMeter_reg");
    if (odoMeter.length < 1 || odoMeter === []) {
        // here calling masterdata ajax call
        loadingOdometerMaster(ambualceId);
        var odoMeter1 = odoMeter.toString();
     //   alert("odoMeter1==="+odoMeter1);
    }

}
$('#districs_id_reg').on('change', function () {
    var listOfDistrict = $('#districs_id_reg').val();
    $("#fuelStation_id").empty();

    getFuelStation(listOfDistrict);

});


/*
 * For loading the FuelStation  based on the DistrictId 
 * priyadarshini
 * 06-05-2019
 * District id is the input
 */
function getFuelStation(listOfDistrict) {
    $("#fuelStation_id").empty();
    $('#AddressId').val("");
    $('#PhoneNoId').val("");
    $('#mobileNoId').val("");
    try {

        var strUrl = Service.getFuelStation + "/" + listOfDistrict;
        console.log("getFuelStation Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                   // alert("No FuelStation Found");
                } else {

                    var jsonArray = data.fuelControllerDTOs;
                    var selectfirst = "<option value='-1'>Select fuel station</option>";
                    $('#fuelStation_id').append(selectfirst);
                    $.each(jsonArray, function (i, resData) {

                        var fuelStation = "<option value=" + resData.serialID + ">" + resData.other_station_name + "</option>";
                        $(fuelStation).appendTo('#fuelStation_id');
                    });

                }
            },
            error: function (err) {
                console.error("Error in districts" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getFuelStation()' + err);
    }
    $('#fuelStation_id').trigger("chosen:updated");
    $("#fuelStation_id").chosen();
}
;
$('#fuelStation_id').on('change', function () {
    var fuelStation = $('#fuelStation_id').val();

    getFuelStationDetails(fuelStation);

    hideFuelStationDetails();
});

/*
 * For loading the FuelStationDetails  based on the stationId
 * priyadarshini
 * 06-05-2019
 * station id is the input
 */
function getFuelStationDetails(fuelStation) {
    if (fuelStation === 0) {

        $('#AddressId').val("");
        $('#PhoneNoId').val("");
        $('#mobileNoId').val("");
    }


    try {
        var strUrl = Service.getFuelStationDetails + "/" + fuelStation;

        console.log("getFuelStation Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                   // alert("No Fuel Station Found");
                } else {
                    var jsonArray = data.fuelControllerDTOs;
                    $.each(jsonArray, function (i, resData) {
                        var PhoneNo = resData.other_station_phone;
                        var mobileNo = resData.other_station_mobile;
                        var address = resData.other_station_address;
                        $('#AddressId').val(address);
                        $('#PhoneNoId').val(PhoneNo);
                        $('#mobileNoId').val(mobileNo);

                    });
                }
            },
            error: function (err) {
                console.error("Error in districts" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getDistrictsData()' + err);
    }
}
;
//VALIDATON
function hideFuelStationDetails() {


    var storeOnchangeDetails = $("#fuelStation_id").val();


    if (storeOnchangeDetails != 0 || storeOnchangeDetails != '0') {
        $("#FuelStationName").hide();
    }
    else {

        $("#FuelStationName").show();
        $("#FuelStationName").val("");
        $('#AddressId').val("");
        $('#PhoneNoId').val("");
        $('#mobileNoId').val("");
    }
}
function fule_Details_Diable() {

    var ListOfFuelStation = $('#fuelStation_id').val();
    if (ListOfFuelStation === 0 || ListOfFuelStation === '0' || ListOfFuelStation === "0") {
      //  $("#FuelStationNameId").prop("disabled", true);
        $("#AddressId").prop("disabled", false);
        $("#PhoneNoId").prop("disabled", false);
        $("#mobileNoId").prop("disabled", false);
        $("#FuelStationNameId").prop("disabled", false);

    } else {
       //$("#FuelStationNameId").prop("disabled", false);
        $("#AddressId").prop("disabled", true);
        $("#PhoneNoId").prop("disabled", true);
        $("#mobileNoId").prop("disabled", true);
        $("#FuelStationNameId").prop("disabled", true);
    }

}
$('#fuelStation_id').on('change', function () {
    fule_Details_Diable();
});
/*
 * For loading the PaymentMode  
 * priyadarshini
 * 06-05-2019
 * no input
 */
function getPaymentMode(ambulance) {
  $('#fleetcardNoId').empty();
    try {
        var strUrl = Service.getPaymentMode+"/"+ambulance;
        console.log("fuel_card_number Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                    alert("No FuelStation Found");
                } else {
                    var jsonArray = data.fuelControllerDTOs;
                    $.each(jsonArray, function (i, resData) {
                        var fuel_card_number = "<option value=" + resData.vehicleID + ">" + resData.fuel_card_number + "</option>";
                        $(fuel_card_number).appendTo('#fleetcardNoId');
                        //alert("resData.vehicleID"+resData.vehicleID);
                        fleetCard_Details_Diable();

                    });
                }
            },
            error: function (err) {
                console.error("Error in fuel_card_number" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in fuel_card_number()' + err);
    }
    $('#fleetcardNoId').trigger("chosen:updated");
    $("#fleetcardNoId").chosen();
}getFuelCardNoBasedOnAmbulanceId(0);
;

/*
 * For loading the PaymentMode  
 * priyadarshini
 * 06-05-2019
 * no input
 */

function getFuelCardNoBasedOnAmbulanceId(ambulanceNo) {
	$('#fleetcardNoId').empty("");
    try {
        var strUrl = Service.getFuelCardNoBasedOnAmbulanceId+"/"+ambulanceNo;
        console.log("fuel_card_number Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (600== responsecode) {
                   // alert("No Data Found");
                    getPaymentMode(ambulanceNo);
                    fleetCard_Details_Diable();
                    $("#otherfleetCard_id").prop("disabled", false);
                    return true;
                } else if(600!== responsecode) {
                    var jsonArray = data.fuelControllerDTOs;
                    $.each(jsonArray, function (i, resData) {
                        var fuel_card_number = "<option value=" + resData.vehicleID + ">" + resData.fuel_card_number + "</option>";
                        $(fuel_card_number).appendTo('#fleetcardNoId');
                        $("#otherfleetCard_id").prop("disabled", true);

                    });
                }
            },
            error: function (err) {
                console.error("Error in fuel_card_number" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in fuel_card_number()' + err);
    }
    $('#fleetcardNoId').trigger("chosen:updated");
    $("#fleetcardNoId").chosen();
    

}
;

function getSwiping() {
	$('#swiping_id').empty("");
    try {
        var strUrl = Service.getSwiping;
        console.log("getSwiping url====>:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (600== responsecode) {
                    alert("No Data Found");          
                } else if(600!== responsecode) {
                    var jsonArray = data.fuelControllerDTOs;
                    var selectfirst = "<option value='-1'>-Select One-</option>";
                    $('#swiping_id').append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var fuel_card_number = "<option value=" + resData.serialID + ">" + resData.swipe_id + "</option>";
                        $(fuel_card_number).appendTo('#swiping_id');
                     //   $("#swiping_id").prop("disabled", true);

                    });
                }
            },
            error: function (err) {
                console.error("Error in fuel_card_number" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in fuel_card_number()' + err);
    }
    $('#swiping_id').trigger("chosen:updated");
    $("#swiping_id").chosen();
    

}
;

//VALIDATON OF PaymentMode
function hidePaymentMode() {
    var storeOnchangeValue = $("#paymentMode_id").val();

    if (storeOnchangeValue == 1) {

        $("#hideSelect").show();
        $('#hideSelect_swiping').show();
        $('#other_fuel_card_no').show();
        $("#hidevoucherNo").hide();
    }
    else {
        $("#hideSelect").hide();
        $('#hideSelect_swiping').hide();
        $('#other_fuel_card_no').hide();
        $("#hidevoucherNo").show();
    }
}
//voucher disable
/*function voucherNo_Disable() {
    var PaymentMode = $('#paymentMode_id').val();
    if (PaymentMode === "0" || PaymentMode === 0 || PaymentMode === 1 || PaymentMode === "1") {
        $("#voucherNo_id").prop("disabled", true);
    }
    else if (PaymentMode === "2" || PaymentMode === 2) {
        $("#voucherNo_id").prop("disabled", false);
    }
}*/
$('#paymentMode_id').on('change', function () {
    voucherNo_Disable();
    
});
//fleet card validation.
function fleetCard_Details_Diable() {
    var fuelCardNo = $('#fleetcardNoId').val();
    if (fuelCardNo ==0) {
        $("#otherfleetCard_id").prop("disabled", false);
    }
    else if (fuelCardNo !== 0) {
        $("#otherfleetCard_id").prop("disabled", true);
    }
}
$('#fleetcardNoId').on('change', function () {
    fleetCard_Details_Diable();
});

/*
 * For inserting  the FuelStationDetails details.
 * priyadarshini
 * 06-05-2019
 * the input are
 */
function saveRegistationDetails() {
	
$('#remarks_reg').empty();
$('#offRoadTimeReg').empty();
    var previous_odometer=$('#previousOdoId').val();
    var district = $("#districs_id_reg").val();
    $('#districtId').val(district);
    var BaseLocation = $("#basloc_id_reg").val();
    $('#baselocationId').val(BaseLocation);
	var ambulanceId = $("#ambulance_id_reg").val();
	var ambulance_reg_number = $("#ambulance_id_reg option:selected").text();
	$('#ambulance').val(ambulance_reg_number);
	var listOfShiftType = $("#shiftTypeId").val();
	var PilotID = $("#Pilot_id_reg").val();
	$('#pilot_id').val(PilotID);
	var PilotName = $("#PilotName_id_reg").val();
	var EmtID = $("#emt_id_reg").val();
	$('#emt_id').val(EmtID);
	var EmtName = $("#emtName_reg").val();
	var FuelStationForRegistration = $("#fuelStation_id").val();
	var Address;
	var address1;
	var mobileNo;
	var PhoneNo;
	var FuelStationName;
	mobileNo = $('#mobileNoId').val();
	PhoneNo = $('#PhoneNoId').val();
	FuelStationName = $("#FuelStationNameId").val();
	Address = $("#AddressId").val();
	var address_Id=Address.replace("'"," ");
	address1 = Address.replace(/,/g, "");
	address_1=address1.replace("'"," ");
	PhoneNo = $("#PhoneNoId").val();
	mobileNo = $("#mobileNoId").val();
	FuelStationName = $("#fuelStation_id option:selected").text();
	var fuel_st_name=FuelStationName.replace("'"," ");
	console.log("fuel_st_name====>"+fuel_st_name);
	var address = $('#FuelStationNameId').val();
	var mobile_no = $('#mobileNoId').val();
	var previousOdoMeter = $("#previousOdoId").val();
	var endOdoMeter = $("#endOdoId").val();
	$('#endOdometerNo').val(endOdoMeter);
	var fillingtDataTime = $('#fillingDateId').val();
	$('#fuel_filling_date').val(fillingtDataTime);
	var fillingtDataTime1 = moment(fillingtDataTime).format("YYYY-MM-DD");
	var fuelQuantity = $("#fuelQuantity_id").val();
	$('#fuel_qty').val(fuelQuantity);
	var PaymentMode = $("#paymentMode_id").val();
	var fuelAmount = $("#fuelAmount_id").val();
	$('#fuel_amount').val(fuelAmount);
	var voucherNo = $("#voucherNo_id").val();
	var paymentNo = $("#paymentNo_id").val();
	var OthersFleetCard = $("#otherfleetCard_id").val();//otherfleetCard_id
	var remarks = $("#fuelReg_Remarks_id").val();
	$('#remarksId').val(remarks);
	var Supervisor = $("#supervisor_id").val();
	var fleetCardNo_id=$('#fleetcardNoId').val();
	var swipingId=$('#swiping_id').val();
    
    var fuelCardNo;
/*	if(PilotID===''||PilotID===null){
		PilotID=0;
	}
	
	if(PilotName===''||PilotName===null){
		PilotName='0';
	}
	
	if(EmtID===''||EmtID===null){
		EmtID=0;
	}
	if(EmtName===''||EmtName===null){
	var	EmtName='0';
	}
	
	if(PhoneNo===''||PhoneNo===null){
		var	PhoneNo='0';
		}*/
    // validation
    if (district === '0') {
        showNotificationError("Select District", "districs_id_reg", "error");
        return;
    }

    else if (BaseLocation === '0') {
        showNotificationError("Select Base Location", "basloc_id_reg", "error");
        return;
    }
    else if (ambulanceId === '0') {
        showNotificationError("Select Ambulances", "ambulance_id_reg", "error");
        return;
    }
    else if (listOfShiftType === '0') {
        showNotificationError("Select ShiftType", "shiftTypeId", "error");
        return;
    }
    else if (PilotID === ''||PilotID===''||PilotID===null) {
        showNotificationError("Enter Pilot Id", "Pilot_id_reg", "error");
        return;
    }//Address
    else if (PilotName === ''||PilotName===''||PilotName===null) {
        showNotificationError("Enter Pilot Name", "PilotName_id_reg", "error");
        return;
    }//Address
    
    else if (EmtID === ''||EmtID===''||EmtID===null) {
        showNotificationError("Enter Emt Id", "emt_id_reg", "error");
        return;
    }//Address
    
    else if (EmtName === ''||EmtName===''||EmtName===null) {
        showNotificationError("Enter EmtName", "emtName_reg", "error");
        return;
    }//Address
    
    else if (FuelStationForRegistration === '-1') {
        showNotificationError("Select Fuel Station", "fuelStation_id", "error");
        return;
    }//fillingDateId
    
    else if (FuelStationForRegistration === '0') {
    	
    	if (address === ''||address===''||address===null) {
            showNotificationError("Please Enter Fuel Station Name", "FuelStationNameId", "error");
            return;
        }//Address
    	else if(Address===''||Address===""||Address===null){
        	showNotificationError("Please Enter Address", "AddressId", "error");
            return;
        }
    	else if(mobile_no===''||mobile_no===""||mobile_no===null){
        	showNotificationError("Please Enter Mobile No", "mobileNoId", "error");
            return;
        }else if(mobile_no.length!=10){
        	showNotificationError("Please Enter Valid Mobile No", "mobileNoId", "error");
            return;	
        }


    }
    

    
    if (fillingtDataTime === null||fillingtDataTime===''||fillingtDataTime==="") {
        showNotificationError("Select Filling Date Time", "fillingDateId", "error");
        return;
    }//
   

    else  if (previousOdoMeter === '' || previousOdoMeter === null) {
        showNotificationError("Enter Previous Odometer Reading", "previousOdoId", "error");
        return;
    }
    else  if (endOdoMeter === '' || endOdoMeter === null) {
        showNotificationError("Enter End OdoMeter", "endOdoId", "error");
        return;
    }
    else if (parseInt(endOdoMeter) < parseInt(previousOdoMeter))
    {
        showNotificationError("End Odometer Should Be Greater or Equal To Previous Odometer", "endOdoId", "error");
        return;

    }
    else if (fillingtDataTime1 === "" || fillingtDataTime1 === '' || fillingtDataTime1 === '') {
        showNotificationError("Select fillingtDataTime", "fillingDateId", "error");
        return;
    }
    else if (fuelQuantity === '' || fuelQuantity === null) {
        showNotificationError("Select fuelQuantity", "fuelQuantity_id", "error");
        return;
    }
    else if (fuelAmount === '' || fuelAmount === null) {
        showNotificationError("Enter Fuel Amount", "fuelAmount_id", "error");
        return;
    }
	
    var fuelCardNo;
	if (PaymentMode === "1" || PaymentMode === '1' || PaymentMode === 1) {
		fuelCardNo = $("#fleetcardNoId option:selected").text();
		/*if (fuelCardNo === 'Select Fleet Card No'
				|| fuelCardNo === "Select Fleetcard No") {
			showNotificationError("Select FuelCard No", "fleetcardNoId",
					"error");
			return;
			alert("fuelCardNo====>"+fuelCardNo);
		}*/ 
		var fuelId=$('#fleetcardNoId').val();
		if(fuelId==0){
			fuelCardNo=$('#otherfleetCard_id').val();
			if(fuelCardNo==''||fuelCardNo==""||fuelCardNo==null){
			showNotificationError("Enter Other Fuel Card No", "otherfleetCard_id",
			"error");
			return;
			}
		}

	} if (PaymentMode === "2" || PaymentMode === '2' || PaymentMode === 2) {
		fuelCardNo = $('#voucherNo_id').val();
		if (fuelCardNo === '' || fuelCardNo === "") {
			showNotificationError("Enter Voucher No", "voucherNo_id", "error");
			return ;
		}

	}if (PaymentMode === "0" || PaymentMode === '0' || PaymentMode === 0) {
		showNotificationError("select Payment Mode", "paymentMode_id", "error");
		return;
	}
	if(PaymentMode==="1"||PaymentMode==='1'){
	if (swipingId === '-1' || swipingId === "-1") {
		showNotificationError("Select Swiping", "swiping_id", "error");
		return;
	}
	   }
	 
	 if (Supervisor === '' || Supervisor === null) {
		showNotificationError("Enter Supervisor  Id", "supervisor_id", "error");
		return;
	}
	 
	else if (remarks === '' || remarks === null) {
		showNotificationError("Enter Remarks", "fuelReg_Remarks_id", "error");
		return;
	}// fuelReg_Remarks_id
   console.log("fuelCardNo==="+fuelCardNo);
   
   
   var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
    var objJson = {
        "vehicleID": ambulanceId,
        "baselocationID": BaseLocation,
        "vehicleName": ambulance_reg_number,
        "stationId": FuelStationForRegistration,
        "odometerreading": endOdoMeter,
        "fuel_qty": fuelQuantity,
        "fuel_card_number": fuelCardNo,
        "payment_type_id": PaymentMode,
        "paid_amount": fuelAmount,
        "emso_id": EmtID,
        "pilot_id": PilotID,
        "remarks": remarks,
        "filing_date": fillingtDataTime1,
        "created_dtm": "now()",
        "created_by_id": createdyid,
        "created_by_roleid": createdbtroleid,
        "supervisor_id": Supervisor,
        "district_id": district,
        "pilot_name": PilotName,
        "emso_name": EmtName,
        "status_id": "2",//doubt
        "other_station_name": fuel_st_name,
        "other_station_phone": PhoneNo,
        "other_station_mobile": mobileNo,
        "other_station_address": address_1,
        "swipe_id":swipingId,
        "previous_odo_meter_reading":previous_odometer

    };
    var strUrl = Service.saveRegistationDetails;
    console.log("saveRegistationDetails Url is:" + strUrl);
    console.log("Input is:::::::" + JSON.stringify(objJson));
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function (data) {
           $('#ticketId').val(data.output);
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
               // alert("Not Inserted ");
           /*     var divTag = document.createElement("h2");
                $(divTag).css("text-align", "center");
                $(divTag).html("Please Enter Valid Data");
                $('#fuel_registration_id').append(divTag);*/

            } else {
            	get_ohd_mail_directory();
                showNotificationError("Inserted Successfully", "fuel_registration_id", "success");
          //      sendMailAndSmsToDm();
                reset_Registation();

                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }

        }, error: function () {

            console.log('In Error of  Details ');
        }
    });
}
function showNotificationError(msg, id, msgType) {
    var boxId = '#' + id;

    var options = {
        // whether to hide the notification on click
        clickToHide: true,
        // whether to auto-hide the notification
        autoHide: true,
        // if autoHide, hide after milliseconds
        autoHideDelay: 2000,
        // show the arrow pointing at the element
        arrowShow: true,
        // arrow size in pixels
        arrowSize: 5,
        // position defines the notification position though uses the defaults below
        position: 'right',
        // default positions
        elementPosition: 'top right',
        globalPosition: 'top right',
        // default style
        style: 'bootstrap',
        // default class (string or [string])
        className: msgType,
        // show animation
        showAnimation: 'slideDown',
        // show animation duration
        showDuration: 400,
        // hide animation
        hideAnimation: 'slideUp',
        // hide animation duration
        hideDuration: 200,
        // padding between element and notification
        gap: 2
    };

    $(boxId).notify(msg, options);
}
function reset_Registation() {
    $('#districs_id_reg').val("0").trigger("chosen:updated");
    $('#basloc_id_reg').val("0").trigger("chosen:updated");
    $('#ambulance_id_reg').val("0").trigger("chosen:updated");
    $('#shiftTypeId').val("0").trigger("chosen:updated");
    $('#Pilot_id_reg').val("");
    $('#PilotName_id_reg').val("");
    $('#emt_id_reg').val("");
    $('#emtName_reg').val("");
    $('#fuelStation_id').val("-1");
    $('#AddressId').val("");
    $('#FuelStationNameId').val("");
    $('#mobileNoId').val("");
    $('#PhoneNoId').val("");
    $('#endOdoId').val("");
    $('#previousOdoId').val("");
    $('#fillingDateId').val("");
    $('#fuelQuantity_id').val("");
    $('#fuelAmount_id').val("");
    $('#paymentMode_id').val("0");
    $('#fuelAmount_id').val("");
    $('#voucherNo_id').val("");
    $('#fleetcardNoId').val("0");
    $('#otherfleetCard_id').val("");
    $('#fuelReg_Remarks_id').val("");
    $('#supervisor_id').val("");
    $('#paymentNo_id').val("");
    $('#fuelStation_id').val("-1").trigger("chosen:updated");
    $('#fleetcardNoId').val("0").trigger("chosen:updated");
    $('#swiping_id').val("0");
    baseLocation_reg(0);
    getAmbulance_reg(0);
/*    $('#districs_id_reg').empty();
    $('#basloc_id_reg').empty();
    $('#ambulance_id_reg').empty();
    $('#shiftTypeId').empty();*/


}
;

/*
Reseting Inserting Leave Fields
*/
$('#insert_reset').on("click", function() {
   $('#start_date').val('');
   $('#end_date').val('');
   $('#fuelReg_Remarks_id').val('');
   $('#days_Id').val('');
   $("#leave_Type_Id").val('').trigger("chosen:updated");
});

function reset_search() {
    $('#districs_id').val("0").trigger("chosen:updated");;
    $('#baselocation_id').val("0").trigger("chosen:updated");;
    $('#Ambulance_Id').val("0").trigger("chosen:updated");;
    $('#fromDateId').val("");
    $('#exptectedtodate').val("");
    $('#ticketId').val("");
    $('#full_Filling_Id').empty();
    $('#toDateId').val('');
    baseLocation_fuel(0);
    getAmbulance_fuel(0);
}
$('#PilotName_id_reg').keypress(function (e) {
    $('#check').empty();
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else
    {
        e.preventDefault();
        $("#check").append("Please Enter Alphabate");
        return false;
    }
});
////VALIDATON
$('#emtName_reg').keypress(function (e) {
    $('#check').empty();
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else
    {
        e.preventDefault();
        $("#check").append("Please Enter Alphabate");
        return false;
    }
});




/*
 * For searching  the FuelStationDetails details.
 * priyadarshini
 * 06-05-2019
 * inputs  districtId,baselocation_ID,vehicle_ID,exptectedfromdate,exptectedtodate,fuelTkt_id
 */
function get_Fuel_filling_Search() {
    try {
        var districtId = $('#districs_id').val();
        var baselocation_ID = $('#baselocation_id').val();
        var vehicle_ID = $('#Ambulance_Id').val();
        var exptectedfromdate = $('#fromDateId').val();
        var exptectedtodate = $('#toDateId').val();
        var fuelTkt_id = $('#ticketId').val();
        var syy = '¥';
       /* var isStatus = isCheckValidationOfFromDateAndToDate();
        if (isStatus === false || isStatus === "false" || isStatus === 'false') {
            return true
        }*/
        
     
       
        
        if (districtId === null | districtId === '') {
            districtId = 0;
        }
        if (baselocation_ID === null | baselocation_ID === '') {
            baselocation_ID = 0;
        }
        if (vehicle_ID === null | vehicle_ID === '') {
            vehicle_ID = 0;
        }

        if (exptectedfromdate === null | exptectedfromdate === '') {

            exptectedfromdate = syy;
        }
        if (exptectedtodate === null | exptectedtodate === '') {

            exptectedtodate = syy;
        }
        if (fuelTkt_id === null | fuelTkt_id === '') {

            fuelTkt_id = 0;
        }
        
        if (districtId==0 &&baselocation_ID==0 &&vehicle_ID==0 &&exptectedfromdate==syy&&exptectedtodate==syy&&fuelTkt_id==0){   	
        	showNotificationError("Please Select At Least One Search Parameter", "search_id", "error");
        	//$.toaster({ priority : 'warning', title : 'fgdfg', message : 'plzzz selsdfgsdgf'});
        	return true;
        }
           
       /* if(districtId!==0||baselocation_ID!==0||vehicle_ID!==0||exptectedfromdate!==0||fuelTkt_id!==0||exptectedtodate!==){
          	 alert("Please Select One Search Parameter");
          	return true
           } */
        var objJson = {
            district_id: districtId,
            baselocationID: baselocation_ID,
            vehicleID: vehicle_ID,
            exptectedfromdate: exptectedfromdate,
            exptectedtodate: exptectedtodate,
            fuel_tkt_id: fuelTkt_id
        };
        
        var strUrl = Service.get_Fuel_Filling_Search;

        console.log("strUrl : " + strUrl);

        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(objJson),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function (data) {
                var responsecode = data.responseCode;
                $('#full_Filling_Id').empty();
                if (200 !== responsecode || data.status == "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No Data Available....");
                    $('#full_Filling_Id').append(divTag);
                } else {

                    var jsonArray = data.fuelControllerDTOs;
                    if (jsonArray.length > 0) {
                        fuel_Filling_Data_DOM(jsonArray);
                        loadDataTable();
                    }
                }
            },
            error: function (err) {
                console.error('update Stock error: ' + JSON.stringify(err));
            }
        });
    }
    catch (err) {
        console.error("error occur in search()" + JSON.stringify(err));


    }
}
//dom
function fuel_Filling_Data_DOM(strData) {

    try {
        //For Div Tag
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

//For table
        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example");
        $(objDivTag).append(ObjTableTag);
//For table head
        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);

//For table row
        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);



//For table Heading1
        var objTHead1 = document.createElement("th");
        $(objTHead1).html("S.No");
        $(objTHead1).addClass("text-center");
        $(objTr).append(objTHead1);

//For table Heading2
        var objTHead2 = document.createElement("th");
        $(objTHead2).html("Ticket Id");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);

//For table Heading3
        var objTHead3 = document.createElement("th");
        $(objTHead3).html("District");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);


        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Base Location");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);
//For table Heading4
        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Ambulance No");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);

        //For table Heading5
        var objTHead6 = document.createElement("th");
        $(objTHead6).html("Fuel Filling Date");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Fuel Station Details");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

        //For table Heading5
        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Odo-Meter Reading");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        //For table Heading5
        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Fuel Quantity(Ltrs)");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);

        //For table Heading5
        var objTHead10 = document.createElement("th");
        $(objTHead10).html("Payment Mode");
        $(objTHead10).addClass("text-center");
        $(objTr).append(objTHead10);

        //For table Heading5
        var objTHead11 = document.createElement("th");
        $(objTHead11).html("Fuel Card No");
        $(objTHead11).addClass("text-center");
        $(objTr).append(objTHead11);


        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);

// Table Data Appending Here

        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");


            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);


            var tablcol2 = document.createElement("td");
            $(tablcol2).html(strData[i].fuel_tkt_id);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).html(strData[i].districtName);
            $(tbleRow).append(tablcol3);


            var tablcol4 = document.createElement("td");
            $(tablcol4).html(strData[i].baselocationName);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].vehicleName);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].filing_date);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).html(strData[i].other_station_name);
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            $(tablcol8).html(strData[i].odometerreading);
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            $(tablcol9).html(strData[i].fuel_qty);
            $(tbleRow).append(tablcol9);


            var tablcol10 = document.createElement("td");
            $(tablcol10).html(strData[i].payment_type_id);
            $(tbleRow).append(tablcol10);

            var tablcol11 = document.createElement("td");
            $(tablcol11).html(strData[i].fuel_card_number);
            $(tbleRow).append(tablcol11);

            $(objTBody).append(tbleRow);

        }
        $("#full_Filling_Id").append(objDivTag);
    } catch (err) {
        console.log("fuel_filling_Id" + err);
    }
}
//VALIDATON
function isCheckValidationOfFromDateAndToDate() {
    //clear paragraph value
    $("#statusOfToDateAndFromDate").empty();
    var fromDate = $("#fromDate_Id").val();
    var todate = $("#toDate_Id").val();
    var d1 = Date.parse(todate);
    var d2 = Date.parse(fromDate);
    if (d1 <= d2) {
        $("#statusOfToDateAndFromDate").append("Todate should be greater than from FromDate");
        return false
    }
    return true;
}

function loadDataTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 10,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'FuelFillingData'},
            {extend: 'pdf', title: 'FuelFillingData'},
            {extend: 'print',
                customize: function (win) {
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
//////VALIDATON
//$('#fillingDateId').datepicker({
//    format: "dd/mm/yyyy",
//    todayHighlight: true,
//    // autoclose: true,
//    // orientation: "top",
//    endDate: "today"
//
//});

/*$('#fromDateId').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});*/
/*$('#toDateId').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});
*/
function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
	return false;
	return true;
} 


$(document).ready(function () {
    $('#datetimepicker1').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#datetimepicker1').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});


$(document).ready(function () {
    $('#strtDate').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#strtDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//endDate

$(document).ready(function () {
    $('#endDate').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#endDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//

//here getting mail and mobile no. to send mail
function get_ohd_mail_directory(){
	var ticket_id=$('#ticketId').val();//hiddenId
	var distid=$('#districtId').val();
	var baselocId=$('#baselocationId').val();
	var ambulanceno=$('#ambulance').val();
	var fuel_filing_date=$('#fuel_filling_date').val();
	var message="AP opdesk Tkt ID:"+ticket_id+",Dist:"+distid+",BL:" +baselocId+",A.No:" +ambulanceno+",Category:Fuel Filling,Date&Time:"+fuel_filing_date+" ERS";	
	//email template
	var demo="hello";
	var remarks=$('#remarksId').val();
	var ticket_id=$('#ticketId').val();//hiddenId
	var distid=$('#districtId').val();
	var baselocId=$('#baselocationId').val();
	var ambulanceno=$('#ambulance').val();
	var fuel_filing_date=$('#fuel_filling_date').val();
	var odometerId=$('#endOdometerNo').val();
	var pilotId=$('#pilot_id').val();
	var emtId=$('#emt_id').val();
	var fuelAmount=$('#fuel_amount').val();
	var fuel_quantity=$('#fuel_qty').val();
	var emailtext;
	//alert("remarks4535====>"+remarks);
	
	var emailtext =	'<html><head><title>Fuel Filling</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
	/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>';*/

	/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';*/

	/*emailtext=emailtext+'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>';*/

	emailtext=emailtext+' <style>.container{width: 650px;margin:0px auto;padding:20px;}body{padding: 50px;}.gray-bg{background:#f6f6f6;}.white-bg{background:#fff;}';

	emailtext=emailtext+' table, th, td { border: 1px solid black; border-collapse: collapse; } table{width:100%;  }th, td { padding: 5px; color: black;text-align:center; font-size: 14px;}.fw-600{font-weight:600;}';        

	emailtext=emailtext+'.maintext{background-color: #1f74bd;color: white; height: 50px;font-weight: 800; text-align: center;  font-size: 18px;}.text2{background-color:  #f5f5f5;}.text-light-gray{margin-left: 930px; }</style> </head>'; 

	emailtext=emailtext+'<body class="gray-bg"><div class="container white-bg"><h4> Dear All</h4><p>The Following are the activity Details of Operational Helpdesk</p><table ><tr><th colspan="2" class="maintext">Issue Type:Fuel Filling</th></tr> <tr><td >Reason</td> <td>'+remarks+'</td> ';

	emailtext=emailtext+'</tr> <tr><td class="text2">Base Location</td><td class="text2">'+baselocId+'</td></tr><tr><td>Ambulance Register No:</td> <td>'+ambulanceno+'</td>' ;   

	emailtext=emailtext+'</tr><tr><td class="text2">Odo meter Reading:</td><td class="text2"></td></tr><tr><td>Escalateed To:</td><td>Fleet Manager</td>';

	emailtext=emailtext+'</tr><tr><td class="text2">District:</td><td class="text2">'+distid+'</td></tr><tr><td>EMT No:</td><td class="text2">'+emtId+'</td>';

	emailtext=emailtext+'</tr><tr><td class="text2">PILOT No:</td><td class="text2">'+pilotId+'</td>';

	emailtext=emailtext+'</tr><tr><td>Status:</td><td>Open</td></tr><tr><td class="text2">Fuel Filling Date:</td><td class="text2"></td></tr><tr><td >Fuel Filling Date:</td><td class="text2">'+fuel_filing_date+'</td>';

	emailtext=emailtext+'</tr></table><br><br><div><span class="text-green">Thanks and Regards,<br><span class="text-purple">AP ERS Team.</span></div></div>';                     

	emailtext=emailtext+'<div class="text-center "> <p><span class="text-light-gray">Powered by</span> <a href="http://www.procreate.co.in/" target="_blank" class="text-purple">ProCreate Techno Systems Pvt Ltd.</a></p></div></body></html>';                                                                     	
	console.log("====>"+message);
	var distid=$('#districtId').val();
	$('#swiping_id').empty("");
        var strUrl = Service.get_ohd_mail_directory+"/"+distid;
        console.log("get_ohd_mail_directory url====>:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (600== responsecode) {
                    alert("No Data Found");          
                 }else if(600!== responsecode) {
                    var jsonArray = data.mailAndSmsControllerDTO;
                    $.each(jsonArray, function (i, resData) {
                    	insertHmSmsOutboxTreans(resData.sm_contact_num1,message);
                    	var email=resData.sm_email_id;
                    	if(email.indexOf('dm.')>-1){
                    		var to_mail=resData.sm_email_id;
                    		console.log("to_mail=====>"+to_mail);
                    		insertHmEmailOutboxTreans(to_mail,emailtext,'',ticket_id)
                    	}else{
                    	 	var to_cc_mail_id=resData.sm_email_id;
                    	 	console.log("to_cc_mail_id===>"+to_cc_mail_id);
                    	 	insertHmEmailOutboxTreans('',emailtext,to_cc_mail_id,ticket_id)
                    	}


                    });
                }
            },
            error: function (err) {
                console.error("Error in fuel_card_number" + JSON.stringify(err));
            }
        });
}
;

//inserting sms here
function insertHmSmsOutboxTreans(contactno,message){
	  var createdyid=localStorage.getItem("userID");
		var createdbymodelid=localStorage.getItem("opdesk_moduleID");
		var createdbtroleid=localStorage.getItem("opdesk_roleID");
	var contactnolength=$('#contact_no_length').val();
	var contact_no=contactno;
	var message=message;
	var from_mobile=0;
	var no_of_attempts=0;
	var statusId=1;
	
	 var objJson={
			"so_message":message,
			"so_tomobile_no":contact_no,
			"so_from_mobile_no":from_mobile,
			"so_no_of_attempts":no_of_attempts,
			"so_status_id":statusId,
			"so_createdbyid":createdyid,
			"createdbymoduleid":createdbymodelid,
			"createdbyroleid":createdbtroleid
		    };
		    var strUrl = Service.insertHmSmsOutboxTreans;
		    console.log("Input is:::::::" + JSON.stringify(objJson));
		    $.ajax({
		        type: "POST",
		        url: strUrl,
		        dataType: "json",
		        data: JSON.stringify(objJson),
		        contentType: "application/json",
		        async: false,
		        crossDomain: true,
		        success: function (data) {
		            //var responsecode = data.responseCode;
		          //  if (200 !== responsecode) {
		           //     alert("Not Inserted ");
		           // } else {

                        
		            //}

		        }, error: function () {
		            console.log('In Error of  Details ');
		        }
		    });
		}

//inserting email here
function insertHmEmailOutboxTreans(to_mail,emailtext,to_cc_mail_id,ticket_id){
	  var createdyid=localStorage.getItem("userID");
		var createdbymodelid=localStorage.getItem("opdesk_moduleID");
		var createdbtroleid=localStorage.getItem("opdesk_roleID");
	var subject="AP ERC-Fuel Filling Dated with Ticket Id:"+ticket_id
	 var objJson={
			   "inboxqueueid":0,
				"replyuser":0,
				"toemailid":to_mail,
				"subject":subject,
				"ccmailids":to_cc_mail_id,
				"bccmailids":"?",
				"replybody":emailtext,
				"actionid":1,
				"templateid":1,
			  	"so_createdbyid":createdyid,
				"createdbymoduleid":createdbymodelid,
				"createdbyroleid":createdbtroleid
		    };
		    var strUrl = Service.insertHmEmailOutboxTreans;
		    console.log("Input is:::::::" + JSON.stringify(objJson));
		    $.ajax({
		        type: "POST",
		        url: strUrl,
		        dataType: "json",
		        data: JSON.stringify(objJson),
		        contentType: "application/json",
		        async: false,
		        crossDomain: true,
		        success: function (data) {
		            var responsecode = data.responseCode;
		          //  if (200 !== responsecode) {

		         //   } else {
		            	// showNotificationError("Sms And Mail Sent Sucessfully", "fuel_registration_id", "success");
		         //   }

		        }, error: function () {
		            console.log('In Error of  Details ');
		        }
		    });
		}






