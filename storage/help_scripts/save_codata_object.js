document.getElementById("save-button").onclick = function () {
	document.getElementById("save-anchor").download = "codata_object.js";
	document.getElementById("save-anchor").href = "data:application/javascript;charset=utf-8,"
		+ encodeURIComponent("const codataObject = " + codataObjectJSON + ";");
	document.getElementById("save-anchor").click();
}