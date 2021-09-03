/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var medicine_Index = 0;
var up_medicine_Index = 0;
var consumble_Index = 0;
$('#registration').on('shown.bs.modal', function (e) {


    getListOfDistrict_reg();
    get_shiftTypes_specialIndent();
    get_Medicines_Details();
    get_Consumbles_Details();


});
$(document).ready(function () {
    try {
        getListOfDistrict_specialIndent();
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
function getListOfDistrict_specialIndent() {
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
    $("#baselocationId").empty();
    baseLocation_specialIndent(listOfDistrict);
});
/*
 * For loading the base loc based on district ID calling to masterdata
 * priyadarshini
 * 06-05-2019
 * district id is the input
 */
function baseLocation_specialIndent(listOfDistrict) {
	$("#baselocationId").empty();
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select BaseLocation</option>";
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
    getAmbulance_specialIndent(baseLocation);
});
/*
 * For loading the Ambulance  based on the baseLocation calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */
function getAmbulance_specialIndent(baseLocation) {
	 $("#Ambulance_Id").empty();
    //if (ambulances.length < 1 || ambulances === []) {
    // here calling masterdata ajax call
    loadingAmbulanceMaster(baseLocation);
    var selectfirst = "<option value='0'>Select BaseLocation</option>";
    $('#Ambulance_Id').append(selectfirst);
    $.each(ambulances, function (i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#Ambulance_Id');
    });

    $('#Ambulance_Id').trigger("chosen:updated");
    $("#Ambulance_Id").chosen();
}
;


function getListOfDistrict_reg() {
    getListOfDistrict_specialIndent();

}
$('#districs_id_reg').on('change', function () {
    var listOfDistrict = $('#districs_id_reg').val();
    $("#basloc_id_reg").empty();
    baseLocation_reg(listOfDistrict);
});
/*
 * For loading the base loc for reg  based on district ID calling to masterdata
 * priyadarshini
 * 06-05-2019
 * district id is the input
 */
function baseLocation_reg(listOfDistrict) {
	 $("#basloc_id_reg").empty();
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select BaseLocation</option>";
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
 * For loading the Ambulance  for reg based on the baseLocation calling to masterdata
 * priyadarshini
 * 06-05-2019
 * baseloc id is the input
 */
function getAmbulance_reg(baseLocation) {
	$("#ambulance_id_reg").empty();
    // here calling masterdata ajax call
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
 * For loading the ShiftType  calling to masterdata
 * priyadarshini
 * 06-05-2019
 *no input
 */
function get_shiftTypes_specialIndent() {

    if (shiftType.length < 1 || shiftType === []) {
        // here calling masterdata ajax call
        loadingShiftTypeMaster();
        $.each(shiftType, function (i, resData) {
            var shiftType = "<option value=" + resData.shiftTypeID + ">" + resData.shiftTypeName + "</option>";
            $(shiftType).appendTo('#shiftTypeId');

        });
    }
    $('#shiftTypeId').trigger("chosen:updated");
    $("#shiftTypeId").chosen();
}
;
/*
 * For searching all the details of special indent
 * priyadarshini
 * 06-05-2019
 *
 */
function seacrh_Special_Indent() {
	$('#sp_TableId').empty();
    var sp_DistrictId = $('#districs_id').val();
    if (sp_DistrictId === "0") {
        sp_DistrictId = 0;
    }

    var sp_BaselocationId = $('#baselocationId').val();
    if (sp_BaselocationId === "0") {
        sp_BaselocationId = 0;
    }
    var sp_VehicleId = $('#Ambulance_Id').val();
    if (sp_VehicleId === "0") {
        sp_VehicleId = 0;
    }

    var sp_ExpectedFromDate = $('#fromDate_id').val();
    if (sp_ExpectedFromDate === "") {
        sp_ExpectedFromDate = "0";
    }
    var sp_ExpectedtoDate = $('#todate_id').val();
    if (sp_ExpectedtoDate === "") {
        sp_ExpectedtoDate = "0";
    }
    var sp_ticket_Id = $('#ticketId').val();
    if (sp_ticket_Id === "") {
        sp_ticket_Id = "0";
    }
    
    if (sp_DistrictId==0 &&sp_BaselocationId==0 &&sp_VehicleId==0 &&sp_ExpectedFromDate=="0"&&sp_ExpectedtoDate=="0"&&sp_ticket_Id=="0"){   
      	showNotificationError("Please Select At Least One Search Parameter", "search_id", "error");
      	//$.toaster({ priority : 'warning', title : 'fgdfg', message : 'plzzz selsdfgsdgf'});
      	return true;
      }
    
    var searchObject = {
        district_id: sp_DistrictId,
        baselocation_id: sp_BaselocationId,
        vehicle: sp_VehicleId,
        exptectedfromdate: sp_ExpectedFromDate,
        exptectedtodate: sp_ExpectedtoDate,
        ticketid: sp_ticket_Id
    };
    var strUrl = Service.seacrh_Special_Indent;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(searchObject),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function (data) {

            if (data.responseCode !== 200) {
            	 var divTag = document.createElement("h2");
                 $(divTag).css("text-align", "center");
                 $(divTag).html("No Data Available....");
                 $('#sp_TableId').append(divTag);
            }
          //  
            var strData = data.specialIndentControllerDTOs;
            if (strData.length === 0 || strData === undefined || strData === null) {
                search_seacrh_Special_Indent_DOM(strData);
                loadDataTable();
            }
            search_seacrh_Special_Indent_DOM(strData);
            loadDataTable();


        },
        error: function () {
            console.log('Error in loading incident_Reopen Data' + strUrl);
        }
    });
}
/*
 * For loading the medicines drop down
 * priyadarshini
 * 06-05-2019
 *no input
 */
function get_Medicines_Details() {
    var strUrl = Service.get_Medicines_Details;
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: 'json',
        async: false,
        success: function (data) {
            $.each(data.specialIndentControllerDTOs, function (i, resData) {
                var sp_Reg_Medicine = "<option value=" + resData.cpi_serialid + ">" + resData.cpi_parameter + "</option>";
                $(sp_Reg_Medicine).appendTo('#medicine_id');
            });
        },
        error: function (err) {
            console.error("error in get_Medicines_Details" + JSON.stringify(err));
        }
    });
    $('#medicine_id').trigger("chosen:updated");
    $("#medicine_id").chosen();
}

