


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function() {
    try {
        getShiftmanagers();
        getAgents();
        loadMappingDataofAgentTL();      
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});


var token = localStorage.getItem('token');
function getShiftmanagers() {
//    alert("kdjfhjkdhfj0");
    $('#shift_manager_id').empty();
    $('#up_shift_manager_id').empty();
    $('#map_shift_manager_id').empty();
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
                    $('#map_shift_manager_id').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var shift_manager = "<option value=" + resData.manager_id + ">" + resData.manager_name + "</option>";
                        $(shift_manager).appendTo('#shift_manager_id');
                        $(shift_manager).appendTo('#up_shift_manager_id');
                        $(shift_manager).appendTo('#map_shift_manager_id');
//                        alert(shift_manager);
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
    $('#map_shift_manager_id').trigger("chosen:updated");
    $('#shift_manager_id').chosen();
    $('#up_shift_manager_id').chosen();
    $('#map_shift_manager_id').chosen();
}



$('#shift_manager_id').on('change', function() {
    var shift_manager_id = $('#shift_manager_id').val();
    $('#tl_id').empty();
    gettlsbasedonmanagerID(shift_manager_id, 'tl_id');
});
$('#up_shift_manager_id').on('change', function() {
    var shift_manager_id = $('#up_shift_manager_id').val();
    $('#up_tl_id').empty();
    gettlsbasedonmanagerID(shift_manager_id, 'up_tl_id');
});
$('#map_shift_manager_id').on('change', function() {
    var shift_manager_id = $('#map_shift_manager_id').val();
    $('#map_tl_id').empty();
    gettlsbasedonmanagerID(shift_manager_id, 'map_tl_id');
});


function gettlsbasedonmanagerID(shift_manager_id, map_tl_id) {

    try {
        var id = '#' + map_tl_id;
        $(id).empty();
        var strUrl = Service.TLS_BASED_ON_MANAGER_ID;
        console.log("TLS_BASED_ON_MANAGER_ID:::::: " + strUrl);
        var obj_Insert = {
            shift_manager_id: shift_manager_id
        };
        console.log("TLS_BASED_ON_MANAGER_ID:::::: " + JSON.stringify(obj_Insert));
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
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.getTlsBasedonShiftmangeridControllerDTO;
                    var selectfirst = "<option value='0'>Select TL</option>";
                    $(id).append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var sectionData = "<option value=" + resData.tl_id + ">" + resData.tl_name + "</option>";
                        $(sectionData).appendTo(id);
                    });
                }
            },
            error: function(err) {
                console.error("Error in TLS_BASED_ON_MANAGER_ID" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in TLS_BASED_ON_MANAGER_ID()' + err);
    }
    $(id).trigger("chosen:updated");
    $(id).chosen();
}




function getAgents() {
    $('#agent_id').empty();
    $('#up_agent_id').empty();
    try {
        var strUrl = Service.AGENTS;
        console.log("AGENTS SERVICE URL ::::: ");
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
                    var jsonArray = data.getAgentResponseControllerDTO;
                    var selectfirst = "<option value='0'>Select Agent</option>";
                    $('#agent_id').append(selectfirst);
                    $('#up_agent_id').append(selectfirst);
                    $.each(jsonArray, function(i, resData) {
                        var shift_manager = "<option value=" + resData.agent_id + ">" + resData.agent_name + "</option>";
                        $(shift_manager).appendTo('#agent_id');
                        $(shift_manager).appendTo('#up_agent_id');
                    });
                }
            },
            error: function(err) {
                console.error('AGENTS error: ' + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error("error occur in AGENTS()" + JSON.stringify(err))
    }
    $('#agent_id').trigger("chosen:updated");
    $('#up_agent_id').trigger("chosen:updated");
    $('#agent_id').chosen();
    $('#up_agent_id').chosen();
}

function addtlagentMap() {
    var agent_id = $('#agent_id').val();
//    alert("agent_id:   " + agent_id);
    for (var i = 0; i < agent_id.length; i++) {
//        alert("agent_id: " + agent_id[i]);
//        var agentid = agent_id[i];
        mappingAgentToTL(agent_id[i]);
    }
}

