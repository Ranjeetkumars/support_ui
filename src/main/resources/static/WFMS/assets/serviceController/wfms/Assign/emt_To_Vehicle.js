/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var user_Id;
var role_Id;
var module_Id;

$(document).ready(function() {
	user_Id = localStorage.getItem('userID');
	role_Id = localStorage.getItem('wfms_roleID');
	module_Id = localStorage.getItem('wfms_moduleID');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    $("#emt_DeAssign_Date").append(today);
    $("#emt_Assigned_Date").append(today);
    try {
        get_EmtToVehicle_Zones();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

$('#emtVehicle_ZoneId').on('change', function() {
    var emtVehicle_ZoneId = $("#emtVehicle_ZoneId").val();
    if (emtVehicle_ZoneId === "0") {

    } else {
        get_EmtVehicle_BaseLocation_DropDown(emtVehicle_ZoneId);
    }
});

$('#emtVehicle_BaseId').on('change', function() {
    var emtVehicle_BaseId = $("#emtVehicle_BaseId").val();
    if (emtVehicle_BaseId === "0" || emtVehicle_BaseId === " ") {
        alert('Please Select Baselocation');
        return  false;
    } else {
        get_EmtVehicles_DropDown(emtVehicle_BaseId);
    }
});

$('#emt_VehicleId').on('change', function() {
    var emtVehicle_ZoneId = $("#emtVehicle_ZoneId").val();
    var emtVehicle_BaseId = $("#emtVehicle_BaseId").val();
    if (emtVehicle_BaseId === "0" || emtVehicle_BaseId === " ") {
        alert('Please Select Baselocation');
        return  false;
    } else {
        $("#emtToVehicleId").hide();
        get_EmtToVehicle_Baselocation_Name(emtVehicle_BaseId);
        get_UnAssginVehicleEMTs_Details(emtVehicle_ZoneId);
        var emt_VehicleId = $("#emt_VehicleId").val();
        get_AssginVehicleEMTs_Details(emt_VehicleId);
        //Here Appending Zone Loation Name 
        $("#emt_Vehicle_Name").empty();
        var hidden_VehicleNo = $("#hidden_EmtVehicleNo").val();
        $("#emt_Vehicle_Name").text(hidden_VehicleNo);
        get_EmtToVehicle_User_Details();

    }
});

var mail_Assign_Deassgin = "";

$("#emt_UnAssigned_CheckAll").change(function() {
    if ($(".emt_UnAssignedChecks").prop('checked') === true || $(".emt_UnAssignedChecks").prop('checked') === 'true') {
        $(".emt_UnAssignedChecks").prop("checked", false);
    } else {
        $(".emt_UnAssignedChecks").prop("checked", true);
    }
});


function unAssigned_Emts_To_Vehicle() {
    var isChecked = $(".emt_UnAssignedChecks").is(":checked");
    if (isChecked !== true) {
        alert("Check atleast one EMT Assign to Vehicle ");
        return  false;
    } else {
    	var emt_UnAssigneList = [];
        var checks = document.getElementsByClassName('emt_UnAssignedChecks');
        //Create an Array.
        for (var i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                emt_UnAssigneList.push(checks[i].value);
            }
        }
        //Display the selected CheckBox values.
        if (emt_UnAssigneList.length > 0) {
            mail_Assign_Deassgin = "UnAssigned";
            insert_Wfms_VehicleEmtLoc_Details(mail_Assign_Deassgin,emt_UnAssigneList);
        }
    }
}

$("#emt_Assigned_CheckAll").change(function() {
//    $("input:checkbox").prop('checked', $(this).prop("checked"));
    if ($(".emt_AssignedChecks").prop('checked') === true || $(".emt_AssignedChecks").prop('checked') === 'true') {
        $(".emt_AssignedChecks").prop("checked", false);
    } else {
        $(".emt_AssignedChecks").prop("checked", true);
    }
});

function assigned_Emts_To_Vehicle() {
    var isChecked = $(".emt_AssignedChecks").is(":checked");
    if (isChecked !== true) {
        alert("Check  atleast One EMT Deassign to Vehicle");
        return  false;
    } else {
    	var emt_Assigned_List = [];
        var checks = document.getElementsByClassName('emt_AssignedChecks');
        //Create an Array.
        for (var i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                emt_Assigned_List.push(checks[i].value);
            }
        }
        //Display the selected CheckBox values.
        if (emt_Assigned_List.length > 0) {
            mail_Assign_Deassgin = "Assigned";
            update_Wfms_VehicleEmts_Details(mail_Assign_Deassgin,emt_Assigned_List);
        }
    }
}


/* 
 * @Author : Purushotham Akula
 * @Desc : get_EmtToVehicle_Zones
 */
function get_EmtToVehicle_Zones() {
    try {
        $('#emtVehicle_ZoneId').empty();
        var strUrl = Service.GETZONES;
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objGetCountriesControllerDTO;
                    var selectfirst = "<option value='0'>Select zone</option>";
                    $('#emtVehicle_ZoneId').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var Zone = "<option value=" + resData.locationId + ">" + resData.locationName + "</option>";
                        $(Zone).appendTo('#emtVehicle_ZoneId');
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_EmtToVehicle_Zones" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_EmtToVehicle_Zones()' + err);
    }
    $('#emtVehicle_ZoneId').trigger("chosen:updated");
    $('#emtVehicle_ZoneId').chosen();
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_Emt_Baselocation_Name
 */

function get_EmtToVehicle_Baselocation_Name(Zone_Id) {
    $('#emtVehicle_location_Name').empty();
    var location_Id = Zone_Id;
    var strUrl = Service.Get_Baselocation_Name;
    var obj_get_Driver_Details = {
        location_id: location_Id
    };
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_get_Driver_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                $('#emtVehicle_location_Name').append(data.location_name);
            }
        },
        error: function(err) {
            console.error("Error in Get_Baselocation_Name" + JSON.stringify(err));
        }
    });
}


