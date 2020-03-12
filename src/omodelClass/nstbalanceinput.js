const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin, getbaseBalancesheet} = require('../omodels/helpers/odabaseSchema').toinit();
const {replaceString}= require('../omodels/helpers/helpers').toinit();
 require('../config/ohadb').connectserver();

const nstbalanceinput= (function(){
  const balanceSheetBaseSchema = new Schema(Object.assign({},getbaseBalancesheet,getauditentity),gettoObject);
  const nstBalanceInputSchema = extendSchema(balanceSheetBaseSchema, {});
  class nstbalanceinputClass {
    constructor() { }
  }

  nstBalanceInputSchema.loadClass(nstbalanceinputClass);
  nstBalanceInputSchema.plugin(auditEntityPlugin);
  nstBalanceInputSchema.set('toObject', {
    getters: true
  });
  nstBalanceInputSchema.set('toJSON', {
    getters: true
  });
  nstBalanceInputSchema.index({
    CompteNumber: 1
  });
  nstBalanceInputSchema.virtual('CompteNumber')
.get(function () {
	return  replaceString(this.NumCompte);
}
).set(function (v) {

  this._comptenumber =replaceString(v);
}
	);
  const nstBalanceInput = mongoose.model('nstBalanceInput', nstBalanceInputSchema);
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
const obj ={
  "NumCompte": "431200",
  "IntitulCompte": "Dotation CENTRAFRIQUE",
  "SoldeCredit": 41326938
}
/*   nstbalanceinput.toinit().nstBalanceInput.create(obj); */ 
// const obj={ CompteNumber: '86'}
/*   var small = new nstbalanceinputC(obj);
small.save(function (err) {
if (err) return handleError(err);
// saved!
}); */
 nstbalanceinput.toinit().nstBalanceInput.find({}, function (err, data) {
  if (err)
    throw err;
  console.log(data);
});
  