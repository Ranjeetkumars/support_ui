/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var currentMonth;
var currentYear;
var morningcount;
var totalcallsperday1;
var totalavgcallsperday;
var morningavgcount;
var shiftwsiecallvolumee;
var shifthours;
var ch1_effectivecall;
var ch1_effectiveaht;
var ch1_ineffectivecalls;
var ch1_ineffectiveaht;
var resourcerequired;
var nightcount;
var nightavgcount;
var shiftwisecalls3;
var shiftwsiecallvolumee3;
var resourcerequired3;
var evening_Shift_Count;
var eveningavgcount;
var shiftwisecalls2;
var shiftwsiecallvolumee2;
var current_Month_Date;
$(document).ready(function() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var Date1 = day + "-" + month + "-" + year;
    current_Month_Date = year + "-" + month + "-" + day;
    $("#erc_StrDate").val(Date1);
    currentMonth = month;
    currentYear = year;
    getting_CurrentMonth_Details(currentMonth, currentYear);
    get_month_Datails();
    get_Module_Details();
    get_All_Employee_Sheduled_Allocated_Details();

});


function search_Current_Month_ERC_Details() {
    // $("#thead_Remove").empty();
    $("#ERC_TableId").empty();
    $("#week_Day").empty();
    $("#actual_Id").empty();
    $("#recommanded_Id").empty();
    $("#required_Id").empty();


    var department_Id = $("#Erc_DepartmentId").val();
    var crt_Date = $("#erc_StrDate").val();
    if (department_Id === "0" || department_Id === null || department_Id === "" || department_Id === undefined) {
        showNotificationError("Please Select Department", "Erc_DepartmentId", "error");
        return false;
    }
    if (crt_Date === "0" || crt_Date === null || crt_Date === "" || crt_Date === undefined) {
        showNotificationError("Please Select Date", "Erc_DepartmentId", "error");
        return false;
    }
    var d = new Date(crt_Date.split("-").reverse().join("-"));
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var current_Date = year + "-" + month + "-" + day;

    // $('#ERC_Table').empty();

    get_month_Datails();
    get_All_Employee_Sheduled_Allocated_Details(department_Id, current_Date);
}

var month;
function getting_CurrentMonth_Details(currentMonth, currentYear) {
    switch (currentMonth) {
        case 1:
            month = "January";
            days = 31;
            break;
        case 2:
            month = "February";
            if (currentYear % 4 !== 0) {
                days = 28;
            } else {
                days = 29;
            }
            break;
        case 3:
            month = "March";
            days = 31;
            break;
        case 4:
            month = "April";
            days = 30;
            break;
        case 5:
            month = "May";
            days = 31;
            break;
        case 6:
            month = "June";
            days = 30;
            break;
        case 7:
            month = "July";
            days = 31;
            break;
        case 8:
            month = "August";
            days = 31;
            break;
        case 9:
            month = "September";
            days = 30;
            break;
        case 10:
            month = "October";
            days = 31;
            break;
        case 11:
            month = "November";
            days = 30;
            break;
        case 12:
            month = "December";
            days = 31;
            break;
    }

}

var daysArray;
var weekArray;
function  get_month_Datails() {
    $("#ERC_TableId").empty();
    $("#week_Day").empty();
    var numDaysInMonth, daysInWeek, daysIndex, index, i, l;
    var year = currentYear;
    var month = currentMonth;
    if (year % 4 !== 0) {
        numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
        numDaysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysIndex = {'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6};
    index = daysIndex[(new Date(year, month - 1, 1)).toString().split(' ')[0]];
    daysArray = [];
    weekArray = [];
    for (i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
        daysArray.push((i + 1) + ', ' + daysInWeek[index++]);
        if (index === 7)
            index = 0;
    }
    table_Headings_Appending();
    actual_Recommaned_Required_Shift_Counts();
}
var globallength;
function table_Headings_Appending() {
    var total_Days = daysArray;
    var thead1 = '<th style="font-size: 14px;">Employee ID</th>';
    var thead2 = '<th style="font-size: 14px;">Employee Name</th>';
    var thead3 = '<th style="font-size: 14px;">Department</th>';
    var thead4 = '<th style="font-size: 14px;">Leave Balance</th>';
    var thead5 = '<th style="font-size: 14px;">CO Balance</th>';
    $("#week_Day").append(thead1);
    $("#week_Day").append(thead2);
    $("#week_Day").append(thead3);
    $("#week_Day").append(thead4);
    $("#week_Day").append(thead5);

    for (var i = 0; i < total_Days.length; i++) {
        var notarray = total_Days[i];
        var aptrSplit = notarray.split(",");
        var intDays = aptrSplit[0];
        var week_Name = aptrSplit[1];
        var week_Day = '<th style="font-size: 14px;">' + intDays + '<br>' + week_Name + '</th>';
        $("#week_Day").append(week_Day);
    }
    globallength = total_Days.length;
}
function resetDetails() {
	$('#Erc_DepartmentId').val('').trigger('chosen:updated');
	$('#erc_StrDate').val("");
}

function actual_Recommaned_Required_Shift_Counts() {
    $("#actual_Id").empty();
    $("#recommanded_Id").empty();
    $("#required_Id").empty();
    var total_Days1 = daysArray;
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var month = monthNames[date.getMonth()];
    var year = currentYear;
    var Month = '<th>' + month + ' ' + year + '</th>';
    $("#actual_Id").append(Month);
    $("#recommanded_Id").append(Month);
    $("#required_Id").append(Month);
    for (var i = 0; i < total_Days1.length; i++) {
        var notarray = total_Days1[i];
        var aptrSplit = notarray.split(",");
        var intDays = aptrSplit[0];
        var actual_Id = '<th>' + intDays + '</th>';
        $("#actual_Id").append(actual_Id);
        $("#recommanded_Id").append(actual_Id);
        $("#required_Id").append(actual_Id);
        var month1 = date.getMonth() + 1;
        var total_Month_Dates = year + '-' + month1 + '-' + intDays;

    }
    // ================ Actual Counts Calling Here =================== //


    get_Actual_Day_Shift_Count(total_Month_Dates);
    get_Actual_Night_Shift_Count(total_Month_Dates);
    get_Actual_General_Shift_Count(total_Month_Dates);
    get_Actual_Total_Count(total_Month_Dates);
    // ================ Recommended Counts Calling Here =================== //

    Get_Recommended_Morning_Shift_Count();
    get_Recommended_Total_Calls_Sum_Count();
    get_Recommended_Total_Calls_Count();
    get_Effective_Call_Details();
    get_Required_Day_Shift_Count(total_Month_Dates);

}


/*
 * @Author : Purushotham Akula @Desc : get_Veihicle_Zones
 */
function get_Module_Details() {
    try {
        $('#Erc_DepartmentId').empty();
        var strUrl = Service.Get_Module_Details1;
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objPatternsERCControllerDTO;
                    var selectfirst = "<option value='0'>Select One</option>";
                    $('#Erc_DepartmentId').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var Zone = "<option value=" + resData.moduleid + ">" + resData.module_name + "</option>";
                        $(Zone).appendTo('#Erc_DepartmentId');
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_Module_Details" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_Module_Details()' + err);
    }
    $('#Erc_DepartmentId').trigger("chosen:updated");
    $('#Erc_DepartmentId').chosen();
}


/*
 * For get_Actual_Day_Shift_Count Purpose
 */
function get_Actual_Day_Shift_Count(total_Month_Dates) {
    var allocated_Date = total_Month_Dates;
    var module_Id = $('#Erc_DepartmentId').val();
    if (module_Id === "0") {
        module_Id = 0;
    } else {
        module_Id;
    }
    var manager_Id = Constants.User_Id; // Temporary Purpose
    var json_Day_Shift_Count = {
        "module_id": module_Id,
        "allocateddate": allocated_Date,
        "manager_id": manager_Id
    };
    var strUrl = Service.Get_Actual_Day_Shift_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Day_Shift_Count),
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
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                var shifts_Count = jsonArray;
            	for(var j=0;j<shifts_Count.length;j++){
            		$('#daysShift' + j).remove();
            	}               
                for (var i = 0; i < shifts_Count.length; i++) {
                    var count_Date = shifts_Count[i].count_Date;
                    var day_Shift_Count = shifts_Count[i].count;
                    var act_Day_Shift = ' <td id="daysShift' + i + '" align="center" width="2%" bgcolor="#CCFFFF" "' + count_Date + '">' + day_Shift_Count + '</td>';
                  
                    $("#act_Day_Shift").append(act_Day_Shift);
                }

            }
        }, error: function() {
            console.log('In Error of get_Actual_Day_Shift_Count');
        }
    });
}

/*
 * For get_Actual_Night_Shift_Count Purpose
 */
function get_Actual_Night_Shift_Count(total_Month_Dates) {
    var allocated_Date = total_Month_Dates;
    var module_Id = $('#Erc_DepartmentId').val();
    if (module_Id === "0") {
        module_Id = 0;
    } else {
        module_Id;
    }
    var manager_Id = Constants.User_Id; // Temporary Purpose
    var json_Night_Shift_Count = {
        "module_id": module_Id,
        "allocateddate": allocated_Date,
        "manager_id": manager_Id
    };
    var strUrl = Service.Get_Actual_Night_Shift_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Night_Shift_Count),
        contentType: "application/json",
        sasync: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                var shifts_Count = jsonArray;
                for(var j=0;j<shifts_Count.length;j++){
            		$('#nighShift' + j).remove();
            	} 
                for (var i = 0; i < shifts_Count.length; i++) {
                    var count_Date = shifts_Count[i].count_Date;
                    var nght_Shift_Count = shifts_Count[i].count;
                    var night_Shift_Count = ' <td id="nighShift' + i + '" align="center" width="2%" bgcolor="#CCFFFF" "' + count_Date + '">' + nght_Shift_Count + '</td>';
                    $("#act_Night_Shift").append(night_Shift_Count);
                }
            }
        }, error: function() {
            console.log('In Error of get_Actual_Night_Shift_Count');
        }
    });
}

/*
 * For get_Actual_General_Shift_Count Purpose
 */
function get_Actual_General_Shift_Count(total_Month_Dates) {
    var allocated_Date = total_Month_Dates;
    var module_Id = $('#Erc_DepartmentId').val();
    if (module_Id === "0") {
        module_Id = 0;
    } else {
        module_Id;
    }
    var manager_Id = Constants.User_Id; // Temporary Purpose
    var json_General_Shift_Count = {
        "module_id": module_Id,
        "allocateddate": allocated_Date,
        "manager_id": manager_Id
    };
    var strUrl = Service.Get_Actual_General_Shift_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_General_Shift_Count),
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
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                var shifts_Count = jsonArray;
                for(var j=0;j<shifts_Count.length;j++){
            		$('#generalShift' + j).remove();
            	} 
                for (var i = 0; i < shifts_Count.length; i++) {
                    var count_Date = shifts_Count[i].count_Date;
                    var general_Shift_Count = shifts_Count[i].count;
                    var act_General_Shift = ' <td id="generalShift' + i + '" align="center" width="2%" bgcolor="#CCFFFF" "' + count_Date + '">' + general_Shift_Count + '</td>';
                    $("#act_General_Shift").append(act_General_Shift);
                }
            }
        }, error: function() {
            console.log('In Error of Get_Actual_General_Shift_Count');
        }
    });
}


/*
 * For get_Actual_Total_Count Purpose
 */
function get_Actual_Total_Count(total_Month_Dates) {
    var allocated_Date = total_Month_Dates;
    var module_Id = $('#Erc_DepartmentId').val();
    if (module_Id === "0") {
        module_Id = 0;
    } else {
        module_Id;
    }
    var manager_Id = Constants.User_Id; // Temporary Purpose
    var json_Actual_Total_Count = {
        "module_id": module_Id,
        "allocateddate": allocated_Date,
        "manager_id": manager_Id
    };
    var strUrl = Service.Get_Actual_Total_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Actual_Total_Count),
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
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                var shifts_Count = jsonArray;
                for(var j=0;j<shifts_Count.length;j++){
            		$('#totalShift' + j).remove();
            	} 
                for (var i = 0; i < shifts_Count.length; i++) {
                    var count_Date = shifts_Count[i].count_Date;
                    var total_Count = shifts_Count[i].count;
                    console.log("count_Date=======>"+count_Date +"total_Count ==>"+total_Count);
                    var act_Total_Count = ' <td id="totalShift' + i + '" align="center" width="2%" bgcolor="#CCFFFF" "' + count_Date + '">' + total_Count + '</td>';
                    $("#act_Total_Count").append(act_Total_Count);
                }
            }
        }, error: function() {
            console.log('In Error of Get_Actual_Total_Count');
        }
    });
}


