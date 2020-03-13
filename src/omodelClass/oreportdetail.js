var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var oReportDetailSchema = new Schema({

  OtableauposteKey:
  {
    type: ObjectId,
    ref: 'oTableauPoste',
    default: '000000000000000000000000'

  },
  OreferenceKey:
  {
    type: ObjectId,
    ref: 'oReference',
    default: '000000000000000000000000'
  },
  olevelKey:
  {
    type: ObjectId,
    ref: 'olevel',
    default: '000000000000000000000000'
  },
  SortOrder:
  {
    type: Number,
    default: 1
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
}, { toJSON: { virtuals: true } }
);

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

oReportDetailSchema.pre('save',
  function (next) {

    var currentDate = new Date();

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

var oReportDetail = mongoose.model('oReportDetail', oReportDetailSchema);

module.exports = oReportDetail;
