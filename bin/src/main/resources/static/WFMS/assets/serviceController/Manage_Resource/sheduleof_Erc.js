
/*
 SHEDULE OF ERC ONLOAD FUNCTIONS CALLING HERE 
 */
$(document).ready(function() {
    get_shiftpatterns_DropDown();
    get_Modules_DropDown();


});


$('#shedule_DeprtmentId').change(function() {
    var module_Id = $('#shedule_DeprtmentId').val();
    if (module_Id !== "0") {
        get_Employee_Details(module_Id);
    }
});
$('#shedule_ShiftpatternId').change(function() {
    var ShiftpatternId = $('#shedule_ShiftpatternId').val();
    if (ShiftpatternId !== "0") {
        get_shift_Pattern_Details(ShiftpatternId);
    }
});

$('#sheduleErc_EndtDate').change(function() {
    var start_Date = $('#sheduleErc_StartDate').val();
    var d = new Date(start_Date.split("-").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    var start_date = mm + "/" + dd + "/" + yy;
    var endt_Date = $('#sheduleErc_EndtDate').val();

    var d = new Date(endt_Date.split("-").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    var endt_date = mm + "/" + dd + "/" + yy;
    if (start_date !== "" && endt_date !== "") {
        daysDifference(start_date, endt_date);
    }
});
function daysDifference(start_Date, endt_Date) {
    var date1 = new Date(start_Date);
    var date2 = new Date(endt_Date);
    var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
    var patternone = $('#hidden_PatternId').val();
    var iii;
//    var final = substr(patternone,iii,diffDays);
    var str1 = "ABCDEFGHIJKLMNOP";
    var str2 = "D";
    if (str1.indexOf(str2) != -1) {
        alert(str2 + " found");
    }

    //  alert(' :::::: FINAL VALUES :::::: ' + fff);
}

/*
 For Loading  ShiftPatterns DropDown Purpose
 */

function  get_shiftpatterns_DropDown() {

    var strUrl = Service.Get_ShiftType_Pattern_DropDown;
    $.ajax({
        type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: false,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("No Data Found");
            } else {
                var jsonArray = data.objScheduleOfERCControllerDTO;
                var selectfirst = "<option value='0'>Select Shift Pattern</option>";
                $('#shedule_ShiftpatternId').append(selectfirst);
                $.each(jsonArray, function(i, resData) {
                    var ShiftPattern = "<option value=" + resData.shiftpatternid + ">" + resData.shiftpatterntype + "</option>";
                    $(ShiftPattern).appendTo('#shedule_ShiftpatternId');
                });
            }
        },
        error: function(err) {
            console.error("Error in shiftpatterns_DropDown" + JSON.stringify(err));
        }
    });
}


/*
 For Loading  Modules_DropDown Purpose
 */

function  get_Modules_DropDown() {

    var strUrl = Service.Get_Modules_DropDown_For_Shedule;
    $.ajax({
        type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: false,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("No Data Found");
            } else {
                var jsonArray = data.objPatternsERCControllerDTO;
                var selectfirst = "<option value='0'>Select Department</option>";
                $('#shedule_DeprtmentId').append(selectfirst);
                $.each(jsonArray, function(i, resData) {
                    var ShiftPattern = "<option value=" + resData.moduleid + ">" + resData.module_name + "</option>";
                    $(ShiftPattern).appendTo('#shedule_DeprtmentId');
                });
            }
        },
        error: function(err) {
            console.error("Error in get_Modules_DropDown" + JSON.stringify(err));
        }
    });
}

/*
 For Get_Employee_Details Purpose
 */
function get_Employee_Details(moduleid) {
    $("#sheduleErc_AssignId").empty();

    var moduleid = moduleid;
    var userid = 112;//Temporarory Purpose

    var json_Employee_Details = {
        "moduleid": moduleid,
        "user_id": userid
    };

    var strUrl = Service.Get_Employee_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Employee_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("No Data Found");
            } else {
                var jsonArray = data.objScheduleOfERCControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var assignvar = resData.user_name;
                    var assignId = '<option value="' + resData.user_id + ',' + assignvar + '">' + resData.user_name + '</option>';
                    $('#sheduleErc_AssignId').append(assignId);
                });
                /*
                 Calling ShiftType Pattern Details Function Here
                 */
                get_ShiftType_Patterns_Details();
            }
        }, error: function() {
            console.log('In Error of Get_Employee_Details Details ');
        }
    });
}


