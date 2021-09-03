$(document)
		.ready(
				function() {
					checkLoggedOrNot();

					$("#cro").attr("disabled", "disabled");
					$("#cro").removeAttr("href");
					$("#mcrs").attr("disabled", "disabled");
					$("#mcrs").removeAttr("href");
					$("#opdesk").attr("disabled", "disabled");
					$("#opdesk").removeAttr("href");
					$("#wfms").attr("disabled", "disabled");
					$("#wfms").removeAttr("href");
					$("#SCMId").attr("disabled", "disabled");
					$("#SCMId").removeAttr("href");
					$("#sla").attr("disabled", "disabled");
					$("#sla").removeAttr("href");
					$("#audit").attr("disabled", "disabled");
					$("#audit").removeAttr("href");
					$("#fms").removeAttr("href");
					$("#fms").attr("disabled", "disabled");
					$("#Quallity").attr("disabled", "disabled");
					$("#Quallity").removeAttr("href");
					$("#mmu").attr("disabled", "disabled");
					$("#mmu").removeAttr("href");
					$("#PRO_ADMIN").removeAttr("href");
					$("#PRO_ADMIN").attr("disabled", "disabled");

					var roles = localStorage.getItem("Roles");

					$.each(JSON.parse(roles), function(idx, obj) {
						console.log(obj.roleID);

						console.log(obj.roleName);
						console.log(obj.moduleID);

						disableEnableAllModule(obj.roleID, obj.moduleID,
								obj.roleName);

					});

					function disableEnableAllModule(roleID, moduleID, roleName) {

						if (roleID === '169' || moduleID === "15"
								|| roleName === "FMS") {

							localStorage.setItem("fms_roleID", roleID);
							localStorage.setItem("fms_moduleID", moduleID);
							$("#fms").removeAttr("disabled");
							$("#fms").attr("href",
									"FMS/pages/FleetIO_Dashboard.html");

						}

						if (roleID === '172' || moduleID === "1"
								|| roleName === "PRO-ADMIN") {
							localStorage.setItem("proAdmin_roleID", roleID);
							localStorage.setItem("proAdmin_moduleID", moduleID);

							$("#PRO_ADMIN").removeAttr("disabled");
							$("#PRO_ADMIN").attr("href",
									"PRO_ADMIN/admin/pages/dashboard.html");

						}

						if (roleID === '173' || moduleID === "19"
								|| roleName === "WFMS") {
							localStorage.setItem("wfms_roleID", roleID);
							localStorage.setItem("wfms_moduleID", moduleID);

							$("#wfms").removeAttr("disabled");
							$("#wfms").attr("href",
									"WFMS/pages/WFMS_dashboard.html");

						}
						if (roleID === '171' || moduleID === "20"
								|| roleName === "MMU") {

							localStorage.setItem("mmu_roleID", roleID);
							localStorage.setItem("mmu_moduleID", moduleID);
							$("#mmu").removeAttr("disabled");
							$("#mmu").attr("href", "MMU/pages/dashBoard.html");

						}

						if (roleID === '150' || moduleID === "9"
								|| roleName === "Quality User") {
							localStorage.setItem("Quallity_roleID", roleID);
							localStorage.setItem("Quallity_moduleID", moduleID);
							$("#Quallity").removeAttr("disabled");
							$("#Quallity").attr("href",
									"Quality/pages/dashboard.html");

						}

						if (roleID === '170' || moduleID === "25"
								|| roleName === "SLA") {
							localStorage.setItem("sla_roleID", roleID);
							localStorage.setItem("sla_moduleID", moduleID);
							$("#sla").removeAttr("disabled");
							$("#sla").attr("href", "SLA/pages/dashboard.html");
						}
						if (roleID === '80' || moduleID === "28"
								|| roleName === "Helpdesk User") {
							localStorage.setItem("opdesk_roleID", roleID);
							localStorage.setItem("opdesk_moduleID", moduleID);
							$("#opdesk").removeAttr("disabled");
							$("#opdesk").attr("href",
									"OPDESK/OPdesk/Op_Dashboard.html");

						}
						
						if (roleID === '100' && moduleID === "40"
							&& roleName === "Store") {
						localStorage.setItem("scmRoleId", roleID);
						localStorage.setItem("scmModuleId", moduleID);
						localStorage.setItem("roleName", roleName);
						
						$("#SCMId").removeAttr("disabled");
						$("#SCMId").attr("href",
								"SCM/scm_client/Dashboard/pages/Dashboard.html");

					}
						
					if (roleID === '101' && moduleID === "40"
							&& roleName === "SubStroes") {
						localStorage.setItem("scmRoleId", roleID);
						localStorage.setItem("scmModuleId", moduleID);
						localStorage.setItem("roleName", roleName);
						$("#SCMId").removeAttr("disabled");
						$("#SCMId").attr("href",
								"SCM/scm_client/Dashboard/pages/Dashboard.html");

					}
						
						
						if (roleID === '102' && moduleID === "40"
							&& roleName === "SCMReports") {
						
						localStorage.setItem("scmRoleId", roleID);
						localStorage.setItem("scmModuleId", moduleID);
						localStorage.setItem("roleName", roleName);
						$("#SCMId").removeAttr("disabled");
						$("#SCMId").attr("href",
								"SCM/scm_client/Dashboard/pages/Dashboard.html");

					}
						
						
						
									
						
						
						

					}

				});

function checkLoggedOrNot() {

	if (localStorage.getItem("userID") === ""
			|| localStorage.getItem("userID") === "null"
			|| localStorage.getItem("userID") === null) {
		window.location.assign(Service.redirectToLoginPage);
	}
}


