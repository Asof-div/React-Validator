const { Validator } = require('./src/Validator');

let fields = {
    name: 'required|min:2|max:5',
    email: 'required',
    password: 'required|min:8|max:25',
    password_confirmation: 'confirmed',
};

let validate = new Validator(fields);

form = {
    name: '',
    // email: 'olagmailcom',
    password: 'nonameyou',
    password_confirmation: 'nonameyou',
};

validate.validate(form);

console.log(validate.errors, validate.errorMessages);
