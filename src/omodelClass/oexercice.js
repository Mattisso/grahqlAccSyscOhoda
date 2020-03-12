const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin} = require('../omodels/helpers/odabaseSchema').toinit();
require('../config/ohadb').connectserver();
const oexercice= (function(){
  const modelObject={
    oExerciceEncour:{type: String },
    ExercicePrev: { type: String },
    OexercComptaKey: {type: ObjectId, ref: 'oExercCompta' },
      OexercComptaPrevKey: { type: ObjectId, ref: 'oExercCompta'  },
      OexercComptaEncourKey: { type: ObjectId,  ref: 'oExercCompta'  }}

  const auditBaseSchema = new Schema(getauditentity,gettoObject);
  const oexerciceschema = extendSchema(auditBaseSchema, modelObject);
  class oExercicelass {
    constructor(oExerciceEncour,ExercicePrev,OexercComptaKey,OexercComptaPrevKey,OexercComptaEncourKey) {
      // super(auditfield,auditfield,auditfield,auditfield)
      this._oexerciceEncour = oExerciceEncour
      this._exercicePrev = ExercicePrev,
      this._oexerccomptaKey = OexercComptaKey,
      this._oexercComptaPrevKey = OexercComptaPrevKey,
      this._oexercComptaEncourKey = OexercComptaEncourKey
    }
    get oexerciceEncour() {
      return this._oexerciceEncour;
    }
  
    set oexerciceEncour(oExerciceEncour) {
      this._oexerciceEncour = oExerciceEncour;
      return this;
    }
    get oexerccomptakey() {
      return this._oexerccomptaKey;
    }  
    set oexerccomptakey(OexercComptaKey) {
      this._oexerccomptaKey = OexercComptaKey;
      return this;
    }
  }
  oexerciceschema.loadClass(oExercicelass);
  oexerciceschema.plugin(auditEntityPlugin);
  oexerciceschema.set('toObject', {
    getters: true
  });
  oexerciceschema.set('toJSON', {
    getters: true
  });
  oexerciceschema.index({
    oExerciceEncour: 1
  });
  let oExercice = mongoose.model('oExercice', oexerciceschema);
  function toinit() {
    return {
      oExercice: oExercice    
    };
    }
   return {
    toinit: toinit
    };   
})();
  module.exports = {
    toinit: oexercice.toinit
    };
const obj = {
  oExerciceEncour: '2000'
}
// oexercice.toinit().oExercice.create(obj);
// const obj={ oExerciceEncour: '86'}
/*   var small = new oExercice(obj);
small.save(function (err) {
if (err) return handleError(err);
// saved!
}); */
oexercice.toinit().oExercice.find({}, function (err, data) {
  if (err)
    throw err;
  console.log(data);
});
 