/* 
 * @Author : Purushotham Akula
 * @Desc : get_EmtVehicle_BaseLocation_DropDown
 */

function get_EmtVehicle_BaseLocation_DropDown(location_id) {
    try {
        $('#emtVehicle_BaseId').empty();
        var location_Id = location_id;
        var strUrl = Service.Get_BaseLocation_DropDown;
        var obj_BaseLocation_DropDown = {
            location_id: location_Id
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_BaseLocation_DropDown),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objResourceProfilesControllerDTO;
                    var selectfirst = "<option value='0'>Select Base Location</option>";
                    $('#emtVehicle_BaseId').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var BaseLocation = "<option value=" + resData.location_id + ">" + resData.location_name + "</option>";
                        $(BaseLocation).appendTo('#emtVehicle_BaseId');
                        $('#hidden_EmtVehicleBase').val(resData.location_name);
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_EmtVehicle_BaseLocation_DropDown" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_EmtVehicle_BaseLocation_DropDown()' + err);
    }
    $('#emtVehicle_BaseId').trigger("chosen:updated");
    $('#emtVehicle_BaseId').chosen();

}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_EmtVehicles_DropDown
 */

function get_EmtVehicles_DropDown(location_id) {
    try {
        $('#emt_VehicleId').empty();
        var location_Id = location_id;
        var strUrl = Service.Get_Vehicles_DropDown;
        var obj_Vehicles_DropDown = {
            location_id: location_Id
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Vehicles_DropDown),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objResourceProfilesControllerDTO;
                    var selectfirst = "<option value='0'>Select Vehicle</option>";
                    $('#emt_VehicleId').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var Vehicle = "<option value=" + resData.vehicle_id + ">" + resData.vehicle_name + "</option>";
                        $(Vehicle).appendTo('#emt_VehicleId');
                        $('#hidden_EmtVehicleNo').val(resData.vehicle_name);
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_EmtVehicles_DropDown" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_EmtVehicles_DropDown()' + err);
    }
    $('#emt_VehicleId').trigger("chosen:updated");
    $('#emt_VehicleId').chosen();
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_UnAssginVehicleEMTs_Details
 */

function get_UnAssginVehicleEMTs_Details(locationId) {
    $('#emtVehicle_Assign_Id').empty();
    var obj_UnAssginDriverToVehicle_Details = {
        location_id: locationId
    };
    var strUrl = Service.Get_UnAssginVehicleEMTs_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_UnAssginDriverToVehicle_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                var jsonArray = data.objAssignControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var emt_id = resData.emt_id;
                    var user_name = resData.user_name;
                    var assignId = '<label class="check "> <span class="name" ></span><input type="checkbox" class="emt_UnAssignedChecks"  value="' + emt_id + ' ' + user_name + '">' + user_name + '<span class="checkmark"></span></label><hr id="hrline">';
                    $('#emtVehicle_Assign_Id').append(assignId);
                });
            }
        },
        error: function(err) {
            console.error("Error in get_UnAssginVehicleEMTs_Details" + JSON.stringify(err));
        }
    });
}

