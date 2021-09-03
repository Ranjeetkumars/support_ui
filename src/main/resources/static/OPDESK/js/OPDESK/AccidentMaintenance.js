/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$('#registration').on('shown.bs.modal', function (e) {
	 
    getListOfDistrict_reg();
    get_shiftTypes_accident();
    getWorkShop();
    getExendAndDamage();
    getAccidentType();
    getAccident_severity();

});
$('#update').on('shown.bs.modal', function (e) {
    getExendAndDamageUpdate();
    getPayment_Type();
    paymentMode();

});
$(document).ready(function () {
    try {
        getListOfDistrict_accident();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});


/*
 * For loading the Districs based on the state ID calling to masterdata
 * priyadarshini
 * 06-05-2019
 * state id is the input
 */
function getListOfDistrict_accident() {
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
    $('#districs_id').chosen();
    $('#districs_id_reg').trigger("chosen:updated");
    $('#districs_id_reg').chosen();

}
;
$('#districs_id').on('change', function () {
    var listOfDistrict = $('#districs_id').val();
    $("#baselocationId").empty();
    baseLocation_accident(listOfDistrict);
});
/*
 * For loading the baseloc based on the district ID calling to masterdata
 * priyadarshini
 * 06-05-2019
 * district id is the input
 */
function baseLocation_accident(listOfDistrict) {
	$("#baselocationId").empty();
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select baseLocation</option>";
    $('#baselocationId').append(selectfirst);
    $.each(baselocations, function (i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#baselocationId');


    });
    $('#baselocationId').trigger("chosen:updated");
    $("#baselocationId").chosen();

}
;

$('#baselocationId').on('change', function () {
    var baseLocation = $('#baselocationId').val();
    $("#Ambulance_Id").empty();
    getAmbulance_accident(baseLocation);
});
/*
 * For loading the Ambulance  based on the baseLocation calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */
function getAmbulance_accident(baseLocation) {
    // here calling masterdata ajax call
	$("#Ambulance_Id").empty();
    loadingAmbulanceMaster(baseLocation);
    var selectfirst = "<option value='0'>Select Base Location</option>";
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
function get_shiftTypes_accident() {

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
function getListOfDistrict_reg() {
    getListOfDistrict_accident();

}
$('#districs_id_reg').on('change', function () {
    var listOfDistrict = $('#districs_id_reg').val();
    $("#basloc_id_reg").empty();
    baseLocation_reg(listOfDistrict);
});
/*
 * For loading the baseloc for reg  based on the district ID calling to masterdata
 * priyadarshini
 * 06-05-2019
 * district id is the input
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
 * For loading the Ambulance  based on the baseLocation calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */
function getAmbulance_reg(baseLocation) {
    // here calling masterdata ajax call
	$("#ambulance_id_reg").empty();
    loadingAmbulanceMaster(baseLocation);
    var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#ambulance_id_reg').append(selectfirst);
    $.each(ambulances, function (i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#ambulance_id_reg');
    });
    $('#ambulance_id_reg').trigger("chosen:updated");
    $("#ambulance_id_reg").chosen();
}
;
/*
 * For loading the workshop in accident maintenance.
 * priyadarshini
 * 06-05-2019
 *no input
 */
function  getWorkShop() {

    try {
        var strUrl = Service.getWorkShop;

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.gisControllerDTOs;
                    $.each(jsonArray, function (i, resData) {
                        var reportToHo = "<option value=" + resData.workshopId + ">" + resData.workshopname + "</option>";
                        $(reportToHo).appendTo('#workshopId');

                    });
                }
            },
            error: function (err) {
                console.error("Error in demo_report" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getDemoReportPrepared()' + err);
    }
    $("#workshopId").chosen();
}
;
$('#workshopId').on('change', function () {
    $("#otherWorkshopName").val("");
    $("#contactPersonId").val("");
    $("#mobileNoId").val("");
    $("#AddressId").val("");
    hideworkshopDetails();
});
//validation
function hideworkshopDetails() {

    var workshop = $("#workshopId").val();

    if (workshop == 1 || workshop == '1') {

        $("#otherWorkshopName").prop("disabled", false);
        $("#contactPersonId").prop("disabled", false);
        $("#mobileNoId").prop("disabled", false);
        $("#AddressId").prop("disabled", false);


    }
    else {

        $("#otherWorkshopName").prop("disabled", true);
        $("#contactPersonId").prop("disabled", true);
        $("#mobileNoId").prop("disabled", true);
        $("#AddressId").prop("disabled", true);
    }
}
$('#paymentTypeId').on('change', function () {
    $("#PaidAmountId").val("");
    $("#InvoiceNumberId").val("");
    hidepaymentmode();

});
function hidepaymentmode() {
    var paymentTypeMode = $('#paymentTypeId').val();
    if (paymentTypeMode == 3 & paymentTypeMode == '3') {
        $("#PaidAmountId").prop("disabled", true);
        $("#InvoiceNumberId").prop("disabled", false);
        showNotificationError("enter invoice number ", "InvoiceNumberId", "error");

    }
    else if ((paymentTypeMode == 4 & paymentTypeMode == '4')) {
        $("#PaidAmountId").prop("disabled", false);
        $("#InvoiceNumberId").prop("disabled", true);
        showNotificationError("enter amount ", "PaidAmountId", "error");
    }

}
//validation paymentMode
function paymentMode() {

    var paymentType = $('#paymentTypeId').val();

    if (paymentType != 0 & paymentType != '0') {
        $("#PaidAmountId").prop("disabled", false);
        $("#InvoiceNumberId").prop("disabled", false);

    }

    else {
        $("#PaidAmountId").prop("disabled", true);
        $("#InvoiceNumberId").prop("disabled", true);

    }

}
/*
 * For loading the extend and damage.
 * priyadarshini
 * 06-05-2019
 *no input
 */
function  getExendAndDamage() {
    try {
        var strUrl = Service.demoReportPrepared;

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.demoControllerDTOs;
                    $.each(jsonArray, function (i, resData) {
                        var reportToHo = "<option value=" + resData.seriaid + ">" + resData.demo_reportstatus + "</option>";
                        $(reportToHo).appendTo('#extendAndDamageId');
                        $(reportToHo).appendTo('#informedTPoliceId');
                        $(reportToHo).appendTo('#informedToInsuranceId');

                        $(reportToHo).appendTo('#informedToFireId');
                        $(reportToHo).appendTo('#towingRequiredId');
                        $(reportToHo).appendTo('#policeOnSceneId');
                        $(reportToHo).appendTo('#fireOnSceneId');

                    });
                }
            },
            error: function (err) {
                console.error("Error in demo_report" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getDemoReportPrepared()' + err);
    }
    $("#extendAndDamageId").chosen();
    $("#informedTPoliceId").chosen();
    $("#informedToInsuranceId").chosen();
    $("#informedToFireId").chosen();
    $("#towingRequiredId").chosen();
    $("#policeOnSceneId").chosen();
    $("#fireOnSceneId").chosen();
}
;

/*
 * For loading the extend and damage.
 * priyadarshini
 * 06-05-2019
 *no input
 */
function  getExendAndDamageUpdate() {
    try {
        var strUrl = Service.demoReportPrepared;

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.demoControllerDTOs;
                    $.each(jsonArray, function (i, resData) {
                        var reportToHo = "<option value=" + resData.seriaid + ">" + resData.demo_reportstatus + "</option>";
                        $(reportToHo).appendTo('#extendAndDamageIdForUpdate');
                        $(reportToHo).appendTo('#informedTPoliceForUpdate');
                        $(reportToHo).appendTo('#informedToFireForUpdate');

                        $(reportToHo).appendTo('#policeOnSceneForUpdate');
                        $(reportToHo).appendTo('#fireOnSceneForUpdate');
                        $(reportToHo).appendTo('#towingRequiredForUpdate');
                        $(reportToHo).appendTo('#informedToInsuranceForUpdate');
                        $(reportToHo).appendTo('#SendtoHOId');


                    });
                }
            },
            error: function (err) {
                console.error("Error in demo_report" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getDemoReportPrepared()' + err);
    }
    $("#extendAndDamageIdForUpdate").chosen();
    $("#informedTPoliceForUpdate").chosen();
    $("#informedToFireForUpdate").chosen();
    $("#policeOnSceneForUpdate").chosen();
    $("#fireOnSceneForUpdate").chosen();
    $("#towingRequiredForUpdate").chosen();
    $("#informedToInsuranceForUpdate").chosen();
    $("#SendtoHOId").chosen();
}
;
/*
 * For loading Accident Type
 * priyadarshini
 * 06-05-2019
 * no input
 */
function  getAccidentType() {
    try {
        var strUrl = Service.getAccidentType;

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                } else {
                    var jsonArray = data.accidentMaintainceControllerDTO;
                    $.each(jsonArray, function (i, resData) {
                    var reportToHo = "<option value=" + resData.par_ami_seriaid + ">" + resData.ami_accident_id + "</option>";
                    $(reportToHo).appendTo('#accidentType_id');

                    });
                }
            },
            error: function (err) {
                console.error("Error in demo_report" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in  getPayment_Type()' + err);
    }
    $("#accidentType_id").chosen();
}
/*
 * For loading Accident severity.
 * priyadarshini
 * 06-05-2019
 *no input
 */
function  getAccident_severity() {
    try {
        var strUrl = Service.getAccidentSeverity;

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.breakDownMaitainceControllerDTOs;
                    $.each(jsonArray, function (i, resData) {
                     var accidentSeverity = "<option value=" + resData.mit_seriaid + ">" + resData.mit_Type_Name + "</option>";
                     $(accidentSeverity).appendTo('#accidentSeverityId');

                    });
                }
            },
            error: function (err) {
                console.error("Error in getAccidentSeverity" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in  getAccident_severity()' + err);
    }
    $("#accidentSeverityId").chosen();
}
;
$('#ambulance_id_reg').on('change', function () {
    var ambualceId = $('#ambulance_id_reg').val();
    getOdoMeter(ambualceId);

});
/*
 * For loading the previous OdoMeter  based on the ambualceId calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */

/*function getOdoMeter(ambualceId) {

    if (odoMeter.length < 1 || odoMeter === []) {
        // here calling masterdata ajax call
        loadingOdometerMaster(ambualceId);
        var odoMeter1 = odoMeter.toString();
    }
    else {
    }
}*/
/*
 * For loading the Payment type.
 * priyadarshini
 * 06-05-2019
 *no input
 */
function  getPayment_Type() {
    try {
        var strUrl = Service.paymentType;

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.payementControllerDTO;
                    $.each(jsonArray, function (i, resData) {
                        var reportToHo = "<option value=" + resData.pt_serialid + ">" + resData.pt_payment_type + "</option>";
                        $(reportToHo).appendTo('#paymentTypeId');

                    });
                }
            },
            error: function (err) {
                console.error("Error in demo_report" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in  getPayment_Type()' + err);
    }
    $("#paymentTypeId").chosen();
}
;

/*
 * For inserting  the AccidentMaintenance Details.
 * priyadarshini
 * 16-05-2019
 * the input are
 */
function saveAccidentMaintenanceDetails() {
    var district = $("#districs_id_reg").val();
	$('#districtId').val(district);
    var BaseLocation = $("#basloc_id_reg").val();
	$('#baselocation_id').val(BaseLocation);
    var ambulanceId = $("#ambulance_id_reg").val();
    var ambulance_reg_number = $("#ambulance_id_reg option:selected").text();
    $('#ambulance').val(ambulance_reg_number);
    var listOfShiftType = $("#shiftTypeId").val();

    var workshop = $("#workshopId").val();

    var previousOdoMeterReading = $("#previousOdometerForReg").val();

    var endOdoMeter = $("#inOdoMeter_id").val();
    $('#endOdometerNo').val(endOdoMeter);
    var accidentType = $("#accidentType_id").val();//accidentType_id
    var otherAccidentName = $("#otherAccidentName_id").val();
    var extendAndDamage = $("#extendAndDamageId").val();
    var accidentSeverity = $("#accidentSeverityId").val();
    var informedTPolice = $("#informedTPoliceId").val();
    var informedToInsurance = $("#informedToInsuranceId").val();
    var informedToFire = $("#informedToFireId").val();
    var towingRequired = $("#towingRequiredId").val();
    var policeOnScene = $("#policeOnSceneId").val();
    var fireOnScene = $("#fireOnSceneId").val();
    var OffRoadTimingId = $("#offRoadTimingId").val();
	$('#start_date_time').val(OffRoadTimingId);
    var OffRoadTiming = moment(OffRoadTimingId).format("YYYY-MM-DD");
    var remarks = $("#remarks_id").val();
    $('#remarksId').val(remarks);
    var other_workshop_name = $("#otherWorkshopName").val();
    var other_workshop_address = $("#AddressId").val();
    var other_workshop_phone = $("#mobileNoId").val();
    var other_workshop_contact_person = $("#contactPersonId").val();

    //validation
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
        showNotificationError("Select ShiftType ", "shiftTypeId", "error");
        return;
    }
    else if (workshop === '0' || workshop === 0) {
        showNotificationError("Select workshop", "workshopId", "error");
        return;
    }
    else if(workshop === "1"){
        if (other_workshop_name === ""||other_workshop_name===''||other_workshop_name===null) {
              showNotificationError("Enter Workshop Name", "otherWorkshopName", "error");
              return;
         }else if(other_workshop_phone===""||other_workshop_phone===''||other_workshop_phone===null){
      	   showNotificationError("Enter Mobile No", "mobileNoId", "error");
             return; 
         }//addressForReg
         else if(other_workshop_phone.length!=10){
      	   showNotificationError("Please Enter Valid Mobile No", "mobileNoId", "error");  
      	   return; 
         }
         else if(other_workshop_address===""||other_workshop_address===''||other_workshop_address===null){
      	   showNotificationError("Enter Address", "AddressId", "error");
             return; 
         }//
      }
     if (previousOdoMeterReading ===''||previousOdoMeterReading ===null) {
        showNotificationError("Enter Previous Odo-Meter Reading ", "previousOdometerForReg", "error");
     return;
    }

    else if (endOdoMeter === '' || endOdoMeter === null) {
        showNotificationError("Enter  End Odo-Meter Reading ", "inOdoMeter_id", "error");
        return;
    }
    else if (parseInt(endOdoMeter) < parseInt(previousOdoMeterReading))
    {
        showNotificationError("Current Odo-MeterReading Must Be Greater Or Equal To Previous Odo-Meter Reading", "inOdoMeter_id", "error");
        return;

    }
    if (accidentType === '0' || accidentType ==="0") {
          showNotificationError("Select Accident Type", "accidentType_id", "error");
     return;
    }
    if (extendAndDamage === '0' || extendAndDamage ==="0") {
        showNotificationError("Select Extend & Damaged", "extendAndDamageId", "error");
        return;
    }
     if (accidentSeverity === '0' || accidentSeverity ==="0") {
          showNotificationError("Select Accident Severity", "accidentSeverityId", "error");
     return;
    }
    if (informedTPolice === '0' || informedTPolice === "0") {
        showNotificationError("Select Informed To Police", "informedTPoliceId", "error");
        return;
    }
    if (informedToInsurance === '0' || informedToInsurance ==="0") {
        showNotificationError("Select InformedToInsurance", "informedToInsuranceId", "error");
        return;
    }
    if (informedToFire === '0' || informedToFire === "0") {
        showNotificationError("Select Informed To Fire", "informedToFireId", "error");
        return;
    }
    if (towingRequired === '0' || towingRequired === "0") {
        showNotificationError("Select Towing Required", "towingRequiredId", "error");
        return;
    }
    if (policeOnScene === '0' || policeOnScene === "0") {
        showNotificationError("Select Police On Scene", "policeOnSceneId", "error");
        return;
    }

    if (fireOnScene === '0' || fireOnScene === 0) {
        showNotificationError("Select Fire On Scene", "fireOnSceneId", "error");
        return;
    }

    else if (OffRoadTimingId === "" || OffRoadTimingId === '' || OffRoadTimingId ===null) {
        showNotificationError("Select Off-Road Time", "offRoadTimingId", "error");
        return;
    }
    else if (remarks === '' || remarks === null) {
        showNotificationError("Enter Remark", "remarks_id", "error");
        return;
    }
 
    var user_id=localStorage.getItem("userID");
    var module_id=localStorage.getItem("opdesk_moduleID");
    var role_id=localStorage.getItem("opdesk_roleID");
    var objJson = {
        "ami_vehicle_id": ambulanceId,
        "ami_baselocation_id": BaseLocation,
        "ami_reg_number": ambulance_reg_number,
        "ami_workshop_id": workshop,
        "ami_start_odo_meterreading": endOdoMeter,
        "ami_activity_id": 1,
        "ami_accident_id": accidentType,
        "ami_extent_damage": extendAndDamage,
        "ami_police_information": informedTPolice,
        "ami_insurance_information": informedToInsurance,
        "ami_towing_required": towingRequired,
        "ami_invoice_number": "68685475",
        "ami_police_personname": policeOnScene,
        "ami_fire_on_scene": fireOnScene,
        "ami_start_date_time": "now()",
        "ami_end_date_time": OffRoadTiming,
        "ami_remarks": remarks,
        "ami_created_dtm": "now()",
        "ami_shift_id": listOfShiftType,
        "ami_created_by_id": user_id,
        "ami_created_by_roleid": role_id,
        "ami_district_id": district,
        "ami_fire_information": informedToFire,
        "ami_maintenance_typeid": 2,
        "ami_status_id": 1,
        "ami_accident_severity_id": accidentSeverity,
        "ami_other_workshop_name": other_workshop_name,
        "ami_other_workshop_address": other_workshop_address,
        "ami_other_workshop_phone": other_workshop_phone,
        "ami_other_workshop_contact_person": other_workshop_contact_person

    }
    var strUrl = Service.saveAccidentDetails;

    console.log("saveSuggestionsDetails Url is:" + strUrl);
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
            $('#ticket_Id').val(data.output);
            get_ohd_mail_directory();
        	var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert(" not Inserted ");

            } else {

                showNotificationError("Inserted Successfully", "save_accidentId", "success");
                reset_Registation_accident();
                window.setTimeout(function () {
                    location.reload();
                }, 2000);

            }

        }, error: function () {

            console.log('In Error of  Details ');
        }
    });
}
/*
 * For update the Accident_maintenance details.
 * priyadarshini
 * 06-05-2019
 * inputs  workshop,endOdoMeter,extendAndDamage,informedTPolice,informedToInsurance,towingRequired,InvoiceNumber,InvoiceNumber
 */
