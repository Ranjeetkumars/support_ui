

var user_Id;
var roleid;
var moduleid;
$(document).ready(function() {
	 user_Id = localStorage.getItem('userID');
	 roleid = localStorage.getItem('wfms_roleID');
	 moduleid = localStorage.getItem('wfms_moduleID');
 	var serial_id=$('#userId').val();
    var id = getUrlVars()["patterenid"];

    $('#patterenid').val(id);    
    get_Days_DropDownForUpdate();
    Get_ShiftPatterns_Operators_Detail(id);
});

//get patteren Details based on patteren id
  function Get_ShiftPatterns_Operators_Detail(patterenid) {
    var json_ShiftPatterns_Erc_Details = {
        "patterntype": patterenid
    };
   // var strUrl = "http://localhost:9160/wfms/ManageResourceController/getPatterenDetailsBasedOnPatterenid";
    var strUrl=Service.getPatterenDetailsBasedOnPatterenid;
    $.ajax({
    	 type: "POST",
         url: strUrl,
         dataType: "json",
         data: JSON.stringify(json_ShiftPatterns_Erc_Details),
         contentType: "application/json",
         async: false,
         crossDomain: true,
         headers: {
             "X-TENANT-ID": "PROCREATE"
         },
        success: function(data) {     	
            var strData = data.objPatternsERCControllerDTO;
            for (var i = 0; i < strData.length; i++) {
            	$('#upattern_Operator_Id').val(strData[i].patterntype);
            	$('#udesc_Operator_Id').val(strData[i].patterndesc);
          
            	$("#uday1_Id option:contains(" + strData[i].shiftpattern_1 + ")").attr(
						'selected', 'selected').trigger("chosen:updated");
            	$("#uday2_Id option:contains(" + strData[i].shiftpattern_2 + ")").attr(
						'selected', 'selected').trigger("chosen:updated");
            	$("#uday3_Id option:contains(" + strData[i].shiftpattern_3 + ")").attr(
						'selected', 'selected').trigger("chosen:updated");
            	$("#uday4_Id option:contains(" + strData[i].shiftpattern_4 + ")").attr(
						'selected', 'selected').trigger("chosen:updated");
            	$("#uday5_Id option:contains(" + strData[i].shiftpattern_5 + ")").attr(
						'selected', 'selected').trigger("chosen:updated");        
	$("#uday6_Id option:contains(" + strData[i].shiftpattern_6 + ")").attr(
			'selected', 'selected').trigger("chosen:updated");
	$("#uday7_Id option:contains(" + strData[i].shiftpattern_7 + ")").attr(
			'selected', 'selected').trigger("chosen:updated");
	$("#uday8_Id option:contains(" + strData[i].shiftpattern_8 + ")").attr(
			'selected', 'selected').trigger("chosen:updated");
	$("#uday9_Id option:contains(" + strData[i].shiftpattern_9+ ")").attr(
			'selected', 'selected').trigger("chosen:updated");
	$("#uday10_Id option:contains(" + strData[i].shiftpattern_10 + ")").attr(
			'selected', 'selected').trigger("chosen:updated");
	$("#uday11_Id option:contains(" + strData[i].shiftpattern_11 + ")").attr(
			'selected', 'selected').trigger("chosen:updated");
	$("#uday12_Id option:contains(" + strData[i].shiftpattern_12 + ")").attr(
			'selected', 'selected').trigger("chosen:updated");
	$("#uday13_Id option:contains(" + strData[i].shiftpattern_13 + ")").attr(
			'selected', 'selected').trigger("chosen:updated");
	$("#uday14_Id option:contains(" + strData[i].shiftpattern_14 + ")").attr(
			'selected', 'selected').trigger("chosen:updated");  
	$("#uday15_Id option:contains(" + strData[i].shiftpattern_15 + ")").attr(
			'selected', 'selected').trigger("chosen:updated");  
	$("#uday16_Id option:contains(" + strData[i].shiftpattern_16+ ")").attr(
			'selected', 'selected').trigger("chosen:updated"); 
	
            }
        },
        error: function(err) {
         //   console.error("Error in Get_ShiftPatterns_Operators_Details" + JSON.stringify(err));
        }
    });
}



