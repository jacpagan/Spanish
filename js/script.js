$(document).ready(function(){
	$.getJSON("http://localhost:3000/verbs", function(data){ 
		for (verb in data){ 
			var opt = document.createElement("option");
			var newSelect = document.getElementById("form"); 
			opt.innerHTML = verb;
			newSelect.appendChild(opt); 
		}
	});
});

