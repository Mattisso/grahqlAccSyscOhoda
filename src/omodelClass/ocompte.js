let mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  const {auditbaseSchema,_toobject,extendSchema} =require('../omodels/odabaseSchema').toinit();
  const {auditEntityOnPlugin}=require('../omodels/auditDateSchema').toinit();
  require('../config/ohadb').connectserver();

const ocompteCschema = extendSchema(auditbaseSchema,({ CompteNumber: String,auditfield :String,
    }),_toobject);

class OcompteClass   {
   constructor(CompteNumber){
    // super(auditfield,auditfield,auditfield,auditfield)
    this._comptenumber=CompteNumber;
   }
 
   get comptenumber() {
       return this._comptenumber;
   }

   set comptenumber(CompteNumber) {
     this._comptenumber=CompteNumber;
     return this;
}
}
ocompteCschema.loadClass(OcompteClass);
ocompteCschema.plugin(auditEntityOnPlugin);
let  OcompteC = mongoose.model('OcompteC', ocompteCschema);

// OcompteC.create({ CompteNumber: '28'});
 
  OcompteC.find({},function(err, data){
    if(err) throw err;
    console.log(data);
});   