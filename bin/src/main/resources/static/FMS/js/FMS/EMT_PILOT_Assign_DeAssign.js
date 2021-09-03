/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    try {
        zonesListDropDown();
        getEmtPilotAssignDetails();
        getBaselocationDropdownForEmployee();
        assignedEmployees();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});
/* 
 * @Author : Habiboon Patan
 * @Date : 05-08-2019
 * @Desc : zonesListDropDown
 */
function zonesListDropDown() {
    try {
        $('#zoneId').empty();
        $('#up_zoneId').empty();
        $('#transfer_zoneId').empty();
        var strUrl = Service.ZONES_LIST;
        console.log("ZONES_LIST:::: " + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objCommonDataControllerDTO;
                    var selectfirst = "<option value='0'>Please Select Zone</option>";
                    $('#zoneId').append(selectfirst);

                    $('#up_zoneId').append(selectfirst);
                    $('#transfer_zoneId').append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var zoneData = "<option value=" + resData.zoneId + ">" + resData.zoneName + "</option>";
                        $(zoneData).appendTo('#zoneId');
                        $(zoneData).appendTo('#up_zoneId');
                        $(zoneData).appendTo('#transfer_zoneId');
                    });
                }
            },
            error: function (err) {
                console.error("Error in zonesListDropDown" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in zonesListDropDown()' + err);
    }
    $('#zoneId').trigger("chosen:updated");
    $('#up_zoneId').trigger("chosen:updated");
    $('#transfer_zoneId').trigger("chosen:updated");
    $('#zoneId').chosen();
    $('#up_zoneId').chosen();
    $('#transfer_zoneId').chosen();
}


$('#zoneId').on('change', function () {
    var ZoneId = $('#zoneId').val();
    $('#districtdropid').empty();
    districtsDropDownBasedOnZoneId(ZoneId, 'districtdropid');
});
$('#up_zoneId').on('change', function () {
    var ZoneId = $('#up_zoneId').val();
    $('#up_districtdropid').empty();
    districtsDropDownBasedOnZoneId(ZoneId, 'up_districtdropid');
});
$('#transfer_zoneId').on('change', function () {
    var ZoneId = $('#transfer_zoneId').val();
    $('#transfer_districtdropid').empty();
    districtsDropDownBasedOnZoneId(ZoneId, 'transfer_districtdropid');
});


/* 
 * @Author : Habiboon Patan
 * @Date : 05-08-2019
 * @Desc : districtsDropDownBasedOnZoneId
 */


