/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    try {
        //isUser_LoginorNot();
        loadingServiceProviderType();

    } catch (err) {
        console.log("errror in loading ready funtion" + err);
    }
	
	  try {
		var data = JSON.parse(localStorage.getItem('Lobject'));
		if (data.responseCode === 200) {
			$.each(data.controllerDTOs, function(i, eachitem) {
				if (eachitem.errorcode == null) {

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

});


/*
 * Service Provider Logo File Validations
 */
$('#actualLogo').bind('change', function() {
    var size1 = this.files[0].size;
    // Maximum 3mb
    if (size1 >= 3024000) {
        alert('Maximum size limit 3 MB', 'customLogoBtn', 'error');
        $('#actualLogo').val("");
        return false;
    }
    var exten = this.files[0].name;
    var finalExten = exten.substr((exten.lastIndexOf('.') + 1)).toLowerCase();
    if ($.inArray(finalExten, ['gif', 'png', 'jpg', 'jpeg', 'pdf']) === -1) {
        alert('Jpg, jpeg, png, pdf,formats are allowed ');
        $('#actualLogo').val("");
        return  false;
    }
});
/*
 * Uploading PAN card  Validations
 */

$('#actualFile').bind('change', function() {
    var size1 = this.files[0].size;
    // Maximum 3mb
    if (size1 >= 3024000) {
        alert('Maximum size limit 3 MB', 'customLogoBtn', 'error');
        $('#actualFile').val("");
        return false;
    }
    var exten = this.files[0].name;
    var finalExten = exten.substr((exten.lastIndexOf('.') + 1)).toLowerCase();
    if ($.inArray(finalExten, ['gif', 'png', 'jpg', 'jpeg', 'pdf']) === -1) {
        alert('Jpg, jpeg, png, pdf,formats are allowed ');
        $('#actualFile').val("");
        return  false;
    }
});
/*
 * Re Enter email   Validations
 */

$('#email, #reEnterEmailId').on('keyup', function() {
    if ($('#email').val().length == 0 && $('#reEnterEmailId').val().length == 0) {
        $('#message').html('').css('color', 'green');
    }
    else if ($('#email').val() == $('#reEnterEmailId').val()) {
        //$('#message').html('Matching').css('color', 'green');
        $('#message').html('Matched').css('color', 'green');
    } else
        $('#message').html('Not Matching').css('color', 'red');
});
/*
 * Re Enter password   Validations
 */
$('#passwordId, #reEnterPasswordId').on('keyup', function() {
    if ($('#passwordId').val() == $('#reEnterPasswordId').val()) {
        $('#message1').html('Matching').css('color', 'green');
    } else
        $('#message1').html('Not Matching').css('color', 'red');
});


/*
 Name Characters Validations(allow only charaters)
 */
$(".charaterkeypress").keypress(function(event) {
 var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }

});
/*
 Name Characters Validations(allow only charaters and nuberbers not special charater)
 */
$('.srpName').on('keypress', function(event) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
});
/*
 Numaric valus Characters Validations(allow only numaric valus)
 */
$(".numkeypress").on('keypress', function(event) {
    // var regex = new RegExp("^[a-zA-Z0-9]+$");allow digits and charaters not special charaters
    var regex = new RegExp("^[0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
});
/*
 Email Validations(allow only numaric valus)
 */
$(".emailkeypress").keyup(function() {
    // var regex = new RegExp("^[a-zA-Z0-9]+$");allow digits and charaters not special charaters
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.value);
    if (regexEmail) {
        $('#emailmsg').html('valid Email').css('color', 'green');
    } else {
        $('#emailmsg').html('invalid').css('color', 'red');
    }
});
//<!--Alternate Email-->
$(".emailkeypress1").keyup(function() {
    // var regex = new RegExp("^[a-zA-Z0-9]+$");allow digits and charaters not special charaters
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.value);
    if (regexEmail) {
        $('#altemailmsg').html('valid Email').css('color', 'green');
    } else {
        $('#altemailmsg').html('invalid').css('color', 'red');
    }
});


/*
 PAN Card Validations(allow only numaric valus)
 */
