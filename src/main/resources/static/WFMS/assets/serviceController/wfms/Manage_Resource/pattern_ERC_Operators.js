/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 Page onload Calling functions
 */

var user_Id;
var roleid;
var moduleid;
$(document).ready(function() {
    localStorage.removeItem("pattern_Id");
	 user_Id = localStorage.getItem('userID');
	 roleid = localStorage.getItem('wfms_roleID');
	 moduleid = localStorage.getItem('wfms_moduleID');
    get_Days_DropDown();
    Get_ShiftPatterns_Erc_Details();
    Get_ShiftPatterns_Operators_Details();
});


function resetDetails() {
	$('#pattern_Type').val("");
	$('#pattern_Desc').val("");
	$('#Miles').removeAttr('checked');
	$('#day1_Id').val('').trigger('chosen:updated');
	$('#day2_Id').val('').trigger('chosen:updated');
	$('#day3_Id').val('').trigger('chosen:updated');
	$('#day4_Id').val('').trigger('chosen:updated');
	$('#day5_Id').val('').trigger('chosen:updated');
	$('#day6_Id').val('').trigger('chosen:updated');
	$('#day7_Id').val('').trigger('chosen:updated');
	$('#day8_Id').val('').trigger('chosen:updated');
	$('#day9_Id').val('').trigger('chosen:updated');
	$('#day10_Id').val('').trigger('chosen:updated');
	$('#day11_Id').val('').trigger('chosen:updated');
	$('#day12_Id').val('').trigger('chosen:updated');
	$('#day13_Id').val('').trigger('chosen:updated');
	$('#day14_Id').val('').trigger('chosen:updated');
	$('#day15_Id').val('').trigger('chosen:updated');
	$('#day16_Id').val('').trigger('chosen:updated');
	$('#day17_Id').val('').trigger('chosen:updated');
	$('#day18_Id').val('').trigger('chosen:updated');
	$('#day19_Id').val('').trigger('chosen:updated');
	$('#day20_Id').val('').trigger('chosen:updated');




	
}

/*
 For Get_ShiftPatterns_Erc_Details Purpose
 */
function Get_ShiftPatterns_Erc_Details() {
    var strUrl = Service.Get_ShiftPatterns_Erc_Details;
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
           // get_ShiftPatterns_Erc_Details_DOM(jsonArray);
           // loadDataTable2();
            if (responsecode !== 200) {
            } else {
                var jsonArray = data.objPatternsERCControllerDTO;
                get_ShiftPatterns_Erc_Details_DOM(jsonArray);
                loadDataTable2();
            }
        },
        error: function(err) {
            console.error("Error in Get_ShiftPatterns_Erc_Details" + JSON.stringify(err));
        }
    });
}


/*
 For Get_ShiftPatterns_Operators_Details Purpose
 */
function Get_ShiftPatterns_Operators_Details() {
    var strUrl = Service.Get_ShiftPatterns_Operators_Details;
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
            get_ShiftPatterns_Opreators_Details_DOM(jsonArray);
            loadDataTable3();
            if (responsecode !== 200) {
            } else {
                var jsonArray = data.objPatternsERCControllerDTO;
                get_ShiftPatterns_Opreators_Details_DOM(jsonArray);
                loadDataTable3();
            }
        },
        error: function(err) {
            console.error("Error in Get_ShiftPatterns_Operators_Details" + JSON.stringify(err));
        }
    });
}



/*
 For Loading Days Drop Down Purpose
 */
function get_Days_DropDown() {
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
            } else {
                var jsonArray = data.objPatternsERCControllerDTO;
                $.each(jsonArray, function(i, resData) {
                    var user_shift = "<option value=" + resData.user_shifttypeid + "," + resData.user_shifttype + ">" + resData.user_shifttype + "</option>";
                    $(user_shift).appendTo('#day1_Id');
                    $(user_shift).appendTo('#day2_Id');
                    $(user_shift).appendTo('#day3_Id');
                    $(user_shift).appendTo('#day4_Id');
                    $(user_shift).appendTo('#day5_Id');
                    $(user_shift).appendTo('#day6_Id');
                    $(user_shift).appendTo('#day7_Id');
                    $(user_shift).appendTo('#day8_Id');
                    $(user_shift).appendTo('#day9_Id');
                    $(user_shift).appendTo('#day10_Id');
                    $(user_shift).appendTo('#day11_Id');
                    $(user_shift).appendTo('#day12_Id');
                    $(user_shift).appendTo('#day13_Id');
                    $(user_shift).appendTo('#day14_Id');
                    $(user_shift).appendTo('#day15_Id');
                    $(user_shift).appendTo('#day16_Id');
                    $(user_shift).appendTo('#day17_Id');
                    $(user_shift).appendTo('#day18_Id');
                    $(user_shift).appendTo('#day19_Id');
                    $(user_shift).appendTo('#day20_Id');
                });
            }
        },
        error: function(err) {
            console.error("Error in get_Leave_Type_DropDown" + JSON.stringify(err));
        }
    });
}


/*
 For Get_ShiftPattern_Count Purpose
 */
function Get_ShiftPattern_Count() {
    var strUrl = Service.Get_ShiftPattern_Count;
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
            if (responsecode !== 200) {
            } else {
                $('#shiftpatern_erc_count').val(data.count);
                $('#shiftpatern_operators_count').val(data.count);
            }
        },
        error: function(err) {
            console.error("Error in Get_ShiftPattern_Count" + JSON.stringify(err));
        }
    });
}


/*
 For Insert_ShiftPatterns_Erc_Details Purpose
 */
