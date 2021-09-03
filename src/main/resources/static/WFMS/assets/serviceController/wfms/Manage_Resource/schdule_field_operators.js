

var user_Id;
var role_Id;
var module_Id;
$(document).ready(function() {
	 user_Id = localStorage.getItem('userID');
	 role_Id = localStorage.getItem('wfms_roleID');
	 module_Id = localStorage.getItem('wfms_moduleID');
    get_Zone();
    get_Department();
    get_ShiftPatteren();
    patterenLeftAllignDays();

});

//patteren left allign day loading
function patterenLeftAllignDays(){
	var i;
	for(i=0;i<25;i++){
		var ShiftPattern = "<option value=" + i+ ">" + i + "</option>";
        $(ShiftPattern).appendTo('#patternid');	
	}
}

//holiday list functionality
function holidayList(user_Id,startDate,endDate){
	var allocated_date;
	var startdate=startDate;
	var enddate=endDate;
	var diff=(new Date(enddate))-(new Date(startdate));
	var days=diff/(1000*60*60*24);
	var d = new Date(startdate);
	var i;
	Date.prototype.addDays = function(days) {
	    var date = new Date(this.valueOf());
	    date.setDate(date.getDate() + days);
	    return date;
	}
	for( i=0;i<=days;i++){
		var d2=new Date(d.addDays(i))	
		var day = d2.getDate();
		var month = d2.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
		var year = d2.getFullYear();
		var allocatedDate=""+year+"-"+month+"-"+day+"";
		//alert("allocatedDate----->"+allocatedDate);
	if (i == 0) {
		allocated_date = startdate;
    } else {
    	allocated_date = allocatedDate;
    }
	var lctpresentstatusf;
	var lctnoofleavesaddedf;
	//getting holiday list count
	 getHolidayCount(allocated_date);
	 //getting holiday list allocating date
	 getSchdeuleAllocatedDetails(allocated_date,user_Id);


	 if(shiftid=="4"){
		 shiftid="12" ;
	 }
	
	 if(count==1 && shiftid!="12"){
		 getLeaveCounts(allocated_date,user_Id);
	 }
	 if(exitshulbid!="0"){
		 updateLeaveBalanceDetails(allocated_date,user_Id);
	 }
	 getLeaveBalanceDetails(user_Id);
	 if(exitshulbid!="0")
     {
		  lctpresentstatusf=lct_presentstatus-1;
          lctnoofleavesaddedf=lct_noofleavesadded-1;
          updateLeaveDetails(lct_id,lctpresentstatusf,lctnoofleavesaddedf);
     }
	// get_Leave_Balance_AllDetails();
	 get_Leave_Balance_count();

     if(lctid_count==""||lctid_count=="0")
     {
      var lctid_count=1;
     }
     else
     {   	 
     var count=lctid_count;
     lctid_count=count+1
     }
      lctpresentstatusf=lct_presentstatus+1;
      lctnoofleavesaddedf=lct_noofleavesadded+1;
      updateLeaveDetails(lct_id,lctpresentstatusf,lctnoofleavesaddedf);
      var lct_leavetypeid="11";
      var ulb_noofleaves="1";
      var status=true;
      var leavetransid=null;
      var ulb_createddtm="now()";
      var us_Id=user_Id;
      var createbyid=us_Id;
      var createbymodid=module_Id;
      var createbyrolid=role_Id;
     //inserting holiday list count
      inserting_Leave_Balance_Details(lctid_count,user_Id,moduleid,lct_leavetypeid,ulb_noofleaves,allocated_date,status,leavetransid,ulb_createddtm,createbyid,createbymodid,createbyrolid);
	}//end for
	
}

function  get_Zone() {
   // var strUrl = 'http://localhost:9160/wfms/ManageResourceController/getusersZonesDropDowns';
	var strUrl=Service.get_Zone;
    $.ajax({
        type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: true,
       /* headers: {
            "X-TENANT-ID": "PROCREATE"
        },*/
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
               // alert("No Data Found");
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
             /*   var selectfirst = "<option value='0'>Select Shift Zone</option>";
                $('#zoneid').append(selectfirst);*/
                $.each(jsonArray, function(i, resData) {
                    var ShiftPattern = "<option value=" + resData.location_id + ">" + resData.location_name + "</option>";
                    $(ShiftPattern).appendTo('#zone__id');
                  //alert("---->"+resData.location_id);
                });
            }
        },
        error: function(err) {
            console.error("Error in zoneid" + JSON.stringify(err));
        }
        
        //$('#shiftid').trigger("chosen:updated");
    	//$('#shiftid').chosen();
    });
}


//on change Function
$('#zone__id').on('change', function() {
	var zone_id = $('#zone__id').val();
	$('#baselocation_id').empty();
	getBaselocation(zone_id);
});

//on change Function
$('#departmentid').on('change', function() {
	var department_id = $('#departmentid').val();
	$('#baselocation_id').empty();
	get_Employee_Details(department_id);
});

//get department dropdown
function  get_Department() {
   // var strUrl = 'http://localhost:9160/wfms/ManageResourceController/getDepartment';
    var strUrl=Service.getDepartment;
    $.ajax({
        type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: false,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
               // alert("No Data Found");
            } else {
                var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                var selectfirst = "<option value='0'>Select Department</option>";
                $('#departmentid').append(selectfirst);
                $.each(jsonArray, function(i, resData) {
                    var ShiftPattern = "<option value=" + resData.module_id + ">" + resData.module_Name + "</option>";
                    $(ShiftPattern).appendTo('#departmentid');
                    //alert("-------->"+JSON.stringify(resData));
                });
            }
        },
        error: function(err) {
            console.error("Error in zoneid" + JSON.stringify(err));
        }
    });
}

//get Baselocation
function  getBaselocation(zoneid) {
    var json = {
    		 "location_id":zoneid
        };
     // var strUrl = 'http://localhost:9160/wfms/ManageResourceController/getBaseLocationsDropDown';
        var strUrl = Service.Get_BaseLocation_DropDown;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
                "X-TENANT-ID": "PROCREATE"
            },
            success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
              //  alert("No Data Found");
            } else {
                var jsonArray = data.objResourceProfilesControllerDTO;
               /* var selectfirst = "<option value='0'>Select Baselocation</option>";
                $('#baseloc_id').append(selectfirst);*/
                $.each(jsonArray, function(i, resData) {
                    var ShiftPattern = "<option value=" + resData.location_id + ">" + resData.location_name + "</option>";
                    $(ShiftPattern).appendTo('#baseloc_id');
                });
            }
        },
        error: function(err) {
            console.error("Error in zoneid" + JSON.stringify(err));
        }
    });
    	$('#baseloc_id').trigger("chosen:updated");
    	$('#baseloc_id').chosen();
}

