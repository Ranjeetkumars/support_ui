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
                if (eachitem.errorcode === null) {
                    SrpId = eachitem.serviceProviderId;

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
    get_Seg_Modules_DropDown();
    get_Center_Details();
    get_CTI_Users_Details();
    /*
     User Name Characters Validations
     */
    $("#cti_UserName").keypress(function(event) {
        var regex = new RegExp("^[a-zA-Z ]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
        $('#cti_UserName_Error').empty();
        $('#submitBtn').empty();

    });
    var text_max = 50;
    $('#cti_UserName_feedback').html(text_max + ' characters remaining');
    $('#cti_UserName').keyup(function() {
        var text_length = $('#cti_UserName').val().length;
        var text_remaining = text_max - text_length;
        $('#cti_UserName_feedback').html(text_remaining + ' characters remaining');
    });

});

$('#cti_ResetId').click(function() {
    $("#ctiucr_ModuleId").val('').trigger("chosen:updated");
    $("#ctiucr_CenterId").val('').trigger("chosen:updated");
    $('#submitBtn').empty();

});
$("#cti_Password").keypress(function(event) {
    $('#cti_Password_Error').empty();
    $('#submitBtn').empty();
});
//Passowrd Validations
$("#cti_Password").blur(function(event) {
    var cti_Password = $('#cti_Password').val();
    var lowerCaseLetters = /[a-z]/g;
    if (cti_Password.match(lowerCaseLetters)) {
    } else {
        $('#cti_Password_Error').html('Password must contain one lowercase letter').css('color', "red");
        return;
    }
    var upperCaseLetters = /[A-Z]/g;
    if (cti_Password.match(upperCaseLetters)) {
    } else {
        $('#cti_Password_Error').html('Password must contain one uppercase letter').css('color', "red");
        return;
    }
    var numbers = /[0-9]/g;
    if (cti_Password.match(numbers)) {
    } else {
        $('#cti_Password_Error').html('Password must contain one number').css('color', "red");
        return;
    }
});

//Drop Down Onchange Functions
$('#ctiucr_ModuleId').change(function() {
    $('#ctiucr_ModuleId_Error').empty();
    $('#submitBtn').empty();
 });
$('#ctiucr_CenterId').change(function() {
    $('#ctiucr_CenterId_Error').empty();
    $('#submitBtn').empty();
});



$('#cti_UserName').blur(function() {
	//get_cct_userName_Checking();
});

/*
 * For get_Seg_Modules_DropDown Purpose
 */
