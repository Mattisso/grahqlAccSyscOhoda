
'use strict';
// const _ = require('lodash');
let mongoose = require('mongoose'),
Schema=mongoose.Schema,
 util = require('util');
// const Schema = mongoose.Schema;
const odabaseSchema = (function () {
    function extendSchema (Schema, definition, options) {
        return new mongoose.Schema(Object.assign({}, Schema.obj, definition), options );
      }
      
    const _auditentity={
        CreatedOn: { type: Date, default:  Date.now },
        CreatedBy: { type: String },
        ModifiedOn: { type: Date,  default:  Date.now  },
        ModifiedBy: { type: String },
        isActive: { type: Boolean, default: true }
    }
    const _toobject= {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }

const auditbaseSchema=function(){
    const AbstractEntitySchema = new Schema(_auditentity);
   // util.inherits(BaseSchema, Schema);
    return AbstractEntitySchema
}

function auditsave(next) {
    let currentDate = new Date();
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

const oada= function() {
return
}

  function toinit() {
    return {
        auditbaseSchema:auditbaseSchema,
        _toobject:_toobject,
        extendSchema:extendSchema,
        auditsave:auditsave
    };
  }

return {
  toinit: toinit
};



}
)();
module.exports= {
toinit:odabaseSchema.toinit
};