var getAllassingVal = [];
function assign() {
    var stopToAddSelectOption = $("#sheduleErc_AssignId").val();
    if (stopToAddSelectOption === "" || stopToAddSelectOption === '' || stopToAddSelectOption === null) {
        showNotificationError('Please Select Employees from the List and Assign', 'error_message', 'error');
        return true;
    }
    $('#sheduleErc_AssignId :selected').each(function(i, sel) {
        var str = $(sel).val().toString();
        var arr = str.split(",");
        var ShiftPattern = '<option value="' + arr[0] + ',' + arr[1] + '">' + arr[1] + '</option>';
        $(ShiftPattern).appendTo('#sheduleErcDeAssignId');
        $(this).remove();
    });
    /*
     Calling User Details Function Here
     */
    get_User_Details();
}
function de_Assign() {
    var stopToAddSelectOption = $("#sheduleErcDeAssignId").val();
    if (stopToAddSelectOption === "" || stopToAddSelectOption === '' || stopToAddSelectOption === null) {
        showNotificationError('Please Select Employees from the List and DeAssign', 'error_message', 'error');
        return true;
    }
    $('#sheduleErcDeAssignId :selected').each(function(i, sel) {
        var str = $(sel).val().toString();
        var arr = str.split(",");
        var ShiftPattern = '<option value="' + arr[0] + ',' + arr[1] + '">' + arr[1] + '</option>';
        $(ShiftPattern).appendTo('#sheduleErc_AssignId');
        $(this).remove();
    });
}

/*
 For Get_ShiftType_Patterns_Details Purpose
 */
function get_ShiftType_Patterns_Details() {
    var user_shift_typeid = "1";//Temporarory Purpose

    var json_ShiftType_Patterns_Details = {
        "user_shift_typeid": user_shift_typeid
    };

    var strUrl = Service.Get_ShiftType_Patterns_BasedOn_ShifType_Ids;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_ShiftType_Patterns_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("No Data Found");
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    $('#hidden_StartTime').val(resData.user_starttime);
                    $('#hidden_EndTime').val(resData.user_endtime);
                    console.log(' ::::: START TIME ::::: ' + resData.user_starttime + " END TIME " + resData.user_endtime);
                });

            }
        }, error: function() {
            console.log('In Error of Get_ShiftType_Patterns_Details');
        }
    });
}


/*
 For Get_User_Details Purpose
 */
function get_User_Details() {

    $('#sheduleErcDeAssignId option').each(function(i, sel) {
        getAllassingVal.push($(this).attr('value'));
    });
    for (var i = 0; i < getAllassingVal.length; i++) {
        var beforsplit = getAllassingVal[i];
        var userids = beforsplit.split(",");
        if (userids[0] !== "0") {
            var user_id = userids[0];
            var module_id = $('#shedule_DeprtmentId').val();
            $('#hidden_UserId').val(user_id);

            var json_User_Details = {
                "user_id": user_id,
                "module_id": module_id
            };

//            console.log('::::: SELECTED  ' + ':: USER_ID :: ' + user_id + " ::MODULE ID ::" + module_id);

            var strUrl = Service.Get_User_Details;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_User_Details),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                headers: {
                    "X-TENANT-ID": "PROCREATE"
                },
                success: function(data) {
                    var responsecode = data.responseCode;
                    if (200 !== responsecode) {
                        alert("No Data Found");
                    } else {
                        var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                        $.each(jsonArray, function(i, resData) {
                            // console.log(':::: USER FST NAME ::::-> ' + resData.user_firstname + " " + resData.user_lastname + ":: Manager Name ::-> " + resData.user_manager_name + ":: EMAIL ::-> " + resData.user_email + " :: PHONE NO ::-> " + resData.user_phone + ":: DESC :: -> " + resData.mo_desc);
                        });

                    }
                }, error: function() {
                    console.log('In Error of Get_User_Details');
                }
            });
        }
    }
}


/*
 For Get_Allocated_Sheduled_Details Purpose
 */
