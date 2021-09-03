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
    get_All_Modules_Details();


    /*
     Module Name Characters Validations
     */
    $("#module_Name").keypress(function(event) {
        var inputValue = event.charCode;
        if (!(inputValue >= 65 && inputValue <= 120) && (inputValue !== 32 && inputValue !== 0)) {
            event.preventDefault();
        }
        $('#module_Name_Error').empty();
    });
    var text_max = 50;
    $('#module_Name_feedback').html(text_max + ' characters remaining');
    $('#module_Name').keyup(function() {
        var text_length = $('#module_Name').val().length;
        var text_remaining = text_max - text_length;
        $('#module_Name_feedback').html(text_remaining + ' characters remaining');
    });


    /*
     Module Name Characters Validations
     */
    $("#module_Description").keypress(function(event) {
        var inputValue = event.charCode;
        if (!(inputValue >= 65 && inputValue <= 120) && (inputValue !== 32 && inputValue !== 0)) {
            event.preventDefault();
        }
        $('#module_Description_Error').empty();
    });
    var text_max = 50;
    $('#module_Description_feedback').html(text_max + ' characters remaining');
    $('#module_Description').keyup(function() {
        var text_length = $('#module_Description').val().length;
        var text_remaining = text_max - text_length;
        $('#module_Description_feedback').html(text_remaining + ' characters remaining');
    });
});


/*
 * For insert_Module_Details Purpose
 */
function insert_Module_Details() {
    try {
        var createdbyid = 1;// Temporary purpose
        var createdbyroleid = 1;// Temporary purpose
        var createdbymoduleid = 1;// Temporary purpose
        var module_Name = $('#module_Name').val();
        if (module_Name === '' || module_Name === "0" || module_Name === undefined) {
            $('#module_Name_Error').html('Please enter module name').css('color', 'red');
            return false;
        }
        var module_Description = $('#module_Description').val();
        if (module_Description === '' || module_Description === "0" || module_Description === undefined) {
            $('#module_Description_Error').html('Please enter module discription').css('color', 'red');
            return false;
        }

        var json_Module_Details = {
            "moduleName": module_Name,
            "mo_desc": "E-commerece1",
            "mo_CreatedbyId": createdbyid,
            "mo_CreatedbyModuleId": createdbymoduleid,
            "mo_CreatedbyRoleId": createdbyroleid
        };
        var JSON_OBJECT = JSON.stringify(json_Module_Details);
        var strUrl = Service.InsertModuleDetails;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_Module_Details),
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
                    $("#module_sucessId").html('Inserted Succesfully').css('color', 'green');
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

    } catch (err) {
        console.log("Error in insert_SiteRegistartion" + err);
    }
}

/*
 For GetAllModulesDetails
 */
function get_All_Modules_Details() {
    try {

        var strUrl = Service.GetAllModulesDetails;
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
                    var jsonArray = data.modulesControllerDTO;
                    get_All_Modules_Details_DOM(jsonArray);
                }
            }, error: function(err) {
                console.log('In Error of  get_All_Modules_Details_DOM ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  get_All_Modules_Details_DOM ' + err);
    }
}


function get_All_Modules_Details_DOM(strData) {
    $('#moduleTableId').empty();
    try {
        var sum = 0;
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var moduleName = strData[i].moduleName;
            if (moduleName === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(moduleName);
            }
            $(tbleRow).append(tablcol2);

            var moduleId = strData[i].moduleId;
            var tablcol3 = document.createElement("td");
            var mo_isactive = strData[i].mo_isactive;
            if (mo_isactive === "false") {
                mo_isactive = "In Active";
                $(tablcol3).attr('style', 'color: red;');
            } else if (mo_isactive === "true") {
                mo_isactive = "Active";
                $(tablcol3).attr('style', 'color: blue;');

            }
            if (mo_isactive === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(mo_isactive);
            }
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            var deleteicon = document.createElement("i");
            $(deleteicon).addClass("f205 fas fa-toggle-on");
            $(deleteicon).attr('data-toggle', 'tooltip');
            $(deleteicon).attr('style', 'font-size: 26px; color: #7c2be2;');
            $(deleteicon).attr('data-placement', 'bottom');
            var showStatus = mo_isactive;
            if (showStatus === "Active") {
                showStatus = "In Active";
            } else if (showStatus === "In Active") {
                showStatus = "Active";
            }
            $(deleteicon).attr('onclick', 'update_Module_Status(' + moduleId + ',"' + mo_isactive + '","' + showStatus + '")');
            $(deleteicon).attr('title', showStatus);
            $(tablcol4).append(deleteicon);
            $(tbleRow).append(tablcol4);
            //Appending Body Here
            $("#moduleTableId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_All_Modules_Details_DOM ERROR" + err);
    }
}
function update_Module_Status(moduleId, mo_isactive, showStatus) {
    try {
        if (mo_isactive === "In Active") {
            mo_isactive = "true";
        } else if (mo_isactive === "Active") {
            mo_isactive = "false";
        }
        var cnfrm = confirm("Do you want to update status!");
        if (cnfrm === true) {
            var moduleId = moduleId;
            var mo_isactive = mo_isactive;
            var json_up_status = {
                "moduleId": moduleId,
                "mo_isactive": mo_isactive
            };

            var strUrl = Service.UpdateModuleStatus;
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
                        $("#md_updateId").html('Module' + " " + showStatus + " " + 'Succesfully').css('color', 'green');
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
        console.log('In Error of  update_Sites_Status ' + err);
    }

}