function mappingAgentToTL(agentid) {
    var user_id = localStorage.getItem("userID");
    var module_id = localStorage.getItem("moduleid");
    var tl_id = $('#tl_id').val();
    var st_date = $('#map_start_date_id').val();

    var start_date = moment(st_date).format("YYYY-MM-DD");

    var ed_date = $('#map_end_date_id').val();
    var end_date = moment(ed_date).format("YYYY-MM-DD");

if(start_date=="Invalid date"||start_date=='Invalid date'){

start_date="2021-07-14"
}
if(end_date=="Invalid date"||end_date=='Invalid date'||end_date==="Invalid date"||end_date==='Invalid date'){
end_date="2021-07-14"
}
    var obj_Insert = {
        "shift_manager_id": tl_id,
        "agent_id": agentid,
        "start_date": start_date,
        "end_date": end_date,
        "status": "FALSE",
        "createdby_id": user_id,
        "createdby_module_id": module_id
    };

    var strUrl = Service.MAPPING_TLS_TO_SHIF_MANAGER;
    console.log("MAPPING_TLS_TO_SHIF_MANAGER::::: " + JSON.stringify(obj_Insert));

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
//            alert("data:   " + data);
            if (data !== null || data !== 0) {
                loadMappingDataofAgentTL();

                $('#agent').modal('toggle');
            }
        },
        error: function() {
            console.log("Error In MAPPING_TLS_TO_SHIF_MANAGER");
        }
    });
}




function loadMappingDataofAgentTL() {
    $('#driverTable').html("");
    try {
//        var module_id = $('#search_qa_moduleId').val();
        var tl_id = $('#map_shift_manager_id').val();
        var agent_id = $('#map_tl_id').val();
//        alert(tl_id);
//        alert(agent_id);

        if (tl_id === "undefined" || tl_id === 'undefined' || tl_id === undefined || tl_id === "0") {
            tl_id = null;
//            alert(tl_id);
        }
        if (agent_id === "undefined" || agent_id === 'undefined' || agent_id === undefined || agent_id === "0") {
            agent_id = null;
//            alert(agent_id);
        }

        var obj_Insert = {
            tl_id: tl_id,
            agent_id: agent_id
        };
        var strUrl = Service.GET_AGENT_MAP_WITH_TL_DATA;
        console.log("GET_AGENT_MAP_WITH_TL_DATA::::: " + strUrl);
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
                    $('#delete_agent').hide();
                }
                else {
                    var jsonArray = data.getAgentmappingtoTLDataResponseControllerDTO;
                    if (jsonArray.length > 0) {
                        loadAgentTlMappingData(jsonArray);
                        loadDataTable();
//                        
                    }
                }
            },
            error: function(err) {
                console.error('GET_AGENT_MAP_WITH_TL_DATA error: ' + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error("error occur in GET_AGENT_MAP_WITH_TL_DATA()" + JSON.stringify(err))
    }
}



function loadAgentTlMappingData(strData) {

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

    var objTHead31 = document.createElement('th');
    $(objTHead31).html('Manager Name');
    $(objTr).append(objTHead31);

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('TL Name');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('Agent Name');
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


        var tblCol133 = document.createElement('td');
        $(tblCol133).addClass('text-center');
        $(tblCol133).html(strData[i].manager_name);

        $(tbleRow).append(tblCol133);

        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].tl_name);

        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');

        $(tblCol2).html(strData[i].agent_name);
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
                'get_RowData("' + strData[i].serialId + '","' + strData[i].managerId + '","' + strData[i].tl_id + '", "' + strData[i].tl_name + '","' + strData[i].agent_id + '","' + strData[i].agent_name + '", "' + strData[i].startdate + '", "' + strData[i].enddate + '")');

        $(tablcol11).append(buttonTag);
        $(tablcol11).css('height', '36px');
        $(tbleRow).append(tablcol11);

        var tablcol12 = document.createElement("td");
        var buttonTag = document.createElement('button');
        $(buttonTag).attr('type', 'button');
        $(buttonTag).html('Delete');
        $(buttonTag).addClass('btn btn-danger btn-sm fa fa-trash');
        $(buttonTag).attr('onclick', 'deleteallAgents()');
        $(tablcol12).append(buttonTag);
        $(tablcol12).css('height', '36px');
        $(tbleRow).append(tablcol12);


        $(objTBody).append(tbleRow);
    }
    $("#driverTable").append(objDivTag);
}


