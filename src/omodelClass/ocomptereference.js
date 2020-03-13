
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;


var OcompteReferenceSchema = new Schema(
	{
    OcompteKey:
		{
			type: ObjectId,
			ref: 'oCompte'//,
		//	default: '000000000000000000000000'
		}
		,
			OstblareaKey:
		{
			type: ObjectId,
			ref: 'oStblArea'//,
			//default: '000000000000000000000000'

		},
			OreferenceKey:
		{
			type: ObjectId,
			ref: 'oReference'//,
		//	default: '000000000000000000000000'
		},
      OtableauposteKey:
		{
			type: ObjectId,
			ref: 'oTableauPoste'//,
		//	default: '000000000000000000000000'
		},
    OstableauposteKey:
		{
			type: ObjectId,
			ref: 'oStableauPoste',
		//	default: '000000000000000000000000'
		},
		Exception:
    {
      type: Number,
      default:
        0
    },
		Taux:
    {
      type: Number,
      default:
        1
    },
   /*  olevelKey:
    {
      type: ObjectId,
			ref: 'olevel',
      default: '000000000000000000000000'
    },
    SortOrder:
    {
      type: Number,
      default: 1
    }, */
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
OcompteReferenceSchema.set('toObject', { getters: true });
OcompteReferenceSchema.set('toJSON', { getters: true });

OcompteReferenceSchema.index(
  {OcompteKey:1,
  OstblareaKey:1,
  OreferenceKey:1,
  OtableauposteKey:1,
  OstableauposteKey:1,
  Exception:1,
  Taux:1
});

OcompteReferenceSchema.virtual('suboreferences', {
	ref: 'oReference', // The model to use
	localField: 'oreferences', // Find people where `localField`
	foreignField: '_id', // is equal to `foreignField`
	// If `justOne` is true, 'members' will be a single doc as opposed to
	// an array. `justOne` is false by default.
	justOne: false
  });

  OcompteReferenceSchema.virtual('ostableauposte')
  .set(function(ostableauposte){
	this.OstableauposteKey = ostableauposte;
	}).get(function() {
	return this.OstableauposteKey;
	});

  OcompteReferenceSchema.virtual('ocompte')
  .set(function(ocompte){
    this._ocompte= ocompte;
  })
  .get(function() {
    return this._ocompte;
  });



OcompteReferenceSchema.pre('save',
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

var OcompteReference = mongoose.model('OcompteReference', OcompteReferenceSchema);
    module.exports = OcompteReference;

