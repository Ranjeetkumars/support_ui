/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-20
 */

var locationId;

$(document).ready(function() {
    try {
        getCountries();
        getZonedetails();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-20
 * @Desc : getCountries
 */
function getCountries() {
    try {
        $('#zone_CountryId').empty();
        $('#up_zone_CountryId').empty();
        var strUrl = Service.GET_COUNTRIES;
        console.log("getCountries Url is:" + strUrl);
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.objGetCountriesControllerDTO;
                    var selectfirst = "<option value='0'>Select Country</option>";
                    $('#zone_CountryId').append(selectfirst);
                    $('#up_zone_CountryId').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var Country = "<option value=" + resData.countryId + ">" + resData.countryName + "</option>";
                        $(Country).appendTo('#zone_CountryId');
                        $(Country).appendTo('#up_zone_CountryId');
                    });
                }
            },
            error: function(err) {
                console.error("Error in getCountries" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getCountries()' + err);
    }
    $('#zone_CountryId').trigger("chosen:updated");
    $('#up_zone_CountryId').trigger("chosen:updated");
    $('#zone_CountryId').chosen();
    $('#up_zone_CountryId').chosen();
}


$('#zone_CountryId').on('change', function() {
    var countryId = $('#zone_CountryId').val();
    $('#zone_stateId').empty();
    getStatesBasedOnCountryId(countryId, 'zone_stateId');
});

$('#up_zone_CountryId').on('change', function() {
    var countryId = $('#up_zone_CountryId').val();
    $('#up_zone_stateId').empty();
    getStatesBasedOnCountryId(countryId, 'up_zone_stateId');
});



/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-20
 * @Desc : getStatesBasedOnCountryId
 */


function getStatesBasedOnCountryId(countryId, zone_stateId) {
    try {
        var id = '#' + zone_stateId;
        $(id).empty();
        var strUrl = Service.GET_STATES;
        console.log("getStatesBasedOnCountryId Url is:" + strUrl);
        var obj_Insert = {
            countryId: countryId
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
                    var jsonArray = data.objGetCountriesControllerDTO;
                    var selectfirst = "<option value='0'>Select State</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var zoneData = "<option value=" + resData.stateId + ">" + resData.stateName + "</option>";
                        $(zoneData).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in getStatesBasedOnCountryId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getStatesBasedOnCountryId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}



$('#zone_stateId').on('change', function() {
    var stateId = $('#zone_stateId').val();
    $('#zone_districtId').empty();
    getDistrictsbasedOnstateId(stateId, 'zone_districtId');
});

$('#up_zone_stateId').on('change', function() {
    var stateId = $('#up_zone_stateId').val();
    $('#up_zone_districtId').empty();
    getDistrictsbasedOnstateId(stateId, 'up_zone_districtId');
});

/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-20
 * @Desc : getDistrictsbasedOnstateId
 */

function getDistrictsbasedOnstateId(stateId, zone_districtId) {
    try {
        var id = '#' + zone_districtId;
        $(id).empty();
        var strUrl = Service.GET_DISTRICTS;
        console.log("getDistrictsbasedOnstateId Url is:" + strUrl);
        var obj_Insert = {
            stateId: stateId
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
                    var jsonArray = data.objGetCountriesControllerDTO;
                    var selectfirst = "<option value='0'>Select Districts</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var zoneData = "<option value=" + resData.districtId + ">" + resData.districtName + "</option>";
                        $(zoneData).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in getDistrictsbasedOnstateId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getDistrictsbasedOnstateId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}



$('#zone_districtId').on('change', function() {
    var districtId = $('#zone_districtId').val();
    $('#zone_mandalId').empty();
    getMandalsBasedOnDistrictId(districtId, 'zone_mandalId');
});
$('#up_zone_districtId').on('change', function() {
    var districtId = $('#up_zone_districtId').val();
    $('#up_zone_mandalId').empty();
    getMandalsBasedOnDistrictId(districtId, 'up_zone_mandalId');
});
/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-20
 * @Desc : getMandalsBasedOnDistrictId
 */

function getMandalsBasedOnDistrictId(districtId, zone_mandalId) {
    try {
        var id = '#' + zone_mandalId;
        $(id).empty();
        var strUrl = Service.GET_MANDALS;
        console.log("getMandalsBasedOnDistrictId Url is:" + strUrl);
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
                    var jsonArray = data.objGetCountriesControllerDTO;
                    var selectfirst = "<option value='0'>Select Mandal</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var zoneData = "<option value=" + resData.mandalId + ">" + resData.mandalName + "</option>";
                        $(zoneData).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in getMandalsBasedOnDistrictId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getMandalsBasedOnDistrictId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}


$('#zone_mandalId').on('change', function() {
    var mandalId = $('#zone_mandalId').val();
    $('#zone_cityId').empty();
    getcitiesBaseOnMandalId(mandalId, 'zone_cityId');
});
$('#up_zone_mandalId').on('change', function() {
    var mandalId = $('#up_zone_mandalId').val();
    $('#up_zone_cityId').empty();
    getcitiesBaseOnMandalId(mandalId, 'up_zone_cityId');
});
/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-20
 * @Desc : getcitiesBaseOnMandalId
 */

function getcitiesBaseOnMandalId(mandalId, zone_cityId) {
    try {
        var id = '#' + zone_cityId;
        $(id).empty();
        var strUrl = Service.GET_CITIES;
        console.log("getcitiesBaseOnMandalId Url is:" + strUrl);
        var obj_Insert = {
            mandalId: mandalId
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
                    var jsonArray = data.objGetCountriesControllerDTO;
                    var selectfirst = "<option value='0'>Select city</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var zoneData = "<option value=" + resData.cityId + ">" + resData.cityName + "</option>";
                        $(zoneData).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in getcitiesBaseOnMandalId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getcitiesBaseOnMandalId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}




$('#zone_cityId').on('change', function() {
    var cityId = $('#zone_cityId').val();
    $('#zone_localityId').empty();
    getlocalitiesbasedOnCityid(cityId, 'zone_localityId');
});
$('#up_zone_cityId').on('change', function() {
    var cityId = $('#up_zone_cityId').val();
    $('#up_zone_localityId').empty();
    getlocalitiesbasedOnCityid(cityId, 'up_zone_localityId');
});

/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-20
 * @Desc : getlocalitiesbasedOnCityid
 */

function getlocalitiesbasedOnCityid(cityId, zone_localityId) {
    try {
        var id = '#' + zone_localityId;
        $(id).empty();
        var strUrl = Service.GET_LOCALITIES;
        console.log("getlocalitiesbasedOnCityid Url is:" + strUrl);
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
                    var jsonArray = data.objGetCountriesControllerDTO;
                    var selectfirst = "<option value='0'>Select Locality</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var zoneData = "<option value=" + resData.locationId + ">" + resData.locationName + "</option>";
                        $(zoneData).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in getlocalitiesbasedOnCityid" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getlocalitiesbasedOnCityid()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}


/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-20
 * @Desc : insertZoneDetails
 */

function insertZoneDetails() {
    var ZoneName = $('#zoneNameid').val();
    var countryId = $('#zone_CountryId').val();
    var state = $('#zone_stateId').val();
    var district = $('#zone_districtId').val();
    var mandal = $('#zone_mandalId').val();
    var cityId = $('#zone_cityId').val();
    var userId = 1;
    var locality = $('#zone_localityId').val();
    var roleId = 1;
    var moduleId = 1;
    var longitude = $('#zone_longitudeId').val();
    var lattitude = $('#zone_lattitudeId').val();
    var description = $('#zone_descriptionId').val();
    var obj_Insert = {
        locationName: ZoneName,
        countryId: countryId,
        state: state,
        district: district,
        mandal: mandal,
        cityId: cityId,
        userId: userId,
        locality: locality,
        roleId: roleId,
        moduleId: moduleId,
        longitude: longitude,
        lattitude: lattitude,
        description: description
    };
    if (ZoneName === null || ZoneName === '' || ZoneName === "") {
        showNotificationError("Please Enter ZoneName", "zoneNameid", "error");
        return;
    }
    else if (countryId === "0" || countryId === '0') {
        showNotificationError("Select Country", "zone_CountryId", "error");
        return;
    }
    else if (state === "0" || state === '0') {
        showNotificationError("Select State", "zone_stateId", "error");
        return;
    } else if (district === "0" || district === '0') {
        showNotificationError("Select Baselocationid", "zone_districtId", "error");
        return;
    }
    var strUrl = Service.INSERT_ZONE_DETAILS;
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
                showNotificationError("Inserted Successfully", "Zone_SubmitId", "success");
                getZonedetails();
            }
        },
        error: function() {
            console.log("Error In insertZoneDetails");
        }
    });
}
function getZonedetails() {
    $('#driverTable').html("");
    var strUrl = Service.GET_ZONE_DETAILS;
    console.log("strUrl : " + strUrl);
    $.ajax({
        type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: false,
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
                var divTag = document.createElement("h2");
                $(divTag).css("text-align", "center");
                $(divTag).html("No data available....");
                $('#driverTable').append(divTag);
            }
            else {
                var jsonArray = data.objGetCountriesControllerDTO;
                if (jsonArray.length > 0) {
                    getZoneDetailsList(jsonArray);
                    loadDataTable();
                }
            }
        },
        error: function(err) {
            console.error('getZonedetails : ' + JSON.stringify(err));
        }
    });
}


function getZoneDetailsList(strData) {

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

    var objTHead2 = document.createElement('th');
    $(objTHead2).html('Zone');
    $(objTr).append(objTHead2);

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Country');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('State');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('District');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Mandal');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('City');
    $(objTr).append(objTHead7);

    var objTHead8 = document.createElement('th');
    $(objTHead8).html('Locality');
    $(objTr).append(objTHead8);

    var objTHead9 = document.createElement('th');
    $(objTHead9).html('Longitude');
    $(objTr).append(objTHead9);

    var objTHead10 = document.createElement('th');
    $(objTHead10).html('Latitude');
    $(objTr).append(objTHead10);

    var objTHead11 = document.createElement('th');
    $(objTHead11).html('Description');
    $(objTr).append(objTHead11);

    var objTHead12 = document.createElement('th');
    $(objTHead12).html('Edit Zone');
    $(objTr).append(objTHead12);

    var objTHead13 = document.createElement('th');
    $(objTHead13).html('Delete Zone');
    $(objTr).append(objTHead13);



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
        $(tblCol1).html(strData[i].locationName);
        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');
        $(tblCol2).html(strData[i].countryName);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');
        $(tblCol3).html(strData[i].stateName);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].districtName);
        $(tbleRow).append(tblCol4);

        var tblCol5 = document.createElement('td');
        $(tblCol5).addClass('text-center');
        $(tblCol5).html(strData[i].mandalName);
        $(tbleRow).append(tblCol5);

        var tblCol6 = document.createElement('td');
        $(tblCol6).addClass('text-center');
        $(tblCol6).html(strData[i].cityName);
        $(tbleRow).append(tblCol6);

        var tblCol7 = document.createElement('td');
        $(tblCol7).addClass('text-center');
        $(tblCol7).html(strData[i].locationName);
        $(tbleRow).append(tblCol7);

        var tblCol8 = document.createElement('td');
        $(tblCol8).addClass('text-center');
        $(tblCol8).html(strData[i].longitude);
        $(tbleRow).append(tblCol8);

        var tblCol9 = document.createElement('td');
        $(tblCol9).addClass('text-center');
        $(tblCol9).html(strData[i].lattitude);
        $(tbleRow).append(tblCol9);

        var tblCol10 = document.createElement('td');
        $(tblCol10).addClass('text-center');
        $(tblCol10).html(strData[i].desc);
        $(tbleRow).append(tblCol10);

        var tablcol11 = document.createElement("td");
        $(tablcol11).addClass('text-center');
        $(tablcol11).html('<div class="row"> <div class="col-sm-6"> <a href="#" data-toggle="modal"  data-toggle="tooltip"  data-placement="bottom" data-target="#update_Modal" title="Edit"><span class="glyphicon glyphicon-pencil" style="color:blue"></span></a> </div></div>');
        $(tablcol11).attr('onclick', 'get_ZoneDataForUpdate("' + strData[i].locationId + '","' + strData[i].locationName + '","' + strData[i].countryId + '", "' + strData[i].stateId + '", "' + strData[i].districtId + '", "' + strData[i].mandalId + '", "' + strData[i].cityId + '", "' + strData[i].localityId + '", "' + strData[i].longitude + '", "' + strData[i].lattitude + '", "' + strData[i].desc + '")');
        $(tbleRow).append(tablcol11);

        var tablcol12 = document.createElement("td");
        $(tablcol12).addClass('text-center');
        $(tablcol12).html('<div class="row"> <div class="col-sm-6"> <a href="#" data-toggle="tooltip"  data-placement="bottom" title="Cancel" id="update_Modal1" onclick=deleteZone("' + strData[i].locationId + '")> <span class="glyphicon glyphicon-remove" style="color:red"></span> </a></div></div>');
        $(tbleRow).append(tablcol12);

        $(objTBody).append(tbleRow);
    }
    $("#driverTable").append(objDivTag);
}

