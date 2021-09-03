/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    try {

        getShiftmanagers();
        getTls();
        loadMappingDataofTLManger();

    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});



var token = localStorage.getItem('token');


function getShiftmanagers() {
    $('#shift_manager_id').empty();
    $('#up_shift_manager_id').empty();
    $('#search_shift_manager_id').empty();
    try {
        var strUrl = Service.GET_SHIFT_MANAGERS;
        console.log("GET_SHIFT_MANAGERS SERVICE URL ::::: ");
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token,
            },
            success: function(data) {
                var responsecode = data.responseCode;
                console.log("responsecode " + responsecode);
                if (200 !== responsecode || data.status === "NO_DATA_FOUND") {

                }
                else {
                    var jsonArray = data.getShiftMangersResponseControllerDTO;
                    var selectfirst = "<option value='0'>Select Shift Manager</option>";
                    $('#shift_manager_id').append(selectfirst);
                    $('#up_shift_manager_id').append(selectfirst);
                    $('#search_shift_manager_id').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var shift_manager = "<option value=" + resData.manager_id + ">" + resData.manager_name + "</option>";
                        $(shift_manager).appendTo('#shift_manager_id');
                        $(shift_manager).appendTo('#up_shift_manager_id');
                        $(shift_manager).appendTo('#search_shift_manager_id');
                    });
                }
            },
            error: function(err) {
                console.error('GET_SHIFT_MANAGERS error: ' + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error("error occur in GET_SHIFT_MANAGERS()" + JSON.stringify(err))
    }
    $('#shift_manager_id').trigger("chosen:updated");
    $('#up_shift_manager_id').trigger("chosen:updated");
    $('#search_shift_manager_id').trigger("chosen:updated");
    $('#shift_manager_id').chosen();
    $('#up_shift_manager_id').chosen();
    $('#search_shift_manager_id').chosen();
}



function getTls() {
    $('#tl_id').empty();
    $('#up_tl_id').empty();
    $('#search_tl_id').empty();
    try {
        var strUrl = Service.GET_TLS;
        console.log("GET_TLS SERVICE URL ::::: ");
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token,
            },
            success: function(data) {
                var responsecode = data.responseCode;
                console.log("responsecode " + responsecode);
                if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
                }
                else {
                    var jsonArray = data.getTlsControllerDTO;
                    var selectfirst = "<option value='0'>Select TL</option>";
                    $('#tl_id').append(selectfirst);
                    $('#up_tl_id').append(selectfirst);
                    $('#search_tl_id').append(selectfirst);

                    $.each(jsonArray, function(i, resData) {
                        var tl = "<option value=" + resData.tl_id + ">" + resData.tl_name + "</option>";
                        $(tl).appendTo('#tl_id');
                        $(tl).appendTo('#up_tl_id');
                        $(tl).appendTo('#search_tl_id');
                    });
                }
            },
            error: function(err) {
                console.error('GET_TLS error: ' + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error("error occur in GET_TLS()" + JSON.stringify(err))
    }
    $('#tl_id').trigger("chosen:updated");
    $('#up_tl_id').trigger("chosen:updated");
    $('#search_tl_id').trigger("chosen:updated");
    $('#tl_id').chosen();
    $('#up_tl_id').chosen();
    $('#search_tl_id').chosen();
}

function add() {
    var agent_id = $('#tl_id').val();
    for (var i = 0; i < agent_id.length; i++) {
        var tl_id = agent_id[i];
        mappingTLToShiftManger(tl_id);
    }
}


function mappingTLToShiftManger(tl_id) {

    var user_id = localStorage.getItem("userID");
    var module_id = localStorage.getItem("Quallity_moduleID");
    var shift_manager_id = $('#shift_manager_id').val();
    var st_date = $('#start_date_id').val();
   var start_date = moment(st_date).format("YYYY-MM-DD");

    var ed_date = $('#end_date_id').val();

   var end_date1 = moment(ed_date).format("YYYY-MM-DD");

          if(start_date==="Invalid date"||start_date==='Invalid date'||start_date=="Invalid date"||start_date=='Invalid date'){
          start_date="2021-07-15";
   }

     if(end_date1==="Invalid date"||end_date1==='Invalid date'||end_date1=="Invalid date"||end_date1=='Invalid date'){
          end_date1="2021-07-15";
   }

    var obj_Insert = {
        "shift_manager_id": shift_manager_id,
        "agent_id": tl_id,
        "start_date": start_date,
        "end_date": end_date1,
        "status": "TRUE",
        "createdby_id": user_id,
        "createdby_module_id": module_id
    };

    var strUrl = Service.MAPPING_TLS_TO_SHIF_MANAGER;
   console.log("MAPPING_TLS_TO_SHIF_MANAGER::::: " + JSON.stringify(obj_Insert));
   console.log("strUrl::::: " + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
            "Authorization": 'Bearer ' + token,
        },
        success: function(data) {
            if (data !== null || data !== 0) {
                loadMappingDataofTLManger();
//                $('#TLMappingShiftManage_id').modal('toggle');
                showNotificationError("Mapped Successfully", "submitBtn", "success");

               
            }
        },
        error: function() {
            console.log("Error In MAPPING_TLS_TO_SHIF_MANAGER");
        }
    });
}




