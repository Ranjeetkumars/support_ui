/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * @author Bhuneshwar Patel
 */

$(document).ready(function() {
    try {
        getListOfDistrict();

    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }

//    $("input[type='radio']").click(function() {
//        var radioValue = $("input[name='optradio']:checked").val();
//        if (radioValue === "Yes" || radioValue === 'Yes') {
//            alert("Your are a - " + radioValue);
//            $('#grievancedataId').hide();          
//        }else{
//            alert("Your are a - " + radioValue);
//            $('#grievanceDetail').show();
//        }
//    });



});

$('input[type=radio]').change(function() {
    var radioValue = $("input[name='optradio']:checked").val();
    console.log("radioValue*******" + radioValue);
    if (radioValue === "Yes" || radioValue === 'Yes') {
        alert("Your are a1 - " + radioValue);
        $('#grievancedataId').show();
        $('#grievancetitleId').show();
    } else {
        alert("Your are a - " + radioValue);
        $('#grievancedataId').hide();
        $('#grievancetitleId').hide();
    }
});


$('#registration').on('shown.bs.modal', function(e) {
    getCallerProfile();
    getGrievancesType();
    getGrievancesIssueType()
    getStandardRemarks();
    getListOfDistrictReg();

});//getDesignation()

$('#Update').on('shown.bs.modal', function(e) {
    getDesignation();
});
/**
 * 
 * @returns district
 */
function getListOfDistrict() {
    if (district.length < 1 || district == []) {
        // here calling masterdata ajax call
        loadingDistrictsMaster();
        var selectfirst = "<option value='0'>Select District</option>";
        $('#district_id').append(selectfirst);
        $.each(district, function(i, resData) {
            var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
            $(districts).appendTo('#district_id');
        });
        $("#district_id").chosen();
    } else {
        $.each(district, function(i, resData) {
            var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";


        });
    }
}
;

/**
 * 
 * @returns district
 */
function getListOfDistrictReg() {
    loadingDistrictsMaster();
    var selectfirst = "<option value='0'>Select District</option>";
    $('#DistrictIdReg').append(selectfirst);
    $.each(district, function(i, resData) {  	
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#DistrictIdReg');
    });
    $("#DistrictIdReg").chosen();
}
;

//on change for registation patient handover issue
$('#DistrictIdReg').on('change', function() {
    var listOfDistrict = $('#DistrictIdReg').val();
    $('#BaseLocationIdReg').empty();
    baseLocationForReg(listOfDistrict);
});

/*
 *  @Functionality:Baselocation Dropdown Loading
 *  For Registaion  Grievances
 */
function baseLocationForReg(listOfDistrict) {
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select Baselocation</option>";
    $('#BaseLocationIdReg').append(selectfirst);
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#BaseLocationIdReg');
        //   $(baselocation).appendTo('#listOfBaseLocationForRegistration');

    });
    $('#BaseLocationIdReg').trigger("chosen:updated");
    $("#BaseLocationIdReg").chosen();

}
;

//on change for registation patient handover issue
$('#BaseLocationIdReg').on('change', function() {
    var baseLocationVal = $('#BaseLocationIdReg').val();
    $('#AmbulanceIdReg').empty();
    getAmbulanceForReg(baseLocationVal);
});

/*
 * @Functionality:Ambulance loading based on baselocation
 * For Registation Patient handover issue
 */
function getAmbulanceForReg(baseLocationVal) {
    loadingAmbulanceMaster(baseLocationVal);
    var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#AmbulanceIdReg').append(selectfirst);
    $.each(ambulances, function(i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + "," + resData.vehicleName + " >" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#AmbulanceIdReg');
        //$(ambulances).appendTo('#listOfAmbulanceForRegistration');
    });
    $('#AmbulanceIdReg').trigger("chosen:updated");
    $("#AmbulanceIdReg").chosen();

}
;

/**
 * 
 * @returns 
 * http://192.168.1.215:2000/GrievanceController/getProfile
 */
