function view(newCodataObject) {
    
    document.getElementById("view").innerHTML = JSON.stringify(newCodataObject, null, "\t");;
}