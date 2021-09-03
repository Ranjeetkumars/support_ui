/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    try {
        districtDropDown();
        baselocationDropDown();
        BaselocationData();
//        BaselocationData();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

/* 
 * @Author : Habiboon Patan
 * @Date : 30-11-2019
 * @Desc : districtDropDown
 */
function districtDropDown() {
	
    try {

        $('#districtId').empty();
        $('#districtIdForaddCity').empty();
        $('#districtdIdforlocality').empty();
        $('#districtIdforlandmark').empty();
        $('#districtIdForBaselocation').empty();
        $('#districtIdForSearch').empty();
        $('#up_districtIdForBaselocation').empty();
        var strUrl = Service.DISTRICT_DROPDOWN;
        console.log("DISTRICT_DROPDOWN::::: " + strUrl);
        var stateid = 1;
        var obj_Insert = {
            stateId: stateid
        };
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
                    var jsonArray = data.objGetGisLayersControllerDTO;
                    var selectfirst = "<option value='0'>Select Districts</option>";
                    $('#districtId').append(selectfirst);
                    $('#districtIdForaddCity').append(selectfirst);
                    $('#districtdIdforlocality').append(selectfirst);
                    $('#districtIdforlandmark').append(selectfirst);
                    $('#districtIdForBaselocation').append(selectfirst);
                    $('#districtIdForSearch').append(selectfirst);
                    $('#up_districtIdForBaselocation').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var DistrictData = "<option value=" + resData.districtId + ">" + resData.districtName + "</option>";
                        $(DistrictData).appendTo('#districtId');
                        $(DistrictData).appendTo('#districtIdForaddCity');
                        $(DistrictData).appendTo('#districtdIdforlocality');
                        $(DistrictData).appendTo('#districtIdforlandmark');
                        $(DistrictData).appendTo('#districtIdForBaselocation');
                        $(DistrictData).appendTo('#districtIdForSearch');
                        $(DistrictData).appendTo('#up_districtIdForBaselocation');
                    });
                }
            },
            error: function(err) {
                console.error("Error in districtDropDown" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in districtDropDown()' + err);
    }
    $('#districtId').trigger("chosen:updated");
    $('#districtIdForaddCity').trigger("chosen:updated");
    $('#districtdIdforlocality').trigger("chosen:updated");
    $('#districtIdforlandmark').trigger("chosen:updated");
    $('#districtIdForBaselocation').trigger("chosen:updated");
    $('#districtIdForSearch').trigger("chosen:updated");
    $('#up_districtIdForBaselocation').trigger("chosen:updated");
    $('#districtId').chosen();
    $('#districtIdForaddCity').chosen();
    $('#districtdIdforlocality').chosen();
    $('#districtIdforlandmark').chosen();
    $('#districtIdForBaselocation').chosen();
    $('#districtIdForSearch').chosen();
    $('#up_districtIdForBaselocation').chosen();
}
/* 
 * @Author : Habiboon Patan
 * @Date : 02-12-2019
 * @Desc : Mandal Registration
 */

