/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var SYSTEM_IP = "localhost:2800";
var SYSTEM_IP1 = "localhost:2700";// file upload port number



Service = {
		GetModules: 'http://' + SYSTEM_IP + '/admin/SiteController/getModulesDetails',
	    Insert_SiteRegistartion: 'http://' + SYSTEM_IP + '/admin/SiteController/insertSiteRegistration',
	    GetSiteUserDetails: 'http://' + SYSTEM_IP + '/admin/SiteController/getSiteUserDetails',
	    GetTotalAgentsCount: 'http://' + SYSTEM_IP + '/admin/SiteController/getTotalAgentsCount',
	    GetUserSegregationDetails: 'http://' + SYSTEM_IP + '/admin/SiteController/getUserSegregationDetails',
	    Insert_User_Segregation_Details: 'http://' + SYSTEM_IP + '/admin/SiteController/insertUserSegregationDetails',
	    UpdateUserSegregationStatus: 'http://' + SYSTEM_IP + '/admin/SiteController/updateUserSegregationStatus',
	    UpdateUserSegregationDetails: 'http://' + SYSTEM_IP + '/admin/SiteController/updateUserSegregationDetails',
	    //serviceProviderRegistration
	    serviceProviderType: 'http://' + SYSTEM_IP + '/admin/srp/serviceProvidersTypes',
	    regServiceProviderDetails: 'http://' + SYSTEM_IP + '/admin/srp/serviceProviderRegistration',
	    isUserExist: 'http://' + SYSTEM_IP + '/admin/srp/isUserExist',
	    loginDetailsService: 'http://' + SYSTEM_IP + '/admin/login/trytologin',
	    insertLogingTransTable: 'http://' + SYSTEM_IP + '/admin/login/insertLoginTransTable',
	    serviceProverlogout: 'http://' + SYSTEM_IP + '/admin/login/insertLoginTransTable',
	    SPRDashBoardDetails: 'http://' + SYSTEM_IP + '/admin/srp/SPRDashboardloading',
	    //usercreation:
	    genderType: 'http://' + SYSTEM_IP + '/admin/SiteController/genderType',
	    employeeType: 'http://' + SYSTEM_IP + '/admin/SiteController/employeeType',
	    loadQualifications: 'http://' + SYSTEM_IP + '/admin/SiteController/getQualifications',
	    designationType: 'http://' + SYSTEM_IP + '/admin/SiteController/designationType',
	    saveUserCreationDetails: 'http://' + SYSTEM_IP + '/admin/SiteController/saveUserCreationDetails',
	    userCreationUserIsExist: 'http://' + SYSTEM_IP + '/admin/SiteController/userCreationUserIsExist',
	    //Modulemapping:
	    usersDropdown: 'http://' + SYSTEM_IP + '/admin/SiteController/usercreationdropdown',
	    getModulesBasedOnUser: 'http://' + SYSTEM_IP + '/admin/SiteController/getModulesBasedOnUser',
	    saveModuelMappingDateails: 'http://' + SYSTEM_IP + '/admin/SiteController/saveModuelMappingDateails',
	    Get_Modules_Mapping_Details: 'http://' + SYSTEM_IP + '/admin/SiteController/getModuleMappingDetails',
	    updateModulesBasedOnUserDetails: 'http://' + SYSTEM_IP + '/admin/SiteController/updateDeleteModuleMappingDetails',
	    deleteModulesSegregationDetails: 'http://' + SYSTEM_IP + '/admin/SiteController/updateDeleteModuleMappingDetails',
	     //Single View
	    GetSingleSiteViewDetails: 'http://' + SYSTEM_IP + '/admin/SiteController/getSingleSiteViewDetails',
	    GetSingleSiteAllUsersDetails: 'http://' + SYSTEM_IP + '/admin/SiteController/getSingleSiteAllUsersDetails',

	     //CTI Usercreation Purpose
	    GetSegregationModulesDetails: 'http://' + SYSTEM_IP + '/admin/CtiController/getSegregationModulesDetails',
	    GetCenterDetails: 'http://' + SYSTEM_IP + '/admin/CtiController/getCenterDetails',
	    GetCTIUsers_Checking: 'http://' + SYSTEM_IP + '/admin/CtiController/getCTIUsers_Checking',
	    insertCTIUserCreation: 'http://' + SYSTEM_IP + '/admin/CtiController/insertCTIUserCreation',
	    UpdateCTIUserStatus: 'http://' + SYSTEM_IP + '/admin/CtiController/updateCTIUserStatus',
	    GetCTIUsersDetails: 'http://' + SYSTEM_IP + '/admin/CtiController/getCTIUsersDetails',
	    GetCtiModuleChecking: 'http://' + SYSTEM_IP + '/admin/CtiController/getCtiModuleChecking',

	    //CTI module Mapping
	    saveCTIUserModuleMappingDetails: 'http://' + SYSTEM_IP + '/admin/CtiController/saveCTIUserModuleMappingDetails',
	    ctiUserDropdown: 'http://' + SYSTEM_IP + '/admin/CtiController/ctiUserDropdown',
	    ctiUserBasedOnModuleDropdown: 'http://' + SYSTEM_IP + '/admin/CtiController/ctiUserBasedOnModuleDropdown',
	    getCTIUserModuleMappingDetails: 'http://' + SYSTEM_IP + '/admin/CtiController/getCTIUserModuleMappingDetails',
	    deleteCTIUserModuleMappingDetails: 'http://' + SYSTEM_IP + '/admin/CtiController/deleteCTIUserModuleMappingDetails',
	    //AllSites Urls
	    GetAllSitesDetails: 'http://' + SYSTEM_IP + '/admin/admin/getAllSitesDetails',
	    UpdateAllSitesStatus: 'http://' + SYSTEM_IP + '/admin/admin/updateAllSitesStatus',
	    //All Service Providers Urls
	    GetAllServiceProviderDetails: 'http://' + SYSTEM_IP + '/admin/admin/getAllServiceProviderDetails',
	    UpdateServiceProviderStatus: 'http://' + SYSTEM_IP + '/admin/admin/updateServiceProviderStatus',
	    //Admin Dashboard Urls    
	    GetAllSitesPendingStatus: 'http://' + SYSTEM_IP + '/admin/admin/getAllSitesPendingStatus',
	    UpdateSitePendingStatus: 'http://' + SYSTEM_IP + '/admin/admin/updateSitePendingStatus',
	  //whitelisting 
	    saveWhiteListingIpAddress: 'http://' + SYSTEM_IP + '/admin/WhiteListingController/saveWhiteListingIpAddress',
	    GetWhiteListingIpAddress: 'http://' + SYSTEM_IP + '/admin/WhiteListingController/GetWhiteListingIpAddress',
	    updateWhiteListingIpAddress: 'http://' + SYSTEM_IP + '/admin/WhiteListingController/updateWhiteListingIpAddress',
	    
	    
       //view image 
	    ViewImage: 'http://' + SYSTEM_IP1 + '/FileController/uploadFile/',
	    
	    //Terminal Mapping
	    saveHhcIpTerminalDetials: 'http://' + SYSTEM_IP + '/admin/terminalMappingController/saveHhcIpTerminalDetials',
	    getTerminalMappingDetails: 'http://' + SYSTEM_IP + '/admin/terminalMappingController/getTerminalMappingDetails ',
	    updateHhcIpTerminalDetials: 'http://' + SYSTEM_IP + '/admin/terminalMappingController/saveHhcIpTerminalDetials',

	    //Team Creation Leaders 
	    getNotMappedTeamLeaders: 'http://' + SYSTEM_IP + '/admin/Teamleader/getNotMappedTeamLeaders',
	    getTeamLeadersDetails: 'http://' + SYSTEM_IP + '/admin/Teamleader/getTeamLeadersDetails',
	    insertTeamLeadersDetails: 'http://' + SYSTEM_IP + '/admin/Teamleader/insertTeamLeadersDetails',
	    updateTeamLeaderStatus: 'http://' + SYSTEM_IP + '/admin/Teamleader/updateTeamLeaderStatus',
	    getTeamLeadersDetailsNotin_ShiftManager: 'http://' + SYSTEM_IP + '/admin/Teamleader/getTeamLeadersDetailsNotin_ShiftManager',

	    
	    
	    
	    //Team Leaders Agents Mapping
	    getTeamLeadersAgentDetails: 'http://' + SYSTEM_IP + '/admin/Teamleader/getTeamLeadersAgentDetails',
	    insertTeamLeadersAgentDetails: 'http://' + SYSTEM_IP + '/admin/Teamleader/insertTeamLeadersAgentDetails',
	    updateTeamLeadersAgentDetailsStatus: 'http://' + SYSTEM_IP + '/admin/Teamleader/updateTeamLeadersAgentDetailsStatus',
	    getNotMappedTeamLeaders_Agnets: 'http://' + SYSTEM_IP + '/admin/Teamleader/getNotMappedTeamLeaders_Agnets',

	    //Shift Managers Creation 
	    getNotMappedShiftManagers: 'http://' + SYSTEM_IP + '/admin/ShiftManager/getNotMappedShiftManagers',
	    insert_Update_ShiftMangersDetails: 'http://' + SYSTEM_IP + '/admin/ShiftManager/insert_Update_ShiftMangersDetails',
	    getShiftManagersDetails: 'http://' + SYSTEM_IP + '/admin/ShiftManager/getShiftManagersDetails',

	    //Shift Managers Mapping with team Leaders  
	    insert_Update_ShiftMangersTeamLeadersMappingDetails: 'http://' + SYSTEM_IP + '/admin/ShiftManager/insert_Update_ShiftMangersTeamLeadersMappingDetails',
	    getShiftManagersTeamLeadersMappingDetails: 'http://' + SYSTEM_IP + '/admin/ShiftManager/getShiftManagersTeamLeadersMappingDetails',

	    //Reports 
	    getSiteModuleWiseLoginReportDetails: 'http://' + SYSTEM_IP + '/admin/Reports/getSiteModuleWiseLoginReportDetails',
	    getAllShiftsDetails: 'http://' + SYSTEM_IP + '/admin/Reports/getAllShiftsDetails'

	    


};