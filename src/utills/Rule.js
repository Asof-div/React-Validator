class Rule {
    constructor(msg = '') {
        this.rule = 'base-rule'
        this.fieldName = '';
        this.msg = msg;
        this.hasError = false;
    }

    setMessage(msg){
        this.msg = msg;
    }

    getMessage() {
        return this.msg;
    }

    getError(){
        return this.hasError ? {msg: this.msg.ucFirst(), field: this.fieldName, rule: this.rule} : undefined;
    }

}

module.exports = { Rule };
