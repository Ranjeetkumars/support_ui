var user_Id;
var role_Id;
var module_Id;
$(document).ready(function() {
	 user_Id = localStorage.getItem('userID');
	 role_Id = localStorage.getItem('wfms_roleID');
	 module_Id = localStorage.getItem('wfms_moduleID');

});

function reset_Report(){
	$("#roster_FromDate").val("");
	$("#roster_EndDate").val("");
}




/*
 * @Author : Purushotham Akula 
 * @Date : 2021-08-04 
 * @Desc : get_Roster_Report_Data_WithInputs
 */

function get_Roster_Report_Data_WithInputs() {
	$('#roster_TableId').empty();
	var from_Date = $("#roster_FromDate").val();
	var to_Date = $("#roster_EndDate").val();

	
	if (from_Date === "" || from_Date === undefined || from_Date === '') {
		showNotificationError('Please select to from date', 'roster_FromDate','error');
		return false;
	}
	if (to_Date === "" || to_Date === undefined || to_Date === '') {
		showNotificationError('Please select to to date', 'roster_FromDate','error');
		return false;
	}
	try {
		var strUrl = Service.Get_Roster_Report_Data_WithInputs;
		var obj_Json = {
				"from_date": from_Date,
		    	"end_date": to_Date
		    	};
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(obj_Json),
			contentType : "application/json",
			async : false,
			crossDomain : true,
			success : function(data) {
				var responsecode = data.responseCode;
				if (200 !== responsecode) {

				} else {
					var jsonArray = data.objReportsControllerDTO;
					get_Roster_Report_Data_WithInputs_DOM(jsonArray);
					dom_Table();
				}
			},
			error : function(err) {
				console.error("Error in get_Roster_Report_Data_WithInputs"
						+ JSON.stringify(err));
			}
		});
	} catch (err1) {
		console.error('Error in get_Roster_Report_Data_WithInputs()' + err1);
	}

}


function get_Roster_Report_Data_WithInputs_DOM(strData) {
	
	$('#roster_TableId').empty();
    try {

        var sum = 0;
        for (var i = 0; i < strData.length; i++) {
              console.log('JSON DATA ----> ' + JSON.stringify(strData));
            var index = i + 1;
            var tbleRow = document.createElement("tr");
            var tablcol1 = document.createElement("td");
            $(tablcol1).html(index);
            $(tbleRow).append(tablcol1);

            var tablcol2 = document.createElement("td");
            var user_name = strData[i].user_name;
            if (user_name === "NA") {
                $(tablcol2).html('Not Found');
            } else {
                $(tablcol2).html(user_name);
            }
            $(tbleRow).append(tablcol2);
              
              var tablcol3 = document.createElement("td");
              var allocated_date = strData[i].allocated_date;
              if (allocated_date === "NA") {
                  $(tablcol3).html('Not Found');
              } else {
                  $(tablcol3).html(allocated_date);
              }
              $(tbleRow).append(tablcol3);
           
              var tablcol4 = document.createElement("td");
              var location_name = strData[i].location_name;
              if (location_name === "NA") {
                  $(tablcol4).html('Not Found');
              } else {
                  $(tablcol4).html(location_name);
              }
              $(tbleRow).append(tablcol4);

              var tablcol5 = document.createElement("td");
              var base_locationname = strData[i].base_locationname;
              if (base_locationname === "NA") {
                  $(tablcol5).html('Not Found');
              } else {
                  $(tablcol5).html(base_locationname);
              }
              $(tbleRow).append(tablcol5);
  
              var tablcol6 = document.createElement("td");
              var description = strData[i].description;
              if (description === "NA") {
                  $(tablcol6).html('Not Found');
              } else {
                  $(tablcol6).html(description);
              }
              $(tbleRow).append(tablcol6);

          
              
                          
            //Appending Body Here
            $("#roster_TableId").append(tbleRow);
        }

    } catch (err) {
        console.log("get_Roster_Report_Data_WithInputs_DOM" + err);
    }
}



function dom_Table(){
	  $('#roster_Table').DataTable({
		destroy: true,
        pageLength: 10,
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
		clickToHide : true,
		// whether to auto-hide the notification
		autoHide : true,
		// if autoHide, hide after milliseconds
		autoHideDelay : 2000,
		// show the arrow pointing at the element
		arrowShow : true,
		// arrow size in pixels
		arrowSize : 5,
		// position defines the notification position though uses the defaults
		// below
		position : 'right',
		// default positions
		elementPosition : 'top right',
		globalPosition : 'top right',
		// default style
		style : 'bootstrap',
		// default class (string or [string])
		className : msgType,
		// show animation
		showAnimation : 'slideDown',
		// show animation duration
		showDuration : 400,
		// hide animation
		hideAnimation : 'slideUp',
		// hide animation duration
		hideDuration : 200,
		// padding between element and notification
		gap : 2
	};
	$(boxId).notify(msg, options);
}