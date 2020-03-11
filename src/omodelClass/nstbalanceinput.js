const mongoose = require('mongoose');
const {auditbaseSchema,  extendSchema, auditEntityPlugin} = require('../omodels/helpers/odabaseSchema').toinit();
const {replaceString}= require('../omodels/helpers/helpers').toinit();
// require('../config/ohadb').connectserver();
const nstbalanceinput= (function(){
    function leftstrcomptenumber()  {
        return replaceString(this.NumCompte);
      }
  const nstbalanceinputCschema = extendSchema(auditbaseSchema, {CompteNumber: String,set: leftstrcomptenumber});
  class nstbalanceinputClass {
    constructor(CompteNumber) {
      // super(auditfield,auditfield,auditfield,auditfield)
      this._comptenumber = CompteNumber;
    }
    get comptenumber() {
      return this._comptenumber;
    }
  
    set comptenumber(CompteNumber) {
      this._comptenumber = CompteNumber;
      return this;
    }

  }
  

  nstbalanceinputCschema.loadClass(nstbalanceinputClass);
  nstbalanceinputCschema.plugin(auditEntityPlugin);
  nstbalanceinputCschema.set('toObject', {
    getters: true
  });
  nstbalanceinputCschema.set('toJSON', {
    getters: true
  });
  nstbalanceinputCschema.index({
    CompteNumber: 1
  });
  let nstBalanceInput = mongoose.model('nstBalanceInput', nstBalanceInputSchema);
  function toinit() {
    return {
        nstBalanceInput: nstBalanceInput    
    };
    }
   return {
    toinit: toinit
    };   
})();
  module.exports = {
    toinit: nstbalanceinput.toinit
    };
const obj = {
  CompteNumber: '2000'
}
// nstbalanceinput.toinit().nstbalanceinputC.create(obj);
// const obj={ CompteNumber: '86'}
/*   var small = new nstbalanceinputC(obj);
small.save(function (err) {
if (err) return handleError(err);
// saved!
}); */
nstbalanceinput.toinit().nstbalanceinputC.find({}, function (err, data) {
  if (err)
    throw err;
  console.log(data);
});
 