function get_ZoneDataForUpdate(z_locationId, locationName, countryId, stateId, districtId, mandalId, cityId, localityId, longitude, lattitude, desc) {
    locationId = z_locationId;
    $('#up_zoneNameid').val(locationName);
    $('#up_zone_CountryId').val(countryId).trigger("chosen:updated");
    $('#up_zone_stateId').val(stateId).trigger("chosen:updated");
    $('#up_zone_districtId').val(districtId).trigger("chosen:updated");
    $('#up_zone_mandalId').val(mandalId).trigger("chosen:updated");
    $('#up_zone_cityId').val(cityId).trigger("chosen:updated");
    $('#up_zone_localityId').val(localityId).trigger("chosen:updated");
    $('#up_zone_longitudeId').val(longitude);
    $('#up_zone_lattitudeId').val(lattitude);
    $('#up_zone_descriptionId').val(desc);
}

function deleteZone(locationId) {
    alert('locationId : ' + locationId);
    var locationId = locationId;
    var createdbyId = 1;
    var createdbymoduleId = 1;
    var createdbyroleId = 1;

    var obj_Insert = {
        locationId: locationId,
        userId: createdbyId,
        moduleId: createdbymoduleId,
        roleId: createdbyroleId,
    };
    var strUrl = Service.DELETE_ZONE;
    alert('strUrl : ' + strUrl);
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
                alert('deleted');
//                getZonedetails();
            }
        },
        error: function() {
            console.log("Error In update_ZoneDetails");
        }
    });
}