function Insert_ShiftPatterns_Erc_Details() {
console.log("Insert_ShiftPatterns_Erc_Details ==========>");
    var single_quotes = "'";
    var shiftpattern_createdbyid = user_Id;
    var shiftpattern_createdbymoduleid = moduleid;
    var shiftpattern_createdbyroleid = roleid;
    var pattern_Type = $('#pattern_Type').val();


    if (pattern_Type === '') {
        showNotificationError('Please enter pattern type', 'pattern_Type', 'error');
        return false;
    }
    var pattern_Desc = $('#pattern_Desc').val();
    if (pattern_Desc === '') {
        showNotificationError('Please enter pattern description', 'pattern_Desc', 'error');
        return false;
    }
    var isactive = $("input[name='isactive']:checked").val();
    if (isactive === '') {
        showNotificationError('Please select status', 'pattern_Desc', 'error');
        return false;
    }
    Get_ShiftPattern_Count();

    var shiftpatternid1 = $('#shiftpatern_erc_count').val();
    var shiftpatternid = shiftpatternid1 * 1 + 1;
    var day1 = $('#day1_Id').val();
    var day1_Id = day1.split(',');
    if (day1 === "0" || day1 === "") {
        showNotificationError('Please Select Day 1 Shift', 'save_Pattern', 'error');
        return false;
    } else {
        day1_Id = day1_Id[1];
    }
    var day2 = $('#day2_Id').val();
    console.log(day2);
    var day2_Id = day2.split(',');
    if (day2 === "0" || day2 === "") {
        showNotificationError('Please Select Day 2 Shift', 'save_Pattern', 'error');
        return false;
    } else {
        day2_Id = day2_Id[1];
    }
    var day3 = $('#day3_Id').val();
    var day3_Id = day3.split(',');
    if (day3 === "0" || day3 === "") {
        showNotificationError('Please Select Day 3 Shift', 'save_Pattern', 'error');
        return false;
    } else {
        day3_Id = day3_Id[1];
    }
    var day4 = $('#day4_Id').val();
    var day4_Id = day4.split(',');
    if (day4_Id === "0" || day4_Id === "") {
        showNotificationError('Please Select Day 4 Shift', 'save_Pattern', 'error');
        return false;
    }
    else {
        day4_Id = day4_Id[1];
    }
    var day5 = $('#day5_Id').val();
    var day5_Id = day5.split(',');
    if (day5 === "0" || day5 === "") {
        showNotificationError('Please Select Day 5 Shift', 'save_Pattern', 'error');
        return false;
    } else {
        day5_Id = day5_Id[1];
    }

    var day6 = $('#day6_Id').val();
    var day6_Id = day6.split(',');
    if (day6 === "0" || day6 === "") {
        showNotificationError('Please Select Day 6 Shift', 'save_Pattern', 'error');
        return false;
    } else {
        day6_Id = day6_Id[1];
    }
    var day7 = $('#day7_Id').val();
    var day7_Id = day7.split(',');
    if (day7 === "0" || day7 === "") {
        showNotificationError('Please Select Day 7 Shift', 'save_Pattern', 'error');
        return false;
    } else {
        day7_Id = day7_Id[1];
    }

    var day8 = $('#day8_Id').val();
    var day8_Id = day8.split(',');
    if (day8 === "0" || day8 === "") {
        day8_Id = "null";
    } else {
        day8_Id = single_quotes + day8_Id[1] + single_quotes;
    }
    var day9 = $('#day9_Id').val();
    var day9_Id = day9.split(',');
    if (day9 === "0" || day9 === "") {
        day9_Id = "null";
    } else {
        day9_Id = single_quotes + day9_Id[1] + single_quotes;
    }
    var day10 = $('#day10_Id').val();
    var day10_Id = day10.split(',');
    if (day10 === "0" || day10 === "") {
        day10_Id = "null";
    } else {
        day10_Id = single_quotes + day10_Id[1] + single_quotes;
    }

    var day11 = $('#day11_Id').val();
    var day11_Id = day11.split(',');
    if (day11 === "0" || day11 === "") {
        day11_Id = "null";
    } else {
        day11_Id = single_quotes + day11_Id[1] + single_quotes;
    }

    var day12 = $('#day12_Id').val();
    var day12_Id = day12.split(',');
    if (day12 === "0" || day12 === "") {
        day12_Id = "null";
    } else {
        day12_Id = single_quotes + day12_Id[1] + single_quotes;
    }

    var day13 = $('#day13_Id').val();
    var day13_Id = day13.split(',');
    if (day13 === "0" || day13 === "") {
        day13_Id = "null";
    } else {
        day13_Id = single_quotes + day13_Id[1] + single_quotes;
    }

    var day14 = $('#day14_Id').val();
    var day14_Id = day14.split(',');
    if (day14 === "0" || day14 === "") {
        day14_Id = "null";
    } else {
        day14_Id = single_quotes + day14_Id[1] + single_quotes;
    }

    var day15 = $('#day15_Id').val();
    var day15_Id = day15.split(',');
    if (day15 === "0" || day15 === "") {
        day15_Id = "null";
    } else {
        day15_Id = single_quotes + day15_Id[1] + single_quotes;
    }

    var day16 = $('#day16_Id').val();
    var day16_Id = day16.split(',');
    if (day16 === "0" || day16 === "") {
        day16_Id = "null";
    } else {
        day16_Id = single_quotes + day16_Id[1] + single_quotes;
    }

    var day17 = $('#day17_Id').val();
    var day17_Id = day17.split(',');
    if (day17 === "0" || day17 === "") {
        day17_Id = "null";
    } else {
        day17_Id = single_quotes + day17_Id[1] + single_quotes;
    }

    var day18 = $('#day18_Id').val();
    var day18_Id = day18.split(',');
    if (day18 === "0" || day18 === "") {
        day18_Id = "null";
    } else {
        day18_Id = single_quotes + day18_Id[1] + single_quotes;
    }

    var day19 = $('#day19_Id').val();
    var day19_Id = day19.split(',');
    if (day19 === "0" || day19 === "") {
        day19_Id = "null";
    } else {
        day19_Id = single_quotes + day19_Id[1] + single_quotes;
    }

    var day20 = $('#day20_Id').val();
    var day20_Id = day20.split(',');
    if (day20 === "0" || day20 === "") {
        day20_Id = "null";
    } else {
        day20_Id = single_quotes + day20_Id[1] + single_quotes;
    }

    var sheduledtypeid = "1";//Pattern ERC

    var json_ShiftPatterns_Erc_Details = {
        "shiftpattern_shiftpatternid": shiftpatternid,
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
        "shiftpattern_createddtm": "now()",
        "shiftpattern_isactive": isactive,
        "shiftpattern_sheduledtypeid": sheduledtypeid
    };
    var strUrl = Service.Insert_ShiftPatterns_Erc_Details;
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
            }
            else {
                showNotificationError('Pattern Inserted Succesfully', 'save_Pattern', 'success');
                setTimeout(function() {
                    window.location.reload();
                }, 3000);
            }
        },
        error: function(err) {
            console.error("Error in json_ShiftPatterns_Erc_Details" + JSON.stringify(err));
        }
    });
}


/*
 For Insert_ShiftPatterns_Operators_Details Purpose
 */
