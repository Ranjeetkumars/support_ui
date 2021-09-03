
/*
 Page onload Calling functions
 */
$(document).ready(function() {
    get_UserName();
    get_Leave_Type_DropDown();
    get_Leave_Status_DropDown();
    get_Leave_Cancel_Details();

});

/*
 Reseting Search Leave Fields
 */
$('#search_reset').on("click", function() {
    $('#search_start_date').val('');
    $('#search_end_date').val('');
    $("#leave_Status_Id").val('').trigger("chosen:updated");
    $("#search_leave_Type_Id").val('').trigger("chosen:updated");

});

/*
 Reseting Inserting Leave Fields
 */
$('#insert_reset').on("click", function() {
    $('#start_date').val('');
    $('#end_date').val('');
    $('#remarks_Id').val('');
    $('#days_Id').val('');
    $("#leave_Type_Id").val('').trigger("chosen:updated");
});

$('#end_date').change(function() {
    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();
    var start_date = moment(start_date, 'DD/MM/YYYY');
    var end_date = moment(end_date, 'DD/MM/YYYY');
    var days = end_date.diff(start_date, 'days');
    if (days === isNaN('NaN')) {
        var days = 0;
        $('#days_Id').val(days);
        $("#days_Id").prop('disabled', true);
    } else {
        $('#days_Id').val(days);
        $("#days_Id").prop('disabled', true);
    }
});
$('#update_ToDate').change(function() {
    var update_FromDate = $('#update_FromDate').val();
    var update_ToDate = $('#update_ToDate').val();
    var FromDate = moment(update_FromDate, 'DD/MM/YYYY');
    var ToDate = moment(update_ToDate, 'DD/MM/YYYY');
    var days = ToDate.diff(FromDate, 'days');
    if (days === isNaN('NaN')) {
        var days = 0;
        $('#update_Noofdays').val(days);
        $("#update_Noofdays").prop('disabled', true);
    } else {
        $('#update_Noofdays').val(days);
        $("#update_Noofdays").prop('disabled', true);
    }
});
/*
 * @returns {Boolean}
 For Getting Myshedule Details
 */
function get_My_Shedule_Details() {
    var StartDate = $('#current_Date').val();
    if (StartDate === "" || StartDate === "Invalid date") {
        showNotificationError('Please select date', 'current_Date', 'error');
        return  false;
    }
    var current_Date = moment(StartDate).format("YYYY-DD-MM");
    var user_Id = "146"; //Temporary Purpose 
    if (user_Id === "" || user_Id === undefined || user_Id === '') {
        alert('User id not found');
        return  false;
    }
    var json_Shedule = {
        "user_id": user_Id,
        "currentdate": current_Date
    };
    var strUrl = Service.My_Sheduled_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Shedule),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            get_My_Shedule_Details_DOM(jsonArray);
            loadDataTable();
            if (responsecode !== 200) {
                alert('NO DATA FOUND');
            } else {
                var jsonArray = data.objMyProfileControllerDTO;
                get_My_Shedule_Details_DOM(jsonArray);
                loadDataTable();
            }

        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}

function get_MyLeave_History_Details() {
    var startDate = $('#search_start_date').val();
    if (startDate === '') {
        showNotificationError('Please select from date', 'search_start_date', 'error');
        return false;
    } else {
        var d = new Date(startDate.split("-").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        var search_start_date = yy + "-" + mm + "-" + dd;
    }
    var endDate = $('#search_end_date').val();
    if (endDate === '') {
        showNotificationError('Please select to date', 'search_end_date', 'error');
        return false;
    } else {
        var d = new Date(endDate.split("-").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        var search_end_date = yy + "-" + mm + "-" + dd;
    }
    var search_leave_Type_Id = $('#search_leave_Type_Id').val();
    if (search_leave_Type_Id === "0") {
        search_leave_Type_Id = "0";
    }
    var leave_Status_Id = $('#leave_Status_Id').val();
    if (leave_Status_Id === "0" || leave_Status_Id === "") {
        leave_Status_Id = "0";
    }
    var user_Id = "161"; //Temporary Purpose 
    if (user_Id === "" || user_Id === undefined || user_Id === '') {
        alert('User id not found');
        return  false;
    }
    var json_Leave_History_Details = {
        "leavetypeid": search_leave_Type_Id,
        "status_id": leave_Status_Id,
        "user_id": user_Id,
        "from_date": search_start_date,
        "to_date": search_end_date
    };
    var strUrl = Service.MyLeave_History_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Leave_History_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            get_MyLeave_History_Details_DOM(jsonArray);
            loadDataTable1();
            if (responsecode !== 200) {
                alert('NO DATA FOUND');
                setTimeout(function() {
                    window.location.reload();
                }, 3000);

            } else {
                var jsonArray = data.objLeaveApplyControllerDTO;
                get_MyLeave_History_Details_DOM(jsonArray);
                loadDataTable1();
            }
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}

/*
 For getting_Leave_Cancel_Details
 */
function get_Leave_Cancel_Details() {
    var user_Id = "161"; //Temporary Purpose 
    var json_Leave_Cancel_Details = {
        "user_id": user_Id
    };

    var strUrl = Service.Leave_Cancel_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Leave_Cancel_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            get_Leave_Cancel_Details_DOM(jsonArray);
            loadDataTable1();
            if (responsecode !== 200) {
                alert('NO DATA FOUND');
            } else {
                var jsonArray = data.objLeaveApplyControllerDTO;
                get_Leave_Cancel_Details_DOM(jsonArray);
                loadDataTable1();
            }
        }, error: function() {
            console.log('In Error of  Details ');
        }
    });
}