/* 
 * @Author : Purushotham Akula
 * @Desc : get_AssginVehicleEMTs_Details
 */

function get_AssginVehicleEMTs_Details(v_VehicleId) {
    $('#emt_UnAssignId').empty();
    var vehicle_Id = v_VehicleId;//Tempororay Purpose
    var obj_AssginDriverToVehicle_Details = {
        vehicle_id: vehicle_Id
    };
    var strUrl = Service.Get_AssginVehicleEMTs_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_AssginDriverToVehicle_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                var jsonArray = data.objAssignControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var emt_id = resData.emt_id;
                    var user_name = resData.user_name;
                    var start_date = resData.start_date;
                    var deAssignId = '<label class="check "> <span class="name" style="margin-right: -37px;"></span><input type="checkbox" class="emt_AssignedChecks" value="' + emt_id + '">' + user_name + '</span><span class="dDate" style="margin-left: 180px;">' + start_date + '</span><span class="checkmark"></span></label><hr id="hrline">';
                    $('#emt_UnAssignId').append(deAssignId);
                });
            }
        },
        error: function(err) {
            console.error("Error in get_AssginVehicleEMTs_Details" + JSON.stringify(err));
        }
    });
}
/* 
 * @Author : Purushotham Akula
 * @Desc : Insert_Wfms_VehicleEmtLoc_Details
 */
function insert_Wfms_VehicleEmtLoc_Details(mail_Assign_Deassgin,emt_UnAssigneList) {

    for (var i = 0; i < emt_UnAssigneList.length; i++) {
        var str = emt_UnAssigneList[i];
        var emt_id = str.split(/(\s+)/);
        if (emt_id[0] !== "0") {
            var emt_Id = emt_id[0];
            var vehicle_Id = $("#emt_VehicleId").val();
           // var user_Id = "468";//112 Temporarory
          //  var module_Id = "10";//2 Temporarory
           // var role_Id = "35";//3 Temporarory


            var json_insert_Wfms_VehicleEmtLoc_Details = {
                "vehicle_id": vehicle_Id,
                "emt_id": emt_Id,
                "user_id": user_Id,
                "module_id": module_Id,
                "role_id": role_Id
            };
            var strUrl = Service.Insert_Wfms_VehicleEmtLoc_Details;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_insert_Wfms_VehicleEmtLoc_Details),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                headers: {
                    "X-TENANT-ID": "PROCREATE"
                },
                success: function(data) {
                    var responsecode = data.responseCode;
                    if (200 !== responsecode) {
                    } else {
                        //Getting User Name And User Mail For Sending Mmail To User
                        get_EmtToVehicle_User_Details(emt_Id, mail_Assign_Deassgin);
                        setTimeout(function() {
                            alert('Successfully EMT(s) assigned to Vehicle');
                            window.location.reload();
                        }, 3000);
                    }
                }, error: function() {
                    console.log('In Error of insert_Wfms_Vehicledriverid_Details');
                }
            });
        }
    }
}


/* 
 * @Author : Purushotham Akula
 * @Desc : update_Wfms_VehicleEmts_Details
 */
function update_Wfms_VehicleEmts_Details(mail_Assign_Deassgin,emt_Assigned_List) {

    for (var i = 0; i < emt_Assigned_List.length; i++) {
        var str = emt_Assigned_List[i];
        var emt_id = str.split(/(\s+)/);
        if (emt_id[0] !== "0") {
            var emt_Id = emt_id[0];
          //  var user_Id = "468";//112 Temporarory
         //   var module_Id = "10";//2 Temporarory
          ///  var role_Id = "35";//3 Temporarory
            var json_update_Wfms_VehicleEmts_Details = {
                "emt_id": emt_Id,
                "user_id": user_Id,
                "module_id": module_Id,
                "role_id": role_Id
            };
            var strUrl = Service.Update_Wfms_VehicleEmts_Details;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_update_Wfms_VehicleEmts_Details),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                headers: {
                    "X-TENANT-ID": "PROCREATE"
                },
                success: function(data) {
                    var responsecode = data.responseCode;
                    if (200 !== responsecode) {
                    } else {
                        //Getting User Name And User Mail For Sending Mmail To User
                        get_EmtToVehicle_User_Details(emt_Id, mail_Assign_Deassgin);
                        //update_WfscheduleAllocated_Trans Details 
                        update_EmtToVehicle_WfscheduleAllocated_Trans();
                        setTimeout(function() {
                            alert('Successfully deassigned driver(s) to vehicle');
                            window.location.reload();
                        }, 3000);
                    }
                }, error: function() {
                    console.log('In Error of update_Wfms_VehicleEmts_Details');
                }
            });
        }
    }
}

