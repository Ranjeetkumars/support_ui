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
    get_All_Service_Provider_Type_Details();
    /*
     Service Provider Type  Name Characters Validations
     */
    $("#srp_Name").keypress(function(event) {
        var inputValue = event.charCode;
        if (!(inputValue >= 65 && inputValue <= 120) && (inputValue !== 32 && inputValue !== 0)) {
            event.preventDefault();
        }
        $('#srp_Name_Error').empty();
    });
    var text_max = 50;
    $('#srp_Name_feedback').html(text_max + ' characters remaining');
    $('#srp_Name').keyup(function() {
        var text_length = $('#srp_Name').val().length;
        var text_remaining = text_max - text_length;
        $('#srp_Name_feedback').html(text_remaining + ' characters remaining');
    });


    /*
     Service Provider Type Description Characters Validations
     */
    $("#srp_Description").keypress(function(event) {
        var inputValue = event.charCode;
        if (!(inputValue >= 65 && inputValue <= 120) && (inputValue !== 32 && inputValue !== 0)) {
            event.preventDefault();
        }
        $('#srp_Description_Error').empty();
    });
    var text_max = 50;
    $('#srp_Description_feedback').html(text_max + ' characters remaining');
    $('#srp_Description').keyup(function() {
        var text_length = $('#srp_Description').val().length;
        var text_remaining = text_max - text_length;
        $('#srp_Description_feedback').html(text_remaining + ' characters remaining');
    });
});


/*
 * For insert_Srp_Details Purpose
 */
function insert_Srp_Details() {
    try {
        var createdbyid = 1;// Temporary purpose
        var createdbyroleid = 1;// Temporary purpose
        var createdbymoduleid = 1;// Temporary purpose
        var d_no_of_positions = 1;// Temporary purpose

        var srp_Name = $('#srp_Name').val();
        if (srp_Name === '' || srp_Name === "0" || srp_Name === undefined) {
            $('#srp_Name_Error').html('Please enter service provider type name').css('color', 'red');
            return false;
        }
        var srp_Description = $('#srp_Description').val();
        if (srp_Description === '' || srp_Description === "0" || srp_Description === undefined) {
            $('#srp_Description_Error').html('Please enter service provider type discription').css('color', 'red');
            return false;
        }

        var json_Srp_Details = {
            "spt_service_provider_type": srp_Name,
            "spt_desc": srp_Description,
            "spt_createdbyid": createdbyid,
            "spt_createdbyroleid": createdbyroleid,
            "spt_createdbymoduleid": createdbymoduleid
        };
        var strUrl = Service.InsertServiceProviderTypeDetails;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_Srp_Details),
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
                    $("#srp_sucessId").html('Inserted Succesfully').css('color', 'green');
                    setTimeout(function() {
                        window.location.reload();
                    }, 3000);
                }
            },
            error: function(err) {
                console.error("Error in insert_Srp_Details" + JSON.stringify(err));
            }
        });

    } catch (err) {
        console.log("Error in insert_Srp_Details" + err);
    }
}

/*
 For get_All_Service_Provider_Type_Details
 */
function get_All_Service_Provider_Type_Details() {
    try {

        var strUrl = Service.GetAllServiceProviderTypeDetails;
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
                    var jsonArray = data.serviceProviderTypeControllerDTO;
                    get_All_Service_Provider_Type_Details_DOM(jsonArray);
                }
            }, error: function(err) {
                console.log('In Error of  get_All_Service_Provider_Type_Details ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  get_All_Service_Provider_Type_Details ' + err);
    }
}


function get_All_Service_Provider_Type_Details_DOM(strData) {
    $('#srp_TableId').empty();
    try {
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var srp_type = strData[i].spt_service_provider_type;
            if (srp_type === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(srp_type);
            }
            $(tbleRow).append(tablcol2);

            var srp_typeid = strData[i].service_provider_typeid;
            var tablcol3 = document.createElement("td");
            var srp_isactive = strData[i].spt_isactive;
            if (srp_isactive === "false") {
                srp_isactive = "In Active";
                $(tablcol3).attr('style', 'color: red;');
            } else if (srp_isactive === "true") {
                srp_isactive = "Active";
                $(tablcol3).attr('style', 'color: blue;');
            }
            if (srp_isactive === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(srp_isactive);
            }
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            var deleteicon = document.createElement("i");
            $(deleteicon).addClass("f205 fas fa-toggle-on");
            $(deleteicon).attr('data-toggle', 'tooltip');
            $(deleteicon).attr('style', 'font-size: 26px; color: #7c2be2;');
            $(deleteicon).attr('data-placement', 'bottom');
            var showStatus = srp_isactive;
            if (showStatus === "Active") {
                showStatus = "In Active";
            } else if (showStatus === "In Active") {
                showStatus = "Active";
            }
            $(deleteicon).attr('onclick', 'update_Srp_Status(' + srp_typeid + ',"' + srp_isactive + '","' + showStatus + '")');
            $(deleteicon).attr('title', showStatus);
            $(tablcol4).append(deleteicon);
            $(tbleRow).append(tablcol4);
            //Appending Body Here
            $("#srp_TableId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_All_Service_Provider_Type_Details_DOM ERROR" + err);
    }
}
function update_Srp_Status(srp_typeid, srp_isactive, showStatus) {
    try {
        if (srp_isactive === "In Active") {
            srp_isactive = "true";
        } else if (srp_isactive === "Active") {
            srp_isactive = "false";
        }
        var cnfrm = confirm("Do you want to update status!");
        if (cnfrm === true) {
            var srp_typeid = srp_typeid;
            var srp_isactive = srp_isactive;
            var json_up_status = {
                "service_provider_typeid": srp_typeid,
                "spt_isactive": srp_isactive
            };

            var strUrl = Service.UpdateServiceProviderTypeStatus;
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
                        $("#srp_updateId").html('Service Provider Type' + " " + showStatus + " " + 'Succesfully').css('color', 'green');
                        setTimeout(function() {
                            window.location.reload();
                        }, 3000);
                    }
                },
                error: function(err) {
                    console.log('In Error of  update_Srp_Status ' + err);
                }
            });
        } else {
        }
    } catch (err) {
        console.log('In Error of  update_Srp_Status ' + err);
    }

}

