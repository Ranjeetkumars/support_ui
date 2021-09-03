/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    try {
        var data = JSON.parse(localStorage.getItem('Lobject'));
        if (data.responseCode === 200) {
            $.each(data.controllerDTOs, function(i, eachitem) {
                if (eachitem.errorcode == null) {
                    SrpId = eachitem.serviceProviderId;
                } else {
                    window.location.href = "login.html";
                }
            });
        } else {
            window.location.href = "login.html";
        }

    } catch (err) {
        window.location.href = "login.html";
    }
    get_All_Shift_Details();
    $("#chart_Id").attr('disabled', true).trigger("chosen:updated");
    $('#theadId').hide();
    $('#headId').hide();

});


$("#login_Report_Date").change(function() {
    var loginDate = $('#login_Report_Date').val();
    if (loginDate === '') {
        loginDate = null;
    } else {
        var d = new Date(loginDate.split("-").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        loginDate = yy + "-" + mm + "-" + dd;
    }
    $('#hiddenChartId').val(loginDate);
    $('#login_Report_Date_Error').empty();


});
$("#shiftId").change(function() {
    var shiftId = $('#shiftId').val();
    if (shiftId === "0") {
        shiftId = 'null';
    }
    $('#hiddenShiftId').val(shiftId);
    $("#chart_Id").attr('disabled', false).trigger("chosen:updated");
    $('#login_Report_Date_Error').empty();
});
$("#login_ResetID").click(function() {
    $("#shiftId").val("").trigger("chosen:updated");
    $("#chart_Id").val("").trigger("chosen:updated");
    $("#chart_Id").html('<option value="0">Select Chart</option>');
    
});


function searchLoginReport() {
    var loginDate = $('#hiddenChartId').val();
    var shiftId = $('#hiddenShiftId').val();
    if (shiftId === "") {
        shiftId = 'null';
    }
    if (loginDate === "") {
        loginDate = null;
    }
    if (loginDate === null && shiftId === "null") {
        $('#login_Report_Date_Error').html('Please select atleast one input (Login Date / Shifts)').css('color', "red");
    } else {
        get_Login_Mpdule_Wise_Report_Details(loginDate, shiftId);

    }
}

$(document).ready(function() {
    $("#chart_Id").change(function() {
        // var chart_Id = $(this).children("option:selected").val();
        var chart_Id = $('#chart_Id').val();
        $('#chart').empty();
        $('#chart').append('<canvas id="' + chart_Id + '"></canvas> ');
        showchart(chart_Id);
    });
});

/*
 OnChange Functions
 */
function showchart(chart_Id) {

    switch (chart_Id) {
        case "1":
            chart = "line";
            break;
        case "2":
            chart = "bar";
            break;
        case "3":
            chart = "pie";
            break;
        case "4":
            chart = "doughnut";
            break;
        case "5":
            chart = "radar";
            break;
        case "6":
            chart = "polarArea";
            break;
        case "7":
            chart = "horizontalBar";
            break;

        default:
    }
    chartIt(chart_Id);
}

var module_Names = [];
var module_Count = [];
var chart;

function chartIt(chart_Id) {
    $('#headId').show();
    var loginDate = $('#hiddenChartId').val();
    var shiftId = $('#hiddenShiftId').val();
    if (shiftId === "") {
        shiftId = 'null';
    }
    if (loginDate === "") {
        loginDate = null;
    }
    get_modules_basedon_siteid(loginDate, shiftId);
    var ctx = document.getElementById(chart_Id).getContext('2d');
    var myClolors = ['#FFB6C1', '#3CB371', '#1E90FF', '#7B68EE', '#EE82EE', 'orange', '#DEB887', '#00BFFF'];
    var myChart = new Chart(ctx, {
        type: chart,
        fill: false,
        data: {
            labels: module_Names,
            datasets: [
                {
                    label: ' LOGIN DETAILS',
                    data: module_Count,
                    backgroundColor: myClolors,
                    borderWidth: 1,
                    borderColor: 'black',
                    hoverBorderWidth: 3,
                    hoverBorderColor: 'black'
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'blue'
                        }
                    }]

            }
        }
    });
    // chart = "";
}