function get_Seg_Modules_DropDown() {
    try {
        var siteid = localStorage.getItem('active_SiteId');
        var json_siteid = {
            "siteId": siteid
        };
        var strUrl = Service.GetSegregationModulesDetails;
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
                } else {
                    var jsonArray = data.cticontrollerDTOs;
                    $.each(jsonArray, function(i, resData) {
                        var modules = "<option value=" + resData.moduleId + ">" + resData.moduleName + "</option>";
                        $(modules).appendTo('#ctiucr_ModuleId');
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_Seg_Modules_DropDown" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.log("Error in get_Seg_Modules_DropDown" + err);
    }
}



/*
 * For get_cct_userName_Checking Purpose
 */
function get_cct_userName_Checking() {
    try {
        var strUrl = Service.GetCTIUsers_Checking;
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
                if (200 !== responsecode) {
                } else {
                    var cti_UserName = $('#cti_UserName').val().toLowerCase().trim();
                    cti_UserName = cti_UserName.replace(/\s/g, '');
                    var list = data.cticontrollerDTOs;
                    $.each(list, function(i, list) {
                        if (list.userName === cti_UserName) {
                            $('#cti_UserName').focus();
                            $('#cti_UserName_Error').html('users is aleready exist').css('color', "red");
                            return;
                        }

                    });

                }
            },
            error: function(err) {
                console.error("Error in get_cct_userName_Checking" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.log("Error in get_cct_userName_Checking" + err);
    }
}

/*
 * For get_Center_Details Purpose
 */
function get_Center_Details() {
    try {
        var strUrl = Service.GetCenterDetails;
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
                if (200 !== responsecode) {
                } else {
                    var jsonArray = data.cticontrollerDTOs;
                    $.each(jsonArray, function(i, resData) {
                        var modules = "<option value=" + resData.cti_CentId + ">" + resData.cti_CentName + "</option>";
                        $(modules).appendTo('#ctiucr_CenterId');
                    });
                }
            },
            error: function(err) {
                console.error("Error in get_Center_Details" + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.log("Error in get_Center_Details" + err);
    }
}

/*
 For Creating CTI User Purpose
 */
function insert_CTI_UserCreation() {
    try
    {
        var siteid = localStorage.getItem('active_SiteId');
        var createdbyid = 1;//Temporary Purpose
        var createdbyroleid = 1;//Temporary Purpose
        var createdbymoduleid = 1;//Temporary Purpose
        var agentid = 1;//Temporary Purpose
        var nodeid = 1;//Temporary Purpose

        var cti_UserName = $('#cti_UserName').val().toLowerCase().trim();
        if (cti_UserName === '' || cti_UserName === "" || cti_UserName === null) {
            $('#cti_UserName').focus();
            $('#cti_UserName_Error').html('Please enter user name').css('color', "red");
            return;
        }else{
        	//get_cct_userName_Checking();
        }
        var cti_Password = $('#cti_Password').val();
        var lowerCaseLetters = /[a-z]/g;
        if (cti_Password.match(lowerCaseLetters)) {
        } else {
            $('#cti_Password_Error').html('Password must contain one lowercase letter').css('color', "red");
            return;
        }
        var upperCaseLetters = /[A-Z]/g;
        if (cti_Password.match(upperCaseLetters)) {
        } else {
            $('#cti_Password_Error').html('Password must contain one uppercase letter').css('color', "red");
            return;
        }
        var numbers = /[0-9]/g;
        if (cti_Password.match(numbers)) {
        } else {
            $('#cti_Password_Error').html('Password must contain one number').css('color', "red");
            return;
        }
        if (cti_Password === '' || cti_Password === "" || cti_Password === null) {
            $('#cti_Password').focus();
            $('#cti_Password_Error').html('please enter password').css('color', "red");
            return;
        }

        var ctiucr_ModuleId = $('#ctiucr_ModuleId').val();
        if (ctiucr_ModuleId === '' || ctiucr_ModuleId === "" || ctiucr_ModuleId === null ||ctiucr_ModuleId === "0") {
            $('#ctiucr_ModuleId').focus();
            $('#ctiucr_ModuleId_Error').html('please select module').css('color', "red");
            return;
        }

        var ctiucr_CenterId = $('#ctiucr_CenterId').val();
        if (ctiucr_CenterId === '' || ctiucr_CenterId === "" || ctiucr_CenterId === null || ctiucr_CenterId ==="0") {
            $('#ctiucr_CenterId').focus();
            $('#ctiucr_CenterId_Error').html('please select center').css('color', "red");
            return;
        }
        var json_cti_Details = {
            "userName": cti_UserName,
            "password": cti_Password,
            "moduleId": ctiucr_ModuleId,
            "createdbyId": createdbyid,
            "createdbyModuleId": createdbymoduleid,
            "createdbyRoleid": createdbyroleid,
            "agentid": agentid,
            "centerid": ctiucr_CenterId,
            "nodeid": nodeid,
            "siteId": siteid
        };
         var strUrl1 = Service.insertCTIUserCreation;
         $.ajax({
            type: "POST",
            url: strUrl1,
            dataType: "json",
            data: JSON.stringify(json_cti_Details),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
                "X-TENANT-ID": "PROCREATE"
            },
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {
                	console.log('DATA---->'+data.output);
                	if(data.output== null){
               		 $("#ctiucr_ModuleId_Error ").html('This User Is All Ready Exist').css('color', 'red');
               		 return false;
               	}
                }
                else {
                	 $("#submitBtn ").html('CTI User Created Sucessfully').css('color', 'green');
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                }
            },
            error: function(err) {
                console.error("Error in insert_CTI_UserCreation" + JSON.stringify(err));
            }
        });
        

    } catch (err) {
        console.log('insert_CTI_UserCreation Error Occured' + err);
    }
}


/*
 * For get_CTI_Users_Details
 */
function get_CTI_Users_Details() {
    try {
        var siteid = localStorage.getItem('active_SiteId');
        // Temporary Purpose
        var json_srgDetails = {
            "siteId": siteid
        };

        var strUrl = Service.GetCTIUsersDetails;
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
                    var jsonArray = data.cticontrollerDTOs;
                    get_CTI_Users_Details_DOM(jsonArray);
                }
            },
            error: function(err) {
                console.log('In Error of  get_CTI_Users_Details ' + err);
            }

        });
    } catch (err) {
        console.log('In Error of  get_CTI_Users_Details ' + err);
    }
}


