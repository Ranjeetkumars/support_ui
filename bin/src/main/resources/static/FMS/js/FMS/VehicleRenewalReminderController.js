/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    try {

        getVehicle();
        getRenewalStatus();
        getRenewaLType();

    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});
/* 
 * @Author : priyadarshini
 * @Date : 30-12-2019
 * @Desc : getVehicle
 */

function getVehicle() {
    try {
        $('#vehicleNameId').empty();
        $('#reg_vehicleId').empty();
        var strUrl = Service.getVehicle;
        console.log("getVehicle Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                console.log('Vehicle not loaded');
                } else {
                    var jsonArray = data.objVehicleControllerDTO;
                    var selectfirst = "<option value='0'>Please Select vehicle</option>";
                    $('#vehicleNameId').append(selectfirst);
                    $('#reg_vehicleId').append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var vehicleName = "<option value=" + resData.vehicleId + ">" + resData.vehicleName + "</option>";
                        $(vehicleName).appendTo('#vehicleNameId');
                        $(vehicleName).appendTo('#reg_vehicleId');
                    });
                }
            },
            error: function (err) {
                console.error("Error in getVehicle" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getVehicle()' + err);
    }
    $('#vehicleNameId').trigger("chosen:updated");
    $('#vehicleNameId').chosen();
    $('#re_vehicleNameId').trigger("chosen:updated");
    $('#re_vehicleNameId').chosen();

}
/* 
 * @Author : priyadarshini
 * @Date : 30-12-2019
 * @Desc : getVehicle
 */
function getRenewalStatus() {
    try {
        $('#reminderStatusId').empty();
        var strUrl = Service.getReminderStatus;
        console.log("getReminderTypes Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
               console.log('RenewalStatus not loaded');

                } else {
                    var jsonArray = data.objGetReminderStatusControllerDTO;
                    var selectfirst = "<option value='0'>Select Reminder Status</option>";
                    $('#reminderStatusId').append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var reminderStatus = "<option value=" + resData.reminderStatusId + ">" + resData.reminderStatusName + "</option>";
                        $(reminderStatus).appendTo('#reminderStatusId');
                    });
                }
            },
            error: function (err) {
                console.error("Error in getReminderTypes" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getReminderStatus()' + err);
    }
    $('#reminderStatusId').trigger("chosen:updated");
    $('#reminderStatusId').chosen();
}

$('#vehicleNameId').on('change', function () {
    var vehicleName = $('#vehicleNameId :selected').text();
    $("#registerNumberId").empty();
    getVehicleReg(vehicleName);
});

/*
 * For getting RegsertNo.
 * priyadarshini
 * 30-11-2019
 */
function getVehicleReg(vehicleName) {
    $("#registerNumberId").empty();
    var strUrl = Service.GetRegisterNo;
    console.log("getRegsertNo Url is:" + strUrl);
    var obj_Insert =
            {"vehicleName": vehicleName}
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        //"Content-Type": "application/json",
        async: false,
        crossDomain: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            console.log('VehicleReg not loaded');

            } else {
                var jsonArray = data.objControllerDTO;
                var selectfirst = "<option value='0'>Select RegisterNo</option>";
                $('#registerNumberId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var DistrictData = "<option value=" + resData.vehicleID + ">" + resData.registerNo + "</option>";
                    $(DistrictData).appendTo('#registerNumberId');
                });
            }
        },
        error: function (err) {
            console.error("Error in  getBaseLoc" + JSON.stringify(err));
        }
    });

    $('#registerNumberId').trigger("chosen:updated");
    $('#registerNumberId').chosen();
}


/* 
 * @Author : priyadarshini
 * @Date : 30-12-2019
 * @Desc : getVehicle
 */