var serial_id;
function get_RowData(serialId, managerId, tl_id, tl_name, agent_id, agent_name, startdate, enddate) {
    $('#update').modal('show');
    $("#up_tl_id  option:contains(" + tl_name + ")").attr('selected', 'selected').trigger("chosen:updated");

    gettlsbasedonmanagerID(managerId, 'up_tl_id');
    $("#up_agent_id  option:contains(" + agent_name + ")").attr('selected', 'selected').trigger("chosen:updated");
    $('#up_start_date_id').val(startdate);
    $('#up_end_date_id').val(enddate);
    serial_id = serialId;

}


function updateAgentTLData() {

    var serialId = serial_id;
    var tl_id = $('#up_tl_id').val();
    var agent_id = $('#up_agent_id').val();
    var start_date = $('#up_start_date_id').val();
    var startdate = moment(start_date).format("YYYY-MM-DD");
    var end_date = $('#up_end_date_id').val();
    var enddate = moment(end_date).format("YYYY-MM-DD");
if(startdate=="Invalid date"||startdate=='Invalid date'){

startdate="2021-07-14"
}
if(enddate=="Invalid date"||enddate=='Invalid date'||enddate==="Invalid date"||enddate==='Invalid date'){
enddate="2021-07-14"
}

    var obj_Insert = {
        "serialId": serialId,
        "tl_id": tl_id,
        "agent_id": agent_id,
        "startdate": startdate,
        "enddate": enddate
    };

    var strUrl = Service.UPDATE_AGENT_TL_DATA;
    console.log("UPDATE_AGENT_TL_DATA::::: " + JSON.stringify(obj_Insert));
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
                loadMappingDataofAgentTL();
                $('#update').modal('toggle');
            }
        },
        error: function() {
            console.log("Error In UPDATE_AGENT_TL_DATA");
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


function deleteallAgents() {

    var selectedCheckboxvalue = $('#reg_no').val();
    if (selectedCheckboxvalue === '' || selectedCheckboxvalue === null) {
        showNotificationError("Select Section", "selectall", "error");
        return;
    }
    else if (selectedCheckboxvalue !== '' || selectedCheckboxvalue !== null) {
        $('#delete').modal('show');
    }

}


function multipleCheckBox() {
    $('#reg_no').val('');
    $("#selectall").change(function(event) {
        $('.case').attr('checked', this.checked);
        if ($(this).is(":checked")) {
            $('#reg_no').val('');
            $('.case').prop("checked", true);
            alert("case " + $('.case').prop("checked", true));

            event.preventDefault();
            var searchIDs = $(".case:checkbox:checked").map(function() {
//                console.log("selected VEHICLE====" + searchIDs)
                return $(this).val();
            }).get();
            $('#reg_no').val(searchIDs);
        }
    });
}


function deleteAgent() {
    var serialid = $('#reg_no').val();
    var obj_Insert = {
        "tl_agent_serial_id": serialid
    };
    var strUrl = Service.DELETE_AGENT_FROM_TL;
    console.log("DELETE_AGENT_FROM_TL::::: " + strUrl);
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
                loadMappingDataofAgentTL();
//                SectionsBasedOnModule();
            }
        },
        error: function() {
            console.log("Error In DELETE_AGENT_FROM_TL");
        }
    });
}
function resetAllData(){
    $('#map_shift_manager_id').val('0').trigger("chosen:updated");

    $('#map_tl_id').val('0').trigger("chosen:updated");


}
function resetAllSaveData(){
    $('#shift_manager_id').val('0').trigger("chosen:updated");

    $('#tl_id').val('0').trigger("chosen:updated");
    $('#agent_id').val('0').trigger("chosen:updated");



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

	