function districtsDropDownBasedOnZoneId(ZoneId, districtId) {
    try {
        var id = '#' + districtId;
        $(id).empty();
        var strUrl = Service.DISTRICTS_LIST;
        console.log("DISTRICTS_LIST:::: " + strUrl);
        var obj_Insert = {
            zoneId: ZoneId
        }
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objCommonDataControllerDTO;
                    var selectfirst = "<option value='0'>Please Select Districts</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var zoneData = "<option value=" + resData.districtId + ">" + resData.districtName + "</option>";
                        $(zoneData).appendTo(id);
                    });
                }
            },
            error: function (err) {
                console.error("Error in districtsDropDownBasedOnZoneId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in districtsDropDownBasedOnZoneId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}


$('#districtdropid').on('change', function () {
    var districtId = $('#districtdropid').val();
    $('#baselocId').empty();
    baseLocationsDropDownBasedOnDistrictId(districtId, 'baselocId');
});

$('#up_districtdropid').on('change', function () {
    var districtId = $('#up_districtdropid').val();
    $('#up_baselocId').empty();
    baseLocationsDropDownBasedOnDistrictId(districtId, 'up_baselocId');
});
$('#transfer_districtdropid').on('change', function () {
    var districtId = $('#transfer_districtdropid').val();
    $('#transfer_baselocId').empty();
    baseLocationsDropDownBasedOnDistrictId(districtId, 'transfer_baselocId');
});
/* 
 * @Author : Habiboon Patan
 * @Date : 05-08-2019
 * @Desc : baseLocationsDropDownBasedOnDistrictId
 */
function baseLocationsDropDownBasedOnDistrictId(districtId, baselocationid) {
    try {
        var id = '#' + baselocationid;
        $(id).empty();
        var strUrl = Service.BASELOCATIONS_LIST;
        console.log("BASELOCATIONS_LIST:::: " + strUrl);
        var obj_Insert = {
            districtId: districtId
        }
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objCommonDataControllerDTO;
                    var selectfirst = "<option value='0'>Please Select Baslocation</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var baselocation = "<option value=" + resData.baseLocId + ">" + resData.baseLocName + "</option>";
                        $(baselocation).appendTo(id);
                    });
                }
            },
            error: function (err) {
                console.error("Error in baseLocationsDropDownBasedOnDistrictId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in baseLocationsDropDownBasedOnDistrictId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}


$('#baselocId').on('change', function () {
    var baselocId = $('#baselocId').val();
    $('#Vehicleiddropid').empty();
    vehiclesDropDownBasedOnBaseLocId(baselocId, 'Vehicleiddropid');
});

$('#search_baselocId').on('change', function () {
    var baselocId = $('#search_baselocId').val();
    $('#search_Vehicleiddropid').empty();
    vehiclesDropDownBasedOnBaseLocId(baselocId, 'search_Vehicleiddropid');
});

$('#up_baselocId').on('change', function () {
    var baselocId = $('#up_baselocId').val();
    $('#up_Vehicleiddropid').empty();
    vehiclesDropDownBasedOnBaseLocId(baselocId, 'up_Vehicleiddropid');
});
$('#transfer_baselocId').on('change', function () {
    var baselocId = $('#transfer_baselocId').val();
    $('#transfer_Vehicleiddropid').empty();
    vehiclesDropDownBasedOnBaseLocId(baselocId, 'transfer_Vehicleiddropid');
});
/* 
 * @Author : Habiboon Patan
 * @Date : 05-08-2019
 * @Desc : vehiclesDropDownBasedOnBaseLocId
 */
function vehiclesDropDownBasedOnBaseLocId(baselocId, Vehicleiddropid) {
    try {
        var id = '#' + Vehicleiddropid;
        $(id).empty();
        var strUrl = Service.GET_VEHICLES_BASED_ON_BASELOCID;
        console.log("GET_VEHICLES_BASED_ON_BASELOCID:::: " + strUrl);
        var obj_Insert = {
            baseLocId: baselocId
        }
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objCommonDataControllerDTO;
                    var selectfirst = "<option value='0'>Select Vehicle</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var baselocation = "<option value=" + resData.vehicleId + ">" + resData.vehicleNumber + "</option>";
                        $(baselocation).appendTo(id);
                    });
                }
            },
            error: function (err) {
                console.error("Error in vehiclesDropDownBasedOnBaseLocId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in vehiclesDropDownBasedOnBaseLocId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}


$('#emtPilotId').on('change', function () {
    var emtPilotId = $('#emtPilotId').val();
    $('#emtPilotlistid').empty();
    emtPilotListBasedOnModuleId(emtPilotId, 'emtPilotlistid');
});
$('#up_emtPilotId').on('change', function () {
    var emtPilotId = $('#up_emtPilotId').val();
    $('#up_emtPilotlistid').empty();
    emtPilotListBasedOnModuleId(emtPilotId, 'up_emtPilotlistid');
});

/* 
 * @Author : Habiboon Patan
 * @Date : 05-08-2019
 * @Desc : emtPilotListBasedOnModuleId
 */

function emtPilotListBasedOnModuleId(emtPilotId, emtPilotlistid) {
    try {
        var id = '#' + emtPilotlistid;
        $(id).empty();
        var strUrl = Service.GET_USERS_LIST_BASED_ON_MODULEID;
        console.log("GET_USERS_LIST_BASED_ON_MODULEID:::: " + strUrl);
        var obj_Insert = {
            moduleId: emtPilotId
        };
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objCommonDataControllerDTO;
                    var selectfirst = "<option value='0'>Select Employe</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var employeeData = "<option value=" + resData.userId + ">" + resData.userName + "</option>";
                        $(employeeData).appendTo(id);
                    });
                }
            },
            error: function (err) {
                console.error("Error in emtPilotListBasedOnModuleId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in emtPilotListBasedOnModuleId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}


/*
 *@DESC :assignDeassignEmtPilotToVehicle
 *@AuthorName : Habiboon Patan
 *@DATE : 2019-08-07
 */

function assignDeassignEmtPilotToVehicle() {
    var conditionId = 1;
    var locid = $('#baselocId').val();
    var zoneId = $('#zoneId').val();
    var districtdropid = $('#districtdropid').val();
    var employeeid = $('#emtPilotlistid').val();
    var baselocId = $('#baselocId').val();
    var createdbyid = 1;
    var createdbyroleid = 1;
    var createdbymoduleid = 1;
    var centerid = 1;
    var nodeid = 1;
    var vehicle_id = $('#Vehicleiddropid').val();
    var module_id = $('#emtPilotId').val();
    var updatedbyid = 0;
    var deassignRemarks = null;
    if (zoneId === "0") {
        showNotificationError("Select zone", "zoneId", "error");
        return;
    }
    else if (districtdropid === "0") {
        showNotificationError("Select district", "districtdropid", "error");
        return;
    }
    else if (baselocId === "0") {
        showNotificationError("Select baseLocation", "baselocId", "error");
        return;
    }
    else if (vehicle_id === "0") {
        showNotificationError("Select vehicle", "Vehicleiddropid", "error");
        return;
    }
    else if (employeeid === "0") {
        showNotificationError("Select employeeType", "emtPilotId", "error");
        return;
    }
    else if (module_id === "0") {
        showNotificationError("Select employee", "emtPilotlistid", "error");
        return;
    }

    var obj_Insert = {
        condition: conditionId,
        locid: locid,
        employeeid: employeeid,
        createdbyid: createdbyid,
        createdbyroleid: createdbyroleid,
        createdbymoduleid: createdbymoduleid,
        centerid: centerid,
        nodeid: nodeid,
        vehicle_id: vehicle_id,
        module_id: module_id,
        updatedbyid: updatedbyid,
        deassignRemarks: deassignRemarks,
        zoneId: zoneId,
        districtId: districtdropid
    };

    console.log('==== Obj_Insert' + JSON.stringify(obj_Insert));
    var strUrl = Service.ASSIGN_DEASSIGN_EMT_PILOT;
    console.log('ASSIGN_DEASSIGN_EMT_PILOT:::: ' + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function (data) {
            if (data !== null || data !== 0) {
                showNotificationError("Assiged Successfully", "assignEmtPilotId", "success");
                getEmtPilotAssignDetails();
                reg_reset();
                $('#employee').modal('toggle');
            }
        },
        error: function () {
            console.log("Error In assignDeassignEmtPilotToVehicle");
        }
    });
}


function getEmtPilotAssignDetails() {
    $('#driverTable').html("");
    var baselocationID = $('#search_baselocId').val();
    var employeeId = $('#search_emtPilotlistid').val();
    var vehicleId = $('#search_Vehicleiddropid').val();
    if (baselocationID === '' || baselocationID === 'undefined' || baselocationID === undefined || baselocationID === null) {
        baselocationID = 0;
    }
    if (employeeId === '' || employeeId === 'undefined' || employeeId === undefined) {
        employeeId = 0;
    }
    if (vehicleId === "" || vehicleId === 'undefined' || vehicleId === undefined) {
        vehicleId = 0;
    }

    var obj_Insert = {
        baselocationId: baselocationID,
        employeeId: employeeId,
        vehicleId: vehicleId
    };
    var strUrl = Service.GET_EMT_PILOT_ASSIGN_DETAILS;
    console.log("GET_EMT_PILOT_ASSIGN_DETAILS::::: " + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
                var divTag = document.createElement("h2");
                $(divTag).css("text-align", "center");
                $(divTag).html("No data available....");
                $('#driverTable').append(divTag);
            }
            else {
                var jsonArray = data.objEmtPilotAssignDeassignControllerDTO;
                if (jsonArray.length > 0) {
                    getEmtPilotAssignList(jsonArray);
                    loadDataTable();
                }
            }
        },
        error: function (err) {
            console.error('update Stock error: ' + JSON.stringify(err));
        }
    });
}
function getEmtPilotAssignList(strData) {

    var objDivTag = document.createElement('div');
    $(objDivTag).addClass('table-responsive');

    var objTableTag = document.createElement('table');
    $(objTableTag).addClass('table table-striped table-bordered table-hover dataTables-example');
    $(objDivTag).append(objTableTag);

    var objTHead = document.createElement('thead');
    $(objTableTag).append(objTHead);

    var objTr = document.createElement('tr');
    $(objTHead).append(objTr);

    var objTHead1 = document.createElement('th');
    $(objTHead1).html('S.No');
    $(objTr).append(objTHead1);

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Vehicle Reg Number');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('District  Name');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Base Location  Name');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Employee Name');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('Employee Designation');
    $(objTr).append(objTHead7);

    var objTHead8 = document.createElement('th');
    $(objTHead8).html('History');
    $(objTr).append(objTHead8);

    var objTHead18 = document.createElement('th');
    $(objTHead18).html('Update/Transfer');
    $(objTr).append(objTHead18);

    var objTHead9 = document.createElement('th');
    $(objTHead9).html('De-Assign');
    $(objTr).append(objTHead9);

    var objTBody = document.createElement('tbody');
    $(objTBody).attr('id', 'driverTablebody');
    $(objTableTag).append(objTBody);

    for (var i = 0; i < strData.length; i++) {

        var index = i + 1;
        var tbleRow = document.createElement('tr');

        var tblCol = document.createElement('td');
        $(tblCol).addClass('text-center');
        $(tblCol).html(index);
        $(tbleRow).append(tblCol);

        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].vehicleRegistrationNumber);
        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');
        $(tblCol2).html(strData[i].district);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');
        $(tblCol3).html(strData[i].baselocName);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].employeeName);
        $(tbleRow).append(tblCol4);

        var tblCol5 = document.createElement('td');
        $(tblCol5).addClass('text-center');
        $(tblCol5).html(strData[i].employeeDesignation);
        $(tbleRow).append(tblCol5);

        var tablcol11 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode("History");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-primary btn-sm');
        $(buttonTag).attr('onclick', 'get_Emt_pilot_history("' + strData[i].vehicleId + '")');
        $(tablcol11).append(buttonTag);
        $(tablcol11).css('height', '36px');
        $(tbleRow).append(tablcol11);

        var tablcol21 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode("Update/Transfer");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-primary btn-sm');

        $(buttonTag).attr('onclick', 'get_rowData("' + strData[i].zoneName + '","' + strData[i].zoneId + '","' + strData[i].districtId + '","' + strData[i].district + '","' + strData[i].baselocationId + '","' + strData[i].baselocName + '","' + strData[i].vehicleId + '","' + strData[i].vehicleRegistrationNumber + '","' + strData[i].employeeDesignation + '","' + strData[i].employeeId + '","' + strData[i].employeeName + '", "' + strData[i].empRoleId + '")');

        $(tablcol21).append(buttonTag);
        $(tablcol21).css('height', '36px');
        $(tbleRow).append(tablcol21);

        var tablcol12 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode("De-Assign");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-warning btn-sm');
        $(buttonTag).attr('onclick', 'De_AssignEmtPilotFromVehicle("' + strData[i].vehicleId + '","' + strData[i].employeeId + '")');
        $(buttonTag).attr('id', 'emtPilotDeAssignId');
        $(tablcol12).append(buttonTag);
        $(tablcol12).css('height', '36px');
        $(tbleRow).append(tablcol12);
        $(objTBody).append(tbleRow);
    }
    $("#driverTable").append(objDivTag);
}


