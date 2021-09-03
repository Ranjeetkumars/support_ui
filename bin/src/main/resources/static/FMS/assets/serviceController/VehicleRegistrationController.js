
/* global trimId */

var VehicleType = [];


$(document).ready(function () {

    try {
        myEnableFiled1();
        getServiceType();
        //document.getElementById("rowselect").style.display = "none";
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
     //myEnableFiled();

    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});
//$('#RegisterNumberId').keypress(function (event) {
//    $("#temporaryregisterID").prop("disabled", true);
//    
//});
//
//$('#temporaryregisterID').keypress(function (event) {
//    $("#RegisterNumberId").prop("disabled", true);
//});

//function checkTextField(field) {
//    document.getElementById("RegisterNumberId").innerText =
//            (field.value === "") ? "Field is empty." : "Field is filled.";
//    if (field.value === "") {
//        document.getElementById("temporaryregisterID").disabled = false;
//    } else {
//        document.getElementById("temporaryregisterID").disabled = true;
//    }
//}

//function checkTextField1(field) {
//    document.getElementById("temporaryregisterID").innerText =
//            (field.value === "") ? "Field is empty." : "Field is filled.";
//    if (field.value === "") {
//        document.getElementById("RegisterNumberId").disabled = false;
//    } else {
//        document.getElementById("RegisterNumberId").disabled = true;
//    }
//}

//$('#yearId').keypress(function (event) {
//    var regExp = new RegExp('[a-zA-Z]'),
//            inputVal = '';
//    var value = $(this).val();
//
//    // Do not allow alphabets to be entered.
//    if (regExp.test(value)) {
//        $(this).val(inputVal);
//    }
//    else {
//        inputVal = value;
//    }
//});

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
                //   alert("200 !");
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
                //  alert("200 !");
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
                //   alert("200 !");
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
                //   alert("200 BodyType !");
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
                //   alert("200 subBodyType !");
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
                alert("200 aspiration !");
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
                //   alert("200 engineBlock !");
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
                //   alert("200 camType !");
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
                //  alert("200 FuelInduction !");
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
                // alert("200 wheel Drive !");
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
                //    alert("200 brake  !");
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
                //  alert("200 FuelType  !");
            } else {
                var jsonArray = data.obFuelTypeControllerDTO;
                var selectfirst = "<option value='0'>Select Wheel Drive</option>";
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
                //   alert("200 meterUnit  !");
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
                // alert("200 measurementUnit  !");
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
                alert("200 fuelTypeUnit  !");
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
                // alert("200 fuelTypeUnit  !");
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
                // alert("200 fuelTypeUnit  !");
            } else {
                var jsonArray = data.objGISLayerControllerDTO;
                var selectfirst = "<option value='0'>Select ServiceType </option>";
                $('#serviceTypeId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var FuelUnit = "<option value=" + resData.serviceId + ">" + resData.serviceType + "</option>";
                    $(FuelUnit).appendTo('#serviceTypeId');
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
                // alert("200 fuelTypeUnit  !");
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
    } else  {
       // document.getElementById("rowselect").style.display = "block";
       document.getElementById("rowselect").style.display = "none";
    }
}

function myEnableFiled1() {
        document.getElementById("rowselect").style.display = "none"; 
}

function saveTemporaryVehicleDetails() {
    var toggleSecondaryStatus = $("#tempstatusID").val();
    var VehicleName = $("#vehicleNameId").val();
    var hiddenStatus = $('#tempstatusID').val();
    var RegisterNumber = $("#RegisterNumberId").val();

    var tempReg = $("#temporaryregisterId").val();

    var ChassisNumber = $("#chasisNumberId").val();
    var imagePathId =$('#imagePathId').val();
    alert("imagePathId------------------"+imagePathId)
    var VehicleType = $("#vehicleTypeId").val();
    var VehicleMake = $("#MakeId").val();
    var vehicleModel = $("#modelId").val();
    var Year = $("#yearId").val();
    var purchaseDate = $("#strtDate").val();
    var startDate1 = moment(purchaseDate).format("YYYY-MM-DD");
    var trim = $("#trimId").val();
    var registrationState = $("#registration_stateId").val();
    var absPath = $('#imagePathId').val();
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
     if (hiddenStatus === "true" && secondaryodometerID ==='0'){
        showNotificationError("select Secondary OdoMeter", "odometerId", "error");
        return;
    }
    else if (secondaryOdometer=== "" ||secondaryOdometer === '') {
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
        "createdById1": 1,
        "roleId": 1,
        "createdByModuleId1": 1,
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
        "createdbymoduleid": 1
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
$("#reartirePSIId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid3(character);
});
function isValid3(str) {
    return !/[~`!@#$%\^&*()+=\-\[\]\\';,/.{}|\\":<>\?]/g.test(str);
}
function Validate2(event) {
    var regex = new RegExp("^[1-9-]");
    var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}


function saveTemporaryVehicleDetails1() {
    $("[name='regno']").prop("required", true);
    $("[name='chasisNumber']").prop("required", true);
    $("[name='regno']").prop("required", true);
    // $("[name='temporary']").prop("required", true);
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
    var purchaseDate = $("#strtDate").val();
    var startDate1 = moment(purchaseDate).format("YYYY-MM-DD");
    var trim = $("#trimId").val();
    var registrationState = $("#registration_stateId").val();
    var absPath = $('#imagePathId').val();
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
    var currentOdometer = $('#currentOdometerId').val();

    var secondaryodometerID = $("#odometerId").val();
    var secondaryOdometer = $("#current_OdometerId1").val();
    var fuelUnits = $("#fuelUnitId").val();
    var measurement = $("#measurementId").val();
    var vehicleName = $("#vehicleNameId").val();
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
    else if (startDate1 === "Invalid date" || startDate1 === 'Invalid date') {
        $('#strtDate').focus();
        showNotificationError("select date", "strtDate", "error");
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
  $("input[type='file']").change(function (e) {
     var holdMulptilePth = [];
    alert("method is executed");
    var getSize = e.target.files.length;
    for(var k = 0; k < getSize ; k ++ ) {
         var fileName = e.target.files[k].name;
        alert("My File Name is ::"+fileName);
        var obj = new FormData();
        var filedata = e.target.files[k];
        obj.append("uploadfile",filedata)
        var path = 0;
         $.ajax({
		    url: "http://192.168.1.106:3030/uploadFile",
		    type: "POST",
		    data:obj,
		    enctype: 'multipart/form-data',
		    processData: false,
		    contentType: false,
		    cache: false,
		    success: function (data) {
                        StorePath(data);
		    },
		    error: function () {
		      // Handle upload error
	             // ...
	    }
	  });    
    }
  });
var arr= [];
function StorePath(data){
   //alert("StorePath javascript function::"+data);
   arr.push(data);
    $('#imagePathId').val(arr);

  
  }