/*
 For Getting User_Name Purpose
 */
function get_UserName() {
    var user_Id = "161"; //Temporary Purpose
    var json_UserName = {
        "user_id": user_Id
    };
    var strUrl = Service.Get_UserName;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_UserName),
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
                $('#user_Name').html(data.us_Mname);
                $('#user_Name_Hidden_Id').val(data.us_Mname);
                Get_ManagerName();
                //Earned Leave Calling Here
                Get_Eraned_Leave_Details();
            }
        },
        error: function(err) {
            console.error("Error in get_UserName" + JSON.stringify(err));
        }
    });
}

/*
 For Getting User_Name Purpose
 */
function Get_ManagerName() {
    var user_Id = "2"; //Temporary Purpose
    var json_UserName = {
        "user_id": user_Id
    };
    var strUrl = Service.Get_ManagerName;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_UserName),
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
                var jsonArray = data.objLeaveApplyControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    $('#manager_Name').html(resData.user_name);
                    $('#manager_Name_Hidden_Id').html(resData.user_name);
                });
            }
        },
        error: function(err) {
            console.error("Error in Get_ManagerName" + JSON.stringify(err));
        }
    });
}


/*
 For Getting Phone Number Purpose
 */
function Get_Phone_Number() {
    var user_Id = "161"; //Temporary Purpose
    var json_Get_Phone_Number = {
        "user_id": user_Id
    };
    var strUrl = Service.Get_Phone_Number;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Get_Phone_Number),
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
                $('#phone_Number_Hidden_Id').val(data.us_phonenumber);
            }
        },
        error: function(err) {
            console.error("Error in Get_Phone_Number" + JSON.stringify(err));
        }
    });
}


/*
 For Getting Earned Leaves Purpose
 */
function Get_Eraned_Leave_Details() {
    var user_Id = "161"; //Temporary Purpose
    var json_Eraned_Leave = {
        "user_id": user_Id
    };
    var strUrl = Service.Earned_Leave_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Eraned_Leave),
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
                var jsonArray = data.objLeaveApplyControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var rstData = resData.leave_presentstatus;
                    var eraned_count = rstData.split(".");
                    if (eraned_count[0] === '0' || eraned_count[0] === "0" || eraned_count[0] === undefined || eraned_count[0] === "NA") {
                        $('#eraned_Leave').html('0');
                        Get_Sick_Leave_Details();
                    }
                    else {
                        $('#eraned_Leave').html(eraned_count[0]);
                        //Sick Leave Calling Here
                        Get_Sick_Leave_Details();
                    }
                });
            }
        },
        error: function(err) {
            console.error("Error in Get_Eraned_Leave_Details" + JSON.stringify(err));
        }
    });
}

/*
 For Getting Sick Leaves Purpose
 */
function Get_Sick_Leave_Details() {
    var user_Id = "161"; //Temporary Purpose
    var json_Sick_Leave = {
        "user_id": user_Id
    };
    var strUrl = Service.Sick_Leave_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Sick_Leave),
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
                var jsonArray = data.objLeaveApplyControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var rstData = resData.leave_presentstatus;
                    var eraned_count = rstData.split(".");
                    if (eraned_count[0] === '0' || eraned_count[0] === "0" || eraned_count[0] === undefined || eraned_count[0] === "NA") {
                        $('#sick_Leave').html('0');
                        Get_Casual_Leave_Details();
                    }
                    else {
                        $('#sick_Leave').html(eraned_count[0]);
                        //Casual Leave Calling Here
                        Get_Casual_Leave_Details();
                    }
                });
            }
        },
        error: function(err) {
            console.error("Error in Get_Eraned_Leave_Details" + JSON.stringify(err));
        }
    });
}


