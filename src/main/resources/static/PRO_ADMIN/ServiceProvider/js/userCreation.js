
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    // loading dropdowns:
    loadingGenderType();
    loadingDesignationType();
    loadingEmployeeType();
    loadingQualifications();
    loadingCenter_Details();


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



    /*
	 * User Name Characters Validations
	 */
    $("#userNameId").keypress(function(event) {
    	var regex = new RegExp("^[a-zA-Z ]+$");
	    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	    if (!regex.test(key)) {
	        event.preventDefault();
	        return false;
	        
	    }
        $('#userNameId_Error').empty();
    });

    /*
	 * Re Enter password Validations
	 */
    $('#reEnterPasswordId').blur(function() {
        if ($('#passwordId').val() !== $('#reEnterPasswordId').val()) {
            $('#confirmPassword_Error').html(' Password is not matching and please re-enter password').css('color', 'red');
            return false;
        } else{
            $('#confirmPassword_Error').empty();
        }
    });
    /*
	 * Site Logo File Validations
	 */
    $('#actualFile').bind('change', function() {
        var size1 = this.files[0].size;
        // Maximum 3mb
        if (size1 >= 3024000) {
            $('#actualFile_Error').html('Maximum size limit 3 MB').css('color', 'red');
            $('#customFile').val("");
            return false;
        }
        else {
            $('#actualFile_Error').empty();
        }

        var exten = this.files[0].name;
        var finalExten = exten.substr((exten.lastIndexOf('.') + 1)).toLowerCase();
        if ($.inArray(finalExten, ['gif', 'png', 'jpg', 'jpeg', 'pdf']) === -1) {
            $('#actualFile_Error').html('Jpg, jpeg, png, pdf,formats are allowed').css('color', 'red');
            $('#customFile').val("");
            return  false;
        } else {
            $('#actualFile_Error').empty();
        }
    });
});
/*
 * First&Last Name Characters Validations
 */
$("#firstNameId").keypress(function(event) {
	var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
        
    }
    $('#firstNameId_Error').empty();
});


$("#lastNameId").keypress(function(event) {
	var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
        
    }
    $('#lastNameId_Error').empty();
});


/*
 * Onchange functions
 */
$("#genderId").change(function() {
    $('#genderId_Error').empty();
});
$("#date_of_birth").change(function() {
    $('#date_of_birth_Error').empty();
});
$("#emailId").keypress(function() {
    $('#emailId_Error').empty();
});
$("#phone1Id").keypress(function() {
    $('#phone1Id_Error').empty();
});
$("#dateOfJoiningID").change(function() {
    $('#dateOfJoiningID_Error').empty();
});
$("#dateOfRetirementID").change(function() {
    $('#dateOfRetirementID_Error').empty();
});
$("#employeeID").change(function() {
    $('#employeeID_Error').empty();
});
$("#designationID").change(function() {
    $('#designationID_Error').empty();
});
$("#user_CenterId").change(function() {
    $('#CenterId_Error').empty();
});
/*
 * Numaric valus Characters Validations(allow only numaric valus)
 */