function getCallerProfile() {
    try {
        var strUrl = Service.getCallerProfile;
        console.log("getCallerProfile url:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.grievanceControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        var shiftTypeData = "<option value=" + resData.serialId + ">" + resData.profileType + "</option>";
                        $(shiftTypeData).appendTo('#CallerProfile');
                    });
                    $("#CallerProfile").chosen();
                }
            },
            error: function(err) {
                console.error("Error in CallerProfile" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in CallerProfile' + err);
    }
}

/**
 * http://192.168.1.191:8086/GrievanceController/getgrievanceType
 * getGrievancesType
 */
function getGrievancesType() {
    try {
        var strUrl = Service.getGrievancesType;
        console.log("getGrievancesType url:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.grievanceControllerDTO;
                    var selectfirst = "<option value='0'>Select Grievances Type</option>";
                    $('#GrievanceType').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var shiftTypeData = "<option value=" + resData.serialId + ">" + resData.grievanceType + "</option>";
                        $(shiftTypeData).appendTo('#GrievanceType');
                    });
                    $("#GrievanceType").chosen();
                }
            },
            error: function(err) {
                console.error("Error in GrievanceTypes" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in GrievanceType' + err);
    }
}

/**
 * getStandardRemarks
 * @returns {undefined}
 * http://' + SYSTEM_IP1 + '/GrievanceController/getgrievanceRemarks
 */
function getStandardRemarks() {
    try {
        var strUrl = Service.getStandardRemarks;
        console.log("StandardRemarksIdReg url:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.grievanceControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        var shiftTypeData = "<option value=" + resData.serialId + ">" + resData.remarksId + "</option>";
                        $(shiftTypeData).appendTo('#StandardRemarksIdReg');
                    });
                    $("#StandardRemarksIdReg").chosen();
                }
            },
            error: function(err) {
                console.error("Error in StandardRemarksIdReg" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in StandardRemarksIdReg' + err);
    }
}


/**
 * getGrievancesIssueType
 * @returns {undefined}
 * http://' + SYSTEM_IP1 + '/GrievanceController/getgrievanceIssueType
 */
function getGrievancesIssueType() {
    try {
        var strUrl = Service.getGrievancesIssueType;
        console.log("StandardRemarksIdReg url:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.grievanceControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        var shiftTypeData = "<option value=" + resData.serialId + ">" + resData.issueType + "</option>";
                        $(shiftTypeData).appendTo('#TypeOfIssueIdReg');
                    });
                    $("#TypeOfIssueIdReg").chosen();
                }
            },
            error: function(err) {
                console.error("Error in TypeOfIssueIdReg" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in TypeOfIssueIdReg' + err);
    }
}


function getDesignation() {
    try {
        var strUrl = Service.getDesignation;
        console.log("getGrievancesType url:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                    var jsonArray = data.grievanceControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        var shiftTypeData = "<option value=" + resData.designationId + ">" + resData.designationName + "</option>";
                        $(shiftTypeData).appendTo('#designation_Update');
                    });
                    $("#designation_Update").chosen();
            },
            error: function(err) {
                console.error("Error in GrievanceTypes" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in GrievanceType' + err);
    }
}