/* 
 * @Author : Purushotham Akula
 * @Desc : update_WfscheduleAllocated_Trans
 */
function update_EmtToVehicle_WfscheduleAllocated_Trans() {
    for (var i = 0; i < emt_Assigned_List.length; i++) {
        var str = emt_Assigned_List[i];
        var driver_id = str.split(/(\s+)/);
        if (driver_id[0] !== "0") {
            var driver_Id = driver_id[0];
            var json_update_WfscheduleAllocated_Trans = {
                "driver_id": driver_Id
            };
            var strUrl = Service.Update_WfscheduleAllocated_Trans;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_update_WfscheduleAllocated_Trans),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                headers: {
                    "X-TENANT-ID": "PROCREATE"
                },
                success: function(data) {
                    var responsecode = data.responseCode;
                    if (200 !== responsecode) {
                    } else {
                        //alert('Successfully deassigned driver(s) to vehicle');
                    }
                }, error: function() {
                    console.log('In Error of Update_WfscheduleAllocated_Trans');
                }
            });
        }
    }
}


/* 
 * @Author : Purushotham Akula
 * @Desc : get_EmtToVehicle_User_Details
 */

function get_EmtToVehicle_User_Details(emt_Id, mail_Assign_Deassgin) {
    var user_Id = emt_Id;//temporary purpose
    var strUrl = Service.GetUser_Details;
    var obj_get_Driver_Details = {
        user_id: user_Id
    };
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_get_Driver_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {

            } else
            {
                var jsonArray = data.objAssignControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var user_name = resData.user_name;
                    var user_email = resData.user_email;
                    //Sending Mail To User 
                    inserting_Email_For_EmtToVehicle(user_name, user_email, mail_Assign_Deassgin);
                });
            }
        },
        error: function(err) {
            console.error("Error in get_EmtToVehicle_User_Details" + JSON.stringify(err));
        }
    });
}

function inserting_Email_For_EmtToVehicle(userName, user_email, mail_Assign_Deassgin) {
    if (user_email === "NA" || user_email === "" || user_email === "null") {
        user_email = "test@gmail.com";
    }
    var location_Name = $("#emtVehicle_location_Name").text();
    var userbaseLocation = $("#hidden_EmtVehicleBase").val();
    var useruservehicle1 = $("#emt_Vehicle_Name").text();
    var rmusername = 'Srinivas PRASAD RAYACHURI';//temporary purpose
    var current_date = $("#emt_DeAssign_Date").text();
    var subject = " ";
    var message = " ";
    if (mail_Assign_Deassgin === "UnAssigned") {
        subject = "Assign vehicle is made by   " + rmusername;
        message = "Dear " + userName + ",<br>Vehicle has been assgined by : " + rmusername + ".Please find the below Details<br><br>Assgined Date:" + current_date + "<br>Assign Zone Name:" + location_Name + "<br>Assign Baselocation Name:" + userbaseLocation + "<br>Assign Vehicle No:" + useruservehicle1 + "< br > < br > Regards: < br >" + rmusername + "< br > Workforce Management System.";
    } else if (mail_Assign_Deassgin === "Assigned") {
        subject = "De-Assign vehicle is made by   " + rmusername;
        message = "Dear " + userName + ",<br>Vehicle has been De-assgined by : " + rmusername + ".Please find the below Details<br><br>De-Assgined Date:" + current_date + "<br>De-Assign Zone Name:" + location_Name + "<br>De-Assign Baselocation Name:" + userbaseLocation + "<br>De-Assign Vehicle No:" + useruservehicle1 + "<br><br>Regards: <br>" + rmusername + "<br>Workforce Management System.";
    }


    var json_Inserting_Email_Details = {
        "inboxqueueid": "0",
        "replyuser": "0",
        "us_email": user_email,
        "subject": subject,
        "replybody": message,
        "actionid": "1",
        "templateid": "1",
        "isdeleted": "false",
        "leave_createdbyid": user_Id,
        "leave_createdbymoduleid": module_Id,
        "leave_createdbyroleid": role_Id
    };
    var strUrl = Service.Inserting_Email_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Inserting_Email_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        }, success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                alert('Mail Sended Succsefully');
            }
        },
        error: function(err) {
            console.error("Error in inserting_Email_For_EmtToVehicle" + JSON.stringify(err));
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