function updateAccident_maintenance_Details() {
    var serial_id = $('#serialId').val();
    var workshop = $('#up_workshopId').val();
    var endOdoMeter = $('#endOdoMeterIdForUpdate').val();
    var extendAndDamage = $('#extendAndDamageIdForUpdate').val();//extendAndDamageIdForUpdate
    var informedTPolice = $('#informedTPoliceForUpdate').val();//informedTPoliceForUpdate
    var informedToInsurance = $('#informedToInsuranceForUpdate').val();//policeOnSceneForUpdate
    var towingRequired = $('#towingRequiredForUpdate').val();
    var InvoiceNumber = $('#InvoiceNumberId').val();
    if (InvoiceNumber == null || InvoiceNumber == '') {
        InvoiceNumber = 0;
    }
    var SendtoHO = $('#SendtoHOId').val();
    var paymentType = $('#paymentTypeId').val();
    var PaidAmount = $('#PaidAmountId').val();
    if (PaidAmount == null || PaidAmount == '') {
        PaidAmount = 0;
    }
    //alert("PaidAmount==="+PaidAmount);
    var fireOnScene = $('#fireOnSceneForUpdate').val();
    var policeOnScene = $('#policeOnSceneForUpdate').val();
    var OffRoadTiming = $('#OffRoadTimingIdForUpdate').val();
    var OffRoadTiming1 = moment(OffRoadTiming).format("YYYY-MM-DD");
    var remarks = $('#remarksIdForUpdate').val();
    var informedToFire = $('#informedToFireForUpdate').val();
    var inodometerReading=$('#previousOdoMeterForUpdate').val();
    var informedToFire=$('#informedToFireForUpdate').val();

    if (endOdoMeter === '' || endOdoMeter === null) {
        showNotificationError("Enter End Odo-Meter", "endOdoMeterIdForUpdate", "error");
        return;
    }

    else if (parseInt(endOdoMeter)< parseInt(inodometerReading)) {
        showNotificationError(" End Odo Meter Should Be Greater Or Equal Than In Odo-Meter Reading", "endOdoMeterIdForUpdate", "error");
        return;
    }
    
    else if (extendAndDamage === '0' || extendAndDamage ==="0") {
        showNotificationError("Select Extend & Damage", "extendAndDamageIdForUpdate", "error");//
        return;
    }
    
    else if (informedTPolice === '0' || informedTPolice ==="0") {
        showNotificationError("Select Informed To Police", "informedTPoliceForUpdate", "error");//
        return;
    }//
    else if (informedToInsurance === '0' || informedToInsurance ==="0") {
        showNotificationError("Select Informed To Insurance", "informedToInsuranceForUpdate", "error");//
        return;
    }//
   
    else if (informedToFire === '0' || informedToFire ==="0") {
        showNotificationError("Select Informed To Police", "informedToFireForUpdate", "error");//
        return;
    }//informedToFireForUpdate
    else if (towingRequired === '0' || towingRequired ==="0") {
        showNotificationError("Select Towing Required", "towingRequiredForUpdate", "error");//
        return;
    }//
    // 
    else if (policeOnScene === '0' || policeOnScene === "0") {
        showNotificationError("Select Police On Scene", "policeOnSceneForUpdate", "error");//extendAndDamageIdForUpdate
        return;
    }
    else if (fireOnScene === '0' || fireOnScene === 0) {
        showNotificationError("Select Fire On-Scene", "fireOnSceneForUpdate", "error");//extendAndDamageIdForUpdate
        return;
    }

    else if (OffRoadTiming === "" || OffRoadTiming === '' || OffRoadTiming === null) {
        showNotificationError("Select Off Road Time", "offRoadTimingId", "error");
        return;

    }
    
    
    
    else if (paymentType === '0' || paymentType === 0) {
        showNotificationError("Select  Payment Type Id ", "paymentTypeId", "error");
        return;
    }
    if(paymentType==="3"){
    	if (InvoiceNumber =='' || InvoiceNumber == ""||InvoiceNumber==null) {
            showNotificationError("Enter  Invoice Numbers ", "InvoiceNumberId", "error");
            return true;
        }
    }  if(paymentType==="4"){
    	if (PaidAmount =='' || PaidAmount ==""||PaidAmount===null) {
            showNotificationError("Enter Amount", "PaidAmountId", "error");
            return true;
        }
    }
   
     if (SendtoHO === '0' || SendtoHO === 0) {
        showNotificationError("Select  Send To HO Id ", "SendtoHOId", "error");
        return;
    }
     else if (remarks === '' || remarks === null) {
        showNotificationError("Enter  Remarks", "remarksIdForUpdate", "error");
        return;
    }

    var objUpd =
            {
                "par_ami_seriaid": serial_id,
                "ami_workshop_id": workshop,
                "ami_end_odo_meterreading": endOdoMeter,
                "ami_extent_damage": extendAndDamage,
                "ami_police_information": informedTPolice,
                "ami_insurance_information": informedToInsurance,
                "ami_towing_required": towingRequired,
                "ami_invoice_number": InvoiceNumber,
                "ami_send_to_hd": SendtoHO,
                "ami_payment_type": paymentType,
                "ami_paid_amount": PaidAmount,
                "ami_police_personname": policeOnScene,
                "ami_fire_on_scene": fireOnScene,
                "ami_end_date_time": OffRoadTiming,
                "ami_remarks": remarks,
                "ami_fire_information": informedToFire,
                "ami_status_id": 2

            }
    var strUrl2 = Service.updateAccident_Maintenance;

    console.log('==== strUrl' + strUrl2);
    $.ajax({
        type: "POST",
        url: strUrl2,
        dataType: "json",
        data: JSON.stringify(objUpd),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function (data) {
            if (data !== null || data !== 0) {
                showNotificationError("Data Updated Successfully", "Accident_maintenance_id", "success");
                reset_Registation_accident();
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        },
        error: function () {
            console.log("Error In case_ReOpen Not updating");
        }
    });

}


/*
 * For searching  the  accident maintenance details.
 * priyadarshini
 * 06-05-2019
 * inputs  districtId,baselocation_ID,vehicle_ID,resolutionDate,fromDate,todate,ticket_id
 */
function accidentMaintenance_Search() {

    try {
        var districtId = $('#districs_id').val();
        var baselocation_ID = $('#baselocationId').val();
        var vehicle_no = $('#Ambulance_Id').val();
        var offroadDate = $('#offDate_Id').val();
        var fromDate = $('#fromDate_Id').val();
        var toDate = $('#toDate_Id').val();
        var ticket_id = $('#ticketId').val();

        if (districtId === null | districtId === '') {
            districtId = 0;
        }
        if (baselocation_ID === null | baselocation_ID === '') {
            baselocation_ID = 0;
        }
        if (vehicle_no === null | vehicle_no === '') {
            vehicle_no = 0;
        }
        if (offroadDate === null | offroadDate === '' || offroadDate === 'undefine') {

            offroadDate = "0";
        }
        if (fromDate === null | fromDate === '') {

            fromDate = "0";
        }
        if (toDate === null | toDate === '') {

            toDate = "0";
        }
        if (ticket_id === null | ticket_id === '') {

            ticket_id = 0;
        }
        
        if (districtId==0 &&baselocation_ID==0 &&vehicle_no==0 &&offroadDate=="0"&&fromDate=="0"&&toDate=="0"&&ticket_id==0){   
          	showNotificationError("Please Select At Least One Search Parameter", "search_id", "error");
          	//$.toaster({ priority : 'warning', title : 'fgdfg', message : 'plzzz selsdfgsdgf'});
          	return true;
          }
       
        
        var objJson = {
            "ami_district_id": districtId,
            "ami_baselocation_id": baselocation_ID,
            "ami_vehicle_id": vehicle_no,
            "offdate": offroadDate,
            "ondate": fromDate,
            "enddate": toDate,
            "ami_ticket_id": ticket_id
        };
        
        var strUrl = Service.get_AccidentMaintenance_Search;
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
                $('#accident_maintenance_id').empty();
                if (200 !== responsecode || data.status == "NO_DATA_FOUND") {

                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No Data Available....");
                    $('#accident_maintenance_id').append(divTag);
                } else {

                    var jsonArray = data.accidentMaintainceControllerDTO;
                    if (jsonArray.length > 0) {
                        //calling to dom
                        accidentMaintenance_Data(jsonArray);

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
function accidentMaintenance_Data(strData) {

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
        $(objTHead6).html("Accident Type");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Accident Severity");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

   /*     //For table Heading5
        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Maintenance Type");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);
*/
        //For table Heading5
     /*   var objTHead8 = document.createElement("th");
        $(objTHead8).html("In Odo-Meter");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);
        //For table Heading5
        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Out Odo-Meter");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);*/

        //For table Heading5
        var objTHead10 = document.createElement("th");
        $(objTHead10).html("Off-Road Date");
        $(objTHead10).addClass("text-center");
        $(objTr).append(objTHead10);

/*        var objTHead11 = document.createElement("th");
        $(objTHead11).html("On-Road Date");
        $(objTHead11).addClass("text-center");
        $(objTr).append(objTHead11);*/

        var objTHead12 = document.createElement("th");
        $(objTHead12).html("Status");
        $(objTHead12).addClass("text-center");
        $(objTr).append(objTHead12);


        //For table Heading5
        var objTHead13 = document.createElement("th");
        $(objTHead13).html("Update");
        $(objTHead13).addClass("text-center");
        $(objTr).append(objTHead13);


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
            $(tablcol2).html(strData[i].ami_ticket_id);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).html(strData[i].districtName);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).html(strData[i].baseLocName);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].ami_reg_number);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].ami_accident_id);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).html(strData[i].ami_accident_severity_id);
            $(tbleRow).append(tablcol7);

           /* var tablcol8 = document.createElement("td");
            $(tablcol8).html(strData[i].ami_maintenance_typeid);
            $(tbleRow).append(tablcol8);
*/
         /*   var tablcol8 = document.createElement("td");
            $(tablcol8).html(strData[i].ami_start_odo_meterreading);
            $(tbleRow).append(tablcol8);


            var tablcol9 = document.createElement("td");
            $(tablcol9).html(strData[i].ami_end_odo_meterreading);
            $(tbleRow).append(tablcol9);*/
            
            var tablcol10 = document.createElement("td");
            $(tablcol10).html(strData[i].ami_start_date_time);
            $(tbleRow).append(tablcol10);
            
     /*       var tablcol11 = document.createElement("td");
            $(tablcol11).html(strData[i].ami_end_date_time);
            $(tbleRow).append(tablcol11);*/
            
            var tablcol12 = document.createElement("td");
            $(tablcol12).html(strData[i].ami_status_id);
            $(tbleRow).append(tablcol12);
            var tablcol10 = document.createElement("td");
            var buttonTag = document.createElement('button');
            var text = document.createTextNode("Update");
            buttonTag.appendChild(text);
            $(buttonTag).addClass('btn btn-primary btn-sm');
            $(buttonTag).attr('onclick', 'get_RowData("' + strData[i].par_ami_seriaid + '","' + strData[i].districtName + '","' + strData[i].baseLocName + '","' + strData[i].ami_reg_number + '","' + strData[i].shiftType + '","' + strData[i].ami_start_odo_meterreading + '","' + strData[i].ami_end_odo_meterreading + '","' + strData[i].ami_accident_id + '","' + strData[i].ami_extent_damage + '","' + strData[i].ami_accident_severity_id + '","' + strData[i].ami_police_information + '","' + strData[i].ami_insurance_information + '","' + strData[i].ami_fire_information + '","' + strData[i].ami_towing_required + '","' + strData[i].ami_fire_on_scene + '","' + strData[i].ami_start_date_time + '","' + strData[i].ami_remarks + '","' + strData[i].ami_workshop_id + '")');
            $(tablcol10).append(buttonTag);
            $(tablcol10).css('height', '36px');

            var tblCol19 = document.createElement('td');
            $(tblCol19).addClass('text-center');
            $(tblCol19).html(strData[i].ami_status_id);
            if (strData[i].ami_status_id === "Closed") {
                $(tbleRow).append(tblCol19);
            } else {
                $(tbleRow).append(tablcol10);
            }
            $(objTBody).append(tbleRow);
        }
        $("#accident_maintenance_id").append(objDivTag);
    } catch (err) {
        console.log("accident_maintenance_id" + err);
    }
}
function get_RowData(par_ami_seriaid, dst_District, baselocationName, ami_reg_number, shiftType, ami_start_odo_meterreading, ami_end_odo_meterreading, ami_accident_id, ami_extent_damage, ami_accident_severity_id, ami_police_information, ami_insurance_information, ami_fire_information, ami_towing_required, ami_fire_on_scene, ami_start_date_time, ami_remarks, ami_workshop_id) {
    $('#serialId').val(par_ami_seriaid);
    $('#update').modal('show');
    $('#districs_id_update').val(dst_District);
    $('#baseLoc_id_update').val(baselocationName);
    $('#ambulance_id_update').val(ami_reg_number);
    $('#shiftType_id_update').val(shiftType);
    $('#previousOdoMeterForUpdate').val(ami_start_odo_meterreading);
    $('#endOdoMeterIdForUpdate').val(ami_end_odo_meterreading);
    $('#up_workshopId').val(ami_workshop_id);

    $('#accidentTypeForUpdate').val(ami_accident_id);
    $('#extendAndDamageIdForUpdate').val(ami_extent_damage);
    $('#accidentSeverityForUpdate').val(ami_accident_severity_id);
    $('#informedTPoliceForUpdate').val(ami_police_information);
    $('#informedToInsuranceForUpdate').val(ami_insurance_information);
    $('#informedToFireForUpdate').val(ami_fire_information);
    $('#towingRequiredForUpdate').val(ami_towing_required);
    $('#fireOnSceneForUpdate').val(ami_fire_on_scene);
    $('#OffRoadTimingIdForUpdate').val(ami_start_date_time);
    $('#remarksIdForUpdate').val(ami_remarks);



}
function loadDataTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 5,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'TyreLifeData'},
            {extend: 'pdf', title: 'TyreLifeData'},
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
//$('#offRoadTimingId').datepicker({
//    format: "dd/mm/yyyy",
//    todayHighlight: true,
//    // autoclose: true,
//    // orientation: "top",
//    endDate: "today"
//
//});

