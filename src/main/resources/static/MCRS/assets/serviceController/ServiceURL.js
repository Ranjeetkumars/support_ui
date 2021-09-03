
/**
 * Created By Bhuneshwar
 * @Date: 27/01/2019
 */
var mpcr_ui="localhost:2706";
var MCRS="localhost:8080";
var PRO_GATEWAY="192.168.1.191:900/gateway/mcrs_gateway";
var LOGIN="52.172.30.43:5000/login";
//login: 'http://192.168.1.215:900/gateway/login/supportlogin/login',
//Complaint Response System
 Service = {   
     getNormalComplaint:'http://'+MCRS+'/complaintResponseControler/getAllComplaints',
	 getEpidemicComplaint:'http://'+MCRS+'/complaintResponseControler/getAllComplaints',
	 finalReplyOfNormalComplaints:'http://'+MCRS+'/complaintResponseControler/complaintRegFinalReply',
	 finalReplyOfEpidemicComplaints:'http://'+MCRS+'/complaintResponseControler/complaintRegFinalReply',
	 updateStatusOfComplaintsDetails:'http://'+MCRS+'/complaintResponseControler/updateComplaintStatus',
	 insertHmSmsOutboxTreans1:'http://'+MCRS+'/complaintResponseControler/sendSmsToCaller',
	 insertHmEmailOutboxTreans:'http://'+MCRS+'/mailAndSmsController/insertEmailOutBoxTrans' ,
	 login:'http://'+LOGIN+'/supportlogin/login',
	 getUserName:'http://'+MCRS+'/complaintResponseControler/getUserName',
	 getAllEscalatedComplaints:'http://'+MCRS+'/complaintResponseControler/getAllEscalatedComplaints',
	 redirectToLoginPage:'http://'+mpcr_ui+'/MCRS/pages/login.html',
	 redirectToHomepage:'http://'+mpcr_ui+'/MCRS/pages/MCRS/complaint_response.html',	 
};
