const oreferencedata = require('./data/oreferencedata');
const odaiterator=require('../sharedkernel/odaiterator').toinit().myiterator;

/* let  reverse = boolean = false;
let myiterator = function () {
    let location = 0,
    length = oreferencedata.length;
    if (reverse) {
        this.location = length- 1;
      }
    }
function rewind() {
   this.location= this.reverse? oreferencedata.length-1:0;
   return this.location;
}
function key() {
return this.location;
}
function current() {
    return oreferencedata.length[this.location];
}
    
         function next() {
const item=oreferencedata.length[this.location];
location+=this.reverse?-1:1;
            return item;
        };

        function hasNext () {
            if(this.reverse){
                return this.reverse<0;
            }
            return this.location>=oreferencedata.length;
          /*   if (location < oreferencedata.length && oreferencedata[location] != null) {
                return true;
            } else {
                return false;
            } */
       // }// */
    


 //while(odaiterator(oreferencedata).hasNext()===true) {
   // console.log(odaiterator(oreferencedata).current());
    //console.log(odaiterator(oreferencedata).next());
   // console.log(odaiterator(oreferencedata).rewind());
//console.log(odaiterator(oreferencedata).current());
//}  
//console.log(odaiterator(oreferencedata).next());
//console.log(odaiterator(oreferencedata).rewind())
//console.log(odaiterator(oreferencedata).current());

//console.log(next());
//console.log(hasNext());
/* odaiterator.myiterator(oreferencedata).rewind();*/
// console.log(odaiterator.myiterator(oreferencedata).current()); 

//console.log(odaiterator.reverseArrayIterator(oreferencedata).next().value);
//console.log(oreferencedata.length);
const obj={
    "NumCompte": "102010",
    "IntitulCompte": "Dotation BENIN",
    "SoldeCredit": 44829579
}
const obj1={
    "NumCompte1": "102020",
    "IntitulCompte1": "Dotation BURKINA",
    "SoldeCredit1": 65643312
}
console.log(Object.assign({},obj,obj1));