//$('#OffRoadTimingIdForUpdate').datepicker({
//    format: "dd/mm/yyyy",
//    todayHighlight: true,
//    // autoclose: true,
//    // orientation: "top",
//    endDate: "today"
//
//});
$('#offDate_Id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});
$('#fromDate_Id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});
$('#toDate_Id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});

function reset_Registation_accident() {
    $('#districs_id_reg').val("0").trigger("chosen:updated");
    $('#basloc_id_reg').val("0").trigger("chosen:updated");
    $('#ambulance_id_reg').val("0").trigger("chosen:updated");
    $('#shiftTypeId').val("0").trigger("chosen:updated");
    $('#workshopId').val("0").trigger("chosen:updated");
    $('#otherWorkshopName').val("");
    $('#contactPersonId').val("");
    $('#mobileNoId').val("");
    $('#AddressId').val("");
    $('#previousOdoId').val("");
    $('#inOdoMeter_id').val("");
    $('#accidentType_id').val("0").trigger("chosen:updated");
    $('#extendAndDamageId').val("0").trigger("chosen:updated");
    $('#informedTPoliceId').val("0").trigger("chosen:updated");
    $('#informedToFireId').val("0").trigger("chosen:updated");
    $('#policeOnSceneId').val("0").trigger("chosen:updated");
    $('#offRoadTimingId').val("");
    $('#remarks_id').val("");
    $('#offRoadTimingId').val("");
    $('#fireOnSceneId').val("0").trigger("chosen:updated");
    $('#towingRequiredId').val("0").trigger("chosen:updated");
    $('#informedToInsuranceId').val("0").trigger("chosen:updated");
    $('#accidentSeverityId').val("0").trigger("chosen:updated");
    $('#previousOdometerForReg').val('');
    baseLocation_reg(0);
    getAmbulance_reg(0);
}
function reset_search_accident() {
    $('#districs_id').val("0").trigger("chosen:updated");
    $('#baselocationId').val("0").trigger("chosen:updated");
    $('#Ambulance_Id').val("0").trigger("chosen:updated");
    $('#ticketId').val("");
    $('#offDate_Id').val("");
    $('#fromDate_Id').val("");
    $('#toDate_Id').val("");
    baseLocation_accident(0);
    getAmbulance_accident(0);
    $('#accident_maintenance_id').empty();
}
function reset_update_accident() {
    $('#endOdoMeterIdForUpdate').val("");
    $('#extendAndDamageIdForUpdate').val("0").trigger("chosen:updated");
    $('#informedTPoliceForUpdate').val("0").trigger("chosen:updated");
    $('#informedToInsuranceForUpdate').val("0").trigger("chosen:updated");
    $('#towingRequiredForUpdate').val("0").trigger("chosen:updated");
    $('#InvoiceNumberId').val("");
    $('#SendtoHOId').val("0").trigger("chosen:updated");
    $('#paymentTypeId').val("0").trigger("chosen:updated");
    $('#PaidAmountId').val("");
    $('#InvoiceNumberId').val("");
    $('#policeOnSceneForUpdate').val("0").trigger("chosen:updated");
    $('#informedToFireForUpdate').val("0").trigger("chosen:updated");
    $('#OffRoadTimingIdForUpdate').val("");
    $('#remarksIdForUpdate').val("");
    $('#informedToFireForUpdate"').val("0").trigger("chosen:updated");
}


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
});//

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

$(document).ready(function () {
    $('#toendDate').datepicker({
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

    $('#toendDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//datetimepicker1

/*$(document).ready(function () {
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
});//datetimepicker3
*/
/*$(document).ready(function () {
    $('#datetimepicker3').datepicker({
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

    $('#datetimepicker3').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//datetimepicker3
*/function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
	return false;
	return true;
}  
  

//here getting mail and mobile no. to send mail
function get_ohd_mail_directory(){
	var ticket_id=$('#ticket_Id').val();//hiddenId
	
	var distid=$('#districtId').val();
	var baselocId=$('#baselocation_id').val();
	var ambulanceno=$('#ambulance').val();
	var startDateTime=$('#start_date_time').val();
	
	
	var message="AP opdesk Tkt ID:"+ticket_id+",Dist:"+distid+",BL:" +baselocId+",A.No:" +ambulanceno+",Category:Accidental Maintenance,Date&Time:"+startDateTime+" ERS";	


	var remarks=$('#remarksId').val();
	var ambulanceno=$('#ambulance').val();
	var odometerId=$('#endOdometerNo').val();
	var start_dateTime=$('#start_date_time').val();

	var emailtext;
	//alert("remarks4535====>"+remarks);
	
var emailtext =	'<html><head><title>Accident Maintence</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>';*/

/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';*/

/*emailtext=emailtext+'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>';*/

emailtext=emailtext+' <style>.container{width: 650px;margin:0px auto;padding:20px;}body{padding: 50px;}.gray-bg{background:#f6f6f6;}.white-bg{background:#fff;}';

emailtext=emailtext+' table, th, td { border: 1px solid black; border-collapse: collapse; } table{width:100%;  }th, td { padding: 5px; color: black;text-align:center; font-size: 14px;}.fw-600{font-weight:600;}';        

emailtext=emailtext+'.maintext{background-color: #1f74bd;color: white; height: 50px;font-weight: 800; text-align: center;  font-size: 18px;}.text2{background-color:  #f5f5f5;}.text-light-gray{margin-left: 930px; }</style> </head>'; 

emailtext=emailtext+'<body class="gray-bg"><div class="container white-bg"><h4> Dear All</h4><p>The Following are the activity Details of Operational Helpdesk</p><table ><tr><th colspan="2" class="maintext">Issue Type:Accidental Maintenance</th></tr> <tr><td >Reason</td> <td>'+remarks+'</td> ';

emailtext=emailtext+'</tr> <tr><td class="text2">Base Location</td><td class="text2">'+baselocId+'</td></tr><tr><td>Ambulance Register No:</td> <td>'+ambulanceno+'</td>' ;   

emailtext=emailtext+'</tr><tr><td class="text2">Odo meter Reading:</td><td class="text2">'+odometerId+'</td></tr><tr><td>Escalateed To:</td><td>Fleet Manager</td>';

emailtext=emailtext+'</tr><tr><td class="text2">District:</td><td class="text2">'+distid+'</td></tr><tr><td>EMT No:</td><td></td>';

emailtext=emailtext+'</tr><tr><td class="text2">PILOT No:</td><td class="text2"></td>';

emailtext=emailtext+'</tr><tr><td>Status:</td><td>Open</td></tr><tr><td class="text2">Schedule Service Type:</td><td class="text2"></td></tr><tr><td >Off Road Timing:</td><td class="text2">'+start_dateTime+'</td>';

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
                  	insertHmEmailOutboxTreans(resData.sm_email_id,emailtext,ticket_id)
                  


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
	var contactnolength=$('#contact_no_length').val();
	var contact_no=contactno;
	var message=message;
	var from_mobile=0;
	var no_of_attempts=0;
	var statusId=1;
	var createdyid=0;
	var createdbymodelid=0;
	var createdbtroleid=0;	
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
function insertHmEmailOutboxTreans(to_mail,emailtext,ticket_id){
	var subject="AP ERS-Accidental Maintenance with Ticket Id:"+ticket_id
	 var objJson={		
				"inboxqueueid":0,
				"replyuser":0,
				"toemailid":to_mail,
				"subject":subject,
				"replybody":emailtext,
				"actionid":1,
				"templateid":1,
			  	"so_createdbyid":1,
				"createdbymoduleid":1,
				"createdbyroleid":1
		    };
		    var strUrl = Service.insertHmEmailOutboxTreansPrev;
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

