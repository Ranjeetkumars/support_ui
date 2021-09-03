var gItem;
function getListOfInboxMail(){
$.ajax({
		type : 'GET',
		contentType : 'application/json',
		async : false,
		url : 'http://localhost:2706/getMailDetailsController/getMailDeatils',
		success : function(data, textStatus, jqXHR) {
		console.log("Status" + textStatus);
			var obj = JSON.stringify(data.objAppointmentControllerDTO);
			// alert('obj='+obj);
			    JSON.parse(obj).forEach(item => {
			    	// alert("item.message_bodyitem.message_body="+item.message_body);getListOfMailBasedOnId
			    	 gItem = data.objAppointmentControllerDTO;
			    	// $('#appendListOfMailDetails').append('<tr
					// class='+item.mailStatus+'
					// onClick=openMail("'+item.mail_id+'","'+item.fromMail+'");>'+
			    	$('#appendListOfMailDetails').append('<tr class='+item.mailStatus+'  onClick=getListOfMailBasedOnId("'+item.mail_id+'");>'+  		
			    	 '<td><label class="check"> <input type="checkbox"'+
					    			'name=""> <span class="checkmark"></span>'+
					    			'</label></td>'+
					    			'<td>'+item.fromMail+'</td>'+
					    			'<td><span>'+item.subject+'</span><span></span></td><td>'+item.createddtm+'</td></tr>');
			    });
},
error:function(jqXHR, textStatus, errorThrown) {
			console.log('update Stock error: ' + textStatus);
		}
	});
}

function openMail(mail_id,from){
	
	// getListOfMailBasedOnId(mail_id);
	console.log('open mail java script function is executed='+mail_id);
	console.log('open mail java script function is executed='+from);
	console.log('smsTicketId='+mail_id);
	console.log('from='+from);
	console.log("Json format="+JSON.stringify(gItem));
	var obj = JSON.stringify(gItem);
	JSON.parse(obj).forEach(item => {
    	 if(item.mail_id==mail_id){
    		 alert("inside-if condition of openmail javascript function");
    		 alert("fromName="+item.fromName);
    		 alert("fromMail="+item.fromMail);
    		 alert("subject="+item.subject);
    		 alert("messageBody="+item.messageBody); 
    		 alert("messageBody="+item.messageBody); 
    		 alert("createddtm="+item.createddtm); 
    		 // display particulare mail details
    		 $("#senderMailId").html(item.fromMail);
    		 $("#senderSubject").html(item.subject);//
    		 $("#sentDate").html(item.mailSentDate);
    		 $("#senderMessageBody").html(item.messageBody);
    		 $("#receivedMailTime").html(item.createddtm)
    		
    		 if(item.mailStatus=="Unread"){
    			 alert('mail status is unread')
    			 $.ajax({
    			      type: 'POST',
    			      url: "http://192.168.1.105:2706/getMailDetailsController/insertMailStatus",
    			      data: JSON.stringify({
    			    	  "mail_id":mail_id,
    			    	  "mailStatus":1
    			  		}),
    			      success : function(data, textStatus, jqXHR) {
    			    	  console.log("mail status is changed");
    			      },
    			      error: function(e) {
    			        console.log(e);
    			      },
    			      dataType: "json",
    			      contentType: "application/json"
    			});
    		}
    		 else{
    			 console.log('It is not unread mail');
    		 }
    	 }
	});
}


function getListOfMailBasedOnId(mail_id){
	
	console.log('getListOfMailBasedOnId method is executed');
	console.log('getListOfMailBasedOnId javascript  is executed::'+mail_id);
	$.ajax({
	      type: 'POST',
	      url: "http://192.168.1.105:2706/getMailDetailsController/getListOfMailDetailsBasedOnMailId",
	      data: JSON.stringify({
	    	  "mail_id":mail_id,
	    	}),
	      success:function(data, textStatus, jqXHR) {
	    	  console.log('inside success function ');
	    	console.log("Status" + textStatus);
				var obj = JSON.stringify(data.objAppointmentControllerDTO);
				JSON.parse(obj).forEach(item => {
					console.log('mailsender id::'+item.fromMail);
					console.log('mailsender subject::'+item.subject);
					console.log('mail sender mailbody::'+item.messageBody);
					console.log('mailsender date::'+item.createddtm);
					 $("#senderMailId").html(item.fromMail);
		    		 $("#senderSubject").html(item.subject);//
		    		 $("#sentDate").html(item.mailSentDate);
		    		 $("#senderMessageBody").html(item.messageBody);
		    		 $("#receivedMailTime").html(item.createddtm);
		    		 
		    		 localStorage.setItem("mailId", item.mail_id);
				       });
		      },
	      error: function(e) {
	        console.log(e);
	      },
	      dataType: "json",
	      contentType: "application/json"
	});
	
	
	
}







