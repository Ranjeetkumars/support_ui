
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
    //loading dropdowns:
    get_CTIModulesMappwithUser_Details();
    get_Modules_DropDownBasedOnSergration();
    
});
/*
 * onchange funcations
 */
$("#cti_ctiuserid").change(function() {
    $('#cti_ctiuser_Error').empty();
});
$("#cit_moduleuserId").change(function() {
    $('#cit_moduleuser_Error').empty();
});
$("#cti_moduleId").change(function() {
    $('#cti_module_Error').empty();
});

/*
 * Based on Moduel select load the users 
 */
$('#cti_moduleId').change(function() {
    var moduleId = $('#cti_moduleId').val();
    var siteId = localStorage.getItem('active_SiteId');
    if (moduleId === "0") {
        alert('please select user ');
        return false;
    } else {
        get_Users_DropDownBasedOnModules(siteId, moduleId);
    }

});

/*
 * Based on Module select load the CTI users 
 */
$('#cti_moduleId').change(function() {
    var moduleId = $('#cti_moduleId').val();
    var siteId = localStorage.getItem('active_SiteId');
    if (moduleId === "0") {
        alert('please select user ');
        return false;
    } else {
    	get_Users_DropDownBasedOnCTIUsers(siteId, moduleId);
    }

});

/*
 For get_Modules_Based on users Sergration with site id
 */
function get_Modules_DropDownBasedOnSergration() {
    try{
	var siteId = localStorage.getItem('active_SiteId');
    var json_moduleid = {
        "siteId": siteId
    };
    var strUrl = Service.GetSegregationModulesDetails;
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
                $('#cti_moduleId').focus();
                $('#cti_module_Error').html('Please select module').css('color', 'red');
            } else {
                var jsonArray = data.cticontrollerDTOs;
                $.each(jsonArray, function(i, resData) {
                    var modules = "<option value=" + resData.moduleId + ">" + resData.moduleName + "</option>";
                    $('#cti_moduleId').append(modules);
                });
            }
        },
        error: function(err) {
            console.error("Error in get_Modules_DropDownBasedOnSergration" + JSON.stringify(err));
        }
    });
 }catch(err){
     console.log("Error in get_Modules_DropDownBasedOnSergration" + err);
 }
}

/*
 For get_Modules_Based on modules with site id
 */
function  get_Users_DropDownBasedOnModules(siteId, moduleId) {
    try{
	$('#cit_moduleuserId').empty();
	//$('#update_moduleId').empty();
	var json_Users_DropDown_moduleid = {
        "siteId": siteId,
        "moduleId":moduleId
    };
    var strUrl = Service.ctiUserBasedOnModuleDropdown;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_Users_DropDown_moduleid),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            	  $('#cit_moduleuserId').focus();
                $('#cit_moduleuser_Error').html('No Users mapped with this module').css('color', 'red');
            } else {
                var jsonArray = data.controllerDTOs;
                $('#cit_moduleuserId').append('<option value="0">Please select user</option>');
                $.each(jsonArray, function(i, resData) {
                    var modules = "<option value=" + resData.ctiUserIdBasedOnModule + ">" + resData.ctiUserNameBasedOnModule + "</option>";
                    $('#cit_moduleuserId').append(modules);
                 });
            }
        },
        error: function(err) {
            console.error("Error in get_Users_DropDownBasedOnModules" + JSON.stringify(err));
        }
    });
    $('#cit_moduleuserId').trigger("chosen:updated");
    $('#cit_moduleuserId').chosen();

  
}catch(err){
    console.log("Error in get_Users_DropDownBasedOnModules" +err);
}
}


/*
 For get_Modules_Based on CTI users with site id,moduleid
 */
function get_Users_DropDownBasedOnCTIUsers(siteId, moduleId) {
	try{
	$('#cti_ctiuserid').empty();
	
	 var json_cti_usersbasedonmoduleid = {
        "siteId": siteId,
        "moduleId":moduleId
    };
    var strUrl = Service.ctiUserDropdown;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_cti_usersbasedonmoduleid),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            	 $('#cti_ctiuserid').focus();
                 $('#cti_ctiuser_Error').html('No CTI-User mapped with this Module').css('color', 'red');
            } else {
                var jsonArray = data.controllerDTOs;
                $('#cti_ctiuserid').append('<option value="0">Please select cti-user</option>');
                $.each(jsonArray, function(i, resData) {
                    var modules = "<option value=" + resData.ctiUserId + ">" + resData.ctiUserName + "</option>";
                    $('#cti_ctiuserid').append(modules);
                   
                   
                });
            }
        },
        error: function(err) {
            console.error("Error in get_Users_DropDownBasedOnCTIUsers" + JSON.stringify(err));
        }
    });
    $('#cti_ctiuserid').trigger("chosen:updated");
    $('#cti_ctiuserid').chosen();
 	
}catch(err){
    console.log("Error in get_Users_DropDownBasedOnCTIUsers" + err);
}
}
/*
 *@DESC : Check User is already exist or not 
 *@AuthorName : Bharath
 *@DATE : 20-11-2019
 */