function getRenewaLType() {

    try {
        $('#reg_renewalTypeId').empty();

        var strUrl = Service.getRenewaLType;
        console.log("getVehicle Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
            console.log('RenewaLType not loaded');

                } else {
                    var jsonArray = data.objGetRenewalTypeControllerDTO;
                    var selectfirst = "<option value='0'>Please Select Renewal Type</option>";
                    $('#reg_renewalTypeId').append(selectfirst);

                    $.each(jsonArray, function (i, resData) {
                        var renewalType = "<option value=" + resData.renewalId + ">" + resData.renewalType + "</option>";
                        $(renewalType).appendTo('#reg_renewalTypeId');

                    });
                }
            },
            error: function (err) {
                console.error("Error in getVehicle" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getRenewaLType()' + err);
    }
    $('#reg_renewalTypeId').trigger("chosen:updated");
    $('#reg_renewalTypeId').chosen();


}
/*@DESC : saveRenewalReminder
 *@AuthorName : priyadarshini
 *@DATE : 2019-08-06
 */
function saveRenewalReminder() {

    var conditionId = 1;
    var vehicle = $('#reg_vehicleId').val();
    var renewalType = $('#reg_renewalTypeId').val();
    var subscribedUsers = $('#regsubscribedUsersId').val();
    var timeInterval = $('#reg_timeIntervalId').val();
    var Reg_strtDate1 = $("#Reg_strtDate").val();
    var d = new Date(Reg_strtDate1.split("-").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    Reg_strtDate1 = yy + "-" + mm + "-" + dd;


//    if (vehicle === "0") {
//        showNotificationError("Select vehicle", "reg_vehicleId", "error");
//        return;
//    }
//    else if (renewalType === "0") {
//        showNotificationError("Select renewal Type", "reg_renewalTypeId", "error");
//        return;
//    }
//    else if (timeInterval === '' || timeInterval === null) {
//        showNotificationError("Enter timeInterval", "reg_timeIntervalId", "error");
//        return;
//    } else if (subscribedUsers === '' || subscribedUsers === null) {
//        showNotificationError("Enter subscribedUser", "regsubscribedUsersId", "error");
//        return;
//    }
    var objJson = {
        "par_condition": "1",
        "renewalId": 1,
        "vehicleId": vehicle,
        "veh_renewal_typeId": renewalType,
        "veh_renewal_date": Reg_strtDate1,
        "veh_time_threshold": timeInterval,
        "subscriber_user_mailId": subscribedUsers,
        "createdbyId": "1",
        "createdbymodId": "1",
        "createdbyroleId": "1"
    };
    var strUrl = Service.saveRenewalReminder;
    console.log("saveRenewalReminder details Url is:" + strUrl);
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
            if (200 !== responseCode) {
                showNotificationError("not Inserted ", "renewalReminderId", "error");

            } else {
                showNotificationError("Inserted Successfully", "renewalReminderId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);

            }
        }, error: function () {

            console.log('In Error of  addReminderDetails');
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
function getRenewalRemindersList() {
    $('#renewaldataTableId').empty();
    try {
        var reminderStatus = $('#reminderStatusId').val();
        var vehicleName = $('#vehicleNameId :selected').text();
       // var vehicleName = $('#vehicleNameId').val();
        //var registerNumber = $('#registerNumberId').val();
          var registerNumber = $('#registerNumberId :selected').text();
        //var reportrange = $('#satrtDate1').val();
        //var dueDate = $('#strtDate1').val();
//        //var searchDate = $('#strtDate').val();
//        var searchDate = $("#searchDate_id").val();
//        var d = new Date(searchDate.split("-").reverse().join("-"));
//        var dd = d.getDate();
//        var mm = d.getMonth() + 1;
//
//        var yy = d.getFullYear();
//        searchDate = yy + "-" + mm + "-" + dd;
//        var vehicleType = $('#vehicleType_id').val();
// renewal_typeid integer,
//    vehiclename character varying,
//    permenantregno character varying,
//    startdate date,
//    enddate date)

//select * from sp_select_vms_vehicle_renewal_trans(0,'¥','¥','2019-11-30','2019-12-30');


        if (reminderStatus === "" || reminderStatus === null) {

            reminderStatus = 0;

        }
        var syy = "¥";
        if (vehicleName === '0' || vehicleName === 0) {

            vehicleName = syy;

        }
        if (registerNumber === '0' || registerNumber === 0) {

            registerNumber = syy;

        }
        if (registerNumber === '0' || registerNumber === 0) {
            registerNumber = syy;
        }
//        if (status === '0' || status === 0) {
//            status = 0;
//
//        }
//        if (vehicleType === '0' || vehicleType === 0) {
//            vehicleType = 0;
//
//        }
//        if (searchDate === 'Invalid date' || searchDate === 'NaN-NaN-NaN' || searchDate === '') {
//            searchDate = syy;
//
//        }

        var objJson = {
            "veh_renewal_typeId": reminderStatus,
            "vehicleName": vehicleName,
            "registationNo": registerNumber,
            "startDate": "2019-11-30",
            "endDate": "2019-12-30"

        }
        var strUrl = Service.getRenewalRemindersList;

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

                console.log("data : " + data);
                var responseCode = data.responseCode;
                $('#renewaldataTableId').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                    //  $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#renewaldataTableId').append(divTag);
                    $('#renewaldeleteButtonID').hide();
                } else {
                    $('#renewaldeleteButtonID').show();

                    var jsonArray = data.objControllerDTO;
                    if (jsonArray.length > 0) {
                        renewalReminder_DOM(jsonArray);
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
function renewalReminder_DOM(strData) {
    $("#Searchdeleteid").show();
    $("#Searchdeleteid").prop('disabled', true);

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

        $(objTHead1).html('<label class="check "><span style=" color: white">Select</span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');

        $(objTHead1).addClass("text-center");
        $(objTr).append(objTHead1);
//For table Heading1

        var objTHead2 = document.createElement("th");
        $(objTHead2).html("Vehicle");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);

//For table Heading2
        var objTHead3 = document.createElement("th");
        $(objTHead3).html("Vehicle Renewal Type");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);

//For table Heading3
        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Due Date");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);


        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Subscribers");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);

        //For table Heading4
        var objTHead6 = document.createElement("th");
        $(objTHead6).html("Action");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);


        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);

// Table Data Appending Here

        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            //value=strData[i].permanentRegisteredNo,
            $(tablcol1).addClass('text-center');
            $(tablcol1).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].vrt_renewalid + ' name="case"  )" ><span class="checkmark"> </label>');
            $(tbleRow).append(tablcol1);
            $('#selectall').val(strData[i].vrt_renewalid);
            $(tablcol1).attr('onclick', 'onclickCheckbox()');



            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');

            $(tablcol2).html(strData[i].vehicleName);


            $(tbleRow).append(tablcol2);


            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');

            $(tablcol3).html(strData[i].renewalId);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].veh_renewal_date);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');

            $(tablcol5).html(strData[i].subscriber_user_mailId);
            $(tbleRow).append(tablcol5);
            var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');

            $(tablcol6).append('<ul><li class="dropdown" style=" list-style: none"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-ellipsis-v f-md" data-toggle="tooltip" data-placement="top" title="More Actions"></i> </a><ul class="dropdown-menu"><li><a href="#"><i class="fa fa-envelope"></i>Send Notifications</a></li><li ><a href="#" data-toggle="modal"  onclick="updateRenewalReminder()" data-target="#updateRemainder"><i class="fa fa-edit" ></i>Edit/Reschedule</a></li><li><a href="#"  onclick="deleteRenewalReminder()"><i class="fa fa-trash"></i>Delete</a></li><li><a href="#"><i class="fa fa-history"></i>View Full History</a></li></ul>')
            $(tablcol6).attr('onclick', 'append("' + strData[i].vehicleName + '","' + strData[i].renewalId + '","' + strData[i].veh_renewal_date + '", "' + strData[i].subscriber_user_mailId + '","' + strData[i].veh_time_threshold + '")');
            $(tbleRow).append(tablcol6);
            $(objTBody).append(tbleRow);

        }

        $("#renewaldataTableId").append(objDivTag);


    } catch (err) {
        console.log("renewaldataTableId" + err);
    }
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
function resetsaveRenewalReminder() {
    $('#reg_vehicleId').val('0').trigger('chosen:updated');
    $('#reg_renewalTypeId').val('0').trigger('chosen:updated');
    $("#Reg_strtDate").val('');
    $("#reg_timeIntervalId").val('');
    $("#regsubscribedUsersId").val('');

}
function resetSearchRenewalReminder() {
    $('#reminderStatusId').val('0').trigger('chosen:updated');
    $('#vehicleNameId').val('0').trigger('chosen:updated');
    $("#registerNumberId").val('0').trigger('chosen:updated');
    $("#strtDate1").val('');
    $("#renewaldataTableId").empty();
    $("#Searchdeleteid").hide();
}


