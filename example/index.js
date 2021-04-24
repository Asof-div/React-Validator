const Validator  = require("../src");

let rules = {
    name: "required|min:3|max:10|alpha",
    username: "required|min:3|max:10|alpha_num",
    email: "required|email",
    lastName: "required_if:name,naomi",
    password: "required|min:8|max:25|alpha_num_punct|confirmed:password_confirmation",
    password_confirmation: "required",
    pin: "required"

};


let validate = new Validator(rules);

form = {
    name: "naomi",
    email: "olagmailcom",
    password: "passcom123@",
    lastName: null,
    password_confirmation: "passcom123@",
    pin: 2,
    username: "a"
};

validate.validate("name", form.name).then( (success) => {
    // success is a true/false value. If validation pass
    if(success){
        //do something
    }else{
        //do something
    }
});
validate.validate("email", form.email);
validate.validate("password", form.password);
validate.validateAll(form);
const {errors} = validate;


console.log( errors.has("name"), errors.first("name"));
console.log( errors.has("email"), errors.first("email"));
console.log( errors.has("lastName"), errors.first("lastName"));
console.log( errors.has("password"), errors.first("password"));
console.log( errors.has("username"), errors.first("username"));
console.log( errors.has("pin"), errors.first("pin"));
