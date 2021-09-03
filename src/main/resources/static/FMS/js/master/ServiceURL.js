
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var SYSTEM_IP = "10.110.4.152:9161";
var SYSTEM_IP = "localhost:9031";

Service = {
   
		addVehicleStatusRegistrationDetails: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/saveVehicleStatusRefDetails',
        getAllVehicleStatusRef: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/getAllVehicleStatusRefDetails',
        vehicleStatusDeletion: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/deleteVehicleStatusRefDetails',
        
        
//        vehicle type 

        addVehicleTypeRegistration: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/saveVehicletypesRefDetails',
        getAllVehicleTypeRefDetails: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/getAllVehicleTypeRefDetails',
        deleteVehicleTypeRefDetails: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/deleteVehicleTypeRefDetails',
        
        
        //fuel type
        addFuelTypeRegistration: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/saveVehicleFueltypeRefDetails',
        getAllFuelTypeRefDetails: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/getAllVehicleFueltypeRefDetails',
        deleteFueltypeRefDetails: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/deleteVehicleFueltypeRefDetails',
       
 // expenseType
        addExpenseTypesRegistration: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/saveExpenseTypeRefDetails',
        getAllExpenseTypeRefDetails: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/getAllExpenseTypeRefDetails',
        deleteExpenseTypeRefDetails: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/deleteExpenseTypeRefDetails',
//vehicle renewal
        
        addVehicleRenewalRemindersRegistration: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/saveVehicleRenewalTypeDetails',
        getAllVehicleRenewalTypeDetails: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/getAllVehicleRenewalTypeDetails',
        deleteVehicleRenewalTypeDetails: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/deleteVehicleRenewalTypeDetails',
        
        
        //contact renewal
        addContactRenewalRemindersRegistration: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/saveContactRenewalTypeDetails',
        getContactRenewalTypeDetails: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/getContactRenewalTypeDetails',
        deleteVehicleRenewalTypeDetails: 'http://' + SYSTEM_IP + '/FleetManagement/MastersResgistationController/deleteContactRenewalTypeDetails',

};