/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    try {
    	getListOfDistrict();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

/*
 *@DESX : For loading the Districts based on the StateID calling to masterdata
 * @NAME : Habiboon Patan
 * @DATE : 11-06-2019
 * @INPUTS: StateId 
 */


//Added By Bhuneshwar
function getListOfDistrict() {
    loadingDistrictsMaster();
    $.each(district, function(i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#oxy_districtID');
    });
    $('#oxy_districtID').trigger("chosen:updated");
    $("#oxy_districtID").chosen();
}
;

function getListOfDistrict_reg() {
    loadingDistrictsMaster();
    $.each(district, function(i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#oxy_reg_districtID');
    });
    $('#oxy_reg_districtID').trigger("chosen:updated");
    $("#oxy_reg_districtID").chosen();
}
;


$('#oxy_districtID').on('change', function() {
    var districtId = $('#oxy_districtID').val();
    $('#oxy_basLocID').empty();
    baseLocation_search(districtId);
});

$('#oxy_reg_districtID').on('change', function() {
    var baseLocation = $('#oxy_reg_districtID').val();
    $('#oxy_reg_baslocID').empty();
    baseLocation_reg(baseLocation);
});

$('#oxy_reg_districtID').on('change', function() {
    var distId = $('#oxy_reg_districtID').val();
  //  $('#oxy_reg_districtID').empty();
    get_oxygen_stations(distId);
});


function baseLocation_search(listOfDistrict) {
	$('#oxy_basLocID').empty();
    // here calling masterdata ajax call
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#oxy_basLocID').append(selectfirst);
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#oxy_basLocID');
    });

    $('#oxy_basLocID').trigger("chosen:updated");
    $("#oxy_basLocID").chosen();
}
;

function baseLocation_reg(listOfDistrict) {
	$('#oxy_reg_baslocID').empty();
    // here calling masterdata ajax call
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#oxy_reg_baslocID').append(selectfirst);
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#oxy_reg_baslocID');
    });

    $('#oxy_reg_baslocID').trigger("chosen:updated");
    $("#oxy_reg_baslocID").chosen();
}
;


$('#oxy_basLocID').on('change', function() {
    var baseLocation = $('#oxy_basLocID').val();
    $('#eqi_ambulanceID').empty();
    getAmbulance(baseLocation);
});

$('#oxy_reg_baslocID').on('change', function() {
    var baseLocation = $('#oxy_reg_baslocID').val();
    $('#oxy_reg_ambulanceID').empty();
    getAmbulance_reg(baseLocation);
});

/*
 *@DESX : For loading the Ambulance  based on the baseLocation calling to masterdata
 * @NAME : Habiboon Patan
 * @DATE : 11-06-2019
 * @INPUTS: BaselocationId
 */
function getAmbulance(baseLocation, ambulanceId) {
	  $('#oxy_ambulanceID').empty();
    // here calling masterdata ajax call
    loadingAmbulanceMaster(baseLocation);
    var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#oxy_ambulanceID').append(selectfirst);
    $.each(ambulances, function(i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#oxy_ambulanceID');
    });
    $('#oxy_ambulanceID').trigger("chosen:updated");
    $('#oxy_ambulanceID').chosen();
}
;

function getAmbulance_reg(baseLocation, ambulanceId) {
	$('#oxy_reg_ambulanceID').empty();
    // here calling masterdata ajax call
    loadingAmbulanceMaster(baseLocation);
    var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#oxy_reg_ambulanceID').append(selectfirst);
    $.each(ambulances, function(i, resData) {
        var ambulances = "<option value=" + resData.vehicleID +","+ resData.vehicleName+ ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#oxy_reg_ambulanceID');
    });
    $('#oxy_reg_ambulanceID').trigger("chosen:updated");
    $('#oxy_reg_ambulanceID').chosen();
}
;

$('#registration').on('shown.bs.modal', function(e) {
   // getListOfDistrict_oxy();
	getListOfDistrict_reg()
    getShiftTypes();
    get_cylinders()
});

/*
 *@DESC : For loading the ShiftType  calling to masterdata
 *@AuthorName : Habiboon Patan
 *@DATE : 11-06-2019
 *@INPUTS : no input
 */
