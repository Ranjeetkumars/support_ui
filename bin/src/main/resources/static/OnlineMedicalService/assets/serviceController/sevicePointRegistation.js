/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    try {
        getDistrictBasedonStateId('reg_districtId');
        getServicePointRegistationDetails();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});
/*@DESC : getDistrictBasedonStateId
 *@AuthorName : priyadarshini
 *@DATE : 2020-01-10
 */
function getDistrictBasedonStateId(districtId) {
    var id = '#' + districtId;
    $(id).empty();
    try {
        var strUrl = Service.getDistrictDropDown;
        console.log("getDistrictBasedonStateId::::: " + strUrl);
        var obj_Insert = {
            stateId: "1"
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

                var responseCode = data.responseCode;
                if (200 !== responseCode) {

                } else {
                    var jsonArray = data.objGetGisDataControllerDTO;
                    var selectfirst = "<option value='0'>Select District</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var District = "<option value=" + resData.districtId + ">" + resData.districtName + "</option>";
                        $(District).appendTo(id);
                    });
                }
            },
            error: function (err) {
                console.error("Error in getDistrictBasedonStateId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getDistrictBasedonStateId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}
/* 
 /*@DESC : onchange method for loading manadal based on district id
 *@AuthorName : priyadarshini
 *@DATE : 2020-01-10
 */
$('#reg_districtId').on('change', function () {
    var districtId = $('#reg_districtId').val();
    $('#reg_mandalId').empty();
    getMandalBasedonDistrictId(districtId, 'reg_mandalId');
});
/*@DESC : getMandalBasedonDistrictId
 *@AuthorName : priyadarshini
 *@DATE : 2020-01-10
 */
function getMandalBasedonDistrictId(districtId, mandalId) {
    var id = '#' + mandalId;
    $(id).empty();
    try {
        var strUrl = Service.getMandalDropDown;
        console.log("getMandalBasedonDistrictId::::: " + strUrl);
        var obj_Insert = {
            "districtId": districtId
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

                var responseCode = data.responseCode;
                if (200 !== responseCode) {

                } else {
                    var jsonArray = data.objGetGisDataControllerDTO;
                    var selectfirst = "<option value='0'>Select Mandal</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var District = "<option value=" + resData.mandalId + ">" + resData.mandalName + "</option>";
                        $(District).appendTo(id);
                    });
                }
            },
            error: function (err) {
                console.error("Error in getMandalBasedonDistrictId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getMandalBasedonDistrictId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}
/* 
 /*@DESC : onchange method for loading city based on mandal id
 *@AuthorName : priyadarshini
 *@DATE : 2020-01-10
 */
$('#reg_mandalId').on('change', function () {
    var mandal = $('#reg_mandalId').val();
    $('#reg_cityId').empty();
    getCityBasedonMandalId(mandal, 'reg_cityId');
});
/*@DESC : getCityBasedonMandalId
 *@AuthorName : priyadarshini
 *@DATE : 2020-01-10
 */
function getCityBasedonMandalId(mandal, cityId) {
    var id = '#' + cityId;
    $(id).empty();
    try {
        var strUrl = Service.getCityDropDown;
        console.log("getCityBasedonMandalId::::: " + strUrl);
        var obj_Insert = {
            mandalId: mandal
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

                var responseCode = data.responseCode;
                if (200 !== responseCode) {

                } else {
                    var jsonArray = data.objGetGisDataControllerDTO;
                    var selectfirst = "<option value='0'>Select City/Village</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function (i, resData) {
                        var city = "<option value=" + resData.cityId + ">" + resData.cityName + "</option>";
                        $(city).appendTo(id);
                    });
                }
            },
            error: function (err) {
                console.error("Error in getCityBasedonMandalId" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in getCityBasedonMandalId()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}
/*@DESC : saveServicePointDetails
 *@AuthorName : priyadarshini
 *@DATE : 2020-01-10
 */
function saveServicePointDetails() {

    var district = $('#reg_districtId').val();
    var servicePoint = $('#reg_servicePointId').val();
    var mandal = $('#reg_mandalId').val();
    var Latitude = $('#reg_LatitudeId').val();
    var city = $('#reg_cityId').val();
    var longitide = $('#reg_longitideId').val();

    
    var re = /^[-+]?[0-9]+\.[0-9]+$/;
    var regx = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    var regx2 =/^[a-z]/gi;
    
    if (district === "0") {
        showNotificationError("Select District", "reg_districtId", "error");
        return;
    }
    else if (mandal === "0") {
        showNotificationError("Select Mandal", "reg_mandalId", "error");
        return;
    }
    else if (city === "0") {
        showNotificationError("Select city", "reg_cityId", "error");
        return;
    } else if (servicePoint === '' || servicePoint === null) {
        showNotificationError("Enter servicePoint name", "reg_servicePointId", "error");
        return;
    }
   
     else if (!servicePoint.match( regx )) {
         if(servicePoint.match(regx2 )){
             alert("validname");
             
         }
         else{
        showNotificationError("please enter valid servicePoint name", "reg_servicePointId", "error");
        return;
    }
    }
    else if (Latitude === '' || Latitude === null) {
        showNotificationError("Enter Latitude", "reg_LatitudeId", "error");
        return;
    }
    
 else if (!Latitude.match( re )) {
        showNotificationError("please enter valid Latitude", "reg_LatitudeId", "error");
        
        return;
        
    }
    else if (longitide === '' || longitide === null) {
        showNotificationError("Enter Longitude", "reg_longitideId", "error");
        return;
    }
    else if (!longitide.match( re )) {
        showNotificationError("please enter valid Longitude", "reg_longitideId", "error");
        return;
    }
    var objJson = {
        "conditionId": 1,
        "serialId": 1,
        "servicepointName": servicePoint,
        "districtId": district,
        "cityId": city,
        "mandalId": mandal,
        "latitude": Latitude,
        "longitude": longitide,
        "createdbyId": "1",
        "createdbymodId": "1",
        "createdbyroleId": "1"

    };
    var strUrl = Service.saveServicePointDetails;
    console.log("saveServicePointDetails details Url is:" + strUrl);
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
                showNotificationError("not Inserted ", "servicePointDetailsId", "error");
            } else {

                showNotificationError("Inserted Successfully", "servicePointDetailsId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        }, error: function () {

            console.log('In Error of  saveServicePointDetails');
        }
    });
}
/*
 * For getServicePointRegistationDetails.
 * priyadarshini
 * 30-11-2019
 * inputs :no
 */
function getServicePointRegistationDetails() {
    $('#servicepointDataTable').empty();
    try {
        var strUrl = Service.getServicePointRegistationDetails;
        console.log("strUrl : " + strUrl);
        $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
            async: false,
            crossDomain: false,
            success: function (data) {
                console.log("data : " + data);
                var responseCode = data.responseCode;
                $('#servicepointDataTable').empty();
                if (200 !== responseCode || data.status === "NO_DATA_FOUND") {
                    var divTag = document.createElement("h2");
                    $(divTag).css("text-align", "center");
                    $(divTag).html("No data available....");
                    $('#servicepointDataTable').append(divTag);

                } else {
                    var jsonArray = data.objGetServicePointRegistrationDetailsControllerDTO;
                    if (jsonArray.length > 0) {
                        servicePointRegistation_DOM(jsonArray);
                        loadDataTable();
                    }
                }
            },
            error: function (err) {
                console.error('getServicePointRegistationDetails error: ' + JSON.stringify(err));
            }
        });
    }
    catch (err) {
        console.error("error occur in search()" + JSON.stringify(err));
    }
}
/*
 * For data table loading.
 * priyadarshini
 * 30-11-2019
 * 
 */
function servicePointRegistation_DOM(strData) {
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

//For table Heading1
        var objTHead1 = document.createElement("th");
        $(objTHead1).html('S.NO');
        $(objTr).append(objTHead1);

//For table Heading2
        var objTHead2 = document.createElement('th');
        $(objTHead2).html('District');
        $(objTr).append(objTHead2);


//For table Heading3
        var objTHead3 = document.createElement('th');
        $(objTHead3).html('Mandal');
        $(objTr).append(objTHead3);
//For table Heading4
        var objTHead4 = document.createElement('th');
        $(objTHead4).html('City/Village');
        $(objTr).append(objTHead4);
//For table Heading5
        var objTHead5 = document.createElement('th');
        $(objTHead5).html('Service Point Name');
        $(objTr).append(objTHead5);

        //For table Heading6
        var objTHead6 = document.createElement('th');
        $(objTHead6).html('Latitude');
        $(objTr).append(objTHead6);

        //For table Heading7
        var objTHead7 = document.createElement('th');
        $(objTHead7).html('Longitude');
        $(objTr).append(objTHead7);

        //For table Heading8
        var objTHead8 = document.createElement('th');
        $(objTHead8).html('Update');
        $(objTr).append(objTHead8);

        //For table Heading9
        var objTHead9 = document.createElement('th');
        $(objTHead9).html('Delete');
        $(objTr).append(objTHead9);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);

        // Table Data Appending Here

        for (var i = 0; i < strData.length; i++) {

            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");

            $(tablcol1).addClass('text-center');
            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            $(tablcol2).addClass('text-center');
            $(tablcol2).html(strData[i].districtName);
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            $(tablcol3).addClass('text-center');
            $(tablcol3).html(strData[i].mandalName);
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            $(tablcol4).addClass('text-center');
            $(tablcol4).html(strData[i].cityName);
            $(tbleRow).append(tablcol4);


            var tablcol5 = document.createElement("td");
            $(tablcol5).addClass('text-center');
            $(tablcol5).html(strData[i].servicepointName);
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            $(tablcol6).addClass('text-center');
            $(tablcol6).html(strData[i].latitude);
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            $(tablcol7).addClass('text-center');
            $(tablcol7).html(strData[i].longitude);
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            $(tablcol8).addClass('text-center');
            $(tablcol8).append('<a href="#"><i  class="fa fa-edit" data-toggle="modal" data-target="#updateId"></i><i></a> ');
            $(tablcol8).attr('onclick', 'get_RowData("' + strData[i].servicepointName + '","' + strData[i].servicepointId + '","' + strData[i].districtId + '","' + strData[i].districtName + '","' + strData[i].cityId + '","' + strData[i].cityName + '","' + strData[i].mandalId + '","' + strData[i].mandalName + '","' + strData[i].latitude + '","' + strData[i].longitude + '")');


            var tablcol9 = document.createElement("td");
            $(tablcol9).addClass('text-center');
            $(tablcol9).append('<a href="#"><i class="fa fa-trash"></i><i></a> ');
            $(tablcol9).attr('onclick', 'deleteServicePointRegistationData("' + strData[i].servicepointId + '")');
            $(tablcol9).css('height', '5px');
            $(tbleRow).append(tablcol8);
            $(tbleRow).append(tablcol9);
            $(objTBody).append(tbleRow);
        }
        $("#servicepointDataTable").append(objDivTag);

    } catch (err) {
        console.log("servicepointDataTable" + err);
    }
}
var serialId;
function get_RowData(servicepointName, servicepointId, districtId, districtName, cityId, cityName, mandalId, mandalName, latitude, longitude) {
    getDistrictBasedonStateId('up_districtId');
    $("#up_districtId option:contains(" + districtName + ")").attr('selected', 'selected').trigger("chosen:updated");
    getMandalBasedonDistrictId(districtId, 'up_mandalId');
    $("#up_mandalId option:contains(" + mandalName + ")").attr('selected', 'selected').trigger("chosen:updated");
    getCityBasedonMandalId(mandalId, 'up_cityId');
    $("#up_cityId option:contains(" + cityName + ")").attr('selected', 'selected').trigger("chosen:updated");
    $('#up_servicePointNameId').val(servicepointName);
    $('#up_latitudeId').val(latitude);
    $('#up_longitudeId').val(longitude);
    serialId = servicepointId;

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
 * For function deleteServicePointRegistationData
 * priyadarshini
 * 10-01-2020
 */
function deleteServicePointRegistationData() {
    var selectedCheckboxvalue = $('#reg_no').val();
    console.log("delete vehiclList====" + selectedCheckboxvalue)
    var objJson = {
        "permanentRegisteredNo": selectedCheckboxvalue,
    };
    var strUrl = Service.deleteServicePointRegistationData;
    console.log("deleteServicePointRegistationData Url is:" + strUrl);
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
/*
 * For function resetServicePointRegistationDetails
 * priyadarshini
 * 10-01-2020
 */
function resetServicePointRegistationDetails() {
    $('#reg_longitideId').val('');
    $('#reg_LatitudeId').val('');
    $('#reg_servicePointId').val('');
    $('#reg_cityId').val('0').trigger('chosen:updated');
    $('#reg_mandalId').val('0').trigger('chosen:updated');
    $('#reg_districtId').val('0').trigger('chosen:updated');
    $('#up_servicePointNameId').val('');
    $('#up_latitudeId').val('');
    $('#up_longitudeId').val('');
    $('#up_districtId').val('0').trigger('chosen:updated');
    $('#up_mandalId').val('0').trigger('chosen:updated');
    $('#up_cityId').val('0').trigger('chosen:updated');
}/*
 * For function updateServicePointRegistation
 * priyadarshini
 * 10-01-2020
 */

function updateServicePointRegistation() {
    var up_district = $('#up_districtId').val();
    var up_mandal = $('#up_mandalId').val();
    var up_city = $('#up_cityId').val();
    var up_servicePointName = $('#up_servicePointNameId').val();
    var up_latitude = $('#up_latitudeId').val();
    var up_longitude = $('#up_longitudeId').val();
    var re = /^[-+]?[0-9]+\.[0-9]+$/;
    var regx = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    var regx2 =/^[a-z]/gi;
    if (up_district === "0") {
        showNotificationError("Select District", "up_districtId", "error");
        return;
    }
    else if (up_mandal === "0") {
        showNotificationError("Select Mandal", "up_mandalId", "error");
        return;
    }
    else if (up_city === "0") {
        showNotificationError("Select city", "up_cityId", "error");
        return;
    }
      else if (up_servicePointName === '' || up_servicePointName === null) {
        showNotificationError("Enter servicePoint", "up_servicePointNameId", "error");
        return;
    }
    else if (!up_servicePointName.match( regx )) {
         if(up_servicePointName.match(regx2 )){
             alert("validname");
             
         }
         else{
        showNotificationError("please enter valid servicePoint name", "up_servicePointNameId", "error");
        return;
    }
    }
  
    else if (up_latitude === '' || up_latitude === null) {
        showNotificationError("Enter Latitude", "up_latitudeId", "error");
        return;
    }
    else if (!up_latitude.match( re )) {
        showNotificationError("please enter valid Latitude", "up_latitudeId", "error");
        
        return;
        
    }

    else if (up_longitude === '' || up_longitude === null) {
        showNotificationError("Enter longitide", "up_longitudeId", "error");
        return;
    }
    
     else if (!up_longitude.match( re )) {
        showNotificationError("please enter valid Longitude", "up_longitudeId", "error");
        return;
    }

    var objJson = {
        "conditionId": 2,
        "serialId": serialId,
        "servicepointName": up_servicePointName,
        "districtId": up_district,
        "cityId": up_city,
        "mandalId": up_mandal,
        "latitude": up_latitude,
        "longitude": up_longitude,
        "createdbyId": "1",
        "createdbymodId": "1",
        "createdbyroleId": "1"

    };
    var strUrl = Service.saveServicePointDetails;
    console.log("updateServicePointRegistation details Url is:" + strUrl);
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
                showNotificationError("not Inserted ", "update_id", "error");
            } else {

                showNotificationError("updated Successfully", "update_id", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        }, error: function () {

            console.log('In Error of  updateServicePointRegistation');
        }
    });
}
var serialId;
function deleteServicePointRegistationData(servicepointId) {
    serialId = servicepointId;
    $('#myModal12').modal('show');

}
/*
 * For function deleteServicePointRegistationData1
 * priyadarshini
 * 10-01-2020
 */
