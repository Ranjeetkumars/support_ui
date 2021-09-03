/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    getVehicleId();
    getUserName();
    $('#vehicleDetailsCardId').hide();
    scheduleDataDetails();
    completedAuditDetails();

});
/*
 * For getting Vehicle list.
 * priyadarshini
 * 20-01-2020
 * inputs :no 
 */
function getVehicleId() {

    $('#vehicleregNo').empty();
    var strUrl = Service.getVehicle;
    console.log("getVehicleId Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;

            if (200 !== responsecode) {
                console.log('getVehicleId not loaded');
            } else {
                var jsonArray = data.objGetVehicleControllerDTO;
                var selectfirst = "<option value='0'>Select vehicle NO </option>";
                $('#vehicleregNo').append(selectfirst);
                $.each(jsonArray, function (i, resData) {

                    var auditId1 = "<option value=" + resData.vehicleId + ">" + resData.vehicleName + "</option>";
                    $(auditId1).appendTo('#vehicleregNo');
                });
                $('#vehicleregNo').trigger("chosen:updated");
                $('#vehicleregNo').chosen();
            }
        },
        error: function () {
            console.log('Error in loading getVehicleId Data' + strUrl);
        }
    });
}



/*
 * For getting UserName list.
 * priyadarshini
 * 20-01-2020
 * inputs :no 
 */
function getUserName() {

    $('#userNameId').empty();
    var strUrl = Service.getUserName;
    console.log("getAuditId Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responseCode = data.responseCode;

            if (200 !== responseCode) {
                console.log('getAuditId not loaded');
            } else {
                var jsonArray = data.objGetAuditIdControllerDTO;
                var selectfirst = "<option value='0'>Select User Name </option>";
                $('#userNameId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {

                    var userName = "<option value=" + resData.userId + ">" + resData.userName + "</option>";
                    $(userName).appendTo('#userNameId');
                });
                $('#userNameId').trigger("chosen:updated");
                $('#userNameId').chosen();
            }
        },
        error: function () {
            console.log('Error in loading getAuditId Data' + strUrl);
        }
    });
}

$('#vehicleregNo').on('change', function () {
    getVicleDetails();
});
/*
 * For getting VicleDetails list.
 * priyadarshini
 * 20-01-2020
 * inputs :no 
 */
var appendDistrictId
var appendBaseLocId

function  getVicleDetails() {
    $('#vehicleDetailsCardId').show();
    $("#districtId").empty();
    $("#baseLocId").empty();
    var vehicleregNo = $("#vehicleregNo").val();

    var json_GetAudit_Details = {
        "vehicleId": vehicleregNo

    };
    var strUrl = Service.getVicleDetailsDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_GetAudit_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function (data) {

            var responseCode = data.responseCode;
            if (responseCode !== 200 || data.status === "NO_DATA_FOUND") {

            } else {
                var jsonArray = data.objGetVehicleControllerDTO;
                $.each(jsonArray, function (i, resData) {
                    var districtName = resData.districtName;
                    var baselocationName = resData.baselocationName;

                    appendDistrictId = resData.districtId;
                    appendBaseLocId = resData.beseLocID;
                    $("#districtId").append(districtName);
                    $("#baseLocId").append(baselocationName);
                    $("#districid").append(baselocationName);
                    var vehicleregNo = $("#vehicleregNo option:selected").text();
                    $("#vehicleID").empty();
                    $("#vehicleID").append(vehicleregNo);


                });

            }
        },
        error: function () {
            console.log('Error in loading getAuditId Data' + strUrl);
        }
    });
}

/*@DESC : saveScheduleingDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-01-10
 */