$(function() {
    var max = parseInt($("#panCard_number").attr("maxlength"));
    $("#count").text("Characters left: " + max);
    $("#panCard_number").keyup(function(e) {
        $("#count").text("Characters left: " + (max - $(this).val().length));
        if ($(this).val().length == max)
            $("#errMsg").text('PAN card Number  will not allow 18 characters.').css('color', 'red');
        else
            $("#errMsg").text("");
    });
});
/*
 TIN Card Validations(allow only numaric valus)
 */
$(function() {
    var max = parseInt($("#tinnumber").attr("maxlength"));
    $("#count").text("Characters left: " + max);
    $("#tinnumber").keyup(function(e) {
        $("#count").text("Characters left: " + (max - $(this).val().length));
        if ($(this).val().length == max)
            $("#errMsg1").text('TIN will not allow 18 characters.').css('color', 'red');
        else
            $("#errMsg1").text("");
    });
});
/*
 CIN Card Validations(allow only numaric valus)
 */
$(function() {
    var max = parseInt($("#cinnumber").attr("maxlength"));
    $("#count").text("Characters left: " + max);
    $("#cinnumber").keyup(function(e) {
        $("#count").text("Characters left: " + (max - $(this).val().length));
        if ($(this).val().length == max)
            $("#errMsg2").text(' CIN Number  will not allow 18 characters.').css('color', 'red');
        else
            $("#errMsg2").text("");
    });
});
/*
 * For loading the Districs based on the district ID Bharath 06-05-2019 load
 * ServiceProviderType
 */
$("#serviceProviederNameId").blur(function() {
    isUserExist();
});

/*
 * upload padcard immage and service provider logo
 */
$("#customLogoBtn").blur(function() {
	$('#srpreg_srplogo_image_UrlId').empty();
    var file_data = $('#actualLogo').prop('files')[0];
    if(file_data === undefined){
		return false;
	}else{
    var form_data = new FormData();
    form_data.append('file', file_data);
    imageUpload(form_data);
	}
});
$("#customFileBtn").blur(function() {
	$('#srpreg_pancardlogo_image_UrlId').empty();
    var file_data = $('#actualFile').prop('files')[0];
    if(file_data === undefined){
		return false;
	}else{
    var form_data = new FormData();
    form_data.append('file', file_data);
    imageUpload(form_data);
	}
});



/*
 *@DESC : Image uploaded file store into server system.
 *@AuthorName : Bharath
 *@DATE : 20-11-2019
 */

function imageUpload(form_data) {
    try {
        var strUrl = Service.ViewImage;
        $.ajax({
            type: 'post',
            url: strUrl, // point to server-side controller method
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function(data) {
                 var data = JSON.parse(data);
                $('#srpreg_srplogo_image_UrlId').val(data.fileViewUri);
                $('#srpreg_pancardlogo_image_UrlId').val(data.fileViewUri);
                
            },
            error: function(e) {
                console.log("imageUpload error" + e);
            }
        });
    } catch (err) {
        console.log("imageUpload error" + err);
    }
}

/*
 * For loading the loadingServiceProviderType 
 *  Bharath 06-05-2019 load
 * ServiceProviderType
 */
