const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin, getbaseBalancesheet} = require('../omodels/helpers/odabaseSchema').toinit();
const {replaceString}= require('../omodels/helpers/helpers').toinit();
 require('../config/ohadb').connectserver();
 function leftstrcomptenumber() {
  return replaceString(this._comptenumber);
 }
const nstbalanceinput= (function(){
  const balanceSheetBaseSchema = new Schema(Object.assign({},getbaseBalancesheet,getauditentity),gettoObject);
  const nstBalanceInputSchema = extendSchema(balanceSheetBaseSchema, {CompteNumber: String});
  class nstbalanceinputClass {
    constructor(CompteNumber) {
      // super(auditfield,auditfield,auditfield,auditfield)
      this._comptenumber = CompteNumber;
    }
    get leftstrcomptenumber() {
      return replaceString(this._comptenumber);
    } 
     leftstrcomptenumber()  {
      return replaceString(this.NumCompte);
    }
    set leftstrcomptenumber(CompteNumber) {
      this._comptenumber = CompteNumber;
      return replaceString(this._comptenumber);
    }  

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
  "NumCompte": "102020",
  "IntitulCompte": "Dotation BENIN",
  "SoldeCredit": 44829579
}
 nstbalanceinput.toinit().nstBalanceInput.create(obj);
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
  