function replyMail(){
	console.log("replyMail javascript function is executed");
    var strfrom_mailId = document.getElementById('senderMailId').innerHTML;
    var strSubject = document.getElementById('senderSubject').innerHTML;
    var oldMessageBody = document.getElementById('senderMessageBody').innerHTML;
   
    console.log('strfrom_mailId::'+strfrom_mailId);
    console.log('strSubject::'+strSubject);
    console.log('oldMessageBody::'+oldMessageBody);
    var newReplyBody = $("#replyContent1").summernote("code");
    alert('reply body::'+newReplyBody);
    alert("newReplyBody::"+newReplyBody.length);
   
    if (newReplyBody.length=='101'|| newReplyBody.length=="101" || newReplyBody.length==101) {
    	console.log('summernote body is empty');
    }
    else 
    {
       alert('print summer note data='+newReplyBody);
     $.ajax({
     type: 'POST',
     url: "http://192.168.1.105:2706/getMailDetailsController/replyMail",
     data: JSON.stringify({
     	strfrom_mailId_jkey:strfrom_mailId,
 		strSubject_jkey:strSubject,
 		oldMessageBody_jkey:oldMessageBody,
 		newReplyMailBody_jkey:newReplyBody
     }),
     success : function(data, textStatus, jqXHR) {
     
     },
     error: function(e) {
       console.log(e);
     },
     dataType: "json",
     contentType: "application/json"
   });
       
    }
}


function hideReplyBtn(){
	 $('#hideSummerNote').show();
	var receivedMailTime = document.getElementById('receivedMailTime').innerHTML;
	var concatDateAndreplyMailId = '<p><b>On &nbsp;&nbsp;' +  receivedMailTime +', socialmediaagentdevelopment@gmail.com wrote:</b></p>';
	console.log('concatDateAndreplyMailId::'+concatDateAndreplyMailId);
	var oldMessageBody = document.getElementById('senderMessageBody').innerHTML;
	var concatMsgAndMailId = concatDateAndreplyMailId +'<p>' +oldMessageBody;
	console.log('concatMsgAndMailId::'+concatMsgAndMailId);
	$('#hideReplyBtn').hide();// hide reply button
	var replyToMailId = document.getElementById('senderMailId').innerHTML;
	var replyToSubject = document.getElementById('senderSubject').innerHTML;
	var replyToMailBody = $("#replyContent1").summernote("code");
	alert('replyToMailBody::'+replyToMailBody);
	console.log('replyToMailBody::'+replyToMailBody);
	var summerNoteStaus = summerNoteValidation(replyToMailBody);
	if(summerNoteStaus==true||summerNoteStaus=='true'||summerNoteStaus=="true"){
		var concatMsgAndMailId_1 = replyToMailBody +'<p>'+concatDateAndreplyMailId +'<p>'+oldMessageBody;
		console.log('concatMsgAndMailId_1@@@@@@@------->'+concatMsgAndMailId_1);
		$.ajax({
	     type: 'POST',
	     url: "http://192.168.1.105:2706/getMailDetailsController/replyMail",
	     data: JSON.stringify({
	     	"strfrom_mailId_jkey":replyToMailId,
	 		"strSubject_jkey":replyToSubject,
	 		"oldMessageBody_jkey":concatMsgAndMailId,
	 		"newReplyMailBody_jkey":concatMsgAndMailId_1
	     }),
	     success : function(data, textStatus, jqXHR) {
	    	 alert("@@@@@@@@@@@@"+data.count);
	    	 $("#replyContent1").summernote('code',"");
	    	 toastr.success('Mail replyed successfully', { timeOut: 10000 });
	    	  $("#replyContent1").summernote('code',"");	    
	    	 // location.reload(true);
	     },
	     error:function(e) {
	    	 toastr.error('Something Went Wrong', { timeOut: 10000 });
	    	 $("#replyContent1").summernote('code',"");
	       console.log(e);
	     },
	     dataType: "json",
	     contentType: "application/json"
	   });
	}
	else{
		console.log('summer note fields is empty')
	}
}





function hideSummerNote(){
	$('#hideReplyBtn').show();
	 $('#replyContent1').summernote('destroy');
	 $('#hideSummerNote').hide();
}


function summerNoteValidation(){
	alert('summerNoteValidation method is executed');
	var code = $('#replyContent1').summernote('code');
	
	alert("codecodecodecode:::->"+code);//replyToMailBody <p><br></p>
	alert("codecodecodecode:::->"+code);
	
	if ($('#replyContent1').summernote('isEmpty') ||code.includes('&nbsp;')||code.includes('<p><br></p>'))
	{
		alert('editor content is empty');
		 toastr.error('Mail body should not be empty', { timeOut: 10000 });
	  return false;
	}
	else{
		return true;
	}
}




function SendTemplate(){
	var mailId = localStorage.getItem("mailId");
	alert("SendTemplate method is executed::"+mailId);
	var replyToMailId = document.getElementById('senderMailId').innerHTML;
	var replyToSubject = document.getElementById('senderSubject').innerHTML;
	if(replyToMailId==null || replyToMailId=="" || replyToMailId=='' || replyToMailId=="undefined"
		&& replyToSubject==null || replyToSubject=="" || replyToSubject=='' || replyToSubject=="undefined"
	){
		 toastr.error('Something went worng! Try again', { timeOut: 10000 });
	}
	else{
		alert('Parameter is not empty');
		$.ajax({
		     type: 'POST',
		     url: "http://192.168.1.105:2706/getMailDetailsController/sendTemplate",
		     data: JSON.stringify({
		    	 "mail_id":mailId,
		     	"fromMail":replyToMailId,
		 		"subject":replyToSubject
		 	}),
		     success : function(data, textStatus, jqXHR) {
		    	  $("#replyContent1").summernote('code',"");
		    	 toastr.success('Mail replyed successfully', { timeOut: 10000 });
		    	  $("#replyContent1").summernote('code',"");	    
		    },
		     error:function(e) {
		    	 toastr.error('Something Went Wrong', { timeOut: 10000 });
		    	 $("#replyContent1").summernote('code',"");
		       console.log(e);
		     },
		     dataType: "json",
		     contentType: "application/json"
		   });
	}
}
