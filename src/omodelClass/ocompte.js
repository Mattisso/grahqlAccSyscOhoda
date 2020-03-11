const mongoose = require('mongoose');
const {auditbaseSchema,  extendSchema, auditEntityPlugin} = require('../omodels/helpers/odabaseSchema').toinit();
require('../config/ohadb').connectserver();
const ocompte= (function(){
  const ocompteCschema = extendSchema(auditbaseSchema, {CompteNumber: String});
  class Ocomptelass {
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
  ocompteCschema.loadClass(Ocomptelass);
  ocompteCschema.plugin(auditEntityPlugin);
  ocompteCschema.set('toObject', {
    getters: true
  });
  ocompteCschema.set('toJSON', {
    getters: true
  });
  ocompteCschema.index({
    CompteNumber: 1
  });
  let Ocompte = mongoose.model('Ocompte', ocompteCschema);
  function toinit() {
    return {
      Ocompte: Ocompte    
    };
    }
   return {
    toinit: toinit
    };   
})();
  module.exports = {
    toinit: ocompte.toinit
    };
const obj = {
  CompteNumber: '2000'
}
// ocompte.toinit().Ocompte.create(obj);
// const obj={ CompteNumber: '86'}
/*   var small = new Ocompte(obj);
small.save(function (err) {
if (err) return handleError(err);
// saved!
}); */
ocompte.toinit().Ocompte.find({}, function (err, data) {
  if (err)
    throw err;
  console.log(data);
});
 