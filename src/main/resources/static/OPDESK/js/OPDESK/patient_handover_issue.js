/**
 * @author Bhuneshwar Patel
 */

/*
 * on loading
 */
$(document).ready(function() {
    try {
        getListOfDistrict();

    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

/**
 * 
 * At the time registation calling this function
 */

$('#registration').on('shown.bs.modal', function(e) {
    getListOfDistrictForReg();
    getListOfDistrictForReg();
    get_shiftTypes();
    issueType();
    getPatientHandoverIssueReportToDm();

});

/**
 * 
 * At the time Updation calling this function
 */

$('#Update').on('shown.bs.modal', function(e) {
    getPatientHandoverIssueReportToDm();

});



function getListOfDistrict() {
    loadingDistrictsMaster();
    $.each(district, function(i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#district_id');
    });
    $('#district_id').trigger("chosen:updated");
    $("#district_id").chosen();
}
;

/*
 *@functionality:  Search Patient Handover Issue
 * Disrict Drop Down Loading For Search
 */
function getListOfDistrictForReg() {
    loadingDistrictsMaster();
    $.each(district, function(i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#districtReg');
    });
    $('#districtReg').trigger("chosen:updated");
    $("#districtReg").chosen();
}
;

//onchange for search patient handover issue
$('#district_id').on('change', function() {
    var listOfDistrict = $('#district_id').val();
    $('#baselocation_id').empty();
    baseLocation(listOfDistrict);
});

//on change for registation patient handover issue
$('#districtReg').on('change', function() {
    var listOfDistrict = $('#districtReg').val();
    $('#baselocationReg').empty();
    baseLocationForReg(listOfDistrict);
});

// for hospital loading
$('#districtReg').on('change', function() {
    var listOfDistrict = $('#districtReg').val();
    $('#hospitalNameReg').empty();
    getHospitalDetails(listOfDistrict);
});

/*
 * @Functionality:Baselocation Dropdown Loading
 * For Search Patient handover issue
 */
function baseLocation(listOfDistrict) {
	 $('#baselocation_id').empty();
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Baselocation</option>";
    $('#baselocation_id').append(selectfirst)
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#baselocation_id');
        //   $(baselocation).appendTo('#listOfBaseLocationForRegistration');

    });
    $('#baselocation_id').trigger("chosen:updated");
    $("#baselocation_id").chosen();
}
;

/*
 *  @Functionality:Baselocation Dropdown Loading
 *  For Registation Patient Handover issue
 */
function baseLocationForReg(listOfDistrict) {
	$('#baselocationReg').empty();
	$('#baselocationReg').val();
    // here calling masterdata ajax call
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Base Location</option>";
    $('#baselocationReg').append(selectfirst)
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#baselocationReg');
        //   $(baselocation).appendTo('#listOfBaseLocationForRegistration');

    });
    $('#baselocationReg').trigger("chosen:updated");
    $("#baselocationReg").chosen();
}
;

//on change for search Patient handover issue
$('#baselocation_id').on('change', function() {
    var baseLocationVal = $('#baselocation_id').val();
    $('#ambulance_id').empty();
    getAmbulance(baseLocationVal);
});

//on change for registation patient handover issue
$('#baselocationReg').on('change', function() {
    var baseLocationVal = $('#baselocationReg').val();
    $('#ambulanceReg').empty();
    getAmbulanceForReg(baseLocationVal);
});


/*
 * @Functionality:Ambuance loading based on baselocation
 * For search Patient handover issue
 */
function getAmbulance(baseLocationVal) {
	 $('#ambulance_id').empty();
    // here calling masterdata ajax call
    loadingAmbulanceMaster(baseLocationVal);
    var selectfirst = "<option value='0'>Select Ambulances</option>";
    $('#ambulance_id').append(selectfirst);
    $.each(ambulances, function(i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#ambulance_id');
        //$(ambulances).appendTo('#listOfAmbulanceForRegistration');
    });
    $('#ambulance_id').trigger("chosen:updated");
    $("#ambulance_id").chosen();

}
;

/*
 * @Functionality:Ambulance loading based on baselocation
 * For Registation Patient handover issue
 */
function getAmbulanceForReg(baseLocationVal) {
	$('#ambulanceReg').empty();
    loadingAmbulanceMaster(baseLocationVal);
     var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#ambulanceReg').append(selectfirst);
    $.each(ambulances, function(i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + "," + resData.vehicleName + ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#ambulanceReg');
        //$(ambulances).appendTo('#listOfAmbulanceForRegistration');
    });
    $('#ambulanceReg').trigger("chosen:updated");
    $("#ambulanceReg").chosen();
}
;

