class Max {
    constructor(msg = '') {
        this.fieldName = '';
        this.message = msg;
    }

    validate(name, value, options = '') {
        this.fieldName = name;
        return value.length <= Number(options);
    }

    getMessage() {
        return this.message;
    }
}

module.exports = { Max };
