/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    try {
    	 var token_id = localStorage.getItem("token");
  	   var user_id=localStorage.getItem("userID");
  	  var module_id=localStorage.getItem("fms_moduleID");
	   var role_id=localStorage.getItem("fms_roleID");
        getReminderTypes();
        getVehicle();
        getServcieTasks();
        getReminderStatus();
        getReminderList();

    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

/* 
 * @Author : priyadarshini
 * @Date : 19-12-2019
 * @Desc : getReminderTypes
 */

function getReminderTypes() {
    try {
        $('#reminderId').empty();
        var strUrl = Service.getReminderTypes;
        console.log("getReminderTypes Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                    console.log('ReminderTypes not loaded');
                } else {
                    var jsonArray = data.objRemindersControllerDTO;
                    var selectfirst = "<option value='0'>Please Select Reminder</option>";
                    $('#reminderId').append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var reminderType = "<option value=" + resData.reminderId + ">" + resData.reminderName + "</option>";
                        $(reminderType).appendTo('#reminderId');
                    });
                }
            },
            error: function (err) {
                console.error("Error in getReminderTypes" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getReminderTypes()' + err);
    }
    $('#reminderId').trigger("chosen:updated");
    $('#reminderId').chosen();
}
/* 
 * @Author : priyadarshini
 * @Date : 24-12-2019
 * @Desc : getReminderStatus
 */
function getReminderStatus() {
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
                    console.log('ReminderStatus not loaded');

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
    $('#reminderId').trigger("chosen:updated");
    $('#reminderId').chosen();
}
$('#vehicleNameId').on('change', function () {
    var vehicleName = $('#vehicleNameId :selected').text();
    $("#ResisterNumberId").empty();
    getRegsertNo(vehicleName);
});
/*
 * For getting RegsertNo.
 * priyadarshini
 * 30-11-2019
 */
function getRegsertNo(vehicleName) {
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
                console.log('RegsertNo not loaded');
            } else {
                var jsonArray = data.objControllerDTO;
                var selectfirst = "<option value='0'>Select RegisterNo</option>";
                $('#ResisterNumberId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var DistrictData = "<option value=" + resData.vehicleID + ">" + resData.registerNo + "</option>";
                    $(DistrictData).appendTo('#ResisterNumberId');
                });
            }
        },
        error: function (err) {
            console.error("Error in  getBaseLoc" + JSON.stringify(err));
        }
    });
    $('#ResisterNumberId').trigger("chosen:updated");
    $('#ResisterNumberId').chosen();
}
/* 
 * @Author : priyadarshini
 * @Date : 19-12-2019
 * @Desc : getVehicle
 */
function getVehicle() {
    try {
        $('#vehicleNameId').empty();
        $('#sav_vehicleId').empty();
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
                    console.log('Vehicles not loaded');

                } else {
                    var jsonArray = data.objVehicleControllerDTO;
                    var selectfirst = "<option value='0'>Please Select vehicle</option>";
                    $('#vehicleNameId').append(selectfirst);
                    $('#sav_vehicleId').append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var vehicleName = "<option value=" + resData.vehicleId + ">" + resData.vehicleName + "</option>";
                        $(vehicleName).appendTo('#vehicleNameId');
                        $(vehicleName).appendTo('#sav_vehicleId');
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

}

/* 
 * @Author : priyadarshini
 * @Date : 19-12-2019
 * @Desc : getServcieTasks
 */

function getServcieTasks() {
    try {
        $('#ser_serviceTaskId').empty();
        $('#sav_ServiceTaskId').empty();
        var strUrl = Service.getServcieTasks;
        console.log("getServcieTasks Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                    console.log('ServcieTasks not loaded');

                } else {
                    var jsonArray = data.objRemindersControllerDTO;
                    var selectfirst = "<option value='0'>Please Select vehicle</option>";
                    $('#ser_serviceTaskId').append(selectfirst);
                    $('#sav_ServiceTaskId').append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var serviceTasks = "<option value=" + resData.reminderId + ">" + resData.reminderName + "</option>";
                        $(serviceTasks).appendTo('#ser_serviceTaskId');
                        $(serviceTasks).appendTo('#sav_ServiceTaskId');
                    });
                }
            },
            error: function (err) {
                console.error("Error in getServcieTasks" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getVehicle()' + err);
    }
    $('#ser_serviceTaskId').trigger("chosen:updated");
    $('#ser_serviceTaskId').chosen();
    $('#sav_ServiceTaskId').trigger("chosen:updated");
    $('#sav_ServiceTaskId').chosen();
}
/*@DESC : addReminderDetails
 *@AuthorName : priyadarshini
 *@DATE : 2019-08-06
 */
