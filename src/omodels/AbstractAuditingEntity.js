"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const util = require('util');

const AbstractAuditingEntity = (function () {
    let AbstractEntitySchema = new Schema({
        CreatedOn: {
            type: Date,
        default:
            Date.now
        },
        CreatedBy: {
            type: String
        },
        ModifiedOn: {
            type: Date,
        default:
            Date.now
        },
        ModifiedBy: {
            type: String
        },
        isActive: {
            type: Boolean,
        default:
            true
        }
    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });
    AbstractEntitySchema.set('toObject', {
        getters: true
    });
    AbstractEntitySchema.set('toJSON', {
        getters: true
    });

    AbstractEntitySchema.pre('save',function (next) {

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
    });
  //  const AbstractEntity = mongoose.model('AbstractEntity', AbstractEntitySchema);

    /*  function _AbstractEntitySchema() {
    //call super
    Schema.apply(this, arguments);
    //add
    this.add({
    CreatedOn:{type: Date, default:Date.now },
    CreatedBy: { type: String
    },
    ModifiedOn: { type: Date, default: Date.now },
    ModifiedBy: { type: String},
    isActive: { type: Boolean, default: true }
    }, {
    toObject: {
    virtuals: true
    },
    toJSON: {
    virtuals: true
    }
    }


    );
    };
    util.inherits(AbstractEntitySchema, Schema);
     */
    function toinit() {
        return {
            AbstractEntitySchema: AbstractEntitySchema

        };
    }

    return {
        toinit: toinit
    };

})();
module.exports = {
    toinit: AbstractAuditingEntity.toinit
};
