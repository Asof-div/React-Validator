const { Validator } = require('./src/Validator');

let fields = {
    name: 'required|min:2|max:5',
    email: 'required',
    lastName: 'required_if:name,naomi,justine,you',
    password: 'required|min:8|max:25',
    password_confirmation: 'confirmed',
};

let validate = new Validator(fields);

form = {
    name: 'you',
    // email: 'olagmailcom',
    password: 'nou',
    lastName: 'you',
    password_confirmation: 'nonameyou',
};

validate.validate(form);

console.log(validate.errors, validate.errorMessages);
