const { Rule } = require("./Rule");

class Alpha extends Rule{
    constructor(msg = '') {
        super(msg);
        this.rule = 'alpha'
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
        
        const status = value && value.toString().match(/^[a-z A-Z]+$/) ? true : false;

        this.hasError = !status;

        return status;
    }


}

module.exports = { Alpha };
