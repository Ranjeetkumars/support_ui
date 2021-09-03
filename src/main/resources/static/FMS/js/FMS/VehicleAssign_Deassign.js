/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var employeeid;
var vehicle_id;

$(document).ready(function() {
    try {
//    	 var token_id = localStorage.getItem("token");
//  	   var user_id=localStorage.getItem("userID");
//  	  var module_id=localStorage.getItem("fms_moduleID");
//	   var role_id=localStorage.getItem("fms_roleID");
//   	 var token_id = localStorage.getItem("token");
	   var user_id=1;
	  var module_id=1;
	   var role_id=1;
        vehiclesDropDown();
        zonesListDropDown();
        getAssignVehicleDetails();
        assignedVehiclesDropdown();
        getaddedBaselocationDropdown();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});


/* 
 * @Author : Habiboon Patan
 * @Date : 05-08-2019
 * @Desc : vehiclesDropDown
 */
function vehiclesDropDown() {
    try {
        $('#Vehicleid').empty();
        $('#up_Vehicleid').empty();
        var strUrl = Service.GETVEHICLES_DROPDOWN;
        console.log("vehiclesDropDown Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objCommonDataControllerDTO;
                    var selectfirst = "<option value='0'>Please Select Vehicle</option>";
                    $('#Vehicleid').append(selectfirst);
                    $('#up_Vehicleid').append(selectfirst);

                    $.each(jsonArray, function(i, resData) {
                        var vehicleData = "<option value=" + resData.vehicleId + ">" + resData.vehicleNumber + "</option>";

                        $(vehicleData).appendTo('#Vehicleid');
                        $(vehicleData).appendTo('#up_Vehicleid');
                    });
                }
            },
            error: function(err) {
                console.error("Error in vehiclesDropDown" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in vehiclesDropDown()' + err);
    }
    $('#Vehicleid').trigger("chosen:updated");
    $('#up_Vehicleid').trigger("chosen:updated");
    $('#Vehicleid').chosen();
    $('#up_Vehicleid').chosen();

}
/* 
 * @Author : Habiboon Patan
 * @Date : 05-08-2019
 * @Desc : vehiclesDropDown
 */
function assignedVehiclesDropdown() {
    try {
        $('#search_Vehicleid').empty();
        $('#transfer_Vehicleid').empty();
        var strUrl = Service.GET_ASSIGNED_VEHICLES;
        console.log("assignedVehiclesDropdown Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objCommonDataControllerDTO;
                    var selectfirst = "<option value='0'>Select Vehicle</option>";
                    $('#search_Vehicleid').append(selectfirst);
                    $('#transfer_Vehicleid').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var vehicleData = "<option value=" + resData.vehicleId + ">" + resData.vehicleNumber + "</option>";
                        $(vehicleData).appendTo('#search_Vehicleid');
                        $(vehicleData).appendTo('#transfer_Vehicleid');
                    });
                }
            },
            error: function(err) {
                console.error("Error in assignedVehiclesDropdown" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in assignedVehiclesDropdown()' + err);
    }
    $('#search_Vehicleid').trigger("chosen:updated");
    $('#transfer_Vehicleid').trigger("chosen:updated");
    $('#search_Vehicleid').chosen();
    $('#transfer_Vehicleid').chosen();
}



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
        console.log("zonesListDropDown Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objCommonDataControllerDTO;
                    var selectfirst = "<option value='0'>Please Select Zone</option>";
                    $('#zoneId').append(selectfirst);
                    $('#up_zoneId').append(selectfirst);
                    $('#transfer_zoneId').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var zoneData = "<option value=" + resData.zoneId + ">" + resData.zoneName + "</option>";
                        $(zoneData).appendTo('#zoneId');

                        $(zoneData).appendTo('#up_zoneId');
                        $(zoneData).appendTo('#transfer_zoneId');
                    });
                }
            },
            error: function(err) {
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


$('#zoneId').on('change', function() {
    var ZoneId = $('#zoneId').val();
    $('#districtid').empty();
    districtsDropDownBasedOnZoneId(ZoneId, 'districtid');
});
$('#up_zoneId').on('change', function() {
    var ZoneId = $('#up_zoneId').val();
    $('#up_districtid').empty();
    districtsDropDownBasedOnZoneId(ZoneId, 'up_districtid');
});
$('#transfer_zoneId').on('change', function() {
    var ZoneId = $('#transfer_zoneId').val();
    $('#transfer_districtid').empty();
    districtsDropDownBasedOnZoneId(ZoneId, 'transfer_districtid');
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
        console.log("zonesListDropDown Url is:" + strUrl);
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
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objCommonDataControllerDTO;
                    var selectfirst = "<option value='0'>Please Select Districts</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var zoneData = "<option value=" + resData.districtId + ">" + resData.districtName + "</option>";
                        $(zoneData).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in districtsDropDownBasedOnZoneId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in districtsDropDownBasedOnZoneId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}


$('#districtid').on('change', function() {
    var districtId = $('#districtid').val();
    $('#baselocationid').empty();
    baseLocationsDropDownBasedOnDistrictId(districtId, 'baselocationid');
});

$('#up_districtid').on('change', function() {
    var districtId = $('#up_districtid').val();
    $('#up_baselocationid').empty();
    baseLocationsDropDownBasedOnDistrictId(districtId, 'up_baselocationid');
});
$('#transfer_districtid').on('change', function() {
    var districtId = $('#transfer_districtid').val();
    $('#transfer_baselocationid').empty();
    baseLocationsDropDownBasedOnDistrictId(districtId, 'transfer_baselocationid');
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
        console.log("baseLocationsDropDownBasedOnDistrictId Url is:" + strUrl);
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
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objCommonDataControllerDTO;
                    var selectfirst = "<option value='0'>Please Select Baslocation</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var zoneData = "<option value=" + resData.baseLocId + ">" + resData.baseLocName + "</option>";
                        $(zoneData).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in baseLocationsDropDownBasedOnDistrictId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in baseLocationsDropDownBasedOnDistrictId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}


/*
 *@DESC : insertVehicleAssignDeAssignDetails
 *@AuthorName : Habiboon Patan
 *@DATE : 2019-08-06
 */

function insertVehicleAssignDeAssignDetails() {
	 var user_id=1;
	  var module_id=1;
	   var role_id=1;
    var zoneId = $('#zoneId').val();
    var districtid = $('#districtid').val();
    var conditionId = 1;
    var vehicleId = $('#Vehicleid').val();
    var baseLocationId = $('#baselocationid').val();
 
    var updatedbyid = 0;
    var remarks = 'AS PER MAHENDER SIR';
    var updtated_remarks = '';
    var obj_Insert = {
        conditionId: conditionId,
        vl_vehicleid: vehicleId,
        vl_locationbaseid: baseLocationId,
        vl_createdbyid: user_id,
        vl_createdbyroleid: role_id,
        vl_createdbymoduleid: module_id,
        vl_updatedbyid: updatedbyid,
        vl_remarks: remarks,
        vl_updtated_remarks: updtated_remarks,
        vl_districtid: districtid,
    	 vl_zoneId: zoneId
      
    };

    if (vehicleId === "0") {
        showNotificationError("Select Vechile", "Vehicleid", "error");
        return;
    }
    else if (zoneId === "0") {
        showNotificationError("Select Zone", "zoneId", "error");
        return;
    }
    else if (districtid === "0") {
        showNotificationError("Select district", "districtid", "error");
        return;
    } else if (baseLocationId === "0") {
        showNotificationError("Select Baselocationid", "baselocationid", "error");
        return;
    }
    var strUrl = Service.ASSIGN_VEHICLE_TO_BASELOCATION;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            if (data.responseCode == 200 || data.responseCode == '200') {
            	
                showNotificationError("Vehicle Assign Successfully", "Assignbtnid", "success");
                getAssignVehicleDetails();
                reset();
                $('#addVehicleToBaselocation').modal('toggle');
            }
            else{
                showNotificationError("Not Assign", "Assignbtnid", "error");

            }
        },
        error: function() {
            console.log("Error In insertVehicleAssignDeAssignDetails");
        }
    });
}