function mandalRegistration() {
    var districtId = $('#districtId option:selected').text();
    //alert("district: " + districtId);
    var mandalNameId = $('#mandalNameId').val();
    var useId = 1;
    var moduleId = 1;
    var roleId = 1;
    if (districtId === "0") {
        showNotificationError("Select District", "districtId", "error");
        return;
    }
    else if (mandalNameId === "0" || mandalNameId === null || mandalNameId === "") {
        showNotificationError("Enter Mandal Name", "mandalNameId", "error");
        return;
    }
    var obj_Insert = {
        districtId: districtId,
        mandalName: mandalNameId,
        useId: useId,
        moduleId: moduleId,
        roleId: roleId
    };
    var strUrl = Service.MANDAL_REGISTRATION;
    console.log("MANDAL_REGISTRATION::::: " + strUrl);
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
                showNotificationError("Mandal Registered Successfully", "mandalRegId", "success");
                $('#myModal1').modal('toggle');
            }
        },
        error: function() {
            console.log("Error In mandalRegistration");
        }
    });
}
function AddMandalreset() {
    $('#districtId').val('0').trigger("chosen:updated");
    $('#mandalNameId').val('');
}
$('#districtIdForaddCity').on('change', function() {
    var districtId = $('#districtIdForaddCity').val();
    $('#MandalIDForAddCity').empty();
    mandalDropdownBasedOnDistrictId(districtId, 'MandalIDForAddCity');
});
$('#districtdIdforlocality').on('change', function() {
    var districtId = $('#districtdIdforlocality').val();
    $('#mandalIdforlocality').empty();
    mandalDropdownBasedOnDistrictId(districtId, 'mandalIdforlocality');
});
$('#districtIdforlandmark').on('change', function() {
    var districtId = $('#districtIdforlandmark').val();
    $('#mandalIdforlandmark').empty();
    mandalDropdownBasedOnDistrictId(districtId, 'mandalIdforlandmark');
});
$('#districtIdForBaselocation').on('change', function() {
    var districtId = $('#districtIdForBaselocation').val();
    $('#mandalIdForBaselocation').empty();
    mandalDropdownBasedOnDistrictId(districtId, 'mandalIdForBaselocation');
});
$('#districtIdForSearch').on('change', function() {
    var districtId = $('#districtIdForSearch').val();
    $('#mandalIdForSearch').empty();
    mandalDropdownBasedOnDistrictId(districtId, 'mandalIdForSearch');
});
$('#up_districtIdForBaselocation').on('change', function() {
    var districtId = $('#up_districtIdForBaselocation').val();
    $('#up_mandalIdForBaselocation').empty();
    mandalDropdownBasedOnDistrictId(districtId, 'up_mandalIdForBaselocation');
});
/* 
 * @Author : Habiboon Patan
 * @Date : 02-12-2019
 * @Desc : Mandal Dropdown based on district Id
 */
function mandalDropdownBasedOnDistrictId(districtId, MandalID) {
    try {
        var id = '#' + MandalID;
        $(id).empty();
        var strUrl = Service.MANDAL_DROPDOWN_BASED_ON_DISTRICTID;
        console.log("MANDAL_DROPDOWN_BASED_ON_DISTRICTID:::::: " + strUrl);
        var obj_Insert = {
            districtId: districtId
        };
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
                    var jsonArray = data.objGetGisLayersControllerDTO;
                    var selectfirst = "<option value='0'>Select Mandal</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var mandalData = "<option value=" + resData.mandalId + ">" + resData.mandalName + "</option>";
                        $(mandalData).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in mandalDropdownBasedOnDistrictId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in mandalDropdownBasedOnDistrictId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}
/* 
 * @Author : Habiboon Patan
 * @Date : 02-12-2019
 * @Desc : City/Village Registration
 */
function cityRegistration() {
    var districtId = $('#districtIdForaddCity').val();
    var mandalId = $('#MandalIDForAddCity').val();
    var cityNameId = $('#cityNameId').val();
    var userId = 1;
    var moduleId = 1;
    var roleId = 1;

    if (districtId === "0") {
        showNotificationError("Select District", "districtIdForaddCity", "error");
        return;
    }
    else if (mandalId === "0") {
        showNotificationError("Select Mandal", "MandalIDForAddCity", "error");
        return;
    }
    else if (cityNameId === "0" || cityNameId === null || cityNameId === "") {
        showNotificationError("Enter City", "cityNameId", "error");
        return;
    }
    var obj_Insert = {
        districtId: districtId,
        mandalId: mandalId,
        cityName: cityNameId,
        userId: userId,
        moduleId: moduleId,
        roleId: roleId
    };

    var strUrl = Service.CITY_VILLAGE_REGISTRATION;
    console.log("CITY_VILLAGE_REGISTRATION::::: " + strUrl);
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
                showNotificationError("City Registered Successfully", "cityRegistrationID", "success");
                $('#myModal2').modal('toggle');
            }
        },
        error: function() {
            console.log("Error In cityRegistration");
        }
    });
}
function addcityReset() {
    $('#districtIdForaddCity').val('0').trigger("chosen:updated");
    $('#MandalIDForAddCity').val('0').trigger("chosen:updated");
    $('#cityNameId').val('');
}
$('#mandalIdforlocality').on('change', function() {
    var MandalId = $('#mandalIdforlocality').val();
    $('#cityIdforlocality').empty();
    cityDropdownBasedOnMandalId(MandalId, 'cityIdforlocality');
});
$('#mandalIdforlandmark').on('change', function() {
    var MandalId = $('#mandalIdforlandmark').val();
    $('#cityIdforlandmark').empty();
    cityDropdownBasedOnMandalId(MandalId, 'cityIdforlandmark');
});
$('#mandalIdForBaselocation').on('change', function() {
    var MandalId = $('#mandalIdForBaselocation').val();
    $('#cityIdForBaselocation').empty();
    cityDropdownBasedOnMandalId(MandalId, 'cityIdForBaselocation');
});
$('#up_mandalIdForBaselocation').on('change', function() {
    var MandalId = $('#up_mandalIdForBaselocation').val();
    $('#up_cityIdForBaselocation').empty();
    cityDropdownBasedOnMandalId(MandalId, 'up_cityIdForBaselocation');
});

