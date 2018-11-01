'use strict'; 
let json = require('./verbs.json'); 
let verbs = JSON.parse(json); 

class Verb { 
  constructor(verb, tense, conj){ 
    this.verb = verb; 
    this.tense = tense; 
    this.conj = conj; 
  }
  get firstSingular(){ 
    return this.conj[0]; 
  }  
  get secondSingular(){ 
    return this.conj[1]; 
  }  
  get thirdSingular(){ 
    return this.conj[2]; 
  }  
  get firstPlural(){ 
    return this.conj[3]; 
  }  
  get secondPlural(){ 
    return this.conj[4]; 
  }  
  get thirdPlural(){ 
    return this.conj[5]; 
  }  
} 
let array = [];
for (const [verb, conjugations] of Object.entries(verbs)) {
  for (const [tense, conj] of Object.entries(conjugations)){ 
    const v = new Verb(verb, tense, conj); 
    console.log("-----------");  
    console.log(v.verb + " " + v.tense);
    console.log("-----------");  
    console.log(v.firstSingular);   
    console.log(v.secondSingular); 
    console.log(v.thirdSingular); 
    console.log(v.firstPlural); 
    console.log(v.secondPlural); 
    console.log(v.thirdPlural); 

  }
}