/*
 * For get_Recommended_Morning_Shift_Count Purpose
 */
function Get_Recommended_Morning_Shift_Count() {
    var strUrl = Service.Get_Recommended_Morning_Shift_Count;
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
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
                morningcount = data.morning_Shift_Count;
            }
        }, error: function() {
            console.log('In Error of Get_Actual_Total_Count');
        }
    });
}


/*
 * For get_Recommended_Total_Calls_Sum_Count Purpose
 */
function get_Recommended_Total_Calls_Sum_Count() {
    var strUrl = Service.Get_Recommended_Total_Calls_Sum_Count;
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
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
                totalcallsperday1 = data.total_Count;
            }
        }, error: function() {
            console.log('In Error of Get_Recommended_Total_Calls_Sum_Count');
        }
    });
}


/*
 * For get_Recommended_Total_Calls_Count Purpose
 */
function get_Recommended_Total_Calls_Count() {
    var strUrl = Service.Get_Recommended_Total_Calls_Count;
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
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
                shifthours = data.total_Calls_Count;
            }
        }, error: function() {
            console.log('In Error of Get_Recommended_Total_Calls_Sum_Count');
        }
    });
}

/*
 * For Get_Effective_Call_Details Purpose
 */
function get_Effective_Call_Details() {
    var shift_Id = 1; // In Php Code They Are Passing Hard Code Value shift_Id
						// = 1
    var json_Effective_Call_Details = {
        "shift_id": shift_Id
    };
    var strUrl = Service.Get_Effective_Call_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Effective_Call_Details),
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
                var jsonArray = data.objResourceProfilesControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    ch1_effectivecall = resData.effective_call;
                    ch1_effectiveaht = resData.effective_at;
                    ch1_ineffectivecalls = resData.ineffective_call;
                    ch1_ineffectiveaht = resData.ineffective_at;
                });
                // Calling getMonthly_Shift_Wise_Employee_Night_Count
                getMonthly_Shift_Wise_Employee_Night_Count();
            }
        }, error: function() {
            console.log('In Error of Get_Employee_Details Details ');
        }
    });
}
/*
 * For getMonthly_Shift_Wise_Employee_Night_Count Purpose
 */
function getMonthly_Shift_Wise_Employee_Night_Count() {
    var strUrl = Service.GetMonthly_Shift_Wise_Employee_Night_Count;
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
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
                nightcount = data.night_Shift_Count;
                getMonthly_Shift_Wise_Employee_Evening_Count();
            }
        }, error: function() {
            console.log('In Error of GetMonthly_Shift_Wise_Employee_Night_Count Details ');
        }
    });
}

/*
 * For GetMonthly_Shift_Wise_Employee_Evening_Count Purpose
 */
function getMonthly_Shift_Wise_Employee_Evening_Count() {
    var strUrl = Service.GetMonthly_Shift_Wise_Employee_Evening_Count;
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
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
                eveningcount = data.evening_Shift_Count;
                // Calling get_Recommended_Day_Shift_Count
                get_Recommended_Day_Shift_Count();
            }
        }, error: function() {
            console.log('In Error of GetMonthly_Shift_Wise_Employee_Night_Count Details ');
        }
    });
}

function get_Recommended_Day_Shift_Count() {
    var total_Days = daysArray;
    for(var j=0;j<total_Days.length;j++){
		$('#rec_DayShift' + j).remove();
		$('#rec_NightShift' + j).remove();
		$('#rec_GeneralShift' + j).remove();
		$('#rec_TotalShift' + j).remove();
    console.log("get_Recommended_Day_Shift_Count ===========>");		
	} 
    for (var i = 0; i < total_Days.length; i++) {
        var notarray = total_Days[i];
        var aptrSplit = notarray.split(",");
        var intDays = aptrSplit[0];
        var week_Name = aptrSplit[1];
        var date = new Date();
        var month1 = date.getMonth() + 1;
        // ttl_Dates.push(all_Dates);

        totalavgcallsperday = (totalcallsperday1 / 30);
        morningavgcount = (morningcount / 30);
        nightavgcount = (nightcount / 30);
        eveningavgcount = (eveningcount / 30);
        shiftwsiecallvolumee = (morningavgcount / totalavgcallsperday) * 100;
        shiftwisecalls = (totalavgcallsperday * shiftwsiecallvolumee) / 100;
        shiftwsiecallvolumee3 = (nightavgcount / totalavgcallsperday) * 100;
        shiftwisecalls3 = (totalavgcallsperday * shiftwsiecallvolumee3) / 100;
        shiftwsiecallvolumee2 = (eveningavgcount / totalavgcallsperday) * 100;
        shiftwisecalls2 = (totalavgcallsperday * shiftwsiecallvolumee2) / 100;
        shifthours = 8;
        var shifttime = shifthours * 60;
        var agentefficiency = shifttime * 0.8;
        var noofeffectivecallshandled = (agentefficiency * ch1_effectivecall / 100) / ch1_effectiveaht;
        var noofineffectivecallshandled = (agentefficiency * ch1_ineffectivecalls / 100) / ch1_ineffectiveaht;
        var totalcallshandled = (noofeffectivecallshandled + noofineffectivecallshandled);
        var resourcereq = (shiftwisecalls / totalcallshandled);
        var resourcereq3 = (shiftwisecalls3 / totalcallshandled);
        var resourcereq2 = (shiftwisecalls2 / totalcallshandled);
        resourcerequired = resourcereq.toFixed();
        resourcerequired3 = resourcereq3.toFixed();
        resourcerequired2 = resourcereq2.toFixed();
        var totalrec = resourcerequired + resourcerequired2 + resourcerequired3;
        totalrecemmonded = parseInt(totalrec, 10);
        // Day Shift Count Appending Here
        var rec_Day_Shift = ' <td id="rec_DayShift' + i + '" align="center" width="2%" bgcolor="#CCFFFF">' + resourcerequired + '</td>';
        $("#rec_Day_Shift").append(rec_Day_Shift);
        // Night Shift Count Appending Here
        var rec_Night_Shift = ' <td id="rec_NightShift' + i + '" align="center" width="2%" bgcolor="#CCFFFF">' + resourcerequired3 + '</td>';
        $("#rec_Night_Shift").append(rec_Night_Shift);
        // General Shift Count Appending Here And In Php Code They Are Appening
		// General Shift Count=0
        var rec_General_Shift = ' <td id="rec_GeneralShift' + i + '" align="center" width="2%" bgcolor="#CCFFFF">' + 0 + '</td>';
        $("#rec_General_Shift").append(rec_General_Shift);
// Total Count Appending Here
        var rec_Total_Count = ' <td id="rec_TotalShift' + i + '" align="center" width="2%" bgcolor="#CCFFFF">' + totalrecemmonded + '</td>';
        $("#rec_Total_Count").append(rec_Total_Count);
    }
}


/*
 * For get_Required_Day_Shift_Count Purpose
 */
function get_Required_Day_Shift_Count(total_Month_Dates) {
    var allocated_Date = total_Month_Dates;
    var module_Id = $('#Erc_DepartmentId').val();
    if (module_Id === "0") {
        module_Id = 0;
    } else {
        module_Id;
    }
    var manager_Id = Constants.User_Id; // Temporary Purpose
    var json_Day_Shift_Count = {
        "module_id": module_Id,
        "allocateddate": allocated_Date,
        "manager_id": manager_Id
    };
    var strUrl = Service.Get_Actual_Day_Shift_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Day_Shift_Count),
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
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                var shifts_Count = jsonArray;
                for(var j=0;j<shifts_Count.length;j++){
            		$('#req_DayShift' + j).remove();
            	} 
                for (var i = 0; i < shifts_Count.length; i++) {
                    var count_Date = shifts_Count[i].count_Date;
                    var day_Shift_Count = shifts_Count[i].count;
                    var morningdiff1 = day_Shift_Count - resourcerequired;
                    var morningdiff = (morningdiff1);
                    var req_Day_Shift = ' <td  id="req_DayShift' + i + '" align="center" width="2%" bgcolor="#CCFFFF" "' + count_Date + '">' + morningdiff + '</td>';
                    $("#req_Day_Shift").append(req_Day_Shift);
                }
                get_Required_Night_Shift_Count(total_Month_Dates);
            }
        }, error: function() {
            console.log('In Error of get_Required_Day_Shift_Count');
        }
    });
}

/*
 * For get_Actual_Night_Shift_Count Purpose
 */
function get_Required_Night_Shift_Count(total_Month_Dates) {
    var allocated_Date = total_Month_Dates;
    var module_Id = $('#Erc_DepartmentId').val();
    if (module_Id === "0") {
        module_Id = 0;
    } else {
        module_Id;
    }
    var manager_Id = Constants.User_Id; // Temporary Purpose
    var json_Night_Shift_Count = {
        "module_id": module_Id,
        "allocateddate": allocated_Date,
        "manager_id": manager_Id
    };
    var strUrl = Service.Get_Actual_Night_Shift_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Night_Shift_Count),
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
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                var shifts_Count = jsonArray;
                for(var j=0;j<shifts_Count.length;j++){
            		$('#req_NightShift' + j).remove();
            	} 
                for (var i = 0; i < shifts_Count.length; i++) {
                    var count_Date = shifts_Count[i].count_Date;
                    var night_Shift_Count = shifts_Count[i].count;
                    var nightdiff1 = night_Shift_Count - resourcerequired3;
                    var nightdiff = (nightdiff1);
                    var req_Night_Shift = ' <td id="req_NightShift' + i + '" align="center" width="2%" bgcolor="#CCFFFF" "' + count_Date + '">' + nightdiff + '</td>';
                    $("#req_Night_Shift").append(req_Night_Shift);
                }
                get_Required_General_Shift_Count(total_Month_Dates);
            }
        }, error: function() {
            console.log('In Error of get_Required_Night_Shift_Count');
        }
    });
}

/*
 * For get_Required_General_Shift_Count Purpose
 */
function get_Required_General_Shift_Count(total_Month_Dates) {
    var allocated_Date = total_Month_Dates;
    var module_Id = $('#Erc_DepartmentId').val();
    if (module_Id === "0") {
        module_Id = 0;
    } else {
        module_Id;
    }
    var manager_Id = Constants.User_Id; // Temporary Purpose
    var json_Night_Shift_Count = {
        "module_id": module_Id,
        "allocateddate": allocated_Date,
        "manager_id": manager_Id
    };
    var strUrl = Service.Get_Actual_General_Shift_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Night_Shift_Count),
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
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                var shifts_Count = jsonArray;
                for(var j=0;j<shifts_Count.length;j++){
            		$('#req_GeneralShift' + j).remove();
            	} 
                for (var i = 0; i < shifts_Count.length; i++) {
                    var count_Date = shifts_Count[i].count_Date;
                    var general_Shift_Count = shifts_Count[i].count;
                    var req_General_Shift = ' <td id="req_GeneralShift' + i + '" align="center" width="2%" bgcolor="#CCFFFF" "' + count_Date + '">' + general_Shift_Count + '</td>';
                    $("#req_General_Shift").append(req_General_Shift);
                }
                get_Required_Total_Count(total_Month_Dates);
            }
        }, error: function() {
            console.log('In Error of Get_Required_General_Shift_Count');
        }
    });
}


/*
 * For get_Required_Total_Count Purpose
 */
function get_Required_Total_Count(total_Month_Dates) {
    var allocated_Date = total_Month_Dates;
    var module_Id = $('#Erc_DepartmentId').val();
    if (module_Id === "0") {
        module_Id = 0;
    } else {
        module_Id;
    }
    var manager_Id = Constants.User_Id; // Temporary Purpose
    var json_Required_Total_Count = {
        "module_id": module_Id,
        "allocateddate": allocated_Date,
        "manager_id": manager_Id
    };
    var strUrl = Service.Get_Actual_Total_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Required_Total_Count),
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
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                var shifts_Count = jsonArray;
                for(var j=0;j<shifts_Count.length;j++){
            		$('#req_TotalShift' + j).remove();
            	} 
                for (var i = 0; i < shifts_Count.length; i++) {
                    var count_Date = shifts_Count[i].count_Date;
                    var total_Count = shifts_Count[i].count;
                    var req_Total_Count = ' <td id="req_TotalShift' + i + '" align="center" width="2%" bgcolor="#CCFFFF" "' + count_Date + '">' + total_Count + '</td>';
                    $("#req_Total_Count").append(req_Total_Count);
                }
            }
        }, error: function() {
            console.log('In Error of get_Required_Total_Count');
        }
    });
}

/*
 * For Getting Get_Eraned_Leave_Balance_Details Purpose
 */