/* 
 * @Author : Habiboon Patan
 * @Date : 02-12-2019
 * @Desc : City/Village Dropdown based on Mandal Id
 */
function cityDropdownBasedOnMandalId(MandalId, cityId) {
    try {
        var id = '#' + cityId;
        $(id).empty();
        var strUrl = Service.CITY_DROPDOWN;
        console.log("CITY_DROPDOWN::::: " + strUrl);
        var obj_Insert = {
            mandalId: MandalId
        };
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
                    var jsonArray = data.objGetGisLayersControllerDTO;
                    var selectfirst = "<option value='0'>Select City</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var cityData = "<option value=" + resData.cityId + ">" + resData.cityName + "</option>";
                        $(cityData).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in cityDropdownBasedOnMandalId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in cityDropdownBasedOnMandalId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}

/* 
 * @Author : Habiboon Patan
 * @Date : 02-12-2019
 * @Desc : Locality Registration
 */

function localityRegistration() {
    var districtId = $('#districtdIdforlocality').val();
    var mandalId = $('#mandalIdforlocality').val();
    var cityID = $('#cityIdforlocality').val();
    var localityName = $('#localityNameId').val();
    var userId = 1;
    var moduleId = 1;
    var roleId = 1;

    if (districtId === "0") {
        showNotificationError("Select District", "districtdIdforlocality", "error");
        return;
    }
    else if (mandalId === "0") {
        showNotificationError("Select Mandal", "mandalIdforlocality", "error");
        return;
    }
    else if (cityID === "0") {
        showNotificationError("Select City", "cityIdforlocality", "error");
        return;
    }
    else if (localityName === "0" || localityName === null || localityName === "") {
        showNotificationError("Enter Locality", "localityNameId", "error");
        return;
    }
    var obj_Insert = {
        cityId: cityID,
        districtId: districtId,
        mandalId: mandalId,
        localityName: localityName,
        userId: userId,
        moduleId: moduleId,
        roleId: roleId
    };
    var strUrl = Service.LOCALITY_REGISTRATION;
    console.log("LOCALITY_REGISTRATION::::: " + strUrl);
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
                showNotificationError("Locality Registered Successfully", "localityregistrationId", "success");
                $('#myModal3').modal('toggle');
            }
        },
        error: function() {
            console.log("Error In localRegistration");
        }
    });
}


function addLocalityReset() {
    $('#districtdIdforlocality').val('0').trigger("chosen:updated");
    $('#mandalIdforlocality').val('0').trigger("chosen:updated");
    $('#cityIdforlocality').val('0').trigger("chosen:updated");
    $('#localityNameId').val('');
}


$('#cityIdforlandmark').on('change', function() {
    var cityId = $('#cityIdforlandmark').val();
    $('#localityIdforlandmark').empty();
    localityDropDownBasedOnCityID(cityId, 'localityIdforlandmark');
});
$('#cityIdForBaselocation').on('change', function() {
    var cityId = $('#cityIdForBaselocation').val();
    $('#localityIdForBaselocation').empty();
    localityDropDownBasedOnCityID(cityId, 'localityIdForBaselocation');
});
$('#up_cityIdForBaselocation').on('change', function() {
    var cityId = $('#up_cityIdForBaselocation').val();
    $('#up_localityIdForBaselocation').empty();
    localityDropDownBasedOnCityID(cityId, 'up_localityIdForBaselocation');
});


/* 
 * @Author : Habiboon Patan
 * @Date : 02-12-2019
 * @Desc : Locality Dropdown based on City Id
 */
