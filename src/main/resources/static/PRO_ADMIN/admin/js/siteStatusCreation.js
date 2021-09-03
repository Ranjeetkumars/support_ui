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
    get_All_Site_Status_Details();
    /*
     Service Provider Type  Name Characters Validations
     */
    $("#ssc_Name").keypress(function(event) {
        var inputValue = event.charCode;
        if (!(inputValue >= 65 && inputValue <= 120) && (inputValue !== 32 && inputValue !== 0)) {
            event.preventDefault();
        }
        $('#ssc_Name_Error').empty();
    });
    var text_max = 50;
    $('#ssc_Name_feedback').html(text_max + ' characters remaining');
    $('#ssc_Name').keyup(function() {
        var text_length = $('#ssc_Name').val().length;
        var text_remaining = text_max - text_length;
        $('#ssc_Name_feedback').html(text_remaining + ' characters remaining');
    });


    /*
     Service Provider Type Description Characters Validations
     */
    $("#ssc_Description").keypress(function(event) {
        var inputValue = event.charCode;
        if (!(inputValue >= 65 && inputValue <= 120) && (inputValue !== 32 && inputValue !== 0)) {
            event.preventDefault();
        }
        $('#ssc_Description_Error').empty();
    });
    var text_max = 50;
    $('#ssc_Description_feedback').html(text_max + ' characters remaining');
    $('#ssc_Description').keyup(function() {
        var text_length = $('#ssc_Description').val().length;
        var text_remaining = text_max - text_length;
        $('#ssc_Description_feedback').html(text_remaining + ' characters remaining');
    });
});


/*
 * For insert_Ssc_Details Purpose
 */
function insert_Ssc_Details() {
    try {
        var createdbyid = 1;// Temporary purpose
        var createdbyroleid = 1;// Temporary purpose
        var createdbymoduleid = 1;// Temporary purpose

        var ssc_Name = $('#ssc_Name').val();
        if (ssc_Name === '' || ssc_Name === "0" || ssc_Name === undefined) {
            $('#ssc_Name_Error').html('Please enter site status name').css('color', 'red');
            return false;
        }
        var ssc_Description = $('#ssc_Description').val();
        if (ssc_Description === '' || ssc_Description === "0" || ssc_Description === undefined) {
            $('#ssc_Description_Error').html('Please enter site status discription').css('color', 'red');
            return false;
        }

        var json_Ssc_Details = {
            "ss_status": ssc_Name,
            "ss_desc": ssc_Description,
            "ss_createdbyid": createdbyid,
            "ss_createdbymodid": createdbymoduleid,
            "ss_createdbyroleid": createdbyroleid
        };
        var strUrl = Service.InsertSiteStatusDetails;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_Ssc_Details),
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
                    $("#ssc_sucessId").html('Inserted Succesfully').css('color', 'green');
                    setTimeout(function() {
                        window.location.reload();
                    }, 3000);
                }
            },
            error: function(err) {
                console.error("Error in insert_Ssc_Details" + JSON.stringify(err));
            }
        });

    } catch (err) {
        console.log("Error in insert_Ssc_Details" + err);
    }
}

/*
 For get_All_Site_Status_Details
 */
function get_All_Site_Status_Details() {
    try {

        var strUrl = Service.GetAllSiteStatusDetails;
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
                    var jsonArray = data.siteStatusControllerDTO;
                    get_All_Site_Status_Details_DOM(jsonArray);
                }
            }, error: function(err) {
                console.log('In Error of  get_All_Site_Status_Details ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  get_All_Site_Status_Details ' + err);
    }
}


function get_All_Site_Status_Details_DOM(strData) {
    $('#ssc_TableId').empty();
    try {
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var ss_status = strData[i].ss_status;
            if (ss_status === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(ss_status);
            }
            $(tbleRow).append(tablcol2);

            var ss_statusid = strData[i].ss_statusid;
            var tablcol3 = document.createElement("td");
            var ss_isactive = strData[i].ss_isactive;
            if (ss_isactive === "false") {
                ss_isactive = "In Active";
                $(tablcol3).attr('style', 'color: red;');
            } else if (ss_isactive === "true") {
                ss_isactive = "Active";
                $(tablcol3).attr('style', 'color: blue;');
            }
            if (ss_isactive === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(ss_isactive);
            }
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            var deleteicon = document.createElement("i");
            $(deleteicon).addClass("f205 fas fa-toggle-on");
            $(deleteicon).attr('data-toggle', 'tooltip');
            $(deleteicon).attr('style', 'font-size: 26px; color: #7c2be2;');
            $(deleteicon).attr('data-placement', 'bottom');
            var showStatus = ss_isactive;
            if (showStatus === "Active") {
                showStatus = "In Active";
            } else if (showStatus === "In Active") {
                showStatus = "Active";
            }
            $(deleteicon).attr('onclick', 'update_Ssc_Status(' + ss_statusid + ',"' + ss_isactive + '","' + showStatus + '")');
            $(deleteicon).attr('title', showStatus);
            $(tablcol4).append(deleteicon);
            $(tbleRow).append(tablcol4);
            //Appending Body Here
            $("#ssc_TableId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_All_Site_Status_Details_DOM ERROR" + err);
    }
}
function update_Ssc_Status(ss_statusid, ss_isactive, showStatus) {
    try {
        if (ss_isactive === "In Active") {
            ss_isactive = "true";
        } else if (ss_isactive === "Active") {
            ss_isactive = "false";
        }
        var cnfrm = confirm("Do you want to update status!");
        if (cnfrm === true) {
            var ss_statusid = ss_statusid;
            var ss_isactive = ss_isactive;
            var json_up_status = {
                "ss_statusid": ss_statusid,
                "ss_isactive": ss_isactive
            };

            var strUrl = Service.UpdateSiteStatusStatus;
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
                        $("#ssc_updateId").html('Site Status ' + " " + showStatus + " " + 'Succesfully').css('color', 'green');
                        setTimeout(function() {
                            window.location.reload();
                        }, 3000);
                    }
                },
                error: function(err) {
                    console.log('In Error of  update_Ssc_Status ' + err);
                }
            });
        } else {
        }
    } catch (err) {
        console.log('In Error of  update_Srp_Status ' + err);
    }

}

