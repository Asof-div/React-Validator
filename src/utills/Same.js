const { Rule } = require("./Rule");

class Same extends Rule{
    constructor(msg = '') {
        super(msg);
        this.rule = 'same'
        this.fieldName = '';
        this.msg = msg;
        this.hasError = false;
    }

    validate(name, values, options) {
        let value = values[name];
        this.fieldName = name;
        const params = options.split(',');
        const targetName = params.length > 0 && params[0];
        const targetValue = values[targetName];
        
        if(!value || !targetValue){
            return false;
        }

        if (value !== targetValue) {
            this.hasError = true;
            return false;
        }
        this.hasError = false;
        return true;
    }


}

module.exports = { Same };