function get_rowData(zoneName, zoneId, districtId, district, baselocationId, baselocName, vehicleId, vehicleRegistrationNumber, employeeDesignation, employeeId, employeeName, empRoleId) {
    $('#update').modal('show');
//    just second
//update
    $("#up_zoneId option:contains(" + zoneName + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_emtPilotId option:contains(" + employeeDesignation + ")").attr('selected', 'selected').trigger("chosen:updated");
    districtsDropDownBasedOnZoneId(zoneId, 'up_districtdropid');
    $("#up_districtdropid option:contains(" + district + ")").attr('selected', 'selected').trigger("chosen:updated");

    baseLocationsDropDownBasedOnDistrictId(districtId, 'up_baselocId');
    $("#up_baselocId option:contains(" + baselocName + ")").attr('selected', 'selected').trigger("chosen:updated");

    vehiclesDropDownBasedOnBaseLocId(baselocationId, 'up_Vehicleiddropid');
    $("#up_Vehicleiddropid option:contains(" + vehicleRegistrationNumber + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_emtPilotId option:contains(" + employeeName + ")").attr('selected', 'selected').trigger("chosen:updated");
//    assignedEmployees(empRoleId, 'up_emtPilotlistid');
    emtPilotListBasedOnModuleId(empRoleId, 'up_emtPilotlistid')
    $("#up_emtPilotlistid option:contains(" + employeeDesignation + ")").attr('selected', 'selected').trigger("chosen:updated");

//transfer
    $("#transfer_zoneId option:contains(" + zoneName + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#transfer_emtPilotId option:contains(" + employeeDesignation + ")").attr('selected', 'selected').trigger("chosen:updated");
    districtsDropDownBasedOnZoneId(zoneId, 'transfer_districtdropid');
    $("#transfer_districtdropid option:contains(" + district + ")").attr('selected', 'selected').trigger("chosen:updated");

    baseLocationsDropDownBasedOnDistrictId(districtId, 'transfer_baselocId');
    $("#transfer_baselocId option:contains(" + baselocName + ")").attr('selected', 'selected').trigger("chosen:updated");

    vehiclesDropDownBasedOnBaseLocId(baselocationId, 'transfer_Vehicleiddropid');
    $("#transfer_Vehicleiddropid option:contains(" + vehicleRegistrationNumber + ")").attr('selected', 'selected').trigger("chosen:updated");

    emtPilotListBasedOnModuleId(empRoleId, 'transfer_emtPilotlistid');
    $("#transfer_emtPilotlistid option:contains(" + employeeName + ")").attr('selected', 'selected').trigger("chosen:updated");

}


var deassign_vehicleId;
var deassign_employeeId;
function De_AssignEmtPilotFromVehicle(vehicleId, employeeId) {
    $('#deleteConfirmation').modal('show');
    deassign_vehicleId = vehicleId;
    deassign_employeeId = employeeId;
}

function DeAssignEmployee() {
    var conditionId = 2;
    var locid = 0;
    var employeeid = deassign_employeeId;
    var createdbyid = 0;
    var createdbyroleid = 0;
    var createdbymoduleid = 0;
    var centerid = 0;
    var nodeid = 0;
    var vehicle_id = deassign_vehicleId;
    var module_id = 0;
    var updatedbyid = 2;
    var deassignRemarks = $('#empDeassignRemarksId').val();
    var zoneId = 0;
    var districtdropid = 0;

    if (deassignRemarks === null || deassignRemarks === '' || deassignRemarks === "") {
        showNotificationError("Enter De-assign Remarks", "empDeassignRemarksId", "error");
    } else {
        var obj_Insert = {
            condition: conditionId,
            locid: locid,
            employeeid: employeeid,
            createdbyid: createdbyid,
            createdbyroleid: createdbyroleid,
            createdbymoduleid: createdbymoduleid,
            centerid: centerid,
            nodeid: nodeid,
            vehicle_id: vehicle_id,
            module_id: module_id,
            updatedbyid: updatedbyid,
            deassignRemarks: deassignRemarks,
            zoneId: zoneId,
            districtId: districtdropid
        };

        console.log('==== Obj_Insert' + JSON.stringify(obj_Insert));
        var strUrl = Service.ASSIGN_DEASSIGN_EMT_PILOT;
        console.log('ASSIGN_DEASSIGN_EMT_PILOT:::::: ' + strUrl);
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function (data) {
                if (data !== null || data !== 0) {
                    showNotificationError("De-Assigned Successfully", "emtPilotDeAssignId", "success");
                    getEmtPilotAssignDetails();
                    resetRemakrs();
                    $('#deleteConfirmation').modal('toggle');
                }
            },
            error: function () {
                console.log("Error In De_AssignEmtPilotFromVehicle");
            }
        });
    }
}


function get_Emt_pilot_history(vehicleId) {
    $('#registration').modal('show');
    $('#driverTable1').html("");
    var obj_Insert = {
        vehicleId: vehicleId
    };
    var strUrl = Service.GET_EMT_PILOT_ASSIGN_DETAILS_BASEDON_VEHICLEID;
    console.log("GET_EMT_PILOT_ASSIGN_DETAILS_BASEDON_VEHICLEID:::: " + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
                var divTag = document.createElement("h2");
                $(divTag).css("text-align", "center");
                $(divTag).html("No data available....");
                $('#driverTable1').append(divTag);
            }
            else {
                var jsonArray = data.objEmtPilotAssignDeassignControllerDTO;
                if (jsonArray.length > 0) {
                    VehicleView(jsonArray);
                    loadDataTable1();
                }
            }
        },
        error: function (err) {
            console.error('update Stock error: ' + JSON.stringify(err));
        }
    });
}

