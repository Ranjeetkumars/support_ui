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
					SrpId = eachitem.serviceProviderId;
					Username = eachitem.username;
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
    get_All_Roles_Details();
    get_Modules_DropDown();


    /*
     Module Name Characters Validations
     */
    $("#role_Name").keypress(function(event) {
        var inputValue = event.charCode;
        if (!(inputValue >= 65 && inputValue <= 120) && (inputValue !== 32 && inputValue !== 0)) {
            event.preventDefault();
        }
        $('#role_Name_Error').empty();
    });
    var text_max = 50;
    $('#role_Name_feedback').html(text_max + ' characters remaining');
    $('#role_Name').keyup(function() {
        var text_length = $('#role_Name').val().length;
        var text_remaining = text_max - text_length;
        $('#role_Name_feedback').html(text_remaining + ' characters remaining');
    });


    /*
     Module Name Characters Validations
     */
    $("#role_Description").keypress(function(event) {
        var inputValue = event.charCode;
        if (!(inputValue >= 65 && inputValue <= 120) && (inputValue !== 32 && inputValue !== 0)) {
            event.preventDefault();
        }
        $('#role_Description_Error').empty();
    });
    var text_max = 50;
    $('#role_Description_feedback').html(text_max + ' characters remaining');
    $('#role_Description').keyup(function() {
        var text_length = $('#role_Description').val().length;
        var text_remaining = text_max - text_length;
        $('#role_Description_feedback').html(text_remaining + ' characters remaining');
    });
});

$("#roleId").change(function(event) {
    $('#roleId_Error').empty();
});

/*
 * Page Related onChnage functions calling here
 */
$("#resetId").click(function() {
    $("#roleId").val('').trigger("chosen:updated");
});
/*
 * For get_Modules_DropDown Purpose
 */
function get_Modules_DropDown() {
    try {
        var siteid = 0;

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
                    // $("#roleId_Error").html('No modules available').css('color','red');

                } else {
                    var jsonArray = data.siteRegistrationControllerDTO;
                    $.each(jsonArray, function(i, resData) {
                        var modules = "<option value=" + resData.moduleid + ">"
                                + resData.modulename + "</option>";
                        $(modules).appendTo('#roleId');
                    });
                }
            },
            error: function(err) {
                console
                        .error("Error in get_Modules_DropDown"
                                + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.log("Error in get_Modules_DropDown" + err);
    }
}
/*
 * For insert_Roles_Details Purpose
 */
function insert_Roles_Details() {
    try {
        var createdbyid = 1;// Temporary purpose
        var createdbyroleid = 1;// Temporary purpose
        var createdbymoduleid = 1;// Temporary purpose
        var roleId = $('#roleId').val();
        if (roleId === '' || roleId === "0" || roleId === undefined) {
            $('#roleId_Error').html('Please select module').css('color', 'red');
            return false;
        }
        var role_Name = $('#role_Name').val();
        if (role_Name === '' || role_Name === "0" || role_Name === undefined) {
            $('#role_Name_Error').html('Please enter role name').css('color', 'red');
            return false;
        }
        var role_Description = $('#role_Description').val();
        if (role_Description === '' || role_Description === "0" || role_Description === undefined) {
            $('#role_Description_Error').html('Please enter role discription').css('color', 'red');
            return false;
        }

        var json_Role_Details = {
            "rl_rolename": role_Name,
            "rl_desc": role_Description,
            "rl_moduleid": roleId,
            "rl_createdbyid": createdbyid,
            "rl_createdbyroleid": createdbyroleid,
            "rl_rl_createdbymoduleid": createdbymoduleid
        };
        var strUrl = Service.InsertRolesDetails;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_Role_Details),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
                "X-TENANT-ID": "PROCREATE"
            },
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                    alert("No Data Found");
                } else {
                    $("#rolele_sucessId").html('Inserted Succesfully').css('color', 'green');
                    setTimeout(function() {
                        window.location.reload();
                    }, 3000);
                }
            },
            error: function(err) {
                console.error("Error in insert_Roles_Details" + JSON.stringify(err));
            }
        });

    } catch (err) {
        console.log("Error in insert_Roles_Details" + err);
    }
}