/*
 For Getting Casual Leaves Purpose
 */
function Get_Casual_Leave_Details() {
    var user_Id = "161"; //Temporary Purpose
    var json_Sick_Leave = {
        "user_id": user_Id
    };
    var strUrl = Service.Casual_Leave_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Sick_Leave),
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
                var jsonArray = data.objLeaveApplyControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var rstData = resData.leave_presentstatus;
                    var eraned_count = rstData.split(".");
                    if (eraned_count[0] === '0' || eraned_count[0] === "0" || eraned_count[0] === undefined || eraned_count[0] === "NA") {
                        $('#casual_Leave').html('0');
                        Get_Compassionate_Leave_Details();
                    }
                    else {
                        $('#casual_Leave').html(eraned_count[0]);
                        //Casual Leave Calling Here
                        Get_Compassionate_Leave_Details();
                    }
                });
            }
        },
        error: function(err) {
            console.error("Error in Get_Casual_Leave_Details" + JSON.stringify(err));
        }
    });
}


/*
 For Getting Compassionate Leaves Purpose
 */
function Get_Compassionate_Leave_Details() {
    var user_Id = "161"; //Temporary Purpose
    var json_Sick_Leave = {
        "user_id": user_Id
    };
    var strUrl = Service.Compassionate_Leave_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Sick_Leave),
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
                var jsonArray = data.objLeaveApplyControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var rstData = resData.leave_presentstatus;
                    var eraned_count = rstData.split(".");
                    if (eraned_count[0] === '0' || eraned_count[0] === "0" || eraned_count[0] === undefined || eraned_count[0] === "NA") {
                        $('#compensatory_Leave').html('0');
                    }
                    else {
                        $('#compensatory_Leave').html(eraned_count[0]);
                    }
                });
            }
        },
        error: function(err) {
            console.error("Error in Get_Compassionate_Leave_Details" + JSON.stringify(err));
        }
    });
}
/*
 For Loading Leave Type Drop Down Purpose
 */
function get_Leave_Type_DropDown() {
    var strUrl = Service.Leave_Type_DropDown;
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
                var jsonArray = data.objLeaveApplyControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var leave_type = "<option value=" + resData.leavetypeid + ">" + resData.leave_description + "</option>";
                    $(leave_type).appendTo('#leave_Type_Id');
                    $(leave_type).appendTo('#search_leave_Type_Id');
                    $(leave_type).appendTo('#update_LeaveType');
                    $(leave_type).appendTo('#resource_Leavetype');
                    $(leave_type).appendTo('#LH_leaveTypeId');
                });
            }
        },
        error: function(err) {
            console.error("Error in get_Leave_Type_DropDown" + JSON.stringify(err));
        }
    });
}

/*
 For Loading Leave Type Status Drop Down Purpose
 */
function get_Leave_Status_DropDown() {
    var strUrl = Service.Leave_Status_DropDown;
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
                var jsonArray = data.objLeaveApplyControllerDTO;
                $.each(jsonArray, function(index, resData) {
                    var leave_status = "<option value=" + resData.leave_id + ">" + resData.leave_statustype + "</option>";
                    $(leave_status).appendTo('#leave_Status_Id');
                    $(leave_status).appendTo('#resource_LeaveStatus');
                });
            }
        },
        error: function(err) {
            console.error("Error in get_Leave_Status_DropDown" + JSON.stringify(err));
        }
    });
}

/*
 For Inserting Leave Details Purpose
 */
