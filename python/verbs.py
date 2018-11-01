# coding=utf-8
from urllib.request import urlopen
from bs4 import BeautifulSoup
import json
import pprint
from unidecode import unidecode

def make_verbs(verbs):
    for verb in verbs:
        url = "http://www.spanishdict.com/verbos/{}".format(unidecode(verb))
        html = urlopen(url)
        soup = BeautifulSoup(html, "html.parser")
        tenses = set()
        print(url) 
        for link in soup.find_all('a'): 
            if (link.get("data-tense")):
                tenses.add(link.get("data-tense"))

        t_dict = {}
        for tense in tenses:
            t_list = []
            for sibling in soup.findAll( "a",{"data-tense":"{}".format(tense)}):
                t_list.append(sibling.text)
            t_dict[tense] = t_list

        v_dict = {}
        v_dict[verb] = t_dict
    return v_dict

verbs=["acabar", "andar", "aprender", "caer", "caerse", "cantar", "comenzar", "comer", "comprar", "conducir", "conocer", "construir", "contar", "creer", "dar", "deber", "decir", "dormir", "entrar", "escribir", "estar", "estudiar", "gustar", "haber", "hablar", "hacer", "ir", "irse","jugar", "leer", "llamar", "llamarse", "llevar", "mirar", "mirarse", "oír", "pagar", "pensar", "perder", "poder", "poner", "ponerse", "quedarse", "querer", "saber", "salir", "sentir", "sentirse", "ser", "tener", "tomar", "traer", "venir", "ver", "vivir", "volver"]

with open('verbs.json', 'w') as outfile:
    json.dump((json.dumps(make_verbs(verbs), sort_keys=True, ensure_ascii=False)), outfile, sort_keys=True, ensure_ascii=False)

