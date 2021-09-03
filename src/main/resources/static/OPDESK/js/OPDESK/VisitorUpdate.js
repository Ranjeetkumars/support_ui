/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function() {
    try {
     	checkLoggedOrNot();
        getListOfDistrict();
    }
    catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
});



function getListOfDistrict() {
    loadingDistrictsMaster();
    $.each(district, function(i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#visitor_districtID');
    });
    $('#visitor_districtID').trigger("chosen:updated");
    $("#visitor_districtID").chosen();
}
;

function getListOfDistrict_reg() {
    loadingDistrictsMaster();
    $.each(district, function(i, resData) {
        var districts = "<option value=" + resData.districtID + ">" + resData.districtName + "</option>";
        $(districts).appendTo('#visitor_reg_districtID');
    });
    $('#visitor_reg_districtID').trigger("chosen:updated");
    $("#visitor_reg_districtID").chosen();
}
;

$('#visitor_districtID').on('change', function() {
    var districtId = $('#visitor_districtID').val();
    $('#visitor_basLocID').empty();
    baseLocation_search(districtId)
});

//on change for registation 
$('#visitor_districtID').on('change', function() {
    var listOfDistrict = $('#visitor_districtID').val();
    $('#visitor_districtID').empty();
    baseLocation_search(listOfDistrict);
});

$('#visitor_reg_districtID').on('change', function() {
    var districtId = $('#visitor_reg_districtID').val();
    $('#visitor_reg_baseLocID').empty();
    baseLocation_reg(districtId);
});


function baseLocation_search(listOfDistrict) {
	$('#visitor_basLocID').empty();
    // here calling masterdata ajax call
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select District</option>";
    $('#visitor_basLocID').append(selectfirst);
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#visitor_basLocID');
    });

    $('#visitor_basLocID').trigger("chosen:updated");
    $("#visitor_basLocID").chosen();
}
;


function baseLocation_reg(listOfDistrict) {
	$('#visitor_reg_baseLocID').empty();
    // here calling masterdata ajax call
    loadingBaseLocationMaster(listOfDistrict);
    var selectfirst = "<option value='0'>Select District</option>";
    $('#visitor_reg_baseLocID').append(selectfirst);
    $.each(baselocations, function(i, resData) {
        var baselocation = "<option value=" + resData.baselocationID + ">" + resData.baselocationName + "</option>";
        $(baselocation).appendTo('#visitor_reg_baseLocID');
    });

    $('#visitor_reg_baseLocID').trigger("chosen:updated");
    $("#visitor_reg_baseLocID").chosen();
}
;

$('#visitor_basLocID').on('change', function() {
    var baseLocation = $('#visitor_basLocID').val();
    $('#visitor_ambulanceID').empty();
    getAmbulance(baseLocation);
});

$('#visitor_reg_baseLocID').on('change', function() {
    var baseLocation = $('#visitor_reg_baseLocID').val();
    $('#visitor_reg_ambulanceID').empty();
    getAmbulanceForReg(baseLocation);
});

/*
 *@DESX : For loading the Ambulance  based on the baseLocation calling to masterdata
 * @NAME : Habiboon Patan
 * @DATE : 12-06-2019
 * @INPUTS: BaselocationId
 */
function getAmbulance(baseLocation) {
	  $('#visitor_ambulanceID').empty();
    // here calling masterdata ajax call
    loadingAmbulanceMaster(baseLocation);
    $("#visitor_ambulanceID").empty();
    var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#visitor_ambulanceID').append(selectfirst);
    $.each(ambulances, function(i, resData) {
        var ambulances = "<option value=" + resData.vehicleID + ">" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#visitor_ambulanceID');
    });

    $('#visitor_ambulanceID').trigger("chosen:updated");
    $('#visitor_ambulanceID').chosen();
}
;

