/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var token_id;
$(document).ready(function () {
    try {
 	   token_id = localStorage.getItem("token");
	   var user_id=localStorage.getItem("userID");
	   var module_id=localStorage.getItem("sla_moduleID");
	   var role_id=localStorage.getItem("sla_roleID");

        getSectionName();

        getTargetDetailsList();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});
/*@DESC : getSectionName
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-14
 */
function getSectionName() {
    $('#sectionName_Id').empty();
    $('#upsectionNameId').empty();

    var strUrl = Service.getSectionName;
    console.log("getSectionName Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
        success: function (data) {

            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('getSectionName not loaded');
            } else {
                var jsonArray = data.slaMonthlyBillingResponseControllerDTO;
                var selectfirst = "<option value='0'>Select Section Name</option>";
                $('#sectionName_Id').append(selectfirst);
                $('#upsectionNameId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var status = "<option value=" + resData.billingid + ">" + resData.billingsection + "</option>";
                    $(status).appendTo('#sectionName_Id');
                    $(status).appendTo('#upsectionNameId');
                });
                $('#sectionName_Id').trigger("chosen:updated");
                $('#upsectionNameId').trigger("chosen:updated");

                $("#sectionName_Id").chosen();
                $("#upsectionNameId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getSectionName Data' + strUrl);
        }
    });
}
$('#sectionName_Id').on('change', function () {
    var sectionName = $('#sectionName_Id').val();
    $('#assessment_Id').empty();
    assesssmentName(sectionName, 'assessment_Id');
});
/*@DESC : assesssmentName
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-14
 */