function getAssignVehicleDetails() {
    $('#driverTable').html("");

    var baselocationID = $('#search_baselocationid').val();
    var vehicleId = $('#search_Vehicleid').val();

    if (baselocationID === "undefined" || baselocationID === 'undefined' || baselocationID === undefined) {
        baselocationID = 0;
    }
    if (vehicleId === "undefined" || vehicleId === 'undefined' || vehicleId === undefined) {
        vehicleId = 0;
    }
    var obj_Insert = {
        baselocationId: baselocationID,
        vehicleNo: vehicleId
    };

    var strUrl = Service.GET_ASSIGN_VEHICLE_DETAILS;
    console.log("strUrl : " + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
                var divTag = document.createElement("h2");
                $(divTag).css("text-align", "center");
                $(divTag).html("No data available....");
                $('#driverTable').append(divTag);
            }
            else {
                var jsonArray = data.objGetVehicleDetailsControllerDTO;
                if (jsonArray.length > 0) {
                    getList(jsonArray);
                    loadDataTable();
                }
            }
        },
        error: function(err) {
            console.error('update Stock error: ' + JSON.stringify(err));
        }
    });
}

var vehicleID;
var baselocationID;

function getList(strData) {

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
    $(objTHead3).html('Vehicle Number');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('District Name');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Base Location Name');
    $(objTr).append(objTHead5);

    var objTHead17 = document.createElement('th');
    $(objTHead17).html('History');
    $(objTr).append(objTHead17);

    var objTHead18 = document.createElement('th');
    $(objTHead18).html('Update');
    $(objTr).append(objTHead18);

    var objTHead17 = document.createElement('th');
    $(objTHead17).html('De-Assign');
    $(objTr).append(objTHead17);

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
        $(tblCol1).html(strData[i].vehicleRegNumber);
        $(tbleRow).append(tblCol1);

        vehicleID = strData[i].vehicleNo;
        baselocationID = strData[i].baselocationId;


        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');
        $(tblCol2).html(strData[i].districtName);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');
        $(tblCol3).html(strData[i].baselocationName);
        $(tbleRow).append(tblCol3);

        var tablcol11 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode("History");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-primary btn-sm');
        $(buttonTag).attr('onclick', 'get_vehicleDetails("' + strData[i].vehicleNo + '")');
        $(tablcol11).append(buttonTag);
        $(tablcol11).css('height', '36px');
        $(tbleRow).append(tablcol11);


        var tablcol11 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode("Update/Transfer");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-primary btn-sm');
        $(buttonTag).attr('onclick', 'get_Row_Data("' + strData[i].vehicleNo + '","' + strData[i].vehicleRegNumber + '", "' + strData[i].districtID + '", "' + strData[i].districtName + '", "' + strData[i].zoneId + '", "' + strData[i].zoneName + '", "' + strData[i].baselocationId + '", "' + strData[i].baselocationName + '")');
        $(tablcol11).append(buttonTag);
        $(tablcol11).css('height', '36px');
        $(tbleRow).append(tablcol11);


        var tablcol12 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode("De-Assign");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-warning btn-sm');
//        $(buttonTag).attr('onclick', 'De_AssignVehicleFromLocation("' + strData[i].vehicleId + '","' + strData[i].baseLocid + '")');
        $(buttonTag).attr('onclick', 'De_Assign("' + strData[i].vehicleNo + '","' + strData[i].baselocationId + '")');
        $(buttonTag).attr('id', 'deAssignId');
        $(tablcol12).append(buttonTag);
        $(tablcol12).css('height', '36px');
        $(tbleRow).append(tablcol12);

        $(objTBody).append(tbleRow);
    }
    $("#driverTable").append(objDivTag);
}
var baselocationId;
var vehId;
function De_Assign(vehicleId, baseLocid) {
    $('#DeAssign').modal('show');
    getEmtPilotAssignDetails(vehicleId, baseLocid);
    baselocationId = baseLocid;
    vehId = vehicleId;
}
function get_Row_Data(vehicleNo, vehicleRegNumber, districtID, districtName, zoneId1, zoneName, baselocationId, baselocationName) {
    $('#Update_addVehicleToBaselocation').modal('show');

    $("#up_Vehicleid option:contains(" + vehicleRegNumber + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_zoneId option:contains(" + zoneName + ")").attr('selected', 'selected').trigger("chosen:updated");
    districtsDropDownBasedOnZoneId(zoneId1, 'up_districtid');
    $("#up_districtid option:contains(" + districtName + ")").attr('selected', 'selected').trigger("chosen:updated");
    baseLocationsDropDownBasedOnDistrictId(districtID, 'up_baselocationid');
    $("#up_baselocationid option:contains(" + baselocationName + ")").attr('selected', 'selected').trigger("chosen:updated");


    $("#transfer_Vehicleid option:contains(" + vehicleRegNumber + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#transfer_zoneId option:contains(" + zoneName + ")").attr('selected', 'selected').trigger("chosen:updated");
    districtsDropDownBasedOnZoneId(zoneId1, 'transfer_districtid');
    $("#transfer_districtid option:contains(" + districtName + ")").attr('selected', 'selected').trigger("chosen:updated");
    baseLocationsDropDownBasedOnDistrictId(districtID, 'transfer_baselocationid');
    $("#transfer_baselocationid option:contains(" + baselocationName + ")").attr('selected', 'selected').trigger("chosen:updated");

}

function getEmtPilotAssignDetails(vehicleId) {

    $('#driverTable2').html("");
    var obj_Insert = {
        vehicleId: vehicleId
    };
    var strUrl = Service.GET_EMT_PILOT_ASSIGN_DETAILS_FOR_DEASSIGN;
    console.log("strUrl : " + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
                var divTag = document.createElement("h2");
                $(divTag).css("text-align", "center");
                $(divTag).html("No Employees Available....");
                $('#driverTable2').append(divTag);
                $("#emp :input").prop("disabled", true);
                $('#emp_de_Assign').prop('disabled', true);
            }
            else {
                $("#emp :input").prop("disabled", false);
                $('#emp_de_Assign').prop('disabled', false);
                var jsonArray = data.objEmtPilotAssignDeassignControllerDTO;
                if (jsonArray.length > 0) {
                    getEmtPilotAssignList(jsonArray);
                    loadDataTable1();

                }
            }
        },
        error: function(err) {
            console.error('update Stock error: ' + JSON.stringify(err));
        }
    });
}