function insert_Leave_Details() {
    var user_Id = "161";
    var us_mangerId = "161";
    var leave_createdbyid = "1";
    var leave_createdbymoduleid = "1";
    var leave_createdbyroleid = "1";
    var start_date = $('#start_date').val();
    if (start_date === '') {
        showNotificationError('Please select from date', 'start_date', 'error');
        return false;
    } else {
        var d = new Date(start_date.split("-").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        var from_Date = yy + "-" + mm + "-" + dd;
    }
    var end_date = $('#end_date').val();
    if (end_date === '') {
        showNotificationError('Please select to date', 'start_date', 'error');
        return false;
    } else {
        var d = new Date(end_date.split("-").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        var to_Date = yy + "-" + mm + "-" + dd;
    }
    var leave_Type_Id = $('#leave_Type_Id').val();
    if (leave_Type_Id === '' || leave_Type_Id === "0" || leave_Type_Id === undefined) {
        showNotificationError('Please select leave type', 'leave_error', 'error');
        return false;
    }
    var no_Of_Days = $('#days_Id').val();
    if (no_Of_Days === '') {
        no_Of_Days = 0;
    }
    var remarks = $('#remarks_Id').val();
    if (remarks === '' || remarks === "") {
        showNotificationError('Please enter remarks', 'remarks_Id', 'error');
        return false;
    }

    var json_Leave_Details = {
        "user_id": user_Id,
        "from_date": from_Date,
        "to_date": to_Date,
        "remarks": remarks,
        "us_mangerId": us_mangerId,
        "leave_createdbyid": leave_createdbyid,
        "leave_createdbymoduleid": leave_createdbymoduleid,
        "leave_createdbyroleid": leave_createdbyroleid,
        "leavetypeid": leave_Type_Id,
        "leave_noofleavesadded": no_Of_Days
    };
    var strUrl = Service.Insert_Leave_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Leave_Details),
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
            }
            else {
                showNotificationError('Inserted Succesfully', 'save_Leave_Details', 'success');
                setTimeout(function() {
                    window.location.reload();
                }, 3000);
            }
        },
        error: function(err) {
            console.error("Error in insert_Leave_Details" + JSON.stringify(err));
        }
    });
}


/*
 For Updating Leave Details Purpose
 */
function update_Leave_Details() {

    var user_Id = "161";//Remporay Purpose
    var leave_apply_id = $('#leave_Cancel_Id').val();

    var update_FromDate = $('#update_FromDate').val();
    if (update_FromDate === '') {
        showNotificationError('Please select from date', 'update_FromDate', 'error');
        return false;
    } else {
        var d = new Date(update_FromDate.split("-").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        var update_FromDate = yy + "-" + mm + "-" + dd;
    }
    var update_ToDate = $('#update_ToDate').val();
    if (update_ToDate === '') {
        showNotificationError('Please select to date', 'update_FromDate', 'error');
        return false;
    } else {
        var d = new Date(update_ToDate.split("-").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        var update_ToDate = yy + "-" + mm + "-" + dd;
    }
    var update_LeaveType = $('#update_LeaveType').val();
    if (update_LeaveType === '' || update_LeaveType === "0" || update_LeaveType === undefined) {
        showNotificationError('Please select leave type', 'update_error', 'error');
        return false;
    }
    var update_Noofdays = $('#update_Noofdays').val();
    if (update_Noofdays === '') {
        update_Noofdays = 0;
    }
    var update_Remraks = $('#update_Remraks').val();
    if (update_Remraks === '' || update_Remraks === "") {
        showNotificationError('Please enter remarks', 'update_error', 'error');
        return false;
    }

    var json_Update_Leave_Details = {
        "user_id": user_Id,
        "leave_apply_id": leave_apply_id,
        "from_date": update_FromDate,
        "to_date": update_ToDate,
        "remarks": update_Remraks,
        "leavetypeid": update_LeaveType,
        "leave_noofleavesadded": update_Noofdays
    };
    console.log('::::: UPDATE JSON OBJECT :::::' + JSON.stringify(json_Update_Leave_Details));
    var strUrl = Service.Update_Leave_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Update_Leave_Details),
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
            }
            else {
                showNotificationError('Update Succesfully', 'update_Leave_ID', 'success');
                setTimeout(function() {
                    window.location.reload();
                }, 3000);
            }
        },
        error: function(err) {
            console.error("Error in insert_Leave_Details" + JSON.stringify(err));
        }
    });
}
function Leave_Status_Details() {
    var leave_Apply_Id = $('#leave_Cancel_Id').val();

    var json_Leave_Status_Details = {
        "leavetypeid": leave_Apply_Id
    };
    var strUrl = Service.Leave_Status_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Leave_Status_Details),
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
                var jsonArray = data.objLeaveApplyControllerDTO;
                $.each(jsonArray, function(index, resData) {
                    Update_Leave__UserCancel_Details(leave_Apply_Id, resData.leave_createddtm, resData.from_date, resData.to_date, resData.leave_noofleavedays, resData.leavetype, resData.remarks);
                    update_Leave_SheduledAllocated_Details(leave_Apply_Id, resData.from_date, resData.to_date);

                });
            }
        },
        error: function(err) {
            console.error("Error in Leave_Status_Details" + JSON.stringify(err));
        }
    });
}