function loadingServiceProviderType() {
    try {
        var strUrl = Service.serviceProviderType;
        var serviceProviderId = 0;
        var obj_Insert = {
            "serviceProviderId": serviceProviderId
        };
        $
                .ajax({
                    type: "POST",
                    url: strUrl,
                    dataType: "json",
                    data: JSON.stringify(obj_Insert),
                    contentType: "application/json",
                    async: false,
                    crossDomain: true,
                    success: function(data) {
                        var responsecode = data.responseCode;
                        if (200 !== responsecode) {

                        } else {
                            var jsonArray = data.controllerDTOs;
                            var selectfirst = "<option value='0'>Please Select ServiceProviderType</option>";

                            $.each(jsonArray, function(i, resData) {
                                var serviceTypeData = "<option value="
                                        + resData.serviceProviderId + ">"
                                        + resData.serviceProviderType
                                        + "</option>";
                                $(serviceTypeData).appendTo(
                                        '#serviceProviederTypeId');
                            });
                        }
                    },
                    error: function(err) {
                        console.error("Error in getServiceProviderType"
                                + JSON.stringify(err));
                    }
                });
    } catch (err) {
        console.error('Error in getServiceProviderType()' + err);
    }

}
/*
*@DESC : Check User is already exist or not 
*@AuthorName : Bharath
*@DATE : 20-11-2019
*/
function isUserExist() {
    try {
        var strUrl = Service.isUserExist;
        
        $
                .ajax({
                    type: 'GET',
                    url: strUrl,
                    dataType: 'json',
                    async: false,
                    success: function(data) {
                        var responsecode = data.responseCode;
                        if (200 !== responsecode) {
                        } else {
                            var serviceProviderName = $('#serviceProviederNameId').val().toLowerCase().trim();
                            serviceProviderName = serviceProviderName.replace(/\s/g, '');

                            var list = data.controllerDTOs;

                            $.each(list, function(i, list) {
                                if (list.userName === serviceProviderName) {
                                    $('#serviceProviederNameId').focus();
                                    showNotificationError("User is Already Exist,Please give another UserName",
                                            "serviceProviederNameId", "error");
                                    
                                    return;
                                }

                            });

                        }
                    },
                    error: function(err) {
                        console.error("Error in username"
                                + JSON.stringify(err));
                    }
                });
    } catch (err) {
        console.error('Error in getUsernames()' + err);
    }

}



 /*
 *@DESC : ServiceProvider Registration
 *@AuthorName : Bharath
 *@DATE : 20-11-2019
 */
