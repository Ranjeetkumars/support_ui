function openModalBox() {
	console.log('openModalBox  javascript function is executed');
	$('#brandName').modal('show');
	$('#registration').modal('show');
	$("#save_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", false);
	$("#update_disable").attr("disabled", true);

}