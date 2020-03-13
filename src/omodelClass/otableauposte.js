"use strict";
const _  =  require('lodash');
const mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = mongoose.SchemaTypes.ObjectId;
const {
	getauditentity,
	gettoObject,
	extendSchema,
	auditEntityPlugin
} = require('../omodels/helpers/odabaseSchema').toinit();

const otableauposte =  (function ()  {

	const modelObject = {
		TableauName: {
			type: String
		},
		tableauLongName: {
			type: String
		},
		ostableaupostes: [{
				OstableauposteKey: {
					type: ObjectId,
					ref: 'oStableauPoste'
				}

			}
		]

	};
	const auditBaseSchema = new Schema(getauditentity, gettoObject);
	const otableauPosteSchema = extendSchema(auditBaseSchema, modelObject);
	class otableauposteClass {
		constructor(TableauName, tableauLongName) {
			this._TableauName = TableauName;
			this._tableauLongName = tableauLongName;
		}
		get tableauname() {
			return this._TableauName;
		}

		set tableauname(TableauName) {
			this._TableauName = TableauName;
			return this;
		}
		get tableaulongname() {
			return this._AreaLongName;
		}

		set tableaulongname(tableauLongName) {
			this._tableauLongName = tableauLongName;
			return this;
		}
	}

	otableauPosteSchema.set('toObject', {
		getters: true
	});
	otableauPosteSchema.set('toJSON', {
		getters: true
	});

	otableauPosteSchema.loadClass(otableauposteClass);
	otableauPosteSchema.plugin(auditEntityPlugin);

	otableauPosteSchema.virtual('ostableauposte').set(function (ostableauposte) {
		this.OstableauposteKey = ostableauposte;
	}).get(function () {
		return this.OstableauposteKey;
	});
	let oTableauPoste = mongoose.model('oTableauPoste', otableauPosteSchema);
	  function toinit()  {
		    return  {
			oTableauPoste: oTableauPoste
			    
		};
		  
	}
	return  {
		  toinit:  toinit
	};

})();
module.exports =   {
	toinit: otableauposte.toinit
};
