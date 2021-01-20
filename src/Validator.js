const { Required } = require('./utills/Required');
const { Min } = require('./utills/Min');
const { Max } = require('./utills/Max');
const { Emails } = require('./utills/Email');
const { Confirmed } = require('./utills/Confirmed');

class Validator {
    constructor(validateFields) {
        this.validateFields = validateFields;
        this.errors = [];
        this.errorMessages = [];
    }

    validate(values) {
        try {
            for (const key in this.validateFields) {
                const validations =
                    typeof this.validateFields[key] == 'string'
                        ? this.validateFields[key].split('|')
                        : [];
                console.log(key, 'v', validations);

                validations.forEach((validation) => {
                    let methodName = validation.split(':')[0];
                    let options =
                        validation.includes(':') &&
                        validation.split(':').length > 1
                            ? validation.split(':')[1]
                            : '';
                    let unique = `${key}_${methodName.trim()}`;
                    switch (methodName.trim()) {
                        case 'required':
                            let required_msg = `The ${key} field is required.`;
                            let required = new Required(required_msg);

                            if (required.validate(key, values[key])) {
                                this.errors[unique] = false;
                                delete this.errorMessages[unique];
                            } else {
                                this.errors[unique] = true;
                                this.errorMessages[key] = {
                                    [methodName]: required.getMessage(),
                                };
                            }

                            break;
                        case 'min':
                            let min_msg = `The ${key} field must be at least ${options} characters.`;
                            let min = new Min(min_msg);

                            if (min.validate(key, values[key], options)) {
                                this.errors[unique] = false;
                                delete this.errorMessages[unique];
                            } else {
                                this.errors[unique] = true;
                                this.errorMessages[key] = {
                                    [methodName]: min.getMessage(),
                                };
                            }

                            break;
                        case 'max':
                            console.log(key, methodName, values[key], options);
                            let max_msg = `The ${key} field may not be greater than ${options} characters.`;
                            let max = new Max(max_msg);

                            if (max.validate(key, values[key], options)) {
                                this.errors[unique] = false;
                                delete this.errorMessages[unique];
                            } else {
                                this.errors[unique] = true;
                                this.errorMessages[key] = {
                                    [methodName]: max.getMessage(),
                                };
                            }

                            break;
                        case 'email':
                            let email_msg = `The ${key} field must be a valid email.`;
                            let email = new Emails(email_msg);
                            if (email.validate(key, values[key], options)) {
                                this.errors[unique] = false;
                                delete this.errorMessages[unique];
                            } else {
                                this.errors[unique] = true;
                                this.errorMessages[key] = {
                                    [methodName]: email.getMessage(),
                                };
                            }
                            break;
                        case 'confirmed':
                            let confirmed_msg = `The ${key} confirmation does not match.`;
                            let confirmed = new Confirmed(confirmed_msg);
                            let targetValue =
                                key === password && values[password];
                            console.log(targetValue, 'target');
                            if (
                                confirmed.validate(
                                    key,
                                    values[key],
                                    targetValue
                                )
                            ) {
                                this.errors[unique] = false;
                                delete this.errorMessages[unique];
                            } else {
                                this.errors[unique] = true;
                                this.errorMessages[key] = {
                                    [methodName]: confirmed.getMessage(),
                                };
                            }
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
