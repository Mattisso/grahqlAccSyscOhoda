const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;
const { getauditentity, gettoObject, extendSchema, auditEntityPlugin} = require('../omodels/helpers/odabaseSchema').toinit();



"use strict";
const _ = require('lodash');
const oreportdetail= (function () {

  var oReportDetailSchema = {

    OtableauposteKey:
    {
      type: ObjectId,
      ref: 'oTableauPoste'
  
    },
    OreferenceKey:
    {
      type: ObjectId,
      ref: 'oReference'
    },
    olevelKey:
    {
      type: ObjectId,
      ref: 'olevel'
    },
    SortOrder:
    {
      type: Number,
      default: 1
    }
  }
  class otableauposteClass {
		constructor(OtableauposteKey, tableauLongName) {
			this._OtableauposteKey = OtableauposteKey;
			this._tableauLongName = tableauLongName;
		}
		get OtableauposteKey() {
			return this._OtableauposteKey;
		}

		set OtableauposteKey(OtableauposteKey) {
			this._OtableauposteKey = OtableauposteKey;
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
  const auditBaseSchema = new Schema(getauditentity, gettoObject);
	const oStableauPosteSchema = extendSchema(auditBaseSchema, modelObject);
  
  oReportDetailSchema.set('toObject', { getters: true });
  oReportDetailSchema.set('toJSON', { getters: true });
  
  oReportDetailSchema.index(
    {
      OtableauposteKey: 1,
      OreferenceKey: 1,
      olevelKey: 1
    }
  );
  
  
  
  oReportDetailSchema.virtual('otableauposte')
    .set(function (otableauposte) {
      this._otableauposte = otableauposte;
    })
    .get(function () {
      return this._otableauposte;
    });
    oStableauPosteSchema.loadClass(ostableauposteClass);
    oStableauPosteSchema.plugin(auditEntityPlugin);
    
let  oReportDetail = mongoose.model('oReportDetail', oReportDetailSchema);
  
  function toinit() {
    return {
  oReportDetail:oReportDetail
    };
  }
return {
  toinit: toinit
};


}
)();
module.exports= {
toinit:oreportdetail.toinit
};


module.exports = oReportDetail;