function get_Allocated_Sheduled_Details() {

    for (var i = 0; i < getAllassingVal.length; i++) {
        var beforsplit = getAllassingVal[i];
        var userids = beforsplit.split(",");
        if (userids[0] !== "0") {
            var user_Id = userids[0];
            $('#hidden_UserId').val(user_Id);
            var shiftstart_datetime = $('#sheduleErc_StartDate').val();
            var d = new Date(shiftstart_datetime.split("-").reverse().join("-"));
            var dd = d.getDate();
            var mm = d.getMonth() + 1;
            var yy = d.getFullYear();
            var start_datetime = yy + "-" + mm + "-" + dd;
            var shiftend_datetime = $('#sheduleErc_EndtDate').val();
            var d = new Date(shiftend_datetime.split("-").reverse().join("-"));
            var dd = d.getDate();
            var mm = d.getMonth() + 1;
            var yy = d.getFullYear();
            var end_datetime = yy + "-" + mm + "-" + dd;

            var user_id = user_Id;//5 // To Enable Production Time
//            var user_id = "5";//5//Temporarory Purpose
            var shiftstart_datetime = start_datetime;//2018-4-1'To Enable Production Time
//            var shiftstart_datetime = "2018-4-1";//2018-4-1'//Temporarory Purpose
            var shiftend_datetime = end_datetime;//2018-4-1To Enable Production Time
//            var shiftend_datetime = "2018-4-1";//2018-4-1//Temporarory Purpose
            var json_Allocated_Sheduled_Details = {
                "user_id": user_id,
                "shiftstart_datetime": shiftstart_datetime,
                "shiftend_datetime": shiftend_datetime
            };

            // console.log(':::: ALLOCATED DETAILS JSON OBJECT ::::' + JSON.stringify(json_Allocated_Sheduled_Details));
            var strUrl = Service.Get_Allocated_Sheduled_Details;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_Allocated_Sheduled_Details),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                headers: {
                    "X-TENANT-ID": "PROCREATE"
                },
                success: function(data) {
                    var responsecode = data.responseCode;
                    if (200 !== responsecode) {
                        alert("No Data Found");
                    } else {
                        var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                        $.each(jsonArray, function(i, resData) {
                            var shedule_Allocated_Id = resData.sheduled_id;
                            $('#hidden_shedule_Allocated_Id').val(shedule_Allocated_Id);
//                            console.log('::: SHEDULE-ALLOCATED-ID ::::' + shedule_Allocated_Id);
                        });
                        /*
                         CALLING SHEDULED DETAILS FUNCTION HERE
                         */
                        get_Sheduled_Details();
                        update_SheduleAllocated_Details();

                    }
                }, error: function() {
                    console.log('In Error of Get_Allocated_Sheduled_Details');
                }
            });
        }
    }
}

/*
 For get_Sheduled_Details Purpose
 */
function get_Sheduled_Details() {


    for (var i = 0; i < getAllassingVal.length; i++) {
        var beforsplit = getAllassingVal[i];
        var userids = beforsplit.split(",");
        if (userids[0] !== "0") {
            var user_Id = userids[0];
            $('#hidden_UserId').val(user_Id);
            var shiftstart_datetime = $('#sheduleErc_StartDate').val();
            var d = new Date(shiftstart_datetime.split("-").reverse().join("-"));
            var dd = d.getDate();
            var mm = d.getMonth() + 1;
            var yy = d.getFullYear();
            var start_datetime = yy + "-" + mm + "-" + dd;
            var shiftend_datetime = $('#sheduleErc_EndtDate').val();
            var d = new Date(shiftend_datetime.split("-").reverse().join("-"));
            var dd = d.getDate();
            var mm = d.getMonth() + 1;
            var yy = d.getFullYear();
            var end_datetime = yy + "-" + mm + "-" + dd;

            var user_id = user_Id;//2
//            var user_id = "2";//2
            var shiftstart_datetime = start_datetime;//2018-04-01
//            var shiftstart_datetime = "2018-04-01";//2018-04-01
            var shiftend_datetime = end_datetime;//2018-04-30
//            var shiftend_datetime = "2018-04-30";//2018-04-30
            var json_Sheduled_Details = {
                "user_id": user_id,
                "shiftstart_datetime": shiftstart_datetime,
                "shiftend_datetime": shiftend_datetime
            };
            console.log(':::: SHEDULED DETAILS JSON OBJECT ::::' + JSON.stringify(json_Sheduled_Details));
            var strUrl = Service.Get_Sheduled_Details;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_Sheduled_Details),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                headers: {
                    "X-TENANT-ID": "PROCREATE"
                },
                success: function(data) {
                    var responsecode = data.responseCode;
                    if (200 !== responsecode) {
                        alert("No Data Found");
                    } else {
                        var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                        $.each(jsonArray, function(i, resData) {
                            var shedule_Id = resData.sheduled_id;
                            $('#hidden_sheduleId').val(shedule_Id);
                        });
                        update_Shedule_Details();
                        get_Shedule_Details_Counts(start_datetime, end_datetime, user_Id);

                    }
                }, error: function() {
                    console.log('In Error of get_Sheduled_Details');
                }
            });
        }
    }
}

/*
 For update_SheduleAllocated_Details Purpose
 */
