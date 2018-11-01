# coding=utf-8
from urllib.request import urlopen
from bs4 import BeautifulSoup
import json
import pprint
from unidecode import unidecode
import argparse

verbs=["acabar", "andar", "aprender"] #"caer", "caerse", "cantar", "comenzar", "comer", "comprar", "conducir", "conocer", "construir", "contar", "creer", "dar", "deber", "decir", "dormir", "entrar", "escribir", "estar", "estudiar", "gustar", "haber", "hablar", "hacer", "ir", "irse","jugar", "leer", "llamar", "llamarse", "llevar", "mirar", "mirarse", "oír", "pagar", "pensar", "perder", "poder", "poner", "ponerse", "quedarse", "querer", "saber", "salir", "sentir", "sentirse", "ser", "tener", "tomar", "traer", "venir", "ver", "vivir", "volver"]

# 'dañar',
v_dict = {}

# Iterate through the verbs
for verb in verbs:
    url = "http://www.spanishdict.com/verbos/{}".format(unidecode(verb))
    print(url)
    html = urlopen(url)
    bsObj = BeautifulSoup(html, "html.parser")


    #grab all the verb tenses on the page
    tenses = set()
    for sibling in bsObj.findAll( "div",{"class":"vtable-word-text"}):
        tenses.add(sibling.attrs['data-tense'])

    t_dict = {}
    for tense in tenses:
        t_list = []
        for sibling in bsObj.findAll( "div",{"data-tense":"{}".format(tense)}):
            t_list.append(sibling.text)
        t_dict[tense] = t_list

    v_dict[verb] = t_dict


with open('verbs.json', 'w') as outfile:
    json.dump((json.dumps(v_dict, sort_keys=True, ensure_ascii=False)), outfile, sort_keys=True, ensure_ascii=False)
