# coding=utf-8
from urllib.request import urlopen
from bs4 import BeautifulSoup
import json
import pprint
from unidecode import unidecode
import argparse

#verbs=["acabar", "andar", "aprender", "caer", "caerse", "cantar", "comenzar", "comer", "comprar", "conducir", "conocer", "construir", "contar", "creer", "dar", "deber", "decir", "dormir", "entrar", "escribir", "estar", "estudiar", "gustar", "haber", "hablar", "hacer", "ir", "irse","jugar", "leer", "llamar", "llamarse", "llevar", "mirar", "mirarse", "oír", "pagar", "pensar", "perder", "poder", "poner", "ponerse", "quedarse", "querer", "saber", "salir", "sentir", "sentirse", "ser", "tener", "tomar", "traer", "venir", "ver", "vivir", "volver"]
verbs = ['abatir', 'abrasar' , 'abrazar', 'abrir', 'absolver', 'abstenerse', 'aburrir', 'aburrirse', 'acabar', 'acelerar', 'aceptar', 'acercar', 'acercarse', 'acertar', 'aclamar', 'aclarar', 'acompañar', 'aconsejar', 'acordar', 'acordarse', 'acostarse', 'acostumbrar', 'acuchillar', 'acudir', 'acusar', 'adelantar', 'adelantarse', 'adivinar', 'admirar', 'admitir', 'adoptar', 'adorar', 'adquirir', 'advertir', 'afeitarse', 'agarrar', 'agitar', 'agotar', 'agradar', 'agradecer', 'agrandar', 'agravar', 'agregar', 'agrupar', 'aguardar', 'ahorrar', 'alcanzar', 'alegrarse', 'almorzar', 'alquilar', 'alumbrar', 'alumbrarse', 'alzar', 'amar', 'andar', 'anunciar', 'apagar', 'aparecer', 'aplaudir', 'apoderarse', 'apreciar', 'aprender', 'apresurarse', 'aprobar', 'aprovecharse', 'apurarse', 'arrancar', 'arreglar', 'arrojar', 'articular', 'asegurar', 'asir', 'asistir', 'asustarse', 'atacar', 'atenerse', 'atraer', 'atravesar', 'atreverse', 'avanzar', 'averiguar', 'ayudar', 'añadir', 'bailar', 'bajar', 'balbucear', 'barrer', 'bastar', 'bautizar', 'bañarse', 'beber', 'bendecir', 'borrar', 'bostezar', 'botar', 'broncear', 'bullir', 'burlarse', 'buscar', 'caber', 'caer', 'caerse', 'calentar', 'callarse', 'calzar', 'cambiar', 'caminar', 'cansarse', 'cantar', 'caracterizar', 'cargar', 'casarse', 'celebrar', 'cenar', 'cepillar', 'cerrar', 'certificar', 'charlar', 'chistar', 'chupar', 'cocinar', 'coger', 'colegir', 'colgar', 'colocar', 'comenzar', 'comer', 'componer', 'comprar', 'comprender', 'conducir', 'confesar', 'conocer', 'conseguir', 'constituir', 'construir', 'contar', 'contener', 'contestar', 'continuar', 'contribuir', 'convencer', 'convenir', 'convertir', 'convocar', 'corregir', 'correr', 'cortar', 'costar', 'crecer', 'creer', 'criar', 'cruzar', 'cubrir', 'cuidarse', 'cumplir', 'dar', 'deber', 'decidir', 'decir', 'declarar', 'dedicarse', 'defender', 'dejar', 'delinquir', 'demostrar', 'denunciar', 'depender', 'derribar', 'desayunarse', 'descansar', 'describir', 'descubrir', 'desear', 'desempeñar', 'deshacer', 'despedirse', 'despegar', 'desperezarse', 'despertarse', 'destruir', 'desvestirse', 'detener', 'detenerse', 'devolver', 'dibujar', 'dirigir', 'disculparse', 'discutir', 'dispensar', 'distinguir', 'divertirse', 'divorciarse', 'doler', 'dormir', 'ducharse', 'dudar', 'echar', 'ejecutar', 'ejercer', 'elegir', 'embeber', 'empezar', 'emplear', 'encender', 'encerrar', 'encontrar', 'enfadarse', 'enfermarse', 'enojarse', 'enseñar', 'entender', 'entrar', 'entregar', 'enunciar', 'enviar', 'envolver', 'equivocarse', 'erguir', 'errar', 'escoger', 'escribir', 'escuchar', 'esparcir', 'esperar', 'esquiar', 'establecer', 'estar', 'estimar', 'estudiar', 'exigir', 'explicar', 'expresar', 'fabricar', 'faltar', 'felicitar', 'festejar', 'fiar', 'fijarse', 'fingir', 'firmar', 'formar', 'fregar', 'freír', 'fumar', 'funcionar', 'ganar', 'gastar', 'gemir', 'gobernar', 'gozar', 'gritar', 'gruñir', 'guiar', 'gustar', 'haber', 'habitar', 'hablar', 'hacer', 'hallar', 'helar', 'heredar', 'herir', 'huir', 'ignorar', 'impedir', 'importar', 'imprimir', 'incluir', 'indicar', 'inducir', 'influir', 'informarse', 'inscribir', 'inscribirse', 'insistir', 'interesarse', 'introducir', 'invitar', 'ir', 'irse', 'jugar', 'juntar', 'jurar', 'juzgar', 'lanzar', 'lastimarse', 'lavar', 'lavarse', 'leer', 'levantar', 'levantarse', 'limpiar', 'limpiarse', 'llamar', 'llamarse', 'llegar', 'llenar', 'llevar', 'llorar', 'llover', 'luchar', 'maldecir', 'manejar', 'mantener', 'marcar', 'marchar', 'marcharse', 'matar', 'medir', 'mejorar', 'mencionar', 'mentir', 'merecer', 'mirar', 'mirarse', 'mojarse', 'montar', 'morder', 'morir', 'mostrar', 'mover', 'mudarse', 'nacer', 'nadar', 'navegar', 'necesitar', 'negar', 'nevar', 'obedecer', 'observar', 'obtener', 'ocultarse', 'ocupar', 'ocurrir', 'ofrecer', 'oler', 'olvidar', 'oponer', 'ordenar', 'organizar', 'osar', 'oír', 'pagar', 'parar', 'pararse', 'parecer', 'parecerse', 'partir', 'pasar', 'pasearse', 'pedir', 'pegar', 'peinarse', 'pensar', 'percibir', 'perder', 'perdonar', 'permitir', 'pertenecer', 'pintar', 'pintarse', 'pisar', 'placer', 'platicar', 'poder', 'poner', 'ponerse', 'poseer', 'practicar', 'predecir', 'predicar', 'preferir', 'preguntar', 'preocuparse', 'preparar', 'prepararse', 'presentar', 'prestar', 'principiar', 'probar', 'probarse', 'proclamar', 'producir', 'prohibir', 'pronunciar', 'proteger', 'pulir', 'quedarse', 'quejarse', 'quemar', 'querer', 'quitarse', 'raer', 'realizar', 'recibir', 'recoger', 'recomendar', 'reconocer', 'recordar', 'referir', 'regalar', 'regar', 'regresar', 'rellenar', 'remitir', 'reparar', 'repartir', 'repetir', 'resolver', 'responder', 'retirar', 'retrasar', 'reunirse', 'revocar', 'revolver', 'reír', 'reírse', 'reñir', 'robar', 'rogar', 'romper', 'saber', 'sacar', 'sacudir', 'salir', 'saltar', 'saludar', 'satisfacer', 'secar', 'secarse', 'seguir', 'sentarse', 'sentir', 'sentirse', 'separar', 'ser', 'servir', 'señalar', 'socorrer', 'sofocar', 'soler', 'sollozar', 'someter', 'sonar', 'sonreír', 'soplar', 'sorprender', 'sospechar', 'sostener', 'soñar', 'subir', 'subrayar', 'subscribir', 'suceder', 'sufrir', 'sugerir', 'sumergir', 'suponer', 'suprimir', 'surgir', 'suspirar', 'tañer', 'telefonear', 'telegrafiar', 'temblar', 'temer', 'tender', 'tener', 'tentar', 'terminar', 'tirar', 'tocar', 'tomar', 'tostar', 'trabajar', 'traducir', 'traer', 'tratar', 'tropezar', 'unir', 'usar', 'utilizar', 'vaciar', 'valer', 'velar', 'vencer', 'vender', 'venir', 'ver', 'vestirse', 'viajar', 'vigilar', 'visitar', 'vivir', 'volar', 'volver', 'votar', 'yacer', 'zumbar', 'zurcir']
v_dict = {}
for verb in verbs:
    url = "http://www.spanishdict.com/verbos/{}".format(unidecode(verb))
    html = urlopen(url)
    bsObj = BeautifulSoup(html, "html.parser")
    print(url)
    divs = [tense["data-tense"] for tense in bsObj.findAll( "div",attrs={"class":"vtable-word-text"})]
    links = [tense["data-tense"] for tense in bsObj.findAll("a", attrs={"class":"vtable-word-text"})]
    tenses = divs + links

    t_dict = {}
    for tense in tenses:
        t_dict[tense] = []
        for conj in bsObj.findAll( "a",{"data-tense":"{}".format(tense)}):
                t_dict[tense].append(conj.text)
        for conj in bsObj.findAll( "div",{"data-tense":"{}".format(tense)}):
                t_dict[tense].append(conj.text)
    v_dict[verb] = t_dict


with open('verbs.json', 'w') as outfile:
    json.dump((json.dumps(v_dict, sort_keys=True, ensure_ascii=False)), outfile, sort_keys=True, ensure_ascii=False)
