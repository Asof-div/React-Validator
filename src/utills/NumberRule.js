const { Rule } = require("./Rule");

class NumberRule extends Rule{
    constructor(msg = '') {
        super(msg);
        this.rule = 'number'
        this.fieldName = '';
        this.msg = msg;
        this.hasError = false;
    }

    validate(name, values, options) {
        let value = values[name];
        this.fieldName = name;

        if(!value){
            return false;
        }
        
        const status = value && value.toString().match(/^[0-9]+$/) ? true : false;

        this.hasError = !status;

        return status;
    }


}

module.exports = { NumberRule };
