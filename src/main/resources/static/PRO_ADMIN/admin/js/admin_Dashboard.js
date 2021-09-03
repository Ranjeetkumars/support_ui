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
    get_All_Sites_Pending_Status_Details();
});



/*
 For get_All_Sites_Pending_Status
 */
function get_All_Sites_Pending_Status_Details() {
    try {

        var strUrl = Service.GetAllSitesPendingStatus;
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
                    get_All_Sites_Pending_Status_Details_DOM(jsonArray);
                }
            }, error: function(err) {
                console.log('In Error of  get_All_Sites_Pending_Status_Details ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  get_All_Sites_Pending_Status_Details ' + err);
    }
}


function get_All_Sites_Pending_Status_Details_DOM(strData) {
    $('#sites_Pending_TableId').empty();
    try {
        var sum = 0;
        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var siteName = strData[i].siteName;
            if (siteName === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(siteName);
            }
            $(tbleRow).append(tablcol2);

            var siteId = strData[i].siteId;


            var tablcol3 = document.createElement("td");
            var status = strData[i].status;
            if (status === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(status);
                $(tablcol3).attr('style', 'color: red;');

            }
            $(tbleRow).append(tablcol3);

            var tablcol5 = document.createElement("td");
            var deleteicon = document.createElement("i");
            $(deleteicon).addClass("f205 fas fa-toggle-on");
            $(deleteicon).attr('data-toggle', 'tooltip');
            $(deleteicon).attr('style', 'font-size: 26px; color: #7c2be2;');
            $(deleteicon).attr('data-placement', 'bottom');
            var showStatus = status;
            if (showStatus === "Pending") {
                showStatus = "Active";
            }
            $(deleteicon).attr('onclick', 'update_Site_Peinding_Status(' + siteId + ',"' + status + '","' + showStatus + '")');
            $(deleteicon).attr('title', showStatus);
            $(tablcol5).append(deleteicon);
            $(tbleRow).append(tablcol5);
            //Appending Body Here
            $("#sites_Pending_TableId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_All_Sites_Pending_Status_Details_DOM ERROR" + err);
    }
}
function update_Site_Peinding_Status(siteId, status, showStatus) {
    try {
        if (status === "Pending") {
            status = "2";
        }
        var cnfrm = confirm("Do you want to update status!");
        if (cnfrm === true) {
            var siteId = siteId;
            var status = status;
            var json_up_status = {
                "siteId": siteId,
                "status": status
            };

            var strUrl = Service.UpdateSitePendingStatus;
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
                        }
                        $("#site_pnd_updateId").html('Site' + " " + showStatus + " " + 'Succesfully').css('color', 'green');
                        setTimeout(function() {
                            window.location.reload();
                        }, 3000);
                    }
                },
                error: function(err) {
                    console.log('In Error of  update_Sites_Status ' + err);
                }
            });
        } else {
        }

    } catch (err) {
        console.log('In Error of  update_Sites_Status ' + err);
    }

}