function update_SheduleAllocated_Details() {

    var sheduled_id = $('#hidden_shedule_Allocated_Id').val();
//    var sheduled_id = "9792";
    var json_update_SheduleAllocated_Details = {
        "sheduled_id": sheduled_id
    };

    var strUrl = Service.Update_SheduleAllocated_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_update_SheduleAllocated_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("No Data Found");
            } else {

            }
        }, error: function() {
            console.log('In Error of update_SheduleAllocated_Details');
        }
    });
}


/*
 For update_Shedule_Details Purpose
 */
function update_Shedule_Details() {

    var sheduled_id = $('#hidden_sheduleId').val();
//    var sheduled_id = "9792";
    var json_update_Shedule_Details = {
        "sheduled_id": sheduled_id
    };

    var strUrl = Service.Update_Shedule_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_update_Shedule_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("No Data Found");
            } else {

            }
        }, error: function() {
            console.log('In Error of Update_Shedule_Details');
        }
    });
}


/*
 For get_Shedule_Details_Counts Purpose
 */
function get_Shedule_Details_Counts(start_datetime, end_datetime, user_Id) {

    var start_date = start_datetime;//2018-04-09 00:00:00
    var end_date = end_datetime;//2018-04-18 00:00:00
    var user_id = user_Id;//2
    var json_Shedule_Details_Counts = {
        "start_date": start_date,
        "end_date": end_date,
        "user_id": user_id
    };
    console.log(' ::::: SHEDULE DETAILS COUNTS ::::: ->' + JSON.stringify(json_Shedule_Details_Counts));
    var strUrl = Service.Get_Shedule_Details_Counts;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Shedule_Details_Counts),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("No Data Found");
            } else {

            }
        }, error: function() {
            console.log('In Error of get_Shedule_Details_Counts');
        }
    });
}



/*
 For Inserting_Shedule_Details Purpose
 */
function inserting_Shedule_Details() {
    var patternid = $('#shedule_ShiftpatternId').val();//40
    if (patternid === "0") {
        showNotificationError('Please Select Shift Pattern', 'shedule_ShiftpatternId', 'error');
        return true;
    }
    var module_Id = $('#shedule_DeprtmentId').val();
    if (module_Id === "0") {
        showNotificationError('Please Select Module', 'shedule_ShiftpatternId', 'error');
        return true;
    }

    var bfplit = getAllassingVal[1];
    if (bfplit === "" || bfplit === undefined || bfplit === null) {
        showNotificationError('Please Select Employees from the List and DeAssign', 'error_message', 'error');
        return true;
    }
    var userids1 = bfplit.split(",");
    if (userids1[0] === "" || userids1[0] === undefined || userids1[0] === null) {
        showNotificationError('Please Select Employees from the List and DeAssign', 'error_message', 'error');
        return true;
    }

    for (var i = 0; i < getAllassingVal.length; i++) {
        var beforsplit = getAllassingVal[i];
        var userids = beforsplit.split(",");
        if (userids[0] !== "0") {
            var user_Id = userids[0];
            var start_date = $('#sheduleErc_StartDate').val();
            if (start_date === "" || start_date === undefined) {
                showNotificationError('Please Select Start Date', 'sheduleErc_StartDate', 'error');
                return false;
            }
            var d = new Date(start_date.split("-").reverse().join("-"));
            var dd = d.getDate();
            var mm = d.getMonth() + 1;
            var yy = d.getFullYear();
            var strat_Date = yy + "-" + mm + "-" + dd;
            var end_date = $('#sheduleErc_EndtDate').val();
            if (end_date === "" || end_date === undefined) {
                showNotificationError('Please Select End Date', 'sheduleErc_StartDate', 'error');
                return false;
            }
            var d = new Date(end_date.split("-").reverse().join("-"));
            var dd = d.getDate();
            var mm = d.getMonth() + 1;
            var yy = d.getFullYear();
            var end_Date = yy + "-" + mm + "-" + dd;
            var kellyid = "8";//8 Temporarory
            var user_createddtm = "now()";
            var user_createdbyid = "112";//112 Temporarory
            var user_cretedbymoduledid = "2";//2 Temporarory
            var user_createdbyroleid = "3";//3 Temporarory
            var user_isactive = "true";//true
            var roleid = "2";//2
            var starttime = $('#hidden_StartTime').val();//08:00:00
            var endtime = $('#hidden_EndTime').val();//12:00:00
            var json_inserting_Shedule_Details = {
                "user_id": user_Id,
                "strat_date": strat_Date,
                "end_date": end_Date,
                "patternid": patternid,
                "kellyid": kellyid,
                "user_createddtm": user_createddtm,
                "user_createdbyid": user_createdbyid,
                "user_cretedbymoduledid": user_cretedbymoduledid,
                "user_createdbyroleid": user_createdbyroleid,
                "user_isactive": user_isactive,
                "roleid": roleid,
                "starttime": starttime,
                "endtime": endtime
            };
            console.log(' ::::: INSERTING SHEDULE DETAILS ::::: ->' + JSON.stringify(json_inserting_Shedule_Details));
            var strUrl = Service.Inserting_Shedule_Details;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_inserting_Shedule_Details),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                headers: {
                    "X-TENANT-ID": "PROCREATE"
                },
                success: function(data) {
                    var responsecode = data.responseCode;
                    if (200 !== responsecode) {
                        alert("No Data Found");
                    } else {
                        alert('Succefully Inserted');

                    }
                }, error: function() {
                    console.log('In Error of Inserting_Shedule_Details');
                }
            });
        }
    }
}


