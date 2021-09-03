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
    get_All_Designations_Details();
    /*
     Designation Name Characters Validations
     */
    $("#designation_Name").keypress(function(event) {
        var inputValue = event.charCode;
        if (!(inputValue >= 65 && inputValue <= 120) && (inputValue !== 32 && inputValue !== 0)) {
            event.preventDefault();
        }
        $('#designation_Name_Error').empty();
    });
    var text_max = 50;
    $('#designation_Name_feedback').html(text_max + ' characters remaining');
    $('#designation_Name').keyup(function() {
        var text_length = $('#designation_Name').val().length;
        var text_remaining = text_max - text_length;
        $('#designation_Name_feedback').html(text_remaining + ' characters remaining');
    });


    /*
     Designation Description Characters Validations
     */
    $("#desgination_Description").keypress(function(event) {
        var inputValue = event.charCode;
        if (!(inputValue >= 65 && inputValue <= 120) && (inputValue !== 32 && inputValue !== 0)) {
            event.preventDefault();
        }
        $('#desgination_Description_Error').empty();
    });
    var text_max = 50;
    $('#desgination_Description_feedback').html(text_max + ' characters remaining');
    $('#desgination_Description').keyup(function() {
        var text_length = $('#desgination_Description').val().length;
        var text_remaining = text_max - text_length;
        $('#desgination_Description_feedback').html(text_remaining + ' characters remaining');
    });
});


/*
 * For insert_Designation_Details Purpose
 */
function insert_Designation_Details() {
    try {
        var createdbyid = 1;// Temporary purpose
        var createdbyroleid = 1;// Temporary purpose
        var createdbymoduleid = 1;// Temporary purpose
        var d_no_of_positions = 1;// Temporary purpose

        var designation_Name = $('#designation_Name').val();
        if (designation_Name === '' || designation_Name === "0" || designation_Name === undefined) {
            $('#designation_Name_Error').html('Please enter designation name').css('color', 'red');
            return false;
        }
        var desgination_Description = $('#desgination_Description').val();
        if (desgination_Description === '' || desgination_Description === "0" || desgination_Description === undefined) {
            $('#desgination_Description_Error').html('Please enter desgination discription').css('color', 'red');
            return false;
        }

        var json_Designation_Details = {
            "d_designationname": designation_Name,
            "d_desc": desgination_Description,
            "d_createdbyid":createdbyid,
            "d_createdbymoduleid": createdbymoduleid,
            "d_no_of_positions": d_no_of_positions,
            "d_createdbyroleid": createdbyroleid
        };
        var strUrl = Service.InsertDesignationDetails;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(json_Designation_Details),
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
                    $("#designation_sucessId").html('Inserted Succesfully').css('color', 'green');
                    setTimeout(function() {
                        window.location.reload();
                    }, 3000);
                }
            },
            error: function(err) {
                console.error("Error in insert_Designation_Details" + JSON.stringify(err));
            }
        });

    } catch (err) {
        console.log("Error in insert_Designation_Details" + err);
    }
}

/*
 For get_All_Designations_Details
 */
function get_All_Designations_Details() {
    try {

        var strUrl = Service.GetAllDesignationsDetails;
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
                    var jsonArray = data.designationControllerDTO;
                    get_All_Designations_Details_DOM(jsonArray);
                }
            }, error: function(err) {
                console.log('In Error of  get_All_Designations_Details ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  get_All_Designations_Details ' + err);
    }
}


function get_All_Designations_Details_DOM(strData) {
    $('#desginationId').empty();
    try {
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var d_designationname = strData[i].d_designationname;
            if (d_designationname === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(d_designationname);
            }
            $(tbleRow).append(tablcol2);



            var d_designationid = strData[i].d_designationid;
            var tablcol3 = document.createElement("td");
            var d_isactive = strData[i].d_isactive;
            if (d_isactive === "false") {
                d_isactive = "In Active";
                $(tablcol3).attr('style', 'color: red;');
            } else if (d_isactive === "true") {
                d_isactive = "Active";
                $(tablcol3).attr('style', 'color: blue;');
            }
            if (d_isactive === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(d_isactive);
            }
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            var deleteicon = document.createElement("i");
            $(deleteicon).addClass("f205 fas fa-toggle-on");
            $(deleteicon).attr('data-toggle', 'tooltip');
            $(deleteicon).attr('style', 'font-size: 26px; color: #7c2be2;');
            $(deleteicon).attr('data-placement', 'bottom');
            var showStatus = d_isactive;
            if (showStatus === "Active") {
                showStatus = "In Active";
            } else if (showStatus === "In Active") {
                showStatus = "Active";
            }
            $(deleteicon).attr('onclick', 'update_Designation_Status(' + d_designationid + ',"' + d_isactive + '","' + showStatus + '")');
            $(deleteicon).attr('title', showStatus);
            $(tablcol4).append(deleteicon);
            $(tbleRow).append(tablcol4);
            //Appending Body Here
            $("#desginationId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_All_Designations_Details_DOM ERROR" + err);
    }
}
function update_Designation_Status(d_designationid, d_isactive, showStatus) {
    try {
        if (d_isactive === "In Active") {
            d_isactive = "true";
        } else if (d_isactive === "Active") {
            d_isactive = "false";
        }
        var cnfrm = confirm("Do you want to update status!");
        if (cnfrm === true) {
            var d_designationid = d_designationid;
            var d_isactive = d_isactive;
            var json_up_status = {
                "d_designationid": d_designationid,
                "d_isactive": d_isactive
            };

            var strUrl = Service.UpdateDesignationStatus;
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
                        $("#ds_updateId").html('Designation' + " " + showStatus + " " + 'Succesfully').css('color', 'green');
                        setTimeout(function() {
                            window.location.reload();
                        }, 3000);
                    }
                },
                error: function(err) {
                    console.log('In Error of  update_Designation_Status ' + err);
                }
            });
        } else {
        }

    } catch (err) {
        console.log('In Error of  update_Designation_Status ' + err);
    }

}