function localityDropDownBasedOnCityID(cityId, locality) {
    try {
        var id = '#' + locality;
        $(id).empty();
        var strUrl = Service.LOCALITY_DROPDOWN_BASEDON_CITYID;
        console.log("LOCALITY_DROPDOWN_BASEDON_CITYID::: " + strUrl);
        var obj_Insert = {
            cityId: cityId
        };
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
                    var jsonArray = data.objGetGisLayersControllerDTO;
                    var selectfirst = "<option value='0'>Select Locality</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var localityData = "<option value=" + resData.localityId + ">" + resData.localityName + "</option>";
                        $(localityData).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in localityDropDownBasedOnCityID" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in localityDropDownBasedOnCityID()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}




/* 
 * @Author : Habiboon Patan
 * @Date : 02-12-2019
 * @Desc : LandMark Registration
 */

function landMarkRegistration() {
    var districtId = $('#districtIdforlandmark').val();
    var mandalId = $('#mandalIdforlandmark').val();
    var cityID = $('#cityIdforlandmark').val();
    var localityId = $('#localityIdforlandmark').val();
    var landmarkNameId = $('#landmarkNameId').val();
    var latitudeId = $('#latitudeIdforlandmark').val();
    var longitudeId = $('#longitudeIdforlandmark').val();
    var userId = 1;
    var moduleId = 1;
    var roleId = 1;

    if (districtId === "0") {
        showNotificationError("Select District", "districtIdforlandmark", "error");
        return;
    }
    else if (mandalId === "0") {
        showNotificationError("Select Mandal", "mandalIdforlandmark", "error");
        return;
    }
    else if (cityID === "0") {
        showNotificationError("Select City", "cityIdforlandmark", "error");
        return;
    }
    else if (localityId === "0") {
        showNotificationError("Select Locality", "localityIdforlandmark", "error");
        return;
    }
    else if (landmarkNameId === "0" || landmarkNameId === null || landmarkNameId === "") {
        showNotificationError("Enter Landmark", "landmarkNameId", "error");
        return;
    }
    else if (latitudeId === "0" || latitudeId === null || latitudeId === "") {
        showNotificationError("Enter Latitude", "latitudeIdforlandmark", "error");
        return;
    }
    else if (longitudeId === "0" || longitudeId === null || longitudeId === "") {
        showNotificationError("Enter longitude", "longitudeIdforlandmark", "error");
        return;
    }
    var obj_Insert = {
        cityId: cityID,
        districtId: districtId,
        mandalId: mandalId,
        localityId: localityId,
        landMarkName: landmarkNameId,
        latitude: latitudeId,
        longitude: longitudeId,
        userId: userId,
        moduleId: moduleId,
        roleId: roleId
    };
    var strUrl = Service.LANDMARK_REGISTRATION;
    console.log("LANDMARK_REGISTRATION::::: " + strUrl);
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
                showNotificationError("Landmark Registered Successfully", "landmarkRegistrationID", "success");
                $('#myModal4').modal('toggle');
            }
        },
        error: function() {
            console.log("Error In landMarkRegistration");
        }
    });
}

function addLandMarkReset() {
    $('#districtIdforlandmark').val('0').trigger("chosen:updated");
    $('#mandalIdforlandmark').val('0').trigger("chosen:updated");
    $('#cityIdforlandmark').val('0').trigger("chosen:updated");
    $('#localityIdforlandmark').val('0').trigger("chosen:updated");
    $('#landmarkNameId').val('');
    $('#latitudeIdforlandmark').val('');
    $('#longitudeIdforlandmark').val('');
}




$('#localityIdForBaselocation').on('change', function() {
    var localityId = $('#localityIdForBaselocation').val();
    $('#landmarkForBaselocation').empty();
    landmarkDropDownBasedOnLocalityId(localityId, 'landmarkForBaselocation');
});
$('#up_localityIdForBaselocation').on('change', function() {
    var localityId = $('#up_localityIdForBaselocation').val();
    $('#up_landmarkForBaselocation').empty();
    landmarkDropDownBasedOnLocalityId(localityId, 'up_landmarkForBaselocation');
});
/* 
 * @Author : Habiboon Patan
 * @Date : 03-12-2019
 * @Desc : LandMark Dropdown based on Locality Id
 */
