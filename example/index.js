const { Validator } = require('../src');

let rules = {
    name: 'required|min:3|max:10',
    email: 'required|email',
    lastName: 'required_if:name,naomi',
    password: 'required|min:8|max:25|confirmed:password_confirmation',
    password_confirmation: 'required'
};

let validate = new Validator(rules);

form = {
    name: 'naomi',
    email: 'olagmailcom',
    password: 'passcom123',
    lastName: null,
    password_confirmation: 'passcom12',
};

validate.validate('name', form.name).then( (success) => {
    // success is a true/false value. If validation pass
    if(success){
        //do something
    }else{
        //do something
    }
});
validate.validate('email', form.email);
validate.validate('password', form.password);
validate.validateAll(form);
const {errors} = validate;


console.log( errors.has('name'), errors.first('name'));
console.log( errors.has('email'), errors.first('email'));
console.log( errors.has('lastName'), errors.first('lastName'));
console.log( errors.has('password'), errors.first('password'));
