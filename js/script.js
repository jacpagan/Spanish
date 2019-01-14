$(document).ready(function(){
	/* ROOT VERB SELECT BOX */
		var listItems = '<option selected="selected" value="0">- ROOTS -</option>';
    for (var i = 0; i < Object.keys(verbs).length; i++) {
        	listItems += "<option>" + Object.keys(verbs)[i] + "</option>";
    }
    $("#roots").html(listItems);
		$("#roots").change(function(){
			var $verb = $(this);
			/* definitions from definitions.js */
			$("#translation").html("<h1><span>"+definitions[$verb.val()]+"</span></h1>");

			var indicative = [];
			var subjunctive = [];
			var imperative = [];
			var perfect = [];
			var continuous = [];

			for (var i = 0; i < Object.keys(verbs[$verb.val()]).length; i++){
				if (Object.keys(verbs[$verb.val()])[i].endsWith("Indicative")){
					indicative.push(Object.keys(verbs[$verb.val()])[i]);
				}
				if (Object.keys(verbs[$verb.val()])[i].endsWith("Subjunctive") || Object.keys(verbs[$verb.val()])[i].endsWith("Subjunctive2")){
					subjunctive.push(Object.keys(verbs[$verb.val()])[i]);
				}
				if (Object.keys(verbs[$verb.val()])[i].endsWith("Imperative") || Object.keys(verbs[$verb.val()])[i] == ("imperative")){
					imperative.push(Object.keys(verbs[$verb.val()])[i]);
				}
				if (Object.keys(verbs[$verb.val()])[i].endsWith("Perfect")){
					perfect.push(Object.keys(verbs[$verb.val()])[i]);
				}
				if (Object.keys(verbs[$verb.val()])[i].endsWith("Continuous")){
					continuous.push(Object.keys(verbs[$verb.val()])[i]);
				}
			}

			var conj = '';
			conj += '<table class="table table-condensed table-striped table-hover"><tr><th colspan="2"> INDICATIVE </th></tr>';
			for (var i = 0; i < indicative.length; i++){
				conj += "<tr><td><b>" + indicative[i].replace("Indicative", "") + "</b></td><td>" + verbs[$verb.val()][indicative[i]] + "</td></tr>";
			}
			conj += '</table><table class="table table-condensed table-striped table-hover"><tr><th colspan="2"> SUBJUNCTIVE </th></tr>';
			for (var i = 0; i < subjunctive.length; i++){
				conj += "<tr><td><b>" + subjunctive[i].replace("Subjunctive", "") + "</b></td><td>" + verbs[$verb.val()][subjunctive[i]] + "</td></tr>";
			}
			conj += '</table><table class="table table-condensed table-striped table-hover"><tr><th colspan="2"> IMPERATIVE </th></tr>';
			for (var i = 0; i < imperative.length; i++){
				conj += "<tr><td><b>" + imperative[i].replace("imperative", "affirmative").replace("Imperative", "") + "</b></td><td>" + verbs[$verb.val()][imperative[i]] + "</td></tr>";
			}
			conj += '</table><table class="table table-condensed table-striped table-hover"><tr><th colspan="2"> PERFECT </th></tr>';
			for (var i = 0; i < perfect.length; i++){
				conj += "<tr><td><b>" + perfect[i].replace("Perfect", "") + "</b></td><td>" + verbs[$verb.val()][perfect[i]] + "</td></tr>";
			}
			conj += '</table><table class="table table-condensed table-striped table-hover"><tr><th colspan="2"> CONTINUOUS </th></tr>';
			for (var i = 0; i < continuous.length; i++){
				conj += "<tr><td><b>" + continuous[i].replace("Continuous", "") + "</b></td><td>" + verbs[$verb.val()][continuous[i]] + "</td></tr>";
			}
			conj += "</table>";
			$("#conjugations").html(conj);
    });
});
