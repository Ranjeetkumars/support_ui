/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Check logged in or not if he is not logged in move to login page

var SrpId = 0;
$(document).ready(function() {
    try {
        var data = JSON.parse(localStorage.getItem('Lobject'));
        if (data.responseCode === 200) {
            $.each(data.controllerDTOs, function(i, eachitem) {
                if (eachitem.errorcode == null) {
                    SrpId = eachitem.serviceProviderId;
                } else {
                    window.location.href = "login.html";
                }
            });
        } else {
            window.location.href = "login.html";
        }

        get_Modules_DropDown();
        GetTotalAgentsCount();
        get_User_Segregation_Details();
    } catch (err) {
        window.location.href = "login.html";
    }
});
/*
Numaric valus Characters Validations(allow only numaric valus)
*/
$(".numkeypress").on('keypress', function(event) {
   // var regex = new RegExp("^[a-zA-Z0-9]+$");allow digits and charaters not special charaters
   var regex = new RegExp("^[0-9]+$");
   var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
   if (!regex.test(key)) {
       event.preventDefault();
       return false;
   }
});
/*
 * Page Related onChnage functions calling here
 */
$("#moduleId").change(function() {
    $("#agentsCount").val('').trigger("chosen:updated");
    $("#module_Error").empty();
});

// update_moduleId,update_module_Error,update_agentsCount,update_agentsCount_Error
$("#update_moduleId").change(function() {
    $('#update_module_Error').empty();
});
$('#resestId').click(function() {
    $("#moduleId").val('').trigger("chosen:updated");
    $("#agentsCount").val('').trigger("chosen:updated");

});

$("#update_agentsCount").keypress(function() {
    $('#update_agentsCount_Error').empty();
});


$("#agentsCount").keypress(function() {
    $('#agentsCount_Error').empty();
});

/*
 * For get_Modules_DropDown Purpose
 */
var allmodules;
function get_Modules_DropDown() {
	try{
    var siteid = localStorage.getItem('active_SiteId');
    if (siteid === "0" || siteid === null) {
        siteid = 0;
    } else {
        siteid = siteid;
    }
    var json_siteid = {
        "siteid": siteid
    };
    var strUrl = Service.GetModules;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_siteid),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
               // $("#module_Error").html('No modules available').css('color','red');

            } else {
                var jsonArray = data.siteRegistrationControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var modules = "<option value=" + resData.moduleid + ","+resData.modulename+">" + resData.modulename + "</option>";
                    $(modules).appendTo('#moduleId');
                });
            }
        },
        error: function(err) {
            console
                    .error("Error in get_Modules_DropDown"
                            + JSON.stringify(err));
        }
    });
}catch(err){
	console.log("Error in get_Modules_DropDown"+ err);
	}
}
var dbTotalAgents;



/*
 * For GetTotalAgentsCount Purpose
 */
function GetTotalAgentsCount() {
	try{
    var siteid = localStorage.getItem('active_SiteId');
    var json_totalcount = {
        "sr_siteid": siteid
    };
    var strUrl = Service.GetTotalAgentsCount;
    $
            .ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_totalcount),
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
                        dbTotalAgents = data.count;
                        $('#agents_Count').html(dbTotalAgents);
                        $('#updte_agents_Count').html(dbTotalAgents);
                    }
                },
                error: function(err) {
                    console.error("Error in GetTotalAgentsCount"
                            + JSON.stringify(err));
                }
            });
}catch(err){
	console.log("Error in GetTotalAgentsCount"+ err);
}
}
$("#agentsCount").blur(function(event) {

});

/*
 * Add the count on the screen how many  active agents are there.
 */


function addCount() {
    var moduleId = $('#moduleId').val();
    var bfr_moduleId_Split = moduleId.split(',')
	var st_moduleId = bfr_moduleId_Split[0];
	var st_ModuleName = bfr_moduleId_Split[1];
    if (st_moduleId === "0") {
        $('#module_Error').html('Please select at lease one module').css( 'color', 'red');
        return false;
    }
    var agentsCount = $('#agentsCount').val();
    if (agentsCount === "") {
        $('#agentsCount_Error').html('Please add at lease one agent').css(
                'color', 'red');
        return false;
    }
    var avbl_agents = $("#available_agents_Count").html();
    var addCount = $('#agentsCount').val();
    var total_count1 = parseInt(avbl_agents) - parseInt(addCount);
    if (total_count1 < 0) {
        $('#agentsCount_Error').html('Maximum active agents limit exceed').css('color', 'red');
        $("#agentsCount").val('').trigger("chosen:updated");
       // $('#agentsCount_Error').empty();
        return false;
    } else {
        $("#available_agents_Count").html(total_count1);
    }
    // Insert Function Calling Here
    insert_UserSeregreation_Details();
}