function Get_Eraned_Leave_Balance_Details() {
  // var user_Id = "161"; //Temporary Purpose
	var user_Id = localStorage.getItem('userID');
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
            } else {
                var jsonArray = data.objLeaveApplyControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var rstData = resData.leave_presentstatus;
                    var eraned_count = rstData.split(".");
                    if (eraned_count[0] === '0' || eraned_count[0] === "0" || eraned_count[0] === undefined || eraned_count[0] === "NA") {
                        // $('#eraned_Leave').html('0');
                    }
                    else {
                    }
                });
            }
        },
        error: function(err) {
            console.error("Error in Get_Eraned_Leave_Balance_Details" + JSON.stringify(err));
        }
    });
}
/*
 * For get_ERC_Employees_Availability_Details
 */
function get_ERC_Employees_Availability_Details() {
    var user_Id = Constants.User_Id; // Temproray Purpose
    var json_Availability_Details = {
        "user_id": user_Id
    };
    var strUrl = Service.Get_ERC_Employees_Availability_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Availability_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            }
            var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
            $.each(jsonArray, function(index, resData) {
                var index = index + 1;
                var user_Id = resData.user_id;
                var module_Id = resData.module_id;
                get_Earned_Leave_Count(user_Id);
                get_Employee_Sheduled_Allocated_Details(index, user_Id, module_Id);
            });
        },
        error: function(err) {
            console.error("Error in get_ERC_Employees_Availability_Details" + JSON.stringify(err));
        }
    });
}


/*
 * For Get_Earned_Leave_Count Purpose
 */
function get_Earned_Leave_Count(user_id) {
// console.log("user_id ;;;;; " + user_id);
    var json_Earned_Leave_Count = {
        "user_id": user_id
    };
    var strUrl = Service.Get_Earned_Leave_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Earned_Leave_Count),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var earned_Leave_Count = "0";
                $("#earned_Leave_Count").val(earned_Leave_Count);
                get_Sick_Leave_Count(user_id);
            } else {
                earned_Leave_Count = data.earned_Leave_Count;
                $("#earned_Leave_Count").val(earned_Leave_Count);
                get_Sick_Leave_Count(user_id);
            }
        }, error: function() {
            console.log('In Error of get_Earned_Leave_Count');
        }
    });
}

/*
 * For Get_Sick_Leave_Count Purpose
 */
function get_Sick_Leave_Count(user_id) {
    var json_Sick_Leave_Count = {
        "user_id": user_id
    };
    var strUrl = Service.Get_Sick_Leave_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Sick_Leave_Count),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var sick_Leave_Count = "0";
                $("#sick_Leave_Count").val(sick_Leave_Count);
                get_Casual_Leave_Count(user_id);
            } else {
                sick_Leave_Count = data.sick_Leave_Count;
                $("#sick_Leave_Count").val(sick_Leave_Count);
                get_Casual_Leave_Count(user_id);
            }
        }, error: function() {
            console.log('In Error of Get_Sick_Leave_Count');
        }
    });
}

/*
 * For get_Casual_Leave_Count Purpose
 */
function get_Casual_Leave_Count(user_id) {
    var json_Casual_Leave_Count = {
        "user_id": user_id
    };
    var strUrl = Service.Get_Casual_Leave_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Casual_Leave_Count),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var casual_Leave_Count = "0";
                $("#casual_Leave_Count").val(casual_Leave_Count);
                get_Compensatory_Leave_Count(user_id);
            } else {
                casual_Leave_Count = data.casual_Leave_Count;
                $("#casual_Leave_Count").val(casual_Leave_Count);
                get_Compensatory_Leave_Count(user_id);
            }
        }, error: function() {
            console.log('In Error of Get_Casual_Leave_Count');
        }
    });
}

/*
 * For get_Compensatory_Leave_Count Purpose
 */
function get_Compensatory_Leave_Count(user_id) {
    var json_Compensatory_Leave_Count = {
        "user_id": user_id
    };
    var strUrl = Service.Get_Compensatory_Leave_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Compensatory_Leave_Count),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var compensatory_leave_count = "0";
                $("#compensatory_leave_count").val(compensatory_leave_count);
            } else {
                casual_Leave_Count = data.compensatory_leave_count;
                $("#compensatory_leave_count").val(compensatory_leave_count);
            }
        }, error: function() {
            console.log('In Error of Get_Compensatory_Leave_Count');
        }
    });
}

/*
 * For get_Employee_Sheduled_Allocated_Details Purpose
 */
function get_All_Employee_Sheduled_Allocated_Details(module_Id, crt_Month_Date) {
    // By Default We Are Diplaying ERO Details That's Why I'm Passing Module_Id
	// =4
    if (module_Id === "0" && crt_Month_Date === " " || module_Id === undefined || crt_Month_Date === undefined) {
        module_Id = 4;
        crt_Month_Date = current_Month_Date;
    }
    //  console.log('module_Id ====>' + module_Id + '====> crt_Month_Date ===>' + crt_Month_Date);
    var json_Employee_Sheduled_Allocated_Details = {
        "moduleid": module_Id,
        "current_date": crt_Month_Date
    };
    var strUrl = Service.Get_All_Employee_Sheduled_Allocated_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Employee_Sheduled_Allocated_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var status = responsecode.status;
            } else {
                var jsonArray = data.objResourceProfilesControllerDTO;
                // vinod ERO 1 to 31
                get_Schedule_Allocated_Details(jsonArray);
            }
        }, error: function() {
            console.log('In Error of get_Employee_Sheduled_Allocated_Details Details ');
        }
    });
}

var ttl_Dates = [];

function all_Dates() {
    var year = currentYear;
    var total_Days = daysArray;
    for (var i = 0; i < total_Days.length; i++) {
        var notarray = total_Days[i];
        var aptrSplit = notarray.split(",");
        var intDays = aptrSplit[0];
        var week_Name = aptrSplit[1];
        var date = new Date();
        var month1 = date.getMonth() + 1;
        var all_Dates = year + '-' + month1 + '-' + intDays;
        ttl_Dates.push(all_Dates);
    }

}



var wsa_typeofshift;
var wsa_allocateddate;
var wsa_shiftid;
var momoduleid;
var un_Assigned = "U";
var user_Name;
var sheduled_Id;

function get_Schedule_Allocated_Details(jsonArray) {
    var users = new Map();
    $.each(jsonArray, function(index, value) {
        users.set(value.user_id, value);
    });
    users.forEach(function(value, key) {
        get_Earned_Leave_Count(value.user_id);
        get_Employee_Sheduled_Allocated_Details(value.user_id, value.moduleid, current_Month_Date);
    });

}

/*
 * For getAllEmployeySheduledAllocatedDetails Purpose
 */

function get_Employee_Sheduled_Allocated_Details(user_Id, module_Id, current_Month_Date) {
    var json_Allocated_Details = {
        "user_id": user_Id,
        "moduleid": module_Id,
        "current_date": current_Month_Date
    };
    var strUrl = Service.GetEmployee_Sheduled_Allocated_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Allocated_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var status = responsecode.status;
            } else {
                var empArray = data.objResourceProfilesControllerDTO;
                get_Employee_Sheduled_Allocated_Details_Dom(empArray);
               

            }
        }, error: function() {
            console.log('In Error of get_Employee_Sheduled_Allocated_Details ');
        }
    });
}
var table_Index = 1;
function get_Employee_Sheduled_Allocated_Details_Dom(empArr) {

	//delete table_Index
    var user_id = JSON.stringify(empArr[0].user_id);
    var user_name = JSON.stringify(empArr[0].user_name);
    var moduleid = JSON.stringify(empArr[0].moduleid);
    var module_name = JSON.stringify(empArr[0].module_name);
    var ususerid = user_id;
    var d = new Date();
    var date = new Date();
    var toAdd = 2;
    var afterminus = d.setDate(d.getDate() - parseInt(toAdd));
    var selYear = date.getFullYear();
    var selMonth1 = date.getMonth() + 1;
    var lesstwo = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    var todate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var bfrspt = lesstwo.split('-');
    if (bfrspt[1] < 10) {
        var getMonth = '0' + bfrspt[1];
    } else {
        getMonth = bfrspt[1];
    }
    if (bfrspt[2] < 10) {
        var getDate = '0' + bfrspt[2];
    } else {
        getDate = bfrspt[2];
    }
    var lesstwodays = d.getFullYear() + "-" + getMonth + "-" + getDate;

    // TABLE ROW DATA APPENDING HERE
    var tbleRow = document.createElement("tr");

    var tablcol1 = document.createElement("td");
    $(tablcol1).attr('style', 'font-weight:bold');
    $(tablcol1).html(table_Index);
    $(tbleRow).append(tablcol1);
  
    var tablcol2 = document.createElement("td");
    $(tablcol2).attr('style', 'font-weight:bold');
    $(tablcol2).html(JSON.parse(user_name));
    $(tbleRow).append(tablcol2);

    var tablcol3 = document.createElement("td");
    $(tablcol3).attr('style', 'font-weight:bold');
    $(tablcol3).html(JSON.parse(module_name));
    $(tbleRow).append(tablcol3);

    var tablcol4 = document.createElement("td");
    var elb = $("#earned_Leave_Count").val();
    var elbalancecount = JSON.parse(elb);
    var slb = $("#sick_Leave_Count").val();
    var slbalancecount = JSON.parse(slb);
    var clb = $("#casual_Leave_Count").val();
    var clbalancecount = JSON.parse(clb);
    var cobalancecount = $("#compensatory_leave_count").val();
    var leavebalcount = elbalancecount + slbalancecount + clbalancecount;
    var leave_Balance = JSON.parse(leavebalcount);
    if (leave_Balance === "NA") {
        $(tablcol4).html('Not Found');
    } else {
        if (leavebalcount <= "0") {
            $(tablcol4).attr('style', 'font-weight:bold');
            $(tablcol4).attr('style', 'color: red');
            $(tablcol4).html('<a href=javascript:onclick=getleavebalpage(' + ususerid + ',"' + selYear + '","' + getMonth + '")><font color="red">' + leave_Balance + '</font></a>');
        } else {
            $(tablcol4).attr('style', 'font-weight:bold');
            $(tablcol4).attr('style', 'color: green');
            $(tablcol4).html('<a href=javascript:onclick=getleavebalpage(' + ususerid + ',"' + selYear + '","' + getMonth + '")><font color="green">' + leave_Balance + '</font></a>');
        }
    }
    $(tbleRow).append(tablcol4);
    var tablcol5 = document.createElement("td");
    var co_Balance = cobalancecount;
    if (co_Balance === "NA") {
        $(tablcol5).html('Not Found');
    } else {
        if (cobalancecount <= "0") {
            $(tablcol5).attr('style', 'font-weight:bold');
            $(tablcol5).attr('style', 'color: red');
            $(tablcol5).html('<a href=javascript:onclick=getcobalpage(' + ususerid + ',"' + selYear + '","' + getMonth + '")><font color="red">' + cobalancecount + '</font></a>');
        } else {
            $(tablcol5).attr('style', 'font-weight:bold');
            $(tablcol5).attr('style', 'color: green');
            $(tablcol5).html('<a href=javascript:onclick=getcobalpage(' + ususerid + ',"' + selYear + '","' + getMonth + '")><font color="red">' + cobalancecount + '</font></a>');
        }
    }
    $(tbleRow).append(tablcol5);

    for (var e = 0; e < empArr.length; e++) {
        var tablcol6 = document.createElement("td");
        var wsa_typeofshift = empArr[e].typeof_shift;
        var dbdate = empArr[e].allocated_date;
        var afrspt = dbdate.split('-');
        var db_year = afrspt[0];
        var db_month = afrspt[1];
        var db_date = afrspt[2];
        var db_date1 = db_date.split(' ');
        var wsa_allocateddate = db_year + "-" + db_month + "-" + db_date1[0];
        var user_Name = empArr[e].user_name;
        var wsa_shiftid = empArr[e].shift_id;
        var momoduleid = empArr[e].moduleid;
        var sheduled_Id = empArr[e].sheduled_id;
        if (wsa_typeofshift === "NA") {
            $(tablcol6).html('Not Found');
        } else {
            if (wsa_allocateddate < lesstwodays) {
                switch (wsa_typeofshift) {
                    case "D":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case "D1":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case "E":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#ccccccc');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case "E1":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#ccccccc');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case "E2":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#ccccccc');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case "N":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#DEB887');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case "G":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#BCD7BC');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case "H":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#669999');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'RO':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#669999');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'M1':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'M':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'LOP':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#CD5C5C');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'TRG':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#E68A8A');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'CO':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#8FBC8F');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'N2':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#DEB887');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'D2':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'AB':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#CD5C5C');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'PL':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#87CEFA');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'ES':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#BFFF80');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'SL':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#87CEFA');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'CL':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#40E0D0');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'EL':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#FFC0CB');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'U':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#ADD8E6');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    case 'L':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#F5F5DC');
                        $(tablcol6).html(wsa_typeofshift);
                        break;
                    default:
                }
            } else {
                switch (wsa_typeofshift) {
                    case "D":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case "D1":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case "E":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#ccccccc');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case "E1":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#ccccccc');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case "E2":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#ccccccc');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case "N":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#DEB887');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case "G":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#BCD7BC');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case "H":
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#669999');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'RO':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#669999');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'M1':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'M':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'LOP':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#CD5C5C');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'TRG':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#E68A8A');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'CO':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#8FBC8F');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'N2':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#DEB887');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'D2':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'AB':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#CD5C5C');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'PL':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#87CEFA');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'ES':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#BFFF80');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'SL':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#87CEFA');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'CL':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#40E0D0');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'EL':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#FFC0CB');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + sheduled_Id + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'U':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#ADD8E6');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + 20 + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    case 'L':
                        $(tablcol6).attr('style', 'font-weight:bold');
                        $(tablcol6).attr('bgcolor', '#F5F5DC');
                        $(tablcol6).html('<a href=javascript:onclick=getupdatepageerc(' + ususerid + ',"' + selYear + '","' + selMonth1 + '","' + wsa_allocateddate + '","' + momoduleid + '","' + wsa_shiftid + '","' + 20 + '","' + wsa_typeofshift + '")>' + wsa_typeofshift + '</a>');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol6);
        }
        $("#ERC_TableId").append(tbleRow);
    }
    table_Index++;
}

function getleavebalpage(ususerid, selYear, selMonth1, user_name) {
    $('#leave_Balance').modal('show');
    GettingUserName(ususerid);
    get_Earned_Month_Leave_Count(ususerid, selYear, selMonth1);
}
function getcobalpage(ususerid, selYear, selMonth1, user_name) {
    $('#co_Balance').modal('show');
    GettingUserName(ususerid);
    Get_Compensatoryoff_Month_Leave_Count(ususerid, selYear, selMonth1);
}

function getupdatepageerc(ususerid, selYearaa, selMonth1aa, wsa_allocateddate, moduleid, wsa_shiftid, sheduled_Id, wsa_typeofshift) {

    $('#end_Date').val(" ");
    // Modal Box Opening
    $('#update_ERC').modal('show');

    var d = new Date();
    var date = new Date();
    var toAdd = 2;
    var afterminus = d.setDate(d.getDate() - parseInt(toAdd));
    var selYear = date.getFullYear();
    var selMonth1 = date.getMonth() + 1;
    var lesstwo = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    var todate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var bfrspt = lesstwo.split('-');
    if (bfrspt[1] < 10) {
        var getMonth = '0' + bfrspt[1];
    }
    var lesstwodays = d.getFullYear() + "-" + getMonth + "-" + d.getDate();
    GettingUserName(ususerid);
    get_Earned_Month_Leave_Count(ususerid, selYear, getMonth);
    get_Earned_Leave_Balance_Details1(ususerid);
    get_Sick_Leave_Balance_Details1(ususerid);
    get_Casual_Leave_Balance_Details1(ususerid);
    get_Compensatoryoff_Leave_Balance_Details1(ususerid);
    $('#update_Date').text(wsa_allocateddate);
    $('#erc_UserId').val(ususerid);
    $('#erc_ModuleId').val(moduleid);
    $('#selctedshiftid').val(wsa_shiftid);
    $('#sheduled_Id').val(sheduled_Id);
    $('#wsa_typeofshift').val(wsa_typeofshift);
    get_ShiftType_Details(wsa_shiftid);
    get_ErsShiftType_Details(ususerid, wsa_shiftid, wsa_allocateddate);
}
/*
 * For GettingUserName Purpose
 */
function GettingUserName(user_id) {
    $("#emp_Name").empty();
    $("#emp_Name1").empty();
    $("#update_Name").empty();
    var json_GettingUserName_Details = {
        "user_id": user_id
    };
    var strUrl = Service.GettingUserName;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_GettingUserName_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {"X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                var jsonArray = data.objResourceProfilesControllerDTO;
                var user_firstname = jsonArray[0].user_firstname;
                var user_lastname = jsonArray[0].user_lastname;
                var user_Name = user_firstname + " " + user_lastname;
                $("#emp_Name").text(user_Name);
                $("#emp_Name1").text(user_Name);
                $("#update_Name").text(user_Name);
                $("#emp_Name").attr('style', 'color: red');
                $("#emp_Name1").attr('style', 'color: red');
            }
        }, error: function() {
            console.log('In Error of GettingUserName Details ');
        }
    });
}