function getAmbulanceForReg(baseLocationVal) {
	$('#visitor_reg_ambulanceID').empty();
	loadingAmbulanceMaster(baseLocationVal);
      var selectfirst = "<option value='0'>Select Ambulance</option>";
    $('#visitor_reg_ambulanceID').append(selectfirst);
    $.each(ambulances, function(i, resData) {
        var ambulances = "<option value=" + resData.vehicleID +","+resData.vehicleName+ " >" + resData.vehicleName + "</option>";
        $(ambulances).appendTo('#visitor_reg_ambulanceID');
        //$(ambulances).appendTo('#listOfAmbulanceForRegistration');
    });
    $('#visitor_reg_ambulanceID').trigger("chosen:updated");
    $("#visitor_reg_ambulanceID").chosen();

}
;



$('#registration').on('shown.bs.modal', function(e) {
   // visitorUpdate_getDistricts();
    getShiftTypes();
    getListOfDistrict_reg() ;
});

/*
 *@DESC : For loading the ShiftType  calling to masterdata
 *@AuthorName : Habiboon Patan
 *@DATE : 11-06-2019
 *@INPUTS : no input
 */
function getShiftTypes() {
    if (shiftType.length < 1 || shiftType === []) {
        loadingShiftTypeMaster();
        $.each(shiftType, function(i, resData) {
            var shiftType = "<option value=" + resData.shiftTypeID + ">" + resData.shiftTypeName + "</option>";
            $(shiftType).appendTo('#visitor_reg_shiftID');

        });
    }
    $("#visitor_reg_shiftID").chosen();
}
;

/*
 *@DESC : Visitor Update Registration
 *@AuthorName : Habiboon Patan
 *@DATE : 12-06-2019
 */
