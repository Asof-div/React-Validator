class Confirmed {
    constructor(msg = '') {
        this.fieldName = '';
        this.message = msg;
    }

    validate(name, value, targetValue) {
        this.fieldName = name;
        if (value !== targetValue) {
            return false;
        }

        return true;
    }

    getMessage() {
        return this.message;
    }
}

module.exports = { Confirmed };