function getShiftTypes() {
    if (shiftType.length < 1 || shiftType === []) {
        loadingShiftTypeMaster();
        $.each(shiftType, function(i, resData) {
            var shiftType = "<option value=" + resData.shiftTypeID + ">" + resData.shiftTypeName + "</option>";
            $(shiftType).appendTo('#oxy_reg_shiftID');

        });
    }
    $("#oxy_reg_shiftID").chosen();
}
;



$('#oxy_reg_baslocID').on('change', function() {
    var baseLocation = $('#oxy_reg_baslocID').val();
    getOdoMeter(baseLocation);
});

/*
 *@DESC : For loading the ShiftType  calling to masterdata
 *@AuthorName : Habiboon Patan
 *@DATE : 11-06-2019
 *@INPUTS : BaselocationId
 */
function getOdoMeter(baseLocation) {
//    var bsOLoc = $('#reg_BaselocationId');
    console.log('Base location Id' + baseLocation);
    var strUrl = Service.getOdoMeter + baseLocation;
    console.log("comming into getOdoMeter === " + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        success: function(data) {

            var responsecode = data.responseCode;
            if (200 !== responsecode) {

            } else {
                var OdoMeter = data.output;
              console.log('----- OdoMeter -----' + OdoMeter);
              $('#oxy_reg_preodometerID').val(OdoMeter);
            }
        },
        error: function() {
            console.log('Error in loading loadBaseLocation Data' + 'strUrl');
        }
    });
}


/*
 *@DESC : Loading oxygenStation Names
 *@AuthorName : Habiboon Patan
 *@DATE : 11-06-2019
 *@INPUTS : District Id
 */