//get employee details
function get_Employee_Details(moduleid) {
    $("#sheduleErc_AssignId").empty();
    var manager_id = user_Id;//Temporarory Purpose
    var json_Employee_Details = {
        "moduleid": moduleid,
        "manager_id": manager_id
    };

//    var strUrl = "http://localhost:9160/wfms/ManageResourceController/get_Employee_Details";//
    var strUrl=Service.getEmployeeDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Employee_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
               // alert("No Data Found");
            } else {
                var jsonArray = data.objScheduleOfERCControllerDTO;
               
                $.each(jsonArray, function(i, resData) {
                    var assignvar = resData.user_name;
                    var assignId = '<option value="' + resData.user_id + ',' + assignvar + '">' + resData.user_name + '</option>';
                    $('#sheduleErc_AssignId').append(assignId);
                });
 
            }
        }, error: function() {
            console.log('In Error of Get_Employee_Details Details ');
        }
    });
}

//getting shift patteren
function get_ShiftPatteren() {
    $("#shiftid").empty();
    var json_Employee_Details = {
    		
    		 "schduleType":"2"//for Patteren Operator
    };

  //  var strUrl = "http://localhost:9160/wfms/ManageResourceController/getShiftPatteren";//
    var strUrl=Service.getShiftPatteren;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Employee_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
              //  alert("No Data Found");
            } else {
                var jsonArray = data.objPatternsERCControllerDTO;
                var selectfirst = "<option value='0'>Select Shift Patteren</option>";
                $('#shiftid').append(selectfirst);
                $.each(jsonArray, function(i, resData) {
                    var assignvar = resData.user_name;
                    var assignId = '<option value="' + resData.shiftpattern_shiftpatternid + '">' + resData.patterntype + '</option>';
                    $('#shiftid').append(assignId);
                });
         
            }
        }, error: function() {
            console.log('In Error of shiftid Details ');
        }
    });
}



var employeearray = [];
function assign() {
    var stopToAddSelectOption = $("#sheduleErc_AssignId").val();
    if (stopToAddSelectOption === "" || stopToAddSelectOption === '' || stopToAddSelectOption === null) {
        showNotificationError('Please Select Employees from the List and Assign', 'error_message', 'error');
        return true;
    }
    $('#sheduleErc_AssignId :selected').each(function(i, sel) {
        var str = $(sel).val().toString();
        var arr = str.split(",");
        var ShiftPattern = '<option value="' + arr[0] + ',' + arr[1] + '">' + arr[1] + '</option>';
        $(ShiftPattern).appendTo('#sheduleErcDeAssignId');
        $(this).remove();
    });
    /*
     Calling User Details Function Here
     */
    get_User_Details();
}

function de_Assign() {
    var stopToAddSelectOption = $("#sheduleErcDeAssignId").val();
    if (stopToAddSelectOption === "" || stopToAddSelectOption === '' || stopToAddSelectOption === null) {
        showNotificationError('Please Select Employees from the List and DeAssign', 'error_message', 'error');
        return true;
    }
    $('#sheduleErcDeAssignId :selected').each(function(i, sel) {
        var str = $(sel).val().toString();
        var arr = str.split(",");
        var ShiftPattern = '<option value="' + arr[0] + ',' + arr[1] + '">' + arr[1] + '</option>';
        $(ShiftPattern).appendTo('#sheduleErc_AssignId');
        $(this).remove();
    });
}


function get_User_Details() {
    $('#sheduleErcDeAssignId option').each(function(i, sel) {
        employeearray.push($(this).attr('value'));
    });
    for (var i = 0; i < employeearray.length; i++) {
        var beforsplit = employeearray[i];
        var userids = beforsplit.split(",");
        if (userids[0] !== "0") {
            var user_id = userids[0];
            var module_id = $('#shedule_DeprtmentId').val();
            $('#hidden_UserId').val(user_id);
            var json_User_Details = {
                "user_id": user_id,
                "module_id": module_id
            };
     //       var strUrl = "http://localhost:9160/wfms/ManageResourceController/getting_User_Details";
            var strUrl=Service.getting_User_Details;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_User_Details),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                headers: {
                    "X-TENANT-ID": "PROCREATE"
                },
                success: function(data) {
                    var responsecode = data.responseCode;
                    if (200 !== responsecode) {
                       // alert("No Data Found");
                    } else {
                        var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                        $.each(jsonArray, function(i, resData) {
                            // console.log(':::: USER FST NAME ::::-> ' + resData.user_firstname + " " + resData.user_lastname + ":: Manager Name ::-> " + resData.user_manager_name + ":: EMAIL ::-> " + resData.user_email + " :: PHONE NO ::-> " + resData.user_phone + ":: DESC :: -> " + resData.mo_desc);
                        });

                    }
                }, error: function() {
                    console.log('In Error of Get_User_Details');
                }
            });
        }
    }
}



/*
 For get_Exists_Patterns_Count Purpose
 */
var onecountalreadyexists;
function get_Exists_Patterns_Count(strat_Date, end_Date, user_Id) {
    var json_get_Exists_Patterns_Count = {
        "start_date": strat_Date,
        "end_date": end_Date,
        "user_id": user_Id
    };

  //  var strUrl = "http://localhost:9160/wfms/ManageResourceController/getExistsPatternsCount";//
    var strUrl=Service.getExistsPatternsCount;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_get_Exists_Patterns_Count),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
        	
            var responsecode = data.responseCode;
          
            onecountalreadyexists = data.count;
            if (200 !== responsecode) {
               // alert("No Data Found");
            } else {
                console.log('get_Exists_Patterns_Count ========>');

            }
        }, error: function() {
            console.log('In Error of get_Exists_Patterns_Count');
        }
    });
}