function saveScheduleingDetails() {
    $('#vehicleDetailsCardId').hide();

    var userName = $('#userNameId').val();
    var userName1 = $("#userNameId option:selected").text();
    var vehicleregNo = $('#vehicleregNo').val();
    var selectVehicle = $("#vehicleregNo option:selected").text();
    var formDate = $("#formDateId").val();
    var d = new Date(formDate.split("-").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    formDate = yy + "-" + mm + "-" + dd;

    if (userName === "0") {
        showNotificationError("Select User Name", "userNameId", "error");
        return;
    }
    else if (formDate === "NaN-NaN-NaN" || formDate === 'NaN-NaN-NaN') {
        showNotificationError("Select Date", "formDateId", "error");
        return;
    }
    else if (vehicleregNo === '0' || vehicleregNo === 0) {
        showNotificationError("Select vehicle Number", "vehicleregNo", "error");
        return;
    }
    var objJson = {
        "userId": userName,
        "createdbyId": 1,
        "createdbymoduleId": 1,
        "createdbyroleId": 1,
        "vehicleid": vehicleregNo,
        "baselocationid": appendBaseLocId,
        "districtid": appendDistrictId,
        "date": formDate,
    };
    var strUrl = Service.saveScheduleingDetails;
    console.log("saveScheduleingDetails details Url is:" + strUrl);
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
            var responseCode = data.responseCode;
            var auditId = data.auditId;
            if (200 !== responseCode) {
                showNotificationError("not Inserted ", "scheduleingDetailsId", "error");
            } else {
               
                sendEmail(userName1, selectVehicle, auditId);
                sendSMS(userName1, selectVehicle, auditId)
                showNotificationError("Audit id generate Successfully", "scheduleingDetailsId", "success");
                 scheduleresetbtn();
            }
        }, error: function () {

            console.log('In Error of  saveScheduleingDetails');
        }
    });
}
//for reset all filed
function scheduleresetbtn() {
    $('#userNameId').val('0').trigger('chosen:updated');
    $('#vehicleregNo').val('0').trigger('chosen:updated');
    $('#formDateId').val('');
    $('#vehicleID').empty();
    $('#districtId').empty();
    $('#baseLocId').empty();
    $('#vehicleDetailsCardId').hide();


    //$('#eventoryDataTableId').empty();

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
/*@DESC : scheduleDataDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-01-10
 */
function scheduleDataDetails() {

    var json_audit_Details = {
        "compeltedStatus": 0

    };
    var strUrl = Service.scheduleDataDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_audit_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function (data) {

            var responseCode = data.responseCode;
            if (200 !== responseCode) {
                scheduleNotData_DOM();
            } else {

                var arraydata = data.objGetAuditDetailsStatusDetails;

                schedule_Data_DOM(arraydata);
                loadDataTable();
            }
        },
        error: function (err) {
            console.error("Error in auditDetailSearch"
                    + JSON.stringify(err));
        }
    });
}
/*
 *@DESC : if data not there in table
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function scheduleNotData_DOM() {

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
    $(objTHead1).html('S.No');
    $(objTr).append(objTHead1);

//For table Heading2
    var objTHead2 = document.createElement('th');
    $(objTHead2).html('Vehicle No');
    $(objTr).append(objTHead2);


//For table Heading3
    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Audit Id');
    $(objTr).append(objTHead3);
//For table Heading4
    var objTHead4 = document.createElement('th');
    $(objTHead4).html('Audit Status');
    $(objTr).append(objTHead4);
//For table Heading5
    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Update');
    $(objTr).append(objTHead5);

//For table Heading6
    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Delete');
    $(objTr).append(objTHead6);

    var objTBody = document.createElement("tbody");
    $(objTBody).attr("id", "tbodyData");
    $(ObjTableTag).append(objTBody);
    $(objDivTag).addClass('objDivTag1');
    $(objDivTag).append("No DATA AVAILABLE");
    $("#ScheduleDatTableID").append(objDivTag);
}
/*
 *@DESC : getAuditDetailsDataDOM
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function schedule_Data_DOM(strData) {

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
        $(objTHead1).html('S.No');
        $(objTr).append(objTHead1);

//For table Heading2
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Vehicle No');
        $(objTr).append(objTHead2);


//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Audit Id');
        $(objTr).append(objTHead3);
//For table Heading4
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Audit Status');
        $(objTr).append(objTHead4);
//For table Heading5
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Update');
        $(objTr).append(objTHead5);

//For table Heading6
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Delete');
        $(objTr).append(objTHead6);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);

        // Table Data Appending Here

        for (var i = 0; i < strData.length; i++) {

            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");

            $(tablcol1).addClass('text-center');
            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].vehicleNo);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].auditId);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
           
            if(strData[i].compeltedStatus ==='0'||strData[i].compeltedStatus ===0){
             $(tablcol4).html("pending");
            }
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).append('<a href="#"><i class="fa fa-edit faEdit" data-toggle="modal" data-target="#"></i><i></a> ');
            //$(tablcol5).attr('onclick', 'getAuditDetailsReport1("' + strData[i].auditId + '","' + strData[i].auditDate+ '")');
            var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');
            $(tablcol6).append('<a href="#"><i class="fa fa-trash faDelete" data-toggle="modal" data-target="#"></i><i></a> ');


            $(tablcol5).css('height', '5px');
            $(tablcol6).css('height', '5px');
            $(tbleRow).append(tablcol5);
            $(tbleRow).append(tablcol6);
            $(objTBody).append(tbleRow);
        }
        $("#ScheduleDatTableID").append(objDivTag);

    } catch (err) {
        console.log("ScheduleDatTableID" + err);
    }
}
/*
 *@DESC : completedAuditDetails
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function completedAuditDetails() {
    $('#completedDataTable').empty();
    var json_audit_Details = {
        "compeltedStatus": 1
    };
    var strUrl = Service.scheduleDataDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_audit_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function (data) {

            var responseCode = data.responseCode;
            if (200 !== responseCode) {
                completedAuditDetailsNODataDOM();
            } else {

                var arraydata = data.objGetAuditDetailsStatusDetails;

                completedAuditDetails_DOM(arraydata);
                loadDataTable11();
            }
        },
        error: function (err) {
            console.error("Error in auditDetailSearch"
                    + JSON.stringify(err));
        }
    });
}
/*
 *@DESC : completedAuditDetailsNODataDOM
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function completedAuditDetailsNODataDOM() {
    var objDivTag = document.createElement('div');
    $(objDivTag).addClass("table-responsive");

//For table
    var ObjTableTag = document.createElement("table");
    $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example1");
    $(objDivTag).append(ObjTableTag);
//For table head
    var objTHead = document.createElement("thead");
    $(ObjTableTag).append(objTHead);

//For table row
    var objTr = document.createElement("tr");
    $(objTHead).append(objTr);

//For table Heading1
    var objTHead1 = document.createElement("th");
    $(objTHead1).html('S.No');
    $(objTr).append(objTHead1);
    $(objTHead1).addClass("header");

//For table Heading2
    var objTHead2 = document.createElement('th');
    $(objTHead2).html('Vehicle No');
    $(objTr).append(objTHead2);


//For table Heading3
    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Audit Id');
    $(objTr).append(objTHead3);
//For table Heading4
    var objTHead4 = document.createElement('th');
    $(objTHead4).html('Audit Status');
    $(objTr).append(objTHead4);
//For table Heading5
    var objTHead5 = document.createElement('th');
    $(objTHead5).html('View');
    $(objTr).append(objTHead5);



    var objTBody = document.createElement("tbody");
    $(objTBody).attr("id", "tbodyData");
    $(ObjTableTag).append(objTBody);

    $(objDivTag).addClass('objDivTag1');
    $(objDivTag).append("No DATA AVAILABLE");
    $("#completedDataTable").append(objDivTag);
}
/*
 *@DESC : completedAuditDetails_DOM
 *@AuthorName : priyadarshini
 *@DATE : 20-01-2020
 */
