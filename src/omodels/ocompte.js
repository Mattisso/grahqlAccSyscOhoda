"use strict";

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */

let mongoose = require('mongoose'),
extend =require('mongoose-schema-extend'),
AbstractEntitySchema =require('./AbstractAuditingEntity').toinit().AbstractEntitySchema;
 let Schema = mongoose.Schema;

let oCompteSchema = new Schema({
  CompteNumber:
    {
      type: String
    },
    oreferenceID:
    {
      type: String
    } 
  }
);
//oCompteSchema.set('toObject', { getters: true });
// //oCompteSchema.set('toJSON', { getters: true });

oCompteSchema.index(
  {
    CompteNumber: 1
 //  , Exception: 1
  }
);
oCompteSchema.set('toObject', {
  getters: true
});
oCompteSchema.set('toJSON', {
  getters: true
});

oCompteSchema.index({
  CompteNumber: 1
  //  , Exception: 1
});

/* oCompteSchema.pre('save',
  function (next) {

  let currentDate = new Date();

<<<<<<< HEAD:omodels/ocompte.js
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
); */


const oCompte = mongoose.model('oCompte', oCompteSchema);

module.exports = oCompte;