function insertGrievancesDetails() {

    var caller_no = $('#CallerNo').val();
    var caller_name = $('#CallerName').val();
    var caller_profile = $('#CallerProfile').val();
    var grivanceType = $('#GrievanceType').val();
    var districtidReg = $('#DistrictIdReg').val();
    var baselocReg = $('#BaseLocationIdReg').val();
    var ambulanceIdReg = $('#AmbulanceIdReg').val();
    
   // console.log("vehicle_No"+vehicle_No[1]);
    var TypeOfissueReg = $('#TypeOfIssueIdReg').val();
    var StandardRemarksIdReg = $('#StandardRemarksIdReg').val();
    var AdditionalRemarksReg = $('#AdditionalRemarksReg').val();
    var issueTypeReg = $('#issueDescribedReg').val();
    var vehicle_No = ambulanceIdReg.split(",");
    console.log("issueTypeReg====="+issueTypeReg);
    var objJson = {
        callerNo: caller_no,
        callerName: caller_name,
        profile_id: caller_profile,
        grievance_type_id: grivanceType,
        districtId: districtidReg,
        basLocId: baselocReg,
        vehicleId: vehicle_No[0],
        vehicleNo: vehicle_No[1],
        register_dtm: "now()",
        issue_type_id: TypeOfissueReg,
        remarksId: StandardRemarksIdReg,
        remark: AdditionalRemarksReg,
        issue_desc: issueTypeReg


    };

    if (caller_no === "") {
        showNotificationError("Enter Caller Number", "CallerNo", "error");
        return;
    } else if (caller_name === "") {
        showNotificationError("Enter Caller Name", "CallerName", "error");
        return;
    } else if (caller_profile === "0") {
        showNotificationError("Select caller_profile", "CallerProfile", "error");
        return;
    } else if (grivanceType == "0"||grivanceType==null) {
        showNotificationError("Select grivanceType", "GrievanceType", "error");
        return;
    }
    else if (districtidReg === "0") {
        showNotificationError("Select District", "DistrictIdReg", "error");
        return;
    }
    else if (baselocReg === "0" || baselocReg === "") {
        showNotificationError("Select Baselocation", "BaseLocationIdReg", "error");
        return;
    }

//    else if (vehicle_No[0] === "0" || vehicle_No[0] === "" || vehicle_No[0] === null) {
//        showNotificationError("Select Select Vehilce No", "AmbulanceIdReg", "error");
//        return;
//    }
    else if (TypeOfissueReg === "0" || TypeOfissueReg === "" || TypeOfissueReg === null) {
        showNotificationError("Select Issue Type", "TypeOfIssueIdReg", "error");
        return;
    }
//    else if (parseInt(expectedRoadTime1) < parseInt(ambulanceOffRoadtime1)) {
//        //alert ("Todate should be greater than from FromDate");
//        showNotificationError("expected end date should be greater than startdate", "exceptedOnroadDtm", "error");
//        return ;
//    }
    else if (StandardRemarksIdReg === "0" || StandardRemarksIdReg === "") {
        showNotificationError("Select Stanadard Remarks", "StandardRemarksIdReg", "error");
        return;
    }
    else if (AdditionalRemarksReg === "0" || AdditionalRemarksReg === "") {
        showNotificationError("Enter Additional Remarks", "AdditionalRemarksReg", "error");
        return;
    }
    var strUrl = Service.insertGrievancesDetails;
    console.log("strUrl===="+strUrl);
    $.ajax({
        type: 'POST',
        url: strUrl,
        data: JSON.stringify(objJson),
        dataType: 'text',
        contentType: "application/json",
        crossDomain: true,
        async: false,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
          //  alert("Succcess");
            showNotificationError("Inserted Successfully", "insertGrievancesDetailsid", "success");
//            window.setTimeout(function() {
//                location.reload();
//            }, 2000);
//            resetAmbulanceReg();
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}


function searchGrievances() {
    $('#grievance_id').empty();
    var intDistrictId = $("#district_id").val();
    var objJson = {
        districtId: intDistrictId,
    };
    //var strUrl = 'http://192.168.1.191:8086/ambulanceOffRoadController/searchAmbulanceOffRoadDetails';
    var strUrl = Service.searchGrievances;
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
                alert("No Districts Found");
            } else {

                var jsonArray = data.grievanceControllerDTO;
                console.log("daata : " + JSON.stringify(data));
                var strData = data;
                if (jsonArray.length > 0) {
                    grievancesData(jsonArray);
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


function grievancesData(strData) {
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
        $(objTHead1).html("SNO");
        $(objTHead1).addClass("text-center");
        $(objTr).append(objTHead1);

        var objTHead2 = document.createElement("th");
        $(objTHead2).html("TicketId");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);
//For table Heading2
        var objTHead3 = document.createElement("th");
        $(objTHead3).html("Grievance Type");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);


//For table Heading3
        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Issue Type");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);


        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Grievance Date");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);
//For table Heading4
        var objTHead6 = document.createElement("th");
        $(objTHead6).html("Status");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Actual Duration");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);



        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Update");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);


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
            $(tablcol2).html(strData[i].ticket_id);
            console.log('SeriaId' + strData[i].ticket_id);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");

            $(tablcol3).html(strData[i].grievanceType);
            console.log(' Dist' + strData[i].grievanceType);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).html(strData[i].issueType);
            $(tbleRow).append(tablcol4);


            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].register_dtm);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].statusType);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).html(strData[i].actualDate);
            $(tbleRow).append(tablcol7);


            if(strData[i].statusType=="Open"){
            var tablcol8 = document.createElement("td");
            var buttonTag = document.createElement('button');
            var text = document.createTextNode("update");
            buttonTag.appendChild(text);
            $(buttonTag).addClass('btn btn-primary btn-sm');
            //$(buttonTag).attr('onclick', 'getSingleRowMaintainceDetails("' + ds_Lname+ '","' + strData[i].mitRegNumber + '","'+reamarks+'")');
            $(buttonTag).attr('onclick', 'getting_Row("'+strData[i].callerName+'","'+strData[i].callerNo+'","'+strData[i].profile_id+'","'+strData[i].grievanceType+'","'+strData[i].register_dtm+'","'+strData[i].issueType+'","'+strData[i].remark+'","'+strData[i].issue_desc+'","'+strData[i].ticket_id+'")');//strData[i].
            $(tablcol8).append(buttonTag);
            $(tbleRow).append(tablcol8);
            $(objTBody).append(tbleRow);
            }else{
            	   var tablcol8 = document.createElement("td");
                   $(tablcol8).html(strData[i].statusType);
                   $(tbleRow).append(tablcol8);  
            }

        }
        $("#grievance_id").append(objDivTag);
    } catch (err) {
        console.log("grievance_id" + err);
    }
}