function get_WfSheduledAllocated_Details(start_datetime, end_datetime,userid) {
	  
            var json_WfSheduledAllocated_Details = {
                "user_id": userid,
                "shiftstart_datetime": start_datetime,
                "shiftend_datetime": end_datetime
            };
          //  var strUrl = "http://localhost:9160/wfms/ManageResourceController/get_Allocated_Sheduled_Details";//
            var strUrl=Service.get_Allocated_Sheduled_Details;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_WfSheduledAllocated_Details),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                headers: {
                    "X-TENANT-ID": "PROCREATE"
                },
                success: function(data) {
                    var responsecode = data.responseCode;
                   // alert("response code----->"+responsecode);
                    if (200 !== responsecode) {
            
                        console.log(' IF Part Get_Allocated_Sheduled_Details ========>');
                    } else {
                        var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                        $.each(jsonArray, function(i, resData) {
                        	  var shedule_Allocated_Id = jsonArray[i].sheduled_id;
                             //update allocated schdule
                              update_WfSheduleAllocated_Details(shedule_Allocated_Id);	
                        })
                          

                        
                    }
                }, error: function() {
                    console.log('In Error of Get_Allocated_Sheduled_Details');
                }
            });

}

function update_WfSheduleAllocated_Details(sheduled_id) {
    var json_update_WfSheduleAllocated_Details = {
        "sheduled_id": sheduled_id
    };

   // var strUrl = "http://localhost:9160/wfms/ManageResourceController/update_Shedule_Details";//
    var strUrl=Service.update_Shedule_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_update_WfSheduleAllocated_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
        
            if (200 !== responsecode) {
                // alert("No Data Found");
            } else {
             console.log("Successfully updated")
            }
        }, error: function() {
            console.log('In Error of Update_WfSheduleAllocated_Details');
        }
    });
}


function get_WfSheduled_Details(start_datetime, end_datetime,userid) {
            var shiftstart_datetime = start_datetime;//2018-04-01
            var shiftend_datetime = end_datetime;//2018-04-30
            var json_Sheduled_Details = {
                "user_id": userid,
                "shiftstart_datetime": start_datetime,
                "shiftend_datetime": end_datetime
            };
            console.log(':::: SHEDULED DETAILS JSON OBJECT ::::' + JSON.stringify(json_Sheduled_Details));
           // var strUrl = "http://localhost:9160/wfms/ManageResourceController/get_Sheduled_Details";
            var strUrl=Service.get_Sheduled_Details;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_Sheduled_Details),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                headers: {
                    "X-TENANT-ID": "PROCREATE"
                },
                success: function(data) {
                	var dbStartTime;
                	var dbEndTime;
                	var schduleid;
                    var responsecode = data.responseCode;
                   // alert("----------->"+responsecode);
                    if (200 !== responsecode) {
                         
                    } else {
                        var jsonArray = data.objSheduledOfFieldOperatorsControllerDTO;
                        $.each(jsonArray, function(i, resData) {
                        	schduleid=resData.sheduled_id;
                        	dbStartTime=resData.shiftstart_datetime;
                        	dbEndTime=resData.shift_endtime;
                        	if (start_datetime == dbStartTime && end_datetime == dbEndTime) {
                                 update_WfShedule_Details(schduleid);
                             }	
                        });

                    }
                }, error: function() {
                    console.log('In Error of get_WfSheduled_Details');
                }
            });

}


function insertWfmsDetails(userId,startDate,endDate,shift_id,department_id,zone,baselocationid){
	var json_update_WfShedule_Details ={       
   "user_id":userId,
  "start_date":startDate,
  "end_date":endDate ,
  "patternid":shift_id,
  "sheduled_kellyid":"8",
  "user_createddtm":"now()",
  "user_createdbyid":user_Id,
  "user_cretedbymoduledid":module_Id,
  "user_createdbyroleid":role_Id,
  "isactive":"true",
  "sheduled_roleid":role_Id,
  "location_id":zone,
  "location_baseid":baselocationid
}

   // var strUrl = "http://localhost:9160/wfms/ManageResourceController/inserting_WfShedule_Details";
	var strUrl=Service.inserting_WfShedule_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_update_WfShedule_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
           console.log("Successfully inserted inserting_WfShedule_Details")

            }
        }, error: function() {
            console.log('In Error of update_WfShedule_Details');
        }
    });
}


function update_WfShedule_Details(schduleid) {
    var json_update_WfShedule_Details = {
        "sheduled_id": schduleid
    };

  //  var strUrl = "http://localhost:9160/wfms/ManageResourceController/update_WfShedule_Details";
    var strUrl=Service.update_WfShedule_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_update_WfShedule_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                console.log('If Part update_WfShedule_Details ========>');
            } else {
              console.log("update successfully WfShedule_Details")

            }
        }, error: function() {
            console.log('In Error of update_WfShedule_Details');
        }
    });
}



function saveScheduleDetails(){
	var zone=$('#zone__id').val();
	console.log("zone =====>"+zone);
	var baselocationid=$('#baseloc_id').val();
	console.log("baselocationid ======>"+baselocationid);
	var department_id=$('#departmentid').val();
	var shift_id=$("#shiftid").val();
	var startDate =$("#sheduleErc_StartDate").val();
	var endDate=$("#sheduleErc_endDate").val();
	/*var leftAlignDays=$('#patternid').val();*/
	if(zone=="0"){
		 showNotificationError('Please Select Zone', 'zone__id', 'error');
	        return false;
	}
	if(baselocationid=="0"||baselocationid=='0'){
		 showNotificationError('Please Select Baselocation', 'baseloc_id', 'error');
	        return false;
	}
	if(department_id=="0"){
		 showNotificationError('Please Select Department', 'departmentid', 'error');
	        return false;
	}

	var bfplit = employeearray[1];

    if (bfplit === "" || bfplit === undefined || bfplit === "0") {
        showNotificationError('Please Assign Employee', 'assignbtn', 'error');
        return false;
    }
    if(startDate==""){
		 showNotificationError('Please Select StartDate', 'sheduleErc_StartDate', 'error');
	        return false;
	}
    if(endDate==""){
		 showNotificationError('Please Select EndDate', 'sheduleErc_endDate', 'error');
	        return false;
	}
    
    if(startDate>endDate){
		 showNotificationError('Start Date Should be less than end date', 'sheduleErc_endDate', 'error');
	        return false;
	}
	
    if(shift_id=="0"){
		 showNotificationError('Please Select Shift Patteren', 'shiftid', 'error');
	        return false;
	}
    /*if(leftAlignDays=="0"){
		 showNotificationError('Please Select Patteren Left Align Days', 'patternid', 'error');
	        return false;	
    }
    
	*/
	for (var i = 0; i < employeearray.length; i++) {
	        var beforsplit = employeearray[i];
	        var userids = beforsplit.split(",");
	        console.log("------------>"+beforsplit);
	        if (userids[0] !== ""){
	        	var user_Id=userids[0];
	        	
	        	if(shift_id==22){
	        	   	 unAssignSchdule(user_Id,startDate,endDate);	
	        	   	}else{
	        	 get_WfSheduled_Details(startDate, endDate,user_Id);	 
	             get_Exists_Patterns_Count(startDate, endDate, user_Id);
	           if(onecountalreadyexists !== "0") {
	               get_WfSheduledAllocated_Details(startDate,endDate,user_Id);
	               get_WfSheduled_Details(startDate, endDate,user_Id);	               
	           }
	           insertWfmsDetails(user_Id,startDate,endDate,shift_id,department_id,zone,baselocationid)
	         insertWFMSAllocatedDetails(user_Id,startDate,endDate,shift_id,department_id,zone,baselocationid);
	           
	           holidayList(user_Id,startDate,endDate);
	           mailAndSms(user_Id,startDate,endDate,department_id);
	           smsDetails(startDate,endDate);
	        }
	        }
	 }
 
}