var tempList = [];
var tempList1 = [];
function getEmtPilotAssignList(strData) {

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
    $(objTHead3).html('Vehicle Registration Number');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('District Name');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Base Location Name');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Employee Name');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('Employee Designation');
    $(objTr).append(objTHead7);

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

        var vehicleId_hi = strData[i].vehicleId;
        var employeeId_hi = strData[i].employeeId;

        tempList.push(strData[i].vehicleId);
        tempList1.push(strData[i].employeeId);

        $(objTBody).append(tbleRow);
    }
    $("#driverTable2").append(objDivTag);
}

function De_AssignEmtPilotFromVehicle1() {

    for (var i = 0; i < tempList.length; i++) {
        vehicle_id = tempList[i];
    }

    for (var i = 0; i < tempList1.length; i++) {
        employeeid = tempList1[i];


        var conditionId = 2;
        var locid = 0;
        employeeid = employeeid;
        var createdbyid = 0;
        var createdbyroleid = 0;
        var createdbymoduleid = 0;
        var centerid = 0;
        var nodeid = 0;
        vehicle_id = vehicle_id;
        var module_id = 0;
        var updatedbyid = 2;
        var zoneId = 0;
        var districtId = 0;
        var empdeassignRemarks = $('#empDeassignRemarksID').val();
        if (empdeassignRemarks === '' || empdeassignRemarks === null) {
            showNotificationError("Enter Employee Deassign Remarks", "empDeassignRemarksID", "error");
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
                deassignRemarks: empdeassignRemarks,
                zoneId: zoneId,
                districtId: districtId
            };

            console.log('==== Obj_Insert' + JSON.stringify(obj_Insert));
            var strUrl = Service.ASSIGN_DEASSIGN_EMT_PILOT;
            console.log('==== strUrl' + strUrl);
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(obj_Insert),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                success: function(data) {
                    if (data !== null || data !== 0) {
                        showNotificationError("De-Assigned Successfully", "emp_de_Assign", "success");
                        if (i === tempList1.length - 1) {
                            getEmtPilotAssignDetails();
                        }
                    }
                },
                error: function() {
                    console.log("Error In De_AssignEmtPilotFromVehicle");
                }
            });
        }
    }
}