function getting_Row(caller_name,caller_no,profile_Id,grievance_type,register_dtm,issue_type,remarks,issue_description,ticketid){
    
    $('#ticketId').val(ticketid);
    $('#CallerNoUpdate').val(caller_name);
    $('#CallerNameUpdate').val(caller_no);
    $('#CallerProfileUpdate').val(profile_Id);
    $('#grievanceTypeUpdate').val(grievance_type);
    $('#grievanceUpdate').val(register_dtm);
    $('#baselocationUpdate').val();
    $('#typeOfIssueUpdate').val(issue_type);
    $('#ambulanceUpdate').val();    //   
   // $('#ambulanceNoUpdtae').val(issue_description); 
    $('#IssueDescribedUpdate').val(issue_description);
    $('#Update').modal('show');
}

function updateGrievanceDetails() {
    var ticket_Id = $('#ticketId').val();
    var solved_by_name = $('#solvedByUpdate');//designationUpdate
    var designation = $('#designationUpdate');//
    var reply = $('#replyUpdate');
    var objJson = {
        "ticket_id": ticket_Id,
        "solvedByName": solved_by_name,
        "designationId": designation,
        "remark": reply
    };
    var strUrl = Service.updateGrievanceDetails;
    $.ajax({
        type: 'POST',
        url: strUrl,
        data: JSON.stringify(objJson),
        dataType: 'text',
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function(data) {
         //   alert("Succcess");
            showNotificationError("Updated Successfully", "updateGrievancesDetailsId", "success");
//            window.setTimeout(function() {
//                location.reload();
//            }, 2000);
//            resetAmbulanceReg();
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}



/**
 * update:updateAmbulanceOffRoadDetails
 * @returns {undefined}
 */
function updateGrievanceDetail() {
    var ticket_Id = $('#ticketId').val();
    var solved_by_name = $('#solvedBy_Update').val();
    var designation = $('#designation_Update').val();
    var reply = $('#reply_Update').val();
    var objJson = {
        "ticket_id": ticket_Id,
        "solvedByName": solved_by_name,
        "designationId": designation,
        "remark": reply
    };


    var strUrl=Service.updateGrievanceDetails;
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
            showNotificationError("Updated Successfully", "updateGrievancesDetailsId", "success");
          // alert("Successfully Updated");
//            window.setTimeout(function() {
//                        location.reload();
//                    }, 3000);
//                   
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}

function getClosedGrievances() {
	$('#close_grievance_list').empty();
    try {
        var strUrl = Service.getClosedGrievances;
        console.log("getClosedGrievances url:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                    alert("No Districts Found");
                } else {
                    var jsonArray = data.grievanceControllerDTO;
                    var strData = data;
                    if (jsonArray.length > 0) {
                        getClosedGrievancesData(jsonArray);
                        loadDataTable()
                    }
                }
            },
            error: function(err) {
                console.error("Error in getClosedGrievances" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in StandardRemarksIdReg' + err);
    }
}
function getClosedGrievancesData(strData) {
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
        $(objTHead1).html("SNO");
        $(objTHead1).addClass("text-center");
        $(objTr).append(objTHead1);
        
        var objTHead2 = document.createElement("th");
        $(objTHead2).html("TicketId");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);
//For table Heading2
        var objTHead3 = document.createElement("th");
        $(objTHead3).html("IncidentId");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);

//For table Heading3
        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Caller Name");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);


        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Grievance Type");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);
//For table Heading4
        var objTHead6 = document.createElement("th");
        $(objTHead6).html("Grievance Registered Date");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Grievance Solved By");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Grievance Closed Date");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Time Duration");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);


        var objTHead10 = document.createElement("th");
        $(objTHead10).html("Update");
        $(objTHead10).addClass("text-center");
        $(objTr).append(objTHead10);


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
            $(tablcol2).html(strData[i].ticket_id);
            console.log('SeriaId' + strData[i].ticket_id);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");

            $(tablcol3).html(strData[i].grievanceType);
            console.log(' Dist' + strData[i].eventId);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).html(strData[i].callerName);
            $(tbleRow).append(tablcol4);


            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].grievanceType);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].register_dtm);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).html(strData[i].solvedByName);
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            $(tablcol8).html(strData[i].closeddtm);
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            $(tablcol9).html(strData[i].grRegisterToCloseddtm);
            $(tbleRow).append(tablcol9);


            var tablcol10 = document.createElement("td");


            var buttonTag = document.createElement('button');
            var text = document.createTextNode("update");
            buttonTag.appendChild(text);
            $(buttonTag).addClass('btn btn-primary btn-sm');

            $(buttonTag).attr('onclick', 'getting_Row("")');
            $(tablcol10).append(buttonTag);

            // $(tablcol12).html('<button type="button" class="btn btn-primary btn-sm" data-toggle="modal"  onClick="getSingleRowMaintainceDetails("'+strData[i].mitSerialId+'")"  data-target="#registration")" >Update</button>')

            $(tbleRow).append(tablcol10);
            // alert("strData[i].mitEndDateTime"+strData[i].mitEndDateTime);
            $(objTBody).append(tbleRow);

        }
        $("#close_grievance_list").append(objDivTag);
    } catch (err) {
        console.log("close_grievance_list" + err);
    }
}


