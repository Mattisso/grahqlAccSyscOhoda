
'use strict';
// const _ = require('lodash');
let mongoose = require('mongoose'),
Schema = mongoose.Schema,
util = require('util');
// const Schema = mongoose.Schema;
const odabaseSchema = (function () {
    function extendSchema(Schema, definition, options) {
        return new mongoose.Schema(Object.assign({}, Schema.obj, definition), options);
    }

    const getauditentity = function () {
        return {
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
        }
    }
    const gettoObject = 
         {
            toObject: {
                virtuals: true
            },
            toJSON: {
                virtuals: true
            }
        }
    
    /**    const gettoObject = function () {
        return {
            toObject: {
                virtuals: true
            },
            toJSON: {
                virtuals: true
            }
        }
    } */

    const auditbaseSchema = function () {
        const AbstractEntitySchema = new Schema(getauditentity(),gettoObject);
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

    const oada = function () {
        return
    }

    function toinit() {
        return {
            auditbaseSchema: auditbaseSchema,
            gettoObject: gettoObject,
            extendSchema: extendSchema,
            auditsave: auditsave
        };
    }

    return {
        toinit: toinit
    };

})();
module.exports = {
    toinit: odabaseSchema.toinit
};
