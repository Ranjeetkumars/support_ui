/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
	
	 try {
			var data = JSON.parse(localStorage.getItem('Lobject'));
			if (data.responseCode === 200) {
				$.each(data.controllerDTOs, function(i, eachitem) {
					if (eachitem.errorcode == null) {

					} else {
						window.location.href = "login.html";
					}
				});
			} else {
				window.location.href = "login.html";
			}
		
		} catch (err) {
			window.location.href = "login.html";
		}
		    usersDropdown();
    get_ModulesMapping_Details();
});
/*
 * onchange funcations
 */
$("#update_userId").change(function() {
    $('#update_username_error').empty();
});
$("#update_moduleId").change(function() {
    $('#update_module_Error').empty();
});
$("#mp_ModuleId").change(function() {
    $('#moduleId_Error').empty();
});
$("#userId").change(function() {
    $('#userId_Error').empty();
});


$('#userId').change(function() {
    var userId = $('#userId').val();
    var siteId = localStorage.getItem('active_SiteId');
    if (userId === "0") {
        alert('please select user ');
        return false;
    } else {
        get_Modules_DropDown(userId,siteId);
    }

});


$('#update_userId').change(function() {
    var userId = $('#update_userId').val();
    if (userId === "0") {
        alert('please select user ');
        return false;
    } else {
        get_Modules_DropDown(userId);
    }

});

/*
 For get_Modules_DropDown Purpose
 */
function get_Modules_DropDown(userId,siteId) {
	try{
	$('#mp_ModuleId').empty();
	//$('#update_moduleId').empty();
	 var json_moduleid = {
        "userId": userId,
        "siteId":siteId
    };
    var strUrl = Service.getModulesBasedOnUser;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_moduleid),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            	 $('#moduleId').focus();
                 $('#moduleId_Error').html('No Modules mapped with this User').css('color', 'red');
            } else {
                var jsonArray = data.controllerDTOs;
                $('#mp_ModuleId').append('<option value="0">Select Module</option>');
                $.each(jsonArray, function(i, resData) {
                    var modules = "<option value=" + resData.moduleId + "," + resData.moduleName + ">" + resData.moduleName + "</option>";
                    $('#mp_ModuleId').append(modules);
                    $('#update_moduleId').append(modules);
                   
                });
            }
        },
        error: function(err) {
            console.error("Error in get_Modules_DropDown" + JSON.stringify(err));
        }
    });
    $('#mp_ModuleId').trigger("chosen:updated");
    $('#mp_ModuleId').chosen();
    $('#update_moduleId').trigger("chosen:updated");
    $('#update_moduleId').chosen();
   
}catch(err){
    console.log("Error in get_Modules_DropDown" + err);
}
}
/*
 *@DESC : Check User is already exist or not 
 *@AuthorName : Bharath
 *@DATE : 20-11-2019
 */
function usersDropdown() {
	try{
		var siteid = localStorage.getItem('active_SiteId');
    var siteDetails = {
        siteId: siteid

    };

    var strUrl = Service.usersDropdown;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(siteDetails),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {

            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            } else {
            	 var jsonArray = data.controllerDTOs;
                 $.each(jsonArray, function(i, resData){
	                        var userslist = "<option value=" + resData.userId + ">" + resData.userName + "</option>";
	                        $(userslist).appendTo('#userId');
	                        $(userslist).appendTo('#update_userId');
	                    });
	                }
	            },
	            error: function(err) {
	                console.error("Error in username"
	                        + JSON.stringify(err));
	            }
	        });
	    } catch (err) {
	        console.error('Error in getUsernames()' + err);
	    }
}
/*
 For insert_UserSeregreation Purpose
 */
function insert_ModulesSeregreation_Details() {
try{
    var createdbyid = 1;
    var createdbyroleid = 1;
    var createdbymoduleid = 1;
    var userId = $('#userId').val();

    if (userId === '' || userId === "0" || userId === undefined) {
        $('#userId').focus();
        $('#userId_Error').html('Please select User').css('color', 'red');
        return false;
    }
    var moduleId = $('#mp_ModuleId').val();
    var bfr_moduleId_Split = moduleId.split(',')
	var st_moduleId = bfr_moduleId_Split[0];
	var st_ModuleName = bfr_moduleId_Split[1];
    if (st_moduleId === '' || st_moduleId === "0" || st_moduleId === undefined) {
        $('#moduleId').focus();
        $('#moduleId_Error').html('Please select Module').css('color', 'red');
        return false;
    }
    var isactivestatus = true;
    var json_Modulessegretion_Details = {
        userId: userId,
        moduleId: st_moduleId,
        createdByUserId: createdbyid,
        createdByRoleId: createdbyroleid,
        createdByModuleId: createdbymoduleid,
        isActive: isactivestatus

    };
    var JSON_OBJECT = JSON.stringify(json_Modulessegretion_Details);
    var strUrl = Service.saveModuelMappingDateails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Modulessegretion_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            
            }
            else {
                $("#sucessId").html(st_ModuleName+" "+'Module Mapping Succesfully').css('color', 'green');
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
            }
        },
        error: function(err) {
            console.error("Error in insert_SiteRegistartion" + JSON.stringify(err));
        }
    });
}catch(err){
    console.log("Error in insert_SiteRegistartion" +err);
}
}