/*
 * For inserting medicine details
 * priyadarshini
 * 06-05-2019
 *
 */
function inserting_GetMedicine_Dteails() {

    var sp_Reg_District = $('#districs_id_reg').val();

    var sp_Reg_BaseLocation = $('#basloc_id_reg').val();

    var sp_Reg_ShiftType = $('#shiftTypeId').val();


    var sp_Reg_Ambulance = $('#ambulance_id_reg').val();

    var ambulance_reg_number = $("#ambulance_id_reg option:selected").text();
    var reg_medicine = $('#medicine_id').val();
    var quantity = $('#quantity_id').val();
    if (sp_Reg_District === "0") {

        showNotificationError("Select District", "districs_id_reg", "error");
        return;
    }
    else if (sp_Reg_BaseLocation === "0") {
        showNotificationError("Select Base Location", "basloc_id_reg", "error");
        return;
    }
    else if (sp_Reg_Ambulance === "0") {
        showNotificationError("Select Ambulance", "ambulance_id_reg", "error");
        return;
    }
    else if (sp_Reg_ShiftType === "0") {
        showNotificationError("Select Shift Type", "shiftTypeId", "error");
        return;
    }
    else if (reg_medicine === "0") {
        showNotificationError("Select Medicine", "medicine_id", "error");
        return;
    }
    else if (quantity === "" || quantity === null) {
        showNotificationError("Enter Quantity", "quantity_id", "error");
        return;
    }
    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
    var objJson = {
        "vehicle": sp_Reg_Ambulance,
        "par_sii_medicine_consumableid": reg_medicine,
        "par_sii_quantity": quantity,
        "par_sii_created_dtm": "now()",
        "par_sii_created_by_id": createdyid,
        "par_sii_created_by_roleid": createdbtroleid,
        "med_con_id": 1
    };
    var strUrl = Service.inserting_GetMedicine_Dteails;
    console.log("objJson" + objJson);
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
            if (responsecode === 0) {
                alert(" not Inserted ");
            } else {
                showNotificationError("Inserted Successfully", "save_madicine_id", "success");

                var resultData = data.toString();
                var resTicketId = resultData.slice(1, 16);
                $('#sp_TicketId').val(resTicketId);
                //for appending data in data table
                get_Medicine_Details(resTicketId);

            }

        }, error: function () {

            console.log('In Error of  Details ');
        }
    });
}
/*
 * For getting  medicine details
 * priyadarshini
 * 06-05-2019
 *
 */
