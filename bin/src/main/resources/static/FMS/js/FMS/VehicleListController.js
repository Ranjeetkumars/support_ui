/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    try {
        getDistrict();
        getVehicleStatus();
        getFuelTypes_Serach();
        getSer_VehicleTypes();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});
/*
 * For searching vehicle list.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getVehicleTypes() {
    $("#up_vehicleTypeId").empty();
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
                console.log('VehicleTypes not loaded')
            } else {
                var jsonArray = data.objVehicleTypeControllerDTO;
                var selectfirst = "<option value='0'>Select VehicleTypes</option>";
                $('#up_vehicleTypeId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var designation = "<option value=" + resData.vehicleTypeId + ">" + resData.vehicleType + "</option>";
                    $(designation).appendTo('#up_vehicleTypeId');
                });
                $('#up_vehicleTypeId').trigger("chosen:updated");

                $("#up_vehicleTypeId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getVehicleTypes Data' + strUrl);
        }
    });
}
/*
 * For getting  ServiceType.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getServiceType() {
    $('#up_serviceTypeId').empty();
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
              console.log('ServiceType not loaded')
            } else {
                var jsonArray = data.objGISLayerControllerDTO;
                var selectfirst = "<option value='0'>Select ServiceType </option>";
                $('#up_serviceTypeId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var FuelUnit = "<option value=" + resData.serviceId + ">" + resData.serviceType + "</option>";
                    $(FuelUnit).appendTo('#up_serviceTypeId');
                });
                $('#up_serviceTypeId').trigger("chosen:updated");

                $("#up_serviceTypeId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading serviceType Data' + strUrl);
        }
    });
}
/*
 * For getting  VehicleStatus.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getVehicleStatus() {
    $('#statusId').empty();
    $('#up_vehicleStatusId').empty();
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
                console.log('VehicleStatus not loaded');
            } else {
                var jsonArray = data.objVehicleStatusControllerDTO;
                var selectfirst = "<option value='0'>Select Status</option>";
                $('#statusId').append(selectfirst);
                $('#up_vehicleStatusId').append(selectfirst);

                $.each(jsonArray, function (i, resData) {
                    var status = "<option value=" + resData.statusId + ">" + resData.status + "</option>";
                    $(status).appendTo('#statusId');
                    $(status).appendTo('#up_vehicleStatusId');
                });
                $('#statusId').trigger("chosen:updated");
                $('#up_vehicleStatusId').trigger("chosen:updated");

                $("#statusId").chosen();
                $("#up_vehicleStatusId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getVehicleStatus Data' + strUrl);
        }
    });
}
/*
 * For getting  Operator.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getOperator() {
    $("#up_operatorId").empty();
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
                $('#up_operatorId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var FuelUnit = "<option value=" + resData.operatorId + ">" + resData.operator + "</option>";
                    $(FuelUnit).appendTo('#up_operatorId');
                });
                $('#up_operatorId').trigger("chosen:updated");

                $("#up_operatorId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getOperator Data' + strUrl);
        }
    });

}
/*
 * For getting  States.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getStates() {
    $("#up_registration_stateId").empty();
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
                $('#up_registration_stateId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var state = "<option value=" + resData.stateId + ">" + resData.statename + "</option>";
                    $(state).appendTo('#up_registration_stateId');
                });
                $('#up_registration_stateId').trigger("chosen:updated");

                $("#up_registration_stateId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getOperator Data' + strUrl);
        }
    });

}

/*
 * For getting  VehicleOwnershipId.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getVehicleOwnershipId() {
    $("#up_ownership_Id").empty();
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
             console.log('VehicleOwnership not loaded');
            } else {
                var jsonArray = data.objVehicleOwnerShipControllerDTO;
                var selectfirst = "<option value='0'>Select ownership</option>";
                $('#up_ownership_Id').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var ownership = "<option value=" + resData.ownershipId + ">" + resData.ownership + "</option>";
                    $(ownership).appendTo('#up_ownership_Id');
                });
                $('#up_ownership_Id').trigger("chosen:updated");

                $("#up_ownership_Id").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getVehicleOwnershipId Data' + strUrl);
        }
    });

}

/*
 * For getting  FuelTypes.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getFuelTypes() {
    $("#up_fuelTypeId").empty();
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
                $('#up_fuelTypeId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var FuelType = "<option value=" + resData.fuelTypeId + ">" + resData.fuelType + "</option>";
                    $(FuelType).appendTo('#up_fuelTypeId');
                });
                $('#up_fuelTypeId').trigger("chosen:updated");

                $("#up_fuelTypeId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getFuelTypes Data' + strUrl);
        }
    });

}
/*
 * For getting  PrimaryOdo.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getPrimaryOdo() {
    $("#primaryMeterUnitId").empty();
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
             console.log('PrimaryOdo not loaded');
            } else {
                var jsonArray = data.objVehicleMeterUnitControllerDTO;
                var selectfirst = "<option value='0'>Select Primary meter</option>";
                $('#primaryMeterUnitId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var FuelType = "<option value=" + resData.unitId + ">" + resData.unit + "</option>";
                    $(FuelType).appendTo('#primaryMeterUnitId');
                });
                $('#primaryMeterUnitId').trigger("chosen:updated");

                $("#primaryMeterUnitId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getMeterUnit Data' + strUrl);
        }
    });

}
/*
 * For getting  DistrictList.
 * priyadarshini
 * 30-11-2019
 * inputs :no 
 */
