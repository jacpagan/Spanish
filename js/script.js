$(document).ready(function(){
	$.getJSON("http://localhost:3000/verbs", function(data){ 
		var keys = Object.keys(data); 
		for (key in keys){ 
			var tenses = Object.keys(data[keys[key]]); 
			for (tense in tenses){ 
				var conj = Object.keys(data[keys[key]][tenses[tense]]);
				for (c in conj){ 
					var p = Object.keys(data[keys[key]][tenses[conj[c]]]);
				} 
			}			
		} 
		console.log(keys, tenses, conj, p); 
	});
});