/*
 * For insert_UserSeregreation Purpose
 */
function insert_UserSeregreation_Details() {
	try{
	var siteid = localStorage.getItem('active_SiteId');
    var createdbyid = 1;// Temporary purpose
    var createdbyroleid = 1;// Temporary purpose
    var createdbymoduleid = 1;// Temporary purpose
    var siteID = siteid;// Temporary purpose
    var moduleId = $('#moduleId').val();
    var bfr_moduleId_Split = moduleId.split(',')
	var st_moduleId = bfr_moduleId_Split[0];
	var st_ModuleName = bfr_moduleId_Split[1];
    var agentsCount = $('#agentsCount').val();
    var dbCount = $('#agents_Count').html();

    var json_usrsegretion_Details = {
        "sr_siteid": siteID,
        "sr_total_agents": dbCount,
        "moduleid": st_moduleId,
        "sr_module_wise_agents": agentsCount,
        "sr_createdbyid": createdbyid,
        "sr_createdbymoduleid": createdbymoduleid,
        "sr_createdbyroleid": createdbyroleid
    };
    var JSON_OBJECT = JSON.stringify(json_usrsegretion_Details);
    var strUrl = Service.Insert_User_Segregation_Details;
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_usrsegretion_Details),
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
                $("#sucessId").html(st_ModuleName+" "+'MODULE LICENSE DISTRIBUTION SUCCESFULLY').css('color','green');
                setTimeout(function() {
                	        
                	window.location.reload();
                }, 3000);
            }
        },
        error: function(err) {
            console.error("Error in insert_SiteRegistartion"
                    + JSON.stringify(err));
        }
    });

}catch(err){
	console.log("Error in insert_SiteRegistartion"+ err);
}
}

/*
 * For get_User_Segregation_Details
 */
function get_User_Segregation_Details() {
	try{
    var siteid = localStorage.getItem('active_SiteId');
    // Temporary Purpose
    var json_srgDetails = {
        "sr_siteid": siteid
    };

    var strUrl = Service.GetUserSegregationDetails;
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
            } else {
                var jsonArray = data.siteRegistrationControllerDTO;
                get_User_Segregation_Details_DOM(jsonArray);
            }
        },
        error: function(err) {
            console.log('In Error of  get_User_Segregation_Details ' + err);
        }
    });
}catch(err){
    console.log('In Error of  get_User_Segregation_Details ' + err);
}
}


/*
 * For Show the table data 
 */
function get_User_Segregation_Details_DOM(strData) {
    $('#tableID').empty();
    try {
        var sum = 0;
        for (var i = 0; i < strData.length; i++) {
            // console.log('JSON DATA ----> ' + JSON.stringify(strData));
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
            var agents = strData[i].sr_module_wise_agents;
            sum += parseInt(agents);
            if (agents === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(agents);
            }
            $(tbleRow).append(tablcol3);

            var srxid = strData[i].srxid;
            var siteid = strData[i].siteid;
            var moduleid = strData[i].moduleid;
            var tablcol4 = document.createElement("td");
            $(tbleRow).append(tablcol4);
            var tabiclass1 = document.createElement("i");
            $(tabiclass1).addClass("cursor fas fa-pencil-alt");
            $(tabiclass1).attr('data-toggle', 'tooltip');
            $(tabiclass1).attr('data-placement', 'bottom');
            $(tabiclass1).attr('title', 'Edit');
            $(tabiclass1).attr('style', 'color: #6e8efb');
            $(tabiclass1).attr('onclick', 'get_addCount(' + srxid + ',' + siteid + ',' + moduleid + ',"' + module + '",' + agents + ')');
            tabiclass1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            $(tablcol4).append(tabiclass1);
            var tabiclass2 = document.createElement("i");
            $(tabiclass2).addClass("cursor text-danger fas fa-trash-alt");
            $(tabiclass2).attr('data-toggle', 'tooltip');
            $(tabiclass2).attr('data-placement', 'bottom');

            $(tabiclass2).attr('onclick', 'remove_Segregation_Details(' + srxid + ',' + siteid + ')');
            $(tabiclass2).attr('title', 'Delete');
            $(tablcol4).append(tabiclass2);
            // Appending Body Here
            $("#tableID").append(tbleRow);
        }
        var agents_Count = $("#agents_Count").html();
        var total_Avbl_Agents = agents_Count - sum;
        $("#available_agents_Count").html(total_Avbl_Agents);
        $("#update_maxagents_Count").html(total_Avbl_Agents);
    } catch (err) {
        console.log("modulesId" + err);
    }
}