function VehicleView(strData) {

    var objDivTag = document.createElement('div');
    $(objDivTag).addClass('table-responsive');

    var objTableTag = document.createElement('table');
    $(objTableTag).addClass('table table-striped table-bordered table-hover dataTables-example1');
    $(objDivTag).append(objTableTag);

    var objTHead = document.createElement('thead');
    $(objTableTag).append(objTHead);

    var objTr = document.createElement('tr');
    $(objTHead).append(objTr);

    var objTHead1 = document.createElement('th');
    $(objTHead1).html('S.No');
    $(objTr).append(objTHead1);

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Vehicle Reg Number');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('District  Name');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Base Location  Name');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Employee Name');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('Employee Designation');
    $(objTr).append(objTHead7);

    var objTHead8 = document.createElement('th');
    $(objTHead8).html('Assigned Time');
    $(objTr).append(objTHead8);

    var objTHead9 = document.createElement('th');
    $(objTHead9).html('Assigned By');
    $(objTr).append(objTHead9);

    var objTHead10 = document.createElement('th');
    $(objTHead10).html('De-Assigned Time');
    $(objTr).append(objTHead10);

    var objTHead11 = document.createElement('th');
    $(objTHead11).html('De-Assigned by');
    $(objTr).append(objTHead11);

    var objTBody = document.createElement('tbody');
    $(objTBody).attr('id', 'driverTablebody');
    $(objTableTag).append(objTBody);

    for (var i = 0; i < strData.length; i++) {
        var index = i + 1;
        var tbleRow = document.createElement('tr');

        var tblCol = document.createElement('td');
        $(tblCol).addClass('text-center');
        $(tblCol).html(index);
        $(tbleRow).append(tblCol);

        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].vehicleRegistrationNumber);

        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');

        $(tblCol2).html(strData[i].district);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');

        $(tblCol3).html(strData[i].baselocName);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].employeeName);
        $(tbleRow).append(tblCol4);

        var tblCol5 = document.createElement('td');
        $(tblCol5).addClass('text-center');
        $(tblCol5).html(strData[i].employeeDesignation);
        $(tbleRow).append(tblCol5);

        var tblCol6 = document.createElement('td');
        $(tblCol6).addClass('text-center');
        $(tblCol6).html(strData[i].assignedTime);
        $(tbleRow).append(tblCol6);

        var tblCol7 = document.createElement('td');
        $(tblCol7).addClass('text-center');
        $(tblCol7).html(strData[i].assignedUser);
        $(tbleRow).append(tblCol7);

        var tblCol8 = document.createElement('td');
        $(tblCol8).addClass('text-center');
        $(tblCol8).html(strData[i].deassignTime);
        $(tbleRow).append(tblCol8);

        var tblCol9 = document.createElement('td');
        $(tblCol9).addClass('text-center');
        $(tblCol9).html(strData[i].deassignedName);
        $(tbleRow).append(tblCol9);

        $(objTBody).append(tbleRow);
    }
    $("#driverTable1").append(objDivTag);
}