function landmarkDropDownBasedOnLocalityId(localityId, landmarkId) {
    try {
        var id = '#' + landmarkId;
        $(id).empty();
        var strUrl = Service.LANDMARK_DROPDOWN_BASEDON_LOCALITYID;
        console.log("LANDMARK_DROPDOWN_BASEDON_LOCALITYID::::: " + strUrl);
        var obj_Insert = {
            localityId: localityId
        };
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
                    var jsonArray = data.objGetGisLayersControllerDTO;
                    var selectfirst = "<option value='0'>Select Landmark</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var landmarkId = "<option value=" + resData.landmarkId + ">" + resData.landmarkName + "</option>";
                        $(landmarkId).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in landmarkDropDownBasedOnLocalityId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in landmarkDropDownBasedOnLocalityId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}



/* 
 * @Author : Habiboon Patan
 * @Date : 03-12-2019
 * @Desc : Baselocation Registration
 */

function baselocationRegistration() {
    var districtId = $('#districtIdForBaselocation').val();
    var mandalId = $('#mandalIdForBaselocation').val();
    var cityID = $('#cityIdForBaselocation').val();
    var localityId = $('#localityIdForBaselocation').val();
    var landmarkId = $('#landmarkForBaselocation').val();
    var areaTypeId = $('#areaTypeIdForBaselocation').val();
    var latitude = $('#latitudeId').val();
    var longitudeId = $('#longitudeId').val();
    var baselocationNameID = $('#baselocationNameID').val();
    var userId = 1;
    var moduleId = 1;
    var roleId = 1;

    if (districtId === "0") {
        showNotificationError("Select District", "districtIdForBaselocation", "error");
        return;
    }
    else if (mandalId === "0") {
        showNotificationError("Select Mandal", "mandalIdForBaselocation", "error");
        return;
    }
    else if (cityID === "0") {
        showNotificationError("Select City", "cityIdForBaselocation", "error");
        return;
    }
    else if (localityId === "0") {
        showNotificationError("Select Locality", "localityIdForBaselocation", "error");
        return;
    }
    else if (landmarkId === "0") {
        showNotificationError("Select Landmark", "landmarkForBaselocation", "error");
        return;
    }
    else if (areaTypeId === "0") {
        showNotificationError("Select Area Type", "areaTypeIdForBaselocation", "error");
        return;
    }

    else if (latitude === "0" || latitude === null || latitude === "") {
        showNotificationError("Enter Latitude", "latitudeId", "error");
        return;
    }
    else if (longitudeId === "0" || longitudeId === null || longitudeId === "") {
        showNotificationError("Enter longitude", "longitudeId", "error");
        return;
    }
    else if (baselocationNameID === "0" || baselocationNameID === null || baselocationNameID === "") {
        showNotificationError("Enter Baselocation", "baselocationNameID", "error");
        return;
    }
    var obj_Insert = {
        areaTypeId: areaTypeId,
        landMarkId: landmarkId,
        localityId: localityId,
        cityId: cityID,
        mandalId: mandalId,
        districtId: districtId,
        baselocationName: baselocationNameID,
        latitude: latitude,
        longitude: longitudeId,
        userId: userId,
        moduleId: moduleId,
        roleId: roleId
    };
    var strUrl = Service.BASELOCATION_REGISTRATION;
    console.log("BASELOCATION_REGISTRATION:::: " + strUrl);
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
                showNotificationError("Baselocation Registered Successfully", "baselocationRegistrationId", "success");
                BaselocationData();
                addBaselocationReset();
                $('#registration').modal('toggle');

            }
        },
        error: function() {
            console.log("Error In baselocationRegistration");
        }
    });
}

function addBaselocationReset() {
    $('#districtIdForBaselocation').val('0').trigger("chosen:updated");
    $('#mandalIdForBaselocation').val('0').trigger("chosen:updated");
    $('#cityIdForBaselocation').val('0').trigger("chosen:updated");
    $('#localityIdForBaselocation').val('0').trigger("chosen:updated");
    $('#landmarkForBaselocation').val('0').trigger("chosen:updated");
    $('#areaTypeIdForBaselocation').val('0').trigger("chosen:updated");
    $('#latitudeId').val('');
    $('#longitudeId').val('');
    $('#baselocationNameID').val('');
}
/* 
 * @Author : Habiboon Patan
 * @Date : 04-12-2019
 * @Desc : Base Location DropDown
 */