function getgrievanceSearchDetails() {
    alert("getgrievanceSearchDetails");
    $('#getgrievance_id').empty();
    var caller_number = $("#caller_number").val();
    var incident_id = $("#incidentId").val();
    var from_date = $("#fromDate").val();
    var to_date = $("#toDate").val();//IssueDescribedReg
    var to_date = $("#IssueDescribedReg").val();//IssueDescribedReg
    var objJson = {
        "medicalId": 0,
        "policeId": 0,
        "fireId": 0,
        "landmarkId": 0,
        "localityId": 0,
        "city_townId": 0,
        "mandalid": 0,
        "districtId": 0,
        "stateId": 0,
        "countryId": 0,
        "callerName": "¥",
        "callerNo": caller_number,
        "calltypeId": 0,
        "eventstatusTypeId": 0,
        "eventId": incident_id,
        "today": "false",
        "starDate": from_date,
        "endDate": to_date,
        "ordering": "true",
        "limitCount": 0,
        "pageNo": 0,
        "agentId": 0

    };
    var strUrl = Service.getgrievanceSearchDetails;
    alert(strUrl);
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
                alert("No Districts Found");
              } else {

            var jsonArray = data.grievanceControllerDTO;
            console.log("daata : " + JSON.stringify(data));
            var strData = data;
            if (jsonArray.length > 0) {
                getgrievanceSearchDetailsData(jsonArray);
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


function getgrievanceSearchDetailsData(strData) {
    alert("getgrievanceSearchDetailsData");
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
        $(objTHead1).html("SNO");
        $(objTHead1).addClass("text-center");
        $(objTr).append(objTHead1);

        var objTHead2 = document.createElement("th");
        $(objTHead2).html("IncidentId");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);
//For table Heading2
        var objTHead3 = document.createElement("th");
        $(objTHead3).html("Caller Name");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);

        //alert("______preventiveMaintainceData_____1111111111");
//For table Heading3
        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Incident Date");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);


   
//For table Heading4
        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Tag Incident");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);

        //For table Heading5
        var objTHead6 = document.createElement("th");
        $(objTHead6).html("Single Record");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

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
           // alert(""+strData[i].eventId);
            var tablcol2 = document.createElement("td");
            $(tablcol2).html(strData[i].eventId);
            console.log('SeriaId' + strData[i].eventId);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");

            $(tablcol3).html(strData[i].callerName);
            console.log(' Dist' + strData[i].callerName);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).html(strData[i].endDate);
            $(tbleRow).append(tablcol4);



         
           var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].callerName);
            $(tbleRow).append(tablcol5);


            var tablcol6 = document.createElement("td");