/*
 For Get_shift_Pattern_Details Purpose
 */
function get_shift_Pattern_Details(patternid) {

    var patternid = patternid;//15

    var json_shift_Pattern_Details = {
        "patternid": patternid
    };
    var strUrl = Service.Get_shift_Pattern_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_shift_Pattern_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("No Data Found");
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var sp_1 = resData.shift_pattern1;
                    if (sp_1 === "RO") {
                        sp_1 = "H";
                    }
                    var sp_2 = resData.shift_pattern2;
                    if (sp_2 === "RO") {
                        sp_2 = "H";
                    }
                    var sp_3 = resData.shift_pattern3;
                    if (sp_3 === "RO") {
                        sp_3 = "H";
                    }
                    var sp_4 = resData.shift_pattern4;
                    if (sp_4 === "RO") {
                        sp_4 = "H";
                    }
                    var sp_5 = resData.shift_pattern5;
                    if (sp_5 === "RO") {
                        sp_5 = "H";
                    }
                    var sp_6 = resData.shift_pattern6;
                    if (sp_6 === "RO") {
                        sp_6 = "H";
                    }
                    var sp_7 = resData.shift_pattern7;
                    if (sp_7 === "RO") {
                        sp_7 = "H";
                    }
                    var sp_8 = resData.shift_pattern8;
                    if (sp_8 === "RO") {
                        sp_8 = "H";
                    }
                    var sp_9 = resData.shift_pattern9;
                    if (sp_9 === "RO") {
                        sp_9 = "H";
                    }
                    var sp_10 = resData.shift_pattern10;
                    if (sp_10 === "RO") {
                        sp_10 = "H";
                    }
                    var sp_11 = resData.shift_pattern11;
                    if (sp_11 === "RO") {
                        sp_11 = "H";
                    }
                    var sp_12 = resData.shift_pattern12;
                    if (sp_12 === "RO") {
                        sp_12 = "H";
                    }
                    var sp_13 = resData.shift_pattern13;
                    if (sp_13 === "RO") {
                        sp_13 = "H";
                    }
                    var sp_14 = resData.shift_pattern14;
                    if (sp_14 === "RO") {
                        sp_14 = "H";
                    }
                    var sp_15 = resData.shift_pattern15;
                    if (sp_15 === "RO") {
                        sp_15 = "H";
                    }
                    var sp_16 = resData.shift_pattern16;
                    if (sp_16 === "RO") {
                        sp_16 = "H";
                    }
                    var sp_17 = resData.shift_pattern17;
                    if (sp_17 === "RO") {
                        sp_17 = "H";
                    }
                    var sp_18 = resData.shift_pattern18;
                    if (sp_18 === "RO") {
                        sp_18 = "H";
                    }
                    var sp_19 = resData.shift_pattern19;
                    if (sp_19 === "RO") {
                        sp_19 = "H";
                    }
                    var sp_20 = resData.shift_pattern20;
                    if (sp_20 === "RO") {
                        sp_20 = "H";
                    }
                    var sp_21 = resData.shift_pattern21;
                    if (sp_21 === "RO") {
                        sp_21 = "H";
                    }
                    var patternone = sp_1 + sp_2 + sp_3 + sp_4 + sp_5 + sp_6 + sp_7 + sp_8 + sp_9 + sp_10 + sp_11 + sp_12 + sp_13 + sp_14 + sp_15 + sp_16 + sp_17 + sp_18 + sp_19 + sp_20 + sp_21;
                    $('#hidden_PatternId').val(patternone);

                    var final = patternone.split('');
                  //  var output = "Hello world!".split('');
                  var len = final.length;
                  for(var i =0; i<=len ; i++){
                 if(final[i] === "N"){
                     console.log( ' N NO.OFS ---> ');
                 }
                }

                });
            }
        }, error: function() {
            console.log('In Error of get_shift_Pattern_Details');
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
