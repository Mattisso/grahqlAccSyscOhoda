const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const { getauditentity,gettoObject, extendSchema, auditEntityPlugin} = require('../omodels/helpers/odabaseSchema').toinit();
const oexerccompta = (function () {
  const modelObject = {
    oExercComptaId: {
      type: String,
      required: true,
      unique: true
    }
  }
  const auditBaseSchema = new Schema(getauditentity, gettoObject);
  const oexerccomptaschema = extendSchema(auditBaseSchema, modelObject);
  class oExercComptalass {
    constructor(oExercComptaId) {
      // super(auditfield,auditfield,auditfield,auditfield)
      this._oexerccomptaId = oExercComptaId;
    }
    get comptenumber() {
      return this._oexerccomptaId;
    }

    set comptenumber(oExercComptaId) {
      this._oexerccomptaId = oExercComptaId;
      return this;
    }
  }
  oexerccomptaschema.loadClass(oExercComptalass);
  oexerccomptaschema.plugin(auditEntityPlugin);
  oexerccomptaschema.set('toObject', {
    getters: true
  });
  oexerccomptaschema.set('toJSON', {
    getters: true
  });
  oexerccomptaschema.index({
    oExercComptaId: 1
  });
  let oExercCompta = mongoose.model('oExercCompta', oexerccomptaschema);
  function toinit() {
    return {
      oExercCompta: oExercCompta
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: oexerccompta.toinit
};
require('../config/ohadb').connectserver();

const obj = {
  oExercComptaId: '2006'
}
// oexerccompta.toinit().oExercCompta.create(obj);
// const obj={ oExercComptaId: '86'}
let small = new oexerccompta.toinit().oExercCompta(obj);
small.save(function (err) {
  if (err)
    return handleError(err);
  // saved!
});
/* oexerccompta.toinit().oExercCompta.find({}, function (err, data) {
  if (err)
    throw err;
  console.log(data);
}); */