//
//          var buttonTag1 = document.createElement('button');
//            var text = document.createTextNode("Tag Incident");
//            buttonTag.appendChild(text);
//            $(buttonTag).addClass('btn btn-primary btn-sm');

            var buttonTag = document.createElement('button');
            var text = document.createTextNode("Tag Incident");
            buttonTag.appendChild(text);
            $(buttonTag).addClass('btn btn-primary btn-sm');

            //$(buttonTag).attr('onclick', 'getSingleRowMaintainceDetails("' + ds_Lname+ '","' + strData[i].mitRegNumber + '","'+reamarks+'")');
            $(buttonTag).attr('onclick', 'getting_Row("'+strData[i].callerName+'","'+strData[i].callerNo+'","'+strData[i].profile_id+'","'+strData[i].grievanceType+'","'+strData[i].register_dtm+'","'+strData[i].issueType+'","'+strData[i].remark+'","'+strData[i].issue_desc+'","'+strData[i].ticket_id+'")');//strData[i].
            $(tablcol6).append(buttonTag);

            // $(tablcol12).html('<button type="button" class="btn btn-primary btn-sm" data-toggle="modal"  onClick="getSingleRowMaintainceDetails("'+strData[i].mitSerialId+'")"  data-target="#registration")" >Update</button>')

            $(tbleRow).append(tablcol6);
            // alert("strData[i].mitEndDateTime"+strData[i].mitEndDateTime);

            $(objTBody).append(tbleRow);

        }
        $("#getgrievance_id").append(objDivTag);
    } catch (err) {
        console.log("getgrievance_id" + err);
    }
}

//for validation 
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

function resetGrievancesRegistation() {
    $('#CallerNo').val('');
    $('#CallerName').val('');
    $('#CallerProfile_chosen').val('');
    $('#GrievanceType').val('');
    $('#DistrictIdReg').val('');
    $('#BaseLocationIdReg').val('');
    $('#AmbulanceIdReg').val('');
    $('#TypeOfIssueIdReg').val('');
    $('#StandardRemarksIdReg').val('');
    $('#AdditionalRemarksReg').val('');
    $('#IssueDescribedReg').val('');
    $('#CallerNo').val('');
    $('#CallerNo').val('');
}

function updateReset(){
    
    $('#solvedBy_Update').val('');
    $('#designation_Update').val('0');
    $('#reply_Update').val('');
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