function insertModuleMappingWithCTIUsersData() {
try{
	var moduleId = $("#cti_moduleId").val();
    if (moduleId === '' || moduleId === "0" || moduleId === undefined) {
        $('#cti_moduleId').focus();
        $('#cti_module_Error').html('Please select module').css('color', 'red');
        return false;
    }
    var userModuleId = $("#cit_moduleuserId").val();
    if (userModuleId === '' || userModuleId === "0" || userModuleId === undefined) {
        $('#cit_moduleuserId').focus();
        $('#cit_moduleuser_Error').html('Please select user').css('color', 'red');
        return false;
    }
    var ctiUserId = $("#cti_ctiuserid").val();
    if (ctiUserId === '' || ctiUserId === "0" || ctiUserId === undefined) {
        $('#cti_ctiuserid').focus();
        $('#cti_ctiuser_Error').html('Please select cti-user').css('color', 'red');
        return false;
    }
    var siteId = localStorage.getItem('active_SiteId');
    var createdByuserId = 1;
    var createdByModuleId = 1;
    var createdByRoleId = 1;
    var centerId = 1;
    var nodeId = 1;

    var obj_Insert = {
        userId: userModuleId,
        moduleId: moduleId,
        cctUserId: ctiUserId,
        createdByuserId: createdByuserId,
        createdByModuleId: createdByModuleId,
        createdByRoleId: createdByRoleId,
        centerId: centerId,
        nodeId: nodeId,
        siteId: siteId

    };
    var strUrl = Service.saveCTIUserModuleMappingDetails;
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
            }
            else {
                $("#mappingsucessId").html('Telephony User Mapping Succesfully').css('color', 'green');
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
            }
        },
        error: function(err) {
            console.log("Error In insertModuleMappingWithCTIUsersData Not Inserted"+err);
        }
    });

}catch(err){
    console.log("Error In insertModuleMappingWithCTIUsersData Not Inserted"+err);
}
}

/*
 For get_ModulesMapping_Details
 */
function get_CTIModulesMappwithUser_Details() {
    try{
	var siteid = localStorage.getItem('active_SiteId');
    var json_CTIMappingmodules_Details = {
        "siteId": siteid
    };
    var strUrl = Service.getCTIUserModuleMappingDetails;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_CTIMappingmodules_Details),
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
                get_CTIModulesMappwithUser_DOM(jsonArray);
            }
        }, error: function(err) {
            console.log('In Error of  get_CTIModulesMappwithUser_Details ' + err);
        }
    });
}catch(err){
    console.log('In Error of  get_CTIModulesMappwithUser_Details ' + err);
}
}

function get_CTIModulesMappwithUser_DOM(strData) {
    $('#ctiTableID').empty();
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
            var module = strData[i].modulename;
            if (module === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(module);
            }
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            var agents = strData[i].username;
            if (agents === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(agents);
            }
            $(tbleRow).append(tablcol3);



            var tablcol4 = document.createElement("td");
            var ctiagents = strData[i].cctUsername;
            if (ctiagents === "NA") {
                $(tablcol4).html('Not Found');
            } else {
                $(tablcol4).html(ctiagents);
            }
            $(tbleRow).append(tablcol4);
            var tablcol5 = document.createElement("td");

            $(tbleRow).append(tablcol5);
            var tabiclass2 = document.createElement("i");
            $(tabiclass2).addClass("cursor text-danger fas fa-trash-alt");
            $(tabiclass2).attr('data-toggle', 'tooltip');
            $(tabiclass2).attr('data-placement', 'bottom');
            $(tabiclass2).attr('onclick','delete_CtiMappingDetails(' + strData[i].userId + ',' + strData[i].moduleId + ',' + strData[i].cctUserId + ')');
            $(tabiclass2).attr('title', 'Delete');
            $(tablcol5).append(tabiclass2);
            //Appending Body Here
            $("#ctiTableID").append(tbleRow);
        }

    } catch (err) {
        console.log("============get_CTIModulesMappwithUser_DOM===========" + err);
    }
}


function delete_CtiMappingDetails(userId,moduleId,cctuserId) {
    try{
	var cnfrm = confirm("Do you want to remove!");
    if (cnfrm === true) {
        var userId = userId;
        var moduleId = moduleId;
        var cctuserId = cctuserId;
        var status = "false";
        var json_srgDetails = {
            userId: userId,
            moduleId: moduleId,
            cctUserId: cctuserId,
            status: status
 };

        var strUrl = Service.deleteCTIUserModuleMappingDetails;
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
                    $("#mappingsucessId").html('Removed Succesfully').css('color', 'green');
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                }
            }, error: function(err) {
                console.log('In Error of  delete_MappingDetails ' + err);
            }
        });
    } else {
    }

}catch(err){
    console.log('In Error of  delete_CtiMappingDetails ' + err);
}
}

/*
 * for reset dropdown
 */
function ctiModuleMapresetbtn() {
    $('#cti_ctiuserid').val('0').trigger('chosen:updated');
    $('#cit_moduleuserId').val('0').trigger('chosen:updated');
    $('#cti_moduleId').val('0').trigger('chosen:updated');


}