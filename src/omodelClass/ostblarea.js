"use strict";
const _ = require('lodash');
const mongoose = require('mongoose'),
Schema = mongoose.Schema,
 ObjectId = mongoose.SchemaTypes.ObjectId;
const {getauditentity, gettoObject ,extendSchema, auditEntityPlugin} = require('../omodels/helpers/odabaseSchema').toinit();


const ostblarea= (function () {
	
const modelObject ={
	AreaShortName:
	{
		type: String,
		required: true,
		unique: true
	},
	AreaLongName:
	{
		type: String
	},
ocomptes: [{
	_ocompte: {
		type: ObjectId,
		ref: 'oCompte',
		alias: ''
	}	}
]
}
 
	const auditBaseSchema = new Schema(getauditentity,gettoObject);
	const oStblAreaSchema = extendSchema(auditBaseSchema, modelObject);

	class ostblareaClass {
		constructor(AreaShortName, AreaLongName) {
		  this._AreaShortName = AreaShortName;
		  this._AreaLongName = AreaLongName;
		}
	  
		get areashortname() {
			return this._AreaShortName;
		  }
		
		  set areashortname(AreaShortName) {
			this._AreaShortName = AreaShortName;
			return this;
		  }
		  get arealongname() {
			return this._AreaLongName;
		  }
		
		  set arealongname(AreaLongName) {
			this._AreaLongName = AreaLongName;
			return this;
		  }		
	  }

	oStblAreaSchema.loadClass(ostblareaClass);
	oStblAreaSchema.plugin(auditEntityPlugin);
	oStblAreaSchema.set('toObject', { getters: true });
	oStblAreaSchema.set('toJSON', { getters: true });		
	oStblAreaSchema.index({AreaShortName:1});
	
	oStblAreaSchema.virtual('suboreferences', {
		ref: 'oReference', // The model to use
		localField: 'oreferences', // Find people where `localField`
		foreignField: '_id', // is equal to `foreignField`
		// If `justOne` is true, 'members' will be a single doc as opposed to
		// an array. `justOne` is false by default.
		justOne: false
	  });
	
	 oStblAreaSchema.virtual('ocompte')
	  .set(function(ocompte){
		this._ocompte= ocompte;
	  })
	  .get(function() {
		return this._ocompte;
	  });
	
	let oStblArea = mongoose.model('oStblArea', oStblAreaSchema);
  function toinit() {
    return {
	oStblArea:oStblArea
    };
  }
return {
  toinit: toinit
};
}
)();
module.exports= {
toinit:ostblarea.toinit}; 

require('../config/ohadb').connectserver();
const obj = {
	"AreaShortName": "AmortImmo",
	"AreaLongName": "AmortImmo",
	"ocomptes": [{
		"CompteNumber": "282"
	}]
};

// ocompte.toinit().Ocompte.create(obj);
// const obj={ CompteNumber: '86'}
/*   var small = new Ocompte(obj);
small.save(function (err) {
if (err) return handleError(err);
// saved!
}); */
ostblarea.toinit().oStblArea.find({}, function (err, data) {
	if (err)
	  throw err;
	console.log(data);
  });
   