function addServiceReminderDetails() {

    var conditionId = 1;
    var vehicle = $('#sav_vehicleId').val();
    var ServiceTask = $('#sav_ServiceTaskId').val();
    var primaryMeterInterval = $('#primaryMeterIntervalId').val();
    var secondaryInterval = $('#secondaryIntervalId').val();
    var timeInterval = $('#timeIntervalId').val();
    var totaldaysForTimeInterval = $('#totaldaysForTimeIntervalId').val();
    if (totaldaysForTimeInterval === 1 || totaldaysForTimeInterval === '1')
        ;
    {
        timeInterval = timeInterval * 1;

    }
    if (totaldaysForTimeInterval === 2 || totaldaysForTimeInterval === '2') {
        timeInterval = timeInterval * 7;

    }
    if (totaldaysForTimeInterval === 3 || totaldaysForTimeInterval === '3') {
        timeInterval = timeInterval * 30;

    }
    if (totaldaysForTimeInterval === 4 || totaldaysForTimeInterval === '4') {
        timeInterval = timeInterval * 360;

    }

    var PrimaryMeterThreshold = $('#PrimaryMeterThresholdId').val();

    var SecondaryMeterThreshold = $('#SecondaryMeterThresholdId').val();
    var timeThreshold = $('#timeThresholdId').val();
    var daysForTimeThreshold = $('#daysForTimeThresholdId').val();
    if (daysForTimeThreshold === 1 || daysForTimeThreshold === '1')
        ;
    {
        timeThreshold = timeThreshold * 1;

    }
    if (daysForTimeThreshold === 2 || daysForTimeThreshold === '2') {
        timeThreshold = timeThreshold * 7;

    }
    if (daysForTimeThreshold === 3 || daysForTimeThreshold === '3') {
        timeThreshold = timeThreshold * 30;

    }
    if (daysForTimeThreshold === 4 || daysForTimeThreshold === '4') {
        timeThreshold = timeThreshold * 360;

    }
    var subscribedUsers = $('#subscribedUsersId').val();

    if (vehicle === "0") {
        showNotificationError("Select vehicle", "sav_vehicleId", "error");
        return;
    }
    else if (ServiceTask === "0") {
        showNotificationError("Select service Task", "sav_ServiceTaskId", "error");
        return;
    }
    else if (primaryMeterInterval === '' || primaryMeterInterval === null) {
        showNotificationError("Enter primaryMeterInterval", "primaryMeterIntervalId", "error");
        return;
    } else if (secondaryInterval === '' || secondaryInterval === null) {
        showNotificationError("Enter secondaryInterval", "secondaryIntervalId", "error");
        return;
    }
    else if (timeInterval === '' || timeInterval === null) {
        showNotificationError("Enter timeInterval", "timeIntervalId", "error");
        return;
    }

    else if (PrimaryMeterThreshold === '' || PrimaryMeterThreshold === null) {
        showNotificationError("Enter PrimaryMeterThreshold", "PrimaryMeterThresholdId", "error");
        return;
    }

    else if (SecondaryMeterThreshold === '' || SecondaryMeterThreshold === null) {
        showNotificationError("Enter meter interval", "SecondaryMeterThresholdId", "error");
        return;

    }
    else if (timeThreshold === '' || timeThreshold === null) {
        showNotificationError("Enter timeThreshold", "timeThresholdId", "error");
        return;
    }
    else if (subscribedUsers === '' || subscribedUsers === null) {
        showNotificationError("Enter subscribedUser", "subscribedUsersId", "error");
        return;
    }

    var objJson = {
        "condition": conditionId,
        "reminderId": ServiceTask,
        "reminder_typeid": "1",
        "vehicleId": vehicle,
        "primary_odo_interval": primaryMeterInterval,
        "secondary_odo_interval": secondaryInterval,
        "time_interval_days": timeInterval,
        "primary_odo_threshold": PrimaryMeterThreshold,
        "secondary_odo_threshold": SecondaryMeterThreshold,
        "time_threshold_days": timeThreshold,
        "reminder_created": "now()",
        "createdbyId": user_id,
        "createdbyroleId": role_id,
        "createdbymoduleId": module_id,
        "subscribedUser": subscribedUsers,
    };
    var strUrl = Service.insertServiceReminderDetails;
    console.log("saverReminder details Url is:" + strUrl);
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
                showNotificationError("not Inserted ", "serviceReminderId", "error");

            } else {
                showNotificationError("Inserted Successfully", "serviceReminderId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);

            }
        }, error: function () {

            console.log('In Error of  addReminderDetails');
        }
    });
}

