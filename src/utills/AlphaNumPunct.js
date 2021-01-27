const { Rule } = require("./Rule");

class AlphaNumPunct extends Rule{
    constructor(msg = '') {
        super(msg);
        this.rule = 'alpha_num_punct'
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
        
        const status = value && value.toString().match(/^[a-zA-Z]/)  && value.toString().match(/[0-9]+/) && value.toString().match(/[!@#$%^&*()_+~`{}[\]\\;:'"<>,.?/]+/) ? true : false;

        this.hasError = !status;

        return status;
    }


}

module.exports = { AlphaNumPunct };
