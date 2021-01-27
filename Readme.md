##Input Validator

This is an input validator inspired by laravel

###Features

-   Alpha 
-   AlphaNum
-   AlphaNumPunct
-   Confirmed
-   Email
-   File
-   In
-   Max
-   Min
-   NotIn
-   Number
-   Required
-   Required If
-   Same

###Example

```
let rules = {
    name: "required|min:3|max:10|alpha",
    username: "required|min:3|max:10|alpha_num",
    email: "required|email",
    lastName: "required_if:name,naomi",
    password: "required|min:8|max:25|alpha_num_punct|confirmed:password_confirmation",
    password_confirmation: "required",
    pin: "required|number"
};

let validate = new Validator(rules);

form = {
    name: "naomi",
    email: "olagmailcom",
    password: "passcom123@",
    lastName: null,
    password_confirmation: "passcom123@",
    pin: "2333",
    username: "ola"
};

validate.validate("name", form.name).then( (success) => {
    * success is a true/false value. If validation pass *
    if(success){
        * do something *
    }else{
        * do something *
    }
});

validate.validate("email", form.email);
validate.validate("lastName", form.lastName);
validate.validate("password", form.password);


validate.validateAll(form).then( (success) => {
    * success is a true/false value. If validation pass *
    if(success){
        * do something *
    }else{
        * do something *
    }
});


## check error
const {errors} = validate;

errors.any() * return true if any field failed validation rule*

errors.has('name') * return true if name failed validation rule or false if no error *

errors.first('name'); * return error message or indefined where error does not exists*


console.log( errors.has("email"), errors.first("email"));
console.log( errors.has("lastName"), errors.first("lastName"));
console.log( errors.has("password"), errors.first("password"));
console.log( errors.has("username"), errors.first("username"));
console.log( errors.has("pin"), errors.first("pin"));

```