function insertWFMSAllocatedDetails(userid,startDate,endDate,shift_id,department_id,zone,baselocationid){	
	
	var json_Employee_Details = {
	    		 "user_desc":userid, 
	             "module_id":department_id,
	             "user_createdbyid":user_Id,
	             "user_cretedbymoduledid":module_Id,
	             "user_createdbyroleid":role_Id,
	             "patternid":shift_id,
	             "start_date":startDate,
	             "end_date":endDate

	    };
	 // var strUrl = "http://localhost:9160/wfms/ManageResourceController/inserting_Shedule_Details_Allocated";//
	  var strUrl=Service.inserting_Shedule_Details_Allocated;
	    $.ajax({
	        type: "POST",
	        url: strUrl,
	        dataType: "json",
	        data: JSON.stringify(json_Employee_Details),
	        contentType: "application/json",
	        async: false,
	        crossDomain: true,
	        success: function(data) {
	            var responsecode = data.responseCode;
	            //alert("responsecode4------------>"+responsecode)
	            if (200 !== responsecode) {
	               // alert("No Data Found");
	            } else {
	            	 showNotificationError('Sucessfully Scheduled', 'submitbtn', 'success');
	            }
	        }, error: function() {
	            console.log('In Error of Get_Employee_Details Details ');
	        }
	    });
	
}

function unAssignSchdule(user_Id,startDate,endDate) {

    var json_Employee_Details = {
    		 "start_date":startDate, 
             "end_date":startDate,
             "user_id":user_Id

    };

   // var strUrl = "http://localhost:9160/wfms/ManageResourceController/update_Shedule_Alllocated_Not_In";//
    var strUrl=Service.update_Shedule_Alllocated_Not_In;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Employee_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if(responsecode!==200){
                //alert("No Data Found");
            } else {
            	 showNotificationError('Sucessfully UnAssign Scheduled', 'submitbtn', 'success');
            }
        }, error: function() {
            console.log('In Error of Get_Employee_Details Details ');
        }
    });
}

var count;
function getHolidayCount(allocateddate){
	    var json_Employee_Details = {
	    		  "holiday_date":allocateddate
	    };
	  //  var strUrl = "http://localhost:9160/wfms/ManageResourceController/get_Holiday_Count";//
	    var strUrl=Service.get_Holiday_Count;
	    $.ajax({
	        type: "POST",
	        url: strUrl,
	        dataType: "json",
	        data: JSON.stringify(json_Employee_Details),
	        contentType: "application/json",
	        async: false,
	        crossDomain: true,
	        headers: {
	            "X-TENANT-ID": "PROCREATE"
	        },
	        success: function(data) {
	            var responsecode = data.responseCode;
	            if(responsecode!==200){
	                //alert("No Data Found");
	            } else {
	               count=data.count;
	      
	            }
	        }, error: function() {
	            console.log('In Error of Get_Employee_Details Details ');
	        }
	    });
	}

var scheduledid;
var patternid;
var moduleid;
var shiftid;
function getSchdeuleAllocatedDetails(allocatedDate,user_Id){
    var json_Employee_Details = {
    		  "user_id":user_Id,
              "allocateddate":allocatedDate
    };
   // var strUrl = "http://localhost:9160/wfms/ManageResourceController/get_Sheduled_Allocated_Details";//
    var strUrl=Service.get_Sheduled_Allocated_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Employee_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            
            console.log("data---->"+JSON.stringify(data))
            if(responsecode!==200){
                //alert("No Data Found");
            } else {
               var jsonArray=data.objSheduledOfFieldOperatorsControllerDTO;
               $.each(jsonArray, function(i, resData) {
            	   scheduledid=resData.sheduled_id;
            	   patternid=resData.patternid;
            	   moduleid=resData.module_id;
            	   shiftid=resData.shift_Id;
            
               })
      
            }
        }, error: function() {
            console.log('In Error of Get_Employee_Details Details ');
        }
    });
}

var exitshulbid;
function getLeaveCounts(allocated_date,user_Id){
	 var json_Employee_Details = {
			  "leave_date":allocated_date,
	           "user_id":user_Id
   };
 //  var strUrl = "http://localhost:9160/wfms/ManageResourceController/get_Leaves_Balance_Count";//
   var strUrl=Service.get_Leaves_Balance_Count;
   $.ajax({
       type: "POST",
       url: strUrl,
       dataType: "json",
       data: JSON.stringify(json_Employee_Details),
       contentType: "application/json",
       async: false,
       crossDomain: true,
       headers: {
           "X-TENANT-ID": "PROCREATE"
       },
       success: function(data) {
           var responsecode = data.responseCode;
         
           if(responsecode!==200){
               //alert("No Data Found");
           } else {
             exitshulbid=data.count;     
           }
       }, error: function() {
           console.log('In Error of Get_Employee_Details Details ');
       }
   });
}


function updateLeaveBalanceDetails(allocated_date,userid){
	 var json_Employee_Details = {
	            "user_id":userid,
	             "leave_date":allocated_date
	
  };
 // var strUrl = "http://localhost:9160/wfms/ManageResourceController/update_Leaves_Balance_Details";//
  var strUrl=Service.update_Leaves_Balance_Details;
  $.ajax({
      type: "POST",
      url: strUrl,
      dataType: "json",
      data: JSON.stringify(json_Employee_Details),
      contentType: "application/json",
      async: false,
      crossDomain: true,
      headers: {
          "X-TENANT-ID": "PROCREATE"
      },
      success: function(data) {
          var responsecode = data.responseCode;
         
          if(responsecode!==200){
              //alert("No Data Found");
          } else {
           console.log("update_Leaves_Balance_Details successfully")
    
          }
      }, error: function() {
          console.log('In Error of Get_Employee_Details Details ');
      }
  });
}