function visitor_registration() {
	
    var vu_vehicle_id = $('#visitor_reg_ambulanceID').val();
    var regNumber = vu_vehicle_id.split(",");
    $('#ambulance_no').val(regNumber[1]);
    var vu_baselocation_id = $('#visitor_reg_baseLocID').val();
    $('#baselocId').val(vu_baselocation_id);
    var vu_reg_number = $("#visitor_reg_ambulanceID").val();
    var vu_visitor_name = $('#visitor_reg_nameID').val();
    $('#visitor_name').val(vu_visitor_name);
    var vu_visitor_designation = $('#visitor_reg_designationId').val();
    $('#visitor_designation').val(vu_visitor_designation);
    var vu_visitor_organisation = $("#visitor_reg_organizationID").val();
    var vu_visitor_contactno = $('#visitor_reg_contactID').val();
    var vu_visitor_email = $('#visitor_reg_emailID').val();
    var vu_visitor_address = $('#visitor_reg_addressID').val();
    var vu_purpose_of_visit = $('#purposeOfvisitID').val();
    var vu_visitor_remarks = $('#reg_visitor_remarksID').val();
    $('#remarks').val(vu_visitor_remarks);
    var vu_supervior_id = $('#visitor_reg_supervisorID').val();
    var vu_district_manager_id = $('#visitor_districtManagerID').val();
    
    var vu_created_by_id=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var vu_created_by_roleid=localStorage.getItem("opdesk_roleID");
   
    var shiftType = $('#visitor_reg_shiftID').val();
    var vu_visited_date_time = $('#reg_visitedID').val();
    $('#visitorDate').val(vu_visited_date_time);
    var vu_visited_date_time1 = moment(vu_visited_date_time).format("YYYY-MM-DD");
    var vu_district_id = $('#visitor_reg_districtID').val();
    $('#distId').val(vu_district_id);
    var vu_other_district_manager = $('#visitor_reg_OtherManagerID').val();
    
    if(vu_visitor_contactno==null||vu_visitor_contactno==''){
    	vu_visitor_contactno='0';
    }
    if(vu_visitor_email==null||vu_visitor_email==''){
    	vu_visitor_email='0';
    }
    if(vu_visitor_address==null||vu_visitor_address==''){
    	vu_visitor_address='0';
    }
    if(vu_other_district_manager==null||vu_other_district_manager==''){
    	vu_other_district_manager='0';
    }
    if(vu_visitor_remarks==null||vu_visitor_remarks==''){
    	vu_visitor_remarks='0';
    }
    var obj_Insert = {
        vu_vehicle_id: regNumber[0],
        vu_baselocation_id: vu_baselocation_id,
        vu_reg_number: regNumber[1],
        vu_visitor_name: vu_visitor_name,
        vu_visitor_designation: vu_visitor_designation,
        vu_visitor_organisation: vu_visitor_organisation,
        vu_visitor_contactno: vu_visitor_contactno,
        vu_visitor_email: vu_visitor_email,
        vu_visitor_address: vu_visitor_address,
        vu_purpose_of_visit: vu_purpose_of_visit,
        vu_visitor_remarks: vu_visitor_remarks,
        vu_supervior_id: vu_supervior_id,
        vu_district_manager_id: vu_district_manager_id,
        vu_created_by_id: vu_created_by_id,
        vu_created_by_roleid: vu_created_by_roleid,
        vu_visited_date_time: vu_visited_date_time,
        vu_district_id: vu_district_id,
        vu_other_district_manager: vu_other_district_manager
    };
    if (vu_district_id === "0") {
        showsNotificationError("Select District", "visitor_reg_districtID", "error");
        return;
    }
    else if (vu_baselocation_id === "0") {
        showsNotificationError("Select Base Location", "visitor_reg_baseLocID", "error");
        return;
    }
    else if (vu_reg_number === "0") {
        showsNotificationError("Select Ambulance", "visitor_reg_ambulanceID", "error");
        return;
    }
    else if (shiftType === "0") {
        showsNotificationError("Select Shift Type", "visitor_reg_shiftID", "error");
        return;
    }
    else if (vu_visitor_name === "0" || vu_visitor_name === "") {
        showsNotificationError("Enter Visitor Name", "visitor_reg_nameID", "error");
        return;
    }
    else if (vu_visitor_designation === "0" || vu_visitor_designation === "") {
        showsNotificationError(" Enter Designation", "visitor_reg_designationId", "error");
        return;
    }
    else if (vu_visitor_organisation === "0" || vu_visitor_organisation === "") {
        showsNotificationError("Enter Organisaton", "visitor_reg_organizationID", "error");
        return;
    }
    else if (vu_supervior_id === "0" || vu_supervior_id === "") {
        showsNotificationError("Enter Supervisor Id", "visitor_reg_supervisorID", "error");
        return;
    }//vu_district_manager_id
    else if (vu_district_manager_id === "0" || vu_district_manager_id === "") {
        showsNotificationError("Enter District Manager Id", "visitor_districtManagerID", "error");
        return;
    }//purposeOfvisitID
    else if (vu_purpose_of_visit === "0" || vu_purpose_of_visit === "") {
        showsNotificationError("Enter Purpose Of Visit", "purposeOfvisitID", "error");
        return;
    }//
    else if (vu_visited_date_time === "0" || vu_visited_date_time === "") {
        showsNotificationError("Enter Visite Date", "reg_visitedID", "error");
        return;
    }
    console.log('==== Obj_Insert' + JSON.stringify(obj_Insert));
    var strUrl = Service.visitedregistration;
    console.log('==== strUrl' + strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
        	$('#ticketId').val(data.output);
        	get_ohd_mail_directory();
            if (data !== null || data !== 0) {
            //	get_ohd_mail_directory();
                showsNotificationError("Inserted Sucessfully", "visitor_registrationId", "success");
                window.setTimeout(function() {
                    location.reload();
                }, 3000);              
            }
        },
        error: function() {
            console.log("Error In case_ReOpen Not Inserted");
        }
    });
}

/*
 *@DESC : Visitor Search Details
 *@AuthorName : Habiboon Patan
 *@DATE : 12-06-2019
 */
