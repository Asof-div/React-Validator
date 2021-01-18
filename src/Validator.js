const { Required } = require('./utills/Required');
const { Min } = require('./utills/Min');
const { Max } = require('./utills/Max');
const { Emails } = require('/utills/Email');

class Validator {
    constructor(validatefields) {
        this.validatefields = validatefields;
        this.errors = [];
        this.errorMessages = [];
    }

    validate(values) {
        try {
            for (key in this.validatefields) {
                let validations =
                    typeof this.validatefields[key] == 'string'
                        ? this.validatefields[key].split('|')
                        : [];

                validations.forEach((validation) => {
                    let methodName = validation.split(':')[0];
                    let options = validation.split(':')[1];
                    let unique = `${key}_${methodName.trim()}`;
                    switch (methodName.trim()) {
                        case 'required':
                            let required = new Required();
                            if (required.validate(values[key])) {
                                this.errors[unique] = false;
                                delete this.errorMessages[unique];
                            } else {
                                this.errors[unique] = true;
                                this.errorMessages[
                                    unique
                                ] = required.getMessage();
                            }
                            break;
                        case 'min':
                            let msg = `The ${key} field must be at least ${options} characters.`;
                            let min = new Min(msg);
                            if (min.validate(key, values[key], options)) {
                                this.errors[unique] = false;
                                delete this.errorMessages[unique];
                            } else {
                                this.errors[unique] = true;
                                this.errorMessages[unique] = min.getMessage();
                            }
                            break;
                        case 'max':
                            let msg = `The ${key} field may not be greater than ${options} characters.`;
                            let max = new Max(msg);
                            if (max.validate(key, values[key], options)) {
                                this.errors[unique] = false;
                                delete this.errorMessages[unique];
                            } else {
                                this.errors[unique] = true;
                                this.errorMessages[unique] = max.getMessage();
                            }
                            break;
                        case 'email':
                            let msg = `The ${key} field must be a valid email.`;
                            let email = new Emails(msg);
                            if (email.validate(values[key])) {
                                this.errors[unique] = false;
                                delete this.errorMessages[unique];
                            } else {
                                this.errors[unique] = true;
                                this.errorMessages[unique] = email.getMessage();
                            }
                            break;
                        case 'required_if':
                            break;
                        default:
                            break;
                    }
                });
            }
        } catch (e) {}
    }
}

module.exports = { Validator };