function De_AssignVehicleFromLocation() {
    var text2 = $('#driverTable2').text();
    if (text2 !== "No Employees Available....") {
        showNotificationError("De Assign the Employee first", "emp_de_Assign", "error");
    } else {
        var conditionId = 2;
        var vehicleId = vehId;
        var baseLocationId = baselocationId;
        var createdbyid = 0;
        var createdbyroleid = 0;
        var createdbymoduleid = 0;
        var updatedbyid = 8;
        var remarks = '';
        var districtid = 0;
        var zoneId = 0;
        var updtated_remarks = $('#vehicleDeassignRemarksID').val();
        if (updtated_remarks === null || updtated_remarks === '') {
            showNotificationError("Enter Vehicel De-Assign Remarks", "vehicleDeassignRemarksID", "error");
        } else {
            var obj_Insert = {
                conditionId: conditionId,
                vl_vehicleid: vehicleId,
                vl_locationbaseid: baseLocationId,
                vl_createdbyid: createdbyid,
                vl_createdbyroleid: createdbyroleid,
                vl_createdbymoduleid: createdbymoduleid,
                vl_updatedbyid: updatedbyid,
                vl_remarks: remarks,
                vl_updtated_remarks: updtated_remarks,
                districtId: districtid,
                zoneId: zoneId
            };

            var strUrl = Service.ASSIGN_VEHICLE_TO_BASELOCATION;
            console.log('==== strUrl' + strUrl);
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(obj_Insert),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                success: function(data) {
                    if (data !== null || data !== 0) {
                        showNotificationError("Vehicle De-Assign Successfully", "Vehicle_de_Assign", "success");
                        getAssignVehicleDetails();

                        $('#DeAssign').modal('toggle');
                    }
                },
                error: function() {
                    console.log("Error In De_AssignVehicleFromLocation");
                }
            });
        }
    }
}