function get_CTI_Users_Details_DOM(strData) {
    $('#cti_TableId').empty();
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
            var userName = strData[i].userName;
            if (userName === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(userName);
            }
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            var moduleName = strData[i].moduleName;
            if (moduleName === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(moduleName);
            }
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            var siteName = strData[i].siteName;
            if (siteName === "NA") {
                $(tablcol4).html('Not Found');
            } else {
                $(tablcol4).html(siteName);
            }
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
			var tl_createddtm = strData[i].createdTime;
			var date_split = tl_createddtm.split(' ');
			var time_split = date_split[1];
			var time1 = time_split.split('.');
			var time = time1[0];
			var total_date_time = date_split[0] + "  " + " " + time;
			if (total_date_time === "NA") {
				$(tablcol5).html('Not Found');
			} else {
				$(tablcol5).html(total_date_time);
			}
			$(tbleRow).append(tablcol5);

            var userId = strData[i].userId;
            var tablcol6 = document.createElement("td");
            $(tbleRow).append(tablcol6);


            var tabiclass2 = document.createElement("i");
            $(tabiclass2).addClass("cursor text-danger fas fa-trash-alt");
            $(tabiclass2).attr('data-toggle', 'tooltip');
            $(tabiclass2).attr('data-placement', 'bottom');
            $(tabiclass2).attr('onclick', 'update_Cti_Status(' + userId + ')');
            $(tabiclass2).attr('title', 'Delete');
            $(tablcol6).append(tabiclass2);
            // Appending Body Here
            $("#cti_TableId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_CTI_Users_Details_DOM" + err);
    }
}

function update_Cti_Status(userId) {
    try {
        var cnfrm = confirm("Do you want to remove!");
        if (cnfrm === true) {
            var userId = userId;
            var json_cti_status = {
                "userId": userId
            };
            var strUrl = Service.UpdateCTIUserStatus;
            $.ajax({
                type: "POST",
                url: strUrl,
                dataType: "json",
                data: JSON.stringify(json_cti_status),
                contentType: "application/json",
                async: false,
                crossDomain: true,
                headers: {
                    "X-TENANT-ID": "PROCREATE"
                },
                success: function(data) {
                    var responsecode = data.responseCode;
                    if (responsecode !== 200) {
                        //   alert('NO DATA FOUND');
                    } else {
                        $("#submitBtn").html('Removed Succesfully').css('color', 'green');
                        setTimeout(function() {
                            window.location.reload();
                        }, 3000);
                    }
                },
                error: function(err) {
                    console.log('In Error of  update_Cti_Status ' + err);
                }
            });
        } else {
        }
    } catch (err) {
        console.log('In Error of  update_Cti_Status ' + err);
    }

}