$(".numkeypress").on('keypress', function(event) {
    // var regex = new RegExp("^[a-zA-Z0-9]+$");allow digits and charaters not
	// special charaters
    var regex = new RegExp("^[0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
});
/*
 * immage upload validation.
 */

$("#customFileBtn").change(function() {
    $('#customFile').val("");
    $('#actualFile_Error').empty();
});

$("#customFileBtn").blur(function() {
	$('#image_UrlId').empty();
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
 * @DESC : Image uploaded file store into server system. @AuthorName : Bharath
 * @DATE : 20-11-2019
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
                $('#image_UrlId').val(data.fileViewUri);
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
 * Email Validations(allow only numaric valus)
 */
$("#emailId").blur(function() {
	// special charaters
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.value);
    if (regexEmail === false) {
        $('#emailId_Error').html(' Not valid email please re-enter email ').css('color', 'red');
        return false;
    } else {
        $('#emailId_Error').empty();
    }
});
/*
 * For loading the Districs based on the district ID Bharath 06-05-2019 load
 * ServiceProviderType
 */
$("#userNameId").blur(function() {
    userCreationUserisExist();
});

/*
 * Dateof birth and date of joining date validations
 */


$("#dateOfJoiningID").change(function() {
    var dobdate = $("#date_of_birth").val();
    var d = new Date(dobdate.split("-").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    dobdate = yy + "-" + mm + "-" + dd;
    var joingdate = $("#dateOfJoiningID").val();

    var d = new Date(joingdate.split("-").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    joingdate = yy + "-" + mm + "-" + dd;

    var start = new Date(dobdate),
            end = new Date(joingdate),
            diff = new Date(end - start),
            days = diff / 1000 / 60 / 60 / 24;

    if (days >= 6570) {
        $('#dateOfJoiningID_Error').html('');
    } else {
        $('#dateOfJoiningID_Error').html('Minumum Age should be 18 Years for joing ').css('color', 'red');
    }

});


$("#dateOfRetirementID").change(function() {
    var dateOfRetirement = $("#dateOfRetirementID").val();
    var d = new Date(dateOfRetirement.split("-").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    dateOfRetirement = yy + "-" + mm + "-" + dd;
    var joingdate = $("#dateOfJoiningID").val();

    var d = new Date(joingdate.split("-").reverse().join("-"));
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    joingdate = yy + "-" + mm + "-" + dd;

   
    if (dateOfRetirement >joingdate) {
        $('#dateOfRetirementID_Error').html('');
    } else {
        $('#dateOfRetirementID_Error').html('Retirement Date Should be Greater Than the joing Date ').css('color', 'red');
    }

});


/*
 * For loading the loadingDesignationType Bharath 29-11-2019 load
 * loadingDesignationType
 */
function loadingDesignationType() {
    try {
        var strUrl = Service.designationType;
 $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.controllerDTOs;
                    // var selectfirst = "<option value='0'>Please Select
					// ServiceProviderType</option>";

                    $.each(jsonArray, function(i, resData) {
                        var serviceTypeData = "<option value="
                                + resData.designationTypeId + ">"
                                + resData.designationType
                                + "</option>";
                        $(serviceTypeData).appendTo(
                                '#designationID');
                    });
                }
            },
            error: function(err) {
                console.error("Error in loadingDesignationType"
                        + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in loadingDesignationType()' + err);
    }

}

/*
 * For loading GenderType Bharath 29-11-2019 load ServiceProviderType
 */
function loadingGenderType() {
    try {
        var strUrl = Service.genderType;
        console.log("serviceProviderType Url is:" + strUrl);

        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.controllerDTOs;
                    // var selectfirst = "<option value='0'>Please Select
					// ServiceProviderType</option>";

                    $.each(jsonArray, function(i, resData) {
                        var serviceTypeData = "<option value="
                                + resData.genderTypeId + ">"
                                + resData.genderType
                                + "</option>";
                        $(serviceTypeData).appendTo(
                                '#genderId');
                    });
                }
            },
            error: function(err) {
                console.error("Error in genderType"
                        + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in loadingGenderType()' + err);
    }

}

/*
 * For loading loadQualifications Bharath 29-11-2019 load loadQualifications
 */
function loadingQualifications() {
    try {
        var strUrl = Service.loadQualifications;
       
 $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.controllerDTOs;
                    // var selectfirst = "<option value='0'>Please Select
					// ServiceProviderType</option>";

                    $.each(jsonArray, function(i, resData) {
                        var qulificationTypeData = "<option value="
                                + resData.education_id + ">"
                                + resData.education_type
                                + "</option>";
                        $(qulificationTypeData).appendTo(
                                '#qualificationId');
                    });
                }
            },
            error: function(err) {
                console.error("Error in genderType"
                        + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in qulificationTypeData()' + err);
    }

}

/*
 * For loading the loadingEmployeeType Bharath 29-11-2019 load
 * loadingEmployeeType
 */
function loadingEmployeeType() {
    try {
        var strUrl = Service.employeeType;
     
        $.ajax({
            type: 'GET',
            url: strUrl,
            dataType: 'json',
            async: false,
            success: function(data) {
                var responsecode = data.responseCode;
                if (200 !== responsecode) {

                } else {
                    var jsonArray = data.controllerDTOs;
                    // var selectfirst = "<option value='0'>Please Select
					// ServiceProviderType</option>";

                    $.each(jsonArray, function(i, resData) {
                        var serviceTypeData = "<option value="
                                + resData.employeeTypeId + ">"
                                + resData.employeeType
                                + "</option>";
                        $(serviceTypeData).appendTo(
                                '#employeeID');
                    });
                }
            },
            error: function(err) {
                console.error("Error in loadingEmployeeType"
                        + JSON.stringify(err));
            }
        });
    } catch (err) {
        console.error('Error in loadingEmployeeType()' + err);
    }

}/*
	 * @DESC : userCreationUserisExist @AuthorName : Bharath @DATE : 20-11-2019
	 */
function userCreationUserisExist() {
    try {
        var strUrl = Service.userCreationUserIsExist;
        
        $.ajax({
                    type: 'GET',
                    url: strUrl,
                    dataType: 'json',
                    async: false,
                    success: function(data) {
                        var responsecode = data.responseCode;
                        if (200 !== responsecode) {
                        } else {
                            var serviceProviderName = $('#userNameId').val().toLowerCase().trim();
                            serviceProviderName = serviceProviderName.replace(/\s/g, '');

                            var list = data.controllerDTOs;

                            $.each(list, function(i, list) {
                                if (list.userName === serviceProviderName) {
                                    $('#userNameId').focus();
                                    
                                    $("#userNameId_Error").html('username is alerady exist').css('color', 'green');

                                    return;
                                }

                            });

                        }
                    },
                    error: function(err) {
                        console.error("Error in userCreationUserisExist"
                                + JSON.stringify(err));
                    }
                });
    } catch (err) {
        console.error('Error in userCreationUserisExist()' + err);
    }

}

/*
 * For get_Center_Details Purpose
 */
function loadingCenter_Details() {
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
                        $(modules).appendTo('#user_CenterId');
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
 * @DESC : Check User is already exist or not @AuthorName : Bharath @DATE :
 * 20-11-2019
 */
function insertUserCreation() {
	 $('#us_sucessId').html('User Created Successfully').css('color', 'green');
   
    try {
        var userId = 1;// temparary value database not take these value.
        var userName = $("#userNameId").val();
        if (userName === '' || userName === "0" || userName === undefined) {
            $('#userNameId').focus();
            $('#userNameId_Error').html('Please enter user name').css('color', 'red');
            return false;
        }
        var passwordId = $("#passwordId").val();
        if (passwordId === '' || passwordId === "0" || passwordId === undefined) {
            $('#passwordId').focus();
            $('#passwordId_Error').html('Please enter password').css('color', 'red');
            return false;
        }
        var firstName = $("#firstNameId").val();
        if (firstName === '' || firstName === "0" || firstName === undefined) {
            $('#firstNameId').focus();
            $('#firstNameId_Error').html('Please enter first name').css('color', 'red');
            return false;
        }
        var lastName = $("#lastNameId").val();
        if (lastName === '' || lastName === "0" || lastName === undefined) {
            $('#lastNameId').focus();
            $('#lastNameId_Error').html('Please enter last name').css('color', 'red');
            return false;
        }
        var lastName = $("#lastNameId").val();
        if (lastName === '' || lastName === "0" || lastName === undefined) {
            $('#lastNameId').focus();
            $('#lastNameId_Error').html('Please enter last name').css('color', 'red');
            return false;
        }

        var gender = $("#genderId").val();
        if (gender === '' || gender === "0" || gender === undefined) {
            $('#genderId').focus();
            $('#genderId_Error').html('Please select gender').css('color', 'red');
            return false;
        }
        var dob = $("#date_of_birth").val();
        if (dob === '' || dob === "0" || gender === undefined) {
            $('#date_of_birth').focus();
            $('#date_of_birth_Error').html('Please select date of birth').css('color', 'red');
            return false;
        } else {
            var d = new Date(dob.split("-").reverse().join("-"));
            var dd = d.getDate();
            var mm = d.getMonth() + 1;
            var yy = d.getFullYear();
            dob = yy + "-" + mm + "-" + dd;
        }

        var emailId = $("#emailId").val();
        if (emailId === '' || emailId === "0" || emailId === undefined) {
            $('#emailId').focus();
            $('#emailId_Error').html('Please enter emailid').css('color', 'red');
            return false;
        }
        var phone1 = $("#phone1Id").val();
        if (phone1 === '' || phone1 === "0" || phone1 === undefined) {
            $('#phone1Id').focus();
            $('#phone1Id_Error').html('Please enter phone number').css('color', 'red');
            return false;
        }

        var dateOfJoining = $("#dateOfJoiningID").val();

        if (dateOfJoining === '' || dateOfJoining === "0" || dateOfJoining === undefined) {
            $('#dateOfJoiningID').focus();
            $('#dateOfJoiningID_Error').html('Please select dateOfJoining').css('color', 'red');
            return false;
        }
        else {
            var d = new Date(dateOfJoining.split("-").reverse().join("-"));
            var dd = d.getDate();
            var mm = d.getMonth() + 1;
            var yy = d.getFullYear();
            dateOfJoining = yy + "-" + mm + "-" + dd;
        }


        var dateOfRetirement = $("#dateOfRetirementID").val();
        if (dateOfRetirement === '' || dateOfRetirement === "0" || dateOfRetirement === undefined) {
            $('#dateOfRetirementID').focus();
            $('#dateOfRetirementID_Error').html('Please select dateOfRetirement').css('color', 'red');
            return false;
        } else {
            var d = new Date(dateOfRetirement.split("-").reverse().join("-"));
            var dd = d.getDate();
            var mm = d.getMonth() + 1;
            var yy = d.getFullYear();
            dateOfRetirement = yy + "-" + mm + "-" + dd;
        }
        var employeeID = $("#employeeID").val();
        if (employeeID === '' || employeeID === "0" || employeeID === undefined) {
            $('#employeeID').focus();
            $('#employeeID_Error').html('Please select employee').css('color', 'red');
            return false;
        }
        var designationID = $("#designationID").val();
        if (designationID === '' || designationID === "0" || designationID === undefined) {
            $('#designationID').focus();
            $('#designationID_Error').html('Please select designation').css('color', 'red');
            return false;
        }
        var actualFile = $('#image_UrlId').val();
        if (actualFile === '' || actualFile === "0" || actualFile === undefined) {
            $('#actualFile').focus();
            $('#actualFile_Error').html('Please upload image').css('color', 'red');
            return false;
        }   

        var phoneNumber = $("#phone2Id").val();
        if (phoneNumber === '' || phoneNumber === undefined || phoneNumber === null || phoneNumber === "0") {
            phoneNumber = 0;
        } else {
            phoneNumber = phoneNumber;
        }
        var mobilenumber = $("#phone1Id").val();
        if (mobilenumber === '' || mobilenumber === "0" || mobilenumber === undefined) {
            $('#phone1Id').focus();
            $('#phone1Id_Error').html('Please enter phone number').css('color', 'red');
            return false;
        }

        var address = $("#addressId").val();
         if (address === '' || address === "0" || address === undefined) {
            $('#addressId').focus();
            $('#addressId_Error').html('Please enter Address').css('color', 'red');
            return false;
        }
        var qualification = $("#qualificationId").val();
        if (qualification === '' || qualification === "0" || qualification === undefined) {
            $('#qualificationId').focus();
            $('#qualificationId_Error').html('Please select Qualification').css('color', 'red');
            return false;
        }
        var experiance = $("#experienceId").val();
        if (experiance === '' || experiance === "0" || experiance === undefined) {
            $('#experienceId').focus();
            $('#experienceId_Error').html('Please select Experiance').css('color', 'red');
            return false;
        }
        var employeeCode = $("#employeeCode").val();
        if (employeeCode === '' || employeeCode === "0" || employeeCode === undefined) {
            $('#employeeCode').focus();
            $('#employeeCode_Error').html('Please select EmployeeCode').css('color', 'red');
            return false;
        }
        var centerId = $("#user_CenterId").val();
        if (centerId === '' || centerId === "0" || centerId === undefined) {
            $('#user_CenterId').focus();
            $('#CenterId_Error').html('Please select Center').css('color', 'red');
            return false;
        }

        var siteId = localStorage.getItem('active_SiteId');
        var createdById = 1;
        var moduleId = 1;
        var roleId = 1;
        var pincode= 505;// temparary data
       
        
        var obj_Insert = {
            userName: userName,
            userId: userId,
            password: passwordId,
            firstName: firstName,
            lastName: lastName,
            dateofBirth: dob,
            genderType: gender,
            employeeTypeId: employeeID,
            address: address,
            pincode: pincode,
            phoneNumber: phoneNumber,
            mobileNumber: mobilenumber,
            emailId: emailId,
            imagePath: actualFile,
            dateofjoining: dateOfJoining,
            dateofretirement: dateOfRetirement,
            designationId: designationID,
            qualification: qualification,
            employeecode: employeeCode,
            centerId: centerId,
            siteId: siteId,
            experience: experiance,
            createdById: createdById,
            moduleId: moduleId,
            roleId: roleId
        };
        var strUrl = Service.saveUserCreationDetails;
        $.ajax({
            type: "POST",
            url: strUrl,
            dataType: "json",
            data: JSON.stringify(obj_Insert),
            contentType: "application/json",
            async: false,
            crossDomain: true,
            headers: {
            "X-TENANT-ID": "PROCREATE"
        },
            success: function(data) {
                var srpId = data.output;
                if (data !== null || data !== 0) {
                    $('#us_sucessId').html('User Created Successfully').css('color', 'green');
                    setTimeout(function() {
                        window.location.href = "dashboard_1.html";
                    }, 3000);
                }
            },
            error: function(err) {
                console.log("Error In insertUserCreation is not Inserted" + err);
            }
        });

    } catch (err) {
        console.log("Error In insertUserCreation  Not Inserted" + err);
    }
}

/*
 * for reset dropdown
 */
function resetbtn() {
    $('#employeeID').val('0').trigger('chosen:updated');
    $('#designationID').val('0').trigger('chosen:updated');
    $('#genderId').val('0').trigger('chosen:updated');
    $('#qualificationId').val('0').trigger('chosen:updated');
    $('#user_CenterId').val('0').trigger('chosen:updated');

}