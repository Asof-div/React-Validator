const { Rule } = require("./Rule");

class AlphaNum extends Rule{
    constructor(msg = '') {
        super(msg);
        this.rule = 'alpha_num'
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
        
        const status = value && value.toString().match(/^[a-zA-Z]/)  && value.toString().match(/[0-9]+/) ? true : false;

        this.hasError = !status;

        return status;
    }


}

module.exports = { AlphaNum };