/*
 * For Get_Earned_Month_Leave_Count Purpose
 */ function get_Earned_Month_Leave_Count(user_id, selYear, selMonth1) {
    var month_Date = selYear + "-" + selMonth1;
    var json_Earned_Month_Leave_Count = {
        "user_id": user_id,
        "month_Date": month_Date
    };
    var strUrl = Service.Get_Earned_Month_Leave_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Earned_Month_Leave_Count),
        contentType: "application/json", async: false,
        crossDomain: true, headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var earned_Leave_Count = "0";
                $("#earned_Leave").text(earned_Leave_Count);
                get_Casual_Month_Leave_Count(user_id, selYear, selMonth1);
            } else {
                earned_Leave_Count = data.earned_Leave_Count;
                $("#earned_Leave").text(earned_Leave_Count);
                get_Casual_Month_Leave_Count(user_id, selYear, selMonth1);
            }
        }, error: function() {
            console.log('In Error of get_Earned_Month_Leave_Count');
        }
    });
}

/*
 * For Get_Casual_Month_Leave_Count Purpose
 */
function get_Casual_Month_Leave_Count(user_id, selYear, selMonth1) {
    var month_Date = selYear + "-" + selMonth1;
    var json_Casual_Month_Leave_Count = {
        "user_id": user_id,
        "month_Date": month_Date
    };
    var strUrl = Service.Get_Casual_Month_Leave_Count;
    $.ajax({type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Casual_Month_Leave_Count),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var casual_Leave_Count = "0";
                $("#casual_Leave").text(casual_Leave_Count);
                Get_Sick_Month_Leave_Count(user_id, selYear, selMonth1);
            } else {
                casual_Leave_Count = data.casual_Leave_Count;
                $("#casual_Leave").text(casual_Leave_Count);
                Get_Sick_Month_Leave_Count(user_id, selYear, selMonth1);
            }
        }, error: function() {
            console.log('In Error of Get_Casual_Month_Leave_Count');
        }
    });
}

/*
 * For Get_Sick_Month_Leave_Count Purpose
 */
function Get_Sick_Month_Leave_Count(user_id, selYear, selMonth1) {
    var month_Date = selYear + "-" + selMonth1;
    var json_Sick_Month_Leave_Count = {
        "user_id": user_id,
        "month_Date": month_Date
    };
    var strUrl = Service.Get_Sick_Month_Leave_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Sick_Month_Leave_Count),
        contentType: "application/json", async: false,
        crossDomain: true, headers: {
            "X-TENANT-ID": "PROCREATE"},
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var sick_Leave_Count = "0";
                $("#sick_Leave").text(sick_Leave_Count);
                get_Sick_Leave_Balance_Details(user_id);
            } else {
                sick_Leave_Count = data.sick_Leave_Count;
                $("#sick_Leave").text(sick_Leave_Count);
                var monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
                var d = new Date();
                var mont_Name = monthNames[d.getMonth()] + " " + selYear;
                $("#month").text(mont_Name);
                var casual_Leave = $("#casual_Leave").text();
                var earned_Leave = $("#earned_Leave").text();
                var totalusedleaves = JSON.parse(earned_Leave) + JSON.parse(casual_Leave) + JSON.parse(sick_Leave_Count);
                var total_Leaves_InMonth = " " + mont_Name + " :" + totalusedleaves;
                $("#total_Leaves_InMonth").text(total_Leaves_InMonth);
                get_Sick_Leave_Balance_Details(user_id);
            }
        }, error: function() {
            console.log('In Error of Get_Sick_Month_Leave_Count');
        }
    });
}


/*
 * For get_Sick_Leave_Balance_Details Purpose
 */
function get_Sick_Leave_Balance_Details(user_id) {
    var leave_typeid = 14; // In PHP They Are Passing Hard Code Value
    var json_Sick_Leave_Balance_Details = {
        "user_id": user_id, "leave_typeid": leave_typeid
    };
    var strUrl = Service.Get_Leave_Balance_AllDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Sick_Leave_Balance_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        }, success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var levaev_present_status = "0";
                $("#lct_presentstatus_sl").val(levaev_present_status);
                get_Casual_Leave_Balance_Details(user_id);
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                levaev_present_status = jsonArray[0].levaev_present_status;
                $("#lct_presentstatus_sl").val(levaev_present_status);
                get_Casual_Leave_Balance_Details(user_id);
            }
        }, error: function(err) {
            console.log('In Error of get_Sick_Leave_Balance_Details  ' + err);
        }
    });
}

/*
 * For get_Casual_Leave_Balance_Details Purpose
 */
function get_Casual_Leave_Balance_Details(user_id) {
    var leave_typeid = 19; // In PHP They Are Passing Hard Code Value
    var json_Casual_Leave_Balance_Details = {
        "user_id": user_id,
        "leave_typeid": leave_typeid
    };
    var strUrl = Service.Get_Leave_Balance_AllDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Casual_Leave_Balance_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var levaev_present_status = "0";
                $("#lct_presentstatus_cl").val(levaev_present_status);
                get_Earned_Leave_Balance_Details(user_id);
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                levaev_present_status = jsonArray[0].levaev_present_status;
                $("#lct_presentstatus_cl").val(levaev_present_status);
                get_Earned_Leave_Balance_Details(user_id);
            }
        }, error: function(err) {
            console.log('In Error of get_Casual_Leave_Balance_Details  ' + err);
        }
    });
}

/*
 * For get_Earned_Leave_Balance_Details Purpose
 */
function get_Earned_Leave_Balance_Details(user_id) {
    var leave_typeid = 5; // In PHP They Are Passing Hard Code Value
    var json_Earned_Leave_Balance_Details = {
        "user_id": user_id,
        "leave_typeid": leave_typeid
    };
    var strUrl = Service.Get_Leave_Balance_AllDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Earned_Leave_Balance_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var lct_presentstatus_el = "0";
                $("#lct_presentstatus_el").val(lct_presentstatus_el);
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                lct_presentstatus_el = jsonArray[0].levaev_present_status;
                $("#lct_presentstatus_el").val(lct_presentstatus_el);
            }
            var lct_presentstatus_cl = $("#lct_presentstatus_cl").val();
            var lct_presentstatus_sl = $("#lct_presentstatus_sl").val();
            var totalballeaves = JSON.parse(lct_presentstatus_sl) + JSON.parse(lct_presentstatus_cl) + JSON.parse(lct_presentstatus_el);
            $("#total_Leaves").text(totalballeaves);
        }, error: function(err) {
            console.log('In Error of get_Casual_Leave_Balance_Details  ' + err);
        }
    });
}

/*
 * For get_Compensatoryoff_Month_Leave_Count Purpose
 */
function Get_Compensatoryoff_Month_Leave_Count(user_id, selYear, selMonth1) {
    var month_Date = selYear + "-" + selMonth1;
    var json_Compensatoryoff_Month_Leave_Count = {
        "user_id": user_id,
        "month_Date": month_Date
    };
    var strUrl = Service.Get_Compensatoryoff_Month_Leave_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Compensatoryoff_Month_Leave_Count),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var Compensatoryoff = "0";
                $("#Compensatoryoff").text(Compensatoryoff);
                get_Compensatoryoff_Leave_Balance_Details(user_id, selYear);
            } else {
                Compensatoryoff = data.compensatory_leave_count;
                $("#Compensatoryoff").text(Compensatoryoff);
                get_Compensatoryoff_Leave_Balance_Details(user_id, selYear);
            }
        }, error: function() {
            console.log('In Error of Get_Compensatoryoff_Month_Leave_Count');
        }
    });
}


/*
 * For get_Compensatoryoff_Leave_Balance_Details Purpose
 */