function update_Leave_SheduledAllocated_Details(leave_checked_applyid, from_date, to_date) {

    var json_Leave_SheduledAllocated_Details = {
        "leave_apply_id": leave_checked_applyid,
        "from_date": from_date,
        "to_date": to_date
    };
    var strUrl = Service.Update_Leave_SheduledAllocated_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Leave_SheduledAllocated_Details),
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
            }
        },
        error: function(err) {
            console.error("Error in update_Leave_SheduledAllocated_Details" + JSON.stringify(err));
        }
    });
}

function Update_Leave__UserCancel_Details(leave_Apply_Id, leave_createddtm, from_date, to_date, leave_noofleavedays, leavetype, remarks) {


    var cancel_Remraks = $('#cancel_Remraks').val();
    if (cancel_Remraks === "" || cancel_Remraks === undefined) {
        showNotificationError('Please enter remarks', 'Cancel_Leave_ID', 'error');
        return false;
    }

    var reamrks_Length = cancel_Remraks.length;
    if (reamrks_Length === 200) {
        showNotificationError('Maximum 200 characters only allowing', 'Cancel_Leave_ID', 'error');
        return false;
    }
    var json_Leave__UserCancel_Details = {
        "remarks": cancel_Remraks,
        "leave_id": leave_Apply_Id,
        "leave_createdbyid": "1", //temporraory Purpose
        "leave_createdbymoduleid": "1", //temporraory Purpose
        "leave_createdbyroleid": "1"//temporraory Purpose
    };
    var strUrl = Service.Update_Leave__UserCancel_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Leave__UserCancel_Details),
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
                //If Status Id=4 only we need to call need to discuss
                Update_Leave__Approval_Details(leave_Apply_Id, remarks, leave_createddtm, from_date, to_date, leave_noofleavedays, leavetype, remarks);
                showNotificationError('Leave Cancelled Succesfully', 'Cancel_Leave_ID', 'success');
                setTimeout(function() {
                    window.location.reload();
                }, 3000);
            }
        },
        error: function(err) {
            console.error("Error in json_Leave__UserCancel_Details" + JSON.stringify(err));
        }
    });
}

function Inserting_Email_Details(leave_Apply_Id, remarks_Id, apply_date, from_date, to_date, noof_leavedays, leave_type, reasons) {
    var user_Name = $('#user_Name_Hidden_Id').val();
    var manager_Name = $('#manager_Name_Hidden_Id').val();
    var email_Id = "test@gmail.com";
    var current_Date = "now()";
    var subject = "Confirmation on Leave Request Canceled : " + leave_Apply_Id + " ";
    var message = 'Dear .' + user_Name + ',<br><br>' + manager_Name + ' Has Approved Leave Request Canceled : ' + leave_Apply_Id + '<br><br>Please find the below Details<br>Applied On: \n\
           ' + apply_date + ' <br><b>From Date:  ' + from_date + '<br>To Date: ' + to_date + '</b><br>Duration:  ' + noof_leavedays + '<br>Type of Leave:  ' + leave_type + '<br>Reason:  ' + reasons + '<br>Approved On  '
            + current_Date + '<br>Remarks : ' + remarks_Id + '<br><br>NOTE: As per leave policy,any applied/approved leave cancellation is possible within 7 days from the end date of leave. Beyond 7 days, \n\
            leave cancellation is not possible.<br><br>Regards:  <br>Leave Mangement System ';


    var json_Inserting_Email_Details = {
        "inboxqueueid": "0",
        "replyuser": "0",
        "us_email": email_Id,
        "subject": subject,
        "replybody": message,
        "actionid": "1",
        "templateid": "1",
        "isdeleted": "false",
        "leave_createdbyid": "1",
        "leave_createdbymoduleid": "1",
        "leave_createdbyroleid": "1"
    };
    console.log(' :::: MAIL JSON OBJECT ::::' + json_Inserting_Email_Details);
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
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("No Data Found");
            } else {
                showNotificationError('Mail Sended Succsefully', 'remarks_Id', 'success');
                Get_Phone_Number();
                Inserting_Sms_Details(leave_Apply_Id);
            }
        },
        error: function(err) {
            console.error("Error in json_Leave__UserCancel_Details" + JSON.stringify(err));
        }
    });

}
/*
 Leave Cancellation SMS Sending
 */
