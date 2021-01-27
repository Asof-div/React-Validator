const { Rule } = require("./Rule");

class File extends Rule{
    constructor(msg = '') {
        super(msg);
        this.rule = 'file'
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
        
        const status = value && value.files && value.files.length ? true : false;

        this.hasError = !status;

        return status;
    }


}

module.exports = { File };
