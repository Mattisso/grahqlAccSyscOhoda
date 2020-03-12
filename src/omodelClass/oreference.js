const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;
const { getauditentity, gettoObject, extendSchema, auditEntityPlugin} = require('../omodels/helpers/odabaseSchema').toinit();
const {toLower,toUpper} = require('lodash');
require('../config/ohadb').connectserver();
function ocapitalize (val) {
	if (typeof val !== 'string') val = '';
	return val.charAt(0).toUpperCase() + val.substring(1);
  }
function otolowercase(v) {
  return toLower(v);
}

function otoUppercase(v) {
  return toUpper(v);
}

const oreference = (function () {
  const modelObject = {
    RefCode: {
      type: String,
      required: true,
      unique: true,
      set: otolowercase,
      get: otoUppercase
    },
    Description:
		{
			type: String,
			set: otolowercase,
			get:ocapitalize
		},
    ocomptes: [{
			_ocompte: {
				type: ObjectId,
				ref: 'oCompte'
			}
		}]
  }
  const auditBaseSchema = new Schema(getauditentity, gettoObject);
  const oReferenceSchema = extendSchema(auditBaseSchema, modelObject);
  class oreferenceClass {
    constructor(RefCode, Description) {
      this._refcode = RefCode;
      this._description = Description;
    }
    get refcode() {
      return this._refcode;
    }

    set refcode(RefCode) {
      this._refcode = RefCode;
      return this;
    }

    get description() {
      return this._description;
    }

    set refcode(Description) {
      this._description = Description;
      return this;
    }
  }

  oReferenceSchema.loadClass(oreferenceClass);
  oReferenceSchema.plugin(auditEntityPlugin);
  oReferenceSchema.set('toObject', {
    getters: true
  });
  oReferenceSchema.set('toJSON', {
    getters: true
  });
  oReferenceSchema.index({
    RefCode: 1
    //	ocomptes: 1
  });
  oReferenceSchema.virtual('fullDescription')
  .get(function () {
    return this.RefCode + ' - ' + this.Description;
  }).set(function (v) {
    this.RefCode = v.substr(0,
        v.indexOf(''));
    this.Description = v.substr(v.indexOf('') + 1);
  });
  oReferenceSchema.virtual('ocompte')
.set(function(ocompte){
	this._ocompte = ocompte;
})
.get(function() {
	return this._ocompte;
});
  let  oReference = mongoose.model('oReference', oReferenceSchema);
  function toinit() {
    return {
      oReference: oReference
    };
  }
  return {
    toinit: toinit
  };
})();
module.exports = {
  toinit: oreference.toinit
};
const obj = {
  "RefCode": "AC",
  "Description": "Primes de remboursement des obligations"
  }
/*   oreference.toinit().oReference.create(obj); */
// const obj={ CompteNumber: '86'}
/*   var small = new oreference.toinit().oReference(obj);
small.save(function (err) {
if (err) return handleError(err);
// saved!
}); */ 
oreference.toinit().oReference.find({}, function (err, data) {
  if (err)
    throw err;
  console.log(data);
});