function Insert_ShiftPatterns_Operators_Details() {

    var single_quotes = "'";
    var shiftpattern_createdbyid = user_Id;
    var shiftpattern_createdbymoduleid = moduleid;
    var shiftpattern_createdbyroleid = roleid;
    var pattern_Type = $('#pattern_Operator_Id').val();


    if (pattern_Type === '') {
        showNotificationError('Please enter pattern type', 'pattern_Operator_Id', 'error');
        return false;
    }
    var pattern_Desc = $('#desc_Operator_Id').val();
    if (pattern_Desc === '') {
        showNotificationError('Please enter pattern description', 'desc_Operator_Id', 'error');
        return false;
    }
    var isactive = $("input[name='isactive']:checked").val();
    if (isactive === '') {
        showNotificationError('Please select status', 'desc_Operator_Id', 'error');
        return false;
    }
    Get_ShiftPattern_Count();

    var shiftpatternid1 = $('#shiftpatern_operators_count').val();
    var shiftpatternid = shiftpatternid1 * 1 + 1;

    var day1 = $('#day1_Id').val();
    var day1_Id = day1.split(',');
    if (day1 === "0" || day1 === "") {
        showNotificationError('Please Select Day 1 Shift', 'save_Pattern', 'error');
        return false;
    } else {
        day1_Id = day1_Id[1];
    }
    var day2 = $('#day2_Id').val();
    var day2_Id = day2.split(',');
    if (day2 === "0" || day2 === "") {
        showNotificationError('Please Select Day 2 Shift', 'save_Pattern', 'error');
        return false;
    } else {
        day2_Id = day2_Id[1];
    }
    var day3 = $('#day3_Id').val();
    var day3_Id = day3.split(',');
    if (day3 === "0" || day3 === "") {
        showNotificationError('Please Select Day 3 Shift', 'save_Pattern', 'error');
        return false;
    } else {
        day3_Id = day3_Id[1];
    }
    var day4 = $('#day4_Id').val();
    var day4_Id = day4.split(',');
    if (day4_Id === "0" || day4_Id === "") {
        showNotificationError('Please Select Day 4 Shift', 'save_Pattern', 'error');
        return false;
    }
    else {
        day4_Id = day4_Id[1];
    }
    var day5 = $('#day5_Id').val();
    var day5_Id = day5.split(',');
    if (day5 === "0" || day5 === "") {
        showNotificationError('Please Select Day 5 Shift', 'save_Pattern', 'error');
        return false;
    } else {
        day5_Id = day5_Id[1];
    }

    var day6 = $('#day6_Id').val();
    var day6_Id = day6.split(',');
    if (day6 === "0" || day6 === "") {
        showNotificationError('Please Select Day 6 Shift', 'save_Pattern', 'error');
        return false;
    } else {
        day6_Id = day6_Id[1];
    }
    var day7 = $('#day7_Id').val();
    var day7_Id = day7.split(',');
    if (day7 === "0" || day7 === "") {
        showNotificationError('Please Select Day 7 Shift', 'save_Pattern', 'error');
        return false;
    } else {
        day7_Id = day7_Id[1];
    }

    var day8 = $('#day8_Id').val();
    var day8_Id = day8.split(',');
    if (day8 === "0" || day8 === "") {
        day8_Id = "null";
    } else {
        day8_Id = single_quotes + day8_Id[1] + single_quotes;
    }
    var day9 = $('#day9_Id').val();
    var day9_Id = day9.split(',');
    if (day9 === "0" || day9 === "") {
        day9_Id = "null";
    } else {
        day9_Id = single_quotes + day9_Id[1] + single_quotes;
    }
    var day10 = $('#day10_Id').val();
    var day10_Id = day10.split(',');
    if (day10 === "0" || day10 === "") {
        day10_Id = "null";
    } else {
        day10_Id = single_quotes + day10_Id[1] + single_quotes;
    }

    var day11 = $('#day11_Id').val();
    var day11_Id = day11.split(',');
    if (day11 === "0" || day11 === "") {
        day11_Id = "null";
    } else {
        day11_Id = single_quotes + day11_Id[1] + single_quotes;
    }

    var day12 = $('#day12_Id').val();
    var day12_Id = day12.split(',');
    if (day12 === "0" || day12 === "") {
        day12_Id = "null";
    } else {
        day12_Id = single_quotes + day12_Id[1] + single_quotes;
    }

    var day13 = $('#day13_Id').val();
    var day13_Id = day13.split(',');
    if (day13 === "0" || day13 === "") {
        day13_Id = "null";
    } else {
        day13_Id = single_quotes + day13_Id[1] + single_quotes;
    }

    var day14 = $('#day14_Id').val();
    var day14_Id = day14.split(',');
    if (day14 === "0" || day14 === "") {
        day14_Id = "null";
    } else {
        day14_Id = single_quotes + day14_Id[1] + single_quotes;
    }

    var day15 = $('#day15_Id').val();
    var day15_Id = day15.split(',');
    if (day15 === "0" || day15 === "") {
        day15_Id = "null";
    } else {
        day15_Id = single_quotes + day15_Id[1] + single_quotes;
    }

    var day16 = $('#day16_Id').val();
    var day16_Id = day16.split(',');
    if (day16 === "0" || day16 === "") {
        day16_Id = "null";
    } else {
        day16_Id = single_quotes + day16_Id[1] + single_quotes;
    }

    var day17 = $('#day17_Id').val();
    var day17_Id = day17.split(',');
    if (day17 === "0" || day17 === "") {
        day17_Id = "null";
    } else {
        day17_Id = single_quotes + day17_Id[1] + single_quotes;
    }

    var day18 = $('#day18_Id').val();
    var day18_Id = day18.split(',');
    if (day18 === "0" || day18 === "") {
        day18_Id = "null";
    } else {
        day18_Id = single_quotes + day18_Id[1] + single_quotes;
    }

    var day19 = $('#day19_Id').val();
    var day19_Id = day19.split(',');
    if (day19 === "0" || day19 === "") {
        day19_Id = "null";
    } else {
        day19_Id = single_quotes + day19_Id[1] + single_quotes;
    }

    var day20 = $('#day20_Id').val();
    var day20_Id = day20.split(',');
    if (day20 === "0" || day20 === "") {
        day20_Id = "null";
    } else {
        day20_Id = single_quotes + day20_Id[1] + single_quotes;
    }
    var sheduledtypeid = "2";

    var json_ShiftPatterns_Operators_Details = {
        "shiftpattern_shiftpatternid": shiftpatternid,
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
        "shiftpattern_createddtm": "now()",
        "shiftpattern_isactive": isactive,
        "shiftpattern_sheduledtypeid": sheduledtypeid
    };
    var strUrl = Service.Insert_ShiftPatterns_Erc_Details;
    console.log('::::: JSON OBJECT OF OPERATORS::::::' + JSON.stringify(json_ShiftPatterns_Operators_Details));
    $.ajax({
        type: "POST",
        url: strUrl,
        dataType: "json",
        data: JSON.stringify(json_ShiftPatterns_Operators_Details),
        contentType: "application/json",
        async: false,
        crossDomain: true,
        headers: {
            "X-TENANT-ID": "PROCREATE"
        },
        success: function(data) {
            var responsecode = data.responseCode;
            if (200 !== responsecode) {
            }
            else {
                showNotificationError('Operators Pattern Inserted Succesfully', 'save_Pattern', 'success');
                setTimeout(function() {
                    window.location.reload();
                }, 3000);
            }
        },
        error: function(err) {
            console.error("Error in Insert_ShiftPatterns_Operators_Details" + JSON.stringify(err));
        }
    });
}