function get_Compensatoryoff_Leave_Balance_Details(user_id, selYear) {
    var leave_typeid = 11; // In PHP They Are Passing Hard Code Value
    var json_Compensatoryoff_Leave_Balance_Details = {
        "user_id": user_id,
        "leave_typeid": leave_typeid
    };
    var strUrl = Service.Get_Leave_Balance_AllDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Compensatoryoff_Leave_Balance_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var Compensatoryoff = "0";
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                Compensatoryoff = jsonArray[0].levaev_present_status;
            }
            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            var d = new Date();
            var mont_Name = monthNames[d.getMonth()] + " " + selYear;
            $("#co_Month").text(mont_Name);
            var pr_Compensatoryoff = JSON.parse(Compensatoryoff);
            if (pr_Compensatoryoff === 0 || pr_Compensatoryoff === "0") {
                $("#pr_Compensatoryoff").text(pr_Compensatoryoff);
                $("#pr_Compensatoryoff").attr('style', 'color: red');
            } else {
                $("#pr_Compensatoryoff").text(pr_Compensatoryoff);
                $("#pr_Compensatoryoff").attr('style', 'color: green');
            }
        }, error: function(err) {
            console.log('In Error of get_Casual_Leave_Balance_Details  ' + err);
        }
    });
}

/*
 * @Author : Purushotham Akula @Desc : Get_ShiftType_Details
 */
var shift_Id;
function get_ShiftType_Details(shift_id) {
    var lct_presentstatus_el = $("#lct_presentstatus_el").val();
    var lct_presentstatus_co = $("#pr_Compensatoryoff").text();
    var lct_presentstatus_sl = $("#lct_presentstatus_sl").val();
    var lct_presentstatus_cl = $("#lct_presentstatus_cl").val();
    if (lct_presentstatus_el > 0 || lct_presentstatus_el > "0")
    {
        var elid = 5;
    } else {
        elid = 0;
    }
    if (lct_presentstatus_co > 0 || lct_presentstatus_co > "0")
    {
        var coid = 11;
    } else {
        coid = 0;
    }
    if (lct_presentstatus_sl > 0 || lct_presentstatus_sl > "0")
    {
        var slid = 14;
    } else {
        slid = 0;
    }
    if (lct_presentstatus_cl > 0 || lct_presentstatus_cl > "0")
    {
        var clid = 19;
    } else {
        clid = 0;
    }

    if (shift_id === "12") {
        var shtid = "1,2,3,4,5,6,12,18";
        shift_Id = "{" + shtid + "}";
    } else {
        var shtid = "1,2,3,4,5,6,12,18," + elid + "," + coid + "," + slid + "," + clid + " ";
        shift_Id = "{" + shtid + "}";
    }
    if (shift_id === "20" || shift_id === "18")
    {
        var shtid = "1,2,3,4,5,6,12,18," + elid + "," + coid + "," + slid + "," + clid + " ";
        shift_Id = "{" + shtid + "}";
    }
    try {
        $('#update_ShiftTypeId').empty();
        var json_ShiftType_Details = {
            "shift_id": shift_Id
        };
        var strUrl = Service.Get_ShiftType_Details;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_ShiftType_Details),
            contentType: "application/json",
            async: false,
            crossDomain: true, headers: {
                "X-TENANT-ID": "PROCREATE"
            },
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objResourceProfilesControllerDTO;
                    var selectfirst = "<option value='0'>Select One</option>";
                    $('#update_ShiftTypeId').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var Zone = "<option value=" + resData.shift_id + ">" + resData.user_desc + "</option>";
                        $(Zone).appendTo('#update_ShiftTypeId');
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_Module_Details" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_Module_Details()' + err);
    }
    $('#update_ShiftTypeId').trigger("chosen:updated");
    $('#update_ShiftTypeId').chosen();
}


/*
 * @Author : Purushotham Akula @Desc : get_ErsShiftType_Details
 */
var shift_starttime;
var shift_endtime;
var typeofshift1;
function get_ErsShiftType_Details(user_id, wsa_shiftid, wsa_allocateddate) {
    try {
        var json_ShiftType_Details = {
            "shift_Id": wsa_shiftid
        };
        var strUrl = Service.Get_ErsShiftType_Details;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_ShiftType_Details),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
                "X-TENANT-ID": "PROCREATE"
            },
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                    get_Wfleaveapply_Trans_Leave_Count(user_id, wsa_allocateddate);
                } else {
                    var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        typeofshift1 = resData.typeof_shift;
                        shift_starttime = resData.shift_starttime;
                        shift_endtime = resData.shift_endtime;
                        $("#typeof_shift").val(typeofshift1);
                        get_Wfleaveapply_Trans_Leave_Count(user_id, wsa_allocateddate);
                    });
                }
            },
            error: function(err) {
                console.error("Error in Get_ErsShiftType_Details" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in Get_ErsShiftType_Details()' + err);
    }
}
/*
 * For Get_Wfleaveapply_Trans_Leave_Count Purpose
 */
function get_Wfleaveapply_Trans_Leave_Count(user_id, wsa_allocateddate) {
    var month_Date = wsa_allocateddate;
    var json_Wfleaveapply_Trans_Leave_Count = {
        "user_id": user_id,
        "month_Date": month_Date
    };
    var strUrl = Service.Get_Wfleaveapply_Trans_Leave_Count;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Wfleaveapply_Trans_Leave_Count),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var wfleaveapply_Trans_Leave_Count = "0";
                $("#wfleaveapply_Trans_Leave_Count").val(wfleaveapply_Trans_Leave_Count);
            } else {
                wfleaveapply_Trans_Leave_Count = data.count;
                $("#wfleaveapply_Trans_Leave_Count").val(wfleaveapply_Trans_Leave_Count);
            }
        }, error: function() {
            console.log('In Error of Get_Compensatoryoff_Month_Leave_Count');
        }
    });
}

