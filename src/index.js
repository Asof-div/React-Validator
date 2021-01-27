const {
    Alpha,
    AlphaNum,
    AlphaNumPunct,
    Confirmed,
    Email,
    ErrorBag,
    File,
    In,
    Max,
    Min,
    NotIn,
    NumberRule,
    Required,
    RequiredIf,
    Same
} = require('./utills');

String.prototype.fromSlug = function () {
    return this.replace(/[-_]/g, ' ');
}

String.prototype.capitalize = function () {
    return this.replace(/^\w|\s\w/g, (match) => {
        return match.toUpperCase();
    });
}

String.prototype.ucFirst = function () {
    return this.replace(/^\w/g, (match) => {
        return match.toUpperCase();
    });
}
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

                    if(this.errors.has(field)){
                        return resolve(false);
                    }

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
            let splitOptions = [];

            switch (methodName.trim()) {
                case 'alpha':

                    let alphaValidator = new Alpha(`The ${field} field can only contain letters.`);
                    
                    if (!alphaValidator.validate(field, formdata, options)) {
                    
                        this.errors.add(alphaValidator.getError());
                    
                    }
                    break;
                case 'alpha_num':

                    let alphaNumValidator = new AlphaNum(`The ${field} field must contain letters and numbers.`);
                    
                    if (!alphaNumValidator.validate(field, formdata, options)) {
                    
                        this.errors.add(alphaNumValidator.getError());
                    
                    }
                    break;
                case 'alpha_num_punct':

                    let alphaNumPunctValidator = new AlphaNumPunct(`The ${field} field must contain letters, numbers and punctuations.`);
                    
                    if (!alphaNumPunctValidator.validate(field, formdata, options)) {
                    
                        this.errors.add(alphaNumPunctValidator.getError());
                    
                    }
                    break;

                case 'confirmed':
                    let confirmedValidator = new Confirmed(`The ${field} confirmation does not match.`);

                    if (!confirmedValidator.validate(field, formdata, options)) {
                        
                        this.errors.add(confirmedValidator.getError());
                        

                    }
                    break;
                case 'email':
                    let emailValidator = new Email(`The ${field} field must be a valid email.`);
                    
                    if (!emailValidator.validate(field, formdata, options)) {
                        
                        this.errors.add(emailValidator.getError());
                    }
                    break;
                case 'file':
                    let fileValidator = new File(`The ${field} field must be a valid file type.`);
                    
                    if (!fileValidator.validate(field, formdata, options)) {
                        
                        this.errors.add(fileValidator.getError());
                    }
                    break;
                case 'in':
                    splitOptions = options.split(',');

                    let inValidator = new In(`The ${field} field has to contain any of these ${splitOptions.join(', ')}.`);
                    
                    if (!inValidator.validate(field, formdata, options)) {
                        
                        this.errors.add(inValidator.getError());
                    }
                    break;
                
                case 'max':
                    
                    let maxValidator = new Max(`The ${field} field may not be greater than ${options} characters.`);

                    if (!maxValidator.validate(field, formdata, options)) {
                        
                        this.errors.add(maxValidator.getError());
                        
                    }
                    break;
                case 'min':
                    
                    let minValidator = new Min(`The ${field} field must be at least ${options} characters.`);
                    
                    if (!minValidator.validate(field, formdata, options)) {
                        
                        this.errors.add(minValidator.getError());
                        
                    }

                    break;
                case 'not_in':
                    splitOptions = options.split(',');

                    let notInValidator = new NotIn(`The ${field} field cannot contain any of these ${splitOptions.join(', ')}.`);
                    
                    if (!notInValidator.validate(field, formdata, options)) {
                        
                        this.errors.add(notInValidator.getError());
                    }
                    break;
                
                case 'number':

                    let numberValidator = new NumberRule(`The ${field} field can only contain numbers.`);
                    
                    if (!numberValidator.validate(field, formdata, options)) {
                        
                        this.errors.add(numberValidator.getError());
                    }
                    break;
                case 'required':

                    let requiredValidator = new Required(`The ${field} field is required.`);
                    
                    if (!requiredValidator.validate(field, formdata)) {
                    
                        this.errors.add(requiredValidator.getError());
                    }
                    break;
                case 'required_if':
                    
                    const paramKey = options.split(',')[0] || '';

                    let requiredIfValidator = new RequiredIf(`The ${field} field is required when the ${paramKey} field has value.`);
                
                    if (!requiredIfValidator.validate(field, formdata, options)) {
                        this.errors.add(requiredIfValidator.getError());
                        
                    }
                    break;

                case 'same':

                    const params = options.split(',');
                    const targetName = params.length > 0 && params[0];

                    let sameValidator = new Same(`The ${field} field should the same as the ${targetName} field`);

                    if (!sameValidator.validate(field, formdata, options)) {
                        
                        this.errors.add(sameValidator.getError());
                        
                    }
                    break;
                default:
                    break;
            }
        
        });
    }
    
}

module.exports = Validator;
