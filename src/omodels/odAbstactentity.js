const odAbstactentity = (function () {
class abstactentity {
    constructor(CreatedOn ,ModifiedOn, CreatedBy, ModifiedBy) 
    {
this._CreatedOn= CreatedOn;
this._ModifiedOn=ModifiedOn;
this._CreatedBy=CreatedBy;
this._ModifiedBy=ModifiedBy
    }
    get CreatedOn() {
		return this._CreatedOn;
	}

	set CreatedOn(CreatedOn) {
		this._CreatedOn = CreatedOn;
		return this;
	}
    get ModifiedOn() {
		return this._ModifiedOn;
	}

	set ModifiedOn(ModifiedOn) {
		this._ModifiedOn = ModifiedOn;
		return this;
	}
    get CreatedBy() {
		return this._CreatedBy;
	}

	set CreatedBy(CreatedBy) {
		this._CreatedBy = CreatedBy;
		return this;
	}
    get ModifiedBy() {
		return this._ModifiedBy;
	}

	set ModifiedBy(ModifiedBy) {
		this._ModifiedBy = ModifiedBy;
		return this;
    }
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

}

    function toinit() {
        return {
            abstactentity: abstactentity

        };
    }

    return {
        toinit: toinit
    };

})();
module.exports = {
    toinit: odAbstactentity.toinit
};
