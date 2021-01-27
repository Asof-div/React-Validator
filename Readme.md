#Input Validator

This is an input validator inspired by laravel

#Features

1. Required
2. Min
3. Max
4. Email
5. Required If
6. Confirmed 

#Example

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
    lastName: '',
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
validate.validate('lastName', form.lastName);
validate.validate('password', form.password);
validate.validateAll(form).then( (success) => {
    // success is a true/false value. If validation pass
    if(success){
        //do something
    }else{
        //do something
    }
});


// check error
const {errors} = validate;

errors.any() // return true if any field failed validation rule
errors.has('name')  // return true if name failed validation rule or false if no error
errors.first('name'); // return error message or indefined where error does not exists