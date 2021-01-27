const { Rule } = require("./Rule");
class Max extends Rule {
    constructor(msg = '') {
        super(msg);
        this.rule = 'max'
        this.fieldName = '';
        this.msg = msg;
        this.hasError = false;
    }

    validate(name, values, options = '') {
        let value = values[name];
        this.fieldName = name;
        let status = value.length <= Number(options);
        this.hasError = !status;
        return status;
    }
    
}

module.exports = { Max };