function get_modules_basedon_siteid(loginDate, shiftId) {
    try {
        module_Names = [];
        module_Count = [];
        var siteid = localStorage.getItem('active_SiteId');
        var json_srgDetails = {
            "siteId": siteid,
            "loginDate": loginDate,
            "shiftId": shiftId
        };
        var finall = '';
        var strUrl = Service.getSiteModuleWiseLoginReportDetails;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_srgDetails),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
                "X-TENANT-ID": "PROCREATE"
            },
            success: function(data) {
                var responsecode = data.responseCode;
                if (responsecode !== 200) {
                } else {
                    var jsonArray = data.reportsControllerDTO;
                    $.each(jsonArray, function(i, jsonArray) {
                        finall = jsonArray.moduleName + '-' + jsonArray.loginUserCount + ',';
                        var bfr_split = finall.split('-');
                        var module_Name = bfr_split[0];
                        var mo_Id = bfr_split[1];
                        var module_Id = mo_Id.split(',');
                        var Count = JSON.parse(module_Id[0]);
                        module_Names.push(module_Name.toString());
                        module_Count.push(Count);
                    });
                }
            }, error: function(err) {
                console.log('In Error of  get_modules_basedon_siteid ' + err);
            }
        });
        return finall;
    } catch (err) {
        console.log('In Error of  get_modules_basedon_siteid ' + err);
    }
}


/*
 For get_All_Shift_Details
 */
function get_All_Shift_Details() {
    try {

        var strUrl = Service.getAllShiftsDetails;
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
                    var jsonArray = data.reportsControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        var modules = "<option value=" + resData.shiftId + ">" + resData.shiftName + "</option>";
                        $(modules).appendTo('#shiftId');
                    });
                }
            }, error: function(err) {
                console.log('In Error of get_All_Shift_Details ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of get_All_Shift_Details ' + err);
    }
}

function get_Login_Mpdule_Wise_Report_Details(loginDate, shiftId) {
    try {
        var siteid = localStorage.getItem('active_SiteId');
        var json_srgDetails = {
            "siteId": siteid,
            "loginDate": loginDate,
            "shiftId": shiftId
        };
        var finall = '';
        var strUrl = Service.getSiteModuleWiseLoginReportDetails;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_srgDetails),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
                "X-TENANT-ID": "PROCREATE"
            },
            success: function(data) {
                var responsecode = data.responseCode;
                if (responsecode !== 200) {
                    $('#noData_Error').html('No Data Available').css('color', "blue");
                    $('#tableHide').hide();
                    $('#loginChartId').hide();
                    setTimeout(function() {
                        $('#noData_Error').empty();
                    }, 3000);
                } else {
                    var jsonArray = data.reportsControllerDTO;
                    $('#tableHide').show();
                    $('#loginChartId').show();
                    $("#chart_Id").attr('disabled', false).trigger("chosen:updated");
                    get_Login_Mpdule_Wise_Report_Details_DOM(jsonArray);
                    loadDataTable();
                }
            }, error: function(err) {
                console.log('In Error of  get_modules_basedon_siteid ' + err);
            }
        });
        return finall;
    } catch (err) {
        console.log('In Error of  get_modules_basedon_siteid ' + err);
    }
}

function get_Login_Mpdule_Wise_Report_Details_DOM(strData) {
    $('#loginReport_TableId').empty();
    try {
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");
            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var siteName = strData[i].siteName;
            if (siteName === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(siteName);
            }
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            var moduleName = strData[i].moduleName;
            if (moduleName === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(moduleName);
            }
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            var loginUserCount = strData[i].loginUserCount;
            if (loginUserCount === "NA") {
                $(tablcol4).html('Not Found');
            } else {
                $(tablcol4).html(loginUserCount);
            }
            $(tbleRow).append(tablcol4);
            // Appending Body Here
            $("#loginReport_TableId").append(tbleRow);
        }
    } catch (err) {
        console.log("get_Login_Mpdule_Wise_Report_Details_DOM" + err);
    }
}
function loadDataTable() {
    $('#theadId').show();
    $('#loginReport_table').DataTable({
        retrieve: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel'},
            {extend: 'pdf'},
            {extend: 'print'}
        ]
    });
}