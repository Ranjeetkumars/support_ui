/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 Leave_Approval_Reject_Details   Functions Calling Here
 */
$(document).ready(function() {
    Get_Leave_Approval_Reject_Details();
});

/*
 For Get_Leave_Approval_Reject_Details Purpose
 */
function Get_Leave_Approval_Reject_Details() {


    var in_condition = "1";//Temporary Purpose
    var approvedbyId = "161";//Temporary Purpose
    var managerid = "112";//Temporary Purpose
    var user_id = "161";//Temporary Purpose
    var json_Leave_Approval_Reject_Details = {
        "in_condition": in_condition,
        "approvedbyId": approvedbyId,
        "managerid": managerid,
        "user_id": user_id
    };

    var strUrl = Service.Get_Leave_Approval_Reject_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Leave_Approval_Reject_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            Get_Leave_Approval_Reject_Details_DOM(jsonArray);
            loadDataTable_leave_approval_reject();
            if (responsecode !== 200) {
                $('#EA_OperatorsId').html('NO DATA FOUND');
            } else {
                var jsonArray = data.objResourceProfilesControllerDTO;
                Get_Leave_Approval_Reject_Details_DOM(jsonArray);
                loadDataTable_leave_approval_reject();
            }
        }, error: function() {
            console.log('In Error of Get_Leave_Approval_Reject_Details Details ');
        }
    });
}



function Get_Leave_Approval_Reject_Details_DOM(strData) {
    $('#leave_Approve_Reject_Id').empty();
    try {
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-leave_approval_reject");
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
        $(objTHead3).html("Name");
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
        $(objTHead7).html("Applied Date");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Employee Reason");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Status");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);

        var objTHead10 = document.createElement("th");
        $(objTHead10).html("Action");
        $(objTHead10).addClass("text-center");
        $(objTr).append(objTHead10);

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
            $(tablcol2).html(strData[i].leavetype);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).html(strData[i].user_name);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            var fromdate = strData[i].fromdate;
            if (fromdate === "NA") {
                $(tablcol4).html('Not Found');
            } else {
                $(tablcol4).html(fromdate);
            }
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            var todate = strData[i].todate;
            if (todate === "NA") {
                $(tablcol5).html('Not Found');
            } else {
                $(tablcol5).html(todate);
            }
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            var noofleavedays = strData[i].noofleavedays;
            if (noofleavedays === "NA") {
                $(tablcol6).html('Not Found');
            } else {
                $(tablcol6).html(noofleavedays);
            }
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            var applied_date = strData[i].createddtm;
            if (applied_date === "NA") {
                $(tablcol7).html('Not Found');
            } else {
                $(tablcol7).html(applied_date);
            }
            $(tbleRow).append(tablcol7);


            var tablcol8 = document.createElement("td");
            var remarks = strData[i].remarks;
            if (remarks === "NA") {
                $(tablcol8).html('Not Found');
            } else {
                $(tablcol8).html(remarks);
            }
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            var statustype = strData[i].statustype;
            if (statustype === "NA") {
                $(tablcol9).html('Not Found');
            } else {
                $(tablcol9).html(statustype);
            }
            $(tbleRow).append(tablcol9);
            var leave_apply_id = strData[i].leaveApplyId;

            var tablcol10 = document.createElement("td");
            $(tablcol10).html('<div class="row"> <div class="col-sm-6"> <a href="#" data-toggle="modal"  data-toggle="tooltip"  data-placement="bottom" data-target="#update_Modal" title="Edit"><span class="glyphicon glyphicon-pencil" style="color:blue"></span></a> </div><div class="col-sm-6"><a href="#" data-toggle="modal" data-toggle="tooltip"  data-placement="bottom" title="Cancel" data-target="#update_Modal1"> <span class="glyphicon glyphicon-remove" style="color:red"></span> </a></div></div>');
            $(tablcol10).attr('onclick', 'get_RowData("' + leave_apply_id + '","' + remarks + '")');
            $(tbleRow).append(tablcol10);
            //Appending Body Here
            $(objTBody).append(tbleRow);
        }
        $("#leave_Approve_Reject_Id").append(objDivTag);
    } catch (err) {
        console.log("EA_OperatorsId" + err);
    }
}
function get_RowData(leave_apply_id, remarks) {
    $('#leaveapprove_reject_Id').val(leave_apply_id);
    LeaveStatus_Details();

}
function LeaveStatus_Details() {
    var leave_Apply_Id = $('#leaveapprove_reject_Id').val();

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
                    var current_date = "2019-07-17";
                    var user_id = "161";
                    alert(':::: current_date ::::' + current_date);
                    alert(':::: user_id ::::' + user_id);
                    Get_Selected_Sheduled_Details(current_date, user_id);
                });
            }
        },
        error: function(err) {
            console.error("Error in Leave_Status_Details" + JSON.stringify(err));
        }
    });
}


/*
 For Get_Selected_Sheduled_Details Purpose
 */
function Get_Selected_Sheduled_Details(current_date, user_id) {


    var current_date = current_date;
    var user_id = user_id;
    var json_Selected_Sheduled_Details = {
        "current_date": current_date,
        "user_id": user_id
    };

    var strUrl = Service.Get_Selected_Sheduled_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Selected_Sheduled_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (responsecode !== 200) {
                $('#EA_OperatorsId').html('NO DATA FOUND');
            } else {
                var jsonArray = data.objResourceProfilesControllerDTO;
                $.each(jsonArray, function(index, resData) {
                    var shedule_Id = resData.sheduled_id;
                    Update_Sheduled_Details_BasedOn_SheduledId(shedule_Id);
                });

            }
        }, error: function() {
            console.log('In Error of Get_Selected_Sheduled_Details Details ');
        }
    });
}
function Update_Sheduled_Details_BasedOn_SheduledId(sheduled_id) {

    var sheduled_id = sheduled_id;
    var json_Selected_Sheduled_Details = {
        "sheduled_id": sheduled_id
    };

    var strUrl = Service.Update_Sheduled_Details_BasedOn_SheduledId;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Selected_Sheduled_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (responsecode !== 200) {
                $('#EA_OperatorsId').html('NO DATA FOUND');
            } else {
                var jsonArray = data.objResourceProfilesControllerDTO;
            }
        }, error: function() {
            console.log('In Error of Get_Leave_Approval_Reject_Details Details ');
        }
    });

}

function loadDataTable_leave_approval_reject() {
    $('.dataTables-leave_approval_reject').DataTable({// Data table
        pageLength: 5,
        "aLengthMenu": [[5, 50, 75, -1], [5, 10, 25, "All"]],
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
