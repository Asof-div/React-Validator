const { Required } = require('./utills/Required');
const { Min } = require('./utills/Min');
const { Max } = require('./utills/Max');
const { Emails } = require('./utills/Email');
const { Confirmed } = require('./utills/Confirmed');
const { Required_if } = require('./utills/Require_if');

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
                    let paramKey = options.split(',').shift();
                    let paramValue = options.split(',');
                    console.log(paramKey);
                    console.log(paramValue);

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
                            if (
                                confirmed.validate(
                                    key,
                                    values[key],
                                    values['password']
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
                        case 'required-if':
                            let required_if_msg = `The ${key} field is required when the ${paramKey} field has value.`;
                            let required_if = new Required_if(required_if_msg);
                            if (
                                required_if.validate(
                                    key,
                                    value[key],
                                    paramKey,
                                    paramValue,
                                    this.validateFields
                                )
                            ) {
                                this.errors[unique] = false;
                                delete this.errorMessages[unique];
                            } else {
                                this.errors[unique] = true;
                                this.errorMessages[key] = {
                                    [methodName]: required_if.getMessage(),
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
