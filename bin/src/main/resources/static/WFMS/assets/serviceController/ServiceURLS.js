

var SYSTEM_IP = "192.168.1.102:9160";

Service = {
//  ----------------  MY-PROFILES RELATED URLS ---------------- //

    My_Sheduled_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/mySheduledDetails',
    Get_UserName: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getUserName',
    Get_ManagerName: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getMangerDetails',
    Get_Phone_Number: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getuserphonenumber',
    Sick_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getSickLeaveTypeDetails',
    Earned_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getEarnedLeaveTypeDetails',
    Compassionate_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getCompassionateLeaveTypeDetails',
    Casual_Leave_Count: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getCasulaLeaveTypeDetails',
    Leave_Type_DropDown: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/get_Leave_Type_Details',
    Leave_Status_DropDown: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getLeaveStatusDetails',
    Selected_Year_DropDown: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getSelectedYear',
    Insert_Leave_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/insertLeaveApplyDetails',
    Update_Leave_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/update_Leave_ApplyDetails',
    MyLeave_History_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/get_Leave_History_Details ',
    Leave_Cancel_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/get_UserLeave_Cancel_Details ',
    Leave_Status_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getLeaveDetailsBasedOnId ',
    Update_Leave_SheduledAllocated_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/update_wfscheduleallocated_Details ',
    Update_Leave__UserCancel_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/updateLeaveCancellation ',
    Update_Leave__Approval_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/updateLeaveApprovalUserCancellation ',
    Inserting_Email_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/insertingMail ',
    Inserting_Sms_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/insertingSms ',
    Get_UserLast_Leave_Details: 'http://' + SYSTEM_IP + '/wfms/MyProfileController/getUserLastLeaveDetails',
    //  ---------------- MANAGE RESOURCE  RELATED URLS ---------------- //

    Days_DropDown_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getShiftTypeDropDown',
    Get_ShiftPatterns_Erc_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_shift_Erc_TypeDetails',
    Get_ShiftPatterns_Operators_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_ShiftType_Opertors_Details',
    Get_ShiftPattern_Count: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getShiftPatternsCount',
    Insert_ShiftPatterns_Erc_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/insertingShiftPatterns',
    GetUserShiftTypeDetails: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getUserShiftTypeDetails',
    Get_Employee_LeaveHistory_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmployeeLeaveHistoryDetails',
    Get_Employee_LeaveHistory_Basedon_Conditions_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmployeeLeaveHistoryDetailsBasedOnCondition',
    Get_Department_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getModulesDropDown',
    Get_Employee_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmplyeDetailsDropDown_Basedon_Id',
    Get_UserDetails_Active: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getUserDetailsIsActive',
    Get_Modules_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getModuleDropDownBasedOnIds',
    Get_Zones_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getZonesDropDowns',
    Get_BaseLocation_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getBaseLocationsDropDown',
    Get_Vehicles_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getVehiclesDropDown',
    Get_Employee_Availbility_Operators2: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmployeeAvailbilityOperators2',
    Get_Employee_Availbility_Operators: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getEmployeeAvailbilityOperators',
    Get_Department_Details_DropDown: 'http://' + SYSTEM_IP + '/wfms/SearchController/get_Department_Details_DropDown',
    Get_EmployeeDetails_AvailbilityDetails: 'http://' + SYSTEM_IP + '/wfms/SearchController/getEmployeeDetailsAvailbilityDetails',
    Get_Leave_Approval_Reject_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Leave_Approval_Reject_Details',
    Get_Selected_Sheduled_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getSelectedSheduledDetails ',
    Update_Sheduled_Details_BasedOn_SheduledId: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/updateSheduledDetailsBasedOnSheduledId',
  
    //  ---------------- SHEDULE_ERC RELATED URLS ---------------- //

    Get_ShiftType_Pattern_DropDown: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_All_ShiftTypeDetails',
    Get_Modules_DropDown_For_Shedule: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getModulesDetails',
    Get_Employee_Details: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Employee_Details',
    Get_ShiftType_Patterns_BasedOn_ShifType_Ids: 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_ShiftType_Patterns_BasedOn_ShifType_Ids',
    Get_User_Details : 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getting_User_Details ',
    Get_ExistsPatternsCount : 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/getExistsPatternsCount ',
    Get_Allocated_Sheduled_Details : 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Allocated_Sheduled_Details ',
    Get_Sheduled_Details : 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Sheduled_Details  ',
    Update_SheduleAllocated_Details : 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_SheduleAllocated_Details  ',
    Update_Shedule_Details : 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/update_Shedule_Details  ',
    Get_Shedule_Details_Counts : 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_Shedule_Details_Counts   ',
    Inserting_Shedule_Details : 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/inserting_Shedule_Details   ',
    Get_shift_Pattern_Details  : 'http://' + SYSTEM_IP + '/wfms/ManageResourceController/get_shift_Pattern_Details    ',
          
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //  ---------------- ZONE   RELATED URLS ---------------- //

            // ---------------------- Add Zone -------------------------------//

            GET_COUNTRIES: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getCountries',
    GET_STATES: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getStates',
    GET_DISTRICTS: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getDistricts',
    GET_MANDALS: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getMandals',
    GET_CITIES: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getCities',
    GET_LOCALITIES: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getLocalities',
    INSERT_ZONE_DETAILS: 'http://' + SYSTEM_IP + '/wfms/ZoneController/insertWFMSZones',
    GET_ZONE_DETAILS: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getZoneDetails',
    GET_SINGLE_ZONE_DETAILS_FOR_UPDATE: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getLocationDetails',
    UPDATE_ZONE_DETAILS: 'http://' + SYSTEM_IP + '/wfms/ZoneController/UpdateWFMSZonesWithoutNames',
    DELETE_ZONE: 'http://' + SYSTEM_IP + '/wfms/ZoneController/updateDeletedZones',
    // ------------------------- Add Baselocation ----------------------//
    GETZONES: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getLocation',
    GET_LOCATION_INFO: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getLocationInfo',
    GET_BASE_LOCATION_DETAILS: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getBaselocationsDetails',
    GET_LANDMARK_BASEDON_LOCALITYID: 'http://' + SYSTEM_IP + '/wfms/ZoneController/getlanmarkbasedonlocalityid',
    INSERT_BASE_LOCATION: 'http://' + SYSTEM_IP + '/wfms/ZoneController/insertingBaselocationsDetails'




};