function update_ZoneDetails() {
    var ZoneName = $('#up_zoneNameid').val();
    var countryId = $('#up_zone_CountryId').val();
    var state = $('#up_zone_stateId').val();
    var district = $('#up_zone_districtId').val();
    var mandal = $('#up_zone_mandalId').val();
    var cityId = $('#up_zone_cityId').val();
    var userId = 1;
    var locality = $('#up_zone_localityId').val();
    var roleId = 1;
    var moduleId = 1;
    var geoRadius = 2;
    var longitude = $('#up_zone_longitudeId').val();
    var lattitude = $('#up_zone_lattitudeId').val();
    var description = $('#up_zone_descriptionId').val();
    var obj_Insert = {
        locationId: locationId,
        countryId: countryId,
        state: state,
        district: district,
        mandal: mandal,
        cityId: cityId,
        locality: locality,
        longitude: longitude,
        lattitude: lattitude,
        description: description,
        geoRadius: geoRadius,
        userId: userId,
        moduleId: moduleId,
        roleId: roleId
    };

    var strUrl = Service.UPDATE_ZONE_DETAILS;
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
                showNotificationError("Updated Successfully", "update_ZoneDetailsId", "success");
//                getZonedetails();
            }
        },
        error: function() {
            console.log("Error In update_ZoneDetails");
        }
    });
}




function loadDataTable() {
    $('.dataTables-example').DataTable(// Data table
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
                        title: 'Zone Details'
                    },
                    {
                        extend: 'pdf',
                        title: 'Zone Details'
                    },
                    {
                        extend: 'print',
                        customize: function(win) {
                            $(win.document.body).addClass('white-bg');
//                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table').addClass(
                                    'compact').css('font-size', 'inherit');
                        }
                    }]
            });
}


/*
 *@DESC : Notification purpose
 *@AuthorName : Habiboon Patan
 *@DATE : 2019-08-20
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