var _ = require('lodash');

class Required_if {
    constructor(msg = '') {
        this.fieldName = '';
        this.message = msg;
    }

    validate(name, value, paramKey, paramValue, values) {
        if (_.has(values, paramKey)) {
            paramValue.forEach((arr) => {
                if (values[paramKey] === arr && value && value.length > 0) {
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