function get_Medicine_Details(resTicketId) {
    medicine_Index++;
    var strUrl = Service.getConsumblesDetails + resTicketId;
    $.ajax({
        type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: false,
        success: function (data) {

            var responsecode = data.responseCode;
            if (responsecode === 0) {

            } else {
                var jsonArray = data.specialIndentControllerDTOs;
                $.each(jsonArray, function (i, resData) {

                    var sp_reg_medicine_details = "<tr><td>" + medicine_Index + "</td><td>" + resData.cpi_parameter + "</td><td>" + resData.sii_quantity + "</td></tr>";
                    $('#table').append(sp_reg_medicine_details);

                });
            }
        },
        error: function (err) {
            console.error("Error in get_Consumbles_Name" + JSON.stringify(err));
        }
    });
}




/*
 * For getting consumbles details
 * priyadarshini
 * 06-05-2019
 *no input
 */

function get_Consumbles_Details() {
    var strUrl = Service.getConsumblesDropDownDetails
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: 'json',
        async: false,
        success: function (data) {
            $.each(data.specialIndentControllerDTOs, function (i, resData) {
            	var index = i + 1;
                var sp_Reg_Medicine = "<option value=" + index+ ">" + resData.cpi_parameter + "</option>";
                $(sp_Reg_Medicine).appendTo('#consumable_id');
            });
        },
        error: function (err) {
            console.error("error in get_Consumbles_Details" + JSON.stringify(err));
        }

    });
    $('#consumable_id').trigger("chosen:updated");
    $("#consumable_id").chosen();
}
/*
 * For inserting consumbles details
 * priyadarshini
 * 06-05-2019
 *
 */

function inserting_Consumbles_Dteails()
{
    var sp_Reg_District = $('#districs_id_reg').val();
    var sp_Reg_BaseLocation = $('#basloc_id_reg').val();
    var sp_Reg_ShiftType = $('#shiftTypeId').val();
    var sp_Reg_Ambulance = $('#ambulance_id_reg').val();
    var reg_Split = sp_Reg_Ambulance.split(",");
    var par_VehicleId = reg_Split[0];
    var consumable = $('#consumable_id').val();
    var par_sii_quantity = $('#reg_quantityId').val();

    if (sp_Reg_District === "0") {

        showNotificationError("Select District", "districs_id_reg", "error");
        return;
    }
    else if (sp_Reg_BaseLocation === "0") {
        showNotificationError("Select Base Location", "basloc_id_reg", "error");
        return;
    }

    else if (sp_Reg_Ambulance === "0") {
        showNotificationError("Select Ambulance", "ambulance_id_reg", "error");
        return;
    }
    else if (sp_Reg_ShiftType === "0") {
        showNotificationError("Select Shift Type", "shiftTypeId", "error");
        return;
    }
    else if (consumable === "0") {
        showNotificationError("Select Consumable", "consumable_id", "error");
        return;
    }
    else if (par_sii_quantity === "" || par_sii_quantity === undefined || par_sii_quantity === null) {
        showNotificationError("Enter Quantity", "reg_quantityId", "error");
        return;
    }

    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
    var objJson = {
        // NOTE:Ticket Id generating Dynamically
        vehicle: par_VehicleId,
        par_sii_medicine_consumableid: consumable,
        par_sii_quantity: par_sii_quantity,
        par_sii_created_dtm: "now()",
        par_sii_created_by_id: createdyid,
        par_sii_created_by_roleid: createdbtroleid,
        med_con_id: 1//In Php Harcode value they ar passing
    };
    var strUrl = Service.inserting_Consumbles_Dteails
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
            if (responsecode === 0) {
                alert("not inserted");

            } else {
                showNotificationError("Inserted Successfully", "save_consumbles_id", "success");

                var resultData = data.toString();
                var resTicketId = resultData.slice(1, 16);
                $('#sp_TicketId').val(resTicketId);
                //for appending data in data table
                Consumbles_Details(resTicketId);

            }

        }, error: function () {

            console.log('In Error of  Details ');
        }
    });
}
/*
 * For getting consumbles details
 * priyadarshini
 * 06-05-2019
 *
 */