function get_oxygen_stations(distId) {
	//$('#oxy_reg_stationID').empty();
    try {
        $('#oxy_reg_stationID').empty();
        var strUrl = Service.getOxygenstations;
        console.log("get_oxygen_stations Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.oxygenFillingControllerDTO;
                    var selectfirst = "<option value='-1'>Select Stations</option>";
                    $('#oxy_reg_stationID').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var tyreData = "<option value=" + resData.ofd_serialid + ">" + resData.ofd_oxygen_station_name + "</option>";
                        $(tyreData).appendTo('#oxy_reg_stationID');
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_oxygen_stations" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_oxygen_stations()' + err);
    }
    $('#oxy_reg_stationID').trigger("chosen:updated");
    $("#oxy_reg_stationID").chosen();
}

/*
 *@DESC : Loading Cylinder Type
 *@AuthorName : Habiboon Patan
 *@DATE : 11-06-2019
 *@INPUTS : No Inputs
 */
function get_cylinders() {
    try {
        $('#oxy_reg_cylinderTypeID').empty();
        var strUrl = Service.getCylinders;
        console.log("get_cylinders Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.oxygenFillingControllerDTO;
                    var selectfirst = "<option value='0'>Select Cylinders</option>";
                    $('#oxy_reg_cylinderTypeID').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var shiftTypeData = "<option value=" + resData.ocy_id + ">" + resData.ocy_type + "</option>";
                        $(shiftTypeData).appendTo('#oxy_reg_cylinderTypeID');
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_cylinders" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_cylinders()' + err);
    }
    $("#oxy_reg_cylinderTypeID").chosen();
}



$('#oxy_reg_stationID').on('change', function() {
    var listOfoxyStationsForRegistration = $('#oxy_reg_stationID').val();

    getOxyStationDetails(listOfoxyStationsForRegistration);
    hideOxyStationDetails();
});

$('#oxy_reg_stationID').on('change', function() {
    oxygen_Details_Diable();
});

/*
 *@DESC : hiding details
 *@AuthorName : Habiboon Patan
 *@DATE : 11-06-2019
 */
function oxygen_Details_Diable() {
    var listoxyStations = $('#oxy_reg_stationID').val();
    if (listoxyStations === -1 || listoxyStations === '-1' || listoxyStations === "-1") {
        $("#oxy_reg_stationName").prop("disabled", true);
        $("#oxy_reg_Address").prop("disabled", true);
        $("#oxy_reg_phNo").prop("disabled", true);
        $("#oxy_reg_mblNo").prop("disabled", true);

    } else {

        $("#oxy_reg_stationName").prop("disabled", false);
        $("#oxy_reg_Address").prop("disabled", false);
        $("#oxy_reg_phNo").prop("disabled", false);
        $("#oxy_reg_mblNo").prop("disabled", false);
    }
}

function getOxyStationDetails(listOfoxyStationsForRegistration) {
    if (listOfoxyStationsForRegistration === 0) {

        $('#oxy_reg_Address').val("");
        $('#oxy_reg_phNo').val("");
        $('#oxy_reg_mblNo').val("");
    }
    try {
        var strUrl = Service.getStationAddress + "/" + listOfoxyStationsForRegistration;
        console.log("getOxyStationDetails Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                    alert("No OxygenStation Found");
                } else {
                    var jsonArray = data.oxygenFillingControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        var PhoneNo = resData.ofd_phoneNo;
                        var mobileNo = resData.ofd_mobileNo;
                        var address = resData.ofd_address;
                        $('#oxy_reg_Address').val(address);
                        $('#oxy_reg_phNo').val(PhoneNo);
                        $('#oxy_reg_mblNo').val(mobileNo);
                    });
                }
            },
            error: function(err) {
                console.error("Error in districts" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getDistrictsData()' + err);
    }
}
;

function hideOxyStationDetails() {

    var storeOnchangeDetails = $("#oxy_reg_stationID").val();
    if (storeOnchangeDetails === 0 || storeOnchangeDetails === '0' || storeOnchangeDetails === "0") {
        $("#oxygenStationName").show();
        $("#oxy_reg_stationName").val("");
        $('#oxy_reg_Address').val("");
        $('#oxy_reg_mblNo').val("");
        $('#oxy_reg_phNo').val("");
    }
    else {
        $("#oxygenStationName").hide();

    }
}



/*
 *@DESC : Adding OxygenCylinder
 *@AuthorName : Habiboon Patan
 *@DATE : 11-06-2019
 */

function addCylinder() {
	
    var baselocation_id = $('#oxy_reg_baslocID').val();
    var ofd_district_id = $('#oxy_reg_districtID').val();
    var shiftType = $('#oxy_reg_shiftID').val();
    var vehicleID = $('#oxy_reg_ambulanceID').val();
    var vehicle_id=vehicleID.split(",");
    var cylinderId = $('#oxy_reg_cylinderTypeID').val();
    var oxy_quantity = $('#oxy_quantityId').val();
    var oxy_padi_amount = $('#oxy_amountId').val();
    var createdbyId = 1;
    var createdbyroleid = 1;
    var obj_Insert = {
        ofi_vehicle_id: vehicle_id[0],
        ocy_id: cylinderId,
        ofi_oxygen_qty: oxy_quantity,
        ofi_paid_amount: oxy_padi_amount,
        ofi_created_by_id: createdbyId,
        ofi_created_by_roleid: createdbyroleid
    };

    if (ofd_district_id === "0") {
        showNotificationError("Select District", "oxy_reg_districtID", "error");
        return;
    } else if (baselocation_id === "0") {
        showNotificationError("Select Base Location", "oxy_reg_baslocID", "error");
        return;
    } else if (vehicleID === "0") {
        showNotificationError("Select Ambulance", "oxy_reg_ambulanceID", "error");
        return;
    } else if (shiftType === "0") {
        showNotificationError("Select Shift Type", "oxy_reg_shiftID", "error");
        return;
    } 
    
    else if (cylinderId === "0"||oxy_reg_cylinderTypeID===null) {
        showNotificationError("Select Cylinder", "oxy_reg_cylinderTypeID", "error");
        return;
    } else if (oxy_quantity === "0" || oxy_quantity === "") {
        showNotificationError("Enter Oxygen Quantity", "oxy_quantityId", "error");
        return;
    } else if (oxy_padi_amount === "0" || oxy_padi_amount === "") {
        showNotificationError("Enter Amount", "oxy_amountId", "error");
        return;
    }

    var strUrl = Service.addcylinder;
    console.log('==== strUrl' + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            if (data !== null || data !== 0) {
                myFunction(data.output);
                showNotificationError("Cylinder Added Successfully", "addcylinder_id", "success");
            }
        },
        error: function() {
            console.log("Error In inserting");
        }
    });
}

function myFunction(data) {
    var str = data.toString();
    var res = str.slice(-15);
    getaddcylinderData(res);
}

