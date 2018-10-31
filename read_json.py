import simplejson as json 
with open('verbs.json') as f: 
    d = json.load(f) 

obj = json.loads(d)

tenses = ['presentSubjunctive', 'preteritIndicative', 'presentIndicative', 'imperfectSubjunctive2', 'futureSubjunctive', 'futureIndicative', 'conditionalIndicative', 'imperfectSubjunctive', 'imperfectIndicative', 'imperative']

verbs=["acabar", "andar", "aprender", "caer", "caerse", "cantar", "comenzar", "comer", "comprar", "conducir", "conocer", "construir", "contar", "creer", "dar", "deber", "decir", "dormir", "entrar", "escribir", "estar", "estudiar", "gustar", "haber", "hablar", "hacer", "ir", "irse", "leer", "llamar", "llamarse", "llevar", "mirar", "mirarse", "oír", "pagar", "pensar", "perder", "poder", "poner", "ponerse", "quedarse", "querer", "saber", "salir", "sentir", "sentirse", "ser", "tener", "tomar", "traer", "venir", "ver", "vivir", "volver"]

play = True
while play: 
    u_verb = input("Enter a verb: (Press Enter to quit)")
    if u_verb in verbs: 
        for tense in tenses: 
            print("{}:{}".format(tense, obj[u_verb][tense]))
    elif u_verb == "":
        play = False