/*
 * @Functionality:Issue Type dropdown loading
 * For Registation patient handover issue
 */
function issueType() {
    try {
        var strUrl = Service.issueType;
        console.log("get_shiftTypes Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.patientHandOverIssueDTOs;

                    $.each(jsonArray, function(i, resData) {
                        var shiftTypeData = "<option value=" + resData.phi_seriaid + ">" + resData.pit_issue_type + "</option>";
                        $(shiftTypeData).appendTo('#issueTypeReg');
                        // $(shiftTypeData).appendTo('#oxy_reg_shiftTypeId');
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_shiftTypes" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_shiftTypes()' + err);
    }
}

function getHospitalDetails(districtId) {
	  $('#hospitalNameReg').empty();
    try {
        var strUrl = Service.getHospitalDetails+districtId;
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
            	  $("#hospitalNameReg").empty();
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.patientHandOverIssueDTOs;
                    var selectfirst = "<option value='0'>Select Hospital</option>";
                    $('#hospitalNameReg').append(selectfirst)
                    $.each(jsonArray, function(i, resData) {
                        var hospital = "<option value=" + resData.phi_hospitalid + ">" + resData.phi_hospitalname + "</option>";
                        $(hospital).appendTo('#hospitalNameReg');
                        // $(shiftTypeData).appendTo('#oxy_reg_shiftTypeId');
                    });
                    $('#hospitalNameReg').trigger("chosen:updated");
                    $("#hospitalNameReg").chosen();
                }

            },
            error: function(err) {
                console.error("Error in get_shiftTypes" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_shiftTypes()' + err);
    }
}

/**
 * @Functionality:Report to DM Dropdown loading 
 * @returns {undefined}
 */
function getPatientHandoverIssueReportToDm() {
    $('#reportToDmReg').empty();
    $('#communicateWithHospitalReg').empty();
    $('#reportToDmUpdate').empty();
    $('#communicateWithHospital_update').empty();
    try {
//        get_shiftTypes: 'http://' + SYSTEM_IP + '/FuelController/getShiftTypesBasedOnAmbulance',
        var strUrl = Service.getPatientHandoverIssueReportToDm;
        console.log("get_shiftTypes Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.patientHandOverIssueDTOs;
                    var selectfirst = "<option value='0'>Select One</option>";
                    $('#reportToDmReg').append(selectfirst);
                    $('#communicateWithHospitalReg').append(selectfirst);
                    $('#reportToDmUpdate').append(selectfirst);
                    $('#communicateWithHospital_update').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var shiftTypeData = "<option value=" + resData.phi_seriaid + ">" + resData.mi_type_name + "</option>";
                        $(shiftTypeData).appendTo('#reportToDmReg');
                        $(shiftTypeData).appendTo('#communicateWithHospitalReg');
                        $(shiftTypeData).appendTo('#reportToDmUpdate').val();
                        $(shiftTypeData).appendTo('#communicateWithHospital_update').val();

                    });
                }
            },
            error: function(err) {
                console.error("Error in get_shiftTypes" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_shiftTypes()' + err);
    }
}


/*
 * @Functionality:Registation Patient handover issue
 */
function insertPatientHandoverIssue() {
    var vehicleId = $('#ambulanceReg').val();
    var ambulance = vehicleId.split(",");
    //  var 
    var baselocationId = $('#baselocationReg').val();
    var shiftId = $('#shiftTypeId_for_reg').val();
    //var regNumber=$('#ambulanceIdReg').val();
    var activityId = $('#').val();
    var hospitalId = $('#hospitalId').val();
    var hospitalName = $('#').val();
    var address = $('#').val();
    var contactno = $('#').val();
    var contactPerson = $('#').val();
    var issueTypeId = $('#issueTypeid').val();
    var emsoId = $('#emtIdreg').val();
    var pilot_Id = $('#pilotIdReg').val();
    var supervisorId = $('#supervisorNameReg').val();
    var patientRelativeName = $('#relativeNameReg').val();
    var hospitalContactName = $('#hospitalPersonNmaeReg').val();
    var correvtiveActionDate = $('#correctiveActionDateReg').val();
    var remarks = $('#').val();
    var createdById = $('#').val();
    var createdByRoleId = $('#').val();
    var empShiftId = $('#').val();
    var districtId = $('#districtReg').val();
    var reportingToDm = $('#reportToDmReg').val();
    var communicateToHospital = $('#communicateWithHospitalReg').val();
    var statusId = $('#').val();
    var createdDtm = $('#').val();
    var emsoName = $('#emtNameReg').val();
    var pilotName = $('#pilotNameReg').val();
    var otherHospName = $('#').val();
    var otherHospContactPerson = $('#').val();
    var otherHospContactNo = $('#').val();
    var otherHospAddress = $('#').val();
    var issueType = $('#issueTypeReg').val();
    var remarks = $('#remarksId_reg').val();
    var correctiveActionDate = $('#correctiveActionDateReg').val();
    
    if(pilot_Id==null||pilot_Id==''){
    	pilot_Id=0;
    }
    if(emsoId==null||emsoId==''){
    	emsoId=0;
    }
    if(emsoName==null||emsoName==''){
    	emsoName=' ';
    }
    if(pilotName==null||pilotName==' '){
    	pilotName=0;
    }
    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
    
    var objJson = {
        phi_vehicle_id: ambulance[0],
        phi_baselocation_id: baselocationId,
        phi_reg_number: ambulance[1],
        phi_activity_id: 12,//doubt
        phi_hospitalid: 2,
        phi_hospitalname: '',
        phi_address: '',
        phi_contactno: '',
        phi_contactperson: '',
        phi_issuetypeid: issueType,
        phi_emso_id: emsoId,
        phi_pilot_id: pilot_Id,
        phi_supervior_id: supervisorId,
        phi_patient_relativename: patientRelativeName,
        phi_hospital_contactname: hospitalContactName,
        phi_action_date: correvtiveActionDate,
        phi_remarks: remarks,
        phi_created_by_id: createdyid,
        phi_created_by_roleid: createdbtroleid,
        phi_emp_shift_id: shiftId,
        phi_district_id: districtId,
        phi_reporting_to_dm: reportingToDm,
        phi_communicate_to_hospital: communicateToHospital,
        phi_status_id: 1,
        //strData1
        phi_created_dtm: 'now()',
        phi_emso_name: emsoName,
        phi_pilot_name: pilotName,
        phi_other_hosp_name: '',
        phi_other_hosp_contact_person: '',
        phi_other_hosp_contact_no: '',
        phi_other_hosp_address: '',
        phi_other_issue_type: 2

    };

    if (districtId === "0") {
        showNotificationError("Select District", "districtReg", "error");
        return;
    } else if (baselocationId === "0") {
        showNotificationError("Select Base Location", "baselocationReg", "error");
        return;
    } else if (ambulance[0] === "0") {
        showNotificationError("Select Ambulances", "ambulanceReg", "error");
        return;
    } else if (shiftId === "0") {
        showNotificationError("Select Shift Type", "shiftTypeId_for_reg", "error");
        return;
    }
   /* else if (pilot_Id === "0" || pilot_Id === "") {
        showNotificationError("Enter Pilot Id", "pilotIdReg", "error");
        return;
    }
    else if (pilotName === "0" || pilotName === "") {
        showNotificationError("Enter Pilot Name", "pilotNameReg", "error");
        return;
    }

    else if (emsoId === "0" || emsoId === "" || emsoId === null) {
        showNotificationError("Enter Emso Id", "emtIdreg", "error");
        return;
    }
    else if (emsoName === "0" || emsoName === "" || emsoName === null) {
        showNotificationError("Enter Emso Name", "emtNameReg", "error");
        return;
    }*/
    else if (supervisorId === "0" || supervisorId === "" || supervisorId === null) {
        showNotificationError("Enter Supervisor ", "supervisorNameReg", "error");
        return;
    }

    else if (issueType === "0" || issueType === "" || issueType === null) {
        showNotificationError("Select Issue Type", "issueTypeReg", "error");
        return;
    }
    else if (patientRelativeName === "0" || patientRelativeName === "" || patientRelativeName === null) {
        showNotificationError("Enter Patient Relative Name", "relativeNameReg", "error");
        return;
    }
    else if (correvtiveActionDate === "0" || correvtiveActionDate === "" || correvtiveActionDate === null) {
        showNotificationError("Enter Patient Relative Name", "correctiveActionDateReg", "error");
        return;
    }

    else if (reportingToDm === "0" || reportingToDm === "" || reportingToDm === null) {
        showNotificationError("Select Report To Dm", "reportToDmReg", "error");
        return;
    }
    else if (communicateToHospital === "0" || communicateToHospital === "" || communicateToHospital === null) {
        showNotificationError("Select Communicate To Hospital", "communicateWithHospitalReg", "error");
        return;
    }
    else if (remarks === "0" || remarks === "" || remarks === null) {
        showNotificationError("Enter Remarks", "remarksId_reg", "error");
        return;
    }

    // var strUrl = 'http://192.168.1.191:2000/ambulanceOffRoadController/updateAmbulanceOffRoadDetails'
    var strUrl = Service.insertPatientHandoverIssue;
    //  alert("strUrl" + strUrl);
    $.ajax({
        type: 'POST',
        url: strUrl,
        data: JSON.stringify(objJson),
        dataType: 'text',
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function(data) {
            showNotificationError("Inserted Successfully", "save_patientHandOverid", "success");
            window.setTimeout(function() {
                location.reload();
            }, 3000);

            // alert("Successfully Inserted");
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}



//for search searchPatientHandoverIssue
function searchPatientHandoverIssue() {
    $('#patientHandoverIssueId').empty();
    //   alert("searchAmbulanceOffRoad");
    var correctiveDate = $('#correctiveActionDate').val();
    var fromDate = $("#fromDate").val();
    var todate = $("#todate").val();
    var intDistrictId = $("#district_id").val();
    var intBaseLocationId = $("#baselocation_id").val();
    var intAmulenceId = $("#ambulance_id").val();
    var ticketId = $("#ticketId").val();
    var onRoadDate = $("#onRoadToDate").val();

//    var isStatus = isCheckValidationOfFromDateAndToDate();
//    if (isStatus == false || isStatus == "false" || isStatus == 'false') {
//        return false
//    }
    if (correctiveDate == null | correctiveDate == '') {
        correctiveDate = 0;
    }

    if (onRoadDate == null | onRoadDate == '') {
        onRoadDate = 0;
    }
    if (ticketId == null | ticketId == '') {
        ticketId = 0;
    }
    if (fromDate == null | fromDate == '') {
        fromDate = 0;
    }
    if (todate == null | todate == '') {

        todate = 0;
    }
    if (intDistrictId == null | intDistrictId == '') {

        intDistrictId = 0;
    }
    if (intBaseLocationId == null | intBaseLocationId == '') {

        intBaseLocationId = 0;
    }
    if (intAmulenceId == null | intAmulenceId == '') {

        intAmulenceId = 0;
    }


    var objJson = {
        phi_district_id: intDistrictId,
        phi_baselocation_id: intBaseLocationId,
        phi_vehicle_id: intAmulenceId,
        loc_offdate: correctiveDate,
        loc_ondate: fromDate,
        loc_enddate: todate,
        phi_ticket_id: ticketId
    };
  
    var strUrl = Service.searchPatientHandoverIssue;
    console.log(":" + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
               // alert("No Districts Found");
             	var divTag = document.createElement("h2");
                $(divTag).css("text-align", "center");
                $(divTag).html("No Data Available....");
                $('#patientHandoverIssueId').append(divTag);
            } else {

                var jsonArray = data.patientHandOverIssueDTOs;
                console.log("daata : " + JSON.stringify(data));
                var strData = data;
                if (jsonArray.length > 0) {
                    patienthandOverIssueData(jsonArray);
                    loadDataTable()
                }
                else {
                }

            }
        }, error: function() {

            console.log('In Error of  Details ');
        }
    });
}


function patienthandOverIssueData(strData) {
    try {
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


        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Ambulance No");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);
//For table Heading4
        var objTHead6 = document.createElement("th");
        $(objTHead6).html("Issue Type");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        //For table Heading5
       /* var objTHead7 = document.createElement("th");
        $(objTHead7).html("Hospital Name");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);*/

        //For table Heading5
        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Action Date");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);



        //For table Heading5
        var objTHead11 = document.createElement("th");
        $(objTHead11).html("Status");
        $(objTHead11).addClass("text-center");
        $(objTr).append(objTHead11);

        var objTHead12 = document.createElement("th");
        $(objTHead12).html("Update");
        $(objTHead12).addClass("text-center");
        $(objTr).append(objTHead12);


        //For table Heading5
//        var objTHead11 = document.createElement("th");
//        $(objTHead11).html("Payment Card No");
//        $(objTHead11).addClass("text-center");
//        $(objTr).append(objTHead11);


        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);


        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");


            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            $(tablcol2).html(strData[i].phi_ticket_id);
            console.log('SeriaId' + strData[i].phi_ticket_id);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            //   var dist=strData[i].phi_district_id;
            // var ds_Id = getDistrictFromID(dist);
            // var ds_Lname = $('#ds_Id').val();
            $(tablcol3).html(strData[i].districtName);
            // console.log(' Dist' + strData[i].aor_districtid);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).html(strData[i].basLocName);
            $(tbleRow).append(tablcol4);


            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].phi_reg_number);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].pit_issue_type);
            $(tbleRow).append(tablcol6);

    /*        var tablcol7 = document.createElement("td");
            $(tablcol7).html(strData[i].phi_hospitalname);
            console.log("hospital Name===="+strData[i].phi_hospitalname);
            $(tbleRow).append(tablcol7);*/

            var tablcol8 = document.createElement("td");
            $(tablcol8).html(strData[i].phi_action_date);
            $(tbleRow).append(tablcol8);

            var reamarks = strData[i].mitRemarks;

            var tablcol11 = document.createElement("td");
            $(tablcol11).html(strData[i].phi_status_id);
            $(tbleRow).append(tablcol11);
            var serialId = strData[i].mitSerialId;

           if (strData[i].phi_status_id === "Open") {
            var tablcol12 = document.createElement("td");
            var buttonTag = document.createElement('button');
            var text = document.createTextNode("update");
            buttonTag.appendChild(text);
            $(buttonTag).addClass('btn btn-primary btn-sm');
            $(buttonTag).attr('onclick', 'getting_SingleRow("' + strData[i].phi_seriaid + '","' + strData[i].districtName + '","' + strData[i].basLocName + '","' + strData[i].phi_reg_number + '","' + strData[i].phi_emp_shift_id + '","' + strData[i].phi_pilot_id + '","' + strData[i].phi_emso_id + '","' + strData[i].phi_pilot_name + '","' + strData[i].phi_emso_name + '","' + strData[i].phi_supervior_id + '","' + strData[i].phi_hospitalname + '","' + strData[i].phi_issuetypeid + '","' + strData[i].phi_communicate_to_hospital + '","' + strData[i].phi_patient_relativename + '","' + strData[i].phi_issuetypeid + '","' + strData[i].shiftType + '")');//shiftType
            $(tablcol12).append(buttonTag);
            $(tbleRow).append(tablcol12);
            $(objTBody).append(tbleRow);
        }else{
           var tablcol12 = document.createElement("td");
            $(tablcol12).html(strData[i].phi_status_id);
            $(tbleRow).append(tablcol12);  
       }
        
    }
        $("#patientHandoverIssueId").append(objDivTag);
    } catch (err) {
        console.log("patientHandoverIssueId" + err);
    }
}


