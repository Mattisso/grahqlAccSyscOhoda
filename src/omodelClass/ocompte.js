const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin} = require('../omodels/helpers/odabaseSchema').toinit();
require('../config/ohadb').connectserver();
const ocompte= (function(){
  const auditBaseSchema = new Schema(getauditentity,gettoObject);
  const ocompteschema = extendSchema(auditBaseSchema, {CompteNumber: String});
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
  ocompteschema.loadClass(Ocomptelass);
  ocompteschema.plugin(auditEntityPlugin);
  ocompteschema.set('toObject', {
    getters: true
  });
  ocompteschema.set('toJSON', {
    getters: true
  });
  ocompteschema.index({
    CompteNumber: 1
  });
  let Ocompte = mongoose.model('Ocompte', ocompteschema);
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
 