function saveServiceProviderRegistrationDetails() {
	 var srplog_img_url = $('#srpreg_srplogo_image_UrlId').val();
	 var pancard_img_url = $('#srpreg_pancardlogo_image_UrlId').val();

	try{
    var condition = 1;
    var serviceProviderTypeId=1;
    var serviceProviderId = $('#serviceProviederTypeId').val();
    if (serviceProviderId === "0") {
        $('#serviceProviederTypeId').focus();
        showNotificationError("Please Select Service Provider Type",
                "serviceProviederTypeId", "error");
        return;
    }
    var serviceProviderName = $('#serviceProviederNameId').val().trim().toLowerCase();
    if (serviceProviderName === '' || serviceProviderName === ""
            || serviceProviderName === null || serviceProviderName === undefined) {

        $('#serviceProviederNameId').focus();
        showNotificationError("Please Select Service Provider Name",
                "serviceProviederNameId", "error");
        return;
    }
    //var serviceProviderRegDate = $('#serviceProviderDate').val();
    var start_date = $('#serviceProviderDate').val();
    if (start_date === '') {
        $('#serviceProviderDate').focus();
        showNotificationError("Please Enter Registration Date",
                "serviceProviderDate", "error");
        return false;
    }
    else {
        var d = new Date(start_date.split("-").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        var satart_Date = yy + "-" + mm + "-" + dd;
    }
    var panNumber = $('#panCard_number').val();
    var pancarPath = $("#actualFile").val();
    var tinnumber = $("#tinnumber").val();
    var cinnumber = $('#cinnumber').val();
    var websiteurl = $('#websiteurl').val();
    var serviceLogo = $("#actualLogo").val();
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();
    var reEnterEmail = $('#reEnterEmailId').val();
    var mobileNumber = $('#mobileNumber').val();
    var alertnativeMobile = $('#alternatemobnumber').val();
    //var sprArea = $('.radio-inline:checked').val();
    var sprArea = $("input[name='chooseArea']:checked").val();
    var sprAddress = $('#straddressId').val();
    var sprPincode = $('#strPincode').val();
    var sprlocalArea = $("input[name='chooseArea1']:checked").val();
    // var sprlocalArea = $('.radio-inline1:checked').val();
    var sprlocalAddress = $('#strlocalAddress').val();
    var sprlocalPincode = $('#strlocalPincode').val();
    var username = $('#usernameId').val();
    var password = $('#passwordId').val();
    var reEnterPassword = $('#reEnterPasswordId').val();
    var contactPerson = $('#contactPersonId').val();
    var contactdesignation = $('#contactDesignationId').val();
    var conalternativeEmail = $('#contactaltEmailId').val();
    var contactphoneNumber = $('#phoneNumberId').val();
    var contactmobile = $('#mobileNumberId').val();
    var contactAddress = $('#addressId').val();
    var contactZipcode = $('#zipcodeId').val();
    var userId = 1;
    var moduleId = 1;
    var roleId = 1;
    var updatedbyId=1;

    var obj_Insert = {
        conditionId: condition,
        serviceProviderId: serviceProviderId,
        serviceProviderTypeID: serviceProviderTypeId,
        serviceProviderTypeName: serviceProviderName,
        serviceProviderInCorporationDate: satart_Date,
        pancard_number: panNumber,
        pan_card_path: pancard_img_url,
        tinnumber: tinnumber,
        cinnumber: cinnumber,
        website: websiteurl,
        serviceproviderLogo: srplog_img_url,
        csr_head_fname: firstName,
        csr_head_lname: lastName,
        csr_email: email,
        csr_mobilenumber: mobileNumber,
        csr_alternative_mobilenumber: alertnativeMobile,
        srvice_provider_reg_address: sprAddress,
        srvice_provider_reg_areatype: sprArea,
        srvice_provider_reg_pincode: sprPincode,
        srvice_provider_reg_local_address: sprlocalAddress,
        srvice_provider_reg_local_areatype: sprlocalArea,
        srvice_provider_local_reg_pincode: sprlocalPincode,
        username: username,
        password: password,
        contactperson_name: contactPerson,
        contactperson_designation: contactdesignation,
        contactperson_phno: contactphoneNumber,
        contactperson_alternateemail: conalternativeEmail,
        contactperson_mobile: contactmobile,
        contactperson_address: contactAddress,
        contactperson_pincode: contactZipcode,
        userId: userId,
        moduleId: moduleId,
        roleId: roleId,
        updatedbyId:updatedbyId
    };

    var JSON_OBJECT = JSON.stringify(obj_Insert);
   if (panNumber === '' || panNumber === "" || panNumber === null) {

        $('#panCard_number').focus();
        showNotificationError("Please Select Service PAN Number",
                "panCard_number", "error");
        return;
    }
   
    if (pancarPath === '' || pancarPath === "" || pancarPath === null) {

        $('#actualFile').focus();
        showNotificationError("Please upload PAN card ",
                "actualFile", "error");
        return;
    }

    if (websiteurl === '' || websiteurl === "" || websiteurl === null) {

        $('#websiteurl').focus();
        showNotificationError("Please Select Service Provider website URL",
                "websiteurl", "error");
        return;
    }
    if (firstName === '' || firstName === "" || firstName === null) {

        $('#firstName').focus();
        showNotificationError("Please Select Service Provider First Name",
                "firstName", "error");
        return;
    }
    if (lastName === '' || lastName === "" || lastName === null) {

        $('#lastName').focus();
        showNotificationError("Please Select Service Provider Last Name",
                "lastName", "error");
        return;
    }
    if (email === '' || email === "" || email === null) {

        $('#email').focus();
        showNotificationError("Please Select Service Provider Email Id", "email",
                "error");
        return;
    }

    if (mobileNumber === '' || mobileNumber === ""
            || mobileNumber === null) {

        $('#mobileNumber').focus();
        showNotificationError("Please Select Service Provider Mobile Number",
                "mobileNumber", "error");
        return;
    }

    if (sprAddress === '' || sprAddress === "" || sprAddress === null) {

        $('#straddressId').focus();
        showNotificationError("Please Select Service Provider Address",
                "straddressId", "error");
        return;
    }
    if (sprPincode === '' || sprPincode === "" || sprPincode === null) {

        $('#strPincode').focus();
        showNotificationError("Please Select Service Provider Pin Code",
                "strPincode", "error");
        return;
    }
    if (sprlocalAddress === '' || sprlocalAddress === ""
            || sprlocalAddress === null) {

        $('#strlocalAddress').focus();
        showNotificationError("Please Select Service Provider Local Address",
                "strlocalAddress", "error");
        return;
    }
    if (sprlocalPincode === '' || sprlocalPincode === ""
            || sprlocalPincode === null) {

        $('#strlocalPincode').focus();
        showNotificationError("Please Select Service Provider Local Pincode",
                "strlocalPincode", "error");
        return;
    }
    if (username === '' || username === "" || username === null) {

        $('#usernameId').focus();
        showNotificationError("Please Select Service Provider UserName",
                "usernameId", "error");
        return;
    }
    if (password === '' || password === "" || password === null) {

        $('#passwordId').focus();
        showNotificationError("Please Select Service Provider Pass word",
                "passwordId", "error");
        return;

    }
    if (contactPerson === '' || contactPerson === ""
            || contactPerson === null) {

        $('#contactPersonId').focus();
        showNotificationError("Please Select Service Provider Contact Person Name",
                "contactPersonId", "error");
        return;
    }
    if (contactdesignation === '' || contactdesignation === ""
            || contactdesignation === null) {

        $('#contactDesignationId').focus();
        showNotificationError("Please Select Service Provider Designation",
                "contactDesignationId", "error");
        return;
    }
    if (conalternativeEmail === '' || conalternativeEmail === ""
            || conalternativeEmail === null) {

        $('#contactaltEmailId').focus();
        showNotificationError("Please Select Service Provider EmailId",
                "contactaltEmailId", "error");
        return;
    }
    if (contactmobile === '' || contactmobile === ""|| contactmobile === null) {
        $('#mobileNumberId').focus();
        showNotificationError("Please Select Service Provider Mobile Number",
                "mobileNumberId", "error");
        return;
 }
    if (contactAddress === '' || contactAddress === ""
            || contactAddress === null) {

        $('#addressId').focus();
        showNotificationError("Please Select Service Provider Contact Address",
                "addressId", "error");
        return;
    }
    if (contactZipcode === '' || contactZipcode === ""
            || contactZipcode === null) {

        $('#zipcodeId').focus();
        showNotificationError("Please Select Service Provider Zip code",
                "zipcodeId", "error");
        return;
    }

    var strUrl = Service.regServiceProviderDetails;
    
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(obj_Insert),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        success: function(data) {
            var srpId = data.output;
            if (data !== null || data !== 0) {
                showNotificationError('Inserted Succesfully', 'save_SPR_DataId', 'success');
                localStorage.setItem('srpId', srpId);
                setTimeout(function() {
                    window.location.href = "login.html";
                }, 3000);
            }
        },
        error: function(err) {
            console.log("Error In saveServiceProviderRegistrationDetails Not Inserted"+err);
        }
    });

}catch(err){
	console.log("Error In saveServiceProviderRegistrationDetails Not Inserted"+err);
	
}
}
function showNotificationError(msg, id, msgType) {
    var boxId = '#' + id;
    var options = {
        // whether to hide the notification on click
        clickToHide: true,
        // whether to auto-hide the notification
        autoHide: true,
        // if autoHide, hide after milliseconds
        autoHideDelay: 2000,
        // show the arrow pointing at the element
        arrowShow: true,
        // arrow size in pixels
        arrowSize: 5,
        // position defines the notification position though uses the defaults
        // below
        position: 'right',
        // default positions
        elementPosition: 'top right',
        globalPosition: 'top right',
        // default style
        style: 'bootstrap',
        // default class (string or [string])
        className: msgType,
        // show animation
        showAnimation: 'slideDown',
        // show animation duration
        showDuration: 400,
        // hide animation
        hideAnimation: 'slideUp',
        // hide animation duration
        hideDuration: 200,
        // padding between element and notification
        gap: 2
    };
    $(boxId).notify(msg, options);
}
///*
// *@DESC : Immage upload file stored into server system.
// *@AuthorName : Bharath
// *@DATE : 20-11-2019
// */
//function imageUpload(obj_Insert) {
//try{
//    var file_data = $('#actualFile').prop('files')[0];
//    var form_data = new FormData();
//    form_data.append('file', file_data);
//
//    $.ajax({
//        type: 'post',
//        url: 'http://192.168.1.106:3000/FileController/uploadFile', // point to server-side controller method
//        dataType: 'text',
//        cache: false,
//        contentType: false,
//        processData: false,
//        data: form_data,
//        success: function(e) {
//            console.log("Sucessfully inserted" + e);
//            var data = JSON.parse(e);
//            $('#customFileBtn').val(data.fileDownloadUri);
//        },
//        error: function(e) {
//            console.log("imageUpload error" + e);
//        }
//    });
//}catch(err){
//    console.log("imageUpload error" + err);
//}

//}