var lct_noofleavesused;
var lct_noofleavesadded;
var lct_presentstatus;
var lct_moduleid;
var lct_id;
function getLeaveBalanceDetails(userid){
	 var json_Employee_Details = {
			 "user_id":module_Id,
             "leave_typeid":"11"//for patteren operator
	
 };
// var strUrl = "http://localhost:9160/wfms/ManageResourceController/get_Leave_Balance_AllDetails";//
 var strUrl=Service.get_Leave_Balance_AllDetails;
 $.ajax({
     type: "POST",
     url: strUrl,
     dataType: "json",
     data: JSON.stringify(json_Employee_Details),
     contentType: "application/json",
     async: false,
     crossDomain: true,
     headers: {
         "X-TENANT-ID": "PROCREATE"
     },
     success: function(data) {
         var responsecode = data.responseCode;
       
         if(responsecode!==200){
             //alert("No Data Found");
         } else {
            lct_noofleavesused=data.leave_noofleaves_added
            lct_noofleavesadded=data.leave_lapsed;
            lct_presentstatus=data.levaev_present_status;
            lct_moduleid=data.module_id;
            lct_id=data.leave_id;
   
         }
     }, error: function() {
         console.log('In Error of Get_Employee_Details Details ');
     }
 });
}

function updateLeaveDetails(lct_id,lctpresentstatusf,lctnoofleavesaddedf){
	 var json_Employee_Details = {         
                       "present_status":lct_id,
                       "noofleavesused":lctpresentstatusf,
                       "leave_id":lctnoofleavesaddedf
	
};
//var strUrl = "http://localhost:9160/wfms/ManageResourceController/updateLeaveDetails1";//
var strUrl=Service.updateLeaveDetails1;
$.ajax({
    type: "POST",
    url: strUrl,
    dataType: "json",
    data: JSON.stringify(json_Employee_Details),
    contentType: "application/json",
    async: false,
    crossDomain: true,
    headers: {
        "X-TENANT-ID": "PROCREATE"
    },
    success: function(data) {
        var responsecode = data.responseCode;
       
        if(responsecode!==200){
            //alert("No Data Found");
        } else {
       console.log("updateLeaveDetails successfully")
        }
    }, error: function() {
        console.log('In Error of Get_Employee_Details Details ');
    }
});
}


var lctid_count;
function  get_Leave_Balance_count() {
   // var strUrl = 'http://localhost:9160/wfms/ManageResourceController/get_Leave_Balance_count';
    var strUrl=Service.get_Leave_Balance_count;
    $.ajax({
        type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: false,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
          
            if (200 !== responsecode) {
               // alert("No Data Found");
            } else {
            	count=data.count;
            	//var num=1;
            	//alert("vvv--------->"+count+num);
            	var lctid_count=count.toString();
               
            }
        },
        error: function(err) {
            console.error("Error in zoneid" + JSON.stringify(err));
        }
    });
}

function inserting_Leave_Balance_Details (lctid_count,userid,moduleid,lct_leavetypeid,ulb_noofleaves,allocated_date,status,leavetransid,ulb_createddtm,createbyid,createbymodid,createbyrolid){
	var json_Employee_Details = {         			   
			    "user_leavebalance_id":lctid_count,
	            "user_id":userid,
	            "module_id":moduleid,
	            "leave_typeid":lct_leavetypeid,
	             "leave_noofleaves_added":ulb_noofleaves,
	             "leave_date":allocated_date,
	             "status_id":status,
	             "leave_id":1,
	             "user_createddtm":"now()",
	             "user_createdbyid":createbyid,
	             "user_cretedbymoduledid":createbymodid,
	             "user_createdbyroleid":createbyrolid
};
//var strUrl = "http://localhost:9160/wfms/ManageResourceController/inserting_Leave_Balance_Details";//
var strUrl=Service.inserting_Leave_Balance_Details;
$.ajax({
 type: "POST",
 url: strUrl,
 dataType: "json",
 data: JSON.stringify(json_Employee_Details),
 contentType: "application/json",
 async: false,
 crossDomain: true,
 headers: {
     "X-TENANT-ID": "PROCREATE"
 },
 success: function(data) {	
     var responsecode = data.responseCode;
    
     if(responsecode!==200){
         //alert("No Data Found");
     } else {
  //      alert("Successfully inserted..1");

     }
 }, error: function() {
     console.log('In Error of Get_Employee_Details Details ');
 }
});
}



//------------------------start mail and sms---------------------------------------


function mailAndSms(userid,startdate,enddate,moduleid){
	gettingUserDetails(userid,moduleid);
	get_Sheduled_Allocated_Modules_Locations_OrderBy(userid,moduleid);
	//get_Sheduled_Allocated_Modules_Locations(userid,startdate,enddate);
	getLegendsShiftTypeDetails();
	//getLegendsShiftTypeDetails();
	mailTemplate(userid,startdate,enddate);
	insertMails();
}



var usfname;
var usmname;
var uslname;
var userMailid;
var userphone;
var userModuledesc;
function gettingUserDetails(userid,moduleid){
		 var json_Employee_Details = {         
				 "user_id":userid,
			      "module_id":moduleid
		
	};
	//var strUrl = "http://localhost:9160/wfms/ManageResourceController/getting_User_Details";//
	var strUrl=Service.getting_User_Details;
	$.ajax({
	    type: "POST",
	    url: strUrl,
	    dataType: "json",
	    data: JSON.stringify(json_Employee_Details),
	    contentType: "application/json",
	    async: false,
	    crossDomain: true,
	    headers: {
	        "X-TENANT-ID": "PROCREATE"
	    },
	    success: function(data) {
	        var responsecode = data.responseCode;
	      
	        if(responsecode!==200){
	            //alert("No Data Found");
	        } else {
	          console.log("data sms---->"+JSON.stringify(data));
	          var jsonArray=data.objSheduledOfFieldOperatorsControllerDTO;
	          $.each(jsonArray, function(i, resData) {
	        	   usfname=resData.user_firstname;
		           uslname=resData.user_lastname;
		           userMailid=resData.user_email;
		           userphone=resData.user_phone;
		           userModuledesc=resData.mo_desc;
		           //alert("userMailid------->"+userMailid);
	          });
	  
	  
	        }
	    }, error: function() {
	        console.log('In Error of Get_Employee_Details Details ');
	    }
	});
		
}


