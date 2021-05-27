function closeInfo() {
	var id = document.getElementById("infoText"); 
	var co = document.getElementById("co"); 
	var co2 = document.getElementById("co2"); 

	id.style.display = "none";
	co.style.display = "none";
	co2.style.display = "block";
}

function openInfo() {
	var id = document.getElementById("infoText"); 
	var co = document.getElementById("co"); 
	var co2 = document.getElementById("co2"); 

	id.style.display = "block";
	co.style.display = "block";
	co2.style.display = "none";
}