function loadMappingDataofTLManger() {
    $('#driverTable').html("");
    try {
//        var module_id = $('#search_qa_moduleId').val();
        var shift_managerid = $('#search_shift_manager_id').val();
        var emp_id = $('#search_tl_id').val();
        if (shift_managerid === "undefined" || shift_managerid === 'undefined' || shift_managerid === undefined || shift_managerid === "0") {
            shift_managerid = 0;

        }
        if (emp_id === "undefined" || emp_id === 'undefined' || emp_id === undefined || emp_id === "0") {
            emp_id = 0;

        }

        var obj_Insert = {
            "shift_managerid": shift_managerid,
            "emp_id": emp_id
        };
        var strUrl = Service.GET_TL_MAP_WITH_MANAGER_DATA;
        console.log("GET_TL_MAP_WITH_MANAGER_DATA::::: " + strUrl);
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
                "Authorization": 'Bearer ' + token,
            },
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
                    var jsonArray = data.getTLmappingtomanagerDataResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        loadTlManagerMapData(jsonArray);
                        loadDataTable();
//                        $('#deleteid').show();
                    }
                }
            },
            error: function(err) {
                console.error('GET_TL_MAP_WITH_MANAGER_DATA error: ' + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error("error occur in GET_TL_MAP_WITH_MANAGER_DATA()" + JSON.stringify(err))
    }
}



function loadTlManagerMapData(strData) {

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



    var objTHead1 = document.createElement('th');
    $(objTHead1).html('S.No');
    $(objTr).append(objTHead1);

    var objTHead121 = document.createElement("th");
    $(objTHead121).html('<label class="check "><span style=" color: white"></span> <input type="checkbox" id="selectall" onclick="multipleCheckBox()">  <span class="checkmark"></span>');
    $(objTHead121).addClass("text-center");
    $(objTr).append(objTHead121);

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Shift Manager Name');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('TL Name');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Start Date');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('End Date');
    $(objTr).append(objTHead6);


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


        var tblCol = document.createElement('td');
        $(tblCol).addClass('text-center');
        $(tblCol).html(index);
        $(tbleRow).append(tblCol);

        var tablcol120 = document.createElement("td");
        //value=strData[i].permanentRegisteredNo,

        $(tablcol120).html('<label class="check "><input type="checkbox" id="myCheck12"  class="case"  value=' + strData[i].serialId + ' name="case"  )" ><span class="checkmark"> </label>');

//        $(tablcol120).html('<input type="checkbox" class="baselocation" id="ch_baseID" value=' + strData[i].section_id + ' name="section_name"  >');
        $(tbleRow).append(tablcol120);
        $(tablcol120).attr('onclick', 'onclickCheckbox()');
//        $('#selectall').val(strData[i].baselocationId);

        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].shift_manager_name);
        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');

        $(tblCol2).html(strData[i].employee_name);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');

        $(tblCol3).html(strData[i].startdate);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].enddate);
        $(tbleRow).append(tblCol4);

        var tablcol11 = document.createElement("td");
        var buttonTag = document.createElement('button');
        $(buttonTag).attr('type', 'button');
        $(buttonTag).html('Update');
        $(buttonTag).addClass('btn btn-primary btn-sm fa fa-edit');
        $(buttonTag).attr(
                'onclick',
                'get_RowData("' + strData[i].serialId + '","' + strData[i].shift_managerid + '", "' + strData[i].shift_manager_name + '","' + strData[i].emp_id + '","' + strData[i].employee_name + '", "' + strData[i].startdate + '", "' + strData[i].enddate + '")');

        $(tablcol11).append(buttonTag);
        $(tablcol11).css('height', '36px');
        $(tbleRow).append(tablcol11);

        var tablcol12 = document.createElement("td");
        var buttonTag = document.createElement('button');
        var text = document.createTextNode(" Delete");
//        buttonTag.appendChild(text);
//        $(buttonTag).addClass('btn btn-danger btn-sm fa fa-trash');
//        
        $(buttonTag).attr('type', 'button');
        $(buttonTag).html('Delete');
        $(buttonTag).addClass('btn btn-danger btn-sm fa fa-trash');


        $(buttonTag).attr('onclick', 'deleteAllTLS()');
        $(tablcol12).append(buttonTag);
        $(tablcol12).css('height', '36px');
        $(tbleRow).append(tablcol12);

        $(objTBody).append(tbleRow);
    }
    $("#driverTable").append(objDivTag);
}