function get_vehicleDetails(vehicleId) {
    $('#registration').modal('show');
    $('#driverTable1').html("");
    var obj_Insert = {
        vehicleId: vehicleId
    };
    var strUrl = Service.GET_VIEW_DETAILS;
    console.log("strUrl : " + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
                var divTag = document.createElement("h2");
                $(divTag).css("text-align", "center");
                $(divTag).html("No data available....");
                $('#driverTable1').append(divTag);
            }
            else {
                var jsonArray = data.objGetVehicleAssignDeAssginToLocationControllerDTO;
                if (jsonArray.length > 0) {
                    VehicleView(jsonArray);
                    loadDataTable2();
                }
            }
        },
        error: function(err) {
            console.error('update Stock error: ' + JSON.stringify(err));
        }
    });
}


function VehicleView(strData) {

    var objDivTag = document.createElement('div');
    $(objDivTag).addClass('table-responsive');

    var objTableTag = document.createElement('table');
    $(objTableTag).addClass('table table-striped table-bordered table-hover dataTables-example2');
    $(objDivTag).append(objTableTag);

    var objTHead = document.createElement('thead');
    $(objTableTag).append(objTHead);

    var objTr = document.createElement('tr');
    $(objTHead).append(objTr);

    var objTHead1 = document.createElement('th');
    $(objTHead1).html('S.No');
    $(objTr).append(objTHead1);

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Vehicle Number');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('District Name');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Base Location Name');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Assigned Time');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('Assigner by');
    $(objTr).append(objTHead7);

    var objTHead8 = document.createElement('th');
    $(objTHead8).html('De-Assigned Time');
    $(objTr).append(objTHead8);

    var objTHead9 = document.createElement('th');
    $(objTHead9).html('De-Assigned by');
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
        $(tblCol1).html(strData[i].vehicleNumber);
        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');
        $(tblCol2).html(strData[i].distId);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');

        $(tblCol3).html(strData[i].baselocation);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].startDate);
        $(tbleRow).append(tblCol4);

        var tblCol5 = document.createElement('td');
        $(tblCol5).addClass('text-center');
        $(tblCol5).html(strData[i].assignUserName);
        $(tbleRow).append(tblCol5);

        var tblCol6 = document.createElement('td');
        $(tblCol6).addClass('text-center');
        $(tblCol6).html(strData[i].endDate);
        $(tbleRow).append(tblCol6);

        var tblCol7 = document.createElement('td');
        $(tblCol7).addClass('text-center');
        $(tblCol7).html(strData[i].updatedUserName);
        $(tbleRow).append(tblCol7);

        $(objTBody).append(tbleRow);
    }
    $("#driverTable1").append(objDivTag);
}





function transfer_vehicleTOAnotherBaselocation() {
    var vehicleId = $('#transfer_Vehicleid').val();
    var baselocationID = $('#transfer_baselocationid').val();
    var districtId = $('#transfer_districtid').val();
    var zoneId = $('#transfer_zoneId').val();
    var obj_Insert = {
        vehicleId: vehicleId,
        baselocationID: baselocationID,
        zoneId: zoneId,
        districtId: districtId
    };
    console.log('==== Obj_Insert' + JSON.stringify(obj_Insert));
    var strUrl = Service.TRANSFER_VEHICLE_TO_ANOTHER_BASELOCATION;
    console.log('==== strUrl' + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
        	
        	
            if (data.responseCode==200 || data.responseCode=='200') {
                showNotificationError("Transferred Successfully", "transfer_Assignbtnid", "success");
                getAssignVehicleDetails();
                $('#Update_addVehicleToBaselocation').modal('toggle');
            }
            else{
            	showNotificationError("Not Transfer", "transfer_Assignbtnid", "error");            }
        },
        error: function() {
            console.log("Error In transfer_vehicleTOAnotherBaselocation");
        }
    });

}


