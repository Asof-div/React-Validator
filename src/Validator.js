const {Required} = require('./utills/Required');


class Validator {

    constructor (validatefields) {
        this.validatefields = validatefields;
        this.errors = [];
        this.errorMessages = [];
    }

    validate(values) {
        try {
            for (key in this.validatefields) {
                let validations = typeof this.validatefields[key] == 'string' ? this.validatefields[key].split('|') : [];
        
                validations.forEach(validation => {
                    let methodName = validation.split(':')[0];
                    let unique = `${key}_${methodName.trim()}`
                    switch (methodName.trim()) {
                        case 'required':
                            let required = new Required();
                            if(required.validate(values[key])){

                                this.errors[unique] = false; 
                                delete this.errorMessages[unique];

                            }else{
                                this.errors[unique] = true; 
                                this.errorMessages[unique] = required.getMessage(); 
                            }
                            break;
                        case 'min':
                        
                            break;
                        case 'max':
                        
                            break;
                        case 'email':
                        
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

module.exports = {Validator};