function getaddcylinderData(ofi_ticket_id) {
	$('#ticket_id').val(ofi_ticket_id);
    try {
        var strUrl = Service.getinsertedcylinderdetails + ofi_ticket_id;
        console.log("getaddcylinderData Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var resultData = data.oxygenFillingControllerDTO;
                var cylinderdrop = $('#oxy_reg_cylinderTypeID').val();
                console.log('@@@@@@ cylinderdrop2 @@@@@@@' + cylinderdrop);
                $.each(resultData, function(i, resData) {
                    var index = i + 1;
                    var baseLocations = "<tr><td>" + index + "</td><td>" + resData.ocy_id + "</td><td>" + resData.ofi_oxygen_qty + "</td><td>" + resData.ofi_paid_amount + "</td></tr>";
                    $('#table').append(baseLocations);
                });
            },
            error: function(err) {
                console.error("Error in getaddcylinderData" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getaddcylinderData()' + err);
    }

}


/*
 *@DESC : OxygenFillingRegistration
 *@AuthorName : Habiboon Patan
 *@DATE : 11-06-2019
 */
function Oxygen_registration() {
	var ticketId=$('#ticket_id').val();
	//alert("ticketId===="+ticketId);
    var ofi_vehicle_id = $('#oxy_reg_districtID').val();
    var baselocation_id = $('#oxy_reg_baslocID').val();
    $('#baselocId').val(baselocation_id);
    var off_reg_number = $("#oxy_reg_ambulanceID").val();
    var vehicleid =off_reg_number.split(",");
    $('#ambulance_num').val(vehicleid[1]);
    var off_oxygen_stationid = $('#oxy_reg_stationID').val();
    var off_oxygen_card_number = $('#oxy_reg_paymentNumberID').val();
    var off_payment_type_id = $("#paymentTypeID").val();
    var off_remarks = $('#oxy_reg_remarksId').val();
    $('#remarks').val(off_remarks);
    var shiftType = $('#oxy_reg_shiftID').val();
    var off_end_odometer_reading = $('#oxy_reg_currentOdoId').val();
    var off_filing_date = $('#oxy_fillingDateID').val();
    $('#oxy_fillingDate').val(off_filing_date);
    var reportDataTime1 = moment(off_filing_date).format("YYYY-MM-DD");
    var off_created_by_id = 1;
    var off_created_by_roleid = 1;
    var off_supervisor_id = $('#oxy_reg_supervisorID').val();
    var ofd_district_id = $('#oxy_reg_districtID').val();
    $('#district_id').val(ofd_district_id);
    var off_other_station_name = $('#oxy_reg_stationName').val();
    var off_other_station_phone = $('#oxy_reg_phNo').val();
    var off_other_station_mobile = $('#oxy_reg_mblNo').val();
    var off_other_station_address = $('#oxy_reg_Address').val();
    var off_start_odometer_reading = $('#oxy_reg_preodometerID').val();
    var cylinderId = $('#oxy_reg_cylinderTypeID').val();
    var oxy_quantity = $('#oxy_quantityId').val();
    var oxy_padi_amount = $('#oxy_amountId').val();
    if(oxy_reg_remarksId==null||oxy_reg_remarksId==''){
    	oxy_reg_remarksId=' ';
    }   
    var obj_Insert = {
        ofi_vehicle_id: vehicleid[0],
        off_baselocation_id: baselocation_id,
        off_reg_number: vehicleid[1],
        off_oxygen_stationid: off_oxygen_stationid,
        off_oxygen_card_number: off_oxygen_card_number,
        off_payment_type_id: off_payment_type_id,
        off_remarks: off_remarks,
        off_filing_date: reportDataTime1,
        off_created_by_id: off_created_by_id,
        off_created_by_roleid: off_created_by_roleid,
        off_supervisor_id: off_supervisor_id,
        ofd_district_id: ofd_district_id,
        off_other_station_name: off_other_station_name,
        off_other_station_phone: off_other_station_phone,
        off_other_station_mobile: off_other_station_mobile,
        off_other_station_address: off_other_station_address,
        off_start_odometer_reading: off_start_odometer_reading,
        off_end_odometer_reading: off_end_odometer_reading,
        ofi_ticket_id:ticketId
    };
    if (ofd_district_id === "0") {
        showNotificationError("Select District", "oxy_reg_districtID", "error");
        return;
    } else if (baselocation_id === "0") {
        showNotificationError("Select Base Location", "oxy_reg_baslocID", "error");
        return;
    } else if (off_reg_number === "0") {
        showNotificationError("Select Ambulance", "oxy_reg_ambulanceID", "error");
        return;
    } else if (shiftType === "0") {
        showNotificationError("Select Shift Type", "oxy_reg_shiftID", "error");
        return;
    } else if (off_oxygen_stationid === "-1") {
        showNotificationError("Select Oxygen Station", "oxy_reg_stationID", "error");
        return;
    }
    
    else if (cylinderId === "0") {
        showNotificationError("Select Cylinder", "oxy_reg_cylinderTypeID", "error");
        return;
    } else if (oxy_quantity === "0" || oxy_quantity === "") {
        showNotificationError("Enter Oxygen Quantity", "oxy_quantityId", "error");
        return;
    } else if (oxy_padi_amount === "0" || oxy_padi_amount === "") {
        showNotificationError("Enter Amount", "oxy_amountId", "error");
        return;
    }
   // if (off_oxygen_stationid === "0") {
    else if (off_other_station_name === "0" || off_other_station_name === '0') {
            showNotificationError("Enter Station Name", "oxy_reg_stationName", "error");
            return;
        } else if (off_other_station_address === "0" || off_other_station_address === "") {
            showNotificationError("Enter Station Address", "oxy_reg_Address", "error");
            return;
        } else if (off_other_station_phone === "0" || off_other_station_phone === "") {
            showNotificationError("Enter Station Phone Number", "oxy_reg_phNo", "error");
            return;
        } else if (off_other_station_mobile === "0" || off_other_station_mobile === "") {
            showNotificationError("Enter Station Mobile Number", "oxy_reg_mblNo", "error");
            return;
        }
        else if (off_start_odometer_reading === '' || off_start_odometer_reading === ""||off_start_odometer_reading===null) {
            showNotificationError("Enter Previous Odometer Reading", "oxy_reg_preodometerID", "error");
            return;
        }
        else if (off_end_odometer_reading === '' || off_end_odometer_reading === ""||off_end_odometer_reading===null) {
            showNotificationError("Enter End Odo-Meter Reading", "oxy_reg_currentOdoId", "error");
            return;
        }
        else if (off_payment_type_id === '0' || off_payment_type_id === "0"||off_payment_type_id===null) {
            showNotificationError("Select Payment Mode", "paymentTypeID", "error");
            return;
        }
        else if (off_oxygen_card_number === '' || off_oxygen_card_number === ""||off_oxygen_card_number===null) {
            showNotificationError("Enter Payment Number", "oxy_reg_paymentNumberID", "error");
            return;
        }
    
        else if (off_filing_date === '' || off_filing_date === ""||off_filing_date===null) {
            showNotificationError("Select Oxygen Filling Date", "oxy_fillingDateID", "error");
            return;
        }
        else if (off_supervisor_id === '' || off_supervisor_id === ""||off_supervisor_id===null) {
            showNotificationError("Enter Supervisor Id", "oxy_reg_supervisorID", "error");
            return;
        }
    
   // }
    console.log('==== Obj_Insert' + JSON.stringify(obj_Insert));
    var strUrl = Service.insertforRegistration;
    console.log('==== strUrl' + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
        	get_ohd_mail_directory();
            if (data !== null || data !== 0) {
                showNotificationError("Inserted Sucessfully", "OxyFillingRegID", "success");
                setTimeout(function() {
                  //  $('#registration').modal().hide();
                }, 2000);
            }
        },
        error: function() {
            console.log("Error In case_ReOpen Not Inserted");
        }
    });
}