function get_ShiftPatterns_Opreators_Details_DOM(strData) {
    $('#patterns_Operators_Id').empty();
    try {
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-operators");
        $(objDivTag).append(ObjTableTag);

        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);
        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

        var objTHead1 = document.createElement("th");
        $(objTHead1).html("SNO");
        $(objTHead1).addClass("text-center");
        $(objTr).append(objTHead1);

        var objTHead2 = document.createElement("th");
        $(objTHead2).html("Pattern Type");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);

        var objTHead3 = document.createElement("th");
        $(objTHead3).html("Pattern Description");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);

        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Day 1");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);

        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Day 2");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);

        var objTHead6 = document.createElement("th");
        $(objTHead6).html("Day 3");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Day 4");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Day 5");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Day 6");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);

        var objTHead10 = document.createElement("th");
        $(objTHead10).html("Day 7");
        $(objTHead10).addClass("text-center");
        $(objTr).append(objTHead10);

        var objTHead11 = document.createElement("th");
        $(objTHead11).html("Day 8");
        $(objTHead11).addClass("text-center");
        $(objTr).append(objTHead11);

        var objTHead12 = document.createElement("th");
        $(objTHead12).html("Day 9");
        $(objTHead12).addClass("text-center");
        $(objTr).append(objTHead12);

        var objTHead13 = document.createElement("th");
        $(objTHead13).html("Day 10");
        $(objTHead13).addClass("text-center");
        $(objTr).append(objTHead13);

        var objTHead14 = document.createElement("th");
        $(objTHead14).html("Day 11");
        $(objTHead14).addClass("text-center");
        $(objTr).append(objTHead14);

        var objTHead15 = document.createElement("th");
        $(objTHead15).html("Day 12");
        $(objTHead15).addClass("text-center");
        $(objTr).append(objTHead15);

        var objTHead16 = document.createElement("th");
        $(objTHead16).html("Day 13");
        $(objTHead16).addClass("text-center");
        $(objTr).append(objTHead16);

        var objTHead17 = document.createElement("th");
        $(objTHead17).html("Day 14");
        $(objTHead17).addClass("text-center");
        $(objTr).append(objTHead17);

        var objTHead18 = document.createElement("th");
        $(objTHead18).html("Day 15");
        $(objTHead18).addClass("text-center");
        $(objTr).append(objTHead18);

        var objTHead19 = document.createElement("th");
        $(objTHead19).html("Day 16");
        $(objTHead19).addClass("text-center");
        $(objTr).append(objTHead19);

        var objTHead20 = document.createElement("th");
        $(objTHead20).html("Day 17");
        $(objTHead20).addClass("text-center");
        $(objTr).append(objTHead20);

        var objTHead21 = document.createElement("th");
        $(objTHead21).html("Day 18");
        $(objTHead21).addClass("text-center");
        $(objTr).append(objTHead21);

        var objTHead22 = document.createElement("th");
        $(objTHead22).html("Day 19");
        $(objTHead22).addClass("text-center");
        $(objTr).append(objTHead22);

        var objTHead23 = document.createElement("th");
        $(objTHead23).html("Day 20");
        $(objTHead23).addClass("text-center");
        $(objTr).append(objTHead23);

        var objTHead24 = document.createElement("th");
        $(objTHead24).html("Status");
        $(objTHead24).addClass("text-center");
        $(objTr).append(objTHead24);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);

        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var patterntype = strData[i].patterntype;
            if (patterntype === "NA") {
                $(tablcol2).html('NA');
            } else {
                $(tablcol2).html(patterntype);
            }
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            var patterndesc = strData[i].patterndesc;
            if (patterndesc === "NA") {
                $(tablcol3).html('NA');
            } else {
                $(tablcol3).html(patterndesc);
            }
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            var shiftpattern_1 = strData[i].shiftpattern_1;
            if (shiftpattern_1 === "NA") {
                $(tablcol4).html('NA');
            } else {
                $(tablcol4).html(shiftpattern_1);
                var shiftPattern = shiftpattern_1;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol4).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol4).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol4).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol4).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol4).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol4).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol4).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol4).attr('bgcolor', '#BCD7BC');
                        break;
                        
                    default:
                }
            }
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            var shiftpattern_2 = strData[i].shiftpattern_2;
            if (shiftpattern_2 === "NA") {
                $(tablcol5).html('NA');
            } else if (shiftpattern_2 === "E") {
                $(tablcol5).html(shiftpattern_2);
                var shiftPattern = shiftpattern_2;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol5).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol5).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol5).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol5).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol5).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol5).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol5).attr('bgcolor', '#669999');
                        break;
                    default:
                }

            }
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            var shiftpattern_3 = strData[i].shiftpattern_3;
            if (shiftpattern_3 === "NA") {
                $(tablcol6).html('NA');
            } else {
                $(tablcol6).html(shiftpattern_3);
                var shiftPattern = shiftpattern_3;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol6).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol6).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol6).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol6).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol6).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            var shiftpattern_4 = strData[i].shiftpattern_4;
            if (shiftpattern_4 === "NA") {
                $(tablcol7).html('NA');
            } else {
                $(tablcol7).html(shiftpattern_4);
                var shiftPattern = shiftpattern_4;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol7).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol7).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol7).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol7).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol7).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol7).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol7).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            var shiftpattern_5 = strData[i].shiftpattern_5;
            if (shiftpattern_5 === "NA") {
                $(tablcol8).html('NA');
            } else {
                $(tablcol8).html(shiftpattern_5);
                var shiftPattern = shiftpattern_5;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol8).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol8).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol8).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol8).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol8).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol8).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol8).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            var shiftpattern_6 = strData[i].shiftpattern_6;
            if (shiftpattern_6 === "NA") {
                $(tablcol9).html('NA');
            } else {
                $(tablcol9).html(shiftpattern_6);
                var shiftPattern = shiftpattern_6;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol9).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol9).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol9).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol9).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol9).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol9).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol9).attr('bgcolor', '#669999');
                        break;
                    case 'RO1':
                        $(tablcol9).attr('bgcolor', '#669999');
                        break;
                    case 'RO2':
                        $(tablcol9).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol9);

            var tablcol10 = document.createElement("td");
            var shiftpattern_7 = strData[i].shiftpattern_7;
            if (shiftpattern_7 === "NA") {
                $(tablcol10).html('NA');
            }
            else {
                $(tablcol10).html(shiftpattern_7);
                var shiftPattern = shiftpattern_7;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol10).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol10).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol10).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol10).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol10).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol10).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol10).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol10).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol10);

            var tablcol11 = document.createElement("td");
            var shiftpattern_8 = strData[i].shiftpattern_8;
            if (shiftpattern_8 === "NA") {
                $(tablcol11).html('NA');
            }
            else {
                $(tablcol11).html(shiftpattern_8);
                var shiftPattern = shiftpattern_8;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol11).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol11).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol11).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol11).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol11).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol11).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol11).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol11).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol11);

            var tablcol12 = document.createElement("td");
            var shiftpattern_9 = strData[i].shiftpattern_9;
            if (shiftpattern_9 === "NA") {
                $(tablcol12).html('NA');
            }
            else {
                $(tablcol12).html(shiftpattern_9);
                var shiftPattern = shiftpattern_9;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol12).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol12).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol12).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol12).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol12).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol12).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol12).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol12).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol12);

            var tablcol13 = document.createElement("td");
            var shiftpattern_10 = strData[i].shiftpattern_10;
            if (shiftpattern_10 === "NA") {
                $(tablcol13).html('NA');
            }
            else {
                $(tablcol13).html(shiftpattern_10);
                var shiftPattern = shiftpattern_10;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol13).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol13).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol13).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol13).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol13).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol13).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol13).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol13).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol13);

            var tablcol14 = document.createElement("td");
            var shiftpattern_11 = strData[i].shiftpattern_11;
            if (shiftpattern_11 === "NA") {
                $(tablcol14).html('NA');
            }
            else {
                $(tablcol14).html(shiftpattern_11);
                var shiftPattern = shiftpattern_11;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol14).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol14).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol14).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol14).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol14).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol14).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol14).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol14).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol14);

            var tablcol15 = document.createElement("td");
            var shiftpattern_12 = strData[i].shiftpattern_12;
            if (shiftpattern_12 === "NA") {
                $(tablcol15).html('NA');
            }
            else {
                $(tablcol15).html(shiftpattern_12);
                var shiftPattern = shiftpattern_12;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol15).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol15).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol15).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol15).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol15).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol15).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol15).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol15).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol15);

            var tablcol16 = document.createElement("td");
            var shiftpattern_13 = strData[i].shiftpattern_13;
            if (shiftpattern_13 === "NA") {
                $(tablcol16).html('NA');
            }
            else {
                $(tablcol16).html(shiftpattern_13);
                var shiftPattern = shiftpattern_13;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol16).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol16).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol16).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol16).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol16).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol16).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol16).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol16).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol16);

            var tablcol17 = document.createElement("td");
            var shiftpattern_14 = strData[i].shiftpattern_14;
            if (shiftpattern_14 === "NA") {
                $(tablcol17).html('NA');
            }
            else {
                $(tablcol17).html(shiftpattern_14);
                var shiftPattern = shiftpattern_14;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol17).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol17).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol17).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol17).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol17).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol17).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol17).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol17).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol17);

            var tablcol18 = document.createElement("td");
            var shiftpattern_15 = strData[i].shiftpattern_15;
            if (shiftpattern_15 === "NA") {
                $(tablcol18).html('NA');
            }
            else {
                $(tablcol18).html(shiftpattern_15);
                var shiftPattern = shiftpattern_15;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol18).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol18).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol18).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol18).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol18).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol18).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol18).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol18).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol18);

            var tablcol19 = document.createElement("td");
            var shiftpattern_16 = strData[i].shiftpattern_16;
            if (shiftpattern_16 === "NA") {
                $(tablcol19).html('NA');
            }
            else {
                $(tablcol19).html(shiftpattern_16);
                var shiftPattern = shiftpattern_16;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol19).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol19).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol19).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol19).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol19).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol19).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol19).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol19).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol19);

            var tablcol20 = document.createElement("td");
            var shiftpattern_17 = strData[i].shiftpattern_17;
            if (shiftpattern_17 === "NA") {
                $(tablcol20).html('NA');
            }
            else {
                $(tablcol20).html(shiftpattern_17);
                var shiftPattern = shiftpattern_17;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol20).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol20).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol20).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol20).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol20).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol20).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol20).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol20).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol20);

            var tablcol21 = document.createElement("td");
            var shiftpattern_18 = strData[i].shiftpattern_18;
            if (shiftpattern_18 === "NA") {
                $(tablcol21).html('NA');
            }
            else {
                $(tablcol21).html(shiftpattern_18);
                var shiftPattern = shiftpattern_18;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol21).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol21).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol21).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol21).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol21).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol21).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol21).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol21).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol21);

            var tablcol22 = document.createElement("td");
            var shiftpattern_19 = strData[i].shiftpattern_19;
            if (shiftpattern_19 === "NA") {
                $(tablcol22).html('NA');
            }
            else {
                $(tablcol22).html(shiftpattern_19);
            }
            $(tbleRow).append(tablcol22);

            var tablcol23 = document.createElement("td");
            var shiftpattern_20 = strData[i].shiftpattern_20;
            if (shiftpattern_20 === "NA") {
                $(tablcol23).html('NA');
            }
            else {
                $(tablcol23).html(shiftpattern_20);
                var shiftPattern = shiftpattern_20;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol23).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol23).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol23).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol23).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol23).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol23).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol23).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol23).attr('bgcolor', '#669999');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol23);

            var tablcol24 = document.createElement("td");
            var shiftpattern_isactive = strData[i].shiftpattern_isactive;
            if (shiftpattern_isactive === "NA") {
                $(tablcol24).html('NA');
            }
            else if (shiftpattern_isactive === "true") {
                var actvieclor = $(tablcol24).html('Active');
                $(actvieclor).attr('color', "blue");
            }
            $(tbleRow).append(tablcol24);


            //Body Tag Here
            $(objTBody).append(tbleRow);
        }
        $("#patterns_Operators_Id").append(objDivTag);
    } catch (err) {
        console.log("patterns_Operators_Id" + err);
    }
}

