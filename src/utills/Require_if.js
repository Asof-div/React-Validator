var _ = require('lodash');

class Required_if {
    constructor(msg = '') {
        this.fieldName = '';
        this.message = msg;
    }

    validate(name, value, paramKey, paramValue, fields) {
        if (_.has(fields, paramKey)) {
            paramValue.forEach((arr) => {
                console.log(arr);
                if (fields[paramKey] === arr && value && value.length > 0) {
                    return true;
                }
            });
        }
        return false;
    }

    getMessage() {
        return this.message;
    }
}

module.exports = { Required_if };
