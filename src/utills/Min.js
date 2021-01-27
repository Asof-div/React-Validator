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
        let status = false;

        if(!value){
            return false;
        }

        if (typeof options !== "number" && isNaN(options)) {
            throw new Error("rule parameter 'min' has to be a number");
        }

        if(typeof value == "number"){
            status = Number(value) >= Number(options);
        }else{
            status = value.toString().length >= Number(options);
        }

        this.hasError = !status;
        return status;
    }

}

module.exports = { Min };