function loadDataTable() {
    $('.dataTables-example').DataTable(
            {
                "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1],
                    [5, 10, 15, 25, 50, 75, "All"]],
                "iDisplayLength": 5,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {
                        extend: 'copy'
                    },
                    {
                        extend: 'csv'
                    },
                    {
                        extend: 'excel',
                        title: 'EMT-PILOTAssignDeassign'
                    },
                    {
                        extend: 'pdf',
                        title: 'EMT-PILOTAssignDeassign'
                    },
                    {
                        extend: 'print',
                        customize: function (win) {
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table').addClass(
                                    'compact').css('font-size', 'inherit');
                        }
                    }]
            });
}
function loadDataTable1() {
    $('.dataTables-example1').DataTable(
            {
                "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1],
                    [5, 10, 15, 25, 50, 75, "All"]],
                "iDisplayLength": 5,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {
                        extend: 'copy'
                    },
                    {
                        extend: 'csv'
                    },
                    {
                        extend: 'excel',
                        title: 'History'
                    },
                    {
                        extend: 'pdf',
                        title: 'History'
                    },
                    {
                        extend: 'print',
                        customize: function (win) {
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table').addClass(
                                    'compact').css('font-size', 'inherit');
                        }
                    }]
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
//
//$('#up_emtPilotId').on('change', function() {
//    var emtPilotId = $('#up_emtPilotId').val();
//    $('#up_emtPilotlistid').empty();
//    assignedEmployees(emtPilotId, 'up_emtPilotlistid');
//});
//$('#transfer_emtPilotId').on('change', function() {
//    var emtPilotId = $('#transfer_emtPilotId').val();
//    $('#transfer_emtPilotlistid').empty();
//    assignedEmployees(emtPilotId, 'transfer_emtPilotlistid');
//});

