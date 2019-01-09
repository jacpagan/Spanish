$(document).ready(function(){
		var listItems = '<option selected="selected" value="0">- Select -</option>';
    for (var i = 0; i < Object.keys(verbs).length; i++) {
        	listItems += "<option>" + Object.keys(verbs)[i] + "</option>";
    }
    $("#verbs").html(listItems);

		$("#verbs").change(function(){
			var $verb = $(this);
			$("#translation").html(definitions[$verb.val()]);

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
			conj += '<h1> INDICATIVE </h1>';
			for (var i = 0; i < indicative.length; i++){
				conj += "<li><b>" + indicative[i].replace("Indicative", "") + "</b> : " + verbs[$verb.val()][indicative[i]] + "</li>";
			}
			conj += '<h1> SUBJUNCTIVE </h1>';
			for (var i = 0; i < subjunctive.length; i++){
				conj += "<li><b>" + subjunctive[i].replace("Subjunctive", "") + "</b> : " + verbs[$verb.val()][subjunctive[i]] + "</li>";
			}
			conj += '<h1> IMPERATIVE </h1>';
			for (var i = 0; i < imperative.length; i++){
				conj += "<li><b>" + imperative[i].replace("imperative", "affirmative").replace("Imperative", "") + "</b> : " + verbs[$verb.val()][imperative[i]] + "</li>";
			}
			conj += '<h1> PERFECT </h1>';
			for (var i = 0; i < perfect.length; i++){
				conj += "<li><b>" + perfect[i].replace("Perfect", "") + "</b> : " + verbs[$verb.val()][perfect[i]] + "</li>";
			}
			conj += '<h1> CONTINUOUS </h1>';
			for (var i = 0; i < continuous.length; i++){
				conj += "<li><b>" + continuous[i].replace("Continuous", "") + "</b> : " + verbs[$verb.val()][continuous[i]] + "</li>";
			}
			$("#conjugations").html(conj);


    });
});
