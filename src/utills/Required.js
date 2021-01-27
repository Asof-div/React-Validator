const { Rule } = require("./Rule");
class Required extends Rule {
    constructor(msg = '') {
        super(msg);
        this.rule = 'required'
        this.fieldName = '';
        this.msg = msg;
        this.hasError = false;
    }

    validate(name, values, options = '') {
        let value = values[name];
        this.fieldName = name;
        if (value && value.length > 0) {
            this.hasError = false;
            return true;
        }

        this.hasError = true;
        return false;
    }


}

module.exports = { Required };
