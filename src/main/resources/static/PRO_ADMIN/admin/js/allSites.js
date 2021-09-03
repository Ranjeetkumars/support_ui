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
    get_All_Sites_Details();
});



/*
 For get_All_Sites_Details
 */
function get_All_Sites_Details() {
    try {

        var strUrl = Service.GetAllSitesDetails;
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
                    get_All_Sites_Details_DOM(jsonArray);
                }
            }, error: function(err) {
                console.log('In Error of  get_All_Sites_Details ' + err);
            }
        });
    } catch (err) {
        console.log('In Error of  get_All_Sites_Details ' + err);
    }
}


function get_All_Sites_Details_DOM(strData) {
    $('#all_SitesId').empty();
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

            var siteId = strData[i].siteId;
            var site_Isactive = strData[i].site_Isactive;

            var tablcol3 = document.createElement("td");
            var siteName = strData[i].siteName;
            if (siteName === "NA") {
                $(tablcol3).html('Not Found');
            } else {
                $(tablcol3).html(siteName);
            }
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            var site_Isactive = strData[i].site_Isactive;
            if (site_Isactive === "false") {
                site_Isactive = "In Active";
                $(tablcol4).attr('style', 'color: red;');
            } else if (site_Isactive === "true") {
                site_Isactive = "Active";
                $(tablcol4).attr('style', 'color: blue;');
            }
            if (site_Isactive === "NA") {
                $(tablcol4).html('Not Found');
            } else {
                $(tablcol4).html(site_Isactive);
            }
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            var deleteicon = document.createElement("i");
            $(deleteicon).addClass("f205 fas fa-toggle-on");
            $(deleteicon).attr('data-toggle', 'tooltip');
            $(deleteicon).attr('style', 'font-size: 26px; color: #7c2be2;');
            $(deleteicon).attr('data-placement', 'bottom');
            var showStatus = site_Isactive;
            if (showStatus === "Active") {
                showStatus = "In Active";
            } else if (showStatus === "In Active") {
                showStatus = "Active";
            }
            $(deleteicon).attr('onclick', 'update_Sites_Status(' + siteId + ',"' + site_Isactive + '","' + showStatus + '")');
            $(deleteicon).attr('title', showStatus);
            $(tablcol5).append(deleteicon);
            $(tbleRow).append(tablcol5);
            //Appending Body Here
            $("#all_SitesId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_All_Sites_Details_DOM ERROR" + err);
    }
}
function update_Sites_Status(siteId, site_Isactive, showStatus) {
    try {
        if (site_Isactive === "In Active") {
            site_Isactive = "true";
        } else if (site_Isactive === "Active") {
            site_Isactive = "false";
        }
        var cnfrm = confirm("Do you want to update status!");
        if (cnfrm === true) {
            var siteId = siteId;
            var site_Isactive = site_Isactive;
            var json_up_status = {
                "siteId": siteId,
                "site_Isactive": site_Isactive
            };

            var strUrl = Service.UpdateAllSitesStatus;
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
                        $("#updateId").html('Site' + " " + showStatus + " " + 'Succesfully').css('color', 'green');
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

