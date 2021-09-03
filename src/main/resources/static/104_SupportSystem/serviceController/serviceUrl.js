
var SYSTEM="192.168.1.191:4000";

var hms = "localhost:6503";//hms services
http://localhost:6503/hms/masterData/getCountryDetails'

 Service = {   
	 getDistrict:'http://' + hms+ '/hms/masterData/getDistricts',	
	 getDistrictForLevel2:'http://'+hms+'/hms/responseOfficerController/getDistrictForLevel2',
	 getState:'http://' + hms+ '/hms/masterData/getStateDetails',	
	 getMandal:'http://' + hms+ '/hms/responseOfficerController/getMandal',
	 getCity:'http://' + hms+ '/hms/masterData/getCities',
	// getCountry:'http://'+SYSTEM+'/medicalAdviceController/getCountry',
	 getCountry : 'http://' + hms + '/hms/masterData/getCountryDetails',
	 mappingResponseofficer:'http://'+hms+'/hms/responseOfficerController/mappingResponseOfficer',
	 getResponseofficer:'http://'+hms+'/hms/responseOfficerController/getResponseOfficer',
	 getStateForEscalationStateLevel:'http://'+hms+'/hms/responseOfficerController/getStateForStateLevel',
	 getResponseOfficerList:'http://'+hms+'/hms/responseOfficerController/getResponseOfficerList',
	 getResponseofficerLevel:'http://'+hms+'/hms/responseOfficerController/getResponseOfficerLevel',
	 updateResponseofficer:'http://'+hms+'/hms/responseOfficerController/updateResponseOfficer',
	 deleteResponseofficer:'http://'+hms+'/hms/responseOfficerController/deleteResponseOfficer'
	 
	
 }
 //