function getDistrict() {

    var strUrl = Service.DISTRICTS_LIST;
    console.log("getDistrict Url is:" + strUrl);
    var obj_Insert =
            {"zoneId": 1}
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        //"Content-Type": "application/json",
        async: false,
        crossDomain: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
             console.log('District not loaded');

            } else {
                var jsonArray = data.objCommonDataControllerDTO;
                var selectfirst = "<option value='0'>Select Districts</option>";
                $('#DistrictId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var DistrictData = "<option value=" + resData.districtId + ">" + resData.districtName + "</option>";
                    $(DistrictData).appendTo('#DistrictId');
                });
            }
        },
        error: function (err) {
            console.error("Error in get Districts" + JSON.stringify(err));
        }
    });

    $('#DistrictId').trigger("chosen:updated");
    $('#DistrictId').chosen();
}

$('#DistrictId').on('change', function () {
    var DistrictId = $('#DistrictId').val();
    $('#baseLocID').empty();
    getBaseLoc(DistrictId);
});
/*
 * For getting  BaseLoc.
 * priyadarshini
 * 30-11-2019
 * inputs :DistrictId
 */
function getBaseLoc(DistrictId) {

    var strUrl = Service.Baseloc_LIST;
    console.log("getBaseLoc Url is:" + strUrl);
    var obj_Insert =
            {"districtId": DistrictId}
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        //"Content-Type": "application/json",
        async: false,
        crossDomain: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
             console.log('BaseLocation not loaded');

            } else {
                var jsonArray = data.objCommonDataControllerDTO;
                var selectfirst = "<option value='0'>Select Base Location</option>";
                $('#baseLocID').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var DistrictData = "<option value=" + resData.baseLocId + ">" + resData.baseLocName + "</option>";
                    $(DistrictData).appendTo('#baseLocID');
                });
            }
        },
        error: function (err) {
            console.error("Error in  getBaseLoc" + JSON.stringify(err));
        }
    });
    $('#baseLocID').trigger("chosen:updated");
    $('#baseLocID').chosen();
}
/*
 * For getFuelTypes.
 * priyadarshini
 * 30-11-2019
 * inputs :no
 */
function getFuelTypes_Serach() {
    $("#search_fuelTypeId").empty();
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
             console.log('FuelTypes for search  not loaded');
            } else {
                var jsonArray = data.obFuelTypeControllerDTO;
                var selectfirst = "<option value='0'>Select Fuel Type</option>";
                $('#search_fuelTypeId').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var FuelType = "<option value=" + resData.fuelTypeId + ">" + resData.fuelType + "</option>";
                    $(FuelType).appendTo('#search_fuelTypeId');
                });
                $('#search_fuelTypeId').trigger("chosen:updated");

                $("#search_fuelTypeId").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getFuelTypes Data' + strUrl);
        }
    });
}

/*
 * For get_vehicleList.
 * priyadarshini
 * 30-11-2019
 * inputs :no
 */
