# coding=utf-8
import json


file = open("tools/word_definitions.txt", "r")
d = {} 
for line in file:
  d[line.replace("\n", "").split(" - ")[0]] = line.replace("\n", "").split(" - ")[1]

print(d)

# JSON file start 
with open('result.json', 'w') as fp:
  json.dump(d, fp, ensure_ascii=False)


