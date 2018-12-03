$(document).ready(function(){
	$.getJSON("http://localhost:3000/verbs", function(verbs){ 
	var listItems = '<option selected="selected" value="0">- Select -</option>';
      	for (var i = 0; i < Object.keys(verbs).length; i++) {
             listItems += "<option>" + Object.keys(verbs)[i] + "</option>"; 
         }
        $("#form").html(listItems);
	$("#form").change(function(){ 
		var $verb = $(this); 
		var tenseItems = '<option selected="selected" value="0">-- Select --</option>'; 
		for (var i = 0; i < Object.keys(verbs[$verb.val()]).length; i++){ 
			tenseItems += "<option>" + Object.keys(verbs[$verb.val()])[i] + "</option>";
		}
		$("#form1").html(tenseItems);  	

		$("#form1").change(function(){ 
			var $tense = $(this);
			var conj = ''; 
			for(let i = 0, l = verbs[$verb.val()][$tense.val()].length; i < l; i++){ 
				conj += "<p>" + verbs[$verb.val()][$tense.val()][i] + "</p>";
			}
			$("p").html(conj);
		}); 
    	}); 		
  	});
});