function baselocationDropDown() {
    try {
        $('#baselocationIdForSearch').empty();
        var strUrl = Service.BASELOCATION_DROPDWON;
        console.log("BASELOCATION_DROPDWON::::: " + strUrl);
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
                    $('#baselocationIdForSearch').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var zoneData = "<option value=" + resData.baselocationId + ">" + resData.baselocationName + "</option>";
                        $(zoneData).appendTo('#baselocationIdForSearch');
                    });
                }
            },
            error: function(err) {
                console.error("Error in baselocationDropDown" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in baselocationDropDown()' + err);
    }
    $('#baselocationIdForSearch').trigger("chosen:updated");
    $('#baselocationIdForSearch').chosen();
}
/* 
 * @Author : Habiboon Patan
 * @Date : 04-12-2019
 * @Desc : Base Location Data
 */
function BaselocationData() {
    $('#driverTable').html("");
    try {

        var districtId = $('#districtIdForSearch').val();
        var mandalId = $('#mandalIdForSearch').val();
        var baselocationId = $('#baselocationIdForSearch').val();
        if (districtId === "undefined" || districtId === 'undefined' || districtId === undefined) {
            mandalId = 0;
        }
        if (mandalId === "undefined" || mandalId === 'undefined' || mandalId === undefined) {
            mandalId = 0;
        }
        if (baselocationId === "undefined" || baselocationId === 'undefined' || baselocationId === undefined) {
            baselocationId = 0;
        }

        var obj_Insert = {
            districtId: districtId,
            mandalId: mandalId,
            baselocationId: baselocationId
        };
        var strUrl = Service.SEARCH_BASELOCATIONDATA;
        console.log("SEARCH_BASELOCATIONDATA::::: " + strUrl);
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
                    $('#deleteid').hide();

                }

                else {
                    var jsonArray = data.objGetBaselocationsControllerDTO;
                    if (jsonArray.length > 0) {
                        loadBaselocationList(jsonArray);
                        loadDataTable();
                        $('#deleteid').show();

                    }
                }
            },
            error: function(err) {
                console.error('update Stock error: ' + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error("error occur in search()" + JSON.stringify(err))
    }
}