function get_Days_DropDownForUpdate() {
	$('#day1_Id').empty();
    var strUrl = Service.Days_DropDown_Details;
    $.ajax({
        type: 'GET',
        url: strUrl,
        dataType: 'json',
        async: false,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("No Data Found");
            } else {
                var jsonArray = data.objPatternsERCControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var user_shift = "<option value=" + resData.user_shifttypeid + "," + resData.user_shifttype + ">" + resData.user_shifttype + "</option>";
                    $(user_shift).appendTo('#uday1_Id');
                    $(user_shift).appendTo('#uday2_Id');
                    $(user_shift).appendTo('#uday3_Id');
                    $(user_shift).appendTo('#uday4_Id');
                    $(user_shift).appendTo('#uday5_Id');
                    $(user_shift).appendTo('#uday6_Id');
                    $(user_shift).appendTo('#uday7_Id');
                    $(user_shift).appendTo('#uday8_Id');
                    $(user_shift).appendTo('#uday9_Id');
                    $(user_shift).appendTo('#uday10_Id');
                    $(user_shift).appendTo('#uday11_Id');
                    $(user_shift).appendTo('#uday12_Id');
                    $(user_shift).appendTo('#uday13_Id');
                    $(user_shift).appendTo('#uday14_Id');
                    $(user_shift).appendTo('#uday15_Id');
                    $(user_shift).appendTo('#uday16_Id');
                    $(user_shift).appendTo('#uday17_Id');
                    $(user_shift).appendTo('#uday18_Id');
                    $(user_shift).appendTo('#uday19_Id');
                    $(user_shift).appendTo('#uday20_Id');
                });
            }
        },
        error: function(err) {
            console.error("Error in get_Leave_Type_DropDown" + JSON.stringify(err));
        }
    });
}


function resetDetails(){
	$('#upattern_Operator_Id').val("");
	$('#udesc_Operator_Id').val("");
	$('#uday1_Id').val("0").trigger("chosen:updated");
	$('#uday2_Id').val("0").trigger("chosen:updated");
	$('#uday3_Id').val("0").trigger("chosen:updated");
	$('#uday4_Id').val("0").trigger("chosen:updated");
	$('#uday5_Id').val("0").trigger("chosen:updated");
	$('#uday6_Id').val("0").trigger("chosen:updated");
	$('#uday7_Id').val("0").trigger("chosen:updated");

	$('#uday8_Id').val("0").trigger("chosen:updated");
	$('#uday9_Id').val("0").trigger("chosen:updated");
	$('#uday10_Id').val("0").trigger("chosen:updated");
	$('#uday11_Id').val("0").trigger("chosen:updated");
	$('#uday12_Id').val("0").trigger("chosen:updated");
	$('#uday13_Id').val("0").trigger("chosen:updated");
	$('#uday14_Id').val("0").trigger("chosen:updated");
	
	$('#uday15_Id').val("0").trigger("chosen:updated");
	$('#uday16_Id').val("0").trigger("chosen:updated");
	$('#uday17_Id').val("0").trigger("chosen:updated");
	$('#uday18_Id').val("0").trigger("chosen:updated");
	$('#uday19_Id').val("0").trigger("chosen:updated");
	$('#uday20_Id').val("0").trigger("chosen:updated");
}


/*
 For update_ShiftPatterns_Operators_Details Purpose
 */