function Consumbles_Details(resTicketId) {
    consumble_Index++;
    var strUrl = Service.getConsumbles_Details + resTicketId;
    $.ajax({
        type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (responsecode === 0) {
            } else {
                var jsonArray = data.specialIndentControllerDTOs;
                $.each(jsonArray, function (i, resData) {
                	var index = i + 1;
                    var sp_reg_consumbles_Details = "<tr><td>" + index + "</td><td>" + resData.cpi_parameter + "</td><td>" + resData.sii_quantity + "</td></tr>";
                    $('#table1').append(sp_reg_consumbles_Details);

                });
            }
        },
        error: function (err) {
            console.error("Error in get_Consumbles_Name" + JSON.stringify(err));
        }
    });
}



/*
 * For inserting special indent details
 * priyadarshini
 * 06-05-2019
 *
 */
function insert_Special_Indent() {
    var sp_Reg_District = $('#districs_id_reg').val();
    $('#distId').val(sp_Reg_District);
    var sp_Reg_BaseLocation = $('#basloc_id_reg').val();
    $('#baseLocId').val(sp_Reg_BaseLocation);
    var sp_Reg_Ambulance = $('#ambulance_id_reg').val();
    var ambulance_reg_number = $("#ambulance_id_reg option:selected").text();
    var reg_Split = sp_Reg_Ambulance.split(",");
    var par_VehicleId = reg_Split[0];
    var par_reg_number = reg_Split[1];
    var sp_Reg_ShiftType = $('#shiftTypeId').val();
    var sp_Reg_Cosumble = $('#consumable_id').val();
    var sp_Reg_Medicine = $('#medicine_id').val();
    var sp_Reg_ExpectedDate = $('#deliveryDate_id').val();
    $('#expected_date').val(sp_Reg_ExpectedDate);
    var sp_Reg_Remarks = $('#remarks_id').val();
    $('#remarks_id').val(sp_Reg_Remarks);
    var sp_SuperivioisId = $('#supervisorId').val();
    var distManager = $('#distManager_id').val();
    
    if (sp_Reg_District === "0") {

        showNotificationError("Select District", "districs_id_reg", "error");
        return;
    }
    else if (sp_Reg_BaseLocation === "0") {
        showNotificationError("Select Base Location", "basloc_id_reg", "error");
        return;
    }
    else if (sp_Reg_Ambulance === "0") {
        showNotificationError("Select Ambulance", "ambulance_id_reg", "error");
        return;
    }

    else if (sp_Reg_ShiftType === "0") {
        showNotificationError("Select ShiftType", "shiftTypeId", "error");
        return;
    }
    else if (sp_Reg_Cosumble === "0") {
        showNotificationError("Select Cosumble", "consumable_id", "error");
        return;
    }

    else if (sp_Reg_Medicine === "0") {
        showNotificationError("Select Medicine", "medicine_id", "error");
        return;
    }
    else if (sp_Reg_ExpectedDate === "" || sp_Reg_ExpectedDate === undefined) {
        showNotificationError("Select Expected  Date", "deliveryDate_id", "error");
        return;
    }

    else if (sp_SuperivioisId === "" || sp_SuperivioisId === undefined || sp_SuperivioisId === null) {
        showNotificationError("Enter Supervisor Id", "supervisorId", "error");
        return;
    }
   
    
    else if (distManager === "" || distManager === undefined || distManager === null) {
        showNotificationError("Enter District Manager ID", "distManager_id", "error");
        return;
    }
    else if (sp_Reg_Remarks === "" || sp_Reg_Remarks === undefined) {
        showNotificationError("Enter Remarks", "remarks_id", "error");
        return;
    }
    $('#ambulance_number').val(ambulance_reg_number);
    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
    var insert_sp_Obj = {
        vehicle: par_VehicleId,
        baselocation_id: sp_Reg_BaseLocation,
        par_si_reg_number: ambulance_reg_number,
        par_si_activity_id: 7,
        remarks: sp_Reg_Remarks,
        expected_date_time: sp_Reg_ExpectedDate,
        par_si_emso_id: 1,
        pilotid: 1,
        sp_Reg_supervisor: sp_SuperivioisId,
        par_sii_created_dtm: "now()",
        par_sii_created_by_id: createdyid,
        par_sii_created_by_roleid: createdbtroleid,
        district_id: sp_Reg_District,
        par_si_progress_status_id: 1,
        par_si_shiftid: sp_Reg_ShiftType,
        par_si_emso_name: null,
        par_si_pilot_name: null,
        distmanger_Id: distManager
    };
    var strUrl = Service.insert_Special_Indent;

    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(insert_sp_Obj),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function (data) {
        	$('#special_indent_id').val(data.output);
        	get_ohd_mail_directory();
            if (data == null) {
                alert("data not inserted");
            }
            else {
                showNotificationError("Inserted Successfully", "special_indent_id", "success");

                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }

        }, error: function () {

            console.log('In Error of  Details ');
        }
    });
}