function get_vehicleList() {
    $('#vehicleList_Id').empty();
    try {
    	
        var vehicleName = $('#vehicleNameId').val();
       
        var registerNumber1 = $( "#registerNumber_id option:selected" ).text();
        //var registerNumber1 = $('#registerNumber_id').val();
      
        var fuelType = $('#search_fuelTypeId').val();
        var status = $('#statusId').val();
        var searchDate = $("#searchDate_id").val();
        var d = new Date(searchDate.split("-").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        searchDate = yy + "-" + mm + "-" + dd;
        var vehicleType = $('#vehicleType_id').val();

        var syy = "¥";
        if (vehicleName === "" || vehicleName === null) {

            vehicleName = syy;

        }
        if (registerNumber1 === '0' || registerNumber1 === 0) {

        	registerNumber1 = syy;

        }
        if (fuelType === '0' || fuelType === 0) {
            fuelType = 0;
        }
        if (status === '0' || status === 0) {
            status = 0;

        }
        if (vehicleType === '0' || vehicleType === 0) {
            vehicleType = 0;

        }
        if (searchDate === 'Invalid date' || searchDate === 'NaN-NaN-NaN' || searchDate === '') {
            searchDate = syy;

        }

        var objJson = {
            "vehicleName": vehicleName,
            "permanentRegisteredNo":registerNumber1,
            "vehicleTypeId": vehicleType,
            "status": status,
            "fuelTypeId": fuelType,
            "purchaseDate": searchDate

        }
        var strUrl = Service.get_vehicleList;

        console.log("strUrl : " + strUrl);

        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(objJson),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            success: function (data) {
                console.log("data : " + data);
                var responseCode = data.responseCode;
                $('#vehicleList_Id').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                  //  $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#vehicleList_Id').append(divTag);
                    $('#deleteButtonID').hide();
                } else {
                    $('#deleteButtonID').show();

                    var jsonArray = data.objVehicleDetailsControllerDTO;
                    if (jsonArray.length > 0) {
                        vehicleList_DOM(jsonArray);
                        loadDataTable();
                    }
                }
            },
            error: function (err) {
                console.error('update Stock error: ' + JSON.stringify(err));
            }
        });
    }
    catch (err) {
        console.error("error occur in search()" + JSON.stringify(err));
    }
}
/*
 * For VehicleTypes.
 * priyadarshini
 * 30-11-2019
 * inputs :no
 */
function getSer_VehicleTypes() {
    $("#vehicleType_id").empty();
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
             console.log('VehicleTypes for search  not loaded');
            } else {
                var jsonArray = data.objVehicleTypeControllerDTO;
                var selectfirst = "<option value='0'>Select VehicleTypes</option>";
                $('#vehicleType_id').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var designation = "<option value=" + resData.vehicleTypeId + ">" + resData.vehicleType + "</option>";
                    $(designation).appendTo('#vehicleType_id');
                });
                $('#vehicleType_id').trigger("chosen:updated");

                $("#vehicleType_id").chosen();
            }
        },
        error: function () {
            console.log('Error in loading getVehicleTypes Data' + strUrl);
        }
    });
}

function vehicleList_DOM(strData) {
    $("#Searchdeleteid").show();
    $("#Searchdeleteid").prop('disabled', true);
   
    try {
        //For Div Tag
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

//For table
        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example");
        $(objDivTag).append(ObjTableTag);
//For table head
        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);

//For table row
        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

        var objTHead1 = document.createElement("th");
     
        $(objTHead1).html('<label class="check "><span style=" color: white">Select</span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
        $(objTr).append(objTHead1);
//For table Heading1

//For table Heading2
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Register Number');
        $(objTr).append(objTHead3);
        

//For table Heading3
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('Vehicle Type');
        $(objTr).append(objTHead4);


        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Fuel Type');
        $(objTr).append(objTHead5);
//For table Heading4
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('purchase Date');
        $(objTr).append(objTHead6);

        //For table Heading5
        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Service Type');
        $(objTr).append(objTHead7);

        //For table Heading5
        var objTHead8 = document.createElement('th');
        $(objTHead8).html('Status');
        $(objTr).append(objTHead8);

        //For table Heading5
        var objTHead9 = document.createElement('th');
        $(objTHead9).html('Update');
        $(objTr).append(objTHead9);


        var objTHead10 = document.createElement('th');
        $(objTHead10).html('Delete');
        $(objTr).append(objTHead10);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);
         // Table Data Appending Here
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");
            var tablcol1 = document.createElement("td");
            //value=strData[i].permanentRegisteredNo,
            $(tablcol1).addClass('text-center');
            $(tablcol1).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].permanentRegisteredNo + ' name="case"  )" ><span class="checkmark"> </label>');
            $(tbleRow).append(tablcol1);
            //$(tablcol1).attr('onclick', 'onclickCheckbox("' + strData[i].permanentRegisteredNo + '")');
            $('#selectall').val(strData[i].permanentRegisteredNo);
            $(tablcol1).attr('onclick', 'onclickCheckbox()');
