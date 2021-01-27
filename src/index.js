const { ErrorBag } = require('./utills/ErrorBag');
const { Required } = require('./utills/Required');
const { Min } = require('./utills/Min');
const { Max } = require('./utills/Max');
const { Email } = require('./utills/Email');
const { Confirmed } = require('./utills/Confirmed');
const { RequiredIf } = require('./utills/RequiredIf');

class Validator {
    
    constructor(validateFields) {
        this.validateFields = validateFields;
        this.attributes = Object.keys(validateFields);
        this.errors = new ErrorBag(this.attributes);
        this.formData = {};
        this.attributes.forEach(val => {
            this.formData[val] = '';
        })
        
    }

    validate(field, value) {
        return new Promise((resolve, reject) => {
            try {
                
                if (field in this.validateFields) {
                    this.formData = {...this.formData, [field]: value}
                    this.generate(field, this.formData)
                    console.log(field, 'inside', this.errors.has(field))
                    if(this.errors.has(field)){
                        return resolve(false);
                    }
                    console.log(field, 'inside', this.errors.any())
                    return resolve(true);
                }

            } catch (e) {
                return resolve(false);
            }
        });
    }

    validateAll(values) {

        return new Promise((resolve, reject) => {

            try {
                for (const field in this.validateFields) {
                    this.formData = {...this.formData, [field]: values[field]}
                    this.generate(field, values)
                }

                if(this.errors.any()){
                    return resolve(false);
                }
                return resolve(true)

            } catch (e) {
                return resolve(false);

            }
        });
    }

    generate(field, formdata) {
        
        this.errors.remove(field);
        const validations =
                    typeof this.validateFields[field] == 'string'
                        ? this.validateFields[field].split('|')
                        : [];

        validations.forEach((validation) => {
            let methodName = validation.split(':')[0];
            let options = validation.includes(':') && validation.split(':').length > 1
                                ? validation.split(':')[1]
                                : '';

            switch (methodName.trim()) {
                case 'required':

                    let requiredValidator = new Required(`The ${this.fieldName} field is required.`);
                    
                    if (!requiredValidator.validate(field, formdata)) {
                    
                        this.errors.add(requiredValidator.getError());
                    
                    }

                    break;
                case 'min':
                    
                    let minValidator = new Min(`The ${field} field must be at least ${options} characters.`);
                    
                    if (!minValidator.validate(field, formdata, options)) {
                        
                        this.errors.add(minValidator.getError());
                        
                    }

                    break;
                case 'max':
                    
                    let maxValidator = new Max(`The ${field} field may not be greater than ${options} characters.`);

                    if (!maxValidator.validate(field, formdata, options)) {
                        
                        this.errors.add(maxValidator.getError());
                        
                    }
                    break;
                case 'email':
                    let emailValidator = new Email(`The ${field} field must be a valid email.`);
                    
                    if (!emailValidator.validate(field, formdata, options)) {
                        
                        this.errors.add(emailValidator.getError());
                    }
                    break;
                case 'confirmed':
                    let confirmedValidator = new Confirmed(`The ${field} confirmation does not match.`);

                    if (!confirmedValidator.validate(field, formdata, options)) {
                        
                        this.errors.add(confirmedValidator.getError());
                        

                    }
                    break;
                case 'required_if':
                    
                    const paramKey = options.split(',')[0] || '';

                    let requiredIfValidator = new RequiredIf(`The ${field} field is required when the ${paramKey} field has value.`);
                
                    if (!requiredIfValidator.validate(field, formdata, options)) {
                        this.errors.add(requiredIfValidator.getError());
                        
                    }
                    break;
                default:
                    break;
            }
        
        });
    }
    
}

module.exports = { Validator };