//dom
function search_seacrh_Special_Indent_DOM(strData) {

    try {

        //For Div Tag
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

//For table
        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTable");
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

        //For table Heading1
        var objTHead2 = document.createElement("th");
        $(objTHead2).html("Ticket Id");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);


//For table Heading2
        var objTHead3 = document.createElement("th");
        $(objTHead3).html("District");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);

//For table Heading3
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
        $(objTHead6).html("Name Of Medicine/Consumable");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);


//For table Heading5
        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Indent Quantity");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);


        //For table Heading5
        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Expected Date  Of Delivery");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

//For table Heading5
       /* var objTHead9 = document.createElement("th");
        $(objTHead9).html("Pilot Name");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);
        //For table Heading5
        var objTHead10 = document.createElement("th");
        $(objTHead10).html("EMT Name");
        $(objTHead10).addClass("text-center");
        $(objTr).append(objTHead10);

        //For table Heading5
        var objTHead11 = document.createElement("th");
        $(objTHead11).html("Supervisor Name");
        $(objTHead11).addClass("text-center");
        $(objTr).append(objTHead11);

        //For table Heading5
        var objTHead12 = document.createElement("th");
        $(objTHead12).html("District Manager Name");
        $(objTHead12).addClass("text-center");
        $(objTr).append(objTHead12);*/
        //For table Heading6
        var objTHead13 = document.createElement("th");
        $(objTHead13).html("Status");
        $(objTHead13).addClass("text-center");
        $(objTr).append(objTHead13);
        //For table Heading5
        var objTHead14 = document.createElement("th");
        $(objTHead14).html("Update");
        $(objTHead14).addClass("text-center");
        $(objTr).append(objTHead14);


        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "sp_Tbody");
        $(ObjTableTag).append(objTBody);