function visitor_search() {
    $('#driverTable').html("");
    try {
        var districtId = document.getElementById('visitor_districtID').value;
        var baselocation = document.getElementById('visitor_basLocID').value;
        var ambulanceId = document.getElementById('visitor_ambulanceID').value;
        var ticketid = document.getElementById('visitor_ticketID').value;
        var fromdate = document.getElementById('fromtDateID').value;
        var todate = document.getElementById('toDateID').value;

        if (districtId === null | districtId === '') {
            districtId = 0;
        }
        if (baselocation === null | baselocation === '') {
            baselocation = 0;
        }
        if (ambulanceId === null | ambulanceId === '') {
            ambulanceId = 0;
        }
        if (fromdate === null | fromdate === '') {

            fromdate = 0;
        }
        if (todate === null | todate === '') {

            todate = 0;
        }

        if (ticketid === null | ticketid === '') {

            ticketid = 0;
        }
        
        if (districtId==0 &&baselocation==0 &&ambulanceId==0 &&fromdate==0&&todate==0&&ticketid==0){   
          	showNotificationError("Please Select At Least One Search Parameter", "search_id", "error");
          	//$.toaster({ priority : 'warning', title : 'fgdfg', message : 'plzzz selsdfgsdgf'});
          	return true;
          }
        
        
        var obj_Insert = {
            districtId: districtId,
            baseLocationId: baselocation,
            vu_reg_number: ambulanceId,
            finalExpectedfromdate: fromdate,
            finalExpectedtodate: todate,
            vu_ticket_id: ticketid
        };
        var strUrl = Service.getVisitSearchList;
        console.log("strUrl : " + strUrl);
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
                }

                else {
                    var jsonArray = data.visitorUpdateControllerDTO;
                    if (jsonArray.length > 0) {
                        //calling gettingSearchList function.....
                        gettingvisitSearchList(jsonArray);
                        visitLoadTable();

                    }
                }
            },
            error: function(err) {
                console.error('update Stock error: ' + JSON.stringify(err));
            }
        });
    }
    catch (err) {
        console.error("error occur in search()" + JSON.stringify(err))
    }
}

