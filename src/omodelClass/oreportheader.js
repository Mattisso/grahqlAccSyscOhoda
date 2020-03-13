var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;


var oReportHeaderSchema = new Schema(
	{
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
		SortOrderH:
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

oReportHeaderSchema.set('toObject', { getters: true });
oReportHeaderSchema.set('toJSON', { getters: true });


/* oReportHeaderSchema.virtual('fullDescription')
	.get(function () {
		return this.RefCode + ' - ' + this.Description;
	}
	).set(function (v) {
		this.RefCode = v.substr(0,
			v.indexOf(''));
		this.Description = v.substr(v.indexOf('') + 1);
	}
	); */

oReportHeaderSchema.index(
	{
		OtableauposteKey: 1,
		OreferenceKey: 1
	}
);

oReportHeaderSchema.virtual('ocompte')
	.set(function (ocompte) {
		this._ocompte = ocompte;
	})
	.get(function () {
		return this._ocompte;
	});

oReportHeaderSchema.pre('save',
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

var oReportHeader = mongoose.model('oReportHeader', oReportHeaderSchema);

module.exports = oReportHeader;
