

/*
 EMPLOYEE_AVAILABILITY OPERATORS ONLOAD FUNCTIONS CALLING HERE 
 */
$(document).ready(function() {
    Get_Modules_DropDown();
    Get_Zones_DropDown();
});

/*
 Reseting Search Leave Fields
 */
function employee_Availability_Operators_Reset() {
    $("#EAO_department_Id").val('').trigger("chosen:updated");
    $("#EAO_ZoneId").val('').trigger("chosen:updated");
    $("#EAO_BaselocatioId").val('').trigger("chosen:updated");
    $("#EAO_VehicleId").val('').trigger("chosen:updated");

}

/*
 LeaveHistory Details Functions Calling Here
 */
$(document).ready(function() {
    Get_Department_Details_DropDown();
});

$('#EAO_ZoneId').change(function() {
    var EAO_ZoneId = $(this).val();
    Get_BaseLocation_DropDown(EAO_ZoneId);

});

$('#EAO_BaselocatioId').change(function() {
    var BaselocatioId = $(this).val();
    Get_Vehicles_DropDown(BaselocatioId);
});

/*
 For Loading Get_Zones_DropDown Purpose
 */
function Get_Zones_DropDown() {
    var strUrl = Service.Get_Zones_DropDown;
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
                var jsonArray = data.objResourceProfilesControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var ZoneId = "<option value=" + resData.location_id + ">" + resData.location_name + "</option>";
                    $(ZoneId).appendTo('#EAO_ZoneId');
                });
                $('#EAO_ZoneId').trigger("chosen:updated");
                $('#EAO_ZoneId').chosen();
            }
        },
        error: function(err) {
            console.error("Error in Get_Zones_DropDown" + JSON.stringify(err));
        }
    });
}


/*
 For Get_Modules_DropDown Purpose
 */
function Get_Modules_DropDown() {
    var isactive = "true"; //Temporary Purpose 
    var json_Get_Modules_DropDown = {
        "isactive": isactive
    };
    var strUrl = Service.Get_Modules_DropDown;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Get_Modules_DropDown),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (responsecode !== 200) {
                alert('NO DATA FOUND');
            } else {
                var jsonArray = data.objResourceProfilesControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var department_Id = "<option value=" + resData.moduleid + ">" + resData.module_name + "</option>";
                    $(department_Id).appendTo('#EAO_department_Id');
                });
            }
        }, error: function() {
            console.log('In Error of Get_Modules_DropDown Details ');
        }
    });
}

/*
 For Get_BaseLocation_DropDown Purpose
 */
function Get_BaseLocation_DropDown(EAO_ZoneId) {
    $("#EAO_BaselocatioId").empty();
    var location_id = EAO_ZoneId; //Temporary Purpose 
    var json_BaseLocation_DropDown = {
        "location_id": location_id
    };
    var strUrl = Service.Get_BaseLocation_DropDown;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_BaseLocation_DropDown),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (responsecode !== 200) {
                alert('NO DATA FOUND');
            } else {
                var jsonArray = data.objResourceProfilesControllerDTO;
                var selectfirst = "<option value='0'>Select Baselocation</option>";
                $('#EAO_BaselocatioId').append(selectfirst);
                $.each(jsonArray, function(i, resData) {
                    var baselocatioId = "<option value=" + resData.location_id + ">" + resData.location_name + "</option>";
                    $(baselocatioId).appendTo('#EAO_BaselocatioId');
                    Get_Vehicles_DropDown(resData.location_id);
                });
                $('#EAO_BaselocatioId').trigger("chosen:updated");
                $('#EAO_BaselocatioId').chosen();
            }
        }, error: function() {
            console.log('In Error of Get_BaseLocation_DropDown Details ');
        }
    });
}


/*
 For Get_BaseLocation_DropDown Purpose
 */