function cheCking_ERC_Conditions() {
    var leavetranscount = $("#wfleaveapply_Trans_Leave_Count").val();
    var typeofshift = $("#typeof_shift").val();
    var selctedDate = $("#update_Date").text();
    var empuserid = $('#erc_UserId').val();
    var end_date = $('#end_Date').val();
    if (end_date === "" || end_date === undefined) {
        showNotificationError("Please Select End Date", "update_Erc", "error");
        return false;
    }
    var selshiftid = $('#update_ShiftTypeId').val();
    if (selshiftid === "0" || end_date === " ") {
        showNotificationError("Please Select Shift", "update_Erc", "error");
        return false;
    }
    var sheduled_Id = $('#sheduled_Id').val();
    if (sheduled_Id === "U" || sheduled_Id === "20" || sheduled_Id === 20 || sheduled_Id === '20' || sheduled_Id === "0" || sheduled_Id === " " || sheduled_Id === undefined || sheduled_Id === null || sheduled_Id === 0 || sheduled_Id === '') {
        sheduled_Id = 0;
    }
    var d = new Date(end_date.split("-").reverse().join("-"));
    var dd1 = (d.getDate() < 10 ? '0' : '') + d.getDate();
    var MM = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
    var yyyy = d.getFullYear();
    var end_Date = yyyy + "-" + MM + "-" + dd1;
    if (selctedDate <= end_Date) {
    } else {
        showNotificationError("End Date Cannot Be Less Than Start Date", "update_Erc", "error");
        return false;
    }
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    var displaytodate = utc;
    var timeDiff = (new Date(selctedDate)) - (new Date(end_Date));
    var days = timeDiff / (1000 * 60 * 60 * 24);
    var leavestatus_id;
    var leavetypeid;
    var wsa_typeofshift = $('#wsa_typeofshift').val();

    if (typeofshift === "" || typeofshift === '' || typeofshift === undefined || typeofshift === null) {
        typeofshift = wsa_typeofshift;
    }
    if (leavetranscount === "0" || leavetranscount === 0)
    {
        if (typeofshift === "EL") {
            leavestatus_id = 2;
            leavetypeid = 5;
            insert_Wfleaveapply_trans_Details(empuserid, selctedDate, leavestatus_id, end_Date, leavetypeid, days);
        }
        if (typeofshift === "SL") {
            leavestatus_id = 2;
            leavetypeid = 14;
            insert_Wfleaveapply_trans_Details(empuserid, selctedDate, leavestatus_id, end_Date, leavetypeid, days);
        }
        if (typeofshift === "CL") {
            leavestatus_id = 2;
            leavetypeid = 19;
            insert_Wfleaveapply_trans_Details(empuserid, selctedDate, leavestatus_id, end_Date, leavetypeid, days);
        }
        if (typeofshift === "CO") {
            leavestatus_id = 2;
            leavetypeid = 11;
            insert_Wfleaveapply_trans_Details(empuserid, selctedDate, leavestatus_id, end_Date, leavetypeid, days);
        }
        if (typeofshift === "LOP") {
            leavestatus_id = 2;
            leavetypeid = 13;
            insert_Wfleaveapply_trans_Details(empuserid, selctedDate, leavestatus_id, end_Date, leavetypeid, days);
        }
    } else {
        if (typeofshift === "EL") {
            leavetypeid = 5;
            update_Wfleaveapply_trans_Details(empuserid, selctedDate, end_Date, leavetypeid);
        }
        if (typeofshift === "SL") {
            leavetypeid = 14;
            update_Wfleaveapply_trans_Details(empuserid, selctedDate, end_Date, leavetypeid);
        }
        if (typeofshift === "CL") {
            leavetypeid = 19;
            update_Wfleaveapply_trans_Details(empuserid, selctedDate, end_Date, leavetypeid);
        }
        if (typeofshift === "CO") {
            leavetypeid = 11;
            update_Wfleaveapply_trans_Details(empuserid, selctedDate, end_Date, leavetypeid);
        }
        if (typeofshift === "LOP") {
            leavetypeid = 13;
            update_Wfleaveapply_trans_Details(empuserid, selctedDate, end_Date, leavetypeid);
        }
    }
    var wsashiftid = $("#wsashiftid").val();
    if (wsashiftid === "1" && selshiftid === "12" || wsashiftid === "2" && selshiftid === "12" || wsashiftid === "3" && selshiftid === "12" || wsashiftid === "6" && selshiftid === "12" || wsashiftid === "17" && selshiftid === "12") {
        var leave_typeid = 11;
        get_Leave_Balance_Details(empuserid, leave_typeid);
        Get_Wfleave_Cobalance_Trans_Count();
        get_User_Leave_Id(empuserid, selctedDate);
    }

    if (wsashiftid === "12") {
        Get_Leave_ApplyId(empuserid, selctedDate);
    }
    if (wsashiftid === "5") {
        get_Earned_Leave_Balance_Details1(empuserid);
    }
    if (wsashiftid === "11") {
        get_Compensatoryoff_Leave_Balance_Details1(empuserid);
    }
    if (wsashiftid === "14") {
        get_Sick_Leave_Balance_Details1(empuserid);
    }
    if (wsashiftid === "19") {
        get_Casual_Leave_Balance_Details1(empuserid);
    }
    if (selshiftid === "17" || selshiftid === 17) {
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
    }
    if (wsashiftid !== "") {
        update_Sheduled_Details_BasedOn_SheduledId(sheduled_id);
    }
    var erc_ModuleId = $('#erc_ModuleId').val();
    if (module_id === "" || module_id === '' || module_id === undefined || module_id === null) {
        module_id = erc_ModuleId;
    }

    if (patternid === "" || patternid === '' || patternid === undefined || patternid === null) {
        patternid = "0";
    }
    if (typeofshift === "U") {
        get_Leave_ApplyId1(empuserid, selctedDate);
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        if (sheduled_Id === 0) {
            inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        } else {
            get_Leave_ApplyId1(empuserid, selctedDate);
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        }
        if (leavetranscountfalse !== "") {
            update_Wfleaveapply_Details(empuserid, selctedDate);
        }
    } else if (typeofshift === "D") {
        get_Leave_ApplyId1(empuserid, selctedDate);
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        if (sheduled_Id === 0) {
            inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        } else {
            get_Leave_ApplyId1(empuserid, selctedDate);
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        }
        if (leavetranscountfalse !== "") {
            update_Wfleaveapply_Details(empuserid, selctedDate);
        }
    } else if (typeofshift === "E") {
        get_Leave_ApplyId1(empuserid, selctedDate);
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        if (sheduled_Id === 0) {
            inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        } else {
            get_Leave_ApplyId1(empuserid, selctedDate);
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        }
        if (leavetranscountfalse !== "") {
            update_Wfleaveapply_Details(empuserid, selctedDate);
        }
    } else if (typeofshift === "N") {
        get_Leave_ApplyId1(empuserid, selctedDate);
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        if (sheduled_Id === 0) {
            inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        } else {
            get_Leave_ApplyId1(empuserid, selctedDate);
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        }
        if (leavetranscountfalse !== "") {
            update_Wfleaveapply_Details(empuserid, selctedDate);
        }
    } else if (typeofshift === "G") {
        get_Leave_ApplyId1(empuserid, selctedDate);
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        if (sheduled_Id === 0) {
            inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        } else {
            get_Leave_ApplyId1(empuserid, selctedDate);
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            Update_WfScheduleAllocated_Details(end_Date, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        }
        if (leavetranscountfalse !== "") {
            update_Wfleaveapply_Details(empuserid, selctedDate);
        }
    } else if (typeofshift === "RO") {
        get_Leave_ApplyId1(empuserid, selctedDate);
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        if (sheduled_Id === 0) {
            inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        } else {
            get_Leave_ApplyId1(empuserid, selctedDate);
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        }
    } else if (typeofshift === "EL") {
        get_Leave_ApplyId1(empuserid, selctedDate);
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        if (sheduled_Id === 0) {
            inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        } else {
            get_Leave_ApplyId1(empuserid, selctedDate);
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        }
    } else if (typeofshift === "CO") {
        get_Leave_ApplyId1(empuserid, selctedDate);
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        if (sheduled_Id === 0) {
            inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        } else {
            get_Leave_ApplyId1(empuserid, selctedDate);
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        }
    } else if (typeofshift === "LOP") {
        get_Leave_ApplyId1(empuserid, selctedDate);
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        if (sheduled_Id === 0) {
            inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        } else {
            get_Leave_ApplyId1(empuserid, selctedDate);
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            a
            Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        }
    } else if (typeofshift === "SL") {
        get_Leave_ApplyId1(empuserid, selctedDate);
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        if (sheduled_Id === 0) {
            inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        } else {
            get_Leave_ApplyId1(empuserid, selctedDate);
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        }
    } else if (typeofshift === "CL") {
        get_Leave_ApplyId1(empuserid, selctedDate);
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        if (sheduled_Id === 0) {
            inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        } else {
            get_Leave_ApplyId1(empuserid, selctedDate);
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        }
    } else if (typeofshift === "COB") {
        get_Leave_ApplyId1(empuserid, selctedDate);
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
    } else if (typeofshift === "COE") {
        get_Leave_ApplyId1(empuserid, selctedDate);
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        if (sheduled_Id === 0) {
            inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        } else {
            get_Leave_ApplyId1(empuserid, selctedDate);
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        }
    } else if (typeofshift === "ES") {
        if (wsashiftid === "2" || wsashiftid === "3" || wsashiftid === "17") {
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            Get_Adjust_Users_WithScheduleId(sheduled_id);
            get_Leave_ApplyId1(empuserid, selctedDate);
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            if (sheduled_Id === 0) {
                inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
            } else {
                get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
                Get_Adjust_Users_WithScheduleId(sheduled_id);
                get_Leave_ApplyId1(empuserid, selctedDate);
                Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
            }
            if (leavetranscountfalse !== "") {
                update_Wfleaveapply_Details(empuserid, selctedDate);
            }
        }
    } else if (typeofshift === "TRG") {
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        if (sheduled_Id === 0) {
            inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        } else {
            get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
            get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
            Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
        }
    } else if (sheduled_Id === 0) {
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
    } else {
        get_ErsShiftType_Details(empuserid, selshiftid, selctedDate);
        get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid);
        Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id);
    }
    if (selshiftid === "14") {
        if (selshiftid === "14" && lct_presentstatus >= 1) {
            var leave_typeid = 14;
            get_Leave_Balance_Details(empuserid, leave_typeid);
            update_Leave_Co_Balance_Trans_Details(lctpresentstatus, lctnoofleavesused, lct_id);
        } else {
            alert("Balance Sick Leaves (SL):" + lct_presentstatus);
        }
    }
    if (selshiftid === "19") {
        if (selshiftid === "19" && lct_presentstatus >= 1) {
            var leave_typeid = 5;
            get_Leave_Balance_Details(empuserid, leave_typeid);
            update_Leave_Co_Balance_Trans_Details(lctpresentstatus, lctnoofleavesused, lct_id);
        } else {
            alert("Balance Casual Leaves (CL):" + lct_presentstatus);
        }
    }
    if (selshiftid === "5") {
        if (selshiftid === "5" && lct_presentstatus >= 1) {
            var leave_typeid = 5;
            get_Leave_Balance_Details(empuserid, leave_typeid);
            update_Leave_Co_Balance_Trans_Details(lctpresentstatus, lctnoofleavesused, lct_id);
        } else {
            alert("Balance Earned Leaves (EL):" + lct_presentstatus);
        }
    }
    if (selshiftid === "11") {
        if (selshiftid === "11" && lct_presentstatus >= 1) {
            var leave_typeid = 11;
            get_Leave_Balance_Details(empuserid, leave_typeid);
            update_Leave_Co_Balance_Trans_Details(lctpresentstatus, lctnoofleavesused, lct_id);
        } else {
            alert("Balance Compensatory Off Leaves (CO):" + lct_presentstatus);
        }
    }
    // Mail Sending Here
    Get_Users_Mail_Details(empuserid, selctedDate, endDate);
    var selectstartdate = selctedDate;
    var transferendDate = end_Date;
    var subject;
    var startmessg;
    var rmusername = Constants.User_Name;
    if (selshiftid !== "" && empuserid !== "") {
        if (selectstartdate === transferendDate) {
            subject = "Duty Roster for $username on " + selectstartdate;
        } else {
            subject = "Duty Roster for $username From Date " + selectstartdate + " To Date " + transferendDate;
        }
        startmessg = "Dear " + username + ",<br><br>Assigned Schedule has been changed by : " + rmusername + "<br><br>";
        var schCount = 1;
        var htmldisplaytext = '<table CELLSPACING=0 CELLPADDING=0  BORDER=1  WIDTH=100%> <tr> <td align="center" bgcolor="#B8EBFF" colspan=8 height="60"><b><font style="font-size: 24pt;">WorkForce Management System</font></b><br></td>Generated Date:<font style="color:#F00000"> ' + displaytodate + '</font></tr><tr><td align="left" colspan=8 bgcolor="#B8EBFF"><font style="color:#F00000"><b>Employee Details</b></font></td></tr> <tr><td align="center"><font><b>Employee ID</b></font></td><td colspan=1 align="center">' + empuserid + '</td><td align="center"><b>Employee Name</b></td> <td align="center">' + username + '</td><td align="center"><b>Department</b></td><td align="center">' + userModuledesc + '</td></tr> <tr><td align="left" colspan=8 bgcolor="#B8EBFF"><font style="color:#F00000"><b>Work Schedule Details</b></font></td></tr> <tr bgcolor="#B8EBFF"><td cellspacing="1" class="innerSubheadings" style="text-align:center;" width="9%">&nbsp;&nbsp;S.No</td><td cellspacing="1" class="innerSubheadings" style="text-align:center;" width="15%">Allocated Date</td> <td class="innerSubheadings" cellspacing="1" style="text-align:center;" width="15%">Shift Type</td><td class="innerSubheadings" cellspacing="1" style="text-align:center;" width="15%">Shift Description</td><td class="innerSubheadings" cellspacing="1" style="text-align:center;" width="15%">Start Time</td><td cellspacing="1" class="innerSubheadings" style="text-align:center;" width="15%">End Time</td></tr> </table>';
        var vloc_complete = htmlTxt1 + '</table><br><br>Regards:  <br>' + rmusername + '<br>Workforce Management System.';
        var htmlTxt1 = '<table CELLSPACING=0 CELLPADDING=0  BORDER=1  WIDTH=100%><tr bgcolor="#669999"><td class=drContent align=center width=6%>&nbsp;&nbsp;' + schCount + '</td>< td class = "drContent" align = "center" width = "10%" > < nobr > ' + allnewDate + ' < /td>';
        if (typeofshift === "H") {
            htmlTxt1 = htmlTxt1 + '<td class=drContent align=center bgcolor="#669999" width=10%>RO</td>';
        } else {
            if (wsa_typeofshift === "M") {
                htmlTxt1 = htmlTxt1 + '<td class="drContent" align="center" bgcolor="#EEE8AA" width="10%">' + typeofshift + '</td>';
            } else if (wsa_typeofshift === 'E') {
                htmlTxt1 = htmlTxt1 + '<td class="drContent" align="center" bgcolor="#ccccccc" width="10%">' + typeofshift + '</td>';
            } else if (wsa_typeofshift === "N") {
                htmlTxt1 = htmlTxt1 + '<td class="drContent" align="center" bgcolor="#DEB887" width="10%">' + typeofshift + '</td>';
            } else if (wsa_typeofshift === "EL") {
                htmlTxt1 = htmlTxt1 + '<td class="drContent" align="center" bgcolor="#FFC0CB" width="10%">' + typeofshift + '</td>';
            } else if (wsa_typeofshift === "SL") {
                htmlTxt1 = htmlTxt1 + '<td class="drContent" align="center" bgcolor="#87CEFA" width="10%">' + typeofshift + '</td>';
            } else if (wsa_typeofshift === "G") {
                htmlTxt1 = htmlTxt1 + '<td class="drContent" align="center" bgcolor="#BCD7BC" width="10%">' + typeofshift + '</td>';
            } else if (wsa_typeofshift === "LOP") {
                htmlTxt1 = htmlTxt1 + '<td class="drContent" align="center" bgcolor="#CD5C5C" width="10%">' + typeofshift + '</td>';
            } else if (wsa_typeofshift === "CO") {
                htmlTxt1 = htmlTxt1 + '<td class="drContent" align="center" bgcolor="#8FBC8F" width="10%">' + typeofshift + '</td>';
            } else if (wsa_typeofshift === "CL") {
                htmlTxt1 = htmlTxt1 + '<td class="drContent" align="center" bgcolor="#40E0D0" width="10%">' + typeofshift + '</td>';
            } else if (wsa_typeofshift === "RO") {
                htmlTxt1 = htmlTxt1 + '<td height="20px" class="drContent" align="center" bgcolor="#669999" width="10%">' + typeofshift + '</td>';
            } else if (wsa_typeofshift === "ES") {
                htmlTxt1 = htmlTxt1 + '<td class="drContent" align="center" bgcolor="#BFFF80" width="10%">' + typeofshift + '</td>';
            } else if (wsa_typeofshift === "TRG") {
                htmlTxt1 = htmlTxt1 + '<td class="drContent" align="center" bgcolor="#E68A8A" width="10%">' + typeofshift + '</td>';
            } else if (wsa_typeofshift === "U") {
                htmlTxt1 = htmlTxt1 + '<td class="drContent" align="center" bgcolor="#ADD8E6" width="10%">' + typeofshift + '</td>';
            }
            htmlTxt1 = htmlTxt1 + '<td class=drContent align=center width=10%>' + typeofshift + '</td>';
        }
        schCount = schCount++;
        var displaylegends = displaylegends + '<table cellspacing="0" cellpadding="0" class="drContent" border="0"  style="width:100%; border-bottom:rgb(0,0,0) 1pt solid;border-top:rgb(0,0,0) 1pt solid;border-left:rgb(0,0,0) 1pt solid;border-right:rgb(0,0,0) 1pt solid;">';
        var displaylegends = displaylegends + '<td height="20px" class="drContent" align="center" width="1%"><font color="red">Legends</font></td>';
        if (shifttype === "M") {
            displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#EEE8AA" width="2%">' + legendname + '</td>';
        } else if (shifttype === "E") {
            displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#ccccccc" width="2%">' + legendname + '</td>';
        } else if (shifttype === "N") {
            displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#DEB887" width="2%">' + legendname + '</td>';
        } else if (shifttype === "EL") {
            displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#FFC0CB" width="2%">' + legendname + '</td>';
        } else if (shifttype === "SL") {
            displaylegends = displaylegends + '<td height="20px" class="drContent" align="center" bgcolor="#87CEFA" width="2%">' + legendname + '</td>';
        } else if (shifttype === "G") {
            displaylegends = displaylegends + '<td height="20px" class="drContent" align="center" bgcolor="#BCD7BC" width="2%">' + legendname + '</td>';
        } else if (shifttype === "LOP") {
            displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#CD5C5C" width="2%">' + legendname + '</td>';
        } else if (shifttype === "CO") {
            displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#8FBC8F" width="2%">' + legendname + '</td>';
        } else if (shifttype === "CL") {
            displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#40E0D0" width="2%">' + legendname + '</td>';
        } else if (shifttype === "RO") {
            displaylegends = displaylegends + '<td height="20px" class="drContent" align="center" bgcolor="#669999" width="2%">' + legendname + '</td>';
        } else if (shifttype === "ES") {
            displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#BFFF80" width="2%">' + legendname + '</td>';
        } else if (shifttype === "TRG") {
            displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#E68A8A" width="2%">' + legendname + '</td>';
        } else if (shifttype === "U") {
            displaylegends = displaylegends + '<td class="drContent" align="center" bgcolor="#ADD8E6" width="2%">' + legendname + '</td><td class="drContent" align="center" width="2%" bgcolor="#94DBFF">Shift-LS: Leave Status</td></tr>';
        }
        displaylegends = displaylegends + '</table>';
    }
    var loc_complete = htmlTxt1 + '</table><br><br>Regards:  <br>' + rmusername + '<br>Workforce Management System.';
    var messagefinal = startmessg + htmldisplaytext + loc_complete + displaylegends;
    inserting_Email_For_Erc_Availability(username, user_email, subject, messagefinal, rmusername);
}