var baselocid;
function loadBaselocationList(strData) {

    var objDivTag = document.createElement('div');
    $(objDivTag).addClass('table-responsive');

    var objTableTag = document.createElement('table');
    $(objTableTag)
            .addClass(
                    'table table-striped table-bordered table-hover dataTables-example');
    $(objDivTag).append(objTableTag);

    var objTHead = document.createElement('thead');
    $(objTableTag).append(objTHead);

    var objTr = document.createElement('tr');
    $(objTHead).append(objTr);

    var objTHead121 = document.createElement("th");
    $(objTHead121).html('<input type="checkbox" id="selectall" onclick="test()">');
    $(objTHead121).addClass("text-center");
    $(objTr).append(objTHead121);

    var objTHead1 = document.createElement('th');
    $(objTHead1).html('S.No');
    $(objTr).append(objTHead1);


    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Baselocation Name');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('District Name');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Mandal Name');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('City Name');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('Locality Name');
    $(objTr).append(objTHead7);

    var objTHead8 = document.createElement('th');
    $(objTHead8).html('Landmark Name');
    $(objTr).append(objTHead8);

    var objTHead9 = document.createElement('th');
    $(objTHead9).html('Longitude');
    $(objTr).append(objTHead9);

    var objTHead10 = document.createElement('th');
    $(objTHead10).html('Latitude');
    $(objTr).append(objTHead10);

    var objTHead11 = document.createElement('th');
    $(objTHead11).html('Area Type');
    $(objTr).append(objTHead11);

    var objTHead12 = document.createElement('th');
    $(objTHead12).html('Update');
    $(objTr).append(objTHead12);

    var objTHead13 = document.createElement('th');
    $(objTHead13).html('Delete');
    $(objTr).append(objTHead13);


    var objTBody = document.createElement('tbody');
    $(objTBody).attr('id', 'driverTablebody');
    $(objTableTag).append(objTBody);

    for (var i = 0; i < strData.length; i++) {

        var index = i + 1;
        var tbleRow = document.createElement('tr');

        var tablcol120 = document.createElement("td");

        $(tablcol120).html('<input type="checkbox" class="baselocation" id="ch_baseID" value=' + strData[i].baselocationId + ' name="baselocation"  >');
        $(tbleRow).append(tablcol120);
        $(tablcol120).attr('onclick', 'onclickCheckbox()');


        var tblCol = document.createElement('td');
        $(tblCol).addClass('text-center');
        $(tblCol).html(index);
        $(tbleRow).append(tblCol);

        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].baselocationName);

        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');

        $(tblCol2).html(strData[i].districtName);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');

        $(tblCol3).html(strData[i].mandalName);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].cityName);
        $(tbleRow).append(tblCol4);

        var tblCol5 = document.createElement('td');
        $(tblCol5).addClass('text-center');
        $(tblCol5).html(strData[i].localityName);
        $(tbleRow).append(tblCol5);

        var tblCol6 = document.createElement('td');
        $(tblCol6).addClass('text-center');
        $(tblCol6).html(strData[i].landMarkName);
        $(tbleRow).append(tblCol6);

        var tblCol7 = document.createElement('td');
        $(tblCol7).addClass('text-center');
        $(tblCol7).html(strData[i].longitude);
        $(tbleRow).append(tblCol7);

        var tblCol8 = document.createElement('td');
        $(tblCol8).addClass('text-center');
        $(tblCol8).html(strData[i].latitude);
        $(tbleRow).append(tblCol8);

        var tblCol9 = document.createElement('td');
        $(tblCol9).addClass('text-center');
        $(tblCol9).html(strData[i].areatypeName);
        $(tbleRow).append(tblCol9);


        var tablcol11 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode(" Update");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-primary btn-sm fa fa-edit');
        $(buttonTag).attr(
                'onclick',
                'get_RowData("' + strData[i].districtName + '","' + strData[i].districtId + '", "' + strData[i].mandalId + '","' + strData[i].mandalName + '","' + strData[i].cityId + '", "' + strData[i].cityName + '", "' + strData[i].localityId + '", "' + strData[i].localityName + '","' + strData[i].landMarkId + '", "' + strData[i].landMarkName + '", "' + strData[i].latitude + '","' + strData[i].longitude + '", "' + strData[i].areatypeName + '", "' + strData[i].baselocationName + '","' + strData[i].baselocationId + '")');
        $(tablcol11).append(buttonTag);
        $(tablcol11).css('height', '36px');
        $(tbleRow).append(tablcol11);

        var tablcol12 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode(" Delete");
        buttonTag.appendChild(text);
        $(buttonTag).addClass('btn btn-danger btn-sm fa fa-trash');
        $(buttonTag).attr(
                'onclick',
                'deleteAllBaselocations()');
        $(tablcol12).append(buttonTag);
        $(tablcol12).css('height', '36px');
        $(tbleRow).append(tablcol12);


        $(objTBody).append(tbleRow);
    }
    $("#driverTable").append(objDivTag);
}


function get_RowData(districtName, districtId, mandalId, mandalName, cityId, cityName, localityId, localityName, landMarkId, landMarkName, latitude, longitude, areatypeName, baselocationName, baselocationId) {
    $('#update').modal('show');
    console.log('districtName: ' + districtName);

    $("#up_districtIdForBaselocation option:contains(" + districtName + ")").attr('selected', 'selected').trigger("chosen:updated");

    mandalDropdownBasedOnDistrictId(districtId, 'up_mandalIdForBaselocation');
    $("#up_mandalIdForBaselocation option:contains(" + mandalName + ")").attr('selected', 'selected').trigger("chosen:updated");

    cityDropdownBasedOnMandalId(mandalId, 'up_cityIdForBaselocation');
    $("#up_cityIdForBaselocation option:contains(" + cityName + ")").attr('selected', 'selected').trigger("chosen:updated");

    localityDropDownBasedOnCityID(cityId, 'up_localityIdForBaselocation');
    $("#up_localityIdForBaselocation option:contains(" + localityName + ")").attr('selected', 'selected').trigger("chosen:updated");

    landmarkDropDownBasedOnLocalityId(localityId, 'up_landmarkForBaselocation');
    $("#up_landmarkForBaselocation option:contains(" + landMarkName + ")").attr('selected', 'selected').trigger("chosen:updated");

    $("#up_areaTypeIdForBaselocation option:contains(" + areatypeName + ")").attr('selected', 'selected');
    $('#up_latitudeId').val(latitude);
    $('#up_longitudeId').val(longitude);
    $('#up_baselocationNameID').val(baselocationName);

    baselocid = baselocationId;
}



