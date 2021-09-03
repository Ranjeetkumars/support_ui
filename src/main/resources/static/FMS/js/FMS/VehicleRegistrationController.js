
/* global trimId */

var VehicleType = [];

var token_id;
var user_id;
var module_id;
var role_id;
$(document).ready(function () {


    try {
    	 token_id = localStorage.getItem("token");
   	    user_id=localStorage.getItem("userID");
   	  module_id=localStorage.getItem("fms_moduleID");
	   role_id=localStorage.getItem("fms_roleID");
       // myEnableFiled1();
        getServiceType();
        getVehicleTypes();
        getVehicleStatus();
        getVehicleOwnershipId();
        getBodyType();
        getSubBodyType();
        getAspirationTypes();
        getEngineBlockTypes();
        getCamTypes();
        getFuelInduction();
        getWheelDrive();
        getBrakes();
        getFuelTypes();
        getMeterUnit();
        getMeasurementUnit();
        getFuelTypeUnit();
        getOperator();
        getStates();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});
;


/*
 * For getting VehicleTypes list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getVehicleTypes() {
    var strUrl = Service.loadVehicleTypes;
    console.log("loadVehicleTypes Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('vehicle Types not loaded');
            } else {
                var jsonArray = data.objVehicleTypeControllerDTO;
                var selectfirst = "<option value='0'>Select VehicleTypes</option>";
                $('#vehicleTypeId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var designation = "<option value=" + resData.vehicleTypeId + ">" + resData.vehicleType + "</option>";
                    $(designation).appendTo('#vehicleTypeId');
                });
                $('#vehicleTypeId').trigger("chosen:updated");

                $("#vehicleTypeId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getVehicleTypes Data' + strUrl);
        }
    });

}

/*
 * For getting VehicleStatus list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getVehicleStatus() {

    var strUrl = Service.loadVehicleStatus;
    console.log("loadVehicleStatus Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('vehicle status not loaded');
            } else {
                var jsonArray = data.objVehicleStatusControllerDTO;
                var selectfirst = "<option value='0'>Select Status</option>";
                $('#vehicleStatusId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var status = "<option value=" + resData.statusId + ">" + resData.status + "</option>";
                    $(status).appendTo('#vehicleStatusId');
                });
                $('#vehicleStatusId').trigger("chosen:updated");

                $("#vehicleStatusId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getVehicleStatus Data' + strUrl);
        }
    });

}
/*
 * For getting VehicleOwnership list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getVehicleOwnershipId() {

    var strUrl = Service.loadVehicleOwnership;
    console.log("loadVehicleOwnership Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('vehicle owmership not loaded');
            } else {
                var jsonArray = data.objVehicleOwnerShipControllerDTO;
                var selectfirst = "<option value='0'>Select ownership</option>";
                $('#ownership_Id').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var ownership = "<option value=" + resData.ownershipId + ">" + resData.ownership + "</option>";
                    $(ownership).appendTo('#ownership_Id');
                });
                $('#ownership_Id').trigger("chosen:updated");

                $("#ownership_Id").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getVehicleOwnershipId Data' + strUrl);
        }
    });

}
/*
 * For getting getBodyType list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getBodyType() {
    var strUrl = Service.loadBodyType;
    console.log("loadBodyType Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('Body Type not loaded');
            } else {
                var jsonArray = data.objVehicleBodyTypeControllerDTO;
                var selectfirst = "<option value='0'>Select body type</option>";
                $('#body_typeId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var bodyType = "<option value=" + resData.bodyTypeId + ">" + resData.bodyType + "</option>";
                    $(bodyType).appendTo('#body_typeId');
                });
                $('#body_typeId').trigger("chosen:updated");

                $("#body_typeId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getBodyType Data' + strUrl);
        }
    });

}

/*
 * For getting SubBodyType list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getSubBodyType() {
    var strUrl = Service.loadSubBodyType;
    console.log("loadSubBodyType Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('Sub Body Type not loaded');
            } else {
                var jsonArray = data.objVehicleSubBodyTypeControllerDTO;
                var selectfirst = "<option value='0'>Select sub-body type</option>";
                $('#sub_BodyTypeid').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var subbody = "<option value=" + resData.subBodyTypeId + ">" + resData.subBody + "</option>";
                    $(subbody).appendTo('#sub_BodyTypeid');
                });
                $('#sub_BodyTypeid').trigger("chosen:updated");
                $("#sub_BodyTypeid").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getSubBodyType Data' + strUrl);
        }
    });

}
/*
 * For getting AspirationTypes list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getAspirationTypes() {
    var strUrl = Service.loadAspirationTypes;
    console.log("loadAspirationTypes Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('Aspiration not loaded');
            } else {
                var jsonArray = data.objAspirationTypeControllerDTO;
                var selectfirst = "<option value='0'>Select aspiration type</option>";
                $('#aspiration_id').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var subbody = "<option value=" + resData.aspirationId + ">" + resData.aspirationType + "</option>";
                    $(subbody).appendTo('#aspiration_id');
                });
                $('#aspiration_id').trigger("chosen:updated");
                $("#aspiration_id").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getAspirationTypes Data' + strUrl);
        }
    });

}
/*
 * For getting EngineBlockTypes list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getEngineBlockTypes() {
    var strUrl = Service.loadEngineBlockType;
    console.log("loadEngineBlockType Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('EngineBlockTypes not loaded');
            } else {
                var jsonArray = data.objEngineBlockTypeControllerDTO;
                var selectfirst = "<option value='0'>Select engine block type</option>";
                $('#engineBlockTypeId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var subbody = "<option value=" + resData.blockTypeId + ">" + resData.blockType + "</option>";
                    $(subbody).appendTo('#engineBlockTypeId');
                });
                $('#engineBlockTypeId').trigger("chosen:updated");
                $("#engineBlockTypeId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getEngineBlockTypes Data' + strUrl);
        }
    });

}
/*
 * For getting getCamTypes list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getCamTypes() {
    var strUrl = Service.loadEngineCamType;
    console.log("loadEngineCamType Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('CamTypes not loaded');
            } else {
                var jsonArray = data.objEngineCamTypeControllerDTO;
                var selectfirst = "<option value='0'>Select camtype</option>";
                $('#camTypeId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var subbody = "<option value=" + resData.camtypeId + ">" + resData.camType + "</option>";
                    $(subbody).appendTo('#camTypeId');
                });
                $('#camTypeId').trigger("chosen:updated");

                $("#camTypeId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getCamTypes Data' + strUrl);
        }
    });

}
/*
 * For getting getFuelInduction list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getFuelInduction() {
    var strUrl = Service.loadFuelInduction;
    console.log("loadFuelInduction Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('FuelInduction not loaded');
            } else {
                var jsonArray = data.objFuelInductionControllerDTO;
                var selectfirst = "<option value='0'>Select Fuel Induction</option>";
                $('#fuelinductionId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var subbody = "<option value=" + resData.inductionId + ">" + resData.induction + "</option>";
                    $(subbody).appendTo('#fuelinductionId');
                });
                $('#fuelinductionId').trigger("chosen:updated");

                $("#fuelinductionId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getFuelInduction Data' + strUrl);
        }
    });
}
/*
 * For getting getWheelDrive list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getWheelDrive() {
    var strUrl = Service.loadWheelDrive;
    console.log("loadWheelDrive Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('WheelDrive not loaded');
            } else {
                var jsonArray = data.objWheelDriveControllerDTO;
                var selectfirst = "<option value='0'>Select Wheel Drive</option>";
                $('#wheelDriveId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var wheel = "<option value=" + resData.driveTypeId + ">" + resData.driveType + "</option>";
                    $(wheel).appendTo('#wheelDriveId');
                });
                $('#wheelDriveId').trigger("chosen:updated");

                $("#wheelDriveId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getWheelDrive Data' + strUrl);
        }
    });

}
/*
 * For getting getBrakes list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getBrakes() {
    var strUrl = Service.loadBrakes;
    console.log("loadBrakes Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('Brakes not loaded');
            } else {
                var jsonArray = data.objBrakeTypeControllerDTO;
                var selectfirst = "<option value='0'>Select Brakes</option>";
                $('#brakeid').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var wheel = "<option value=" + resData.brakeTypeId + ">" + resData.brakeType + "</option>";
                    $(wheel).appendTo('#brakeid');
                });
                $('#brakeid').trigger("chosen:updated");

                $("#brakeid").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getBrakes Data' + strUrl);
        }
    });

}
/*
 * For getting getFuelTypes list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getFuelTypes() {
    var strUrl = Service.loadFuelTypes;
    console.log("loadFuelTypes Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('FuelTypes not loaded');
            } else {
                var jsonArray = data.obFuelTypeControllerDTO;
                var selectfirst = "<option value='0'>Select Fuel Type</option>";
                $('#fuelTypeId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var FuelType = "<option value=" + resData.fuelTypeId + ">" + resData.fuelType + "</option>";
                    $(FuelType).appendTo('#fuelTypeId');
                });
                $('#fuelTypeId').trigger("chosen:updated");

                $("#fuelTypeId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getFuelTypes Data' + strUrl);
        }
    });

}
/*
 * For getting getMeterUnit list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getMeterUnit() {
    var strUrl = Service.loadMeterUnit;
    console.log("loadMeterUnit Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('Meter Unit not loaded');
            } else {
                var jsonArray = data.objVehicleMeterUnitControllerDTO;
                var selectfirst = "<option value='0'>Select Primary meter</option>";
                $('.meterUnitId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var FuelType = "<option value=" + resData.unitId + ">" + resData.unit + "</option>";
                    $(FuelType).appendTo('.meterUnitId');
                });
                $('.meterUnitId').trigger("chosen:updated");

                $(".meterUnitId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getMeterUnit Data' + strUrl);
        }
    });

}
/*
 * For getting getMeasurementUnit list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getMeasurementUnit() {
    var strUrl = Service.loadMeasurementUnit;
    console.log("loadMeasurementUnit Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('Measurement Unit not loaded');
            } else {
                var jsonArray = data.obVehicleMeasurementControllerDTO;
                var selectfirst = "<option value='0'>Select Measurements</option>";
                $('#measurementId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var FuelType = "<option value=" + resData.measurementUnitId + ">" + resData.measurementUnit + "</option>";
                    $(FuelType).appendTo('#measurementId');
                });
                $('#measurementId').trigger("chosen:updated");
                $("#measurementId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getMeasurementUnit Data' + strUrl);
        }
    });

}
/*
 * For getting getFuelTypeUnit list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getFuelTypeUnit() {
    var strUrl = Service.loadFuelTypeUnit;
    console.log("loadFuelTypeUnit Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('FuelType Unit not loaded');
            } else {
                var jsonArray = data.objFuelUnitControllerDTO;
                var selectfirst = "<option value='0'>Select Fuel Units</option>";
                $('#fuelUnitId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var FuelUnit = "<option value=" + resData.fuelUnitId + ">" + resData.fuelUnit + "</option>";
                    $(FuelUnit).appendTo('#fuelUnitId');
                });
                $('#fuelUnitId').trigger("chosen:updated");
                $("#fuelUnitId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getFuelTypeUnit Data' + strUrl);
        }
    });
}
/*
 * For getting getOperator list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getOperator() {
    var strUrl = Service.loadOperator;
    console.log("loadOperator Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('Operator not loaded');
            } else {
                var jsonArray = data.objOperatorsControllerDTO;
                var selectfirst = "<option value='0'>Select Operator </option>";
                $('#operatorId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var FuelUnit = "<option value=" + resData.operatorId + ">" + resData.operator + "</option>";
                    $(FuelUnit).appendTo('#operatorId');
                });
                $('#operatorId').trigger("chosen:updated");
                $("#operatorId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getOperator Data' + strUrl);
        }
    });
}
/*
 * For getting getServiceType list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getServiceType() {

	
    var strUrl = Service.serviceType;
 
    console.log("serviceType Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
        
            if (200 !== responsecode) {
                console.log('Service Type not loaded');
            } else {
                var jsonArray = data.objGISLayerControllerDTO;
                var selectfirst = "<option value='0'>Select ServiceType </option>";
                $('#serviceTypeId ').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var serviceType = "<option value=" + resData.serviceId + ">" + resData.serviceType + "</option>";
                    $(serviceType).appendTo('#serviceTypeId');
                });
                $('#serviceTypeId').trigger("chosen:updated");
                $("#serviceTypeId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading serviceType Data' + strUrl);
        }
    });
}

/*
 * For getting getStates list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getStates() {
    var strUrl = Service.loadStates;
    console.log("loadStates Url is:" + strUrl);
    $.ajax({
        type: "GET",
        url: strUrl,
        dataType: "json",
        async: false,
        crossDomain: false,
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('States not loaded');
            } else {
                var jsonArray = data.objGISLayerControllerDTO;
                var selectfirst = "<option value='0'>Select States </option>";
                $('#registration_stateId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var state = "<option value=" + resData.stateId + ">" + resData.statename + "</option>";
                    $(state).appendTo('#registration_stateId');
                });
                $('#registration_stateId').trigger("chosen:updated");
                $("#registration_stateId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getOperator Data' + strUrl);
        }
    });
}
//Toggle Button reading
var switchStatus = false;
$('#tempstatusID').val(switchStatus);
$("#togBtn").on('change', function () {
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
        $('#tempstatusID').val(switchStatus);
    }
    else {
        switchStatus = $(this).is(':checked');
        $('#tempstatusID').val(switchStatus);
    }
});

//Based on toggle button hide the textfileds
function myEnableFiled() {
    var hiddenStatus = $('#tempstatusID').val();
    if (hiddenStatus === 'false' || hiddenStatus === "false") {
        document.getElementById("rowselect").style.display = "block";
        //document.getElementById("rowselect").style.display = "none";
    } else {
        // document.getElementById("rowselect").style.display = "block";
        document.getElementById("rowselect").style.display = "none";
    }
}

function myEnableFiled1() {
    document.getElementById("rowselect").style.display = "none";
}
/*
 * For saveing VehicleDetails .
 * priyadarshini
 * 30-11-2019
 * 
 */
function saveVehicleDetails() {
    var serviceType = $("#serviceTypeId").val();
    var toggleSecondaryStatus = $("#tempstatusID").val();
    var VehicleName = $("#vehicleNameId").val();
    var hiddenStatus = $('#tempstatusID').val();
    var RegisterNumber = $("#RegisterNumberId").val();
    var tempReg = $("#temporaryregisterId").val();
    var ChassisNumber = $("#chasisNumberId").val();
    var imagePathId = $('#imagePathId').val();
    var VehicleType = $("#vehicleTypeId").val();
    var VehicleMake = $("#MakeId").val();
    var vehicleModel = $("#modelId").val();
    var Year = $("#yearId").val();
    var startDate1 = $("#strtDate").val();
    var d = new Date(startDate1.split("-").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    startDate1 = yy + "-" + mm + "-" + dd;
    var trim = $("#trimId").val();
    var registrationState = $("#registration_stateId").val();
    var vehicleStatus = $("#vehicleStatusId").val();
    var operator = $("#operatorId").val();
    var ownerShipId = $("#ownership_Id").val();
    var color = $("#colorId").val();
    var FuelEconomy = $("#fuelEconomyId").val();
    var TypeOfbody = $("#body_typeId").val();
    var BodySubType = $("#sub_BodyTypeid").val();
    var dimensions = $("#dimensionsId").val();
    var unladdenWeight = $("#unladdenWeightId").val();
    var TowingCapacity = $("#towingcapacityId").val();
    var MaxPayload = $("#maxpayloadId").val();
    var Displacement = $("#displacementId").val();
    var aspiration = $("#aspiration_id").val();
    var engineBlockType = $("#engineBlockTypeId").val();
    var NoofCylinders = $("#noOfCylindersId").val();
    var cylinderBore = $("#cylinderBoreId").val();
    var CamType = $("#camTypeId").val();
    var CompressionRatio = $("#compressionRatioId").val();
    var FuelInduction = $("#fuelinductionId").val();
    var maxPower = $("#maxPowerId").val();
    var maxTorque = $("#maxTorqueId").val();
    var valvesperCylinder = $("#cylinderID").val();
    var Transmission = $("#TransmissionId").val();
    var noOfTransmissionGears = $("#noOftransmissiongearsId").val();
    var wheelDrive = $("#wheelDriveId").val();
    var brakeSystem = $("#brakeid").val();
    var fronttrack = $("#frontTrackID").val();
    var reartrack = $("#rearTrackID").val();
    var wheelbase = $("#wheelBaseId").val();
    var frontwheelDiameter = $("#frontwheelDiameterId").val();
    var rearWheelDiameter = $("#rearwheelDiameterId").val();
    var frontTirePsi = $("#fronttirePSIId").val();
    var rearTirePsi = $("#reartirePSIId").val();
    var fuelType = $("#fuelTypeId").val();
    var fuelRating = $("#fuelRatingId").val();
    var fuelTank1 = $("#tankcapacityId1").val();
    var fuelTank2 = $("#tankcapacityId2").val();
    var oilresorviorcapacity = $("#oilreserviorCapacityId").val();
    var primaryOdometer = $("#primaryMeterUnitId").val();
    var currentOdometer = $("#currentOdometerId").val();
    var secondaryodometerID = $("#odometerId").val();
    var secondaryOdometer = $("#current_OdometerId1").val();
    var fuelUnits = $("#fuelUnitId").val();
    var measurement = $("#measurementId").val();
    var avgUsage = $("#avgUsageId").val();
    var avgUsag2 = $("#avgUsageId2").val();
    var hiddenStatus = $('#tempstatusID').val();
    if (tempReg === "") {
        tempReg = 0;
    }
    if (dimensions === "") {
        dimensions = 0;
    }
    if (unladdenWeight === "") {
        unladdenWeight = 0;
    }
    if (TowingCapacity === "") {
        TowingCapacity = 0;
    }
    if (MaxPayload === "") {
        MaxPayload = 0;
    }
    if (Displacement === "") {
        Displacement = 0;
    }
    if (NoofCylinders === "") {
        NoofCylinders = 0;
    }
    if (cylinderBore === "") {
        cylinderBore = 0;
    }
    if (CompressionRatio === "") {
        CompressionRatio = 0;
    }
    if (CompressionRatio === "") {
        CompressionRatio = 0;
    }
    if (maxPower === "") {
        maxPower = 0;
    }
    if (maxTorque === "") {
        maxTorque = 0;
    }
    if (valvesperCylinder === "") {
        valvesperCylinder = 0;
    }
    if (Transmission === "") {
        Transmission = 0;
    }
    if (noOfTransmissionGears === "") {
        noOfTransmissionGears = 0;
    }
    if (fronttrack === "") {
        fronttrack = 0;
    }
    if (reartrack === "") {
        reartrack = 0;
    }
    if (wheelbase === "") {
        wheelbase = 0;
    }
    if (frontwheelDiameter === "") {
        frontwheelDiameter = 0;
    }
    if (rearWheelDiameter === "") {
        rearWheelDiameter = 0;
    }
    if (rearWheelDiameter === "") {
        rearWheelDiameter = 0;
    }
    if (frontTirePsi === "") {
        frontTirePsi = 0;
    }
    if (rearTirePsi === "") {
        rearTirePsi = 0;
    }
    if (fuelRating === "") {
        fuelRating = 0;
    }
    if (fuelTank1 === "") {
        fuelTank1 = 0;
    }
    if (fuelTank2 === "") {
        fuelTank2 = 0;
    }
    if (oilresorviorcapacity === "") {
        oilresorviorcapacity = 0;
    }
    if (avgUsage === "") {
        avgUsage = 0;
    }
    if (avgUsag2 === "") {
        avgUsag2 = 0;
    }

    if (primaryOdometer === "0" || primaryOdometer === '0') {
        $('#primaryMeterUnitId').focus();
        showNotificationError("select primaryOdometer", "primaryMeterUnitId", "error");
        return;
    }
    else if (currentOdometer === "" || currentOdometer === '') {
        $("[name='currentOdoMeter']").prop("required", true);
        showNotificationError("Enter  currentOdometer", "currentOdometerId", "error");
        return;
    }
    var hiddenStatus = $('#tempstatusID').val();
    if (hiddenStatus === "true" && secondaryodometerID === '0') {
        showNotificationError("select Secondary OdoMeter", "odometerId", "error");
        return;
    }
    if (hiddenStatus === "true" && secondaryOdometer === '') {
        $("[name='currentodo2']").prop("required", true);
        showNotificationError("Enter  Current OdoMeter-Reading", "current_OdometerId1", "error");
        return;
    }
 
    var objJson = {
        "condition": 1,
        "vehicle_id": 0,
        "vehicleName": VehicleName,
        "chasisNumber": ChassisNumber,
        "permanentRegisterNumber": RegisterNumber,
        "temporaryregisterNumber": tempReg,
        "vehicleTypeId": VehicleType,
        "make": VehicleMake,
        "model": vehicleModel,
        "year": Year,
        "purchaseDate": startDate1,
        "trim": trim,
        "registerStateId": registrationState,
        "photopath": imagePathId,
        //"photopath": absPath,
        "statusId": vehicleStatus,
        "operatorId": operator,
        "ownershipId": ownerShipId,
        "color": color,
        "createdById1": user_id,
        "roleId": role_id,
        "createdByModuleId1": module_id,
        "typeofbody_id": TypeOfbody,
        "bodysubtype_id": BodySubType,
        "dimensions": dimensions,
        "unlanden_weight": unladdenWeight,
        "towing_capacity": TowingCapacity,
        "max_pay_load": MaxPayload,
        "fuel_economy": FuelEconomy,
        "displacement": Displacement,
        "typeof_aspirationid": aspiration,
        "engine_block_typeid": engineBlockType,
        "no_of_cylinders": NoofCylinders,
        "cylinder_bore": cylinderBore,
        "cam_typeid": CamType,
        "compression_ratio": CompressionRatio,
        "fuel_inductionid": FuelInduction,
        "max_power": maxPower,
        "max_torque": maxTorque,
        "valves_per_cylinder": valvesperCylinder,
        "transmission_type": Transmission,
        "no_of_transmission_gears": noOfTransmissionGears,
        "wheel_driveid": wheelDrive,
        "brake_systemid": brakeSystem,
        "front_track_width": fronttrack,
        "rare_track_width": reartrack,
        "wheel_base": wheelbase,
        "front_wheel_dia": frontwheelDiameter,
        "rare_wheel_dia": rearWheelDiameter,
        "front_tire_psi": frontTirePsi,
        "rare_tire_psi": rearTirePsi,
        "fuel_typeid": fuelType,
        "fuel_rating": fuelRating,
        "fuel_tank_1_capacity": fuelTank1,
        "fuel_tank_2_capacity": fuelTank2,
        "oil_reservoir_capacity": oilresorviorcapacity,
        "primary_meter_unit_id": primaryOdometer,
        "current_odo1": currentOdometer,
        "secondary_meter_status": toggleSecondaryStatus,
        "secondary_meter_unit_id": secondaryodometerID,
        "current_odo2": secondaryOdometer,
        "fuel_unit_id": fuelUnits,
        "measurement_unitid": measurement,
        "approvedbyid": 1,
        "approveddtm": "now()",
        "approved_status": true,
        "createdbyid": 1,
        "createdbyroleid": 1,
        "createdbymoduleid": 1,
        "serviceTypeId": serviceType,
    }
    var strUrl = Service.saveAdditionalDetails;
    console.log("saveAdditionalDetails Url is:" + strUrl);
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
                showNotificationError("Vehicle  Not Register", "saveBTNID", "error");
            } else {
            	
                showNotificationError("Vehicle Register Successfully", "saveBTNID", "success");
                resetonclick();
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
        position: 'left',
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

$("#vehicleNameId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});

function isValid(str) {
    return !/[~`!#$%\^&*()+=\-\[\]\\';,{}|\\":<>\?]/g.test(str);
}

$("#RegisterNumberId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}


$("#modelId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid1(character);
});

function isValid1(str) {
    return !/[~`!#$%\^&@*()+=\-\[\]/\\';,{}|\\.":<>\?]/g.test(str);
}

$("#MakeId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});

function isValid2(str) {
    return !/[~`!#$%\^&@()+=\-\[\]/\\';,{}|/\\":<>\?]/g.test(str);
}

function Validate(event) {
    var regex = new RegExp("^[0-9-*.]");
    var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}
function Validate1(event) {
    var regex = new RegExp("^[0-9-.]");
    var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}
function isNumberKey(event) {
    var regex = new RegExp("^[0-9]");
    var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}
$("#reartirePSIId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid3(character);
});
function isValid3(str) {
    return !/[~`!@#$%\^&*()+=\-\[\]\\';,/.{}|\\":<>\?]/g.test(str);
}
function Validate2(event) {
    var regex = new RegExp("^[0-9-]");
    var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}
/*
 * For validation of  VehicleDetails .
 * priyadarshini
 * 30-11-2019
 * 
 */

 






 function additionalDetails() {
  
  $("[name='regno']").prop("required", true);
     var VehicleName = $("#vehicleNameId").val();
    var RegisterNumber = $("#RegisterNumberId").val();
    var tempReg = $("#temporaryregisterID").val();
    var ChassisNumber = $("#chasisNumberId").val();
    var VehicleType = $("#vehicleTypeId").val();
    var serviceType = $("#serviceTypeId").val();
    var VehicleMake = $("#MakeId").val();
    var vehicleModel = $("#modelId").val();
    var Year = $("#yearId").val();
    var startDate1 = $("#strtDate").val();
    var d = new Date(startDate1.split("-").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    startDate1 = yy + "-" + mm + "-" + dd;
    var trim = $("#trimId").val();
    var registrationState = $("#registration_stateId").val();
    var vehicleStatus = $("#vehicleStatusId").val();
    var operator = $("#operatorId").val();
    var ownerShipId = $("#ownership_Id").val();
    var color = $("#colorId").val();
    var FuelEconomy = $("#fuelEconomyId").val();
  

    if (VehicleName === "") {
        $('#vehicleNameId').focus();
        showNotificationError("Please enter vehicle Name", "vehicleNameId", "error");
        return;
    }
    else if (RegisterNumber === "") {
        $('#RegisterNumberId').focus();
        showNotificationError("Enter Register Number", "RegisterNumberId", "error");
        return;
    }
    else if (ChassisNumber === "") {
        $('#chasisNumberId').focus();
        showNotificationError("Eelect chasis Number", "chasisNumberId", "error");
        return;
    }
    else if (VehicleType === '0' || VehicleType === "0") {
        $('#vehicleTypeId').focus();
        showNotificationError("Select vehicle Type", "vehicleTypeId", "error");
        return;
    }
    else if (serviceType === '0' || serviceType === "0") {
        $('#serviceTypeId').focus();
        showNotificationError("Select service  Type", "serviceTypeId", "error");
        return;
    }
    else if (VehicleMake === "") {
        $('#MakeId').focus();
        showNotificationError("Enter vehicle Make", "MakeId", "error");
        return;
    }

    else if (vehicleModel === "") {
        $('#modelId').focus();
        showNotificationError("Enter vehicle model", "modelId", "error");
        return;
    }

    else if (Year === "") {
        $('#yearId').focus();
        showNotificationError("Enter year", "yearId", "error");
        return;
    }

    else if (startDate1 === 'NaN-NaN-NaN' || startDate1 === 'Invalid date') {
        $('#strtDate').focus();
        showNotificationError("Enter  Purchase Date", "Purchase Date", "error");
        return;
    }
    else if (trim === "") {
        $('#trimId').focus();
        showNotificationError("Enter trim", "trimId", "error");
        return;
    }
    else if (registrationState === "0" || registrationState === '0') {
        $('#registration_stateId').focus();
        showNotificationError("Select Registration state", "registration_stateId", "error");
        return;
    }
    else if (vehicleStatus === "0" || vehicleStatus === '0') {
        $('#vehicleStatusId').focus();
        showNotificationError("Select vehicle Status", "vehicleStatusId", "error");
        return;
    }
    else if (operator === "0" || operator === '0') {
        $('#operatorId').focus();
        showNotificationError("Select operator", "operatorId", "error");
        return;
    }
    else if (ownerShipId === "0" || ownerShipId === '0') {
        $('#ownership_Id').focus();
        showNotificationError("Select type of ownerShip", "ownership_Id", "error");
        return;
    }
    else if (color === "") {
        $('#colorId').focus();
        showNotificationError("Enter color", "colorId", "error");
        return;


    }
    else if (FuelEconomy === "") {
        $('#fuelEconomyId').focus();
        showNotificationError("Enter Fuel Economy", "fuelEconomyId", "error");
        return;


    }
   
};
function saveTemporaryVehicleDetails1() {
    $("[name='regno']").prop("required", true);
    $("[name='chasisNumber']").prop("required", true);
    $("[name='regno']").prop("required", true);
    $('select[name^="service"]').eq(1).focus();
    $("[name='Make_name']").prop("required", true);
    $("[name='Make_name']").prop("required", true);
    $("[name='vehicleName']").prop("required", true);
    $("[name='yearName']").prop("required", true);
    $("[name='yearName']").prop("required", true);
    $("[name='Trim_name']").prop("required", true);
    $("[name='color_name']").prop("required", true);
    $("[name='economy_name']").prop("required", true);
    $("[name='vehicle_model']").prop("required", true);
    $("[name='service']").prop("required", true);
    $("[name='purchaseDate']").prop("required", true);
    $("[name='serviceTypeId']").prop("required", true);
    $("[name='currentOdoMeter']").prop("required", true);
    $("[name='currentOdometerId']").prop("required", true);
    var VehicleName = $("#vehicleNameId").val();
    var RegisterNumber = $("#RegisterNumberId").val();
    var tempReg = $("#temporaryregisterID").val();
    var ChassisNumber = $("#chasisNumberId").val();
    var VehicleType = $("#vehicleTypeId").val();
    var serviceType = $("#serviceTypeId").val();
    var VehicleMake = $("#MakeId").val();
    var vehicleModel = $("#modelId").val();
    var Year = $("#yearId").val();
    var startDate1 = $("#strtDate").val();
    var d = new Date(startDate1.split("-").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    startDate1 = yy + "-" + mm + "-" + dd;
    var trim = $("#trimId").val();
    var registrationState = $("#registration_stateId").val();
    var vehicleStatus = $("#vehicleStatusId").val();
    var operator = $("#operatorId").val();
    var ownerShipId = $("#ownership_Id").val();
    var color = $("#colorId").val();
    var FuelEconomy = $("#fuelEconomyId").val();
    var fuelType = $("#fuelTypeId").val();

    if (VehicleName === "") {
        $('#vehicleNameId').focus();
        showNotificationError("Please enter vehicle Name", "vehicleNameId", "error");
        return;
    }
    else if (RegisterNumber === "") {
        $('#RegisterNumberId').focus();
        showNotificationError("Enter Register Number", "RegisterNumberId", "error");
        return;
    }
    else if (ChassisNumber === "") {
        $('#chasisNumberId').focus();
        showNotificationError("Eelect chasis Number", "chasisNumberId", "error");
        return;
    }
    else if (VehicleType === '0' || VehicleType === "0") {
        $('#vehicleTypeId').focus();
        showNotificationError("Select vehicle Type", "vehicleTypeId", "error");
        return;
    }
    else if (serviceType === '0' || serviceType === "0") {
        $('#serviceTypeId').focus();
        showNotificationError("Select service  Type", "serviceTypeId", "error");
        return;
    }
    else if (VehicleMake === "") {
        $('#MakeId').focus();
        showNotificationError("Enter vehicle Make", "MakeId", "error");
        return;
    }

    else if (vehicleModel === "") {
        $('#modelId').focus();
        showNotificationError("Enter vehicle model", "modelId", "error");
        return;
    }

    else if (Year === "") {
        $('#yearId').focus();
        showNotificationError("Enter year", "yearId", "error");
        return;
    }

    else if (startDate1 === 'NaN-NaN-NaN' || startDate1 === 'Invalid date') {
        $('#strtDate').focus();
        showNotificationError("Enter  Purchase Date", "Purchase Date", "error");
        return;
    }
    else if (trim === "") {
        $('#trimId').focus();
        showNotificationError("Enter trim", "trimId", "error");
        return;
    }
    else if (registrationState === "0" || registrationState === '0') {
        $('#registration_stateId').focus();
        showNotificationError("Select Registration state", "registration_stateId", "error");
        return;
    }
    else if (vehicleStatus === "0" || vehicleStatus === '0') {
        $('#vehicleStatusId').focus();
        showNotificationError("Select vehicle Status", "vehicleStatusId", "error");
        return;
    }
    else if (operator === "0" || operator === '0') {
        $('#operatorId').focus();
        showNotificationError("Select operator", "operatorId", "error");
        return;
    }
    else if (ownerShipId === "0" || ownerShipId === '0') {
        $('#ownership_Id').focus();
        showNotificationError("Select type of ownerShip", "ownership_Id", "error");
        return;
    }
    else if (color === "") {
        $('#colorId').focus();
        showNotificationError("Enter color", "colorId", "error");
        return;


    }
    else if (FuelEconomy === "") {
        $('#fuelEconomyId').focus();
        showNotificationError("Enter Fuel Economy", "fuelEconomyId", "error");
        return;


    }
    else if (fuelType === "0" || fuelType === '0') {
        $('#fuelTypeId').focus();
        showNotificationError("Select type of ownerShip", "fuelTypeId", "error");
        return;
    }

}

$("input[type='file']").change(function (e) {
    var holdMulptilePth = [];
    var getSize = e.target.files.length;
    var items = e.target.files;
    //var fileType = e.target.files.type;
    for (var k = 0; k < getSize; k++) {
        var fileName = e.target.files[k].name;
        var fileSize = items[k].size;
        var fileType = items[k].type;// get file type
        if (fileType === "image/jpeg") {
            var obj = new FormData();

            var filedata = e.target.files[k];
            obj.append("uploadfile", filedata)
        }
        var path = 0;
        $.ajax({
            url: "http://192.168.1.106:4040/uploadFile",
            type: "POST",
            data: obj,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                alert("data-------" + data);
                StorePath(data);
            },
            error: function () {
                // Handle upload error
                // ...
            }
        });
    }
});
var arr = [];
function StorePath(data) {
    arr.push(data);
    //$('#imagePathId').val(arr);
    var arrLength = arr.length;
    if (arrLength === 4) {
        $('#imagePathId').val(arr);
        $("#uploadId").prop("disabled", true);
    }

}
//$(document).ready(function () {
//    $("#buttonClass").click(function () {
//        var buttonClass=$("#buttonClass").val();
//        alert("buttonClass====="+buttonClass);
//        
//        $("#avgUsageId").prop('disabled', true);
//    });
//    avgUsageId
//    $("#avgusageId2").click(function () {
//        $("#avgUsageId3").prop('disabled', true);
//    });
//});

//$(document).ready(function () {



function myFunction1() {
    // Get the checkbox
    var checkBox = document.getElementById("myCheck");
    if (checkBox.checked === true) {
        $("#avgUsageId").prop('disabled', true);

    } else {
        $("#avgUsageId").prop('disabled', false);
    }
}

function myFunction2() {
    var checkBox = document.getElementById("myCheck1");
    if (checkBox.checked === true) {
        $("#avgUsageId3").prop('disabled', true);

    } else {
        $("#avgUsageId3").prop('disabled', false);
    }
}

/*
 * For reset vehicle Details.
 * priyadarshini
 * 30-11-2019
 * 
 */
function resetonclick() {
    $('#body_typeId').val('0').trigger('chosen:updated');
    $('#sub_BodyTypeid').val('0').trigger('chosen:updated');
    $('#aspiration_id').val('0').trigger('chosen:updated');
    $('#fuelinductionId').val('0').trigger('chosen:updated');
    $('#engineBlockTypeId').val('0').trigger('chosen:updated');
    $('#camTypeId').val('0').trigger('chosen:updated');
    $('#serviceTypeId').val('0').trigger('chosen:updated');
    $('#vehicleTypeId').val('0').trigger('chosen:updated');
    $('#fuelTypeId').val('0').trigger('chosen:updated');
    $('#odometerId').val('0').trigger('chosen:updated');
    $('#primaryMeterUnitId').val('0').trigger('chosen:updated');
    $('#wheelDriveId').val('0').trigger('chosen:updated');
    $('#brakeid').val('0').trigger('chosen:updated');
    $("#tempstatusID").val('');
    $("#vehicleNameId").val('');
    $('#tempstatusID').val('');
    $("#RegisterNumberId").val('');
    $("#temporaryregisterId").val('');
    $("#chasisNumberId").val('');
    $('#imagePathId').val('');
    $("#vehicleTypeId").val('0').trigger('chosen:updated');
    $("#MakeId").val('');
    $("#modelId").val('');
    $("#yearId").val('');
    $("#strtDate").val('');
    $("#registration_stateId").val('0').trigger('chosen:updated');
    $('#imagePathId').val('');
    $("#vehicleStatusId").val('0').trigger('chosen:updated');
    $("#operatorId").val('0').trigger('chosen:updated');
    $("#ownership_Id").val('0').trigger('chosen:updated');
    $("#colorId").val('');
    $("#fuelEconomyId").val('');
    $("#body_typeId").val('');
    $("#sub_BodyTypeid").val('');
    $("#dimensionsId").val('');
    $("#unladdenWeightId").val('');
    $("#towingcapacityId").val('');
    $("#maxpayloadId").val('');
    $("#displacementId").val('');
    $("#aspiration_id").val('');
    $("#engineBlockTypeId").val('');
    $("#noOfCylindersId").val('');
    $("#cylinderBoreId").val('');
    $("#camTypeId").val('');
    $("#compressionRatioId").val('');
    $("#fuelinductionId").val('');
    $("#maxPowerId").val('');
    $("#maxTorqueId").val('');
    $("#cylinderID").val('');
    $("#TransmissionId").val('');
    $("#noOftransmissiongearsId").val('');
    $("#wheelDriveId").val('');
    $("#brakeid").val('');
    $("#frontTrackID").val('');
    $("#rearTrackID").val('');
    $("#wheelBaseId").val('');
    $("#frontwheelDiameterId").val('');
    $("#rearwheelDiameterId").val('');
    $("#fronttirePSIId").val('');
    $("#reartirePSIId").val('');
    $("#fuelTypeId").val('');
    $("#fuelRatingId").val('');
    $("#tankcapacityId1").val('');
    $("#tankcapacityId2").val('');
    $("#oilreserviorCapacityId").val('');
    $("#primaryMeterUnitId").val('');
    $("#currentOdometerId").val('');
    $("#odometerId").val('');
    $("#current_OdometerId1").val('');
    $("#fuelUnitId").val('');
    $("#measurementId").val('');
    $("#avgUsageId").val('');
    $("#avgUsageId2").val('');
    $('#tempstatusID').val('');
}
$("input[type='input-file']").change(function (e) {
    /// $('#btnDisplay').click(function() {
    //get file object
    var file = document.getElementById('Fichier1').files[0];
    // create reader
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {
        // browser completed reading file - display it
     


    }
//        var lll=$('#Fichier1').val();
//        alert("lllllllllllllllll======"+lll);
//}
});

//function  bs_input_file(){
//        //$("input-file").change(function(e){
//            alert("ppppppppppppppppppppppppppppppppppppppppp");
//            var fileName = e.target.files[0].name;
//            alert('The file "' + fileName +  '" has been selected.');
//       // });
//    }
//    
//    $('.search-btn-cls').change();{
//        alert("mmmmmmmmm");
//    
//    var jjjjj=$(this).parents(".input-file").find('input').val();
//    alert("ppppppppppppppppp======"+jjjjj);
//    }
//    
//    $("select#search_status").change(handleDropdown)

function myFunction() {
    var jjjjj = $(this).parents(".input-file").find('input').val();

}


function imageUpload1() {
    var file_data = $('#actualFile').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);

    $.ajax({
        type: 'post',
        url: 'http://192.168.1.106:6060/upload', // point to server-side controller method
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function (e) {
            console.log("Sucessfully inserted" + e);
            var json = $.parseJSON(e);
            $(json).each(function (i, val) {
                saveExcel111(val);
//               var JsonArray;
//          for (JsonArray = 0; JsonArray > i; i++) {
                saveExcel111(val);
                //  $.each(val, function (k, v) {

                // saveExcel111(k, v);
                // console.log(k + " : " + v);

                // saveVehicleDetails()
                // });
                //  }
                // }



//              $.each(val, function (k, v) {
//                 console.log(k + " : " + v);
                //  });
            });

        },
        error: function (e) {
            console.log("failed" + e);
        }
    });
}
/*
 * For reading excel data.
 * priyadarshini
 * 30-11-2019
 * 
 */
function saveExcel111(val) {
    console.log(val.Operator);
    console.log(val.VehicleMake);
    console.log(val.Trim);
    console.log(val.Color);
    console.log(val.VehicleType);
    console.log(val.TypeofOwnership);
    console.log(val.ChassisNumber);
    console.log(val.RegisterNumber);
    console.log(val.FuelType);
    console.log(val.FuelEconomy);
    console.log(val.VehicleModel);
    console.log(val.Registrationstate);
    console.log(val.ServiceType);
    console.log(val.PurchaseDate);
    console.log(val.VehicleName);
    console.log(val.PrimaryOdoMeter);
    console.log(val.Currentodometer);
    console.log(val.VehicleStatus);
    var objJson = {
        "condition": 1,
        "vehicle_id": 0,
        "vehicleName": val.VehicleName,
        "chasisNumber": val.ChassisNumber,
        "permanentRegisterNumber": val.RegisterNumber,
        "temporaryregisterNumber": '',
        "vehicleTypeId": 1,
        "make": 1,
        "model": 1,
        "year": val.Year,
        "purchaseDate": val.PurchaseDate,
        "trim": val.Trim,
        "registerStateId": 1,
        "photopath": '',
        //"photopath": absPath,
        "statusId": 1,
        "operatorId": 1,
        "ownershipId": 1,
        "color": val.Color,
        "createdById1": 1,
        "roleId": 1,
        "createdByModuleId1": 1,
        "typeofbody_id": 0,
        "bodysubtype_id": 0,
        "dimensions": 0,
        "unlanden_weight": 0,
        "towing_capacity": 0,
        "max_pay_load": 0,
        "fuel_economy": 1,
        "displacement": 0,
        "typeof_aspirationid": 0,
        "engine_block_typeid": 0,
        "no_of_cylinders": 0,
        "cylinder_bore": 0,
        "cam_typeid": 0,
        "compression_ratio": 0,
        "fuel_inductionid": 0,
        "max_power": 0,
        "max_torque": 0,
        "valves_per_cylinder": 0,
        "transmission_type": 0,
        "no_of_transmission_gears": 0,
        "wheel_driveid": 0,
        "brake_systemid": 0,
        "front_track_width": 0,
        "rare_track_width": 0,
        "wheel_base": 0,
        "front_wheel_dia": 0,
        "rare_wheel_dia": 0,
        "front_tire_psi": 0,
        "rare_tire_psi": 0,
        "fuel_typeid": 1,
        "fuel_rating": 0,
        "fuel_tank_1_capacity": 0,
        "fuel_tank_2_capacity": 0,
        "oil_reservoir_capacity": 0,
        "primary_meter_unit_id": 1,
        "current_odo1": val.Currentodometer,
        "secondary_meter_status": false,
        "secondary_meter_unit_id": 0,
        "current_odo2": 0,
        "fuel_unit_id": 0,
        "measurement_unitid": 0,
        "approvedbyid": 1,
        "approveddtm": "now()",
        "approved_status": false,
        "createdbyid": user_id,
        "createdbyroleid": role_id,
        "createdbymoduleid": module_id,
        "serviceTypeId": 1,
     
    }
    var strUrl = Service.saveAdditionalDetails;
    console.log("saveAdditionalDetails Url is:" + strUrl);
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
                alert(" not Inserted ");

            } else {
                showNotificationError("insert Successfully", "saveandprocedID", "success");
                alert("  Inserted ");
                window.location.reload();
//                window.setTimeout(function () {
//                    location.reload();
//                }, 2000);
            }

        }, error: function () {

            console.log('In Error of  Details ');
        }
    });
}

function download(filename) {
    var element = document.createElement('a');
    element.setAttribute('href', 'G:\VehicleRegistation.xlsx');
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
function Download() {
    var filename = "VehicleRegistation.xlsx";
    download(filename);
}




//$("input[type='file']").change(function (e) {
//    var fileList = e.target.files;
//    alert("filedata---------------" + fileList[0]);
//    var holdFile = $("#pro_image").val();
//    var totalfiles = document.getElementById('pro_image').files.length;
//    alert("totalfiles--" + totalfiles);
//    var data = new FormData();
//    for (var i = 0; i < totalfiles; ++i) {
//        data.append("pro_image[]", document.getElementById('pro_image').files[i]);
//
//        uploadmethod(data);
//    }
//
//})
//function uploadmethod(data) {
//    alert("fileUpload-------------------------------" + data);
//    $.ajax({
//        type: "POST",
//        url: 'http://192.168.1.106:3000/FileController/uploadMultipleFiles',
//        files: data,
//        dataType: 'json',
//        contentType: 'multipart/mixed;boundary=B0EC8D07-EBF1-4EA7-966C-E492A9F2C36E',
//        timeout: 15000,
//        //processData: false,
//        success: function (e) {
//            console.log(JSON.stringify(e.fileDownloadUri))
//            console.log("SUCCESS: ", e);
//            var data = JSON.stringify(e);
//            alert("data------" + data);
//            alert("path--------" + data.fileDownloadUri);
//
//        }
//    });
//}
//
//  
//  
//  
//  
/*
 * For Reading selected file.
 * priyadarshini
 * 30-11-2019
 * 
 */