function completedAuditDetails_DOM(strData) {

    try {
        //For Div Tag
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

//For table
        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example1");
        $(objDivTag).append(ObjTableTag);
//For table head
        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);

//For table row
        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

//For table Heading1
        var objTHead1 = document.createElement("th");
        $(objTHead1).html('S.No');
        $(objTr).append(objTHead1);
        $(objTHead1).addClass("header");

//For table Heading2
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('Vehicle No');
        $(objTr).append(objTHead2);


//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Audit Id');
        $(objTr).append(objTHead3);
//For table Heading4
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Audit Status');
        $(objTr).append(objTHead4);
//For table Heading5
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('View');
        $(objTr).append(objTHead5);



        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);

        // Table Data Appending Here

        for (var i = 0; i < strData.length; i++) {

            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");

            $(tablcol1).addClass('text-center');
            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].vehicleNo);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].auditId);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            //$(tablcol4).html(strData[i].compeltedStatus);
             if(strData[i].compeltedStatus ==='1'||strData[i].compeltedStatus ===1){
             $(tablcol4).html("completed");
            }
            $(tbleRow).append(tablcol4);


            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).append('<a href="#"><i class="fa fa-eye faEye" data-toggle="modal" data-target="#viewId"></i><i></a> ');
            $(tablcol5).attr('onclick', 'tabOpen("' + strData[i].auditId + '")');
            $(tablcol5).css('height', '5px');
            $(tbleRow).append(tablcol5);
            $(objTBody).append(tbleRow);
        }
        $("#completedDataTable").append(objDivTag);

    } catch (err) {
        console.log("completedDataTable" + err);
    }
}

