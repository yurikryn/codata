document.getElementById("save-button").onclick = function () {
	document.getElementById("save-anchor").download = "codata-object.js";
	document.getElementById("save-anchor").href = "data:application/javascript;charset=utf-8,"
		+ encodeURIComponent("let codataObject = " + codataObjectJSON + ";");
	document.getElementById("save-anchor").click();
}