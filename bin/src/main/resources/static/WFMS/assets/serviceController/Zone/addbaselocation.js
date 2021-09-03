/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-21
 */
var localityId;
var countryId;
var stateId;
var districtId;
var mandalId;
var cityId;
var locationId;

$(document).ready(function() {
    try {
        getZones();
        getBaselocationDetails();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});

/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-21
 * @Desc : getCountries
 */
function getZones() {
    try {
        $('#zoneId').empty();
        var strUrl = Service.GETZONES;
        console.log("getZones Url is:" + strUrl);
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
                    var selectfirst = "<option value='0'>Select zone</option>";
                    $('#zoneId').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var Country = "<option value=" + resData.locationId + ">" + resData.locationName + "</option>";
                        $(Country).appendTo('#zoneId');
                    });
                }
            },
            error: function(err) {
                console.error("Error in getZones" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getZones()' + err);
    }
    $('#zoneId').trigger("chosen:updated");
    $('#zoneId').chosen();
}


$('#zoneId').on('change', function() {
    var baselocation_zoneId = $('#zoneId').val();
    getbaselocationInfo(baselocation_zoneId);
    getlandmarkBasedOnlocalityId();
});

/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-22
 * @Desc : getbaselocationInfo
 */

function getbaselocationInfo(baselocation_zoneId) {

    $('#countryId').empty();
    $('#stateId').empty();
    $('#districtId').empty();
    $('#mandalId').empty();
    $('#cityId').empty();
    $('#localityId').empty();

    var strUrl = Service.GET_LOCATION_INFO;
    console.log("getbaselocationInfo Url is:" + strUrl);
    var obj_Insert = {
        locationId: baselocation_zoneId
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
                var jsonArray = data.objWFMSZonesControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    $('#countryId').val(resData.countryName);
                    $('#stateId').val(resData.stateName);
                    $('#districtId').val(resData.districtName);
                    $('#mandalId').val(resData.mandalName);
                    $('#cityId').val(resData.cityName);
                    $('#localityId').val(resData.localityName);

                    localityId = resData.locationId;
                    countryId = resData.countryId;
                    stateId = resData.state;
                    districtId = resData.district;
                    mandalId = resData.mandal;
                    cityId = resData.cityId;

                });
            }
        },
        error: function(err) {
            console.error("Error in getbaselocationInfo" + JSON.stringify(err));
        }
    });
}


/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-22
 * @Desc : getlandmarkBasedOnlocalityId
 */
function getlandmarkBasedOnlocalityId() {
    $('#landmarkId').empty();
    var strUrl = Service.GET_LANDMARK_BASEDON_LOCALITYID;
    console.log("getlandmarkBasedOnlocalityId Url is:" + strUrl);
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
                var jsonArray = data.objGetCountriesControllerDTO;
                var selectfirst = "<option value='0'>Select landmark</option>";
                $('#landmarkId').append(selectfirst);
                $.each(jsonArray, function(i, resData) {
                    var Country = "<option value=" + resData.landMarkId + ">" + resData.landMarkName + "</option>";
                    $(Country).appendTo('#landmarkId');
                });
            }
        },
        error: function(err) {
            console.error("Error in getlandmarkBasedOnlocalityId" + JSON.stringify(err));
        }
    });
}



/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-22
 * @Desc : InsertBaselocation
 */
function InsertBaselocation() {
    alert('countryId : ' + countryId);
    var locationId = $('#zoneId').val();
    var userId = 1;
    var roleId = 1;
    var moduleId = 1;
    var locationName = $('#baselocationNameId').val();
    var landMarkId = $('#landmarkId').val();
    obj_Insert = {
        locationId: locationId,
        countryId: countryId,
        stateId: stateId,
        districtId: districtId,
        mandalId: mandalId,
        cityId: cityId,
        localityId: localityId,
        userId: userId,
        roleId: roleId,
        moduleId: moduleId,
        locationName: locationName,
        landMarkId: landMarkId
    };

    var strUrl = Service.INSERT_BASE_LOCATION;
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
                showNotificationError("inserted Successfully", "addBaselocationId", "success");
                getBaselocationDetails();
            }
        },
        error: function() {
            console.log("Error In update_ZoneDetails");
        }
    });
}




/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-22
 * @Desc : getBaselocationDetails
 */
