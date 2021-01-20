class Confirmed {
    constructor(msg = '') {
        this.fieldName = '';
        this.message =
            msg || `The ${this.fieldName} confirmation does not match.`;
    }

    validate(name, value, targetValue) {
        this.fieldName = name;
        return value === targetValue;
    }

    getMessage() {
        return this.message;
    }
}

module.exports = { Confirmed };
