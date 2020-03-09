'use strict';

const auditDateSchema = (function () {
    function auditEntityOnPlugin(schema) {
        let auditDateschema = function(next){
            let self = this;
            let currentDate = new Date();
            if (!self.CreatedOn)
            self.CreatedOn = currentDate;
          if (!self.ModifiedOn)
          self.ModifiedOn = currentDate;
          if (!self.CreatedBy)
          self.CreatedBy = 'Admin';
          if (!self.ModifiedBy)
          self.ModifiedBy = 'Admin';
            next()
          };
          schema.pre('save', auditDateschema)
            
          

   /*      schema.virtual('CreatedOn').
          get(function() { return this._CreatedOn; }).
          set(function(v) { this._CreatedOn = v; });

          schema.pre('save', function(docs) {
            if (!Array.isArray(docs)) {
              docs = [docs];
            }
            const currentDate = new Date();
            for (const doc of docs) {
              if (!doc.CreatedOn)
              doc.CreatedOn = currentDate;
            }
          });

        schema.post(['find', 'findOne'], function(docs) {
          if (!Array.isArray(docs)) {
            docs = [docs];
          }
          const currentDate = new Date();
          for (const doc of docs) {
            if (!doc.CreatedOn)
            doc.CreatedOn = currentDate;
          }
        }); */
      };

   /*    function ModifiedOnPlugin(schema, options) {
        schema.virtual('ModifiedOn').
          get(function() { return this._ModifiedOn; }).
          set(function(v) { this._ModifiedOn = v; });      
        schema.post(['find', 'findOne'], function(docs) {
          if (!Array.isArray(docs)) {
            docs = [docs];
          }
          const currentDate = new Date();
          for (const doc of docs) {
            if (!doc.ModifiedOn)
            doc.ModifiedOn = currentDate;
          }
        });
      }; */
  function toinit() {
    return {
        auditEntityOnPlugin:auditEntityOnPlugin
    };
  }

return {
  toinit: toinit
};



}
)();
module.exports= {
toinit:auditDateSchema.toinit
};