/*
 * For update the table data calling modal class and load the drop downs
 */
function get_addCount(srxid, siteid, moduleid, module, agents) {
    $('#update_Modal').modal();
    $('#update_moduleId').val(module);
    $("#update_moduleId").prop("disabled", true);
    $('#update_agentsCount').val(agents);
    $('#srxId_Hidden').val(srxid);
    $('#siteID_Hidden').val(siteid);
    $('#moduleID_Hidden').val(moduleid);

}


/*
 * Update the Agent count data
 */
function update_addCount() {
    var srxid = $('#srxId_Hidden').val();
    var siteid = $('#siteID_Hidden').val();
    var update_moduleId = $('#moduleID_Hidden').val();
    if (update_moduleId === "0") {
        $('#update_module_Error').html('Please select at lease one module')
                .css('color', 'red');
        return false;
    }
    var update_agentsCount = $('#update_agentsCount').val();
    if (update_agentsCount === "" || update_agentsCount === "0") {
        $('#update_agentsCount_Error').html('Please add at lease one agent')
                .css('color', 'red');
        return false;
    }
    var update_maxagents_Count = $("#update_maxagents_Count").html();
    var update_agentsCount = $('#update_agentsCount').val();
    var total_count1 = parseInt(update_maxagents_Count)
            - parseInt(update_agentsCount);
    if (total_count1 < 0) {
     //   alert('Total no.of agents not avialable');
        $('#agentsCount_Error').empty();
        $("#agentsCount").val('').trigger("chosen:updated");
        return false;
    } else {
        $("#available_agents_Count").html(total_count1);
    }
    // Insert Function Calling Here

    update_Segregation_Details(srxid, siteid, update_moduleId,update_agentsCount);

}


/*
 * Update the module id and agents count data.
 */
function update_Segregation_Details(srxid, siteid, moduleid, agents) {

	try{
    var srxid = srxid;
    var sr_siteid = siteid;
    var moduleid = moduleid;
    var agents = agents;
    var json_srgDetails = {
        "srxid": srxid,
        "sr_siteid": sr_siteid,
        "moduleid": moduleid,
        "sr_module_wise_agents": agents
    };

    var strUrl = Service.UpdateUserSegregationDetails;
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
            //    alert('NO DATA FOUND');
            } else {
                $("#update_agentsCount_Error").html('Updated Succesfully').css(
                        'color', 'green');
                setTimeout(function() {
                    window.location.reload();
                }, 3000);
            }
        },
        error: function(err) {
            console.log('In Error of  get_User_Segregation_Details ' + err);
        }
    });
}catch(err){
    console.log('In Error of  get_User_Segregation_Details ' + err);
}
}



/*
 * Delete the Module Licence Districbution data.
 */
function remove_Segregation_Details(srxid, siteid) {
	try{
    var cnfrm = confirm("Do you want to remove!");
    if (cnfrm === true) {
        var srxid = srxid;
        var sr_siteid = siteid;
        var isactive = "false";
        var json_srgDetails = {
            "srxid": srxid,
            "sr_siteid": sr_siteid,
            "isactive": isactive
        };

        var strUrl = Service.UpdateUserSegregationStatus;
        $
                .ajax({
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
                            $("#sucessId").html('Removed Succesfully').css(
                                    'color', 'green');
                           
                            setTimeout(function() {
                                window.location.reload();
                            }, 3000);
                        }
                    },
                    error: function(err) {
                        console
                                .log('In Error of  get_User_Segregation_Details '
                                        + err);
                    }
                });
    } else {
    }

}catch(err){
	 console.log('In Error of  get_User_Segregation_Details ' + err);}

}