// Table Data Appending Here

        for (var i = 0; i < strData.length; i++)
        {
            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol = document.createElement("td");
            $(tablcol).html(index);
            $(tbleRow).append(tablcol);


            var tablcol2 = document.createElement("td");
            $(tablcol2).html(strData[i].specialindent_Id);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).html(strData[i].distName);
            $(tbleRow).append(tablcol3);



            var tablcol4 = document.createElement("td");
            $(tablcol4).html(strData[i].baseLocName);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].par_si_reg_number);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].sii_medicine_consumableid);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).html(strData[i].sii_quantity);
            $(tbleRow).append(tablcol7);


            var tablcol8 = document.createElement("td");
            $(tablcol8).html(strData[i].expected_date_time);
            $(tbleRow).append(tablcol8);

            /*var tablcol9 = document.createElement("td");
            $(tablcol9).html(strData[i].pilotid);


            $(tbleRow).append(tablcol9);

            var tablcol10 = document.createElement("td");

            $(tablcol10).html(strData[i].par_si_emso_name);

            $(tbleRow).append(tablcol10);

            var tablcol11 = document.createElement("td");

            $(tablcol11).html(strData[i].supervisor_Id);

            $(tbleRow).append(tablcol11);


            var tablcol12 = document.createElement("td");

            $(tablcol12).html(strData[i].distmanger_Id);

            $(tbleRow).append(tablcol12);
*/
            var tablcol13 = document.createElement("td");
            $(tablcol13).html(strData[i].status_id);
            $(tbleRow).append(tablcol13);

   
            var tablcol14 = document.createElement("td");
            var buttonTag = document.createElement('button');
            var text = document.createTextNode("Update");
            buttonTag.appendChild(text);
            $(buttonTag).addClass('btn btn-primary btn-sm');
            $(buttonTag).attr('onclick', 'getting_Sp_RowData("' + strData[i].distName + '","' + strData[i].baseLocName + '","' + strData[i].par_si_reg_number + '","' + strData[i].specialindent_Id + '","' + strData[i].quantity_Id + '","' + strData[i].expected_date_time + '","' + strData[i].supervisor_Id + '","' + strData[i].distmanger_Id + '","' + strData[i].status_id + '","' + strData[i].shiftType + '")');
            $(tablcol14).append(buttonTag);
            $(tablcol14).css('height', '36px');

            var tblCol19 = document.createElement('td');
            $(tblCol19).addClass('text-center');
            $(tblCol19).html(strData[i].status_id);
            if (strData[i].status_id === "Closed") {
                $(tbleRow).append(tblCol19);
            } else {
                $(tbleRow).append(tablcol14);
            }
            $(objTBody).append(tbleRow);


        }
        $("#sp_TableId").append(objDivTag);
    }
    catch (err) {
        console.log("Special Indent  Error" + err);
    }
}
function getting_Sp_RowData(distName, baseLocName, par_si_reg_number, specialindent_Id, quantity_Id, expected_date_time, supervisor_Id, distmanger_Id, status_id, shiftType) {

    $('#update').modal('show');
    $("#up_districsId").val(distName);
    $("#up_baslocId").val(baseLocName);
    $("#up_ambulanceId").val(par_si_reg_number);
    $("#up_shiftTypeId").val(shiftType);
    $("#up_supervisorId").val(supervisor_Id);
    $("#up_distManagerId").val(distmanger_Id);

    $('#up_Sp_TicketId').val(specialindent_Id);


}
function loadDataTable() {

    $('.dataTable').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 10,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv', title: 'OPDesk_Breakdown_Maintenance '},
            {extend: 'excel', title: 'OPDesk_Breakdown_Maintenance '},
            {extend: 'pdf', title: 'OPDesk_Breakdown_Maintenance'},
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

/*
 * For updating special indent details
 * priyadarshini
 * 06-05-2019
 * input-remarks,received date,ticket id
 */
function updating_SpecialIndent_Dteails() {

    var up_Sp_TicketId = $('#up_Sp_TicketId').val();

    var up_Sp_Reg_ReceivedDate = $('#up_deliveryDateId').val();
    var up_Sp_Reg_ReceivedDate1 = moment(up_Sp_Reg_ReceivedDate).format("YYYY-MM-DD");
    var up_Sp_Reg_Remarks = $('#up_remarksId').val();
    if (up_Sp_Reg_ReceivedDate === "" || up_Sp_Reg_ReceivedDate ==='' || up_Sp_Reg_ReceivedDate === null) {
        showNotificationError("Select time", "up_deliveryDateId", "error");
        return;
    }

    else if (up_Sp_Reg_Remarks === "" || up_Sp_Reg_Remarks ==='' || up_Sp_Reg_Remarks === null) {
        showNotificationError("enter remarks", "up_remarksId", "error");
        return;
    }
    var update_Sp_Object = {
        remarks: up_Sp_Reg_Remarks,
        par_si_received_date: up_Sp_Reg_ReceivedDate1,
        specialindent_Id: up_Sp_TicketId
    };
    var strUrl = Service.updating_SpecialIndent_Dteails;

    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(update_Sp_Object),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function (data) {
            //alert("data---"+data.responsecode);
            showNotificationError("Data Updated Successfully", "up_specialIndent_id", "success");
//
//            window.setTimeout(function () {
//                location.reload();
//            }, 2000);
        },
        error: function () {
            console.log('Error in loading inserting_Consumbles_Dteails Data' + strUrl);
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
//

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

$('#fromDate_id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});
$('#todate_id').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});
//$('#deliveryDate_id').datepicker({
//    format: "dd/mm/yyyy",
//    todayHighlight: true,
//    // autoclose: true,
//    // orientation: "top",
//    endDate: "today"
//
//});
/*$('#up_deliveryDateId').datepicker({
    format: "dd/mm/yyyy",
    todayHighlight: true,
    // autoclose: true,
    // orientation: "top",
    endDate: "today"

});*/
function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
	return false;
	return true;
}  

function resetSearch(){
	$('#districs_id').val('0').trigger("chosen:updated");
	$('#baselocationId').val('0').trigger("chosen:updated");
	$('#Ambulance_Id').val('0').trigger("chosen:updated");
	$('#ticketId').val('');
	$('#fromDate_id').val('');
	$('#todate_id').val('');
	$('#sp_TableId').empty();
	baseLocation_specialIndent(0);
	getAmbulance_specialIndent(0);
}


function resetInsert(){
	$('#districs_id_reg').val('0').trigger("chosen:updated");
	$('#basloc_id_reg').val('0').trigger("chosen:updated");
	$('#ambulance_id_reg').val('0').trigger("chosen:updated");
	$('#shiftTypeId').val('0').trigger("chosen:updated");
	$('#medicine_id').val('0').trigger("chosen:updated");
	$('#quantity_id').val('');
	$('#consumable_id').val('0').trigger("chosen:updated");
	$('#reg_quantityId').val('')
	$('#deliveryDate_id').val('')
	$('#supervisorId').val('')
	$('#distManager_id').val('')
	$('#otherManager_id').val('')
	$('#remarks_id').val('')
	baseLocation_reg(0);
	getAmbulance_reg(0);
	//$('#table').empty();
	//$('#table1').empty();
}

function resetUpdate(){
	$('#up_deliveryDateId').val('');
	$('#up_remarksId').val('');
}



//here getting mail and mobile no. to send mail
function get_ohd_mail_directory(){
	var ticket_id=$('#special_indent_id').val();
	var distid=$('#distId').val();
	var baselocId=$('#baseLocId').val();
	var ambulanceno=$('#ambulance_number').val();
	alert(ambulanceno);
	var expectDate=$('#expected_date').val();
    /*var emsoId=$('#emsoid').val();
	var pilot=$('#pilotid').val();*/
	var message="AP opdesk Tkt ID:"+ticket_id+",Dist:"+distid+",BL:" +baselocId+",A.No:" +ambulanceno+",Category:Special Indent:"+expectDate+" ERS";	
	var remarks=$('#remarks_id').val();
	var odometerId=$('#endOdometerNo').val();
	var start_dateTime=$('#start_date_time').val();
	var emailtext;
	//alert("remarks4535====>"+remarks);
	
var emailtext =	'<html><head><title>Special Indent</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>';*/

/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';*/

/*emailtext=emailtext+'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>';*/

emailtext=emailtext+' <style>.container{width: 650px;margin:0px auto;padding:20px;}body{padding: 50px;}.gray-bg{background:#f6f6f6;}.white-bg{background:#fff;}';

emailtext=emailtext+' table, th, td { border: 1px solid black; border-collapse: collapse; } table{width:100%;  }th, td { padding: 5px; color: black;text-align:center; font-size: 14px;}.fw-600{font-weight:600;}';        

emailtext=emailtext+'.maintext{background-color: #1f74bd;color: white; height: 50px;font-weight: 800; text-align: center;  font-size: 18px;}.text2{background-color:  #f5f5f5;}.text-light-gray{margin-left: 930px; }</style> </head>'; 

emailtext=emailtext+'<body class="gray-bg"><div class="container white-bg"><h4> Dear All</h4><p>The Following are the activity Details of Operational Helpdesk</p><table ><tr><th colspan="2" class="maintext">Issue Type:Special Indent</th></tr> <tr><td >Reason</td> <td>'+remarks+'</td> ';

emailtext=emailtext+'</tr> <tr><td class="text2">Base Location</td><td class="text2">'+baselocId+'</td></tr><tr><td>Ambulance Register No:</td> <td>'+ambulanceno+'</td>' ;   

emailtext=emailtext+'</tr><tr><td>Escalateed To:</td><td>Fleet Manager</td>';

emailtext=emailtext+'</tr><tr><td class="text2">District:</td><td class="text2">'+distid+'</td></tr>';

emailtext=emailtext+'<tr><td>Status:</td><td>Open</td></tr><tr><td class="text2">Current Date:</td><td class="text2"></td></tr><tr><td >Expected Date:</td><td class="text2">'+expectDate+'</td>';

emailtext=emailtext+'</tr></table><br><br><div><span class="text-green">Thanks and Regards,<br><span class="text-purple">AP ERS Team.</span></div></div>';                     

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
	var subject="AP ERS-Special Indent with Ticket Id:"+ticket_id
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