function oxygenstationInformation() {
    var oxygenId = $('#oxy_reg_stationID').val();
    if (oxygenId === "0" || oxygenId === 0 || oxygenId === '0') {
        // document.getElementById("OthersFleetCard").disabled = false;
        $("#oxy_reg_Address").prop("disabled", false);
        $("#oxy_reg_phNo").prop("disabled", false);
        $("#oxy_reg_mblNo").prop("disabled", false);
     

    }
    else {

    	   $("#oxy_reg_Address").prop("disabled", true);
           $("#oxy_reg_phNo").prop("disabled", true);
           $("#oxy_reg_mblNo").prop("disabled", true);

    }
}

$('#oxy_reg_stationID').on('change', function() {
	oxygenstationInformation();
});

/*
 *@DESC : Search OxygenDeatils purpose
 *@AuthorName : Habiboon Patan
 *@DATE : 10-06-2019
 */
function oxysearch() {
    $('#driverTable').html("");
    try {
        var districtId = document.getElementById('oxy_districtID').value;
        var baselocation = document.getElementById('oxy_basLocID').value;
        var ambulanceId = document.getElementById('oxy_ambulanceID').value;
        var ticketid = document.getElementById('oxy_ticketID').value;
        var fromdate = document.getElementById('oxy_fromDateID').value;
        var todate = document.getElementById('oxy_toDateId').value;
        
        if (districtId === "0" | districtId === '0') {
        	districtId = 0;
        }
        if (baselocation === "0" | baselocation === '0') {
        	baselocation = 0;
        }
        if (ambulanceId === "0" | ambulanceId === '0') {
        	ambulanceId = 0;
        }

        if (ticketid === null | ticketid === '') {
            ticketid = 0;
        }
       

        if (districtId==0 &&baselocation==0 &&ambulanceId==0 &&ticketid==0&&fromdate === ''&&todate === ''){ 
        	//alert("=====================")
          	showNotificationError("Please Select At Least One Search Parameter", "search_id_oxy", "error");
          	//$.toaster({ priority : 'warning', title : 'fgdfg', message : 'plzzz selsdfgsdgf'});
          	return true;
          }
        
//        if (districtId === "0") {
//            showsNotificationError("Please select atleast one district", "oxy_ui_DistrictId", "error");
//            return;
//        }
        if (fromdate === null | fromdate === '') {
            fromdate = '¥';
        }
        if (todate === null | todate === '') {
            todate = '¥';
        }
        var obj_Insert = {
            ofd_district_id: districtId,
            off_baselocation_id: baselocation,
            off_reg_number: ambulanceId,
            finalExpectedfromdate: fromdate,
            finalExpectedtodate: todate,
            ofi_ticket_id: ticketid
        };
        var strUrl = Service.getoxySearchDetails;
        console.log("strUrl : " + strUrl);
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
                if (200 !== responsecode || data.status == "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No Data Available....");
                    $('#driverTable').append(divTag);
                }

                else {
                    var jsonArray = data.oxygenFillingControllerDTO;
                    if (jsonArray.length > 0) {
                        //calling gettingSearchList function.....
                        gettingOxySearchList(jsonArray);
                        oxyloadDataTable();

                    }
                }
            },
            error: function(err) {
                console.error('update Stock error: ' + JSON.stringify(err));
            }
        });
    }
    catch (err) {
        console.error("error occur in search()" + JSON.stringify(err))
    }
}

