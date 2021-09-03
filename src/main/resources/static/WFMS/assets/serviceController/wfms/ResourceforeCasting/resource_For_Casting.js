/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    get_Total_Calls_Sum_Count();
    Get_Shift_A_Count();
    Get_Shift_B_Count();
    Get_Shift_C_Count();
    get_Effective_CallDetails();
    all_Shift_Wise_Count();
});


var morningavgcount;
var totalcallsperday1;
/*
 For get_Total_Calls_Sum_Count Purpose
 */
function get_Total_Calls_Sum_Count() {
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
                var total_Count = data.total_Count;
                totalcallsperday1 = JSON.parse(total_Count);
                var tottal_Last_30_Days_Count = ' <input type="text" class="form-control"  readonly="readonly" value=' + total_Count + '>';
                $("#total_Count").append(tottal_Last_30_Days_Count);
                var totalavgcallsperday = total_Count / 30;
                var average_Total_Calls_Per_Day = ' <input type="text" class="form-control"  readonly="readonly" value=' + totalavgcallsperday.toFixed() + '>';
                $("#average_Total_Calls_Per_Day").append(average_Total_Calls_Per_Day);
            }
        }, error: function() {
            console.log('In Error of Get_Recommended_Total_Calls_Sum_Count');
        }
    });
}
var totalavgcallsperday;
/*
 For Get_Shift_A_Morning_Shift_Count Purpose
 */
function Get_Shift_A_Count() {
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
                var mrng_shift = data.morning_Shift_Count;
                morningavgcount = JSON.parse(mrng_shift);
                var Shift_A_Last_30_Days_Count = ' <input type="text" class="form-control"  readonly="readonly" value=' + morningavgcount + '>';
                $("#Shift_A_Count").append(Shift_A_Last_30_Days_Count);
                totalavgcallsperday = morningavgcount / 30;
                var average_Shift_A_Calls_Per_Day = ' <input type="text" class="form-control"  readonly="readonly" value=' + totalavgcallsperday.toFixed() + '>';
                $("#average_Shift_A_Calls_Per_Day").append(average_Shift_A_Calls_Per_Day);
            }
        }, error: function() {
            console.log('In Error of Get_Shift_A_Count');
        }
    });
}

var eveningavgcount;
/*
 For Get_Shift_B_Count Purpose
 */
function Get_Shift_B_Count() {
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
                eveningavgcount = data.evening_Shift_Count;
                var Shift_B_Last_30_Days_Count = ' <input type="text" class="form-control"  readonly="readonly" value=' + eveningavgcount + '>';
                $("#Shift_B_Count").append(Shift_B_Last_30_Days_Count);
                var eveningavg_count = eveningavgcount / 30;
                var average_Shift_B_Calls_Per_Day = ' <input type="text" class="form-control"  readonly="readonly" value=' + eveningavg_count.toFixed() + '>';
                $("#average_Shift_B_Calls_Per_Day").append(average_Shift_B_Calls_Per_Day);

            }
        }, error: function() {
            console.log('In Error of Get_Shift_B_Morning_Shift_Count');
        }
    });
}
var nightavgcount;
var nightcount;
/*
 For Get_Shift_C_Count Purpose
 */
function Get_Shift_C_Count() {
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
                var Shift_C_Last_30_Days_Count = ' <input type="text" class="form-control"  readonly="readonly" value=' + nightcount + '>';
                $("#Shift_C_Count").append(Shift_C_Last_30_Days_Count);
                nightavgcount = nightcount / 30;
                var average_Shift_C_Calls_Per_Day = ' <input type="text" class="form-control"  readonly="readonly" value=' + nightavgcount.toFixed() + '>';
                $("#average_Shift_C_Calls_Per_Day").append(average_Shift_C_Calls_Per_Day);

            }
        }, error: function() {
            console.log('In Error of Get_Shift_C_Morning_Shift_Count');
        }
    });
}
var ch1_effectivecall;
var ch1_effectiveaht;
var ch1_ineffectivecalls;
var ffectiveaht;
var ch1_ineffectiveaht;

/*
 For get_Effective_CallDetails Purpose
 */
function get_Effective_CallDetails() {
    var shift_Id = 1; //In Php Code They Are Passing Hard Code Value shift_Id = 1
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
            }
        }, error: function() {
            console.log('In Error of Get_Employee_Details Details ');
        }
    });
}