function gettingvisitSearchList(strData) {

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

    var objTHead3 = document.createElement('th');
    $(objTHead3).html('Ticket Id');
    $(objTr).append(objTHead3);

    var objTHead4 = document.createElement('th');
    $(objTHead4).html('District');
    $(objTr).append(objTHead4);

    var objTHead5 = document.createElement('th');
    $(objTHead5).html('Base Location');
    $(objTr).append(objTHead5);

    var objTHead6 = document.createElement('th');
    $(objTHead6).html('Ambulance No');
    $(objTr).append(objTHead6);

    var objTHead7 = document.createElement('th');
    $(objTHead7).html('Visitor Name');
    $(objTr).append(objTHead7);

    var objTHead8 = document.createElement('th');
    $(objTHead8).html('Visited Date & Time');
    $(objTr).append(objTHead8);

    var objTHead9 = document.createElement('th');
    $(objTHead9).html('Purpose of Visite');
    $(objTr).append(objTHead9);

  /*  var objTHead10 = document.createElement('th');
    $(objTHead10).html('Pilot Name');
    $(objTr).append(objTHead10);

    var objTHead11 = document.createElement('th');
    $(objTHead11).html('EMT Name');
    $(objTr).append(objTHead11);*/

    var objTHead12 = document.createElement('th');
    $(objTHead12).html('Supervisor Name');
    $(objTr).append(objTHead12);

/*    var objTHead13 = document.createElement('th');
    $(objTHead13).html('District Manager Name');
    $(objTr).append(objTHead13);
*/
    var objTBody = document.createElement('tbody');
//    $(objTBody).attr('id', 'driverTablebody');
    $(objTableTag).append(objTBody);

//    var data=JSON.parse(strData.tyreLifeControllerDTOs);
//    console.log("data after parsing"+data);

    for (var i = 0; i < strData.length; i++) {

        var index = i + 1;
        var tbleRow = document.createElement('tr');

        var tblCol = document.createElement('td');
        $(tblCol).addClass('text-center');
        $(tblCol).html(index);
        $(tbleRow).append(tblCol);

//         var tblCol1 = document.createElement('td');
//        $(tblCol1).addClass('text-center');
//        $(tblCol1).html(strData[i].ti_seriaid);
//        $(tbleRow).append(tblCol1);

        var tblCol1 = document.createElement('td');
        $(tblCol1).addClass('text-center');
        $(tblCol1).html(strData[i].vu_ticket_id);

        $(tbleRow).append(tblCol1);

        var tblCol2 = document.createElement('td');
        $(tblCol2).addClass('text-center');
        $(tblCol2).html(strData[i].distName);
//        var ds_Id = getDistrictsFromID(strData[i].districtId);
//        var ds_Lname = $('#ds_Id').val();
//        $(tblCol2).html(ds_Lname);
        $(tbleRow).append(tblCol2);

        var tblCol3 = document.createElement('td');
        $(tblCol3).addClass('text-center');
        $(tblCol3).html(strData[i].baseLocName);
//        var bs_Id = getBaselocationsFromId(strData[i].baseLocationId);
//        var bs_Lname = $('#bs_Id').val();
//        $(tblCol3).html(bs_Lname);
        $(tbleRow).append(tblCol3);

        var tblCol4 = document.createElement('td');
        $(tblCol4).addClass('text-center');
        $(tblCol4).html(strData[i].vu_reg_number);
        $(tbleRow).append(tblCol4);


        var tblCol5 = document.createElement('td');
        $(tblCol5).addClass('text-center');
        $(tblCol5).html(strData[i].vu_visitor_name);
        $(tbleRow).append(tblCol5);


        var tblCol6 = document.createElement('td');
        $(tblCol6).addClass('text-center');
        $(tblCol6).html(strData[i].vu_visited_date_time);
        $(tbleRow).append(tblCol6);

        var tblCol7 = document.createElement('td');
        $(tblCol7).addClass('text-center');
        $(tblCol7).html(strData[i].vu_purpose_of_visit);
        $(tbleRow).append(tblCol7);

  /*      var tblCol8 = document.createElement('td');
        $(tblCol8).addClass('text-center');
        $(tblCol8).html(strData[i].pilotId);
        $(tbleRow).append(tblCol8);


        var tblCol9 = document.createElement('td');
        $(tblCol9).addClass('text-center');
        $(tblCol9).html(strData[i].emsoId);
        $(tbleRow).append(tblCol9);*/

        var tblCol10 = document.createElement('td');
        $(tblCol10).addClass('text-center');
        var pilotId = strData[i].vu_supervior_id;
        if (pilotId === undefined) {
            $(tblCol10).html('NA');
        }
        else {
            $(tblCol10).html(strData[i].vu_supervior_id);
        }
        $(tbleRow).append(tblCol10);



  /*      var tblCol12 = document.createElement('td');
        $(tblCol12).addClass('text-center');
        var supervisorName = strData[i].vu_district_manager_id;
        if (supervisorName === undefined) {
            $(tblCol12).html('NA');
        }
        else {
            $(tblCol12).html(strData[i].vu_district_manager_id);
        }
        $(tbleRow).append(tblCol12);*/

        $(objTBody).append(tbleRow);
    }
    $("#driverTable").append(objDivTag);
}




