"use strict";

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const oCompteSchema = new Schema({
  CompteNumber:
    {
      type: String
    },
    oreferenceID:
    {
      type: String
    },
   CreatedOn:
    {
      type: Date,
      default:
        Date.now
    },
  CreatedBy:
    {
      type: String
    },
  ModifiedOn:
    {
      type: Date,
      default:
        Date.now
    },
  ModifiedBy:
    {
      type: String
    },
  isActive:
    {
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
  }
);
oCompteSchema.set('toObject', { getters: true });
oCompteSchema.set('toJSON', { getters: true });

oCompteSchema.index(
  {
    CompteNumber: 1
 //  , Exception: 1
  }
);


oCompteSchema.pre('save',
  function (next) {


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
);

const oCompte = mongoose.model('oCompte', oCompteSchema);

module.exports = oCompte;
