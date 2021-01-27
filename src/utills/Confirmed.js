const { Rule } = require("./Rule");

class Confirmed extends Rule{
    constructor(msg = '') {
        super(msg);
        this.rule = 'confirmed'
        this.fieldName = '';
        this.msg = msg;
        this.hasError = false;
    }

    validate(name, values, options) {
        let value = values[name];
        this.fieldName = name;
        const params = options.split(',');
        const targetName = params.length > 0 ? params[0] : `${name}_confirmation`;
        const targetValue = values[targetName];
        this.fieldName = name;
        if (value !== targetValue) {
            this.hasError = true;
            return false;
        }
        this.hasError = false;
        return true;
    }


}

module.exports = { Confirmed };
