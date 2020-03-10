let mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  const {auditbaseSchema,gettoObject,extendSchema} =require('../omodels/odabaseSchema').toinit();
  const {auditEntityOnPlugin, CreatedOnPlugin}=require('../omodels/auditDateSchema').toinit();
  require('../config/ohadb').connectserver();

const ocompteCschema = extendSchema(auditbaseSchema,{ CompteNumber: String });

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
ocompteCschema.plugin(CreatedOnPlugin);
let  OcompteC = mongoose.model('OcompteC', ocompteCschema);
const obj={ CompteNumber: '999'}
// OcompteC.create({ CompteNumber: '28'});
// const obj={ CompteNumber: '86'}
  var small = new OcompteC(obj);
small.save(function (err) {
  if (err) return handleError(err);
  // saved!
}); 
/*   OcompteC.find({},function(err, data){
    if(err) throw err;
    console.log(data);
});    */