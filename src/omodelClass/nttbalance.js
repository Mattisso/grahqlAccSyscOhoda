const mongoose = require('mongoose'),
Schema = mongoose.Schema;
let ObjectId = mongoose.SchemaTypes.ObjectId;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin, getbaseBalancesheet} = require('../omodels/helpers/odabaseSchema').toinit();
const {getFullNameById}= require('../omodels/helpers/helpers').toinit();
 

const nstbalance= (function(){
  const modelObject={
    OexercComptaKey:{ type: ObjectId, ref: 'oExercCompta'},
    OtableauposteKey: { type: ObjectId, ref: 'oTableauPoste'},
    OreferenceKey:{ type: ObjectId, ref: 'oReference' },  
    OcompteKey: { type: ObjectId, ref: 'oCompte'}}

  const balanceSheetBaseSchema = new Schema(Object.assign({},getbaseBalancesheet,getauditentity),gettoObject);
  const nstBalanceSchema = extendSchema(balanceSheetBaseSchema, modelObject);
  class nstbalanceClass {
    constructor(OexercComptaKey,OtableauposteKey,OreferenceKey,OcompteKey) { 
      this._oexerccomptaKey=OexercComptaKey,
      this._otableauposteKey=OtableauposteKey,
      this._oreferenceKey=OreferenceKey,
      this._ocompteKey=OcompteKey
    }
    get oexerccomptakey() {
      return this._oexerccomptaKey;
    }  
    set oexerccomptakey(OexercComptaKey) {
      this._oexerccomptaKey = OexercComptaKey;
      return this;
    }
    get otableauposteKey() {
      return this._otableauposteKey;
    }  
    set otableauposteKey(OtableauposteKey) {
      this._otableauposteKey = OtableauposteKey;
      return this;
    }
    get oreferenceKey() {
      return this._oreferenceKey;
    }  
    set oreferenceKey(OreferenceKey) {
      this._oreferenceKey = OreferenceKey;
      return this;
    }
    get ocompteKey() {
      return this._ocompteKey;
    }  
    set ocompteKey(OcompteKey) {
      this._ocompteKey = OcompteKey;
      return this;
    }
  }

  nstBalanceSchema.loadClass(nstbalanceClass);
  nstBalanceSchema.plugin(auditEntityPlugin);
  nstBalanceSchema.set('toObject', {
    getters: true
  });
  nstBalanceSchema.set('toJSON', {
    getters: true
  });
  nstBalanceSchema.index(
    {
      OexercComptaKey: 1,
      OtableauposteKey: 1,
      OreferenceKey: 1,
      NumCompte: 1  
    }
  );
  
  nstBalanceSchema.methods.getoreference = function (model, cb) {
    getFullNameById(model, this.OreferenceKey, function (err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  
  nstBalanceSchema.methods.getoexercice = function (model, cb) {
    getFullNameById(model, this.OexercComptaKey, function (err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  
  nstBalanceSchema.methods.getotableauposte = function (model, cb) {
    getFullNameById(model, this.OtableauposteKey, function (err, data) {
      if (err) return cb(err);
      cb(null, data);
    });
  };
  const nstBalance = mongoose.model('nstBalance', nstBalanceSchema);
  function toinit() {
    return {
        nstBalance: nstBalance    
    };
    }
   return {
    toinit: toinit
    };   
})();
  module.exports = {
    toinit: nstbalance.toinit
    };

    require('../config/ohadb').connectserver();
const obj ={
  "OexercComptaKey": "5aee0f0023b8a2227003e7b0",
  "OtableauposteKey": "5aee0eff23b8a2227003e7ab",
  "OreferenceKey": '5aee0efe23b8a2227003e728',
  "NumCompte": "431200",
  "IntitulCompte": "Dotation CENTRAFRIQUE",
  "SoldeCredit": 41326938
}
/*   nstbalance.toinit().nstBalance.create(obj); */ 
// const obj={ CompteNumber: '86'}
let small = new  nstbalance.toinit().nstBalance(obj);
//.getFullNameById()
small.save(function (err) {
if (err) return handleError(err);
// saved!
}); 
/*  nstbalance.toinit().nstBalance.find({}, function (err, data) {
  if (err)
    throw err;
  console.log(data);
});
   */
var nttBalance = mongoose.model('nttBalance', nttBalanceSchema);
//makethisavailabletoourusersinourNodeapplications
//if (typeofmodule != "undefined" && module.exports)
	module.exports = nttBalance;