/*
 For get_All_Roles_Details
 */
function get_All_Roles_Details() {
    try {

        var strUrl = Service.GetAllRolesDetails;
        $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
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
                    var jsonArray = data.rolesControllerDTO;
                    get_All_Roles_Details_DOM(jsonArray);
                }
            }, error: function(err) {
                console.log('In Error of  get_All_Roles_Details ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  get_All_Roles_Details ' + err);
    }
}


function get_All_Roles_Details_DOM(strData) {
    $('#rolesTableId').empty();
    try {
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var rl_modulename = strData[i].rl_modulename;
            if (rl_modulename === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(rl_modulename);
            }
            $(tbleRow).append(tablcol2);


            var tablcol3 = document.createElement("td");
            var rl_rolename = strData[i].rl_rolename;
            if (rl_rolename === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(rl_rolename);
            }
            $(tbleRow).append(tablcol3);

            var rl_roleid = strData[i].rl_roleid;
            var tablcol3 = document.createElement("td");
            var rl_isactive = strData[i].rl_isactive;
            if (rl_isactive === "false") {
                rl_isactive = "In Active";
                 $(tablcol3).attr('style','color: red;');
            } else if (rl_isactive === "true") {
                rl_isactive = "Active";
                $(tablcol3).attr('style','color: blue;');
            }
            if (rl_isactive === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(rl_isactive);
            }
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            var deleteicon = document.createElement("i");
            $(deleteicon).addClass("f205 fas fa-toggle-on");
            $(deleteicon).attr('data-toggle', 'tooltip');
            $(deleteicon).attr('style', 'font-size: 26px; color: #7c2be2;');
            $(deleteicon).attr('data-placement', 'bottom');
            var showStatus = rl_isactive;
            if (showStatus === "Active") {
                showStatus = "In Active";
            } else if (showStatus === "In Active") {
                showStatus = "Active";
            }
            $(deleteicon).attr('onclick', 'update_Roles_Status(' + rl_roleid + ',"' + rl_isactive + '","' + showStatus + '")');
            $(deleteicon).attr('title', showStatus);
            $(tablcol4).append(deleteicon);
            $(tbleRow).append(tablcol4);
            //Appending Body Here
            $("#rolesTableId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_All_Roles_Details_DOM ERROR" + err);
    }
}
function update_Roles_Status(rl_roleid, rl_isactive, showStatus) {
    try {
        if (rl_isactive === "In Active") {
            rl_isactive = "true";
        } else if (rl_isactive === "Active") {
            rl_isactive = "false";
        }
        var cnfrm = confirm("Do you want to update status!");
        if (cnfrm === true) {
            var rl_roleid = rl_roleid;
            var rl_isactive = rl_isactive;
            var json_up_status = {
                "rl_roleid": rl_roleid,
                "rl_isactive": rl_isactive
            };

            var strUrl = Service.UpdateRolesStatus;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_up_status),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                headers: {
                    "X-TENANT-ID": "PROCREATE"
                },
                success: function(data) {
                    var responsecode = data.responseCode;
                    if (responsecode !== 200) {
                        alert('NO DATA FOUND');
                    } else {
                        if (showStatus === "Active") {
                            showStatus = " Activated";
                        } else if (showStatus === "In Active") {
                            showStatus = "In Activated";
                        }
                        $("#rl_updateId").html('Role' + " " + showStatus + " " + 'Succesfully').css('color', 'green');
                        setTimeout(function() {
                            window.location.reload();
                        }, 3000);
                    }
                },
                error: function(err) {
                    console.log('In Error of  update_Module_Status ' + err);
                }
            });
        } else {
        }

    } catch (err) {
        console.log('In Error of  update_Module_Status ' + err);
    }

}