function loadDataTable() {

    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "scrollY": "200px",
        "iDisplayLength": 5,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Audit Report'},
            {extend: 'pdf', title: 'Audit Report'},
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
function loadDataTable11() {
    $('.dataTables-example1').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "scrollY": 200,
        "scrollCollapse": true,
        //"paging":         false,
        "iDisplayLength": 5,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Pending AuditList Report'},
            {extend: 'pdf', title: 'Pending AuditList Report'},
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
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $.fn.dataTable.tables({visible: true, api: true}).columns.adjust();
    });
}
//for another tab open
function tabOpen(auditid) {
    localStorage.setItem("auditId", 2020012107872);
      window.open('http://localhost:9162/Scheduling/pages/AuditreportHistory.html');  
     
}
//for sms sending
function sendSMS(userName1, selectVehicle, auditId) {
    var messageTemplet = 'Hi,' + userName1 + 'New Audit id generate ' + auditId + ' for   ' + selectVehicle + ' vehicle:';
    var dataObject = {
        "message": messageTemplet,
        "toMobileNumber": "9090606543",
        "fromMobileNumber": "8081567242",
        "numOfAttempts": "0",
        "sendTime": "now()",
        "eventId": "0",
        "inboxId": "0",
        "intUserId": "1",
        "moduleId": "1",
        "intRoleId": 1
    };
    var strUrl = 'http://192.168.1.25:6503/hms/informationProvider/insertSMS';

    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(dataObject),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function (data) {
            console.log("data:::::::::" + JSON.stringify(data));
            var responseCode = data.responseCode;

            if (200 !== responseCode) {
                console.log("message not send susscessfully");
            } else {
                console.log("message send susscessfully");
            }
        }, error: function () {

            console.log('In Error of  sendSMS');
        }
    });
}
//for email sending
function sendEmail(userName, selectVehicle, auditId) {
    var emailTemplet = '<!DOCTYPE html><html><head><title>Complaint Response System</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"> <style>.container{width: 650px;margin:0px auto;padding:20px;}body{padding: 50px;}.gray-bg{background:#f6f6f6;}.white-bg{background:#fff;} table, th, td { border: 1px solid black; border-collapse: collapse; } table{width:100%;  }th, td { padding: 5px; color: black;text-align:center; font-size: 14px;}.fw-600{font-weight:600;}.maintext{background-color: #1f74bd;color: white; height: 50px;font-weight: 800; text-align: center;  font-size: 18px;}.text2{background-color:  #f5f5f5;}.text-light-gray{margin-left: 930px; }</style> </head><body class="gray-bg"><div class="container white-bg"><h4> Dear ,<br> ' + userName + '<span class="text-purple" id="userId"></span></h4><p>One new Audit id  ' + auditId + '  is Generate for this vehicle  ' + selectVehicle + ' </p><br><br><div><span class="text-green">Thanks and Regards,<br><span class="text-purple">AP ERS Team.</span></div></div><div class="text-center "> <p><span class="text-light-gray">Powered by</span> <a href="http://www.procreate.co.in/" target="_blank" class="text-purple">ProCreate Techno Systems Pvt Ltd.</a></p></div><script src="../assets/serviceController/InventoryController.js"></script></body></html>';
    console.log("emailTemplet---------------------------" + emailTemplet);
    var dataObject = {
        "inboxId": "0",
        "replyUserId": "0",
        "toMailId": "bharath.a@procraete.co.in",
        "subject": "bbbbbb",
        "ccMailId": "¥",
        "bccmailId": "¥",
        "body": emailTemplet,
        "mailActionId": "1",
        "templateId": "1",
        "isDelete": "false",
        "intUserId": 101,
        "moduleId": 12,
        "intRoleId": 164

    };
    var strUrl = 'http://192.168.1.25:6503/hms/informationProvider/insertMails';

    console.log("strurl:::::::::" + JSON.stringify(dataObject));
    console.log("strurl:::::::::" + strUrl);

    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(dataObject),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function (data) {
            console.log("data:::::::::" + JSON.stringify(data));
            var responseCode = data.responseCode;
            if (200 !== responseCode) {
                console.log("mail not send susscessfully");
            } else {
                console.log("mail send susscessfully");
            }
        }, error: function () {

            console.log('In Error of  saveScheduleingDetails');
        }
    });
}