var vehiclename;
var renewal;
var vehRenewalDate;
var subscriberUserMailId;
var vehTimeThreshold;



function append(vehicleName, renewalId, veh_renewal_date, subscriber_user_mailId, veh_time_threshold) {

    vehiclename = vehicleName;
    renewal = renewalId;
    vehRenewalDate = veh_renewal_date;
    subscriberUserMailId = subscriber_user_mailId;
    vehTimeThreshold = veh_time_threshold;

}
function updateRenewalReminder() {
    up_getVehicle();
    up_getRenewaLType();
    $("#UP_vehicleId option:contains(" + vehiclename + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#UP_renewalTypeId option:contains(" + renewal + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#UP_strtDate").val(vehRenewalDate);
    $("#UP_timeIntervalId").val(vehTimeThreshold);
    $("#UP_subscribedUsersId").val(subscriberUserMailId);

}
/* 
 * @Author : priyadarshini
 * @Date : 30-12-2019
 * @Desc : getVehicle
 */

function up_getVehicle() {
    try {
        $('#UP_vehicleId').empty();
        var strUrl = Service.getVehicle;
        console.log("getVehicle Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
              console.log('Vehicle not loaded for update');

                } else {
                    var jsonArray = data.objVehicleControllerDTO;
                    var selectfirst = "<option value='0'>Please Select vehicle</option>";
                    $('#UP_vehicleId').append(selectfirst);

                    $.each(jsonArray, function (i, resData) {
                        var vehicleName = "<option value=" + resData.vehicleId + ">" + resData.vehicleName + "</option>";
                        $(vehicleName).appendTo('#UP_vehicleId');

                    });
                }
            },
            error: function (err) {
                console.error("Error in getVehicle" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getVehicle()' + err);
    }
    $('#UP_vehicleId').trigger("chosen:updated");
    $('#UP_vehicleId').chosen();


}
/* 
 * @Author : priyadarshini
 * @Date : 30-12-2019
 * @Desc : getVehicle
 */

function up_getRenewaLType() {

    try {
        $('#UP_renewalTypeId').empty();

        var strUrl = Service.getRenewaLType;
        console.log("getVehicle Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
               console.log('RenewaLType not loaded for update');

                } else {
                    var jsonArray = data.objGetRenewalTypeControllerDTO;
                    var selectfirst = "<option value='0'>Please Select Renewal Type</option>";
                    $('#UP_renewalTypeId').append(selectfirst);

                    $.each(jsonArray, function (i, resData) {
                        var renewalType = "<option value=" + resData.renewalId + ">" + resData.renewalType + "</option>";
                        $(renewalType).appendTo('#UP_renewalTypeId');

                    });
                }
            },
            error: function (err) {
                console.error("Error in getVehicle" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getRenewaLType()' + err);
    }
    $('#UP_renewalTypeId').trigger("chosen:updated");
    $('#UP_renewalTypeId').chosen();


}
/*@DESC : update_RenewalReminder
 *@AuthorName : priyadarshini
 *@DATE : 2019-08-06
 */
function update_RenewalReminder() {

    var conditionId = 2;
    var vehicle = $('#UP_vehicleId').val();
    var renewalType = $('#UP_renewalTypeId').val();
    var DueDate = $('#UP_strtDate').val();
    var timeThreshold = $('#UP_timeIntervalId').val();
    var subscribedUsers = $("#UP_subscribedUsersId").val();
//    var d = new Date(DueDate.split("-").reverse().join("-"));
//    var dd = d.getDate();
//    var mm = d.getMonth() + 1;
//    var yy = d.getFullYear();
//    DueDate = yy + "-" + mm + "-" + dd;
//    alert("DueDate---------"+DueDate);


    if (vehicle === "0") {
        showNotificationError("Select vehicle", "UP_vehicleId", "error");
        return;
    }
    else if (renewalType === "0") {
        showNotificationError("Select renewal Type", "UP_renewalTypeId", "error");
        return;
    }
    else if (DueDate === '' || DueDate === 'invalid') {
        showNotificationError("Enter DueDate", "UP_strtDate", "error");
        return;
    } else if (timeThreshold === '' || timeThreshold === null) {
        showNotificationError("Enter timeThreshold", "UP_timeIntervalId", "error");
        return;
    } else if (subscribedUsers === '' || subscribedUsers === null) {
        showNotificationError("Enter subscribedUsers", "UP_subscribedUsersId", "error");
        return;
    }
    var objJson = {
        "par_condition": conditionId,
        "renewalId": 1,
        "vehicleId": vehicle,
        "veh_renewal_typeId": renewalType,
        "veh_renewal_date": DueDate,
        "veh_time_threshold": timeThreshold,
        "subscriber_user_mailId": subscribedUsers,
        "createdbyId": "1",
        "createdbymodId": "1",
        "createdbyroleId": "1"
    };
    var strUrl = Service.saveRenewalReminder;
    console.log("update_RenewalReminder details Url is:" + strUrl);
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
            if (200 !== responseCode) {
                showNotificationError("not updated ", "updaterenewalReminderId", "error");

            } else {
                showNotificationError("update Successfully", "updaterenewalReminderId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);

            }
        }, error: function () {

            console.log('In Error of  update_RenewalReminder');
        }
    });
}
function resetUpdaterenewalReminder() {

    $('#UP_vehicleId').val('0').trigger('chosen:updated');
    $('#UP_renewalTypeId').val('0').trigger('chosen:updated');
    $("#UP_strtDate").val('');
    $("#UP_timeIntervalId").val('');
    $("#UP_subscribedUsersId").val('');

}
//multiplle checkbox reading
function multipleCheckBox() {
    $("#Searchdeleteid").attr("disabled", true);
    $('#renewalReminderId').val('');
    $("#selectall").change(function (event) {
        $('.case').attr('checked', this.checked);
        $('#Searchdeleteid').attr("disabled", false);
        if ($(this).is(":checked")) {
            $('#renewalId').val('');
            $('.case').prop("checked", true);
            event.preventDefault();
            var searchIDs = $(".case:checkbox:checked").map(function () {
                console.log("selected VEHICLE====" + searchIDs)
                return $(this).val();
            }).get();
            $('#renewalReminderId').val(searchIDs);
        }

    });

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
        $('#renewalReminderId').val(arrSelectedData);
    });
    if ($(".case").length === $(".case:checked").length) {
        //$("#selectall").attr("checked", "checked");
        $("#selectall").prop("checked", true);
    }
    else {
        $("#selectall").removeAttr("checked");
    }
    // vehicleList =  arrSelectedData;
    console.log("arrSelectedData: " + JSON.stringify(arrSelectedData));
}
/*
 * For deletechkReminder.
 * priyadarshini
 * 30-11-2019
 */
function deleteRenewalReminder() {
    var selectedCheckboxvalue = $('#renewalReminderId').val();
    console.log("selected vEHICLE rEGnO======" + selectedCheckboxvalue)
    if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
        showNotificationError1("Please select vehicle", "selectall", "error");
        return;
    }
    $('#myModal8').modal('show');
}
/*
 * For deleteVehicle.
 * priyadarshini
 * 30-11-2019
 */
function deleteRenewalReminder1() {

    var renewalReminder = $('#renewalReminderId').val();
    var objJson = {
        "renewalId": renewalReminder,
    };
    var strUrl = Service.deleteRenewalReminder;
    console.log("deleteRenewalReminder Url is:" + strUrl);
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

            if (200 !== responseCode) {
                showNotificationError("NOt deleted Successfully", "renewalDeleteId", "success");

            } else {
                showNotificationError("deleted Successfully", "renewalDeleteId", "success");

                window.location.reload();
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }

        }, error: function () {

            console.log('In Error of  deleteRenewalReminder ');
        }
    })
}