function getting_SingleRow(phi_seriaid, districtName, basLocName, phi_reg_number, phi_emp_shift_id, phi_pilot_id, phi_emso_id, phi_pilot_name, phi_emso_name, phi_supervior_id, phi_hospitalname, phi_issuetypeid, phi_communicate_to_hospital, phi_patient_relativename, issueTypeId,shiftType) {
    var issuename = $('#issueType_id').val();
    $('#serial_id').val(phi_seriaid);
    $('#districtId_update').val(districtName);
    $('#baselocationId_update').val(basLocName);
    $('#ambulanceIdFor_update').val(phi_reg_number);
    $('#shiftTypeId_update').val(shiftType);
    $('#pilotId_update').val(phi_pilot_id);
    $('#pilotName_update').val(phi_pilot_name);//emtName_update
    $('#emtName_update').val(phi_emso_name);
    $('#emtId_update').val(phi_emso_id);
    $('#supervisorName_update').val(phi_supervior_id);
    $('#hospitalName_update').val(phi_hospitalname);
    $('#hospitalPersonName_update').val(phi_communicate_to_hospital);
    $('#relativeName_update').val(phi_patient_relativename);
    $('#issueType_update').val(phi_issuetypeid);

    $('#Update').modal('show');

}



function updatePatientHandoverIssue() {
    var serialid = $('#serial_id').val();
    var remarks = $('#remarks_update').val();
    var phiReportToDm = $('#reportToDmUpdate').val();
    var communicatewithHospital = $('#communicateWithHospital_update').val();
    var objJson = {
        phi_seriaid: serialid,
        phi_remarks: remarks,
        phi_created_dtm: "now()",
        phi_reporting_to_dm: phiReportToDm,
        phi_communicate_to_hospital: communicatewithHospital,
        phi_status_id: 2
    };

    if (phiReportToDm === "0" || phiReportToDm === null || phiReportToDm === '') {
        showNotificationError("Select phiReportToDm", "reportToDmUpdate", "error");
        return;
    } else if (communicatewithHospital === "0" || communicatewithHospital === '' || communicatewithHospital === null) {
        showNotificationError("Select communicatewithHospital", "communicateWithHospital_update", "error");
        return;
    } else if (remarks === "0" || remarks === null || remarks === '') {
        showNotificationError("Enter remarks", "remarks_update", "error");
        return;
    }

    // var strUrl = 'http://192.168.1.191:2000/ambulanceOffRoadController/updateAmbulanceOffRoadDetails'
    var strUrl = Service.updatePatientHandOverissue;
    $.ajax({
        type: 'POST',
        url: strUrl,
        data: JSON.stringify(objJson),
        dataType: 'text',
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function(data) {
            showNotificationError("Updated Successfully", "patient_handover_update", "success");
          /*  window.setTimeout(function() {
                location.reload();
            }, 2000);*/

        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}


$('#pilotNameReg').keypress(function(e) {
    $('#check2').empty();
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else
    {
        e.preventDefault();
        //alert('Please Enter Alphabate');
        // $('#check1').html('Please Enter Alphabate');
        $("#check2").append("Please Enter Alphabate");
        return false;
    }
});

$('#emtNameReg').keypress(function(e) {
    $('#check2').empty();
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else
    {
        e.preventDefault();
        //alert('Please Enter Alphabate');
        // $('#check1').html('Please Enter Alphabate');
        $("#check2").append("Please Enter Alphabate");
        return false;
    }
});

$('#relativeNameReg').keypress(function(e) {
    $('#check2').empty();
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else
    {
        e.preventDefault();
        //alert('Please Enter Alphabate');
        // $('#check1').html('Please Enter Alphabate');
        $("#check2").append("Please Enter Alphabate");
        return false;
    }
});


$('#hospitalPersonNmaeReg').keypress(function(e) {
    $('#check2').empty();
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    else
    {
        e.preventDefault();
        //alert('Please Enter Alphabate');
        // $('#check1').html('Please Enter Alphabate');
        $("#check2").append("Please Enter Alphabate");
        return false;
    }
});


function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
	return false;
	return true;
}  



function resetsearch() {
    $("#district_id").val("0").trigger("chosen:updated");
    $("#baselocation_id").val("0").trigger("chosen:updated");
    $("#ambulance_id").val("0").trigger("chosen:updated");
    $("#ticketId").val("");
    $("#correctiveActionDate").val("");
    $("#fromDate").val("");
    $("#todate").val("");
    baseLocation(0);
    getAmbulance(0);
    
}


function ResetInsertPatientHandoverIssue() {
    $("#districtReg").val("0").trigger("chosen:updated");
    $("#baselocationReg").val("0").trigger("chosen:updated");
    $("#ambulanceReg").val("0").trigger("chosen:updated");
    $('#shiftTypeId_for_reg').val("0").trigger("chosen:updated");
    $("#shiftTypeId_for_reg").val("");
    $("#pilotIdReg").val("");
    $("#pilotNameReg").val("");
    $("#emtIdreg").val("");
    $("#emtNameReg").val("");
    $("#supervisorNameReg").val("");
    $("#hospitalNameReg").val("");
    $("#issueTypeReg").val("0");
    $("#hospitalPersonNmaeReg").val("");
    $("#relativeNameReg").val("");
    $("#reportToDmReg").val("0");
    $("#communicateWithHospitalReg").val("0");
   $("#remarksId_reg").val("");
   baseLocationForReg(0);
   getHospitalDetails(0);
   getAmbulanceForReg(0);



}

function resetUpdatePatientHandoverIssue() {
    $("#reportToDmUpdate").val("");
    $("#communicateWithHospital_update").val("");
    $("#remarks_update").val("");

}//

$(document).ready(function () {
    $('#availableDate').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
    	//sideBySide: true,
       // format: 'YYYY-MM-DD HH:mm:ss'
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#availableDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//fromDate

$(document).ready(function () {
    $('#strtDate').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
    	//sideBySide: true,
       // format: 'YYYY-MM-DD HH:mm:ss'
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
});//todate

$(document).ready(function () {
    $('#todate').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
    	//sideBySide: true,
       // format: 'YYYY-MM-DD HH:mm:ss'
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#todate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//correctiveActionDateReg

$(document).ready(function () {
    $('#correctiveActionDateReg').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
    	//sideBySide: true,
       // format: 'YYYY-MM-DD HH:mm:ss'
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#correctiveActionDateReg').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//











