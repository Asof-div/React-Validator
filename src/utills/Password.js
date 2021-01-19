class Password {
    constructor(msg = '') {
        this.fieldName = '';
        this.message = msg || `Password does!`;
    }

    validate(name, value, options = '') {
        this.fieldName = name;
        if (value && value.length > 0) {
            return true;
        }

        return false;
    }

    getMessage() {
        return this.message;
    }
}

module.exports = { Password };
