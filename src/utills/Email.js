const { Rule } = require("./Rule");
class Email extends Rule {
    constructor(msg = '') {
        super(msg);
        this.rule = 'email';
        this.fieldName = '';
        this.msg =  msg;
        this.hasError = false;
    }

    validate(name, values, options = '') {
        let value = values[name];
        this.fieldName = name;
        let status = /\S+@\S+\.\S+/.test(value);
        this.hasError = !status;
        return status;
    }


}

module.exports = { Email };