//            var tablcol2 = document.createElement("td");
//            $(tablcol2).html(index);
//            $(tbleRow).append(tablcol2);
            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].permanentRegisteredNo);
            $(tbleRow).append(tablcol2);
            $(tablcol2).attr('onclick', 'onclickReg()');

           var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].vehicleTypeName);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].fuelTypeName);
            $(tbleRow).append(tablcol4);
            
            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).html(strData[i].purchaseDate);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');
            $(tablcol6).html(strData[i].serviceTypeName);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).addClass('text-center');
            $(tablcol7).html(strData[i].status);
            $(tbleRow).append(tablcol7);
            
            var tablcol8 = document.createElement("td");
            $(tablcol8).addClass('text-center');
            //var buttonTag = document.createElement('button');
            $(tablcol8).append('<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#editRemainder"></i><i></a> ');
           // $(tablcol9).attr('onclick', 'deleteSingleVehicle()');
           // var text = document.createTextNode("Update");
           // buttonTag.appendChild(text);
           // $(buttonTag).addClass('btn btn-primary btn-sm');
           // $(buttonTag).addClass('fa fa-edit');

            $(tablcol8).attr('onclick', 'get_RowData("' + strData[i].vehicleId + '","' + strData[i].permanentRegisteredNo + '","' + strData[i].status + '","' + strData[i].vehicleTypeName + '","' + strData[i].vehicleName + '","' + strData[i].chasisNumber + '","' + strData[i].make + '","' + strData[i].model + '","' + strData[i].year + '","' + strData[i].purchaseDate + '","' + strData[i].trim + '","' + strData[i].registered_stateid + '","' + strData[i].operatorId + '","' + strData[i].ownershipId + '","' + strData[i].color + '","' + strData[i].fuelEconomy + '","' + strData[i].currentOdoMeter + '","' + strData[i].serviceTypeName + '","' + strData[i].fuelTypeName + '","' + strData[i].primaryOdoMeter + '")');

           // $(tablcol9).append(buttonTag);
           // $(tablcol9).css('height', '36px');

            var tablcol9 = document.createElement("td");
            $(tablcol9).addClass('text-center');
