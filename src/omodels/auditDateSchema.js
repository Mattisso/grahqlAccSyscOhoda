'use strict';

const auditDateSchema = (function () {
  const currentDate = new Date();
   // function auditEntityOnPlugin(schema) {
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
         return    next();
          };
      //   return  schema.pre('save', auditDateschema)       
          

       
        
     const auditEntityPlugin= function (schema, options) {
         /*  schema.virtual('CreatedOn').
            get(function() { return this._CreatedOn; }).
            set(function(v) { this._CreatedOn = v; }); */
          schema.pre('save', function(next) {        
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
        }; 
/* 
    function ModifiedOnPlugin(schema, options) {
        schema.virtual('ModifiedOn').
          get(function() { return this._ModifiedOn; }).
          set(function(v) { this._ModifiedOn = v; });      
          schema.pre('save', function(next) {
         
        });
      }; 
      function ModifiedByPlugin(schema, options) {
        schema.virtual('ModifiedBy').
          get(function() { return this._ModifiedBy; }).
          set(function(v) { this._ModifiedBy = v; });        
          schema.pre('save', function(next) {
          
        });
      }; */
  function toinit() {
    return {
       //  CreatedByPlugin:CreatedByPlugin,
       auditEntityPlugin:auditEntityPlugin,
      //  ModifiedOnPlugin:ModifiedOnPlugin,
     //   ModifiedByPlugin:ModifiedByPlugin,
        auditDateschema:auditDateschema
    };
  }

return {
  toinit: toinit
};



// }
}
)();
module.exports= {
toinit:auditDateSchema.toinit
};

