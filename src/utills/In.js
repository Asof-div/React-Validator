const { Rule } = require("./Rule");

class In extends Rule{
    constructor(msg = '') {
        super(msg);
        this.rule = 'in'
        this.fieldName = '';
        this.msg = msg;
        this.hasError = false;
    }

    validate(name, values, options) {
        let value = values[name];
        this.fieldName = name;
        const splitOptions = options.split(',');
        if(splitOptions.length < 1){
            return false;
        }

        const params = [...splitOptions];

        if(!value){
            return false;
        }
        
        const status = value && params.find(item => item == value) ? true : false;

        this.hasError = !status;

        return status;
    }


}

module.exports = { In };