//            var text = document.createTextNode("delete");
//            buttonTag1.appendChild(text);
            // $(buttonTag1).addClass('btn');

            //$(buttonTag1).addClass('fa fa-trash');
            $(tablcol9).append('<a href="#"><i class="fa fa-trash"></i><i></a> ');
            $(tablcol9).attr('onclick', 'deleteSingleVehicle()');
            //$(tablcol10).attr('id','singleDeleteId');

            $(tablcol9).css('height', '5px');

            $(tbleRow).append(tablcol8);
            $(tbleRow).append(tablcol9);
            $(objTBody).append(tbleRow);

        }

        $("#vehicleList_Id").append(objDivTag);


    } catch (err) {
        console.log("vehicleList_Id" + err);
    }
}
function get_RowData(vehicleId, permanentRegisteredNo, status, vehicleTypeName, vehicleName, chasisNumber, make, model, year, purchaseDate, trim, registered_stateid, operatorId, ownershipId, color, fuelEconomy, currentOdoMeter, serviceTypeName, fuelTypeName, primaryOdoMeter) {
    $('#update').modal('show');
    getVehicleTypes();
    getServiceType();
    getOperator();
    getStates();
    getVehicleOwnershipId();
    getFuelTypes();
    getPrimaryOdo();
    $("#up_vehicleStatusId option:contains(" + status + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_vehicleTypeId option:contains(" + vehicleTypeName + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_fuelTypeId option:contains(" + fuelTypeName + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_serviceTypeId option:contains(" + serviceTypeName + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_operatorId option:contains(" + operatorId + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_ownership_Id option:contains(" + ownershipId + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_registration_stateId option:contains(" + registered_stateid + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#primaryMeterUnitId option:contains(" + primaryOdoMeter + ")").attr('selected', 'selected').trigger("chosen:updated");
    $('#vehicleId').val(vehicleId);
    $('#up_vehicleNameId').val(vehicleName);
    $('#up_RegisterNumberId').val(permanentRegisteredNo);
    $('#up_chasisNumberId').val(chasisNumber);
    $('#up_MakeId').val(make);
    $('#up_modelId').val(model);
    $('#up_yearId').val(year);
    $('#up_colorId').val(color);
    $('#up_strtDate').val(purchaseDate);
    $('#up_trimId').val(trim);
    $('#up_fuelEconomyId').val(fuelEconomy);
    $('#currentOdometerId').val(currentOdoMeter);
}

function loadDataTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 5,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'TyreLifeData'},
            {extend: 'pdf', title: 'TyreLifeData'},
            {extend: 'print',
                customize: function (win) {
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
/*
 * For reset Search.
 * priyadarshini
 * 30-11-2019
 * inputs :no
 */
function resetSearch() {
    $('#registerNumberId').val('0').trigger('chosen:updated');
    $('#search_fuelTypeId').val('0').trigger('chosen:updated');
    $('#statusId').val('0').trigger('chosen:updated');
    $("#vehicleNameId").val('');
    $('#vehicleType_id').val('0').trigger('chosen:updated');
    $("#searchDate_id").val('');
    $("#vehicleList_Id").empty();
    $("#Searchdeleteid").hide();

    //$("#Searchdeleteid").hide();
}
$("#vehicleNameId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#up_vehicleNameId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
function isValid(str) {
    return !/[~`!#$%\^&*()+=\-\[\]\\';,{}|\\":<>\?]/g.test(str);
}
/*
 * For update VehicleDetails.
 * priyadarshini
 * 30-11-2019
 */
function updateVehicleDetails() {
    var vehicleId = $("#vehicleId").val();
    var vehicleName = $("#up_vehicleNameId").val();
    var chasisNumber = $("#up_chasisNumberId").val();
    var Make = $('#up_MakeId').val();
    var vehicleStatus = $("#up_vehicleStatusId").val();
    var color = $("#up_colorId").val();
    var primaryMeter = $('#primaryMeterUnitId').val();
    var RegisterNumber = $("#up_RegisterNumberId").val();
    var vehicleType = $("#up_vehicleTypeId").val();
    var model = $("#up_modelId").val();
    var trim = $("#up_trimId").val();
    var purchaseDate = $("#up_strtDate").val();
    var purchaseDate1 = moment(purchaseDate).format("YYYY-MM-DD");
    var operator = $("#up_operatorId").val();
    var fuelEconomy = $("#up_fuelEconomyId").val();
    var currentOdometer = $('#currentOdometerId').val();
    var serviceType = $("#up_serviceTypeId").val();
    var year = $("#up_yearId").val();
    var registration_state = $("#up_registration_stateId").val();
    var ownership = $("#up_ownership_Id").val();
    var fuelType = $("#up_fuelTypeId").val();

    if (vehicleName === "") {
        $('#up_vehicleNameId').focus();
        showNotificationError("Please enter vehicle Name", "up_vehicleNameId", "error");
        return;
    }
    else if (RegisterNumber === "") {
        $('#up_RegisterNumberId').focus();
        showNotificationError("Enter Register Number", "up_RegisterNumberId", "error");
        return;
    }
    else if (chasisNumber === "") {
        $('#up_chasisNumberId').focus();
        showNotificationError("Eelect chasis Number", "up_chasisNumberId", "error");
        return;
    }
    else if (vehicleType === '0' || vehicleType === "0") {
        $('#up_vehicleTypeId').focus();
        showNotificationError("Select vehicle Type", "up_vehicleTypeId", "error");
        return;
    }
    else if (serviceType === '0' || serviceType === "0") {
        $('#up_serviceTypeId').focus();
        showNotificationError("Select service  Type", "up_serviceTypeId", "error");
        return;
    }
    else if (Make === "") {
        $('#up_MakeId').focus();
        showNotificationError("Enter vehicle Make", "up_MakeId", "error");
        return;
    }

    else if (model === "") {
        $('#up_modelId').focus();
        showNotificationError("Enter vehicle model", "up_modelId", "error");
        return;
    }

    else if (year === "") {
        $('#up_yearId').focus();
        showNotificationError("Enter year", "up_yearId", "error");
        return;
    }
    else if (purchaseDate1 === "Invalid date" || purchaseDate1 === 'Invalid date') {
        $('#strtDate').focus();
        showNotificationError("select date", "up_strtDate", "error");
        return;
    }
    else if (trim === "") {
        $('#up_trimId').focus();
        showNotificationError("Enter trim", "up_trimId", "error");
        return;
    }
    else if (registration_state === "0" || registration_state === '0') {
        $('#up_registration_stateId').focus();
        showNotificationError("Select Registration state", "up_registration_stateId", "error");
        return;
    }
    else if (vehicleStatus === "0" || vehicleStatus === '0') {
        $('#up_vehicleStatusId').focus();
        showNotificationError("Select vehicle Status", "up_vehicleStatusId", "error");
        return;
    }
    else if (operator === "0" || operator === '0') {
        $('#up_operatorId').focus();
        showNotificationError("Select operator", "up_operatorId", "error");
        return;
    }
    else if (ownership === "0" || ownership === '0') {
        $('#ownership_Id').focus();
        showNotificationError("Select type of ownerShip", "up_ownership_Id", "error");
        return;
    }
    else if (color === "") {
        $('#up_colorId').focus();
        showNotificationError("Enter color", "up_colorId", "error");
        return;
    }
    else if (fuelEconomy === "") {
        $('#up_fuelEconomyId').focus();
        showNotificationError("Enter fuel economy", "up_fuelEconomyId", "error");
        return;
    }
    else if (fuelType === "0" || fuelType === '0') {
        $('#up_fuelTypeId').focus();
        showNotificationError("Enter fuel Type", "up_fuelTypeId", "error");
        return;
    }
    else if (primaryMeter === "0" || primaryMeter === '0') {
        $('#primaryMeterUnitId').focus();
        showNotificationError("Select primary odo Meter", "primaryMeterUnitId", "error");
        return;
    }
    else if (currentOdometer === "" || currentOdometer === '0') {
        $('#currentOdometerId').focus();
        showNotificationError("Enter current odo meter", "currentOdometerId", "error");
        return;
    }
    var objJson = {
        "condition": 2,
        "vehicle_id": vehicleId,
        "vehicleName": vehicleName,
        "chasisNumber": chasisNumber,
        "permanentRegisterNumber": RegisterNumber,
        "temporaryregisterNumber": '',
        "vehicleTypeId": vehicleType,
        "make": Make,
        "model": model,
        "year": year,
        "purchaseDate": purchaseDate1,
        "trim": trim,
        "registerStateId": registration_state,
        "photopath": '',
        //"photopath": absPath,
        "statusId": vehicleStatus,
        "operatorId": operator,
        "ownershipId": ownership,
        "color": color,
        "createdById1": 1,
        "roleId": 1,
        "createdByModuleId1": 1,
        "typeofbody_id": 0,
        "bodysubtype_id": 0,
        "dimensions": 0,
        "unlanden_weight": 0,
        "towing_capacity": 0,
        "max_pay_load": 0,
        "fuel_economy": fuelEconomy,
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
        "fuel_typeid": fuelType,
        "fuel_rating": 0,
        "fuel_tank_1_capacity": 0,
        "fuel_tank_2_capacity": 0,
        "oil_reservoir_capacity": 0,
        "primary_meter_unit_id": primaryMeter,
        "current_odo1": currentOdometer,
        "secondary_meter_status": false,
        "secondary_meter_unit_id": 0,
        "current_odo2": 0,
        "fuel_unit_id": 0,
        "measurement_unitid": 0,
        "approvedbyid": 1,
        "approveddtm": "now()",
        "approved_status": true,
        "createdbyid": 1,
        "createdbyroleid": 1,
        "createdbymoduleid": 1,
        "serviceTypeId": serviceType,
    };
    var strUrl = Service.saveAdditionalDetails;
    console.log("updateVehicleDetails Url is:" + strUrl);
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
                showNotificationError("insert Successfully", "updateVehicledetailsId", "success");

                window.location.reload();
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        }, error: function () {

            console.log('In Error of  updateVehicledetails ');
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
        position: 'Right',
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
/*
 * For reset vehicleDetails.
 * priyadarshini
 * 30-11-2019
 */
function resetvehicleDetails() {
    $('#up_vehicleNameId').val('');
    $('#up_RegisterNumberId').val('');
    $('#up_chasisNumberId').val('');
    $('#up_modelId').val('');
    $('#up_yearId').val('');
    $('#up_colorId').val('');
    $('#up_fuelEconomyId').val('');
    $('#currentOdometerId').val('');
    $('#up_strtDate').val('');
    $('#up_trimId').val('');
    $('#up_MakeId').val('');
    $('#up_vehicleStatusId').val('0').trigger('chosen:updated');
    $('#primaryMeterUnitId').val('0').trigger('chosen:updated');
    $('#up_vehicleTypeId').val('0').trigger('chosen:updated');
    $('#up_operatorId').val('0').trigger('chosen:updated');
    $('#up_serviceTypeId').val('0').trigger('chosen:updated');
    $('#up_registration_stateId').val('0').trigger('chosen:updated');
    $('#up_ownership_Id').val('0').trigger('chosen:updated');
    $('#up_fuelTypeId').val('0').trigger('chosen:updated');
}
//multiplle checkbox reading
function multipleCheckBox() {
    $("#Searchdeleteid").attr("disabled", true);
    //$("#Searchdeleteid").prop('disabled', true);
    $('#reg_no').val('');
    $("#selectall").change(function (event) {
        $('.case').attr('checked', this.checked);
        $('#Searchdeleteid').attr("disabled", false);	
       //$("#Searchdeleteid").prop('disabled', false);
        if ($(this).is(":checked")) {
            $('#reg_no').val('');
            $('.case').prop("checked", true);
            event.preventDefault();
            var searchIDs = $(".case:checkbox:checked").map(function () {
                console.log("selected VEHICLE====" + searchIDs)
                return $(this).val();
            }).get();
            $('#reg_no').val(searchIDs);
        }
       
    });

}
/*
 * For delete SingleVehicle.
 * priyadarshini
 * 30-11-2019
 */
function deleteSingleVehicle() {
    var selectedCheckboxvalue = $('#reg_no').val();
     if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
     showNotificationError("Please select vehicle", "selectall", "error");
        return;
    }
    else if (selectedCheckboxvalue !== '' || selectedCheckboxvalue !== null) {
        $('#myModal6').modal('show');
    }
}
/*
 * For deleteVehicle1.
 * priyadarshini
 * 30-11-2019
 */
function deleteVehicle1() {
    var selectedCheckboxvalue = $('#reg_no').val();
    console.log("selected vEHICLE rEGnO======" + selectedCheckboxvalue)
    if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
        showNotificationError("Please select vehicle", "selectall", "error");
        return;
    }
    $('#myModal6').modal('show');
}
/*
 * For deleteVehicle.
 * priyadarshini
 * 30-11-2019
 */
function deleteVehicle() {
    var selectedCheckboxvalue = $('#reg_no').val();
    console.log("delete vehiclList====" + selectedCheckboxvalue)
    var objJson = {
        "permanentRegisteredNo": selectedCheckboxvalue,
    };
    var strUrl = Service.deleteVehicle;
    console.log("deleteVehicle Url is:" + strUrl);
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
                showNotificationError(" not delete ", "deleteid", "error");

            } else {
                showNotificationError("delete Successfully", "deleteid", "success");

                window.location.reload();
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }

        }, error: function () {

            console.log('In Error of  deleteVehicle ');
        }
    })
}
//single checkbox reading
function onclickCheckbox() {
    var arrSelectedData = [];
    var count = 0;
    $("input:checkbox[name=case]:checked").each(function () {
        console.log("myCheck12: " + $(this).attr("myCheck12") + " Value: " + $(this).val());
        console.log("myCheck12:---" + $(this).val());
        arrSelectedData.push($(this).val());
        count++;
        $('#reg_no').val(arrSelectedData);
    });
    if ($(".case").length === $(".case:checked").length) {
        //$("#selectall").attr("checked", "checked");
        $("#selectall").prop("checked", true);
    }
    else {
        $("#selectall").removeAttr("checked");
    }
    // vehicleList =  arrSelectedData;
    console.log("arrSelectedData: " + JSON.stringify(arrSelectedData));
}

//vehicleNameId
function Validate2(event) {
    var regex = new RegExp("^[1-9-]");
    var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}
/*
 * For getting RegsertNo.
 * priyadarshini
 * 30-11-2019
 */
function getRegsertNo() {
    $("#registerNumber_id").empty();
    var vehicleName = $("#vehicleNameId").val();

    var strUrl = Service.GetRegisterNo;
    console.log("getRegsertNo Url is:" + strUrl);
    var obj_Insert =
            {"vehicleName": vehicleName}
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        //"Content-Type": "application/json",
        async: false,
        crossDomain: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: function (data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            console.log('RegsertNo not loaded');
            } else {
                var jsonArray = data.objControllerDTO;
                var selectfirst = "<option value='0'>Select RegisterNo</option>";
                $('#registerNumber_id').append(selectfirst);
                $.each(jsonArray, function (i, resData) {
                    var DistrictData = "<option value=" + resData.vehicleID + ">" + resData.registerNo + "</option>";
                    $(DistrictData).appendTo('#registerNumber_id');
                });
            }
        },
        error: function (err) {
            console.error("Error in  getBaseLoc" + JSON.stringify(err));
        }
    });

    $('#registerNumberId').trigger("chosen:updated");
    $('#registerNumberId').chosen();
}





//function  getSelectedAddressData(eventid, patientid) {
//
//    $.ajax({
//        type: "GET",
//        url: service.getEnteredEventIdAddress + eventid,
//        dataType: "json",
//        async: false,
//        contentType: "application/json; charset=utf-8",
//        crossDomain: true,
//        success: function (data) {
//            $.each(data, function (i, data) {
//
//                $("#districtdata option:contains(" + data.ei_dist_name + ")").attr('selected', 'selected').trigger("chosen:updated");
//                districtDataOnchange(data.ei_distId);
//                $("#tehsilData option:contains(" + data.ei_mandal_name + ")").attr('selected', 'selected').trigger("chosen:updated");
//                tehsilDataOnchange(data.ei_mandalid);
//                $("#cityVillageData option:contains(" + data.ei_cityvillage_name + ")").attr('selected', 'selected').trigger("chosen:updated");
//                cityVillageonChange(data.ei_cityvillageid);
//                $("#localityData option:contains(" + data.ei_locality_name + ")").attr('selected', 'selected').trigger("chosen:updated");
//                localityDataonChange(data.ei_localityid);
//                $("#landmarkData option:contains(" + data.ei_landmark_name + ")").attr('selected', 'selected').trigger("chosen:updated");
//                $("#houseNo").val(data.ei_houseno);
//                $("#lanestreet").val(data.ei_lane_street);
//            });
//        },
//        error: function (textStatus, errorThrown) {
//            console.log("Error Occured Getting getActionsTaken Data " + errorThrown);
//        }
//
//    });
//
//    $('#districtdata').trigger("chosen:updated");
//    $('#districtdata').chosen();
//    $('#tehsilData').trigger("chosen:updated");
//    $('#tehsilData').chosen();
//    $('#cityVillageData').trigger("chosen:updated");
//    $('#cityVillageData').chosen();
//    $('#localityData').trigger("chosen:updated");
//    $('#localityData').chosen();
//    $('#landmarkData').trigger("chosen:updated");
//    $('#landmarkData').chosen();
//}
//
//



//$(function () {
//    // add multiple select / deselect functionality
//    $("#selectall").click(function () {
//        
//        $('.case').attr('checked', this.checked);
//        
//    });
//    // if all checkbox are selected, check the selectall checkbox
//    // and viceversa
//    $(".case").click(function () {
//       alert("case");
//        if ($(".case").length == $(".case:checked").length) {
//           $("#selectall").attr("checked", "checked");
//        } else {
//            $("#selectall").removeAttr("checked");
//        }
//    });
//        
//
//});
//var arrSelectedData = [];







//            //.case
//    //alert("StorePath javascript function::"+data);
//    arrSelectedData.push(permanentRegisteredNo);
//    $('#reg_no').val(arrSelectedData);
//    var cc = $('#reg_no').val();
//    alert("ccc------" + cc);

//}

////$(function () {
//
//$("#selectall").click(function(event){
//    alert("priya");
//    event.preventDefault();
//        alert("priya");
//    var searchIDs = $("#find-table input:checkbox:checked").map(function(){
//      return $(this).val();
//    }).get(); // <----
//    alert("pppppppppppppppp======"+searchIDs);
//    console.log(searchIDs);
//});//});


//var arrSelectedData = [];
//function onclickCheckbox(permanentRegisteredNo) {
//    alert("permanentRegisteredNo===="+permanentRegisteredNo);
//    var pp=$('.case').is(":checked");
//       $('.case').attr('checked', this.checked);
//    if ($('.case').is(":checked")) {
//        alert("arrSelectedData==========="+arrSelectedData);
//        arrSelectedData.push(permanentRegisteredNo);
//    alert("permanentRegisteredNo======="+permanentRegisteredNo);
//        $('#reg_no').val(arrSelectedData);
//        var selectedValue = $('#reg_no').val();
//    }
//    if ($(".case").length === $(".case:checked").length) {
//        //$("#selectall").attr("checked", "checked");
//        $("#selectall").prop("checked", true);
//    }
//    // });
//    else {
//        $("#selectall").removeAttr("checked");
//       
//    }
//    
//}



//(function () {
//$('#selectall').change(function (event) {
//$('#selectall').click(function () {
//   $('#reg_no').empty();
//   $('.case').attr('checked', this.checked);
//    if ($(this).is(":checked")) {
//        $('.case').prop("checked", true);
//        var arrSelectedData = [];
//        $('#reg_no').val(arrSelectedData);
//        event.preventDefault();
//        var searchIDs = $(".case:checkbox:checked").map(function () {
//        console.log("selected value==="+searchIDs)
//         return $(this).val();
//        }).get(); // <----
//        $('#reg_no').val('');
//        $('#reg_no').val(searchIDs);
//    } else {
//     
//        $('.case').prop("checked", false);
//        
//    }
//    
//});
//// });

//  1111111  var arrSelectedData = [];
//    function onclickCheckbox(permanentRegisteredNo) { 
//            
//    if($(".case").length == $(".case:checked").length) {
//     $("#selectall").attr("checked", "checked");        
//       //if ($('.case').is(":checked")) {
//    
//        arrSelectedData.push(permanentRegisteredNo);
//        alert("arrSelectedData--"+arrSelectedData);
//  
//              $('#reg_no').val(arrSelectedData);    
//              var regNo=$('#reg_no').val();
//                  
//           // }          
//		} else {
//			$("#selectall").removeAttr("checked");
//		}
//     
//            }










//})


// if all checkbox are selected, check the selectall checkbox
// and viceversa
//	$(".case").click(function(){
//
//		if($(".case").length == $(".case:checked").length) {
//			$("#selectall").attr("checked", "checked");
//		} else {
//			$("#selectall").removeAttr("checked");
//		}
//
//	});
//    




function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}





//     $('#selectall').change(function (event){
//       $('.case').attr('checked', this.checked);

//           $('.case').prop("checked", true);
//              if ($('.case').is(":checked")) {
//               //arrSelectedData.push(permanentRegisteredNo);
//              $('#reg_no').val(arrSelectedData);
//              var selectedValue = $('#reg_no').val();
//             alert("selectedValue------" + selectedValue);
//                      }
function onclickReg(){
  
}