/*
 For get_ModulesMapping_Details
 */
function get_ModulesMapping_Details() {
	try{
	var siteid = localStorage.getItem('active_SiteId');
    var json_modules_Details = {
        "siteId": siteid
    };
    var strUrl = Service.Get_Modules_Mapping_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_modules_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (responsecode !== 200) {
            } else {
                var jsonArray = data.controllerDTOs;
                get_ModulesMapping_Details_DOM(jsonArray);

            }
        }, error: function(err) {
            console.log('In Error of  get_ModulesMapping_Details ' + err);
        }
    });
}catch(err){
console.log('In Error of  get_ModulesMapping_Details ' + err);
}
}


function get_ModulesMapping_Details_DOM(strData) {
	$('#tableID').empty();
    try {

        var sum = 0;
        for (var i = 0; i < strData.length; i++) {
            //  console.log('JSON DATA ----> ' + JSON.stringify(strData));
            var index = i + 1;

            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var userName = strData[i].userName;
            if (userName === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(userName);
            }
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            var agents = strData[i].moduleName;
            sum += parseInt(agents);
            if (agents === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(agents);
            }
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");

            $(tbleRow).append(tablcol4);

//            var tabiclass1 = document.createElement("i");
//            $(tabiclass1).addClass("cursor fas fa-pencil-alt");
//            $(tabiclass1).attr('data-toggle', 'tooltip');
//            $(tabiclass1).attr('data-placement', 'bottom');
//            $(tabiclass1).attr('title', 'Edit');
//            $(tabiclass1).attr('style', 'color: #6e8efb');
//            $(tabiclass1).attr('onclick', 'get_UpdateForm(' + strData[i].userId + ',' + strData[i].moduleId + ')');
//            tabiclass1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
//            $(tablcol4).append(tabiclass1);

            var tabiclass2 = document.createElement("i");
            $(tabiclass2).addClass("cursor text-danger fas fa-trash-alt");
            $(tabiclass2).attr('data-toggle', 'tooltip');
            $(tabiclass2).attr('data-placement', 'bottom');

            $(tabiclass2).attr('onclick', 'delete_MappingDetails(' + strData[i].userId + ',' + strData[i].moduleId + ')');
            $(tabiclass2).attr('title', 'Delete');
            $(tablcol4).append(tabiclass2);
            //Appending Body Here
            $("#tableID").append(tbleRow);
        }

    } catch (err) {
        console.log("get_ModulesMapping_Details_DOM" + err);
    }
}


function get_UpdateForm(userId, moduleId) {
    $('#update_Modall').modal();
   // $("#update_userId").prop("disabled", true).trigger("chosen:updated");
    $("#update_userId").prop("readonly", true).trigger("chosen:updated");
    $('#update_userId').val(userId).trigger("chosen:updated");
    $('#update_moduleId').val(moduleId).trigger("chosen:updated");
    }
function update_ModuleMapping() {

    var update_UserModule = $('#update_userId').val();
    if (update_UserModule === "" || update_UserModule === "0") {
        $('#update_username_error').html('Please add at least one User').css('color', 'red');
        return  false;
    }
    var update_moduleId = $('#update_moduleId').val();
    if (update_moduleId === "0") {
        $('#update_module_Error').html('Please select at least one Module').css('color', 'red');
        return  false;
    }

    editbtnaction(update_UserModule, update_moduleId);
}

function editbtnaction(userId, moduleId) {
	try{
    var userId = userId;
    var moduleId = moduleId;
    var isactive = "true";
    var json_srgDetails = {
        userId: userId,
        moduleId: moduleId,
        isActive: isactive
    };

    var strUrl = Service.updateModulesBasedOnUserDetails;
//    console.log("======updateModulesBasedOnUserDetails url"+strUrl);
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_srgDetails),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (responsecode !== 200) {
           //     alert('NO DATA FOUND');
            } else {
                $("#update_module_Error").html('Updated Succesfully').css('color', 'green');
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
            }
        }, error: function(err) {
            console.log('In Error of  get_User_Segregation_Details ' + err);
        }
    });
}catch(err){
    console.log('In Error of  get_User_Segregation_Details ' + err);
}

}
function delete_MappingDetails(userId, moduleId) {
	try{
    var cnfrm = confirm("Do you want to remove!");
    if (cnfrm === true) {
        var userId = userId;
        var moduleId = moduleId;
        var isactive = "false";
        var json_srgDetails = {
            userId: userId,
            moduleId: moduleId,
            isActive: isactive
        };

        var strUrl = Service.deleteModulesSegregationDetails;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_srgDetails),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
                "X-TENANT-ID": "PROCREATE"
            },
            success: function(data) {
                var responsecode = data.responseCode;
                if (responsecode !== 200) {
              //      alert('NO DATA FOUND');
                } else {

                    $("#removeId").html('Removed Succesfully').css('color', 'green');
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                }
            }, error: function(err) {
                console.log('In Error of  get_User_Segregation_Details ' + err);
            }
        });
    } else {
    }
	}catch(err){
        console.log('In Error of  get_User_Segregation_Details ' + err);
	}
}
/*
 * for reset dropdown
 */
function resetButton() {
    $('#userId').val('0').trigger('chosen:updated');
    $('#mp_ModuleId').val('0').trigger('chosen:updated');

}