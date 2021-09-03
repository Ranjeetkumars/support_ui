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
    get_All_ServiceProvider_Details();
});



/*
 For get_All_ServiceProvider_Details
 */
function get_All_ServiceProvider_Details() {
    try {

        var strUrl = Service.GetAllServiceProviderDetails;
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
                    var jsonArray = data.adminControllerDTO;
                    get_All_ServiceProvider_Details_DOM(jsonArray);
                }
            }, error: function(err) {
                console.log('In Error of  get_All_ServiceProvider_Details ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  get_All_Sites_Details ' + err);
    }
}


function get_All_ServiceProvider_Details_DOM(strData) {
    $('#srp_TableId').empty();
    try {
        var sum = 0;
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var srp_Name = strData[i].srp_Name;
            if (srp_Name === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(srp_Name);
            }
            $(tbleRow).append(tablcol2);

            var srp_Id = strData[i].srp_Id;

            var tablcol3 = document.createElement("td");
            var srp_Isactive = strData[i].srp_Isactive;
            if (srp_Isactive === "false") {
                srp_Isactive = "In Active";
                $(tablcol3).attr('style', 'color: red;');
            } else if (srp_Isactive === "true") {
                srp_Isactive = "Active";
                $(tablcol3).attr('style', 'color: blue;');
            }
            if (srp_Isactive === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(srp_Isactive);
            }
            $(tbleRow).append(tablcol3);

            var tablcol5 = document.createElement("td");
            var deleteicon = document.createElement("i");
            $(deleteicon).addClass("f205 fas fa-toggle-on");
            $(deleteicon).attr('data-toggle', 'tooltip');
            $(deleteicon).attr('style', 'font-size: 26px; color: #7c2be2;');
            $(deleteicon).attr('data-placement', 'bottom');
            var showStatus = srp_Isactive;
            if (showStatus === "Active") {
                showStatus = "In Active";
            } else if (showStatus === "In Active") {
                showStatus = "Active";
            }
            $(deleteicon).attr('onclick', 'update_Srp_Status(' + srp_Id + ',"' + srp_Isactive + '","' + showStatus + '")');
            $(deleteicon).attr('title', showStatus);
            $(tablcol5).append(deleteicon);
            $(tbleRow).append(tablcol5);
            //Appending Body Here
            $("#srp_TableId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_All_ServiceProvider_Details_DOM ERROR" + err);
    }
}
function update_Srp_Status(srp_Id, srp_Isactive, showStatus) {
    try {
        if (srp_Isactive === "In Active") {
            srp_Isactive = "true";
        } else if (srp_Isactive === "Active") {
            srp_Isactive = "false";
        }
        var cnfrm = confirm("Do you want to update status!");
        if (cnfrm === true) {
            var srp_Id = srp_Id;
            var srp_Isactive = srp_Isactive;
            var json_up_status = {
                "srp_Id": srp_Id,
                "srp_Isactive": srp_Isactive
            };

            var strUrl = Service.UpdateServiceProviderStatus;
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
                            showStatus = "Activated";
                        } else if (showStatus === "In Active") {
                            showStatus = "In  Activated";
                        }
                        $("#srp_updateId").html('Service Provider'+" "+showStatus + " " + 'Succesfully').css('color', 'green');
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