function gettingOxySearchList(strData) {

    var objDivTag = document.createElement('div');
    $(objDivTag).addClass('table-responsive');

    var objTableTag = document.createElement('table');
    $(objTableTag).addClass('table table-striped table-bordered table-hover dataTables-example');
    $(objDivTag).append(objTableTag);

    var objTHead = document.createElement('thead');
    $(objTableTag).append(objTHead);

    var objTr = document.createElement('tr');
    $(objTHead).append(objTr);

    var objTHead1 = document.createElement('th');
    $(objTHead1).html('S.No');
    $(objTr).append(objTHead1);

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Ticket Id');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('District');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Base Location');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Ambulance No');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('Oxygen Filling Date');
    $(objTr).append(objTHead7);

    var objTHead8 = document.createElement('th');
    $(objTHead8).html('CylinderType');
    $(objTr).append(objTHead8);

    var objTHead9 = document.createElement('th');
    $(objTHead9).html('Oxygen Station Details');
    $(objTr).append(objTHead9);

    var objTHead10 = document.createElement('th');
    $(objTHead10).html('Oxygen Quantity');
    $(objTr).append(objTHead10);

    var objTHead11 = document.createElement('th');
    $(objTHead11).html('PaymentMode');
    $(objTr).append(objTHead11);

    var objTHead12 = document.createElement('th');
    $(objTHead12).html('Payment Card No');
    $(objTr).append(objTHead12);

    var objTHead13 = document.createElement('th');
    $(objTHead13).html('Supervisor Name');
    $(objTr).append(objTHead13);

    var objTBody = document.createElement('tbody');
//    $(objTBody).attr('id', 'driverTablebody');
    $(objTableTag).append(objTBody);

