    
"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;
const {toCompteBalanceDetail} = require('../features/nttcomptebalancedetail/staticNttcomptebalanceDetail').toinit();
const {assign} = require('lodash');
const {auditObj}=require('./odaAudit').toinit();
//const {getodaAggreateData}=require('../SharedKernel/odaStats').toinit();

const nttcomptebalance = (function () {
  const _nttcomptebalance=  {    
      OexercComptaKey:
      {
          type: ObjectId,
          ref: 'oExercCompta',
      },
      OtableauposteKey:
      {
          type: ObjectId,
          ref: 'oTableauPoste',
      },
      OreferenceKey:
      {
          type: ObjectId,
          ref: 'oReference'
      },
     totalSoldeDebit: {
        type: Number, default:0},
  
      totalSoldeCredit: {
        type: Number, default:0},
   // AmortProvAmnt: Number,
      //provamnt:Number,
      amntNet: Number,
    }
    function createOdaObj() {
      return assign({},_nttcomptebalance,auditObj);
    }
  
  let  nttCompteBalanceSchema = new Schema(
  createOdaObj()
);

nttCompteBalanceSchema.set('toObject', { getters: true });
nttCompteBalanceSchema.set('toJSON', { getters: true });

nttCompteBalanceSchema.index(
	{
	OexercComptaKey: 1,
	OtableauposteKey:1,
	OreferenceKey: 1
	}
);

let  nttcomptebalancedetails=[];

nttCompteBalanceSchema.method('addBalanceDetail', function (obj) {
const requestparamid= this.id;
nttcomptebalancedetails.push(toCompteBalanceDetail(requestparamid,obj)
  );
  //const odasum =getodaAggreateData(nttcomptebalancedetails);
 /*  console.log(odasum);
  return odasum; */
  // return this.model('Animal').find({ type: this.type }, cb);
});



nttCompteBalanceSchema.method('hasitem', function (obj) {
  return this.nttcomptebalancedetails.indexOf(obj) !== -1;
});

nttCompteBalanceSchema.method('removeItem', function (obj) {
  var itemIndex = nttcomptebalancedetails.indexOf(obj);
  if (itemIndex !== -1) {
      nttcomptebalancedetails.splice(itemIndex, 1);
  }
});

nttCompteBalanceSchema.method('addcomptebalancedetail', function () {
  nttcomptebalancedetails.push({
    "nttcomptebalanceKey" : this.id,
    "NumCompte":  "",
    "IntitulCompte": "",
    "SoldeDebit": "",
    "SoldeCredit":""
  });
  // this.nttcomptebalancedetails.slice();
});

nttCompteBalanceSchema.virtual('comptebalancedetails')
  .set(function (comptebalancedetails) {
      this._comptebalancedetails = comptebalancedetails;
  })
  .get(function () {
      return this._comptebalancedetails;
  });

  nttCompteBalanceSchema.method('getData', function () {
    //const odasum =getodaAggreateData(nttcomptebalancedetails);
    return {
      'id': this.id,
      'OexercCompta': this.OexercComptaKey,
      'Otableauposte': this.OtableauposteKey,
      'Oreference': this.OreferenceKey,
      'totalSoldeDebit': this.totalSoldeDebit, //odasum.totalSoldeDebit?odasum.totalSoldeDebit:0,
      'totalSoldeCredit': this.totalSoldeCredit, //odasum.totalSoldeCredit?odasum.totalSoldeCredit:0,
      'DetailCount': nttcomptebalancedetails.length?nttcomptebalancedetails.length:0,      
      'nttcomptebalancedetails': nttcomptebalancedetails.slice()
    };
  });

  nttCompteBalanceSchema.virtual('nttcomptebalancedetails', {
    ref: 'nttCompteBalanceDetail', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'nttcomptebalanceKey', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false
  });

nttCompteBalanceSchema.virtual('comptebalancedetail')
  .set(function (comptebalancedetail) {
    this._comptebalancedetail = comptebalancedetail;
  })
  .get(function () {
    return this._comptebalancedetail;
  });
 
nttCompteBalanceSchema.pre('save',
    function (next) {
        // get the current date
        var currentDate = new Date();

        if (!this.CreatedOn)
            this.CreatedOn = currentDate;
        if (!this.ModifiedOn)
            this.ModifiedOn = currentDate;
        if (!this.CreatedBy)
            this.CreatedBy = 'Admin';
        if (!this.ModifiedBy)
            this.ModifiedBy = 'Admin';
        next();
    } 
);

let nttCompteBalance = mongoose.model('nttCompteBalance', nttCompteBalanceSchema);

  function toinit() {
    return {
      nttCompteBalance:nttCompteBalance
    };
  }

return {
  toinit: toinit
};

}
)();
module.exports= {
toinit:nttcomptebalance.toinit
};