var serial_id;
function get_RowData(serialId, shift_managerid, shift_manager_name, emp_id, employee_name, startdate, enddate) {
    $('#update').modal('show');
    $("#up_shift_manager_id  option:contains(" + shift_manager_name + ")").attr('selected', 'selected').trigger("chosen:updated");
    $("#up_tl_id  option:contains(" + employee_name + ")").attr('selected', 'selected').trigger("chosen:updated");
    $('#up_start_date_id').val(startdate);
    $('#up_end_date_id').val(enddate);
    serial_id = serialId;
}


function updateTLManagerData() {
    var serialId = serial_id;
    var shift_managerid = $('#up_shift_manager_id').val();
    var tl_id = $('#up_tl_id').val();
    var startdate = $('#up_start_date_id').val();
    var enddate = $('#up_end_date_id').val();

    var obj_Insert = {
        "serialId": serialId,
        "shift_managerid": shift_managerid,
        "emp_id": tl_id,
        "startdate": startdate,
        "enddate": enddate
    };
    var strUrl = Service.UPDATE_TL_MANAGER_MAP_DAta;
    console.log("UPDATE_TL_MANAGER_MAP_DAta::::: " + JSON.stringify(obj_Insert));
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
            "Authorization": 'Bearer ' + token,
        },
        success: function(data) {
            if (data !== null || data !== 0) {
//                showNotificationError("Section Updated Successfully", "update_section_id", "success");
//                resetUpdateSectionsInputs();
                loadMappingDataofTLManger();
                $('#update').modal('toggle');
            }
        },
        error: function() {
            console.log("Error In UPDATE_TL_MANAGER_MAP_DAta");
        }
    });
}

//single checkbox reading
function onclickCheckbox() {
    var arrSelectedData = [];
    var count = 0;
    $("input:checkbox[name=case]:checked").each(function() {
        console.log("myCheck12: " + $(this).attr("myCheck12") + " Value: " + $(this).val());
        console.log("myCheck12:---" + $(this).val());
        arrSelectedData.push($(this).val());
        count++;
        $('#reg_no').val(arrSelectedData);
    });
    if ($(".case").length === $(".case:checked").length) {
        $("#selectall").prop("checked", true);
    }
    else {
        $("#selectall").removeAttr("checked");
    }
    console.log("arrSelectedData: " + JSON.stringify(arrSelectedData));
}


function deleteAllTLS() {

    var selectedCheckboxvalue = $('#reg_no').val();
    if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
        showNotificationError("Select Section", "selectall", "error");
        return;
    }
    else if (selectedCheckboxvalue !== '' || selectedCheckboxvalue !== null) {
        $('#delete').modal('show');
    }

}

function resetData(){
    $('#shift_manager_id').val('0').trigger("chosen:updated");
    $('#search_tl_id').val('0');



}
function multipleCheckBox() {
    $('#reg_no').val('');
    $("#selectall").change(function(event) {
        $('.case').attr('checked', this.checked);
        if ($(this).is(":checked")) {
            $('#reg_no').val('');
            $('.case').prop("checked", true);
          

            event.preventDefault();
            var searchIDs = $(".case:checkbox:checked").map(function() {
                console.log("selected VEHICLE====" + searchIDs)
                return $(this).val();
            }).get();
            $('#reg_no').val(searchIDs);
        }
    });
}


function deleteTLS() {
    var serial_id = $('#reg_no').val();
    var obj_Insert = {
        "manager_tl_serial_id": serial_id
    };
    var strUrl = Service.DELETE_TL_FROM_MANAGER;
    console.log("DELETE_TL_FROM_MANAGER::::: " + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-TENANT-ID": "PROCREATE",
//                'Access-Control-Allow-Origin': '*',
//                'Authorization': 'Bearer ' + token
            "Authorization": 'Bearer ' + token,
        },
        success: function(data) {
            if (data !== null || data !== 0) {
//                showNotificationError("Section Deleted Successfully", "deleteid", "success");
                $('#delete').modal('toggle');
                loadMappingDataofTLManger();
            }
        },
        error: function() {
            console.log("Error In DELETE_SECTIONS");
        }
    });
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
                        title: 'Sections'
                    },
                    {
                        extend: 'pdf',
                        title: 'Sections'
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



function logout(){
	
	localStorage.clear();	
	var user_id=localStorage.getItem("userID");
	var module_id=localStorage.getItem("moduleid");
	var role_id=localStorage.getItem("roleid");
	var token_id=localStorage.getItem("token");	
	console.log("userid====>"+user_id);
	console.log("module_id====>"+module_id);
	console.log("role_id====>"+role_id);
	if(module_id===null&&user_id===null&&role_id===null&&token_id===null){
		window.location.href = Service.redirectToLoginPage;
	}
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