function Inserting_Sms_Details(leave_Apply_Id) {
    var phone_Number = $('#phone_Number_Hidden_Id').val();
    var subject = "Leave Request Canceled on Leave Request ID: " + leave_Apply_Id + " ";
    var json_Inserting_Sms_Details = {
        "message": subject,
        "to_mobile_no": phone_Number,
        "from_mobile_no": "0",
        "no_of_attempts": "0",
        "msg_sent_dtm": "now()",
        "status_id": "1",
        "leave_createdbyid": "1",
        "leave_createdbymoduleid": "1",
        "leave_createdbyroleid": "1",
        "leave_createddtm": "now()"
    };
    console.log(' :::: SMS JSON OBJECT ::::' + JSON.stringify(json_Inserting_Sms_Details));
    var strUrl = Service.Inserting_Sms_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Inserting_Sms_Details),
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
                showNotificationError('Sms Sended Succsefully', 'Cancel_Leave_ID', 'success');

            }
        },
        error: function(err) {
            console.error("Error in json_Leave__UserCancel_Details" + JSON.stringify(err));
        }
    });

}

function Update_Leave__Approval_Details(leave_Apply_Id, remarks_Id, creadted_dtm, from_date, to_date, no_ofleavedays, leave_type, remraks) {
    var json_Leave__Approval_Details = {
        "remarks": remarks_Id,
        "leave_id": leave_Apply_Id,
        "leave_createdbyid": "1",
        "leave_createdbymoduleid": "1",
        "leave_createdbyroleid": "1"
    };
    console.log('::::: JSON OBJECT :::::' + JSON.stringify(json_Leave__Approval_Details));
    var strUrl = Service.Update_Leave__Approval_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Leave__Approval_Details),
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
                alert('Inside Update_Leave__Approval_Details');

            } else {
                Inserting_Email_Details(leave_Apply_Id, remarks_Id, creadted_dtm, from_date, to_date, no_ofleavedays, leave_type, remraks);
            }
        },
        error: function(err) {
            console.error("Error in json_Leave__Approval_Details" + JSON.stringify(err));
        }
    });
}

function get_My_Shedule_Details_DOM(strData) {
    $('#my_Shedule_Id').empty();
    try {
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example");
        $(objDivTag).append(ObjTableTag);

        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);

        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

        var objTHead1 = document.createElement("th");
        $(objTHead1).html("SNO");
        $(objTHead1).addClass("text-center");
        $(objTr).append(objTHead1);

        var objTHead2 = document.createElement("th");
        $(objTHead2).html("Allocated Date");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);

        var objTHead3 = document.createElement("th");
        $(objTHead3).html("Shift Type");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);

        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Shify Description");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);

        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Start Time");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);

        var objTHead6 = document.createElement("th");
        $(objTHead6).html("End Time");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

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
            $(tablcol2).html(strData[i].allocateddate);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).html(strData[i].typeofshift);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).html(strData[i].user_desc);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            $(tablcol5).html(strData[i].shiftstarttime);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).html(strData[i].shiftendttime);
            $(tbleRow).append(tablcol6);
            //Appending Body Here
            $(objTBody).append(tbleRow);
        }
        $("#my_Shedule_Id").append(objDivTag);
    } catch (err) {
        console.log("my_Shedule_Id" + err);
    }
}