function get_Sheduled_Allocated_Modules_Locations_OrderBy(userid,moduleid){
	
	 var json_Employee_Details = {         
			 "user_id":user_Id,
		      "module_id":moduleid
	
};
//var strUrl = "http://localhost:9160/wfms/ManageResourceController/get_Sheduled_Allocated_Modules_Locations_OrderBy";//
var strUrl=Service.get_Sheduled_Allocated_Modules_Locations_OrderBy;
$.ajax({
    type: "POST",
    url: strUrl,
    dataType: "json",
    data: JSON.stringify(json_Employee_Details),
    contentType: "application/json",
    async: false,
    crossDomain: true,
    headers: {
        "X-TENANT-ID": "PROCREATE"
    },
    success: function(data) {
        var responsecode = data.responseCode;
      
        if(responsecode!==200){
            //alert("No Data Found");
        } else {
          console.log("data sms---->"+JSON.stringify(data));
          var jsonArray=data.objSheduledOfFieldOperatorsControllerDTO;
          for(var i=0;i<=jsonArray.length;i++){
        	   usfname=data.user_firstname;
	           uslname=data.user_lastname;
	           userMailid=data.user_email;
	           userphone=data.user_phone;
	           userModuledesc=data.mo_desc;
          }
  
  
        }
    }, error: function() {
        console.log('In Error of Get_Employee_Details Details ');
    }
});
}

var allocateddate;
var location_name;
var baselocation_name;
var wsa_typeofshift;
var desc;
var shift_starttime;
var shift_endtime;
function get_Sheduled_Allocated_Modules_Locations(userid,startdate,enddate){
	 var json_Employee_Details = {         
			   "user_id":user_Id,
	           "start_date":startdate,
	           "end_date":enddate
};
//var strUrl = "http://localhost:9160/wfms/ManageResourceController/get_Sheduled_Allocated_Modules_Locations_OrderBy";//
var strUrl=Service.get_Sheduled_Allocated_Modules_Locations_OrderBy;
$.ajax({
    type: "POST",
    url: strUrl,
    dataType: "json",
    data: JSON.stringify(json_Employee_Details),
    contentType: "application/json",
    async: false,
    crossDomain: true,
    headers: {
        "X-TENANT-ID": "PROCREATE"
    },
    success: function(data) {
        var responsecode = data.responseCode;
        if(responsecode!==200){
            //alert("No Data Found");
        } else {
          console.log("data sms33---->"+JSON.stringify(data));
          var jsonArray=data.objSheduledOfFieldOperatorsControllerDTO;
          $.each(jsonArray, function(i, resData) {
        	//var  location_name=jsonArray[i].location_name;
        	//var  baselocation_name=jsonArray[i].baselocation_name;
        	  wsa_typeofshift=resData.typeof_shift;
        	  desc=resData.user_desc;
        	  shift_starttime=resData.shift_starttime;
        	  shift_endtime=resData.shift_endtime;
        	  allocateddate=resData.allocateddate;
        	  console.log("wsa_typeofshift------>"+desc);
	         
          })
  
  
        }
    }, error: function() {
        console.log('In Error of Get_Employee_Details Details ');
    }
});
}



var htmlDisplayTest;
var startmessg;
var subject;
var displaylegends;
var messagefinal;
var usfname;
var usmname;
var uslname;
var userMailid;
var userphone;
var userModuledesc;
var subject;


