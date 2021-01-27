const { Rule } = require("./Rule");
class Min extends Rule {
    constructor(msg = '') {
        super(msg);
        this.rule = 'min'
        this.fieldName = '';
        this.msg = msg;
        this.hasError = false;
    }


    validate(name, values, options = '') {
        let value = values[name];
        this.fieldName = name;
        const status = value.length >= Number(options);
        this.hasError = !status;
        return status;
    }

}

module.exports = { Min };
