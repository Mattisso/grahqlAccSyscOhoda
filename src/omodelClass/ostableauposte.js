const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;
const { getauditentity, gettoObject, extendSchema, auditEntityPlugin} = require('../omodels/helpers/odabaseSchema').toinit();

"use strict";
const _ = require('lodash');
const ostableauposte= (function () {

	const  modelObject = {
		StableauName:
		{
			type: String,
			unique: true
		},
		StbleauLongName:
		{
			type: String
	
		},
		OtableauposteKey:
		{
			type: ObjectId,
			ref: 'oTableauPoste'
		}
		,
		ostblareas: [{
			OstblareaKey: {
				type: ObjectId,
				ref: 'oStblArea'
			}
		}
	
		]
	
	}
	const auditBaseSchema = new Schema(getauditentity, gettoObject);
	const oStableauPosteSchema = extendSchema(auditBaseSchema, modelObject);
	class ostableauposteClass {
		constructor(StableauName, StbleauLongName) {
			this._stableauName = StableauName;
			this._stbleauLongName = StbleauLongName;
		}
		get tableauname() {
			return this._stableauName;
		}
	
		set tableauname(StableauName) {
			this._stableauName = StableauName;
			return this;
		}
		get tableaulongname() {
			return this._AreaLongName;
		}
	
		set tableaulongname(StbleauLongName) {
			this._stbleauLongName = StbleauLongName;
			return this;
		}
	}
	
	
	oStableauPosteSchema.index({ StableauName: 1 });
	oStableauPosteSchema.loadClass(ostableauposteClass);
	oStableauPosteSchema.plugin(auditEntityPlugin);
	
	oStableauPosteSchema.virtual('ostblarea').set(function (ostblarea) {
		this.OstblareaKey = ostblarea;
	}).get(function () {
		return this.OstblareaKey;
	});
	
	let StableauPoste = mongoose.model('oStableauPoste', oStableauPosteSchema);

  function toinit() {
    return {
	StableauPoste:StableauPoste
    };
  }
return {
  toinit: toinit
};


}
)();
module.exports= {
toinit:ostableauposte.toinit
};


/*
	oStableauPosteSchema.virtual('subostblareas', {
		ref: 'oStblArea', // The model to use
		localField: '_id', // Find people where `localField`
		foreignField: 'OstableauposteKey', // is equal to `foreignField`
		// If `justOne` is true, 'members' will be a single doc as opposed to
		// an array. `justOne` is false by default.
		justOne: false
	  });*/




var oStableauPoste = mongoose.model('oStableauPoste', oStableauPosteSchema);
module.exports = oStableauPoste;