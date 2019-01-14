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
			var root_verb = verbs[$verb.val()];

			for (var i = 0; i < Object.keys(root_verb).length; i++){
				if (Object.keys(root_verb)[i].endsWith("Indicative")){
					indicative.push(Object.keys(root_verb)[i]);

				}
				if (Object.keys(root_verb)[i].endsWith("Subjunctive") || Object.keys(root_verb)[i].endsWith("Subjunctive2")){
					subjunctive.push(Object.keys(root_verb)[i]);
				}
				if (Object.keys(root_verb)[i].endsWith("Imperative") || Object.keys(root_verb)[i] == ("imperative")){
					imperative.push(Object.keys(root_verb)[i]);
				}
				if (Object.keys(root_verb)[i].endsWith("Perfect")){
					perfect.push(Object.keys(root_verb)[i]);
				}
				if (Object.keys(root_verb)[i].endsWith("Continuous")){
					continuous.push(Object.keys(root_verb)[i]);
				}
			}

			var conj = '';
			conj += '<table class="table table-condensed table-striped table-hover"><tr><th colspan="2"> INDICATIVE </th></tr>';
			for (var i = 0; i < indicative.length; i++){
				conj += "<tr><td><b>" + indicative[i].replace("Indicative", "") + "</b></td><td>" + root_verb[indicative[i]] + "</td></tr>";
			}
			conj += '</table><table class="table table-condensed table-striped table-hover"><tr><th colspan="2"> SUBJUNCTIVE </th></tr>';
			for (var i = 0; i < subjunctive.length; i++){
				conj += "<tr><td><b>" + subjunctive[i].replace("Subjunctive", "") + "</b></td><td>" + root_verb[subjunctive[i]] + "</td></tr>";
			}
			conj += '</table><table class="table table-condensed table-striped table-hover"><tr><th colspan="2"> IMPERATIVE </th></tr>';
			for (var i = 0; i < imperative.length; i++){
				conj += "<tr><td><b>" + imperative[i].replace("imperative", "affirmative").replace("Imperative", "") + "</b></td><td>" + root_verb[imperative[i]] + "</td></tr>";
			}
			conj += '</table><table class="table table-condensed table-striped table-hover"><tr><th colspan="2"> PERFECT </th></tr>';
			for (var i = 0; i < perfect.length; i++){
				conj += "<tr><td><b>" + perfect[i].replace("Perfect", "") + "</b></td><td>" + root_verb[perfect[i]] + "</td></tr>";
			}
			conj += '</table><table class="table table-condensed table-striped table-hover"><tr><th colspan="2"> CONTINUOUS </th></tr>';
			for (var i = 0; i < continuous.length; i++){
				conj += "<tr><td><b>" + continuous[i].replace("Continuous", "") + "</b></td><td>" + root_verb[continuous[i]] + "</td></tr>";
			}
			conj += "</table>";
			$("#conjugations").html(conj);
    });
});