function update_ShiftPatterns_Operators_Details() {
    var single_quotes = "'";
    var shiftpattern_createdbyid = user_Id;
    var shiftpattern_createdbymoduleid = moduleid;
    var shiftpattern_createdbyroleid = roleid;
    var pattern_Type = $('#upattern_Operator_Id').val();
     var pattern_Typeid=pattern_Type.trim();
    if (pattern_Typeid==undefined||pattern_Typeid=="") {
        showNotificationError('Please enter pattern type', 'upattern_Operator_Id', 'error');
        return false;
    }
    var pattern_Desc = $('#udesc_Operator_Id').val();
    if (pattern_Desc === '') {
        showNotificationError('Please enter pattern description', 'udesc_Operator_Id', 'error');
        return false;
    }
    var isactive = $("input[name='isactive']:checked").val();
    if (isactive === '') {
        showNotificationError('Please select status', 'pattern_Desc', 'error');
        return false;
    }
    
    var day1 = $('#uday1_Id').val();
    var day1_Id = day1.split(',');
    if (day1 === "0" || day1 === "") {
        showNotificationError('Please Select Day 1 Shift', 'update_Pattern', 'error');
        return false;
    } else {
        day1_Id = single_quotes+day1_Id[1]+single_quotes;
    }
    var day2 = $('#uday2_Id').val();
    var day2_Id = day2.split(',');
    if (day2 === "0" || day2 === "") {
        showNotificationError('Please Select Day 2 Shift', 'update_Pattern', 'error');
        return false;
    } else {
        day2_Id = single_quotes+day2_Id[1]+single_quotes;
    }
    var day3 = $('#uday3_Id').val();
    var day3_Id = day3.split(',');
    if (day3 === "0" || day3 === "") {
        showNotificationError('Please Select Day 3 Shift', 'update_Pattern', 'error');
        return false;
    } else {
        day3_Id = single_quotes+day3_Id[1]+single_quotes;
    }
    var day4 = $('#uday4_Id').val();
    var day4_Id = day4.split(',');
    if (day4_Id === "0" || day4_Id === "") {
        showNotificationError('Please Select Day 4 Shift', 'update_Pattern', 'error');
        return false;
    }
    else {
        day4_Id = single_quotes+day4_Id[1]+single_quotes;
    }
    var day5 = $('#uday5_Id').val();
    var day5_Id = day5.split(',');
    if (day5 === "0" || day5 === "") {
        showNotificationError('Please Select Day 5 Shift', 'update_Pattern', 'error');
        return false;
    } else {
        day5_Id = single_quotes+day5_Id[1]+single_quotes;
    }

    var day6 = $('#uday6_Id').val();
    var day6_Id = day6.split(',');
    if (day6 === "0" || day6 === "") {
        showNotificationError('Please Select Day 6 Shift', 'update_Pattern', 'error');
        return false;
    } else {
        day6_Id = single_quotes+day6_Id[1]+single_quotes;
    }
    var day7 = $('#uday7_Id').val();
    var day7_Id = day7.split(',');
    if (day7 === "0" || day7 === "") {
        showNotificationError('Please Select Day 7 Shift', 'update_Pattern', 'error');
        return false;
    } else {
        day7_Id =single_quotes+ day7_Id[1]+single_quotes;
    }

    var day8 = $('#uday8_Id').val();
    var day8_Id = day8.split(',');
    if (day8 === "0" || day8 === "") {
        day8_Id = "null";
    } else {
        day8_Id = single_quotes + day8_Id[1] + single_quotes;
    }
    var day9 = $('#uday9_Id').val();
    var day9_Id = day9.split(',');
    if (day9 === "0" || day9 === "") {
        day9_Id = "null";
    } else {
        day9_Id = single_quotes + day9_Id[1] + single_quotes;
    }
    var day10 = $('#uday10_Id').val();
    var day10_Id = day10.split(',');
    if (day10 === "0" || day10 === "") {
        day10_Id = "null";
    } else {
        day10_Id = single_quotes + day10_Id[1] + single_quotes;
    }

    var day11 = $('#uday11_Id').val();
    var day11_Id = day11.split(',');
    if (day11 === "0" || day11 === "") {
        day11_Id = "null";
    } else {
        day11_Id = single_quotes + day11_Id[1] + single_quotes;
    }

    var day12 = $('#uday12_Id').val();
    var day12_Id = day12.split(',');
    if (day12 === "0" || day12 === "") {
        day12_Id = "null";
    } else {
        day12_Id = single_quotes + day12_Id[1] + single_quotes;
    }

    var day13 = $('#uday13_Id').val();
    var day13_Id = day13.split(',');
    if (day13 === "0" || day13 === "") {
        day13_Id = "null";
    } else {
        day13_Id = single_quotes + day13_Id[1] + single_quotes;
    }

    var day14 = $('#uday14_Id').val();
    var day14_Id = day14.split(',');
    if (day14 === "0" || day14 === "") {
        day14_Id = "null";
    } else {
        day14_Id = single_quotes + day14_Id[1] + single_quotes;
    }

    var day15 = $('#uday15_Id').val();
    var day15_Id = day15.split(',');
    if (day15 === "0" || day15 === "") {
        day15_Id = "null";
    } else {
        day15_Id = single_quotes + day15_Id[1] + single_quotes;
    }

    var day16 = $('#uday16_Id').val();
    var day16_Id = day16.split(',');
    if (day16 === "0" || day16 === "") {
        day16_Id = "null";
    } else {
        day16_Id = single_quotes + day16_Id[1] + single_quotes;
    }

    var day17 = $('#uday17_Id').val();
    var day17_Id = day17.split(',');
    if (day17 === "0" || day17 === "") {
        day17_Id = "null";
    } else {
        day17_Id = single_quotes + day17_Id[1] + single_quotes;
    }

    var day18 = $('#uday18_Id').val();
    var day18_Id = day18.split(',');
    if (day18 === "0" || day18 === "") {
        day18_Id = "null";
    } else {
        day18_Id = single_quotes + day18_Id[1] + single_quotes;
    }

    var day19 = $('#uday19_Id').val();
    var day19_Id = day19.split(',');
    if (day19 === "0" || day19 === "") {
        day19_Id = "null";
    } else {
        day19_Id = single_quotes + day19_Id[1] + single_quotes;
    }

    var day20 = $('#uday20_Id').val();
    var day20_Id = day20.split(',');
    if (day20 === "0" || day20 === "") {
        day20_Id = "null";
    } else {
        day20_Id = single_quotes + day20_Id[1] + single_quotes;
    }

	var status = $("input[name='isactive']:checked").val();
	if (status) {
	//	alert("Your are a - " + status);
	}

    var patteren_id=$('#patterenid').val();
    console.log("patteren_id---------------->"+patteren_id);
    var json_ShiftPatterns_Erc_Details = {
        "shiftpattern_shiftpatternid": patteren_id,
        "patterntype": pattern_Type,
        "patterndesc": pattern_Desc,
        "shiftpattern_1": day1_Id,
        "shiftpattern_2": day2_Id,
        "shiftpattern_3": day3_Id,
        "shiftpattern_4": day4_Id,
        "shiftpattern_5": day5_Id,
        "shiftpattern_6": day6_Id,
        "shiftpattern_7": day7_Id,
        "shiftpattern_8": day8_Id,
        "shiftpattern_9": day9_Id,
        "shiftpattern_10": day10_Id,
        "shiftpattern_11": day11_Id,
        "shiftpattern_12": day12_Id,
        "shiftpattern_13": day13_Id,
        "shiftpattern_14": day14_Id,
        "shiftpattern_15": day15_Id,
        "shiftpattern_16": day16_Id,
        "shiftpattern_17": day17_Id,
        "shiftpattern_18": day18_Id,
        "shiftpattern_19": day19_Id,
        "shiftpattern_20": day20_Id,
        "shiftpattern_createdbyid": shiftpattern_createdbyid,
        "shiftpattern_createdroleid": shiftpattern_createdbyroleid,
        "shiftpattern_createdmoduleid": shiftpattern_createdbymoduleid,
        "shiftpattern_isactive": true,
        "schduleTypeId":2//If ShcduleTypeId 2 Means Pattern Operators
     
    };
    var strUrl = Service.updatePatteren;
    console.log('::::: JSON OBJECT OF ERC ::::::' + JSON.stringify(json_ShiftPatterns_Erc_Details));

    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_ShiftPatterns_Erc_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
                alert("No Data Found");
           }
            else {
                showNotificationError('Pattern Update Succesfully', 'update_Pattern', 'success');
                setTimeout(function() {
                    window.location.href = "PatternOperator.html";
                }, 3000);
            }
        },
        error: function(err) {
            console.error("Error in update_ShiftPatterns_Operators_Details" + JSON.stringify(err));
        }
    });
}