function loadDataTable() {
    $('.dataTables-example').DataTable({// Data table
        pageLength: 10,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},
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
function loadDataTable1() {
    $('.dataTables-example1').DataTable({// Data table
        pageLength: 10,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},
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
function get_MyLeave_History_Details_DOM(strData) {
    $('#my_Leave_Id').empty();
    try {
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example1");
        $(objDivTag).append(ObjTableTag);

        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);
        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

        var objTHead1 = document.createElement("th");
        $(objTHead1).html("SNO");
        $(objTHead1).addClass("text-center");
        $(objTr).append(objTHead1);

        var objTHead2 = document.createElement("th");
        $(objTHead2).html("Leave Type");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);

        var objTHead3 = document.createElement("th");
        $(objTHead3).html("Approved Date");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);

        var objTHead4 = document.createElement("th");
        $(objTHead4).html("From Date");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);

        var objTHead5 = document.createElement("th");
        $(objTHead5).html("To Date");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);

        var objTHead6 = document.createElement("th");
        $(objTHead6).html("No.of Days");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Leave For Reason");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Reporting Manager");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Manager Reasons");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);

        var objTHead10 = document.createElement("th");
        $(objTHead10).html("Status");
        $(objTHead10).addClass("text-center");
        $(objTHead10).addClass("sorting_disabled");
        $(objTr).append(objTHead10);

        var objTHead11 = document.createElement("th");
        $(objTHead11).html("Action");
        $(objTHead11).addClass("text-center");
        $(objTr).append(objTHead11);

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
            var leavetype = strData[i].leavetype;
            if (leavetype === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(leavetype);
            }
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            var apply_date = strData[i].approved_date;
            if (apply_date === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(apply_date);
            }
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            var from_date = strData[i].from_date;
            if (from_date === "NA") {
                $(tablcol4).html('Not Found');
            } else {
                $(tablcol4).html(from_date);
            }
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            var to_date = strData[i].to_date;
            if (to_date === "NA") {
                $(tablcol5).html('Not Found');
            } else {
                $(tablcol5).html(to_date);
            }
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            var noof_leavedays = strData[i].leave_noofleavedays;
            if (noof_leavedays === "NA") {
                $(tablcol6).html('Not Found');
            } else {
                $(tablcol6).html(noof_leavedays);
            }
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            var remarks = strData[i].employee_reason;
            if (remarks === "NA") {
                $(tablcol7).html('Not Found');
            } else {
                $(tablcol7).html(remarks);
            }
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            var reporting_manager = strData[i].us_mangername;
            if (reporting_manager === "NA") {
                $(tablcol8).html('Not Found');
            } else {
                $(tablcol8).html(reporting_manager);
            }
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            var manager_remarks = strData[i].manager_remarks;
            if (manager_remarks === "NA") {
                $(tablcol9).html('Not Found');
            } else {
                $(tablcol9).html(manager_remarks);
            }
            $(tbleRow).append(tablcol9);

            var tablcol10 = document.createElement("td");
            var leave_statustype = strData[i].leave_statustype;
            if (leave_statustype === "NA") {
                $(tablcol10).html('Not Found');
            }
            else {
                $(tablcol10).html(leave_statustype);
            }
            $(tbleRow).append(tablcol10);

            var leave_apply_id = strData[i].leave_apply_id;
            var leavetypeid = strData[i].leavetypeid;
            var tablcol11 = document.createElement("td");
            var leave_status_id = strData[i].status_id;
            if (leave_statustype === "Approved" || leave_statustype === "Rejected") {
                $(tablcol11).html('<div class="row"> <div class="col-sm-6"> <a href="#" class="disabled" data-toggle="modal"  data-toggle="tooltip"  data-placement="bottom" data-target="#update_Modal" title="Edit"><span class="glyphicon glyphicon-pencil" style="color:blue"></span></a> </div><div class="col-sm-6"><a href="#" class="disabled" data-toggle="modal" data-toggle="tooltip"  data-placement="bottom" title="Cancel" data-target="#update_Modal1"> <span class="glyphicon glyphicon-remove" style="color:red"></span> </a></div></div>');
                $(tbleRow).append(tablcol11);
            } else {
                $(tablcol11).html('<div class="row"> <div class="col-sm-6"> <a href="#" data-toggle="modal"  data-toggle="tooltip"  data-placement="bottom" data-target="#update_Modal" title="Edit"><span class="glyphicon glyphicon-pencil" style="color:blue"></span></a> </div><div class="col-sm-6"><a href="#" data-toggle="modal" data-toggle="tooltip"  data-placement="bottom" title="Cancel" data-target="#update_Modal1"> <span class="glyphicon glyphicon-remove" style="color:red"></span> </a></div></div>');
                $(tablcol11).attr('onclick', 'get_RowData("' + leave_apply_id + '","' + from_date + '","' + to_date + '","' + noof_leavedays + '","' + remarks + '","' + leavetypeid + '")');
                $(tbleRow).append(tablcol11);
            }
            //Appending Body Here
            $(objTBody).append(tbleRow);
        }
        $("#my_Leave_Id").append(objDivTag);
    } catch (err) {
        console.log("my_Leave_Id" + err);
    }
}


