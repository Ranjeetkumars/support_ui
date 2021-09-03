
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

	get_Site_All_Users_Details();
	var SiteName = localStorage.getItem('active_SiteName');
	$('#siteNameId').html("Site Name : " + SiteName);

});

/*
 * For get_SiteSingleView_Details
 */
function get_Site_All_Users_Details() {
	try {
		var siteid = localStorage.getItem('active_SiteId');
		var json_siteid = {
			"us_site_id" : siteid
		};
		var strUrl = Service.GetSingleSiteAllUsersDetails;
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(json_siteid),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			headers : {
				"X-TENANT-ID" : "PROCREATE"
			},
			success : function(data) {
				var responsecode = data.responseCode;
				if (responsecode !== 200) {
				} else {
					var jsonArray = data.usersDetailsControllerDTO;
					get_Site_All_Users_Details_DOM(jsonArray);
				}
			},
			error : function(err) {
				console.log('In Error of  get_Site_All_Users_Details ' + err);
			}
		});
	} catch (err) {
		console.log('In Error of  get_Site_All_Users_Details ' + err);
	}
}

function get_Site_All_Users_Details_DOM(strData) {
	$('#allSiteUsersId').empty();
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
			var userName = strData[i].us_username;
			if (userName === "NA") {
				$(tablcol2).html('Not Found');
			} else {
				$(tablcol2).html(userName);
			}
			$(tbleRow).append(tablcol2);

			var tablcol3 = document.createElement("td");
			var tl_createddtm = strData[i].us_createddtm;
			var date_split = tl_createddtm.split(' ');
			var time_split = date_split[1];
			var time1 = time_split.split('.');
			var time = time1[0];
			var total_date_time = date_split[0] + "  " + " " + time;
			if (total_date_time === "NA") {
				$(tablcol3).html('Not Found');
			} else {
				$(tablcol3).html(total_date_time);
			}
			$(tbleRow).append(tablcol3);

			var tablcol4 = document.createElement("td");
			var srp_name = strData[i].srp_name;
			if (srp_name === "NA") {
				$(tablcol4).html('Not Found');
			} else {
				$(tablcol4).html(srp_name);
			}
			$(tbleRow).append(tablcol4);
			
			
			var tablcol5 = document.createElement("td");
			var site_name = strData[i].site_name;
			if (site_name === "NA") {
				$(tablcol5).html('Not Found');
			} else {
				$(tablcol5).html(site_name);
			}
			$(tbleRow).append(tablcol5);
			
			var tablcol6 = document.createElement("td");
            var us_isactive = strData[i].us_isactive;
            if (us_isactive === "false" || us_isactive === "f" ) {
                us_isactive = "In Active";
                $(tablcol6).attr('style', 'color: red;');
            } else if (us_isactive === "true" || us_isactive === "t") {
                us_isactive = "Active";
                $(tablcol6).attr('style', 'color: blue;');
            }
            if (us_isactive === "NA") {
                $(tablcol6).html('Not Found');
            } else {
                $(tablcol6).html(us_isactive);
            }
            $(tbleRow).append(tablcol6);

			var us_userid = strData[i].us_userid;
			var us_dob = strData[i].us_dob;
			var gender = strData[i].g_gendertype;
			var qualification = strData[i].qualification_type;
			var experience = strData[i].us_experience;
			var d_joining = strData[i].us_dateofjoining;
			var d_retirement = strData[i].us_dateofretirement;
			var country = strData[i].us_countryid;
			var state = strData[i].us_stateid;
			var city = strData[i].us_cityid;
			var mandal = strData[i].us_mandalid;
			var us_addr1 = strData[i].us_addr1;
			var us_addr2 = strData[i].us_addr2;
			var us_pin = strData[i].us_pin;
			var us_mobile = strData[i].us_mobile;
			var us_email = strData[i].us_email;
			var us_districtid = strData[i].us_districtid;
			var us_imagepath = strData[i].us_imagepath;

			var tablcol7 = document.createElement("td");
			var deleteicon = document.createElement("i");
			$(deleteicon).addClass("fa fa-eye");
			$(deleteicon).attr('data-toggle', 'tooltip');
			$(deleteicon).attr('style', 'font-size: 26px; color: #337ab7;');
			$(deleteicon).attr('data-placement', 'bottom');
			$(deleteicon).attr('onclick','single_User_View(' + us_userid + ',"' + userName + '","' + us_dob+ '","' + gender + '","' + qualification + '","'+ experience + '","' + d_joining + '","'+ d_retirement + '","' + country + '","' + state+ '","' + city + '","' + mandal + '","' + us_addr1+ '","' + us_addr2 + '","' + us_pin + '","'+ us_mobile + '","' + us_email + '","'+ us_districtid + '","' + us_imagepath + '")');
			$(deleteicon).attr('title', 'View');
			$(tablcol7).append(deleteicon);
			$(tbleRow).append(tablcol7);
			// Appending Body Here
			$("#allSiteUsersId").append(tbleRow);
		}

	} catch (err) {
		console.log("get_Site_All_Users_Details_DOM ERROR" + err);
}

function single_User_View(us_userid, us_username, us_dob, gender, qualification,
		experience, d_joining, d_retirement, country, state, city, mandal,
		us_addr1, us_addr2, us_pin, us_mobile, us_email, us_districtid,
		us_imagepath) {
	$('#site_viewId').modal('show');
	// Left Side Fields Appending
	$('#us_Id').html(us_userid);
	$('#us_dob').html(us_dob);
	$('#us_qualification').html(qualification);
	$('#us_joining').html(d_joining);
	$('#us_pincode').html(us_pin);
	$('#us_email').html(us_email);
	$('#us_pincode').html(us_pin);
	// Right Side Fields Appending
	$('#us_Name').html(us_username);
	$('#u_Name').html(us_username);
	$('#us_gender').html(gender);
	var expr = experience;
	if(expr > 1){
	 var years = "Years";	
	}else{
		years="Year"
	}
	$('#us_experience').html(expr+" "+years);
	$('#us_retirement').html(d_retirement);
	var us_address = us_addr1 + "," + us_addr2;
	$('#us_address').html(us_address);
	$('#us_mobile').html(us_mobile);
	$("#theDiv").empty();

	if (gender === "Female" && us_imagepath === "NA") {
		us_imagepath = "../ServiceProvider/img/female.png";
	} else if (gender === "Male" && us_imagepath === "NA") {
		us_imagepath = "../ServiceProvider/img/male.jpg";
	}
	var img_Path = us_imagepath;
	var imgicon = document.createElement('img');
	$(imgicon).addClass('img-circle');
	$(imgicon).attr('src', img_Path);
	$(imgicon).attr('alt', '');
	$("#theDiv").append(imgicon);

}