function mailTemplate(userid,startdate,enddate){		
 htmlDisplayTest='<table CELLSPACING=0 CELLPADDING=0  BORDER=1  WIDTH=100%><tr><td align="center" bgcolor="#B8EBFF" colspan=8 height="60"><b><font style="font-size: 24pt;">WorkForce Management System</font></b><br></td></tr>'
'<tr><td align="left" colspan=6 bgcolor="#B8EBFF"><font style="color:#F00000"><b>Employee Details</b></font></td><td align="right" colspan=2 bgcolor="#B8EBFF">Generated Date:<font style="color:#F00000"> d</font></td></tr>'
'<tr><td align="center"><font><b>Employee ID</b></font></td><td colspan=1 align="center">'+userid+'</td><td align="center"><b>Employee Name</b></td><td align="center">'+usfname+'</td><td align="center"><b>Department</b></td><td align="center">'+userModuledesc+'</td></tr>'
'<tr><td align="left" colspan=8 bgcolor="#B8EBFF"><font style="color:#F00000"><b>Work Schedule Details</b></font></td></tr>'
'<tr colspan=8 bgcolor="#B8EBFF"><td cellspacing="1" class="innerSubheadings" style="text-align:center;" width="7%">&nbsp;&nbsp;S.No</td>'
'<td cellspacing="1" class="innerSubheadings" style="text-align:center;" width="10%">Allocated Date</td>'
'<td cellspacing="1" class="innerSubheadings" style="text-align:center;" width="10%">Zone</td>'
'<td cellspacing="1" class="innerSubheadings" style="text-align:center;" width="10%">Base Location</td>'
'<td class="innerSubheadings" cellspacing="1" style="text-align:center;" width="10%">Shift Type</td>'
'<td class="innerSubheadings" cellspacing="1" style="text-align:center;" width="10%">Shift Description</td>'
'<td class="innerSubheadings" cellspacing="1" style="text-align:center;" width="10%">Start Time</td>'
'<td cellspacing="1" class="innerSubheadings" style="text-align:center;" width="10%">End Time</td></tr>'
'</table>';

var startmessg='Dear '+usfname+',<br><br> Duty Roster has been Scheduled by : '+usfname+'<br><br>';
subject='Duty Roster for '+usfname+' From Date '+startdate+' To Date '+enddate+' ';
var message ='Dear '+usfname+',<br><br> Duty Roster has been Scheduled by : $rmusername<br><br>';
var displaylegends='<table cellspacing="0" cellpadding="0" class="drContent" border="0"  style="width:100%; border-bottom:rgb(0,0,0) 1pt solid;border-top:rgb(0,0,0) 1pt solid;border-left:rgb(0,0,0) 1pt solid;border-right:rgb(0,0,0) 1pt solid;">';
displaylegends='<td height="20px" class="drContent" align="center" width="1%"><font color="red">Legends</font></td>';

if(shifttype=='D1'){
	displaylegends=displaylegends+'<td class="drContent" align="center" bgcolor="#EEE8AA" width="2%">'+ user_name +'</td>';
}
else if(shifttype=='D2')
{
displaylegends=displaylegends+'<td class="drContent" align="center" bgcolor="#D6D199" width="2%">'+ user_name +'</td>';
}
else if(shifttype=='N1')
{
displaylegends=displaylegends+'<td class="drContent" align="center" bgcolor="#DEB887" width="2%">'+ user_name +'</td>';
} 
else if(shifttype=='N2')
{
displaylegends=displaylegends+'<td class="drContent" align="center" bgcolor="#C8A67A" width="2%">'+ user_name +'</td>';
}
else if(shifttype=='EL')
{
displaylegends=displaylegends+'<td class="drContent" align="center" bgcolor="#FFC0CB" width="2%">'+user_name +'</td>';
} 
else if(shifttype=='SL')
{
displaylegends=displaylegends+'<td height="20px" class="drContent" align="center" bgcolor="#87CEFA" width="2%">'+user_name +'</td>';
}
else if(shifttype=='LOP')
{
displaylegends=displaylegends+'<td height="20px" class="drContent" align="center" bgcolor="#CD5C5C" width="2%">'+ user_name +'</td>';
} 
else if(shifttype=='CO')
{
displaylegends=displaylegends+'<td class="drContent" align="center" bgcolor="#8FBC8F" width="2%">'+user_name +'</td>';
}    
else if(shifttype=='RO')
{
displaylegends=displaylegends+'<td class="drContent" align="center" bgcolor="#669999" width="2%">'+ user_name +'</td></tr>';
}
else if(shifttype=='CL')
{
displaylegends=displaylegends+'<td class="drContent" align="center" bgcolor="#40E0D0" width="2%">'+ user_name +'</td>';
}    
else if(shifttype=='ES')
{
displaylegends=displaylegends+'<td class="drContent" align="center" bgcolor="#BFFF80" width="2%">'+ user_name +'</td>';
}   
else if(shifttype=='TRG')
{
displaylegends=displaylegends+'<td class="drContent" align="center" bgcolor="#E68A8A" width="2%">'+ user_name +'</td>';
} 
else if(shifttype=='U')
{
displaylegends=displaylegends+'<td class="drContent" align="center" bgcolor="#ADD8E6" width="2%">'+ user_name +'</td>';
   '<td class="drContent" align="center" width="2%" bgcolor="#94DBFF">Shift-LS: Leave Status</td>';
}
displaylegends=displaylegends+'</table>';


var htmlTxt1="";
htmlTxt1=htmlTxt1+'<table CELLSPACING=0 CELLPADDING=0  BORDER=1  WIDTH=100%><tr bgcolor=""><td class=drContent align=center width=7%>&nbsp;&nbsp; schCount</td><td class="drContent" align="center" width="10%"><nobr>2019-01-01</td>';
if(location_name="")
{
    htmlTxt1=htmlTxt1+'<td class=drContent align=center width=10%>'+location_name+'</td>';
}
else
{
    htmlTxt1=htmlTxt1+'<td class=drContent align=center width=10%>NA</td>'; 
}
if(base_loc_name!="")
{
    htmlTxt1=htmlTxt1+'<td class=drContent align=center width=10%>'+base_loc_name+'</td>';
}
else
{
    htmlTxt1=htmlTxt1+'<td class=drContent align=center width=10%>NA</td>'; 
}
if(wsa_typeofshift=="H")
{
    htmlTxt1=htmlTxt1+'<td class=drContent align=center bgcolor="#669999" width=10%>RO</td>';
   //echo('<td class=drContent align=center width=10%>RO</td>'); 
}
else
{
    if(wsa_typeofshift=='D1')
        {
       htmlTxt1=htmlTxt1+'<td class="drContent" align="center" bgcolor="#EEE8AA" width="10%">'+wsa_typeofshift+'</td>';
        }
    else if(wsa_typeofshift=='D2')
        {
       htmlTxt1=htmlTxt1+'<td class="drContent" align="center" bgcolor="#D6D199" width="10%">'+wsa_typeofshift+'</td>';
        }    
    else if(wsa_typeofshift=='N1')
        {
       htmlTxt1=htmlTxt1+'<td class="drContent" align="center" bgcolor="#DEB887" width="10%">'+wsa_typeofshift+'</td>';
        } 
    else if(wsa_typeofshift=='N2')
        {
       htmlTxt1=htmlTxt1+'<td class="drContent" align="center" bgcolor="#C8A67A" width="10%">'+wsa_typeofshift+'</td>';
        }    
    else if(wsa_typeofshift=='EL')
        {
       htmlTxt1=htmlTxt1+'<td class="drContent" align="center" bgcolor="#FFC0CB" width="10%">'+wsa_typeofshift+'</td>';
        }    
     else if(wsa_typeofshift=='SL')
    {
    	 htmlTxt1=htmlTxt1+'<td height="20px" class="drContent" align="center" bgcolor="#87CEFA" width="10%">'+wsa_typeofshift+'</td>';
                         }
                        else if(wsa_typeofshift=='LOP')
                            {
                           htmlTxt1=htmlTxt1+'<td height="20px" class="drContent" align="center" bgcolor="#CD5C5C" width="10%">'+wsa_typeofshift+'</td>';
                            }   
                        else if(wsa_typeofshift=='CO')
                            {
                           htmlTxt1=htmlTxt1+'<td class="drContent" align="center" bgcolor="#8FBC8F" width="10%">'+wsa_typeofshift+'</td>';
                            }    
                        else if(wsa_typeofshift=='RO')
                            {
                           htmlTxt1=htmlTxt1+'<td class="drContent" align="center" bgcolor="#669999" width="10%">'+wsa_typeofshift+'</td>';
                            }
                        else if(wsa_typeofshift=='CL')
                            {
                           htmlTxt1=htmlTxt1+'<td class="drContent" align="center" bgcolor="#40E0D0" width="10%">'+wsa_typeofshift+'</td>';
                            }    
                        else if(wsa_typeofshift=='ES')
                            {
                           htmlTxt1=htmlTxt1+'<td class="drContent" align="center" bgcolor="#BFFF80" width="10%">'+wsa_typeofshift+'</td>';
                            }  
                        else if (wsa_typeofshift == 'TRG') {
			htmlTxt1 = htmlTxt1
					+ '<td class="drContent" align="center" bgcolor="#E68A8A" width="10%">'
					+ wsa_typeofshift + '</td>';
		}  
                    else if(wsa_typeofshift=='U')
                        {
                       htmlTxt1=htmlTxt1+'<td class="drContent" align="center" bgcolor="#ADD8E6" width="10%">'+wsa_typeofshift+'</td>';
                        } 
                    //$htmlTxt1=$htmlTxt1.'<td class=drContent align=center width=10%>'.$GetSchedule['wsa_typeofshift'].'</td>';
                  //echo('<td class=drContent align=center width=10%>'.$GetSchedule['wsa_typeofshift'].'</td>');   
                }

if(desc=="Holiday")
{   
    htmlTxt1=htmlTxt1+'<td class=drContent align=center width=10%>Roster Off</td>';

}
else
{
    htmlTxt1=htmlTxt1+'<td class=drContent align=center width=10%>'+desc+'</td>';
 
}
htmlTxt1=htmlTxt1+'<td class=drContent align=center width=10%>'+shift_starttime+'</td>';
'<td class=drContent align=center width=10%>'+shift_endtime+'</td>';

if(modulecount==1) 
{    
  if(vehicleregno=="")
  {
    vNo="NA";
  }
  else
  {
    vNo=0;
  }
  htmlTxt1=htmlTxt1+'<td class=drContent align=left width=8%>'+vNo+'</td>';
   }
  htmlTxt1=htmlTxt1+'</tr></table><br>';
  var loc_complete=htmlTxt1+'</table><br><br>Regards:  <br>rmusername<br>Workforce Management System.';
  messagefinal=startmessg+htmlDisplayTest+loc_complete+displaylegends;

}