/*
 * For Insert_Wfleaveapply_trans_Details Purpose
 */
function insert_Wfleaveapply_trans_Details(empuserid, selctedDate, leavestatus_id, end_Date, leavetypeid, days) {
    var user_Id = empuserid;
    var fromDate = selctedDate;
    var toDate = end_Date;
    var remarks = "RM Approved";
    var approvedbyId = Constants.User_Id; // Temporry Purpose var
											// approverreasons = "RM Approved";
    var leavestatus_id = leavestatus_id;
    var createdbyid = Constants.User_Id;
    var createdbymoduleid = Constants.Module_Id;
    var createdbyroleid = Constants.Role_Id;
    var leave_typeid = leavetypeid;
    var noofleavedays = days;
    var approved_Date = Constants.Created_Dtm;
    var json_Wfleaveapply_trans_Details = {
        "user_id": user_Id,
        "fromdate": fromDate, "todate": toDate, "remarks": remarks,
        "approvedbyId": approvedbyId,
        "approverreasons": approverreasons, "leavestatus_id": leavestatus_id,
        "createdbyid": createdbyid,
        "createdbymoduleid": createdbymoduleid,
        "createdbyroleid": createdbyroleid,
        "leave_id": leave_typeid,
        "noofleavedays": noofleavedays, "approved_Date": approved_Date

    };
    var strUrl = Service.Insert_Wfleaveapply_trans_Details;
    $.ajax({type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Wfleaveapply_trans_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                alert("Successfully Schedule Changed");
            }
        }, error: function() {
            console.log('In Error of Insert_Wfleaveapply_trans_Details');
        }
    });
}

/*
 * For Update_Wfleaveapply_trans_Details Purpose
 */
function update_Wfleaveapply_trans_Details(empuserid, selctedDate, end_Date, leavetypeid) {
    var json_Wfleaveapply_trans_Details = {
        "user_id": empuserid,
        "fromdate": selctedDate,
        "todate": end_Date,
        "leave_id": leavetypeid

    };
    var strUrl = Service.Update_Wfleaveapply_trans_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Wfleaveapply_trans_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {"X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                alert("Successfully Schedule Changed");
            }
        }, error: function() {
            console.log('In Error of Insert_Wfleaveapply_trans_Details');
        }
    });
}
/*
 * @Author : Purushotham Akula @Desc : Get_Sheduled_Allocated_Details
 */
var sheduled_id;
var patternid;
function get_Sheduled_Allocated_Details(empuserid, selctedDate, selshiftid) {
    try {
        var json_Sheduled_Allocated_Details = {
            "user_id": empuserid,
            "allocateddate": selctedDate
        };
        var strUrl = Service.Get_Sheduled_Allocated_Details;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_Sheduled_Allocated_Details),
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
                    var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        var wsashiftid = resData.shift_Id;
                        module_id = resData.module_id;
                        sheduled_id = resData.sheduled_id;
                        patternid = resData.patternid;
                        if (wsashiftid === "4") {
                            wsashiftid = "12";
                        }
                        $("#wsashiftid").val(wsashiftid);
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_Sheduled_Allocated_Details" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_Sheduled_Allocated_Details()' + err);
    }
}
var lctpresentstatus;
var lctnoofleavesused;
var lct_id;
var module_id;
var lct_presentstatus;
/*
 * For get_Sick_Leave_Balance_Details Purpose
 */
function get_Leave_Balance_Details(user_id, leave_typeid) {
    var leave_Typeid = leave_typeid; // In PHP They Are Passing Hard Code
										// Value
    var json_Leave_Balance_Details = {
        "user_id": user_id,
        "leave_typeid": leave_Typeid
    };
    var strUrl = Service.Get_Leave_Balance_AllDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Leave_Balance_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                lct_presentstatus = "0";
                var lct_noofleavesused = "0";
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                lct_presentstatus = jsonArray[0].levaev_present_status;
                lct_noofleavesused = jsonArray[0].leave_noofleaves_used;
                lct_id = jsonArray[0].leave_id;
                module_id = jsonArray[0].module_id;
                lctpresentstatus = lct_presentstatus - 1;
                lctnoofleavesused = lct_noofleavesused++;
            }
        }, error: function(err) {
            console.log('In Error of get_Sick_Leave_Balance_Details  ' + err);
        }
    });
}

/*
 * @Author : Purushotham Akula @Desc : Get_Wfleave_Cobalance_Trans_Count
 */
var lctidcountnew;
function Get_Wfleave_Cobalance_Trans_Count() {
    try {
        var strUrl = Service.Get_Wfleave_Cobalance_Trans_Count;
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false, success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    lctidcountnew = data.count;
                    lctidcountnew++;
                }
                update_Leave_Co_Balance_Trans_Details(lctpresentstatus, lctnoofleavesused, lct_id);
            }, error: function(err) {
                console.error("Error in Get_Wfleave_Cobalance_Trans_Count" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in Get_Wfleave_Cobalance_Trans_Count()' + err);
    }

}

/*
 * For Update_Leave_Co_Balance_Trans_Details Purpose
 */
function update_Leave_Co_Balance_Trans_Details(lctpresentstatus, lctnoofleavesused, lct_id) {
    var json_Leave_Co_Balance_Trans = {
        "levaev_present_status": lctpresentstatus,
        "leave_noofleaves_used": lctnoofleavesused,
        "leave_id": lct_id

    };
    var strUrl = Service.Update_Leave_Co_Balance_Trans_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Leave_Co_Balance_Trans),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                alert("Balance Compensatory Off (CO):" + lctpresentstatus);
            }
        }, error: function() {
            console.log('In Error of Insert_Wfleaveapply_trans_Details');
        }
    });
}

var userleavetransid; /*
						 * For Get_User_Leave_Id Purpose
						 */
function get_User_Leave_Id(empuserid, selctedDate) {
    var json_User_Leave_Id = {
        "user_id": empuserid,
        "month_Date": selctedDate
    };
    var strUrl = Service.Get_User_Leave_Id;
    $.ajax({type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_User_Leave_Id),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                userleavetransid = data.empId;
                update_User_Leave_Details(userleavetransid);
            }
        }, error: function() {
            console.log('In Error of Get_User_Leave_Id');
        }
    });
}

/*
 * For Update_User_Leave_Details Purpose
 */
function update_User_Leave_Details(user_Id) {
    var json_User_Leave_Details = {
        "user_id": user_Id
    };
    var strUrl = Service.Update_User_Leave_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_User_Leave_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                alert("Balance Compensatory Off (CO):" + lctpresentstatus);
            }
        }, error: function() {
            console.log('In Error of Update_User_Leave_Details');
        }
    });
} /*
	 * For Get_Leave_ApplyId Purpose
	 */
function Get_Leave_ApplyId(user_Id, selctedDate) {
    var json_Leave_ApplyId = {
        "user_id": user_Id,
        "from_Date": selctedDate
    };
    var strUrl = Service.Get_Leave_ApplyId;
    $.ajax({type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Leave_ApplyId),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                var leavetransid = data.leaveapply_id;
                inserting_UserLeave_Details(user_Id, selctedDate, leavetransid);
            }
        }, error: function() {
            console.log('In Error of Update_User_Leave_Details');
        }
    });
}
/*
 * For inserting_User_Leave_Details Purpose
 */
function inserting_UserLeave_Details(user_Id, selctedDate, leavetransid) {
    var user_leave_Id = lctidcountnew;
    var user_Id = user_Id;
    var module_Id = module_id;
    var leavetype_Id = "11"; // Php They Are Assigning Hard Code Value
    var noof_Leaves = lctnoofleavesused; // Php They Are Assigning Hard Code
											// Value
    var leave_Date = selctedDate;
    var leaveused_Status = "true";
    var leaveapply_Id = leavetransid; // Php They Are Assigning Hard Code
										// Value
    var user_createddtm = "now()"; // Php They Are Assigning Hard Code Value
									// var user_createdby_Id =
									// Constants.User_Id; //Temporary Purpose
									// var user_cretedbymoduled_Id =
									// Constants.Module_Id; //Temporary Purpose
    var user_createdbyrole_Id = Constants.Role_Id; // Temporary Purpose
    var json_User_Leave_Details = {
        "user_leave_id": user_leave_Id,
        "user_id": user_Id,
        "moduleid": module_Id,
        "leavetypeid": leavetype_Id,
        "noofleaves": noof_Leaves,
        "leavedate": leave_Date,
        "leaveusedstatus": leaveused_Status, "leaveapplyid": leaveapply_Id,
        "user_createddtm": user_createddtm,
        "user_createdbyid": Cons,
        "user_cretedbymoduledid": user_cretedbymoduled_Id,
        "user_createdbyroleid": user_createdbyrole_Id
    };
    var strUrl = Service.Inserting_User_Leave_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_User_Leave_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"}, success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
            }
        }, error: function(err) {
            console.log('In Error of Inserting_User_Leave_Details' + err);
        }
    });
}

/*
 * For get_Earned_Leave_Balance_Details Purpose
 */
function get_Earned_Leave_Balance_Details1(user_id) {
    var leave_typeid = 5; // In PHP They Are Passing Hard Code Value
    var json_Earned_Leave_Balance_Details = {
        "user_id": user_id,
        "leave_typeid": leave_typeid
    };
    var strUrl = Service.Get_Leave_Balance_AllDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Earned_Leave_Balance_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var lct_presentstatus_el = "0";
                $("#lct_presentstatus_el").val(lct_presentstatus_el);
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                var lct_presentstatus_el = jsonArray[0].levaev_present_status;
                var lct_noofleavesadded = jsonArray[0].leave_noofleaves_added;
                var leave_id = jsonArray[0].leave_id;
                var lctpresentstatus = lct_presentstatus_el++;
                var lctnoofleavesadded = lct_noofleavesadded++;
                $("#lct_presentstatus_el").val(lct_presentstatus_el);
                update_Leave_Co_Balance_Trans_Details(lctpresentstatus, lctnoofleavesadded, leave_id);
            }

        }, error: function(err) {
            console.log('In Error of get_Casual_Leave_Balance_Details1  ' + err);
        }
    });
} /*
	 * For get_Compensatoryoff_Leave_Balance_Details1 Purpose
	 */
function get_Compensatoryoff_Leave_Balance_Details1(user_id) {
    var leave_typeid = 11; // In PHP They Are Passing Hard Code Value
    var json_Earned_Leave_Balance_Details = {
        "user_id": user_id,
        "leave_typeid": leave_typeid
    };
    var strUrl = Service.Get_Leave_Balance_AllDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Earned_Leave_Balance_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var lct_presentstatus = "0";
                $("#pr_Compensatoryoff").text(lct_presentstatus);
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                lct_presentstatus = jsonArray[0].levaev_present_status;
                var lct_noofleavesadded = jsonArray[0].leave_noofleaves_added;
                var leave_id = jsonArray[0].leave_id;
                var lctpresentstatus = lct_presentstatus++;
                var lctnoofleavesadded = lct_noofleavesadded++;
                $("#pr_Compensatoryoff").text(lct_presentstatus);
                update_Leave_Co_Balance_Trans_Details(lctpresentstatus, lctnoofleavesadded, leave_id);
            }

        }, error: function(err) {
            console.log('In Error of get_Casual_Leave_Balance_Details1  ' + err);
        }
    });
}

/*
 * For get_Sick_Leave_Balance_Details Purpose
 */