function test() {
    $("#selectall").click(function() {
        $(".baselocation").prop('checked', $(this).prop('checked'));
        onclickCheckbox();
    });
}


var baselocationsList;
function onclickCheckbox() {
    var baselocations = [];
    var count = 0;
    $("input:checkbox[name=baselocation]:checked").each(function() {
        console.log("Id: " + $(this).attr("id") + " Value: " + $(this).val());
        console.log("id:---" + $(this).val());
        baselocations.push($(this).val());
        count++;
    });

    baselocationsList = "{" + baselocations + "}";
    console.log("baselocations: " + JSON.stringify(baselocations));

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
                        title: 'Baselocation Data'
                    },
                    {
                        extend: 'pdf',
                        title: 'Baselocation Data'
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



/* 
 * @Author : Habiboon Patan
 * @Date : 04-12-2019
 * @Desc : Baselocation Update
 */

function baselocationUpdate() {
    var districtId = $('#up_districtIdForBaselocation').val();
    var mandalId = $('#up_mandalIdForBaselocation').val();
    var cityID = $('#up_cityIdForBaselocation').val();
    var localityId = $('#up_localityIdForBaselocation').val();
    var landmarkId = $('#up_landmarkForBaselocation').val();
    var areaTypeId = $('#up_areaTypeIdForBaselocation').val();
    var latitude = $('#up_latitudeId').val();
    var longitude = $('#up_longitudeId').val();
    var baselocationName = $('#up_baselocationNameID').val();
    var baselocationId = baselocid;
    var obj_Insert = {
        districtId: districtId,
        mandalId: mandalId,
        cityId: cityID,
        localityId: localityId,
        landMarkId: landmarkId,
        baselocationName: baselocationName,
        longitude: longitude,
        latitude: latitude,
        areaTypeId: areaTypeId,
        baselocationId: baselocationId
    };
    var strUrl = Service.BASELOCATION_UPDATE;
    console.log("BASELOCATION_UPDATE::::: " + strUrl);
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
                showNotificationError("Baselocation Updated Successfully", "up_baselocationId", "success");
                BaselocationData();
                $('#update').modal('toggle');
            }
        },
        error: function() {
            console.log("Error In baselocationUpdate");
        }
    });
}
function deleteAllBaselocations() {
    if ($('.baselocation').is(":checked")) {
        $('#myModal5').modal('show');
    } else {
        showNotificationError("Select Baselocations", "selectall", "error");
    }
}
function baselocationsDeletion() {

    var baselocationId = baselocationsList;
    var status = false;

    var obj_Insert = {
        baselocationId: baselocationId,
        status: status
    };
    var strUrl = Service.BASELOCATION_DELETE;
    console.log("BASELOCATION_DELETE::::: " + strUrl);
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
                BaselocationData();
               $('#myModal5').modal('toggle');
            }
        },
        error: function() {
            console.log("Error In BASELOCATION DELETE");
        }
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
//validation
$("#mandalNameId").keypress(function(event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
function isValid(str) {
    return !/[ ~`!#$@_%\^&*()+=\-\[\]\\';,{}|\\":<>\?]/g.test(str);
}
$("#cityNameId").keypress(function(event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#localityNameId").keypress(function(event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#landmarkNameId").keypress(function(event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
$("#latitudeIdforlandmark").keypress(function(event) {
    var character = String.fromCharCode(event.keyCode);
    return latlongValidation(character);
});
function latlongValidation(str) {
    return !/[ ]/g.test(str);
}
$("#longitudeIdforlandmark").keypress(function(event) {
    var character = String.fromCharCode(event.keyCode);
    return latlongValidation(character);
});
$("#latitudeId").keypress(function(event) {
    var character = String.fromCharCode(event.keyCode);
    return latlongValidation(character);
});
$("#longitudeId").keypress(function(event) {
    var character = String.fromCharCode(event.keyCode);
    return latlongValidation(character);
});
$("#baselocationNameID").keypress(function(event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});

function resetsearchparameter() {
    $('#districtIdForSearch').val('0').trigger("chosen:updated");
    $('#mandalIdForSearch').val('0').trigger("chosen:updated");
    $('#baselocationIdForSearch').val('0').trigger("chosen:updated");
    BaselocationData();
}