/*
 * For get_vehicleList.
 * priyadarshini
 * 30-11-2019
 * inputs :no
 */
function getReminderList() {
    $('#dataTableId').empty();
    try {
        var reminderStatus = $('#reminderStatusId').val();
        var vehicleName = $('#vehicleNameId').val();
        var ResisterNumber = $('#ResisterNumberId :selected').text();
        //var ResisterNumber = $('#ResisterNumberId').val();

        var ser_serviceTask = $('#ser_serviceTaskId').val();

        var syy = "¥";
        if (vehicleName === '0' || vehicleName === null) {

            vehicleName = 0;

        }
        if (ResisterNumber === '0' || ResisterNumber === 'Select Resister Number') {

            ResisterNumber = syy;

        }
        if (reminderStatus === '0' || reminderStatus === 0) {
            reminderStatus = 0;
        }
        if (ser_serviceTask === '0' || ser_serviceTask === 0) {
            ser_serviceTask = 0;

        }

        var objJson = {
            "vehicleId": vehicleName,
            "registartionNo": ResisterNumber,
            "maintenance_statusId": reminderStatus,
            "serviceTaskId": ser_serviceTask,
        }
        var strUrl = Service.getReminderList;

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
                $('#dataTableId').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#dataTableId').append(divTag);
                    $('#deleteButtonID2').hide();
                } else {
                    var jsonArray = data.objGetServiceReminderControllerDTO;
                    if (jsonArray.length > 0) {
                        $('#deleteButtonID2').show();
                        reminderList_DOM(jsonArray);
                        loadDataTable1();
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


function reminderList_DOM(strData) {
    $("#Searchdeleteid3").show();
    $("#Searchdeleteid3").prop('disabled', true);
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
        $(objTHead3).html("Reminders");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);

//For table Heading3
        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Next Due");
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

            $(tablcol1).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].serviceTaskId + ' name="case"  )" ><span class="checkmark"> </label>');
            $(tbleRow).append(tablcol1);
            $('#selectall').val(strData[i].serviceTaskId);
            $(tablcol1).attr('onclick', 'onclickCheckbox()');



            var tablcol2 = document.createElement("td");
//            var imhTag = document.createElement('img');
//            $(imhTag).attr('src', 'https://www.w3schools.com/bootstrap/sanfran.jpg');
//            $(imhTag).addClass('img-thumbnail vehicle-img');
            $(tablcol2).html(strData[i].vehicleName);
            // $(tablcol2).append(imhTag);

            $(tbleRow).append(tablcol2);


            var tablcol3 = document.createElement("td");
            $(tablcol3).html(strData[i].serviceTaskName);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).html("Data not found");
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].suscriber_mailId);
            $(tbleRow).append(tablcol5);
            var tablcol6 = document.createElement("td");

            $(tablcol6).append('<ul><li class="dropdown" style=" list-style: none"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-ellipsis-v f-md" data-toggle="tooltip" data-placement="top" title="More Actions"></i> </a><ul class="dropdown-menu"><li><a href="#"><i class="fa  fa-wrench"></i>Enter Service</a></li><li><a href="#"><i class="fa fa-envelope"></i>Send Notifications</a></li><li ><a href="#" data-toggle="modal" value=' + strData[i].vehicleId + ' onclick="updateServiceReminder()" data-target="#editServiceRemainder"><i class="fa fa-edit"></i>Edit</a></li><li><a href="#"  onclick="deletechkReminder()"><i class="fa fa-trash"></i>Delete</a></li><li><a href="#"><i class="fa fa-eye"></i>View Complains</a></li><li><a href="#"><i class="fa fa-history"></i>View Full History</a></li></ul>')
            $(tablcol6).attr('onclick', 'append("' + strData[i].vehicleName + '","' + strData[i].serviceTaskId + '","' + strData[i].serviceTaskName + '", "' + strData[i].suscriber_mailId + '","' + strData[i].primaryMeterInterval + '","' + strData[i].secondaryMeterInterval + '","' + strData[i].timeInterval + '","' + strData[i].primaryMeterThreshold + '","' + strData[i].secondaryMeterThreshold + '","' + strData[i].timeThreshold + '")');
            $(tbleRow).append(tablcol6);
            $(objTBody).append(tbleRow);

        }

        $("#dataTableId").append(objDivTag);


    } catch (err) {
        console.log("dataTableId" + err);
    }
}
var vehicleName;
var serviceTask;
var primaryMeterInterval;
var secondaryMeterInterval;
var timeInterval;
var primaryMeterThreshold;
var secondaryMeterThreshold;
var timeThreshold;
var suscriber_mailId;
var serviceTaskId;
function append(vehiclename, servicetaskId, serviceTaskname, suscriber_mailid, primarymeterInterval, secondarymeterInterval, timeInterval1, primaryMeterthreshold, secondaryMeterthreshold, timethreshold) {
    vehicleName = vehiclename;
    serviceTask = serviceTaskname;
    primaryMeterInterval = primarymeterInterval;
    secondaryMeterInterval = secondarymeterInterval;
    timeInterval = timeInterval1;
    primaryMeterThreshold = primaryMeterthreshold;
    secondaryMeterThreshold = secondaryMeterthreshold;
    timeThreshold = timethreshold;
    suscriber_mailId = suscriber_mailid;
    serviceTaskId = servicetaskId;
}