function get_Sick_Leave_Balance_Details1(user_id) {
    var leave_typeid = 14; // In PHP They Are Passing Hard Code Value
    var json_Sick_Leave_Balance_Details = {
        "user_id": user_id,
        "leave_typeid": leave_typeid};
    var strUrl = Service.Get_Leave_Balance_AllDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Sick_Leave_Balance_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var lct_presentstatus = "0";
                $("#lct_presentstatus_sl").val(lct_presentstatus);
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                var lct_presentstatus = jsonArray[0].levaev_present_status;
                var lct_noofleavesadded = jsonArray[0].leave_noofleaves_added;
                var leave_id = jsonArray[0].leave_id;
                var lctpresentstatus = lct_presentstatus++;
                var lctnoofleavesadded = lct_noofleavesadded++;
                $("#lct_presentstatus_sl").val(lct_presentstatus);
                update_Leave_Co_Balance_Trans_Details(lctpresentstatus, lctnoofleavesadded, leave_id);
            }
        }, error: function(err) {
            console.log('In Error of get_Sick_Leave_Balance_Details  ' + err);
        }
    });
}

/*
 * For get_Casual_Leave_Balance_Details1 Purpose
 */
function get_Casual_Leave_Balance_Details1(user_id) {
    var leave_typeid = 19; // In PHP They Are Passing Hard Code Value
    var json_Casual_Leave_Balance_Details = {
        "user_id": user_id,
        "leave_typeid": leave_typeid
    };
    var strUrl = Service.Get_Leave_Balance_AllDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Casual_Leave_Balance_Details), contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                var lct_presentstatus = "0";
                $("#lct_presentstatus_cl").val(lct_presentstatus);
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                lct_presentstatus = jsonArray[0].levaev_present_status;
                var lct_noofleavesadded = jsonArray[0].leave_noofleaves_added;
                var leave_id = jsonArray[0].leave_id;
                var lctpresentstatus = lct_presentstatus++;
                var lctnoofleavesadded = lct_noofleavesadded++;
                $("#lct_presentstatus_cl").val(lct_presentstatus);
                update_Leave_Co_Balance_Trans_Details(lctpresentstatus, lctnoofleavesadded, leave_id);
            }
        }, error: function(err) {
            console.log('In Error of get_Casual_Leave_Balance_Details  ' + err);
        }
    });
}

/*
 * For Update_Sheduled_Details_BasedOn_SheduledId Purpose
 */
function update_Sheduled_Details_BasedOn_SheduledId(sheduled_Id) {
    var json_Casual_Leave_Balance_Details = {
        "sheduled_id": sheduled_Id
    };
    var strUrl = Service.Update_Sheduled_Details_BasedOn_SheduledId;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Casual_Leave_Balance_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
            }
        }, error: function(err) {
            console.log('In Error of get_Casual_Leave_Balance_Details  ' + err);
        }
    });
}
var leavetranscountfalse;
/*
 * For Get_Leave_ApplyId Purpose
 */
function get_Leave_ApplyId1(user_Id, selctedDate) {
    var json_Leave_ApplyId1 = {
        "user_id": user_Id,
        "from_Date": selctedDate
    };
    var strUrl = Service.Get_Leave_ApplyId1;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Leave_ApplyId1),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                leavetranscountfalse = data.leaveapply_id;
            }
        }, error: function() {
            console.log('In Error of get_Leave_ApplyId1');
        }
    });
}


/*
 * For inserting_WfSheduleAlocated_Details Purpose
 */
function inserting_WfSheduleAlocated_Details(empuserid, selctedDate, module_id, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid) {
    var user_Id = empuserid;
    var allocateddate = selctedDate;
    var module_Id = module_id;
    var shift_starttime = shift_starttime;
    var shift_endtime = shift_endtime; // Temporry Purpose var user_createddtm
										// = Constants.Created_Dtm;
    var createdbyid = Constants.User_Id;
    var createdbymoduleid = Constants.Module_Id;
    var createdbyroleid = Constants.Role_Id;
    var isactive = "true";
    var shiftstart_datetime = selctedDate + " " + shift_starttime;
    var shiftend_datetime = selctedDate + " " + shift_endtime;
    var pattern_Id = patternid;
    var typeof_Shift = typeofshift1;
    var shift_Id = selshiftid;
    var json_inserting_WfSheduleAlocated_Details = {
        "user_id": user_Id,
        "allocateddate": allocateddate,
        "module_id": module_Id,
        "shift_starttime": shift_starttime,
        "shift_endtime": shift_endtime,
        "user_createddtm": Constants.Created_Dtm,
        "user_createdbyid": createdbyid,
        "user_cretedbymoduledid": createdbymoduleid,
        "user_createdbyroleid": createdbyroleid,
        "isactive": isactive,
        "shiftstart_datetime": shiftstart_datetime,
        "shiftend_datetime": shiftend_datetime,
        "patternid": pattern_Id,
        "typeof_shift": typeof_Shift,
        "shift_Id": shift_Id

    };
    // console.log('JSON OBJECT' +
	// JSON.stringify(json_inserting_WfSheduleAlocated_Details));
    var strUrl = Service.Inserting_WfSheduleAlocated_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_inserting_WfSheduleAlocated_Details),
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
                showNotificationError("Successfully Schedule Changed", "update_Erc", "success");
            }
        }, error: function() {
            console.log('In Error of inserting_WfSheduleAlocated_Details');
        }
    });
}

/*
 * For Update_WfScheduleAllocated_Details Purpose
 */
function Update_WfScheduleAllocated_Details(selctedDate, shift_starttime, shift_endtime, patternid, typeofshift1, selshiftid, sheduled_Id) {
    var allocateddate = selctedDate;
    var shift_Id = selshiftid;
    var shift_starttime = shift_starttime;
    var shift_endtime = shift_endtime; // Temporry Purpose
    var shiftstart_datetime = selctedDate + " " + shift_starttime;
    var shiftend_datetime = selctedDate + " " + shift_endtime;
    var pattern_Id = patternid;
    var typeof_Shift = typeofshift1;
    var sheduled_Id = sheduled_Id;
    var json_Update_WfScheduleAllocated_Details = {
        "allocateddate": allocateddate,
        "shift_Id": shift_Id,
        "shift_starttime": shift_starttime,
        "shift_endtime": shift_endtime,
        "shiftstart_datetime": shiftstart_datetime,
        "shiftend_datetime": shiftend_datetime,
        "patternid": pattern_Id,
        "typeof_shift": typeof_Shift,
        "sheduled_id": sheduled_Id
    };
    // console.log('JSON OBJECT UPDATE' +
	// JSON.stringify(json_Update_WfScheduleAllocated_Details));
    var strUrl = Service.Update_WfScheduleAllocated_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Update_WfScheduleAllocated_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                showNotificationError("Schedule Updated Successfully", "update_Erc", "success");
            }
        }, error: function() {
            console.log('In Error of Update_WfScheduleAllocated_Details');
        }
    });
}

/*
 * For Update_Wfleaveapply_Details Purpose
 */
function update_Wfleaveapply_Details(empuserid, selctedDate) {
    var user_Id = empuserid;
    var from_Date = selctedDate;
    var json_Wfleaveapply_trans_Details = {
        "user_id": user_Id,
        "from_Date": from_Date
    };
    var strUrl = Service.Update_Wfleaveapply_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Wfleaveapply_trans_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                alert("Updtaed Successfully Schedule Changed");
            }
        }, error: function() {
            console.log('In Error of inserting_WfSheduleAlocated_Details');
        }
    });
}
var INTUSERID;
var INTUSERNAME;
var INTallocateddate;
var INTshiftid;
var INTshiftstarttime;
var INTshiftendtime;
// Get_Adjust_Users_WithScheduleId
function Get_Adjust_Users_WithScheduleId(sheduled_Id) {
    try {
        var json_Adjust_Users_WithScheduleId = {
            "sheduled_id": sheduled_Id
        };
        var strUrl = Service.Get_Adjust_Users_WithScheduleId;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_Adjust_Users_WithScheduleId),
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
                    var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        INTUSERID = resData.user_id;
                        INTUSERNAME = resData.user_name;
                        INTallocateddate = resData.allocateddate;
                        INTshiftid = resData.shift_Id;
                        INTshiftstarttime = resData.shift_starttime;
                        INTshiftendtime = resData.shift_endtime;
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_Sheduled_Allocated_Details" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in get_Sheduled_Allocated_Details()' + err);
    }
}
var username;
var user_email;
var userModuledesc;
/*
 * For Get_Users_Mail_Details Purpose
 */
function Get_Users_Mail_Details(empuserid, selctedDate, endDate) {
    var json_Users_Mail_Details = {
        "user_id": empuserid
    };
    var strUrl = Service.Get_Users_Mail_Details;
    $.ajax({type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Users_Mail_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var user_firstname = resData.user_firstname;
                    var user_lastname = resData.user_lastname;
                    user_email = resData.user_email;
                    var user_phone = resData.user_phone;
                    var module_id = resData.module_id;
                    userModuledesc = resData.mo_desc;
                    username = user_firstname + " " + user_lastname;
                });
                get_Users_Shift_Details(empuserid, selctedDate, endDate);
            }
        }, error: function(err) {
            console.log('In Error of Get_Users_Mail_Details  ' + err);
        }
    });
}

var wsa_typeofshift;
var allnewDate;
/*
 * For Get_Users_Shift_Details Purpose
 */ function get_Users_Shift_Details(empuserid, selctedDate, endDate) {
    var json_Users_Shift_Details = {
        "user_id": empuserid,
        "start_date": selctedDate,
        "end_date": endDate
    };
    var strUrl = Service.Get_Users_Shift_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Users_Shift_Details),
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var user_id = resData.user_id;
                    var user_desc = resData.user_desc;
                    allnewDate = resData.allocateddate;
                    var shift_starttime = resData.shift_starttime;
                    var shift_endtime = resData.shift_endtime;
                    wsa_typeofshift = resData.typeof_shift;
                    var vehicle_regno = resData.vehicle_regno;
                });
                Get_Legends_ShiftType_Details();
            }
        }, error: function(err) {
            console.log('In Error of Get_Users_Shift_Details  ' + err);
        }});
}


var shifttype;
var legendname;
/*
 * For Get_Legends_ShiftType_Details Purpose
 */
function Get_Legends_ShiftType_Details() {
    var strUrl = Service.Get_Legends_ShiftType_Details;
    $.ajax({type: "GT",
        url: strUrl,
        dataType: "json",
        contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                var jsonArray = data.objPatternsERCControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var user_shifttypeid = resData.user_shifttypeid;
                    shifttype = resData.user_shifttype;
                    var user_desc = resData.user_desc;
                    legendname = resData.user_name;
                });
            }
        }, error: function(err) {
            console.log('In Error of Get_Legends_ShiftType_Details  ' + err);
        }});
}
function inserting_Email_For_Erc_Availability(username, user_email, subject, messagefinal, rmusername) {
    if (user_email === "NA" || user_email === "" || user_email === "null") {
        user_email = "test@gmail.com";
    }
    // $mailquery = "select * from sp_insert_hm_email_outbox_queue_trans(0,0,'
	// $userMailid','$subject','$messagefinal',1,1,false,$userid,$intModuleID,$intRoleID)";
    var createdbyid = Constants.User_Id;
    var createdbymoduleid = Constants.Module_Id;
    var createdbyroleid = Constants.Role_Id;
    var json_Inserting_Email_Details = {
        "inboxqueueid": "0",
        "replyuser": "0",
        "us_email": user_email,
        "subject": subject,
        "replybody": messagefinal, "actionid": "1",
        "templateid": "1",
        "isdeleted": "false",
        "leave_createdbyid": createdbyid,
        "leave_createdbymoduleid": createdbymoduleid,
        "leave_createdbyroleid": createdbyroleid
    };
    var strUrl = Service.Inserting_Email_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Inserting_Email_Details), contentType: "application/json", async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"}, success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
                alert('Mail Sended Succsefully' + username);
            }
        },
        error: function(err) {
            console.error("Error in inserting_Email_For_Erc_Availability" + JSON.stringify(err));
        }
    });
}

function showNotificationError(msg, id, msgType) {
    var boxId = '#' + id;
    var options = {
        // whether to hide the notification on click
        clickToHide: true,
        // whether to auto-hide the notification
        autoHide: true, // if autoHide, hide after milliseconds
        autoHideDelay: 2000,
        // show the arrow pointing at the element
        arrowShow: true,
        // arrow size in pixels
        arrowSize: 5, // position defines the notification position though
						// uses the defaults below
        position: 'right',
        // default positions
        elementPosition: 'top right',
        globalPosition: 'top right',
        // default style
        style: 'bootstrap',
// default class (string or [string])
        className: msgType,
        // show animation
        showAnimation: 'slideDown', // show animation duration showDuration:
									// 400,
        // hide animation
        hideAnimation: 'slideUp',
        // hide animation duration
        hideDuration: 200,
        // padding between element and notification
        gap: 2
    };
    $(boxId).notify(msg, options);
}

function load_Erc_Table() {
    $('#ERC_Table').DataTable({// Data table
        pageLength: 6,
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