function updateBaselocationOfVehicle() {
    var vehicleId = $('#up_Vehicleid').val();
    var baselocationID = $('#up_baselocationid').val();
    var obj_Insert = {
        vehicleId: vehicleId,
        baselocationID: baselocationID
    };
    console.log('==== Obj_Insert' + JSON.stringify(obj_Insert));
    var strUrl = Service.UPDATE_VEHICLES_OF_BASELOCATION;
    console.log('==== strUrl' + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            if (data !== null || data !== 0) {
                showNotificationError("Updated Successfully", "up_Assignbtnid", "success");
                getAssignVehicleDetails();

                $('#Update_addVehicleToBaselocation').modal('toggle');
            }
        },
        error: function() {
            console.log("Error In updateBaselocationOfVehicle");
        }
    });

}


function resetupdatefields() {
    $('#up_Vehicleid').val('0').trigger("chosen:updated");
    $('#up_zoneId').val('0').trigger("chosen:updated");
    $('#up_districtid').val('0').trigger("chosen:updated");
    $('#up_baselocationid').val('0').trigger("chosen:updated");
}


function resetSearchfields() {
    $('#search_Vehicleid').val('0').trigger("chosen:updated");

    $('#search_baselocationid').val('0').trigger("chosen:updated");
    getAssignVehicleDetails();
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
                        title: 'Employee'
                    },
                    {
                        extend: 'pdf',
                        title: 'Employee'
                    },
                    {
                        extend: 'print',
                        customize: function(win) {
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
                        title: 'EmployeeDetails'
                    },
                    {
                        extend: 'pdf',
                        title: 'EmployeeDetails'
                    },
                    {
                        extend: 'print',
                        customize: function(win) {
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table').addClass(
                                    'compact').css('font-size', 'inherit');
                        }
                    }]
            });
}
function loadDataTable2() {
    $('.dataTables-example2').DataTable(
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
                        title: 'BaselocationDetails'
                    },
                    {
                        extend: 'pdf',
                        title: 'BaselocationDetails'
                    },
                    {
                        extend: 'print',
                        customize: function(win) {
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table').addClass(
                                    'compact').css('font-size', 'inherit');
                        }
                    }]
            });
}



function reset() {
    $('#Vehicleid').val('0').trigger('chosen:updated');
    $('#zoneId').val('0').trigger('chosen:updated');
    $('#districtid').val('0').trigger('chosen:updated');
    $('#baselocationid').val('0').trigger('chosen:updated');
}

//function update() {
//    $('#update_vehicleMappingData').show();
//    $('#transfer_vehicleMappingData').hide();
//}
//
//function transfer() {
//    $('#update_vehicleMappingData').hide();
//    $('#transfer_vehicleMappingData').show();
//}


/* 
 * @Author : Habiboon Patan
 * @Date : 14-12-2019
 * @Desc : addedBaselocationDropdown
 */
function getaddedBaselocationDropdown() {
    try {
        $('#search_baselocationid').empty();
        var strUrl = Service.GET_ADDED_BASELOCATIONDROPDOWNLIST;
        console.log("addedBaselocationDropdown Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objBaselocationDropdownControllerDTO;
                    var selectfirst = "<option value='0'>Select Baselocation</option>";
                    $('#search_baselocationid').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var vehicleData = "<option value=" + resData.baselocationId + ">" + resData.baselocationName + "</option>";

                        $(vehicleData).appendTo('#search_baselocationid');
                    });
                }
            },
            error: function(err) {
                console.error("Error in addedBaselocationDropdown" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in addedBaselocationDropdown()' + err);
    }
    $('#search_baselocationid').trigger("chosen:updated");
    $('#search_baselocationid').chosen();

}




/*
 *@DESC : Notification purpose
 *@AuthorName : Habiboon Patan
 *@DATE : 10-06-2019
 */
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


