class Emails {
    constructor(msg = '') {
        this.fieldName = '';
        this.message = msg;
    }

    validate(name, value, options = '') {
        this.fieldName = name;
        return /\S+@\S+\.\S+/.test(value);
    }

    getMessage() {
        return this.message;
    }
}

module.exports = { Emails };
