/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var SYSTEM_IP = "localhost:2800"; //
var SYSTEM_IP1 = "localhost:2700"; // file upload port number


Service = {
	    loginDetailsService: 'http://' + SYSTEM_IP + '/admin/login/trytologin',
    //AllSites URLS
    GetAllSitesDetails: 'http://' + SYSTEM_IP + '/admin/admin/getAllSitesDetails',
    UpdateAllSitesStatus: 'http://' + SYSTEM_IP + '/admin/admin/updateAllSitesStatus',
    //All Service Providers URLS
    GetAllServiceProviderDetails: 'http://' + SYSTEM_IP + '/admin/admin/getAllServiceProviderDetails',
    UpdateServiceProviderStatus: 'http://' + SYSTEM_IP + '/admin/admin/updateServiceProviderStatus',
    //Admin Dashboard URLS    
    GetAllSitesPendingStatus: 'http://' + SYSTEM_IP + '/admin/admin/getAllSitesPendingStatus',
    UpdateSitePendingStatus: 'http://' + SYSTEM_IP + '/admin/admin/updateSitePendingStatus',
    //MASTER DATA URLS
    //Module Creation URLS
    GetAllModulesDetails: 'http://' + SYSTEM_IP + '/admin/masterData/getAllModulesDetails',
    UpdateModuleStatus: 'http://' + SYSTEM_IP + '/admin/masterData/updateModuleStatus',
    InsertModuleDetails: 'http://' + SYSTEM_IP + '/admin/masterData/insertModuleDetails',
    //Role Creation URLS
    GetAllRolesDetails: 'http://' + SYSTEM_IP + '/admin/masterData/getAllRolesDetails',
    InsertRolesDetails: 'http://' + SYSTEM_IP + '/admin/masterData/insertRolesDetails',
    UpdateRolesStatus: 'http://' + SYSTEM_IP + '/admin/masterData/updateRolesStatus',
    GetModules: 'http://' + SYSTEM_IP + '/admin/SiteController/getModulesDetails',
    //Designation Creation URLS
    InsertDesignationDetails: 'http://' + SYSTEM_IP + '/admin/masterData/insertDesignationDetails',
    GetAllDesignationsDetails: 'http://' + SYSTEM_IP + '/admin/masterData/getAllDesignationsDetails',
    UpdateDesignationStatus: 'http://' + SYSTEM_IP + '/admin/masterData/updateDesignationStatus',
    //Service Provider Type Creation URLS
    InsertServiceProviderTypeDetails: 'http://' + SYSTEM_IP + '/admin/masterData/insertServiceProviderTypeDetails',
    GetAllServiceProviderTypeDetails: 'http://' + SYSTEM_IP + '/admin/masterData/getAllServiceProviderTypeDetails',
    UpdateServiceProviderTypeStatus: 'http://' + SYSTEM_IP + '/admin/masterData/updateServiceProviderTypeStatus',
    //Service Provider Type Creation URLS
    InsertSiteStatusDetails: 'http://' + SYSTEM_IP + '/admin/masterData/insertSiteStatusDetails',
    GetAllSiteStatusDetails: 'http://' + SYSTEM_IP + '/admin/masterData/getAllSiteStatusDetails',
    UpdateSiteStatusStatus: 'http://' + SYSTEM_IP + '/admin/masterData/updateSiteStatusStatus',
    GetAllUsersDetails: 'http://' + SYSTEM_IP + '/admin/masterData/getAllUsersDetails',
    GetImage: 'http://' + SYSTEM_IP1 + '/FileController/view/',
    updateUserDetailsStatus: 'http://' + SYSTEM_IP + '/admin/masterData/updateUserDetailsStatus'
};