function Get_Vehicles_DropDown(location_id) {
    $("#EAO_VehicleId").empty();
    var location_id = location_id; //Temporary Purpose 
    var json_Vehicles_DropDown = {
        "location_id": location_id
    };
    var strUrl = Service.Get_Vehicles_DropDown;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Vehicles_DropDown),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (responsecode !== 200) {
                alert('NO DATA FOUND');
            } else {
                var jsonArray = data.objResourceProfilesControllerDTO;
                var selectfirst = "<option value='0'>Select Vehicle</option>";
                $('#EAO_VehicleId').append(selectfirst);
                $.each(jsonArray, function(i, resData) {
                    var baselocatioId = "<option value=" + resData.vehicle_id + ">" + resData.vehicle_name + "</option>";
                    $(baselocatioId).appendTo('#EAO_VehicleId');
                });
                $('#EAO_VehicleId').trigger("chosen:updated");
                $('#EAO_VehicleId').chosen();
            }
        }, error: function() {
            console.log('In Error of Get_BaseLocation_DropDown Details ');
        }
    });
}

/*
 For Get_Department_Details_DropDown Purpose
 */
function Get_Department_Details_DropDown() {
    var strUrl = Service.Get_Department_Details_DropDown;
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
                var jsonArray = data.objSearchControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var moduel_id = "<option value=" + resData.moduel_id + ">" + resData.moduel_name + "</option>";
                    $(moduel_id).appendTo('#LH_departmentId');
                });
            }
        },
        error: function(err) {
            console.error("Error in Get_Department_Details_DropDown" + JSON.stringify(err));
        }
    });
}

/*
 For Get_Employee_Availbility_Operators Purpose
 */
function Get_Employee_Availbility_Operators() {

    var moduleid = $('#EAO_department_Id').val();
    var zoneid = $('#EAO_ZoneId').val();
    var baselocatioId = $('#EAO_BaselocatioId').val();
    var vehicleId = $('#EAO_VehicleId').val();
    var userid = "1";//Temporarory Purpose
    if (userid === null || userid === undefined) {
        userid = "0";
    }

    if (moduleid === "0") {
        showNotificationError(' Please select department', 'EAO_SaveId', 'error');
        return false;
    }
    if (zoneid === "0") {
        showNotificationError(' Please select zone', 'EAO_SaveId', 'error');
        return false;
    }
    if (baselocatioId === "0") {
        showNotificationError(' Please select baselocation', 'EAO_SaveId', 'error');
        return false;
    }
    if (vehicleId === "0") {
        showNotificationError(' Please select vehicle ', 'EAO_SaveId', 'error');
        return false;
    }
    var json_Employee_Availbility_Operators = {
        "moduleid": moduleid,
        "location_id": zoneid,
        "location_basedid": baselocatioId,
        "vehicle_id": vehicleId,
        "user_id": userid
    };

    var strUrl = Service.Get_Employee_Availbility_Operators;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Employee_Availbility_Operators),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            Get_Employee_Availbility_Operators_DOM(jsonArray);
            loadDataTable5();
            if (responsecode !== 200) {
                $('#EA_OperatorsId').html('NO DATA FOUND');
            } else {
                var jsonArray = data.objResourceProfilesControllerDTO;
                Get_Employee_Availbility_Operators_DOM(jsonArray);
                loadDataTable5();
            }
        }, error: function() {
            console.log('In Error of Get_Employee_Availbility_Operators Details ');
        }
    });
}


function Get_Employee_Availbility_Operators_DOM(strData) {
    $('#EA_OperatorsId').empty();
    try {
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-ea_opearators");
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
        $(objTHead2).html("Base Location");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);


        var objTHead3 = document.createElement("th");
        $(objTHead3).html("Name Of Staff");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);

        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Flack Id");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);

        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Department");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);

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
            $(tablcol2).html(strData[i].location_basename);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).html(strData[i].user_name);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).html(strData[i].user_id);
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            var module_name = strData[i].module_name;
            if (module_name === "NA") {
                $(tablcol5).html('Not Found');
            } else {
                $(tablcol5).html(module_name);
            }
            $(tbleRow).append(tablcol5);

            //Appending Body Here
            $(objTBody).append(tbleRow);
        }
        $("#EA_OperatorsId").append(objDivTag);
    } catch (err) {
        console.log("EA_OperatorsId" + err);
    }
}


function loadDataTable5() {
    $('.dataTables-ea_opearators').DataTable({// Data table
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