function get_Leave_Cancel_Details_DOM(strData) {
    $('#my_Leave_Id').empty();
    try {
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example1");
        $(objDivTag).append(ObjTableTag);

        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);
        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

        var objTHead1 = document.createElement("th");
        $(objTHead1).html("SNO");
        $(objTHead1).addClass("text-center");
        $(objTr).append(objTHead1);

        var objTHead2 = document.createElement("th");
        $(objTHead2).html("Leave Type");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);

        var objTHead3 = document.createElement("th");
        $(objTHead3).html("Apply Date");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);

        var objTHead4 = document.createElement("th");
        $(objTHead4).html("From Date");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);

        var objTHead5 = document.createElement("th");
        $(objTHead5).html("To Date");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);

        var objTHead6 = document.createElement("th");
        $(objTHead6).html("No.of Days");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Leave For Reason");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Reporting Manager");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Manager Reasons");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);

        var objTHead10 = document.createElement("th");
        $(objTHead10).html("Staus");
        $(objTHead10).addClass("text-center");
        $(objTr).append(objTHead10);

        var objTHead11 = document.createElement("th");
        $(objTHead11).html("Action");
        $(objTHead11).addClass("text-center");
        $(objTr).append(objTHead11);

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
            var leavetype = strData[i].leave_description;
            if (leavetype === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(leavetype);
            }
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            var apply_date = strData[i].leave_createddtm;
            if (apply_date === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(apply_date);
            }
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            var from_date = strData[i].from_date;
            if (from_date === "NA") {
                $(tablcol4).html('Not Found');
            } else {
                $(tablcol4).html(from_date);
            }
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            var to_date = strData[i].to_date;
            if (to_date === "NA") {
                $(tablcol5).html('Not Found');
            } else {
                $(tablcol5).html(to_date);
            }
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            var noof_leavedays = strData[i].leave_noofleavedays;
            if (noof_leavedays === "NA") {
                $(tablcol6).html('Not Found');
            } else {
                $(tablcol6).html(noof_leavedays);
            }
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            var remarks = strData[i].remarks;
            if (remarks === "NA") {
                $(tablcol7).html('Not Found');
            } else {
                $(tablcol7).html(remarks);
            }
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            var reporting_manager = strData[i].user_name;
            if (reporting_manager === "NA") {
                $(tablcol8).html('Not Found');
            } else {
                $(tablcol8).html(reporting_manager);
            }
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            var leave_approvereasons = strData[i].leave_approvereasons;
            if (leave_approvereasons === "NA") {
                $(tablcol9).html('Not Found');
            } else {
                $(tablcol9).html(leave_approvereasons);
            }
            $(tbleRow).append(tablcol9);

            var tablcol10 = document.createElement("td");
            var leave_statustype = strData[i].leave_statustype;
            if (leave_statustype === "NA") {
                $(tablcol10).html('Not Found');
            }
            else {
                $(tablcol10).html(leave_statustype);
            }
            $(tbleRow).append(tablcol10);
            var leave_apply_id = strData[i].leave_apply_id;
            var leavetypeid = strData[i].leavetypeid;

            var tablcol11 = document.createElement("td");
            var leave_statustype = strData[i].leave_statustype;
            if (leave_statustype === "Approved") {
                $(tablcol11).html('<div class="row"> <div class="col-sm-6"> <a   class="disabled" href="#" data-toggle="modal"  data-toggle="tooltip"  data-placement="bottom" data-target="#update_Modal" title="Edit"><span class="glyphicon glyphicon-pencil" style="color:blue"></span></a> </div><div class="col-sm-6"><a href="#" class="disabled" data-toggle="modal" data-toggle="tooltip"  data-placement="bottom" title="Cancel" data-target="#update_Modal1"> <span class="glyphicon glyphicon-remove" style="color:red"></span> </a></div></div>');
                $(tbleRow).append(tablcol11);
            } else {
                $(tablcol11).html('<div class="row"> <div class="col-sm-6"> <a href="#" data-toggle="modal"  data-toggle="tooltip"  data-placement="bottom" data-target="#update_Modal" title="Edit"><span class="glyphicon glyphicon-pencil" style="color:blue"></span></a> </div><div class="col-sm-6"><a href="#" data-toggle="modal" data-toggle="tooltip"  data-placement="bottom" title="Cancel" data-target="#update_Modal1"> <span class="glyphicon glyphicon-remove" style="color:red"></span> </a></div></div>');
                $(tablcol11).attr('onclick', 'get_RowData("' + leave_apply_id + '","' + from_date + '","' + to_date + '","' + noof_leavedays + '","' + remarks + '","' + leavetypeid + '")');
                $(tbleRow).append(tablcol11);
            }
            //Appending Body Here
            $(objTBody).append(tbleRow);
        }
        $("#my_Leave_Id").append(objDivTag);
    } catch (err) {
        console.log("my_Leave_Id" + err);
    }
}

function get_RowData(leave_apply_id, from_date, to_date, noof_leavedays, remarks, leavetype) {
     $('#update_FromDate').val(from_date);
    $('#update_ToDate').val(to_date);
    $('#update_LeaveType').val(leavetype).trigger("chosen:updated");
    $('#update_Remraks').val(remarks);
    $('#update_Noofdays').val(noof_leavedays);
    $('#leave_Cancel_Id').val(leave_apply_id);

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