function getBaselocationDetails() {
    $('#driverTable').html("");
    var strUrl = Service.GET_BASE_LOCATION_DETAILS;
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
                    getBaselocationDetailsList(jsonArray);
                    loadDataTable();
                }
            }
        },
        error: function(err) {
            console.error('getZonedetails : ' + JSON.stringify(err));
        }
    });
}



/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-22
 * @Desc : getBaselocationDetailsList
 */


function getBaselocationDetailsList(strData) {

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
    $(objTHead2).html('Base location');
    $(objTr).append(objTHead2);

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Zone');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('Country');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('State');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('District');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('Mandal');
    $(objTr).append(objTHead7);

    var objTHead8 = document.createElement('th');
    $(objTHead8).html('City');
    $(objTr).append(objTHead8);

    var objTHead9 = document.createElement('th');
    $(objTHead9).html('Locality');
    $(objTr).append(objTHead9);

    var objTHead10 = document.createElement('th');
    $(objTHead10).html('Landmark');
    $(objTr).append(objTHead10);

    var objTHead11 = document.createElement('th');
    $(objTHead11).html('Edit Baselocation');
    $(objTr).append(objTHead11);

    var objTHead12 = document.createElement('th');
    $(objTHead12).html('Delete Baselocation');
    $(objTr).append(objTHead12);

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
        $(tblCol1).html(strData[i].baseLocationName);
        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');
        $(tblCol2).html(strData[i].locationName);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');
        $(tblCol3).html(strData[i].countryName);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].stateName);
        $(tbleRow).append(tblCol4);

        var tblCol5 = document.createElement('td');
        $(tblCol5).addClass('text-center');
        $(tblCol5).html(strData[i].districtName);
        $(tbleRow).append(tblCol5);

        var tblCol6 = document.createElement('td');
        $(tblCol6).addClass('text-center');
        $(tblCol6).html(strData[i].mandalName);
        $(tbleRow).append(tblCol6);

        var tblCol7 = document.createElement('td');
        $(tblCol7).addClass('text-center');
        $(tblCol7).html(strData[i].cityName);
        $(tbleRow).append(tblCol7);

        var tblCol8 = document.createElement('td');
        $(tblCol8).addClass('text-center');
        $(tblCol8).html(strData[i].localityName);
        $(tbleRow).append(tblCol8);

        var tblCol9 = document.createElement('td');
        $(tblCol9).addClass('text-center');
        $(tblCol9).html(strData[i].landMarkName);
        $(tbleRow).append(tblCol9);


        var tablcol11 = document.createElement("td");
        $(tablcol11).addClass('text-center');
        $(tablcol11).html('<div class="row"> <div class="col-sm-6"> <a href="#" data-toggle="modal"  data-toggle="tooltip"  data-placement="bottom" data-target="#update_Modal" title="Edit"><span class="glyphicon glyphicon-pencil" style="color:blue"></span></a> </div></div>');
//        $(tablcol11).attr('onclick', 'getBaselocationDetailsForupdate("' + strData[i].baseLocationName + '","' + strData[i].locationName + '","' + strData[i].countryName + '", "' + strData[i].stateName + '", "' + strData[i].districtName + '", "' + strData[i].mandalName + '", "' + strData[i].cityName + '", "' + strData[i].localityName + '", "' + strData[i].landMarkName + '")');
        $(tbleRow).append(tablcol11);

        var tablcol12 = document.createElement("td");
        $(tablcol12).addClass('text-center');
        $(tablcol12).html('<div class="row"> <div class="col-sm-6"> <a href="#" data-toggle="tooltip"  data-placement="bottom" title="Cancel" id="update_Modal1" onclick=deleteZone("' + strData[i].locationId + '")> <span class="glyphicon glyphicon-remove" style="color:red"></span> </a></div></div>');
        $(tbleRow).append(tablcol12);

        $(objTBody).append(tbleRow);
    }
    $("#driverTable").append(objDivTag);
}

function getBaselocationDetailsForupdate(baseLocationName, locationName, countryName, stateName, districtName, mandalName, cityName, localityName, landMarkName) {

    $('#baselocationNameId').val(baseLocationName);
    $('#zoneId').val(locationName);

}


/* 
 * @Author : Habiboon Patan
 * @Date : 2019-08-22
 * @Desc : loadDataTable
 */
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
                        title: 'Baselocation Details'
                    },
                    {
                        extend: 'pdf',
                        title: 'Baselocation Details'
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
 *@DESC : Notification purpose
 *@AuthorName : Habiboon Patan
 *@DATE : 2019-08-22
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