function updateServiceReminder() {
    up_getVehicle();
    up_getServcieTasks();
    $("#up_vehicleId option:contains(" + vehicleName + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_ServiceTaskId option:contains(" + serviceTask + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_primaryMeterIntervalId").val(primaryMeterInterval);
    $("#up_secondaryIntervalId").val(secondaryMeterInterval);
    $("#up_timeIntervalId").val(timeInterval);
    $("#up_PrimaryMeterThresholdId").val(primaryMeterThreshold);
    $("#up_SecondaryMeterThresholdId").val(secondaryMeterThreshold);
    $("#up_timeThresholdId").val(timeThreshold);
    $("#up_subscribedUsersId").val(suscriber_mailId);

}
/* 
 * @Author : priyadarshini
 * @Date : 19-12-2019
 * @Desc : getVehicle
 */

function up_getVehicle() {
    try {
        $('#up_vehicleId').empty();

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
                    console.log('ServcieTasks not loaded');

                } else {
                    var jsonArray = data.objVehicleControllerDTO;
                    var selectfirst = "<option value='0'>Please Select vehicle</option>";
                    $('#up_vehicleId').append(selectfirst);

                    $.each(jsonArray, function (i, resData) {
                        var vehicleName = "<option value=" + resData.vehicleId + ">" + resData.vehicleName + "</option>";
                        $(vehicleName).appendTo('#up_vehicleId');

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
    $('#up_vehicleId').trigger("chosen:updated");
    $('#up_vehicleId').chosen();

}


/* 
 * @Author : priyadarshini
 * @Date : 19-12-2019
 * @Desc : getServcieTasks
 */

function up_getServcieTasks() {
    try {
        $('#up_ServiceTaskId').empty();

        var strUrl = Service.getServcieTasks;
        console.log("getServcieTasks Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objRemindersControllerDTO;
                    var selectfirst = "<option value='0'> Select Reminder</option>";
                    $('#up_ServiceTaskId').append(selectfirst);

                    $.each(jsonArray, function (i, resData) {
                        var serviceTasks = "<option value=" + resData.reminderId + ">" + resData.reminderName + "</option>";
                        $(serviceTasks).appendTo('#up_ServiceTaskId');

                    });
                }
            },
            error: function (err) {
                console.error("Error in getServcieTasks" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getVehicle()' + err);
    }
    $('#up_ServiceTaskId').trigger("chosen:updated");
    $('#up_ServiceTaskId').chosen();

}
function loadDataTable1() {
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



/*
 * For resetServiceReminderDetails.
 * priyadarshini
 * 30-11-2019
 * inputs :no
 */
function resetServiceReminderDetails() {

    $('#sav_vehicleId').val('0').trigger('chosen:updated');
    $('#sav_ServiceTaskId').val('0').trigger('chosen:updated');
    $("#primaryMeterIntervalId").val('');
    $("#secondaryIntervalId").val('');
    $('#timeIntervalId').val('');
    $('#PrimaryMeterThresholdId').val('');
    $('#SecondaryMeterThresholdId').val('');
    $('#timeThresholdId').val('');
    $('#subscribedUsersId').val('');
}

function updateServiceReminderDetails() {

    var conditionId = 2;
    var up_vehicle = $('#up_vehicleId').val();
    var up_ServiceTask = $('#up_ServiceTaskId').val();
    var up_primaryMeterInterval = $('#up_primaryMeterIntervalId').val();
    var up_secondaryInterval = $('#up_secondaryIntervalId').val();
    var up_timeInterval = $('#up_timeIntervalId').val();
    var up_PrimaryMeterThreshold = $('#up_PrimaryMeterThresholdId').val();
    var up_SecondaryMeterThreshold = $('#up_SecondaryMeterThresholdId').val();
    var up_timeThreshold = $('#up_timeThresholdId').val();
    var up_subscribedUsers = $('#up_subscribedUsersId').val();
    var up_totaldaysForTimeInterval = $('#up_totaldaysForTimeIntervalId').val();
    var up_daysForTimeThreshold = $('#up_daysForTimeThresholdId').val();

    if (up_totaldaysForTimeInterval === 1 || up_totaldaysForTimeInterval === '1')

    {
        up_timeInterval = up_timeInterval * 1;

    }
    if (up_totaldaysForTimeInterval === 2 || up_totaldaysForTimeInterval === '2') {
        up_timeInterval = up_timeInterval * 7;

    }
    if (up_totaldaysForTimeInterval === 3 || up_totaldaysForTimeInterval === '3') {
        up_timeInterval = up_timeInterval * 30;

    }
    if (up_totaldaysForTimeInterval === 4 || up_totaldaysForTimeInterval === '4') {
        up_timeInterval = up_timeInterval * 360;

    }


    if (up_daysForTimeThreshold === 1 || up_daysForTimeThreshold === '1')
        ;
    {
        up_timeThreshold = up_timeThreshold * 1;

    }
    if (up_daysForTimeThreshold === 2 || up_daysForTimeThreshold === '2') {
        up_timeThreshold = up_timeThreshold * 7;

    }
    if (up_daysForTimeThreshold === 3 || up_daysForTimeThreshold === '3') {
        up_timeThreshold = up_timeThreshold * 30;

    }
    if (up_daysForTimeThreshold === 4 || up_daysForTimeThreshold === '4') {
        up_timeThreshold = up_timeThreshold * 360;

    }
    if (up_vehicle === "0") {
        showNotificationError("Select vehicle", "up_vehicleId", "error");
        return;
    }
    else if (up_ServiceTask === "0") {
        showNotificationError("Select service Task", "up_ServiceTaskId", "error");
        return;
    }
    else if (up_timeInterval === "0" || up_timeInterval === '0') {
        showNotificationError("Enter timeInterval", "up_timeIntervalId", "error");
        return;
    }

    else if (up_primaryMeterInterval === '' || up_primaryMeterInterval === null) {
        showNotificationError("Enter primaryMeterInterval", "up_primaryMeterIntervalId", "error");
        return;
    } else if (up_secondaryInterval === '' || up_secondaryInterval === null) {
        showNotificationError("Enter secondaryInterval", "up_secondaryIntervalId", "error");
        return;
    }

    else if (up_PrimaryMeterThreshold === '' || up_PrimaryMeterThreshold === null) {
        showNotificationError("Enter PrimaryMeterThreshold", "up_PrimaryMeterThresholdId", "error");
        return;
    }

    else if (up_SecondaryMeterThreshold === '' || up_SecondaryMeterThreshold === null) {
        showNotificationError("Enter meter interval", "up_SecondaryMeterThresholdId", "error");
        return;

    }
    else if (up_timeThreshold === '' || up_timeThreshold === null) {
        showNotificationError("Enter timeThreshold", "up_timeThresholdId", "error");
        return;
    }
    else if (up_subscribedUsers === '' || up_subscribedUsers === null) {
        showNotificationError("Enter subscribedUser", "up_subscribedUsersId", "error");
        return;
    }
    var objJson = {
        "condition": conditionId,
        "reminderId": "1",
        "reminder_typeid": up_ServiceTask,
        "vehicleId": up_vehicle,
        "primary_odo_interval": up_primaryMeterInterval,
        "secondary_odo_interval": up_secondaryInterval,
        "time_interval_days": up_timeInterval,
        "primary_odo_threshold": up_PrimaryMeterThreshold,
        "secondary_odo_threshold": up_SecondaryMeterThreshold,
        "time_threshold_days": up_timeThreshold,
        "reminder_created": "now()",
        "createdbyId": "1",
        "createdbyroleId": "1",
        "createdbymoduleId": "1",
        "subscribedUser": up_subscribedUsers,
    };
    var strUrl = Service.insertServiceReminderDetails;
    console.log("updateServiceReminderDetails details Url is:" + strUrl);
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
                showNotificationError("not Inserted ", "up_serviceReminderId", "error");

            } else {
                showNotificationError("Inserted Successfully", "up_serviceReminderId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);

            }
        }, error: function () {

            console.log('In Error of  updateServiceReminderDetails');
        }
    });
}

function resetUpServiceReminderDetails() {
    $('#up_vehicleId').val('0').trigger('chosen:updated');
    $('#up_ServiceTaskId').val('0').trigger('chosen:updated');
    $("#up_primaryMeterIntervalId").val('');
    $("#up_secondaryIntervalId").val('');
    $('#up_timeIntervalId').val('');
    $('#up_PrimaryMeterThresholdId').val('');
    $('#up_SecondaryMeterThresholdId').val('');
    $('#up_timeThresholdId').val('');
    $('#up_subscribedUsersId').val('');
}

function searchReset() {
    $("#districtId").val('0').trigger("chosen:updated");
    $("#baseLocationId").val('0').trigger("chosen:updated");
    $("#vehicleID").val('0').trigger("chosen:updated");
    $("#ticketID").val('');
    $("#fromDateId").val('');
    $("#toDateId").val('');
}
/*
 * For deleteVehicle.
 * priyadarshini
 * 30-11-2019
 */
function deleteReminder() {

    var serviceTask = serviceTaskId;
    console.log("delete vehiclList====" + serviceTask)
    var objJson = {
        "reminderStatusId": serviceTask,
    };
    var strUrl = Service.deleteServiceReminder;
    console.log("deleteServiceReminder Url is:" + strUrl);
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
                showNotificationError("NOt deleted Successfully", "reminderDeleteId", "success");

            } else {
                showNotificationError("deleted Successfully", "reminderDeleteId", "success");

                window.location.reload();
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }

        }, error: function () {

            console.log('In Error of  deleteReminder ');
        }
    })
}