function deleteServicePointRegistationData1() {
    var objJson = {"serialId": serialId

    };
    var strUrl = Service.deleteServicePointRegistationData;
    console.log("deleteServicePointRegistationData1 details Url is:" + strUrl);
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
                showNotificationError("not deleted ", "servicePointDeleteId", "error");
            } else {

                showNotificationError("Deleted Successfully", "servicePointDeleteId", "success");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        }, error: function () {

            console.log('In Error of  deleteServicePointRegistationData1');
        }
    });
}

$("#reg_servicePointId").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});
function isValid(str) {
    return !/[~`!#$%\^&*()+=\-\[\]\\';,{}|\\":<>\?]/g.test(str);
    
}
$('#reg_LatitudeId').on( "keypress",function (e) {
        var keypress = e.keyCode || e.which || e.charCode; 
        var key = String.fromCharCode(keypress);
        var regEx = /^[-|+]?[0-9]{0,2}(.[0-9]{0,6})?$/;
        var txt = $(this).val() + key;
        if (!regEx.test(txt)) {
      $('#reg_LatitudeId').css({"border-color":"red"});
            if(keypress != 8){
                e.preventDefault();
            }else{
            }
            
        }else{
 
        }
    });

$('#reg_longitideId').on( "keypress",function (e) {
        var keypress = e.keyCode || e.which || e.charCode; 
        var key = String.fromCharCode(keypress);
        var regEx = /^[-|+]?[0-9]{0,2}(.[0-9]{0,6})?$/;
        var txt = $(this).val() + key;
        if (!regEx.test(txt)) {
        $('#reg_longitideId').css({"border-color":"red"});
           //$('#reg_longitideId').focus(); 
            if(keypress != 8){
                
                e.preventDefault();
            }else{
            }
        }else{

        }
    });

$('#up_latitudeId').on( "keypress",function (e) {
        var keypress = e.keyCode || e.which || e.charCode; 
        var key = String.fromCharCode(keypress);
        var regEx = /^[-|+]?[0-9]{0,2}(.[0-9]{0,6})?$/;
        var txt = $(this).val() + key;
        if (!regEx.test(txt)) {
        $('#up_latitudeId').css({"border-color":"red"});
           //$('#reg_longitideId').focus(); 
            if(keypress != 8){
                
                e.preventDefault();
            }else{
            }
        }else{

        }
    });
$('#up_longitudeId').on( "keypress",function (e) {
        var keypress = e.keyCode || e.which || e.charCode; 
        var key = String.fromCharCode(keypress);
        var regEx = /^[-|+]?[0-9]{0,2}(.[0-9]{0,6})?$/;
        var txt = $(this).val() + key;
        if (!regEx.test(txt)) {
        $('#up_longitudeId').css({"border-color":"red"});
           //$('#reg_longitideId').focus(); 
            if(keypress != 8){
                
                e.preventDefault();
            }else{
            }
        }else{

        }
    });


/*
 * For showing sweet alert{
 * priyadarshini
 * 10-01-2020
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

    
 