function assesssmentName(sectionName, assessment_Id) {

    var id = '#' + assessment_Id;
    $(id).empty();
    try {
        var strUrl = Service.getAssessmentList;
        console.log("assesssmentName::::: " + strUrl);
        var obj_Insert = {
            "sectionId": sectionName
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
                  headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
            success: function (data) {
                var responseCode = data.responseCode;
                if (200 !== responseCode) {

                } else {
                    var jsonArray = data.assessmentListResponseControllerDTO;
                    var selectfirst = "<option value='0'>Select assessment</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var assesment = "<option value=" + resData.assesment_id + ">" + resData.assesment_name + "</option>";

                        $(assesment).appendTo(id);
                    });
                }
            },
            error: function (err) {
                console.error("Error in getMandalBasedonDistrictId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getMandalBasedonDistrictId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}

$('#assessment_Id').on('change', function () {
    var assessment = $('#assessment_Id').val();
    $('#measurmentName_id').empty();
    getMeasurement(assessment, 'measurmentName_id');
});


/*@DESC : getMeasurement
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-14
 */
function getMeasurement(assessment, measurmentName_id) {
    var id = '#' + measurmentName_id;
    $(id).empty();
    var section = $('#sectionName_Id').val();
    //var assessment=$('#assessment_Id').val();
    try {
        var strUrl = Service.getMeasureMentList;
        console.log("getMeasurement::::: " + strUrl);
        var obj_Insert = {
            "assesmentid": assessment,
            "billingid": section,
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
                  headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
            success: function (data) {

                var responseCode = data.responseCode;
                if (200 !== responseCode) {

                } else {
                    var jsonArray = data.measureMentListResponseControllerDTO;
                    var selectfirst = "<option value='0'>Select measurement</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var assesment = "<option value=" + resData.measureMentId + ">" + resData.measureMentName + "</option>";
                        $(assesment).appendTo(id);
                    });
                }
            },
            error: function (err) {
                console.error("Error in getMeasurement" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getMeasurement()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}



/*@DESC : up_getMeasurement
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-14
 */
function up_getMeasurement(assesmentid) {

    $('#upmeasurmentName_id').empty();
    var section1 = $('#upsectionNameId').val();
    //var assessment1=$('#upassessment_Id').val();
    try {
        var strUrl = Service.getMeasureMentList;
        console.log("getMeasurement::::: " + strUrl);
        var obj_Insert = {
            "assesmentid": assesmentid,
            "billingid": section1,
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
                  headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
            success: function (data) {

                var responseCode = data.responseCode;
                if (200 !== responseCode) {

                } else {
                    var jsonArray = data.measureMentListResponseControllerDTO;
                    var selectfirst = "<option value='0'>Select measurement</option>";
                    $('#upmeasurmentName_id').append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var assesment = "<option value=" + resData.measureMentId + ">" + resData.measureMentName + "</option>";
                        $(assesment).appendTo('#upmeasurmentName_id');
                    });
                }
            },
            error: function (err) {
                console.error("Error in getMeasurement" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getMeasurement()' + err);
    }
    $('#upmeasurmentName_id').trigger("chosen:updated");
    $('#upmeasurmentName_id').chosen();
}


/*@DESC : assesssmentName1
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-14
 */
function assesssmentName1(billing_id) {

    $("#upassessment_Id").empty();
    try {
        var strUrl = Service.getAssessmentList;
        console.log("assesssmentName::::: " + strUrl);
        var obj_Insert = {
            "sectionId": billing_id
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
                  headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
            success: function (data) {

                var responseCode = data.responseCode;
                if (200 !== responseCode) {

                } else {
                    var jsonArray = data.assessmentListResponseControllerDTO;
                    var selectfirst = "<option value='0'>Select assessement</option>";

                    $("#upassessment_Id").append(selectfirst);

                    $.each(jsonArray, function (i, resData) {
                        var District = "<option value=" + resData.assesment_id + ">" + resData.assesment_name + "</option>";

                        $(District).appendTo("#upassessment_Id");
                    });
                }
            },
            error: function (err) {
                console.error("Error in getAssessmentList" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getAssessmentList()' + err);
    }

    $("#upassessment_Id").trigger("chosen:updated");
    $("#upassessment_Id").chosen();


}

/*@DESC : saveTargetDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-14
 */
function saveTargetDetails() {
    var sectionId = $('#sectionName_Id').val();
    var assessmentId = $('#assessment_Id').val();
    var measurmentId = $('#measurmentName_id').val();
    var targetName = $('#targetNameId').val();
    var targetDesc = $('#targetDesc_id').val();
    var targetId = $('#target_id').val();
    var penalityMeasurement = $('#penalityMeasurement_id').val();
    var penalityValue = $('#penalityValue_id').val();
    var monthluBillingValue = $('#monthluBillingValue_id').val();
    var penalityPerIncidentValue = $('#penalityPerIncidentValueId').val();

    if (sectionId === "0" || sectionId === '0') {

        showNotificationError("select Section", "sectionName_Id", "error");
        return;
    }
    else if (assessmentId === "0" || assessmentId === '0') {

        showNotificationError("select Assessment", "assessment_Id", "error");
        return;
    }
    else if (measurmentId === "0" || measurmentId === '0') {

        showNotificationError("select measurment", "measurmentName_id", "error");
        return;
    }
    else if (targetName === "" || targetName === '') {

        showNotificationError("Enter Target Name", "targetNameId", "error");
        return;
    }
    else if (targetDesc === "" || targetDesc === '') {

        showNotificationError("Enter Target Desc ", "targetDesc_id", "error");
        return;
    }
    else if (targetId === "" || targetId === '') {

        showNotificationError("Enter Target Id", "target_id", "error");
        return;
    }
    else if (penalityMeasurement === "" || penalityMeasurement === '') {

        showNotificationError("Enter Penality measurement Type", "penalityMeasurement_id", "error");
        return;
    }
    else if (penalityValue === "" || penalityValue === '') {

        showNotificationError("Enter penality Value", "penalityValue_id", "error");
        return;
    }
    else if (monthluBillingValue === "" || monthluBillingValue === '') {

        showNotificationError("Enter Monthly Billing value", "monthluBillingValue_id", "error");
        return;
    }
    else if (penalityPerIncidentValue === "" || penalityPerIncidentValue === '') {

        showNotificationError("Enter Penality Per incident value", "penalityPerIncidentValueId", "error");
        return;
    }    
    var objJson =
            {"conditionId": "1",
                "targetId": targetId,
                "targetName": targetName,
                "target_desc": targetDesc,
                //"measurmentId": measurmentId,
                "measurmentId": measurmentId,
                "assesmentId": assessmentId,
                "billingId": sectionId,
                "penality_measurementtype": penalityMeasurement,
                "penality_value": penalityValue,
                "monthly_billingvalue": monthluBillingValue,
                "penality_perincident": penalityPerIncidentValue,
                "createdbyid": user_id,
                "createdbymodid": module_id,
                "createdbyroleid": role_id}

    var strUrl = Service.saveTargetDetails;
    console.log("saveTargetDetails details Url is:" + strUrl);
    console.log("Input is:::::::" + JSON.stringify(objJson));
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
        success: function (data) {
            var responseCode = data.responseCode;
            if (200 !== responseCode) {
                showNotificationError("not Inserted ", "saveTargetId", "error");
            } else {

                showNotificationError("Inserted Successfully", "saveTargetId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
                resetAllValue();
            }
        }, error: function () {

            console.log('In Error of  saveTargetDetails');
        }
    });
}
function resetAllValue() {
    $('#sectionName_Id').val(0);
    $('#assessment_Id').val(0);
    $('#measurmentName_id').val(0);
    $('#targetNameId').val('');
    $('#targetDesc_id').val('');
    $('#target_id').val('');
    $('#penalityMeasurement_id').val('');
    $('#penalityValue_id').val('');
    $('#monthluBillingValue_id').val('');
    $('#penalityPerIncidentValueId').val('');

}

/*@DESC : updateTargetDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-02-14
 */
function updateTargetDetails() {
    var sectionId = $('#upsectionNameId').val();
    var assessmentId = $('#upassessment_Id').val();
    var measurmentId = $('#upmeasurmentName_id').val();
    var targetName = $('#uptargetNameId').val();
    var targetDesc = $('#uptargetDesc_id').val();
    var targetId = $('#uptarget_id').val();
    var penalityMeasurement = $('#uppenalityMeasurement_id').val();
    var penalityValue = $('#uppenalityValue_id').val();
    var monthluBillingValue = $('#upmonthluBillingValue_id').val();
    var penalityPerIncidentValue = $('#uppenalityPerIncidentValueId').val();

    if (sectionId === "0" || sectionId === '0') {

        showNotificationError("select Section", "upsectionNameId", "error");
        return;
    }
    else if (assessmentId === "0" || assessmentId === '0') {

        showNotificationError("select Assessment", "upassessment_Id", "error");
        return;
    }
    else if (measurmentId === "0" || measurmentId === '0') {

        showNotificationError("select measurment", "upmeasurmentName_id", "error");
        return;
    }
    else if (targetName === "" || targetName === '') {

        showNotificationError("Enter Target Name", "uptargetNameId", "error");
        return;
    }
    else if (targetDesc === "" || targetDesc === '') {

        showNotificationError("Enter Target Desc ", "uptargetDesc_id", "error");
        return;
    }
    else if (targetId === "" || targetId === '') {

        showNotificationError("Enter Target Id", "uptarget_id", "error");
        return;
    }
    else if (penalityMeasurement === "" || penalityMeasurement === '') {

        showNotificationError("Enter Penality measurement Type", "uppenalityMeasurement_id", "error");
        return;
    }
    else if (penalityValue === "" || penalityValue === '') {

        showNotificationError("Enter penality Value", "uppenalityValue_id", "error");
        return;
    }
    else if (monthluBillingValue === "" || monthluBillingValue === '') {

        showNotificationError("Enter Monthly Billing value", "upmonthluBillingValue_id", "error");
        return;
    }
    else if (penalityPerIncidentValue === "" || penalityPerIncidentValue === '') {

        showNotificationError("Enter Penality Per incident value", "uppenalityPerIncidentValueId", "error");
        return;
    }
    var objJson =
            {"conditionId": "1",
                "targetId": targetId,
                "targetName": targetName,
                "target_desc": targetDesc,
                //"measurmentId": measurmentId,
                "measurmentId": measurmentId,
                "assesmentId": assessmentId,
                "billingId": sectionId,
                "penality_measurementtype": penalityMeasurement,
                "penality_value": penalityValue,
                "monthly_billingvalue": monthluBillingValue,
                "penality_perincident": penalityPerIncidentValue,
                "createdbyid": "1",
                "createdbymodid": "1",
                "createdbyroleid": "1"}

    var strUrl = Service.saveTargetDetails;
    console.log("saveTargetDetails details Url is:" + strUrl);
    console.log("Input is:::::::" + JSON.stringify(objJson));
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
        success: function (data) {
            var responseCode = data.responseCode;
            if (200 !== responseCode) {
                showNotificationError("not updated ", "updateTargetId", "error");
            } else {

                showNotificationError("Inserted updated", "updateTargetId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        }, error: function () {

            console.log('In Error of  updateTargetDetails');
        }
    });
}


//validation

function isValid(str) {
    return !/[~`!#$%\^&*()+=\-\[\]\\';,{}|\\":<>\?]/g.test(str);
}


$("#targetNameId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#targetDesc_id").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});

$("#target_id").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#penalityMeasurement_id").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#penalityValue_id").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#monthluBillingValue_id").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#penalityPerIncidentValueId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});

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
        position: 'left',
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

/*
 * For get_vehicleList.
 * priyadarshini
 * 30-11-2019
 * inputs :no
 */
function getTargetDetailsList() {
    $('#targetTableId').empty();
    try {
        var strUrl = Service.getTargetListDetails;
        console.log("getTargetDetailsList Url is:" + strUrl);
        $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
            async: false,
            crossDomain: false,
                  headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
            success: function (data) {
                var responseCode = data.responseCode;

                $('#targetTableId').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
//                    var divTag = document.createElement("h2");
//                      $(divTag).css("text-align", "center");
//                    $(divTag).html("No data available....");
//                    $('#targetTableId').append(divTag);
                     target_NO_Data_DOM();
                 
                } else {
              

                    var jsonArray = data.targetListDetailsResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        target_DOM(jsonArray);
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

/*
 *@DESC : if data not available in dom this method will load
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function target_NO_Data_DOM() {

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

        var objTHead1 = document.createElement("th");

        $(objTHead1).html('<label class="check "><span style=" color: white;margin-left: -31px;">Select</span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
        $(objTr).append(objTHead1);
//For table Heading1

//For table Heading2
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Target Id');
        $(objTr).append(objTHead3);


//For table Heading3
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('TargetName ');
        $(objTr).append(objTHead4);




//For table Heading4
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('measurmentName');
        $(objTr).append(objTHead5);
 
//        

        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Assesment Name');
        $(objTr).append(objTHead6);
 
        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Section Name');
        $(objTr).append(objTHead7);

        var objTHead8 = document.createElement('th');
        $(objTHead8).html('penality_measurementtype');
        $(objTr).append(objTHead8);



        var objTHead9 = document.createElement('th');
        $(objTHead9).html('penality_value');
        $(objTr).append(objTHead9);


        var objTHead10 = document.createElement('th');
        $(objTHead10).html('monthly_billingvalue');
        $(objTr).append(objTHead10);


        var objTHead11 = document.createElement('th');
        $(objTHead11).html('penality_perincident');
        $(objTr).append(objTHead11);
        //For table Heading5
        var objTHead12 = document.createElement('th');
        $(objTHead12).html('Update');
        $(objTr).append(objTHead12);


        var objTHead13 = document.createElement('th');
        $(objTHead13).html('Delete');
        $(objTr).append(objTHead13);

 
        $(objDivTag).addClass('objDivTag1');
       $(objDivTag).append("NO DATA AVAILABLE");

        $("#targetTableId").append(objDivTag);

    } catch (err) {
        console.log("targetTableId" + err);
    }
}
function target_DOM(strData) {

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

        var objTHead1 = document.createElement("th");

        $(objTHead1).html('<label class="check "><span style=" color: white;margin-left: -31px;">Select</span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
        $(objTr).append(objTHead1);
//For table Heading1

//For table Heading2
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Target Id');
        $(objTr).append(objTHead3);


//For table Heading3
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('TargetName ');
        $(objTr).append(objTHead4);




//For table Heading4
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('measurmentName');
        $(objTr).append(objTHead5);
 
//        

        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Assesment Name');
        $(objTr).append(objTHead6);
 
        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Section Name');
        $(objTr).append(objTHead7);

        var objTHead8 = document.createElement('th');
        $(objTHead8).html('penality_measurementtype');
        $(objTr).append(objTHead8);



        var objTHead9 = document.createElement('th');
        $(objTHead9).html('penality_value');
        $(objTr).append(objTHead9);


        var objTHead10 = document.createElement('th');
        $(objTHead10).html('monthly_billingvalue');
        $(objTr).append(objTHead10);


        var objTHead11 = document.createElement('th');
        $(objTHead11).html('penality_perincident');
        $(objTr).append(objTHead11);
        //For table Heading5
        var objTHead12 = document.createElement('th');
        $(objTHead12).html('Update');
        $(objTr).append(objTHead12);


        var objTHead13 = document.createElement('th');
        $(objTHead13).html('Delete');
        $(objTr).append(objTHead13);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);
        // Table Data Appending Here
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");
            var tablcol1 = document.createElement("td");

            $(tablcol1).addClass('text-center');
            $(tablcol1).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].targetid + ' name="case"  )" ><span class="checkmark"> </label>');
            $(tbleRow).append(tablcol1);
            $(tablcol1).attr('onclick', 'onclickCheckbox()');
            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].targetid);
            $(tbleRow).append(tablcol2);


            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].target_name);
            $(tbleRow).append(tablcol3);

//            var tablcol4 = document.createElement("td");
//            $(tablcol4).addClass('text-center');
//            $(tablcol4).html(strData[i].target_desc);
//            $(tbleRow).append(tablcol4);

//            var tablcol5 = document.createElement("td");
//            $(tablcol5).addClass('text-center');
//            $(tablcol5).html(strData[i].measurmentid);
//            $(tbleRow).append(tablcol5);


            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].measurmentName);
            $(tbleRow).append(tablcol4);

//            var tablcol7 = document.createElement("td");
//            $(tablcol7).addClass('text-center');
//            $(tablcol7).html(strData[i].assesmentid);
//            $(tbleRow).append(tablcol7);


            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).html(strData[i].assesmentName);
            $(tbleRow).append(tablcol5);

//            var tablcol9 = document.createElement("td");
//            $(tablcol9).addClass('text-center');
//            $(tablcol9).html(strData[i].billing_id);
//            $(tbleRow).append(tablcol9);

            var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');
            $(tablcol6).html(strData[i].billing_sectionName);
            $(tbleRow).append(tablcol6);


            var tablcol7 = document.createElement("td");
            $(tablcol7).addClass('text-center');
            $(tablcol7).html(strData[i].penality_measurementtype);
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            $(tablcol8).addClass('text-center');
            $(tablcol8).html(strData[i].penality_value);
            $(tbleRow).append(tablcol8);


            var tablcol9 = document.createElement("td");
            $(tablcol9).addClass('text-center');
            $(tablcol9).html(strData[i].monthly_billingvalue);
            $(tbleRow).append(tablcol9);

            var tablcol10 = document.createElement("td");
            $(tablcol10).addClass('text-center');
            $(tablcol10).html(strData[i].penality_perincident);
            $(tbleRow).append(tablcol10);


            var tablcol11 = document.createElement("td");
            $(tablcol11).addClass('text-center');

            $(tablcol11).append('<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#update"></i><i></a> ');

            $(tablcol11).attr('onclick', 'get_RowData("' + strData[i].targetid + '","' + strData[i].target_name + '","' + strData[i].target_desc + '","' + strData[i].measurmentid + '","' + strData[i].measurmentName + '","' + strData[i].assesmentid + '","' + strData[i].assesmentName + '","' + strData[i].billing_id + '","' + strData[i].billing_sectionName + '","' + strData[i].penality_measurementtype + '","' + strData[i].penality_value + '","' + strData[i].monthly_billingvalue + '","' + strData[i].penality_perincident + '")');
            var tablcol12 = document.createElement("td");
            $(tablcol12).addClass('text-center');

            $(tablcol12).append('<a href="#"><i class="fa fa-trash"></i><i></a> ');
            $(tablcol12).attr('onclick', 'deleteSingleTarget()');

            $(tablcol12).css('height', '5px');

            $(tbleRow).append(tablcol11);
            $(tbleRow).append(tablcol12);
            $(objTBody).append(tbleRow);

        }

        $("#targetTableId").append(objDivTag);


    } catch (err) {
        console.log("targetTableId" + err);
    }
}

function get_RowData(targetid, target_name, target_desc, measurmentid, measurmentName, assesmentid, assesmentName, billing_id, billing_sectionName, penality_measurementtype, penality_value, monthly_billingvalue, penality_perincident) {

    $("#upsectionNameId option:contains(" + billing_sectionName + ")").attr('selected', 'selected').trigger("chosen:updated");
    assesssmentName1(billing_id);
    $("#upassessment_Id option:contains(" + assesmentName + ")").attr('selected', 'selected').trigger("chosen:updated");
    up_getMeasurement(assesmentid);
    $("#upmeasurmentName_id option:contains(" + measurmentName + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#uptargetNameId").val(target_name);
    $("#uptargetDesc_id").val(target_desc);
    $("#uptarget_id").val(targetid);
    $("#uppenalityMeasurement_id").val(penality_measurementtype);
    $("#uppenalityValue_id").val(penality_value);
    $("#upmonthluBillingValue_id").val(monthly_billingvalue);
    $("#uppenalityPerIncidentValueId").val(penality_perincident);

}
/*
 * For delete SingleVehicle.
 * priyadarshini
 * 30-11-2019
 */
function deleteSingleTarget() {

    var selectedCheckboxvalue = $('#reg_no').val();

    if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
        showNotificationError("select Target", "selectall", "error");
        return;
    }
    else if (selectedCheckboxvalue !== '' || selectedCheckboxvalue !== null) {
        $('#myModal6').modal('show');
    }
}
//multiplle checkbox reading
function multipleCheckBox() {
    $("#mulutipleDeleteId").hide();
    $('#reg_no').val('');
    $("#selectall").change(function (event) {
        $('.case').attr('checked', this.checked);
        $('#Searchdeleteid').attr("disabled", false);
        //$("#Searchdeleteid").prop('disabled', false);
        if ($(this).is(":checked")) {
            $('#reg_no').val('');
            $('.case').prop("checked", true);
            event.preventDefault();
            var searchIDs = $(".case:checkbox:checked").map(function () {
                console.log("selected VEHICLE====" + searchIDs)
                return $(this).val();
            }).get();
            $("#mulutipleDeleteId").show();
            $('#reg_no').val(searchIDs);
        }

    });

}

function deleteTargetDetails() {
    var selectedCheckboxvalue = $('#reg_no').val();
    console.log("delete vehiclList====" + selectedCheckboxvalue)
    var objJson = {
        "targetId": selectedCheckboxvalue,
    };
    var strUrl = Service.deleteTargetDetailsData;
    console.log("deleteTargetDetails Url is:" + strUrl);
    console.log("Input is:::::::" + JSON.stringify(objJson));
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token_id,
            },
        success: function (data) {

            var responseCode = data.responseCode;

            if (200 !== responseCode) {
                showNotificationError(" not delete ", "deleteid", "error");

            } else {
                showNotificationError("delete Successfully", "deleteid", "success");

                window.location.reload();
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }

        }, error: function () {

            console.log('In Error of  deleteSectionDetails ');
        }
    })
}
//single checkbox reading
function onclickCheckbox() {
    var arrSelectedData = [];
    var count = 0;
    $("input:checkbox[name=case]:checked").each(function () {
        console.log("myCheck12: " + $(this).attr("myCheck12") + " Value: " + $(this).val());
        console.log("myCheck12:---" + $(this).val());
        arrSelectedData.push($(this).val());
        count++;
        $('#reg_no').val(arrSelectedData);
        $("#mulutipleDeleteId").hide();
        if (count >= 2) {
            $("#mulutipleDeleteId").show();
        }
    });
    if ($(".case").length === $(".case:checked").length) {
        $("#selectall").prop("checked", true);
        $("#mulutipleDeleteId").show();
    }
    else {
        $("#selectall").removeAttr("checked");
    }
    console.log("arrSelectedData: " + JSON.stringify(arrSelectedData));
}
function loadDataTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 5,
        responsive: true,
        "scrollY": "400px",
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







