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
     return  schema.pre('save', auditDateschema)     
        }   
        
        function CreatedByPlugin(schema, options) {
          schema.virtual('CreatedBy').
            get(function() { return this._CreatedBy; }).
            set(function(v) { this._CreatedBy = v; });
        
       /*    schema.post(['find', 'findOne'], function(docs) {
            if (!Array.isArray(docs)) {
              docs = [docs];
            }
            const now = new Date();
            for (const doc of docs) {
              doc.CreatedBy = now;
            }
          }); */
          schema.pre('save', function(docs) {
            if (!Array.isArray(docs)) {
              docs = [docs];
            }
            const now = new Date();
            for (const doc of docs) {
              if (!doc.CreatedBy)
              doc.CreatedBy = 'admin';
            }
          });
        }
        function CreatedOnPlugin(schema, options) {
          schema.virtual('CreatedOn').
            get(function() { return this._CreatedOn; }).
            set(function(v) { this._CreatedOn = v; });
        
          schema.pre('save', function(docs) {
            if (!Array.isArray(docs)) {
              docs = [docs];
            }
            const now = new Date();
            for (const doc of docs) {
              if (!doc.CreatedOn)
              doc.CreatedOn = now;
            }
          });
        }; 

    function ModifiedOnPlugin(schema, options) {
        schema.virtual('ModifiedOn').
          get(function() { return this._ModifiedOn; }).
          set(function(v) { this._ModifiedOn = v; });      
          schema.pre('save', function(docs) {
          if (!Array.isArray(docs)) {
            docs = [docs];
          }
          const currentDate = new Date();
          for (const doc of docs) {
            if (!doc.ModifiedOn)
            doc.ModifiedOn = currentDate;
          }
        });
      }; 
      function ModifiedByPlugin(schema, options) {
        schema.virtual('ModifiedBy').
          get(function() { return this._ModifiedBy; }).
          set(function(v) { this._ModifiedBy = v; });        
          schema.pre('save', function(docs) {
          if (!Array.isArray(docs)) {
            docs = [docs];
          }
          for (const doc of docs) {
            if (!doc.ModifiedBy)
            doc.ModifiedBy = 'admin';
          }
        });
      };
  function toinit() {
    return {
        auditEntityOnPlugin:auditEntityOnPlugin,
        CreatedByPlugin:CreatedByPlugin,
        CreatedOnPlugin:CreatedOnPlugin,
        ModifiedOnPlugin:ModifiedOnPlugin,
        ModifiedByPlugin:ModifiedByPlugin
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