//    var data=JSON.parse(strData.tyreLifeControllerDTOs);
//    console.log("data after parsing"+data);

    for (var i = 0; i < strData.length; i++) {

        var index = i + 1;
        var tbleRow = document.createElement('tr');

        var tblCol = document.createElement('td');
        $(tblCol).addClass('text-center');
        $(tblCol).html(index);
        $(tbleRow).append(tblCol);

        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].ofi_ticket_id);

        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');
        $(tblCol2).html(strData[i].distName);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');
        $(tblCol3).html(strData[i].baseLocName);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].off_reg_number);
        $(tbleRow).append(tblCol4);


        var tblCol5 = document.createElement('td');
        $(tblCol5).addClass('text-center');
        $(tblCol5).html(strData[i].off_filing_date);
        $(tbleRow).append(tblCol5);


        var tblCol6 = document.createElement('td');
        $(tblCol6).addClass('text-center');
        $(tblCol6).html(strData[i].ocy_type);
        $(tbleRow).append(tblCol6);

        var tblCol7 = document.createElement('td');
        $(tblCol7).addClass('text-center');
        $(tblCol7).html(strData[i].ofd_oxygen_station_name);
        $(tbleRow).append(tblCol7);

        var tblCol8 = document.createElement('td');
        $(tblCol8).addClass('text-center');
        $(tblCol8).html(strData[i].ofi_oxygen_qty);
        $(tbleRow).append(tblCol8);


        var tblCol9 = document.createElement('td');
        $(tblCol9).addClass('text-center');
        $(tblCol9).html(strData[i].off_payment_type_id);
        $(tbleRow).append(tblCol9);

        var tblCol10 = document.createElement('td');
        $(tblCol10).addClass('text-center');
        var pilotId = strData[i].off_oxygen_card_number;
        if (pilotId === undefined) {
            $(tblCol10).html('NA');
        }
        else {
            $(tblCol10).html(strData[i].off_oxygen_card_number);
        }
        $(tbleRow).append(tblCol10);
        var tblCol12 = document.createElement('td');
        $(tblCol12).addClass('text-center');
        var supervisorName = strData[i].off_supervisor_id;
        if (supervisorName === undefined) {
            $(tblCol12).html('NA');
        }
        else {
            $(tblCol12).html(strData[i].off_supervisor_id);
        }
        $(tbleRow).append(tblCol12);
        $(objTBody).append(tbleRow);
    }
    $("#driverTable").append(objDivTag);
}

function oxyloadDataTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 10,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'OxygenFilling'},
            {extend: 'pdf', title: 'OxygenFilling'},
            {extend: 'print',
                customize: function(win) {
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



function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
	return false;
	return true;
}  
/*
 *@DESC : Notification purpose
 *@AuthorName : Habiboon Patan
 *@DATE : 10-06-2019
 */
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
//

function resetSearch(){
	$('#oxy_districtID').val('0').trigger("chosen:updated");
	$('#oxy_basLocID').val('0').trigger("chosen:updated");
	$('#oxy_ambulanceID').val('0').trigger("chosen:updated");
	$('#oxy_ticketID').val('');
	$('#oxy_fromDateID').val('')
	$('#oxy_toDateId').val('')
	getAmbulance(0);
	baseLocation_search(0);
	$('#driverTable').empty();
	
}
function resetInsert(){
	$('#oxy_reg_districtID').val('0').trigger("chosen:updated");
	$('#oxy_reg_baslocID').val('0').trigger("chosen:updated");
	$('#oxy_reg_ambulanceID').val('0').trigger("chosen:updated");
	$('#oxy_reg_shiftID').val('');
	$('#oxy_reg_stationID').val('-1').trigger("chosen:updated");
	$('#oxy_reg_stationName').val('')
	$('#oxy_reg_Address').val('');
	$('#oxy_reg_phNo').val('')
	$('#oxy_reg_mblNo').val('')
	$('#oxy_reg_cylinderTypeID').val('');
	$('#oxy_quantityId').val('')
	$('#oxy_amountId').val('')	
	$('#oxy_reg_preodometerID').val('');
	$('#oxy_reg_currentOdoId').val('')
	$('#paymentTypeID').val('')
	$('#oxy_reg_paymentNumberID').val('');
	$('#oxy_fillingDateID').val('')
	$('#oxy_reg_supervisorID').val('')
	$('#oxy_reg_remarksId').val('');
	getAmbulance_reg(0);
	baseLocation_reg(0);
	//get_oxygen_stations(-1);
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

    }).on('strtDate', function (ev) {
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

    }).on('strtDate', function (ev) {
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
	//ticket_id baselocId ambulance_num remarks oxy_fillingDate district_id
	var ticket_id=$('#ticket_id').val();
	var distid=$('#district_id').val();
	var baselocId=$('#baselocId').val();
	var ambulanceno=$('#ambulance_num').val();
	var oxyFillingDate=$('#oxy_fillingDate').val();
	var visitorName=$('#visitor_name').val();
	var visitor_desination=$('#visitor_designation').val();
/*var emsoId=$('#emsoid').val();
	var pilot=$('#pilotid').val();*/
	var message="AP opdesk Tkt ID:"+ticket_id+",Dist:"+distid+",BL:" +baselocId+",A.No:" +ambulanceno+",Category:Oxygen Filling,Date&Time:"+oxyFillingDate+" ERS";	
	var remarks=$('#remarks').val();
	var odometerId=$('#endOdometerNo').val();
	var start_dateTime=$('#start_date_time').val();
	var emailtext;
	//alert("remarks4535====>"+remarks);	
var emailtext =	'<html><head><title>Oxygen Filling</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>';*/

/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';*/

/*emailtext=emailtext+'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>';*/

emailtext=emailtext+' <style>.container{width: 650px;margin:0px auto;padding:20px;}body{padding: 50px;}.gray-bg{background:#f6f6f6;}.white-bg{background:#fff;}';

emailtext=emailtext+' table, th, td { border: 1px solid black; border-collapse: collapse; } table{width:100%;  }th, td { padding: 5px; color: black;text-align:center; font-size: 14px;}.fw-600{font-weight:600;}';        

emailtext=emailtext+'.maintext{background-color: #1f74bd;color: white; height: 50px;font-weight: 800; text-align: center;  font-size: 18px;}.text2{background-color:  #f5f5f5;}.text-light-gray{margin-left: 930px; }</style> </head>'; 

emailtext=emailtext+'<body class="gray-bg"><div class="container white-bg"><h4> Dear All</h4><p>The Following are the activity Details of Operational Helpdesk</p><table ><tr><th colspan="2" class="maintext">Issue Type:Oxygen Filling</th></tr> <tr><td >Reason</td> <td>'+remarks+'</td> ';

emailtext=emailtext+'</tr> <tr><td class="text2">Base Location</td><td class="text2">'+baselocId+'</td></tr><tr><td>Ambulance Register No:</td> <td>'+ambulanceno+'</td>' ;   

emailtext=emailtext+'</tr><tr><td>Escalateed To:</td><td>Fleet Manager</td>';

emailtext=emailtext+'</tr><tr><td class="text2">District:</td><td class="text2">'+distid+'</td></tr>';

emailtext=emailtext+'<tr><td>Status:</td><td>Open</td></tr><tr><td >Oxygen Filling Date&Time:</td><td class="text2">'+oxyFillingDate+'</td>';

emailtext=emailtext+'</tr><tr></table><br><br><div><span class="text-green">Thanks and Regards,<br><span class="text-purple">AP ERS Team.</span></div></div>';                     

emailtext=emailtext+'<div class="text-center "> <p><span class="text-light-gray">Powered by</span> <a href="http://www.procreate.co.in/" target="_blank" class="text-purple">ProCreate Techno Systems Pvt Ltd.</a></p></div></body></html>';                                                                       	
console.log("====>"+message);
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
               alert("SMS Sent Sucessfully ")
              
		            //}

		        }, error: function () {
		            console.log('In Error of  Details ');
		        }
		    });
		}

//inserting email here
function insertHmEmailOutboxTreans(to_mail,emailtext,ticket_id){
	  var createdyid=localStorage.getItem("userID");
		var createdbymodelid=localStorage.getItem("opdesk_moduleID");
		var createdbtroleid=localStorage.getItem("opdesk_roleID");
	var subject="AP ERS-Oxygen Filling with Ticket Id:"+ticket_id
	 var objJson={		
				"inboxqueueid":0,
				"replyuser":0,
				"toemailid":to_mail,
				"subject":subject,
				"replybody":emailtext,
				"actionid":1,
				"templateid":1,
			  	"so_createdbyid":createdyid,
				"createdbymoduleid":createdbymodelid,
				"createdbyroleid":createdbtroleid
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