function  visitLoadTable() {
    $('.dataTables-example').DataTable({
        "aLengthMenu": [[5, 10, 15, 25, 50, 75, -1], [5, 10, 15, 25, 50, 75, "All"]],
        "iDisplayLength": 10,
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'VisitUpdate'},
            {extend: 'pdf', title: 'VisitUpdate'},
            {extend: 'print',
                customize: function(win) {
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



function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
	return false;
	return true;
}  


/*
 *@DESC : Notification purpose
 *@AuthorName : Habiboon Patan
 *@DATE : 12-06-2019
 */
function showsNotificationError(msg, id, msgType) {
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

function resetSearch(){
	//baselocation(0);
	getAmbulance(0);
	$('#visitor_districtID').val('0').trigger("chosen:updated");
	$('#visitor_basLocID').val('0').trigger("chosen:updated");
	$('#visitor_ambulanceID').val('0').trigger("chosen:updated");
	$('#visitor_ticketID').val('')
	$('#fromtDateID').val('')
	$('#toDateID').val('')
	//$('#visitor_districtID').val('')
	//getBaseLocationBasedId(0, 0);
    baseLocation_search(0);
	getAmbulance(0);
	$('#driverTable').empty();
}

function resetInsert(){
	$('#visitor_reg_districtID').val('0').trigger("chosen:updated");
	$('#visitor_reg_baseLocID').val('0').trigger("chosen:updated");
	$('#visitor_reg_ambulanceID').val('0').trigger("chosen:updated");
	$('#visitor_reg_shiftID').val('0').trigger("chosen:updated");
	$('#visitor_reg_nameID').val('');
	$('#visitor_reg_designationId').val('');
	$('#visitor_reg_organizationID').val('');
	$('#visitor_reg_contactID').val('');
	$('#visitor_reg_emailID').val('');
	$('#visitor_reg_addressID').val('');
	$('#visitor_reg_supervisorID').val('');
	$('#visitor_districtManagerID').val('');
	$('#visitor_reg_OtherManagerID').val('');
	$('#purposeOfvisitID').val('');
	$('#reg_visitedID').val('');
	$('#reg_visitor_remarksID').val('');
	baseLocation_reg(0);
	getAmbulanceForReg(0);
}

$(document).ready(function () {
    $('#strtDate').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#strtDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//datetimepicker1

$(document).ready(function () {
    $('#endDate').datepicker({
      //  format: 'mm-dd-yyyy',
        format: 'yyyy-mm-dd',
        autoclose:true,
        todayHighlight: true,
        changeMonth: true,
        changeYear: true,
        endDate: "today",

    }).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });

    $('#endDate').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});//datetimepicker1


//here getting mail and mobile no. to send mail
function get_ohd_mail_directory(){
	var ticket_id=$('#ticketId').val();
	var distid=$('#distId').val();
	var baselocId=$('#baselocId').val();
	var ambulanceno=$('#ambulance_no').val();
	alert(ambulanceno);
	var visitor_Date=$('#visitorDate').val();
	var visitorName=$('#visitor_name').val();
	var visitor_desination=$('#visitor_designation').val();
  /*var emsoId=$('#emsoid').val();
	var pilot=$('#pilotid').val();*/
	var message="AP opdesk Tkt ID:"+ticket_id+",Dist:"+distid+",BL:" +baselocId+",A.No:" +ambulanceno+",Category:Visitor Date Time:"+visitor_Date+" ERS";	
	var remarks=$('#remarks').val();
	var odometerId=$('#endOdometerNo').val();
	var start_dateTime=$('#start_date_time').val();
	var emailtext;
	//alert("remarks4535====>"+remarks);	
var emailtext =	'<html><head><title>Visitor Update</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>';*/

/*emailtext=emailtext+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">';*/

/*emailtext=emailtext+'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>';*/

emailtext=emailtext+' <style>.container{width: 650px;margin:0px auto;padding:20px;}body{padding: 50px;}.gray-bg{background:#f6f6f6;}.white-bg{background:#fff;}';

emailtext=emailtext+' table, th, td { border: 1px solid black; border-collapse: collapse; } table{width:100%;  }th, td { padding: 5px; color: black;text-align:center; font-size: 14px;}.fw-600{font-weight:600;}';        

emailtext=emailtext+'.maintext{background-color: #1f74bd;color: white; height: 50px;font-weight: 800; text-align: center;  font-size: 18px;}.text2{background-color:  #f5f5f5;}.text-light-gray{margin-left: 930px; }</style> </head>'; 

emailtext=emailtext+'<body class="gray-bg"><div class="container white-bg"><h4> Dear All</h4><p>The Following are the activity Details of Operational Helpdesk</p><table ><tr><th colspan="2" class="maintext">Issue Type:Visitor Update</th></tr> <tr><td >Reason</td> <td>'+remarks+'</td> ';

emailtext=emailtext+'</tr> <tr><td class="text2">Base Location</td><td class="text2">'+baselocId+'</td></tr><tr><td>Ambulance Register No:</td> <td>'+ambulanceno+'</td>' ;   

emailtext=emailtext+'</tr><tr><td>Escalateed To:</td><td>Fleet Manager</td>';

emailtext=emailtext+'</tr><tr><td class="text2">District:</td><td class="text2">'+distid+'</td></tr>';

emailtext=emailtext+'<tr><td>Status:</td><td>Open</td></tr><tr><td class="text2">Current Date:</td><td class="text2"></td></tr><tr><td >Visitor Update Date Time:</td><td class="text2">'+visitor_Date+'</td>';

emailtext=emailtext+'</tr><tr><td>Visitor Name:</td><td>'+visitorName+'</td></tr><tr><td>Designation Name:</td><td>'+visitor_desination+'</td></tr><tr></table><br><br><div><span class="text-green">Thanks and Regards,<br><span class="text-purple">AP ERS Team.</span></div></div>';                     

emailtext=emailtext+'<div class="text-center "> <p><span class="text-light-gray">Powered by</span> <a href="http://www.procreate.co.in/" target="_blank" class="text-purple">ProCreate Techno Systems Pvt Ltd.</a></p></div></body></html>';                                                                       	
console.log("====>"+message);
var strUrl = Service.get_ohd_mail_directory+"/"+distid;
console.log("get_ohd_mail_directory url====>:" + strUrl);
$.ajax({
    type: 'GET',
    url: strUrl,
    dataType: 'json',
    async: false,
    success: function (data) {
        var responsecode = data.responseCode;
        if (600== responsecode) {
            alert("No Data Found");          
         }else if(600!== responsecode) {
            var jsonArray = data.mailAndSmsControllerDTO;
            $.each(jsonArray, function (i, resData) {
            	insertHmSmsOutboxTreans(resData.sm_contact_num1,message);
            	var email=resData.sm_email_id;
            	insertHmEmailOutboxTreans(resData.sm_email_id,emailtext,ticket_id)
            


            });
        }
    },
    error: function (err) {
        console.error("Error in fuel_card_number" + JSON.stringify(err));
    }
});
}
;

//inserting sms here
function insertHmSmsOutboxTreans(contactno,message){
	alert("========insertHmSmsOutboxTreans========");
	var contactnolength=$('#contact_no_length').val();
	var contact_no=contactno;
	var message=message;
	var from_mobile=0;
	var no_of_attempts=0;
	var statusId=1;
	
    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
	 var objJson={
			"so_message":message,
			"so_tomobile_no":contact_no,
			"so_from_mobile_no":from_mobile,
			"so_no_of_attempts":no_of_attempts,
			"so_status_id":statusId,
			"so_createdbyid":createdyid,
			"createdbymoduleid":createdbymodelid,
			"createdbyroleid":createdbtroleid
		    };
		    var strUrl = Service.insertHmSmsOutboxTreans;
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
		            //var responsecode = data.responseCode;
		          //  if (200 !== responsecode) {
		           //     alert("Not Inserted ");
		           // } else {
                 alert("SMS Sent Sucessfully ")
                
		            //}

		        }, error: function () {
		            console.log('In Error of  Details ');
		        }
		    });
		}

//inserting email here
function insertHmEmailOutboxTreans(to_mail,emailtext,ticket_id){
	alert("========insertHmEmailOutboxTreans========");
	var subject="AP ERS-Visitor Update with Ticket Id:"+ticket_id
    var createdyid=localStorage.getItem("userID");
	var createdbymodelid=localStorage.getItem("opdesk_moduleID");
	var createdbtroleid=localStorage.getItem("opdesk_roleID");
	 var objJson={		
				"inboxqueueid":0,
				"replyuser":0,
				"toemailid":to_mail,
				"subject":subject,
				"replybody":emailtext,
				"actionid":1,
				"templateid":1,
			  	"so_createdbyid":createdyid,
				"createdbymoduleid":createdbymodelid,
				"createdbyroleid":createdbtroleid
		    };
		    var strUrl = Service.insertHmEmailOutboxTreansPrev;
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
		            var responsecode = data.responseCode;
		          //  if (200 !== responsecode) {
		               alert(" Mail Sent Sucessfully");
		         //   } else {
		            	// showNotificationError("Sms And Mail Sent Sucessfully", "fuel_registration_id", "success");
		         //   }

		        }, error: function () {
		            console.log('In Error of  Details ');
		        }
		    });
		}