var modulecount=1;
var vehicleregno="";
var messagefinal;
var shifttype;
var user_name;
var location_name;
var base_loc_name;
function  getLegendsShiftTypeDetails(){
//	var strUrl = "http://localhost:9160/wfms/ManageResourceController/getLegendsShiftTypeDetails1";//
	var strUrl=Service.getLegendsShiftTypeDetails1;
	$.ajax({
	    type: "GET",
	    url: strUrl,
	    dataType: "json",
	    async: false,
	    crossDomain: true,
	    headers: {
	        "X-TENANT-ID": "PROCREATE"
	    },
	    success: function(data) {
	        var responsecode = data.responseCode;
	       
	        if(responsecode!==200){
	            //alert("No Data Found");
	        } else {
	          console.log("data sms---->"+JSON.stringify(data));	         
	          var jsonArray = data.objPatternsERCControllerDTO;
              $.each(jsonArray, function(i, resData) {
	        	  shifttype=resData.user_shifttype.trim();
	        	  user_name=resData.user_name;
		         
	          })
	  
	  
	        }
	    }, error: function() {
	        console.log('In Error of Get_Employee_Details Details ');
	    }
	});
}

function insertMails(){
//	alert("messagefinal----->"+userMailid);
	 var json_Employee_Details = {         
			   "inboxqueueid":"0",
		        "replyuser":"0",
		        "us_email":userMailid,
		        "subject":subject,
		        "replybody":messagefinal,
		        "actionid":"1",
		        "templateid":"1",
		        "isdeleted":"false",
		        "leave_createdbyid":user_Id,
		        "leave_createdbymoduleid":module_Id,
		        "leave_createdbyroleid":role_Id
};
//var strUrl = "http://localhost:9160/wfms/MyProfileController/insertingMail";//
var strUrl=Service.insertingMail;
$.ajax({
   type: "POST",
   url: strUrl,
   dataType: "json",
   data: JSON.stringify(json_Employee_Details),
   contentType: "application/json",
   async: false,
   crossDomain: true,
   headers: {
       "X-TENANT-ID": "PROCREATE"
   },
   success: function(data) {
       var responsecode = data.responseCode;
      
       if(responsecode!==200){
           //alert("No Data Found");
       } else {
         console.log("data sms---->"+JSON.stringify(data));
   
       }
   }, error: function() {
       console.log('In Error of Get_Employee_Details Details ');
   }
});
}




//------------------------------sms inerting----------------------------
var outputsms1;
var allocatedDate;
function smsDetails(startDate,endDate){
	var allocated_date;
	var startdate=startDate;
	var enddate=endDate;
	var diff=(new Date(enddate))-(new Date(startdate));
	var days=diff/(1000*60*60*24);
	var d = new Date(startdate);
	var i;
	Date.prototype.addDays = function(days) {
	    var date = new Date(this.valueOf());
	    date.setDate(date.getDate() + days);
	    return date;
	}
	for( i=0;i<=days;i++){
		var d2=new Date(d.addDays(i))	
		var day = d2.getDate();
		var month = d2.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
		var year = d2.getFullYear();
		allocatedDate=""+year+"-"+month+"-"+day+"";
	}
		
	var smsTxt1="Shift Schedule Date "+startDate+" to "+endDate+"";
	var smsData1="Start Shift Time"+shift_starttime+" and Shift End Time"+shift_endtime+"";
	var smsMessage=smsTxt1+smsData1;
	
	insertSms(smsMessage);
		
}



function insertSms(smsMessage){
	
		 var json_Employee_Details = {         
			        "message":smsMessage,
			        "to_mobile_no":userphone,
			        "from_mobile_no":"0",
			        "no_of_attempts":"0",
			        "msg_sent_dtm":"now()",
			        "status_id":"1",
			        "leave_createdbyid":user_Id,
			        "leave_createdbymoduleid":module_Id,
			        "leave_createdbyroleid":role_Id,
			        "leave_createddtm":"now()"
	};
	//var strUrl = "http://localhost:9160/wfms/MyProfileController/insertingSms";
	var strUrl=Service.insertingSms;
	$.ajax({
	   type: "POST",
	   url: strUrl,
	   dataType: "json",
	   data: JSON.stringify(json_Employee_Details),
	   contentType: "application/json",
	   async: false,
	   crossDomain: true,
	   headers: {
	       "X-TENANT-ID": "PROCREATE"
	   },
	   success: function(data) {
	       var responsecode = data.responseCode;
	       if(responsecode!==200){
	           //alert("No Data Found");
	       } else {
	    	   showNotificationError('Sucessfully Scheduled', 'submitbtn', 'success');
	    	   setTimeout(function() {
                   window.location.reload();
               }, 3000);
	    	   resetData();
	       }
	   }, error: function() {
	       console.log('In Error of Get_Employee_Details Details ');
	   }
	});
	}


function resetData(){
	$('#zoneid').val("0").trigger("chosen:updated");
	$('#baseloc_id').val("0").trigger("chosen:updated");
	$('#departmentid').val("0").trigger("chosen:updated");
	$("#shiftid").val("0").trigger("chosen:updated");
	$('#patternid').val("0").trigger("chosen:updated");
	$("#sheduleErc_StartDate").val("");
	$("#sheduleErc_endDate").val("");
	$("#sheduleErcDeAssignId").empty();

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
        position: 'top',
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