/* 
 * @Author : Habiboon Patan
 * @Date : 05-08-2019
 * @Desc : emtPilotListBasedOnModuleId
 */

function assignedEmployees() {
    try {
        // $('#up_emtPilotlistid').empty();
        //  $('#transfer_emtPilotlistid').empty();
        $('#search_emtPilotlistid').empty();
        var strUrl = Service.ASSIGNED_EMPLOYEESLIST;
        console.log("assignedEmployees Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objCommonDataControllerDTO;
                    var selectfirst = "<option value='0'>Select Employee</option>";
                    //    $('#up_emtPilotlistid').append(selectfirst);
                    //    $('#transfer_emtPilotlistid').append(selectfirst);
                    $('#search_emtPilotlistid').append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var employeeData = "<option value=" + resData.userId + ">" + resData.userName + "</option>";
                        //  $(employeeData).appendTo('#up_emtPilotlistid');
                        //  $(employeeData).appendTo('#transfer_emtPilotlistid');
                        $(employeeData).appendTo('#search_emtPilotlistid');
                    });
                }
            },
            error: function (err) {
                console.error("Error in assignedEmployees" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in assignedEmployees()' + err);
    }
    //   $('#up_emtPilotlistid').trigger("chosen:updated");
    //   $('#transfer_emtPilotlistid').trigger("chosen:updated");
    $('#search_emtPilotlistid').trigger("chosen:updated");
    // $('#up_emtPilotlistid').chosen();
    // $('#transfer_emtPilotlistid').chosen();
    $('#search_emtPilotlistid').chosen();
}
function updateEmployee() {
    var vehicleId = $('#up_Vehicleiddropid').val();
    var employeeId = $('#up_emtPilotlistid').val();
    if (vehicleId === '0' || vehicleId === null || vehicleId === '' || vehicleId === 0) {
        showNotificationError("Select vehicle", "up_Vehicleiddropid", "error");
    }
    else if (employeeId === '0' || employeeId === null || employeeId === '' || employeeId === 0) {
        showNotificationError("Select Employee", "up_emtPilotlistid", "error");
    } else {
        var obj_Insert = {
            vehicleId: vehicleId,
            employeeId: employeeId
        };
        console.log('==== Obj_Insert' + JSON.stringify(obj_Insert));
        var strUrl = Service.UPDATE_EMPLOYEE_OF_VEHICLE;
        console.log('==== UPDATE_EMPLOYEE_OF_VEHICLE:::::: ' + strUrl);
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function (data) {
                if (data !== null || data !== 0) {
                    showNotificationError("Updated Successfully", "up_employeeId", "success");
                    getEmtPilotAssignDetails();
                    $('#update').modal('toggle');
                }
            },
            error: function () {
                console.log("Error In updateEmployee");
            }
        });
    }
}
function transferEmployee() {
    var vehicleId = $('#transfer_Vehicleiddropid').val();
    var employeeId = $('#transfer_emtPilotlistid').val();
    var zoneId = $('#transfer_zoneId').val();
    var districtId = $('#transfer_districtdropid').val();
    var baselocationID = $('#transfer_baselocId').val();
    if (vehicleId === '0' || vehicleId === null || vehicleId === '' || vehicleId === 0) {
        showNotificationError("Select vehicle", "transfer_Vehicleiddropid", "error");
    }
    else if (employeeId === '0' || employeeId === null || employeeId === '' || employeeId === 0) {
        showNotificationError("Select Employee", "transfer_emtPilotlistid", "error");
    } else {
        var obj_Insert = {
            vehicleId: vehicleId,
            employeeId: employeeId,
            districtId: districtId,
            zoneId: zoneId,
            baselocationId: baselocationID
        };
        console.log('==== Obj_Insert' + JSON.stringify(obj_Insert));
        var strUrl = Service.TRANSFER_EMPLOYEE_TO_ANOTHER_VEHICLE;
        console.log('==== TRANSFER_EMPLOYEE_TO_ANOTHER_VEHICLE:::: ' + strUrl);
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function (data) {
                if (data !== null || data !== 0) {
                    showNotificationError("Transferred Successfully", "transferEmployeeId", "success");
                    getEmtPilotAssignDetails();
                    $('#update').modal('toggle');
                }
            },
            error: function () {
                console.log("Error In updateEmployee");
            }
        });
    }
}
function Search_reset() {

    $('#search_baselocId').val('0').trigger('chosen:updated');
    $('#search_Vehicleiddropid').val('0').trigger('chosen:updated');
    $('#search_emtPilotId').val('0').trigger('chosen:updated');
    $('#search_emtPilotlistid').val('0').trigger('chosen:updated');
    getEmtPilotAssignDetails();

}
function reg_reset() {
    $('#zoneId').val('0').trigger('chosen:updated');
    $('#districtdropid').val('0').trigger('chosen:updated');
    $('#baselocId').val('0').trigger('chosen:updated');
    $('#Vehicleiddropid').val('0').trigger('chosen:updated');
    $('#emtPilotId').val('0').trigger('chosen:updated');
    $('#emtPilotlistid').val('0').trigger('chosen:updated');
}
function resetRemakrs() {
    $('#empDeassignRemarksId').val('');
}
/* 
 * @Author : Habiboon Patan
 * @Date : 14-12-2019
 * @Desc : addedBaselocationDropdown
 */
function getBaselocationDropdownForEmployee() {
    try {
        $('#search_baselocId').empty();
        var strUrl = Service.GET_BASELOCATIONDROPDOWNLIST_FOR_EMPLOYEE;
        console.log("addedBaselocationDropdown Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objBaselocationDropdownControllerDTO;
                    var selectfirst = "<option value='0'>Select Baselocation</option>";
                    $('#search_baselocId').append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var vehicleData = "<option value=" + resData.baselocationId + ">" + resData.baselocationName + "</option>";

                        $(vehicleData).appendTo('#search_baselocId');
                    });
                }
            },
            error: function (err) {
                console.error("Error in getBaselocationDropdownForEmployee" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getBaselocationDropdownForEmployee()' + err);
    }
    $('#search_baselocId').trigger("chosen:updated");
    $('#search_baselocId').chosen();

}

