$(document).ready(function(){
	$('#btn').click(function(){
		$.getJSON("http://localhost:3000/verbs", function(data){ 
            		console.log(data);
		});
  });
});