function showNotificationError1(msg, id, msgType) {

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
//multiplle checkbox reading
function multipleCheckBox() {
    $("#Searchdeleteid3").attr("disabled", true);
    $('#serviceTaskId').val('');
    $("#selectall").change(function (event) {
        $('.case').attr('checked', this.checked);
        $('#Searchdeleteid3').attr("disabled", false);
        if ($(this).is(":checked")) {
            $('#serviceTaskId').val('');
            $('.case').prop("checked", true);
            event.preventDefault();
            var searchIDs = $(".case:checkbox:checked").map(function () {
                console.log("selected VEHICLE====" + searchIDs)
                return $(this).val();
            }).get();
            $('#serviceTaskId').val(searchIDs);
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
        $('#serviceTaskId').val(arrSelectedData);
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
function deletechkReminder() {
    var selectedCheckboxvalue = $('#serviceTaskId').val();
    console.log("selected vEHICLE rEGnO======" + selectedCheckboxvalue)
    if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
        showNotificationError1("Please select vehicle", "selectall", "error");
        return;
    }
    $('#myModal7').modal('show');
}


/*
 * For deleteVehicle.
 * priyadarshini
 * 30-11-2019
 */
function deletecheckedReminder() {
    var serviceTask = $('#serviceTaskId').val();
    var objJson = {
        "reminderStatusId": serviceTask,
    };
    var strUrl = Service.deleteServiceReminder;
    console.log("deleteServiceReminder Url is:" + strUrl);
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
                showNotificationError("NOt deleted Successfully", "reminderDeleteId1", "success");

            } else {
                showNotificationError("deleted Successfully", "reminderDeleteId1", "success");

                window.location.reload();
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }

        }, error: function () {

            console.log('In Error of  deleteReminder ');
        }
    })
}
function resetSearchReminder() {
    $("#reminderStatusId").val('0').trigger("chosen:updated");
    $("#vehicleNameId").val('0').trigger("chosen:updated");
    $("#ResisterNumberId").val('0').trigger("chosen:updated");
    $("#ser_serviceTaskId").val('0').trigger("chosen:updated");
    $("#Searchdeleteid3").hide();
    $("#dataTableId").empty();
}