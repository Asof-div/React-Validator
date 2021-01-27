const { Rule } = require("./Rule");

class RequiredIf extends Rule {
    constructor(msg = '') {
        super(msg);
        this.rule = 'required_if'
        this.fieldName = '';
        this.msg = msg;
        this.hasError = false;
    }

    validate(name, values, options) {

        let value = values[name];
        this.fieldName = name;
        const splitOptions = options.split(',');
        if(splitOptions.length < 2){
            return false;
        }
        
        const targetName = splitOptions[0];
        const targetValue = values[targetName];
        const params = [...splitOptions];
        params.shift();
        let isRequired = false;

        params.forEach(val => {
            
            if(targetValue && val && val.trim() === targetValue.trim()){
                isRequired = true;
            }

        });

        if(isRequired){
            const status = value && value.length > 0 ? true : false;
            this.hasError = !status;
            return status;
        }

        this.hasError = false;
        return true;
    }

    
}

module.exports = { RequiredIf };
