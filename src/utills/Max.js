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
        let status = false;

        if(!value){
            return false;
        }
        if (typeof options !== "number" && isNaN(options)) {
            throw new Error("rule parameter 'max' has to be a number");
        }

        if(typeof value == "number"){
            status = Number(value) <= Number(options);
        }else{
            status = value.toString().length <= Number(options);
        }
        this.hasError = !status;
        return status;
    }
    
}

module.exports = { Max };
