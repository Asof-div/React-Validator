const { Validator } = require('./Validator');

let fields = {
    name: 'required|min:2|max:5',
    password: 'required'
};

let validate = new Validator(fields);

form = {
    name: ''
}

validate.validate(form);



console.log(validate.errors, validate.errorMessages)

