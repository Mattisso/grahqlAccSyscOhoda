"use strict";
const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const {getauditentity,gettoObject, extendSchema, auditEntityPlugin} = require('../omodels/helpers/odabaseSchema').toinit();
require('../config/ohadb').connectserver();
const olevel = (function () {
  const modelObject = {
    olevelNum: {
      type: String
    },
    olevelDescption: {
      type: String
    }
  }
  const auditBaseSchema = new Schema(getauditentity, gettoObject);
  const olevelSchema = extendSchema(auditBaseSchema, modelObject);
  class olevelClass {
    constructor(olevelNum, olevelDescption) {
      this._olevelNum = olevelNum
        this._olevelDescption = olevelDescption
    }
  }
  olevelSchema.loadClass(olevelClass);
  olevelSchema.plugin(auditEntityPlugin);
  olevelSchema.set('toObject', {
    getters: true
  });
  olevelSchema.set('toJSON', {
    getters: true
  });

  olevelSchema.index({
    olevelNum: 1
  });

  let Olevel = mongoose.model('Olevel', olevelSchema)
  function toinit() {
    return {
      Olevel: Olevel
    }
  };
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: olevel.toinit
};
const obj = {
  olevelNum: '2000'
}
// oexercice.toinit().oExercice.create(obj);
// const obj={ olevelNum: '86'}
/*   var small = new oExercice(obj);
small.save(function (err) {
if (err) return handleError(err);
// saved!
}); */
olevel.toinit().Olevel.find({}, function (err, data) {
  if (err)
    throw err;
  console.log(data);
});
