class Required {
    constructor(msg = '') {
        this.fieldName = '';
        this.message = msg || `${this.fieldName} is required!`;
    }

    validate(name, value, options = '') {
        this.fieldName = name;
        if (value == '' || value.length < 1) {
            return false;
        }

        return true;
    }

    getMessage() {
        return this.message;
    }
}

module.exports = { Required };
