/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    try {

        getVehicle();
        getFuelLevel();
        getVehicleCondition();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});
/* 
 * @Author : priyadarshini
 * @Date : 07-01-2020
 * @Desc : getVehicle
 */
function getVehicle() {
    try {
        $('#VehicleId').empty();

        var strUrl = Service.getVehicle;
        console.log("getVehicle Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                    console.log('Vehicles not loaded');

                } else {
                    var jsonArray = data.objVehicleControllerDTO;
                    var selectfirst = "<option value='0'>Please Select vehicle</option>";
                    $('#VehicleId').append(selectfirst);

                    $.each(jsonArray, function (i, resData) {
                        var vehicleName = "<option value=" + resData.vehicleId + ">" + resData.vehicleName + "</option>";
                        $(vehicleName).appendTo('#VehicleId');

                    });
                }
            },
            error: function (err) {
                console.error("Error in getVehicle" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getVehicle()' + err);
    }
    $('#VehicleId').trigger("chosen:updated");
    $('#VehicleId').chosen();

}
///validation of checkbox
$('input[type="checkbox"]').on('change', function () {
    $('input[name="' + this.name + '"]').not(this).prop('checked', false);
});

/* 
 * @Author : priyadarshini
 * @Date : 07-01-2020
 * @Desc : getFuelLevel
 */
function getFuelLevel() {
    try {
        $('#fuelLevelId').empty();

        var strUrl = Service.getFuelLevel;
        console.log("getVehicle Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                    console.log('getFuelLevel not loaded');

                } else {
                    var jsonArray = data.objGetFuelLevelControllerDTO;
                    var selectfirst = "<option value='0'>Please Select Fuel Level</option>";
                    $('#fuelLevelId').append(selectfirst);

                    $.each(jsonArray, function (i, resData) {
                        var fuelLevel = "<option value=" + resData.fuelLevelId + ">" + resData.fuelLevel + "</option>";
                        $(fuelLevel).appendTo('#fuelLevelId');

                    });
                }
            },
            error: function (err) {
                console.error("Error in getFuelLevel" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getFuelLevel()' + err);
    }
    $('#fuelLevelId').trigger("chosen:updated");
    $('#fuelLevelId').chosen();

}
/* 
 * @Author : priyadarshini
 * @Date : 07-01-2020
 * @Desc : getVehicleCondition
 */
function getVehicleCondition() {
    try {
        $('#vehicleConditionID').empty();

        var strUrl = Service.getVehicleCondition;
        console.log("getVehicle Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function (data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                    console.log('getVehicleCondition not loaded');

                } else {
                    var jsonArray = data.objVehicleConditionControllerDTO;
                    var selectfirst = "<option value='0'>Please Select vehicle condition</option>";
                    $('#vehicleConditionID').append(selectfirst);

                    $.each(jsonArray, function (i, resData) {
                        var vehicleCondition = "<option value=" + resData.conditionId + ">" + resData.conditionType + "</option>";
                        $(vehicleCondition).appendTo('#vehicleConditionID');

                    });
                }
            },
            error: function (err) {
                console.error("Error in getVehicleCondition" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getFuelLevel()' + err);
    }
    $('#vehicleConditionID').trigger("chosen:updated");
    $('#vehicleConditionID').chosen();

}
///validation of checkbox
$('input[type="checkbox"]').on('change', function () {
    $('input[name="' + this.name + '"]').not(this).prop('checked', false);
});

/*
 * For inserting inspectionreport list.
 * priyadarshini
 * 6-01-2020
 */
function saveInspectionReport() {
    var Vehicle = $('#VehicleId').val();
    var OdometerReading = $('#odometerReadingId').val();
    var inspectionDate = $('#inspectionDateId').val();
    var Oillifeleft = $('#OillifeleftId').val();
    var fuelLevel = $('#fuelLevelId').val();
    var engine = ($('input[name="group1[]"]:checked').serialize()).split("group1%5B%5D=").toString().substr(1);
    var transmission = ($('input[name="group2[]"]:checked').serialize()).split("group2%5B%5D=").toString().substr(1);
    var clutch = ($('input[name="group3[]"]:checked').serialize()).split("group3%5B%5D=").toString().substr(1);
    var steeringMechanism = ($('input[name="group4[]"]:checked').serialize()).split("group4%5B%5D=").toString().substr(1);
    var horn = ($('input[name="group5[]"]:checked').serialize()).split("group5%5B%5D=").toString().substr(1);
    var windshieldandWipers = ($('input[name="group6[]"]:checked').serialize()).split("group6%5B%5D=").toString().substr(1);
    var rearVisionMirrors = ($('input[name="group7[]"]:checked').serialize()).split("group7%5B%5D=").toString().substr(1);
    var lightingDevicesandReflectors = ($('input[name="group8[]"]:checked').serialize()).split("group8%5B%5D=").toString().substr(1);
    var parkingBrake = ($('input[name="group9[]"]:checked').serialize()).split("group9%5B%5D=").toString().substr(1);
    var serviceBrakes = ($('input[name="group10[]"]:checked').serialize()).split("group10%5B%5D=").toString().substr(1);
    var airLines = ($('input[name="group11[]"]:checked').serialize()).split("group11%5B%5D=").toString().substr(1);
    var couplingDevices = ($('input[name="group12[]"]:checked').serialize()).split("group12%5B%5D=").toString().substr(1);
    var tires = ($('input[name="group13[]"]:checked').serialize()).split("group13%5B%5D=").toString().substr(1);
    var wheelsandRims = ($('input[name="group15[]"]:checked').serialize()).split("group15%5B%5D=").toString().substr(1);
    var emergencyEquipment = ($('input[name="group16[]"]:checked').serialize()).split("group16%5B%5D=").toString().substr(1);
    var vehicleCondition = $('#vehicleConditionID').val();
    var digitalSignature = $('#digitalSignatureId').val();
    if (Vehicle === '0' || Vehicle === "0") {
        $('#saveReportId').focus();
        showNotificationError("Please select vehicle Name", "saveReportId", "error");
        return;
    }
    else if (OdometerReading ==='' || OdometerReading === "null") {
        $('#saveReportId').focus();
        showNotificationError("Enter Odometer Reading", "saveReportId", "error");
        return;
    }
    else if (inspectionDate === "" || inspectionDate === "invalid") {
        $('#saveReportId').focus();
        showNotificationError("Eelect Inspection Start Date", "saveReportId", "error");
        return;
    }

    if (engine === '' || engine === " ") {

        showNotificationError("Select Engine", "saveReportId", "error");
        return;

    }
    else if (Oillifeleft === '' || Oillifeleft === " ") {
        $('#saveReportId').focus();
        showNotificationError("enter left oil", "saveReportId", "error");
        return;
    }
    else if (fuelLevel === '0' || engine === "0") {
        $('#saveReportId').focus();
        showNotificationError("select Fuel level", "saveReportId", "error");
        return;
    }

    else if (transmission === '' || transmission === " ") {
        $('#saveReportId').focus();
        showNotificationError("Select Transmission", "saveReportId", "error");
        return;
    }

    else if (clutch === '' || clutch === " ") {
        $('#saveReportId').focus();
        showNotificationError("Enter clutch", "saveReportId", "error");
        return;
    }
    else if (steeringMechanism === '' || steeringMechanism === " ") {
        $('#saveReportId').focus();
        showNotificationError("Enter Steering Mechanism", "saveReportId", "error");
        return;
    }
    else if (horn === '' || horn === " ") {
        $('#saveReportId').focus();
        showNotificationError("Enter horn", "saveReportId", "error");
        return;
    }
    else if (windshieldandWipers === '' || windshieldandWipers === " ") {
        $('#saveReportId').focus();
        showNotificationError("Enter Windshield and Wipers/Washers", "saveReportId", "error");
        return;
    }
    else if (rearVisionMirrors === '' || rearVisionMirrors === " ") {
        $('#saveReportId').focus();
        showNotificationError("Enter Rear Vision Mirrors", "saveReportId", "error");
        return;
    }
    else if (lightingDevicesandReflectors === '' || lightingDevicesandReflectors === " ") {
        $('#saveReportId').focus();
        showNotificationError("Enter Lighting Devices and Reflectors", "saveReportId", "error");
        return;
    }
    else if (parkingBrake === '' || parkingBrake === " ") {
        $('#saveReportId').focus();
        showNotificationError("Enter parking Brake", "saveReportId", "error");
        return;
    }
    else if (serviceBrakes === '' || serviceBrakes === " ") {
        $('#serviceBrakesId').focus();
        showNotificationError("Enter service Brakes", "serviceBrakesId", "error");
        return;
    }
    else if (airLines === '' || airLines === " ") {
        $('#airLinesID').focus();
        showNotificationError("Enter air Lines", "airLinesID", "error");
        return;
    }
    else if (couplingDevices === '' || couplingDevices === " ") {
        $('#couplingDeviceId').focus();
        showNotificationError("Enter coupling Devices", "couplingDeviceId", "error");
        return;
    }
    else if (tires === '' || tires === " ") {
        $('#tireId').focus();
        showNotificationError("Enter tires", "tireId", "error");
        return;
    }
    else if (wheelsandRims === '' || wheelsandRims === " ") {
        $('#wheelandRimsId').focus();
        showNotificationError("Enter wheelsandRims", "wheelandRimsId", "error");
        return;
    }
    else if (emergencyEquipment === '' || emergencyEquipment === " ") {
        $('#emergencyEquipmentId').focus();
        showNotificationError("Enter emergency Equipment", "emergencyEquipmentId", "error");
        return;
    }
    else if (vehicleCondition ==='0' || vehicleCondition === "0") {
        $('#vehicleConditionID').focus();
        showNotificationError("select vehicleCondition", "vehicleConditionID", "error");
        return;
    }
    else if (digitalSignature === '' || digitalSignature === " ") {
        $('#digitalSignatureId').focus();
        showNotificationError("Enter Signature", "digitalSignatureId", "error");
        return;
    }
    alert("vehicleCondition--"+vehicleCondition);
    var objJson = {
        "vehicle_id": Vehicle,
        "inspection_start_date": inspectionDate,
        "odo_meter_reading": OdometerReading,
        "interior_cleanliness_path": "pass",
        "engine": engine,
        "oil_life_left": Oillifeleft,
        "fuel_level": fuelLevel,
        "transmission": transmission,
        "clutch": clutch,
        "steering_mechanism": steeringMechanism,
        "horn": horn,
        "windshield_wipers_washers": windshieldandWipers,
        "rear_vision_mirrors": rearVisionMirrors,
        "lighting_devices_reflection": lightingDevicesandReflectors,
        "parking_brake": parkingBrake,
        "service_brakes": serviceBrakes,
        "air_light_lines": airLines,
        "coupling_device": couplingDevices,
        "tires": tires,
        "wheels_rims": wheelsandRims,
        "emergency_equipment": emergencyEquipment,
        "vehicle_condition": vehicleCondition,
        "drivers_sign": digitalSignature,
        "createdby_id": "1",
        "createdbyModuleId": "1",
        "createdbyroleid": "1",
        "centerid": "1",
        "nodeid": "1"
    }

    var strUrl = Service.saveDriverVehicleInspectionReport;
    console.log("saveDriverVehicleInspectionReport Url is:" + strUrl);
    console.log("Input is:::::::" + JSON.stringify(objJson));
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(objJson),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function (data) {
            var responseCode = data.responseCode;
            if (200 !== responseCode) {
                showNotificationError("inspection already completed for this vehicle", "saveReportId", "error");
            } else {
                showNotificationError("insert Successfully", "saveReportId", "success");
                resetInspectionReport();
//                window.location.reload();
//                window.setTimeout(function () {
//                    location.reload();
//                }, 2000);
            }

        }, error: function () {

            console.log('In Error of  Details ');
        }
    })
}
/*
 * For reset  InspectionReport list.
 * priyadarshini
 * 7-01-2020
 */
function resetInspectionReport(){
    $('#engineId :checked').removeAttr('checked');
    $('#transmissionId :checked').removeAttr('checked');
    $('#clutchId :checked').removeAttr('checked');
    $('#steeringMechanismId :checked').removeAttr('checked');
    $('#hornId :checked').removeAttr('checked');
    $('#windshieldId :checked').removeAttr('checked');
    $('#rearVisionMirrorsId :checked').removeAttr('checked');
    $('#lightingDevicesId :checked').removeAttr('checked');
    $('#parkingBrakeId :checked').removeAttr('checked');
    $('#serviceBrakesId :checked').removeAttr('checked');
    $('#airLinesID :checked').removeAttr('checked');
    $('#couplingDevicesId :checked').removeAttr('checked');
    $('#tiresId :checked').removeAttr('checked');
    $('#wheelsId :checked').removeAttr('checked');
    $('#emergencyEquipmentId :checked').removeAttr('checked');
    $('#VehicleId').val('0').trigger('chosen:updated');
     $('#OillifeleftId').val('');
     $('#fuelLevelId').val('0').trigger('chosen:updated');
     $('#vehicleConditionID').val('0').trigger('chosen:updated');
     $('#digitalSignatureId').val('');
    $('#odometerReadingId').val('');
    $('#inspectionDateId').val('');
}


















/*
 *@DESC : Notification purpose
 *@AuthorName : priyadarshini
 *@DATE : 7-1-2020
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