function all_Shift_Wise_Count() {
    var totalavgcallsperday = totalcallsperday1 / 30;
    var shiftwsiecallvolumee = (morningavgcount / totalavgcallsperday) * 100;
    var shiftwisecalls = (totalavgcallsperday * shiftwsiecallvolumee) / 100;
    var effectivecalls = (shiftwisecalls * ch1_effectivecall) / 100;
   

    var ineffectivecalls = (shiftwisecalls * ch1_ineffectivecalls / 100);
    var effectivecallshandlingtime = (effectivecalls * ch1_effectiveaht);
    var ineffectivecallshandlingtime = (effectivecalls * ch1_ineffectiveaht);
    console.log("ch1_effectivecall =====>"+ch1_ineffectiveaht);
    console.log("effectivecalls =====>"+effectivecalls);
    console.log("ineffectivecallshandlingtime =====>"+ineffectivecallshandlingtime);

    var shifthours = 8;
    var shifttime = shifthours * 60;
    var agentefficiency = shifttime * 0.8;
    var noofeffectivecallshandled = (agentefficiency * ch1_effectivecall / 100) / ch1_effectiveaht;
    var noofineffectivecallshandled = (agentefficiency * ch1_ineffectivecalls / 100) / ch1_ineffectiveaht;
    var totalcallshandled = (noofeffectivecallshandled + noofineffectivecallshandled);
    var resourcerequired = (shiftwisecalls / totalcallshandled);
    console.log("shiftwisecalls =====> " + shiftwisecalls);
    console.log("totalcallshandled =====> " + totalcallshandled);

    var resourceincludingbuffer = (resourcerequired * 1.5);

    var shiftwsiecallvolumee2 = (eveningavgcount / totalavgcallsperday) * 100;
    var shiftwisecalls2 = (totalavgcallsperday * shiftwsiecallvolumee2) / 100;
    var shiftwsiecallvolume2 = (eveningavgcount / totalcallsperday1) * 100;
    var effectivecalls2 = (shiftwisecalls2 * ch1_effectivecall) / 100;
    var ineffectivecalls2 = (shiftwisecalls2 * ch1_ineffectivecalls) / 100;
    var effectivecallshandlingtime2 = (effectivecalls2 * ch1_effectiveaht);
    var ineffectivecallshandlingtime2 = (effectivecalls2 * ch1_ineffectiveaht);
    var resourcerequired2 = (shiftwisecalls2 / totalcallshandled);
    var resourceincludingbuffer2 = (resourcerequired2 * 1.5);

    var shiftwsiecallvolumee3 = (nightavgcount / totalavgcallsperday) * 100;
    var shiftwisecalls3 = (totalavgcallsperday * shiftwsiecallvolumee3) / 100;
    var shiftwsiecallvolume33 = (nightcount / totalcallsperday1) * 100;
    var effectivecalls3 = (shiftwisecalls3 * ch1_effectivecall) / 100;
    var ineffectivecalls3 = (shiftwisecalls3 * ch1_ineffectivecalls) / 100;
    var effectivecallshandlingtime3 = (effectivecalls3 * ch1_effectiveaht);
    var ineffectivecallshandlingtime3 = (effectivecalls3 * ch1_ineffectiveaht);
    var resourcerequired3 = (shiftwisecalls3 / totalcallshandled);
    var resourceincludingbuffer3 = (resourcerequired3 * 1.5);
    var resourcerequiredtotalca = resourcerequired + resourcerequired2 + resourcerequired3;
 //   console.log("resourcerequiredtotalca =========>"+resourcerequiredtotalca);
    var resourcerequiredtotalbufferca = resourceincludingbuffer + resourceincludingbuffer2 + resourceincludingbuffer3;

    console.log("resourcerequired =====> " + resourcerequired);
    console.log("resourcerequired2 =====> " + resourcerequired2);
    console.log("resourcerequired3 =====> " + resourcerequired3);

   // console.log("resourcerequiredtotalbufferca =====> " + resourcerequiredtotalbufferca);
// ====================== MORNING WISE SHIFT COUNTS ============================= //

    var mrng_Shift_Wise_Calls = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + shiftwisecalls.toFixed() + '>';
    $("#mrng_Shift_Wise_Calls").append(mrng_Shift_Wise_Calls);

    var mrng_Shift_Wsie_Call_Volume = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + shiftwsiecallvolumee.toFixed() + '>';
    $("#mrng_Shift_Wsie_Call_Volume").append(mrng_Shift_Wsie_Call_Volume);

    var mrng_Effective_Calls = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + effectivecalls.toFixed() + '>';
    $("#mrng_Effective_Calls").append(mrng_Effective_Calls);

    var mrng_Ineffective_Calls = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + ineffectivecalls.toFixed() + '>';
    $("#mrng_Ineffective_Calls").append(mrng_Ineffective_Calls);

    var mrng_Effective_Callshandling_Time = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + effectivecallshandlingtime.toFixed() + '>';
    $("#mrng_Effective_Callshandling_Time").append(mrng_Effective_Callshandling_Time);

    var mrng_InEffective_Callshandling_Time = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + ineffectivecallshandlingtime.toFixed() + '>';
    $("#mrng_InEffective_Callshandling_Time").append(mrng_InEffective_Callshandling_Time);

    var mrng_Resource_Required = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + resourcerequired.toFixed() + '>';
    $("#mrng_Resource_Required").append(mrng_Resource_Required);

    var mrng_Resource_Including_Buffer = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + resourceincludingbuffer.toFixed() + '>';
    $("#mrng_Resource_Including_Buffer").append(mrng_Resource_Including_Buffer);

// ====================== EVENING WISE SHIFT COUNTS ============================= //

    var evng_Shift_Wise_Calls = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + shiftwisecalls2.toFixed() + '>';
    $("#evng_Shift_Wise_Calls").append(evng_Shift_Wise_Calls);

    var evng_Shift_Wsie_Call_Volume = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + shiftwsiecallvolume2.toFixed() + '>';
    $("#evng_Shift_Wsie_Call_Volume").append(evng_Shift_Wsie_Call_Volume);

    var evng_Effective_Calls = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + effectivecalls2.toFixed() + '>';
    $("#evng_Effective_Calls").append(evng_Effective_Calls);

    var evng_Ineffective_Calls = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + ineffectivecalls2.toFixed() + '>';
    $("#evng_Ineffective_Calls").append(evng_Ineffective_Calls);

    var evng_Effective_Callshandling_Time = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + effectivecallshandlingtime2.toFixed() + '>';
    $("#evng_Effective_Callshandling_Time").append(evng_Effective_Callshandling_Time);

    var evng_InEffective_Callshandling_Time = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + ineffectivecallshandlingtime2.toFixed() + '>';
    $("#evng_InEffective_Callshandling_Time").append(evng_InEffective_Callshandling_Time);

    var evng_Resource_Required = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + resourcerequired2.toFixed() + '>';
    $("#evng_Resource_Required").append(evng_Resource_Required);

    var evng_Resource_Including_Buffer = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + resourceincludingbuffer2.toFixed() + '>';
    $("#evng_Resource_Including_Buffer").append(evng_Resource_Including_Buffer);

// ====================== NIGHT WISE SHIFT COUNTS ============================= //

    var ngt_Shift_Wise_Calls = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + shiftwisecalls3.toFixed() + '>';
    $("#ngt_Shift_Wise_Calls").append(ngt_Shift_Wise_Calls);

    var ngt_Shift_Wsie_Call_Volume = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + shiftwsiecallvolume33.toFixed() + '>';
    $("#ngt_Shift_Wsie_Call_Volume").append(ngt_Shift_Wsie_Call_Volume);

    var ngt_Effective_Calls = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + effectivecalls3.toFixed() + '>';
    $("#ngt_Effective_Calls").append(ngt_Effective_Calls);

    var ngt_Ineffective_Calls = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + ineffectivecalls3.toFixed() + '>';
    $("#ngt_Ineffective_Calls").append(ngt_Ineffective_Calls);

    var ngt_Effective_Callshandling_Time = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + effectivecallshandlingtime3.toFixed() + '>';
    $("#ngt_Effective_Callshandling_Time").append(ngt_Effective_Callshandling_Time);

    var ngt_InEffective_Callshandling_Time = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + ineffectivecallshandlingtime3.toFixed() + '>';
    $("#ngt_InEffective_Callshandling_Time").append(ngt_InEffective_Callshandling_Time);

    var ngt_Resource_Required = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + resourcerequired3.toFixed() + '>';
    $("#ngt_Resource_Required").append(ngt_Resource_Required);

    var ngt_Resource_Including_Buffer = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + resourceincludingbuffer3.toFixed() + '>';
    $("#ngt_Resource_Including_Buffer").append(ngt_Resource_Including_Buffer);

// ====================== TOTAL  COUNTS ============================= //

    var resourcerequiredtotalca = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + resourcerequiredtotalca.toFixed() + '>';
    $("#resourcerequiredtotalca").append(resourcerequiredtotalca);

    var resourcerequiredtotalbufferca = '<input type="text" class="form-control" maxlength="5" readonly="readonly" value=' + resourcerequiredtotalbufferca.toFixed() + '>';
    $("#resourcerequiredtotalbufferca").append(resourcerequiredtotalbufferca);

}