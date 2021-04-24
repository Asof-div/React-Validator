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
  
        if (typeof value == "number" && value.toString().length > 0) {
            this.hasError = false;
            return true;
        }else if (typeof value == "string" && value !== undefined && value.length > 0) {
            this.hasError = false;
            return true;
        }else if(typeof value == "object" && Object.keys(value).length > 0 ){
            this.hasError = false;
            return true;
        }

        this.hasError = true;
        return false;
    }


}

module.exports = { Required };
