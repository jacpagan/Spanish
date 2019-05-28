$(document).ready(function(){
    var listItems = '<option selected="selected" value="0">- ROOTS -</option>';
    for (var i = 0; i < Object.keys(verbs).length; i++) {
        listItems += "<option>" + Object.keys(verbs)[i] + "</option>";
    }
    $("#roots").html(listItems);
		$("#roots").change(function(){
			var $verb = $(this);
			$("#translation").html("<h1><span>"+definitions[$verb.val()]+"</span></h1>");
			var indicative = [];
			var subjunctive = []; 
			var imperative = []; 
			var perfect = []; 
			var continuous = [];
			var root_verb = verbs[$verb.val()];
			var verb_tenses = Object.keys(root_verb);
			for (var i = 0; i < verb_tenses.length; i++){
				if (verb_tenses[i].endsWith("Indicative")){
					indicative.push(verb_tenses[i]);
					for (var j in root_verb[verb_tenses[i]]){
						var verb_conjugation = root_verb[verb_tenses[i]][j];
					}
				}
				if (verb_tenses[i].endsWith("Subjunctive") || verb_tenses[i].endsWith("Subjunctive2")){
					subjunctive.push(verb_tenses[i]);
				}
				if (verb_tenses[i].endsWith("Imperative") || verb_tenses[i] == ("imperative")){
					imperative.push(verb_tenses[i]);
				}
				if (verb_tenses[i].endsWith("Perfect")){
					perfect.push(verb_tenses[i]);
				}
				if (verb_tenses[i].endsWith("Continuous")){
					continuous.push(verb_tenses[i]);
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