function get_ShiftPatterns_Erc_Details_DOM(strData) {
    $('#patterns_Erc_Id').empty();
    try {
        var objDivTag = document.createElement('div');
        $(objDivTag).addClass("table-responsive");

        var ObjTableTag = document.createElement("table");
        $(ObjTableTag).addClass("table table-striped table-bordered table-hover dataTables-example2");
        $(objDivTag).append(ObjTableTag);

        var objTHead = document.createElement("thead");
        $(ObjTableTag).append(objTHead);
        var objTr = document.createElement("tr");
        $(objTHead).append(objTr);

        var objTHead1 = document.createElement("th");
        $(objTHead1).html("SNO");
        $(objTHead1).addClass("text-center");
        $(objTr).append(objTHead1);

        var objTHead2 = document.createElement("th");
        $(objTHead2).html("Pattern Type");
        $(objTHead2).addClass("text-center");
        $(objTr).append(objTHead2);

        var objTHead3 = document.createElement("th");
        $(objTHead3).html("Pattern Description");
        $(objTHead3).addClass("text-center");
        $(objTr).append(objTHead3);

        var objTHead4 = document.createElement("th");
        $(objTHead4).html("Day 1");
        $(objTHead4).addClass("text-center");
        $(objTr).append(objTHead4);

        var objTHead5 = document.createElement("th");
        $(objTHead5).html("Day 2");
        $(objTHead5).addClass("text-center");
        $(objTr).append(objTHead5);

        var objTHead6 = document.createElement("th");
        $(objTHead6).html("Day 3");
        $(objTHead6).addClass("text-center");
        $(objTr).append(objTHead6);

        var objTHead7 = document.createElement("th");
        $(objTHead7).html("Day 4");
        $(objTHead7).addClass("text-center");
        $(objTr).append(objTHead7);

        var objTHead8 = document.createElement("th");
        $(objTHead8).html("Day 5");
        $(objTHead8).addClass("text-center");
        $(objTr).append(objTHead8);

        var objTHead9 = document.createElement("th");
        $(objTHead9).html("Day 6");
        $(objTHead9).addClass("text-center");
        $(objTr).append(objTHead9);

        var objTHead10 = document.createElement("th");
        $(objTHead10).html("Day 7");
        $(objTHead10).addClass("text-center");
        $(objTr).append(objTHead10);

        var objTHead11 = document.createElement("th");
        $(objTHead11).html("Day 8");
        $(objTHead11).addClass("text-center");
        $(objTr).append(objTHead11);

        var objTHead12 = document.createElement("th");
        $(objTHead12).html("Day 9");
        $(objTHead12).addClass("text-center");
        $(objTr).append(objTHead12);

        var objTHead13 = document.createElement("th");
        $(objTHead13).html("Day 10");
        $(objTHead13).addClass("text-center");
        $(objTr).append(objTHead13);

        var objTHead14 = document.createElement("th");
        $(objTHead14).html("Day 11");
        $(objTHead14).addClass("text-center");
        $(objTr).append(objTHead14);

        var objTHead15 = document.createElement("th");
        $(objTHead15).html("Day 12");
        $(objTHead15).addClass("text-center");
        $(objTr).append(objTHead15);

        var objTHead16 = document.createElement("th");
        $(objTHead16).html("Day 13");
        $(objTHead16).addClass("text-center");
        $(objTr).append(objTHead16);

        var objTHead17 = document.createElement("th");
        $(objTHead17).html("Day 14");
        $(objTHead17).addClass("text-center");
        $(objTr).append(objTHead17);

        var objTHead18 = document.createElement("th");
        $(objTHead18).html("Day 15");
        $(objTHead18).addClass("text-center");
        $(objTr).append(objTHead18);

        var objTHead19 = document.createElement("th");
        $(objTHead19).html("Day 16");
        $(objTHead19).addClass("text-center");
        $(objTr).append(objTHead19);

        var objTHead20 = document.createElement("th");
        $(objTHead20).html("Day 17");
        $(objTHead20).addClass("text-center");
        $(objTr).append(objTHead20);

        var objTHead21 = document.createElement("th");
        $(objTHead21).html("Day 18");
        $(objTHead21).addClass("text-center");
        $(objTr).append(objTHead21);

        var objTHead22 = document.createElement("th");
        $(objTHead22).html("Day 19");
        $(objTHead22).addClass("text-center");
        $(objTr).append(objTHead22);

        var objTHead23 = document.createElement("th");
        $(objTHead23).html("Day 20");
        $(objTHead23).addClass("text-center");
        $(objTr).append(objTHead23);

        var objTHead24 = document.createElement("th");
        $(objTHead24).html("Status");
        $(objTHead24).addClass("text-center");
        $(objTr).append(objTHead24);

        var objTBody = document.createElement("tbody");
        $(objTBody).attr("id", "tbodyData");
        $(ObjTableTag).append(objTBody);

        for (var i = 0; i < strData.length; i++) {
            var index = i + 1;
            var tbleRow = document.createElement("tr");

            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);
            var pattern_Id = strData[i].shiftpattern_shiftpatternid;
            var pattern_Desc = strData[i].patterndesc;
            var tablcol2 = document.createElement("td");
            var patterntype = strData[i].patterntype;
            if (patterntype === "NA") {
                $(tablcol2).html('NA');
            } else {
                $(tablcol2).html('<u><a href="update_pattern_erc.html"?pattern='+pattern_Id+'  onclick="getPatternDetails('+pattern_Id+')")>' + patterntype + '</a></u>');
            }
            $(tbleRow).append(tablcol2);

            var tablcol3 = document.createElement("td");
            var patterndesc = strData[i].patterndesc;
            if (patterndesc === "NA") {
                $(tablcol3).html('NA');
            } else {
                $(tablcol3).html(patterndesc);
            }
            $(tbleRow).append(tablcol3);

            var tablcol4 = document.createElement("td");
            var shiftpattern_1 = strData[i].shiftpattern_1;
            if (shiftpattern_1 === "NA") {
                $(tablcol4).html('NA');
            } else {
                $(tablcol4).html(shiftpattern_1);
                var shiftPattern = shiftpattern_1;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol4).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol4).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol4).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol4).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol4).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol4).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol4).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol4).attr('bgcolor', '#BCD7BC');
                    default:
                }
            }
            $(tbleRow).append(tablcol4);

            var tablcol5 = document.createElement("td");
            var shiftpattern_2 = strData[i].shiftpattern_2;
            if (shiftpattern_1 === "NA") {
                $(tablcol5).html('NA');
            } else {
                $(tablcol5).html(shiftpattern_2);
                var shiftPattern = shiftpattern_2;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol5).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol5).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol5).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol5).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol5).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol5).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol5).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol5).attr('bgcolor', '#BCD7BC');
                    default:
                }
            }
            $(tbleRow).append(tablcol5);

            var tablcol6 = document.createElement("td");
            var shiftpattern_3 = strData[i].shiftpattern_3;
            if (shiftpattern_3 === "NA") {
                $(tablcol6).html('NA');
            } else {
                $(tablcol6).html(shiftpattern_3);
                var shiftPattern = shiftpattern_3;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol6).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol6).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol6).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol6).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol6).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol6).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol6).attr('bgcolor', '#BCD7BC');
                    default:
                }
            }
            $(tbleRow).append(tablcol6);

            var tablcol7 = document.createElement("td");
            var shiftpattern_4 = strData[i].shiftpattern_4;
            if (shiftpattern_4 === "NA") {
                $(tablcol7).html('NA');
            } else {
                $(tablcol7).html(shiftpattern_4);
                var shiftPattern = shiftpattern_4;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol7).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol7).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol7).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol7).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol7).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol7).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol7).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol7).attr('bgcolor', '#BCD7BC');
                        break;

                    default:
                }
            }
            $(tbleRow).append(tablcol7);

            var tablcol8 = document.createElement("td");
            var shiftpattern_5 = strData[i].shiftpattern_5;
            if (shiftpattern_5 === "NA") {
                $(tablcol8).html('NA');
            } else {
                $(tablcol8).html(shiftpattern_5);
                var shiftPattern = shiftpattern_5;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol8).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol8).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol8).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol8).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol8).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol8).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol8).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol8).attr('bgcolor', '#BCD7BC');
                        break;
                        
                    default:
                }
            }
            $(tbleRow).append(tablcol8);

            var tablcol9 = document.createElement("td");
            var shiftpattern_6 = strData[i].shiftpattern_6;
            if (shiftpattern_6 === "NA") {
                $(tablcol9).html('NA');
            } else {
                $(tablcol9).html(shiftpattern_6);
                var shiftPattern = shiftpattern_6;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol9).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol9).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol9).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol9).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol9).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol9).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol9).attr('bgcolor', '#669999');
                        break;
                    case 'RO1':
                        $(tablcol9).attr('bgcolor', '#669999');
                        break;
                    case 'RO2':
                        $(tablcol9).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol9).attr('bgcolor', '#BCD7BC');
                        break;
                        
                    default:
                }
            }
            $(tbleRow).append(tablcol9);

            var tablcol10 = document.createElement("td");
            var shiftpattern_7 = strData[i].shiftpattern_7;
            if (shiftpattern_7 === "NA") {
                $(tablcol10).html('NA');
            }
            else {
                $(tablcol10).html(shiftpattern_7);
                var shiftPattern = shiftpattern_7;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol10).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol10).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol10).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol10).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol10).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol10).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol10).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol10).attr('bgcolor', '#BCD7BC');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol10);

            var tablcol11 = document.createElement("td");
            var shiftpattern_8 = strData[i].shiftpattern_8;
            if (shiftpattern_8 === "NA" || shiftpattern_8 === "null") {
                $(tablcol11).html('NA');
            }
            else {
                $(tablcol11).html(shiftpattern_8);
                var shiftPattern = shiftpattern_8;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol11).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol11).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol11).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol11).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol11).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol11).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol11).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol11).attr('bgcolor', '#BCD7BC');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol11);

            var tablcol12 = document.createElement("td");
            var shiftpattern_9 = strData[i].shiftpattern_9;
            if (shiftpattern_9 === "NA" || shiftpattern_9 === "null") {
                $(tablcol12).html('NA');
            }
            else {
                $(tablcol12).html(shiftpattern_9);
                var shiftPattern = shiftpattern_9;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol12).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol12).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol12).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol12).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol12).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol12).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol12).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol12).attr('bgcolor', '#BCD7BC');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol12);

            var tablcol13 = document.createElement("td");
            var shiftpattern_10 = strData[i].shiftpattern_10;
            if (shiftpattern_10 === "NA" || shiftpattern_10 === "null") {
                $(tablcol13).html('NA');
            }
            else {
                $(tablcol13).html(shiftpattern_10);
                var shiftPattern = shiftpattern_10;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol13).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol13).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol13).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol13).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol13).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol13).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol13).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol13).attr('bgcolor', '#BCD7BC');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol13);

            var tablcol14 = document.createElement("td");
            var shiftpattern_11 = strData[i].shiftpattern_11;
            if (shiftpattern_11 === "NA" || shiftpattern_11 === "null") {
                $(tablcol14).html('NA');
            }
            else {
                $(tablcol14).html(shiftpattern_11);
                var shiftPattern = shiftpattern_11;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol14).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol14).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol14).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol14).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol14).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol14).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol14).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol14).attr('bgcolor', '#BCD7BC');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol14);

            var tablcol15 = document.createElement("td");
            var shiftpattern_12 = strData[i].shiftpattern_12;
            if (shiftpattern_12 === "NA" || shiftpattern_12 === "null") {
                $(tablcol15).html('NA');
            }
            else {
                $(tablcol15).html(shiftpattern_12);
                var shiftPattern = shiftpattern_12;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol15).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol15).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol15).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol15).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol15).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol15).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol15).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol15).attr('bgcolor', '#BCD7BC');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol15);

            var tablcol16 = document.createElement("td");
            var shiftpattern_13 = strData[i].shiftpattern_13;
            if (shiftpattern_13 === "NA" || shiftpattern_13 === "null") {
                $(tablcol16).html('NA');
            }
            else {
                $(tablcol16).html(shiftpattern_13);
                var shiftPattern = shiftpattern_13;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol16).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol16).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol16).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol16).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol16).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol16).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol16).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol16).attr('bgcolor', '#BCD7BC');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol16);

            var tablcol17 = document.createElement("td");
            var shiftpattern_14 = strData[i].shiftpattern_14;
            if (shiftpattern_14 === "NA" || shiftpattern_14 === "null") {
                $(tablcol17).html('NA');
            }
            else {
                $(tablcol17).html(shiftpattern_14);
                var shiftPattern = shiftpattern_14;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol17).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol17).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol17).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol17).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol17).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol17).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol17).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol17).attr('bgcolor', '#BCD7BC');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol17);

            var tablcol18 = document.createElement("td");
            var shiftpattern_15 = strData[i].shiftpattern_15;
            if (shiftpattern_15 === "NA" || shiftpattern_15 === "null") {
                $(tablcol18).html('NA');
            }
            else {
                $(tablcol18).html(shiftpattern_15);
                var shiftPattern = shiftpattern_15;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol18).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol18).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol18).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol18).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol18).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol18).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol18).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol18).attr('bgcolor', '#BCD7BC');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol18);

            var tablcol19 = document.createElement("td");
            var shiftpattern_16 = strData[i].shiftpattern_16;
            if (shiftpattern_16 === "NA" || shiftpattern_16 === "null") {
                $(tablcol19).html('NA');
            }
            else {
                $(tablcol19).html(shiftpattern_16);
                var shiftPattern = shiftpattern_16;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol19).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol19).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol19).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol19).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol19).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol19).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol19).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol19).attr('bgcolor', '#BCD7BC');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol19);

            var tablcol20 = document.createElement("td");
            var shiftpattern_17 = strData[i].shiftpattern_17;
            if (shiftpattern_17 === "NA" || shiftpattern_17 === "null") {
                $(tablcol20).html('NA');
            }
            else {
                $(tablcol20).html(shiftpattern_17);
                var shiftPattern = shiftpattern_17;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol20).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol20).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol20).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol20).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol20).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol20).attr('bgcolor', '#669999');
                        console.log(' ::::: bgcolor H :::::' + '669999');
                        break;
                    case 'RO':
                        $(tablcol20).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol20).attr('bgcolor', '#BCD7BC');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol20);

            var tablcol21 = document.createElement("td");
            var shiftpattern_18 = strData[i].shiftpattern_18;
            if (shiftpattern_18 === "NA" || shiftpattern_18 === "null") {
                $(tablcol21).html('NA');
            }
            else {
                $(tablcol21).html(shiftpattern_18);
                var shiftPattern = shiftpattern_18;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol21).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol21).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol21).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol21).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol21).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol21).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol21).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol21).attr('bgcolor', '#BCD7BC');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol21);

            var tablcol22 = document.createElement("td");
            var shiftpattern_19 = strData[i].shiftpattern_19;
            if (shiftpattern_19 === "NA" || shiftpattern_19 === "null") {
                $(tablcol22).html('NA');
            }
            else {
                $(tablcol22).html(shiftpattern_19);
            }
            $(tbleRow).append(tablcol22);

            var tablcol23 = document.createElement("td");
            var shiftpattern_20 = strData[i].shiftpattern_20;
            if (shiftpattern_20 === "NA" || shiftpattern_20 === "null") {
                $(tablcol23).html('NA');
            }
            else {
                $(tablcol23).html(shiftpattern_20);
                var shiftPattern = shiftpattern_20;
                switch (shiftPattern) {
                    case "D":
                        $(tablcol23).attr('bgcolor', '#EEE8AA');
                        break;
                    case "D1":
                        $(tablcol23).attr('bgcolor', '#EEE8AA');
                        break;
                    case "E":
                        $(tablcol23).attr('bgcolor', '#ccccccc');
                        break;
                    case "N":
                        $(tablcol23).attr('bgcolor', '#DEB887');
                        break;
                    case "G":
                        $(tablcol23).attr('bgcolor', '#BCD7BC');
                        break;
                    case "H":
                        $(tablcol23).attr('bgcolor', '#669999');
                        break;
                    case 'RO':
                        $(tablcol23).attr('bgcolor', '#669999');
                        break;
                    case 'M1':
                        $(tablcol23).attr('bgcolor', '#BCD7BC');
                        break;
                    default:
                }
            }
            $(tbleRow).append(tablcol23);

            var tablcol24 = document.createElement("td");
            var shiftpattern_isactive = strData[i].shiftpattern_isactive;
            if (shiftpattern_isactive === "NA") {
                $(tablcol24).html('NA');
            }
            else if (shiftpattern_isactive === "true") {
                var actvieclor = $(tablcol24).html('Active');
                $(actvieclor).attr('color', "blue");
            }
            $(tbleRow).append(tablcol24);


            //Body Tag Here
            $(objTBody).append(tbleRow);
        }
        $("#patterns_Erc_Id").append(objDivTag);
    } catch (err) {
        console.log("patterns_Erc_Id" + err);
    }
}

function getPatternDetails(pattern_Id) {
    localStorage.removeItem("pattern_Id");
    localStorage.setItem('pattern_Id', pattern_Id);
}

function loadDataTable2() {
    $('.dataTables-example2').DataTable({// Data table
        pageLength: 5,
        "aLengthMenu": [[5, 50, 75, -1], [5, 10, 25, "All"]],
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
           
        ]

    });
}
function loadDataTable3() {
    $('.dataTables-operators').DataTable({// Data table
        pageLength: 5,
        "aLengthMenu": [[5, 50, 75, -1], [5, 10, 25, "All"]],
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},
            {extend: 'print',
                customize: function(win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                }
            }
        ]

    });
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
        // position defines the notification position though uses the defaults below
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
