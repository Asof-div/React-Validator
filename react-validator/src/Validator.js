const { Required } = require('./utills/Required');
const { Min } = require('./utills/Min');
const { Max } = require('./utills/Max');
const { Emails } = require('./utills/Email');

class Validator {
    constructor(validatefields) {
        this.validatefields = validatefields;
        this.errors = [];
        this.errorMessages = [];
        console.log(this.validatefields);
    }

    validate(name, value) {
        console.log(name, value);
        try {
            for (name in this.validatefields) {
                console.log(name, this.validatefields[name], value);
                let validations =
                    typeof this.validatefields[name] == 'string'
                        ? this.validatefields[name].split('|')
                        : [];
                console.log(validations);
                validations.forEach((validation) => {
                    console.log(validation);
                    let methodName = validation.split(':')[0];
                    let options = validation.includes(':')
                        ? validation.split(':')[1]
                        : '';
                    let unique = `${name}_${methodName.trim()}`;
                    console.log(methodName, options, unique);
                    switch (methodName.trim()) {
                        case 'required':
                            let required = new Required();
                            if (required.validate(value)) {
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
                            let msg = `The ${name} field must be at least ${options} characters.`;
                            let min = new Min(msg);
                            if (min.validate(name, value, options)) {
                                this.errors[unique] = false;
                                delete this.errorMessages[unique];
                            } else {
                                this.errors[unique] = true;
                                this.errorMessages[unique] = min.getMessage();
                            }
                            break;
                        case 'max':
                            let max_msg = `The ${name} field may not be greater than ${options} characters.`;
                            let max = new Max(max_msg);
                            if (max.validate(name, value, options)) {
                                this.errors[unique] = false;
                                delete this.errorMessages[unique];
                            } else {
                                this.errors[unique] = true;
                                this.errorMessages[unique] = max.getMessage();
                            }
                            break;
                        case 'email':
                            let email_msg = `The ${name} field must be a valid email.`;
                            let email = new Emails(email_msg);
                            if (email.validate(value)) {
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

export default Validator;
