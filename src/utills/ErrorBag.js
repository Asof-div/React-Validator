class ErrorBag {

    constructor(attributes) {
        this.items = [];
        this.attributes = attributes;
    }

    add(error={field:"", msg:"", rule:""}){
        if(!error) return 
        const item = this.items.find(item => item.field === error.field && error.msg)
        if(item){
            
            this.update(item.id, error);

        }else if(error.field && error.msg && error.msg.length > 1 && error.field.length > 0){
            let id = '';
            if(this.attributes.indexOf(error.field) >= 0){
                id = this.attributes.indexOf(error.field) + 1;
            }else{
                this.attributes = [...this.attributes, error.field];
                id = this.attributes.indexOf(error.field) + 1;
            }
            this.items = [...this.items, {...error, id}];
        }

    }

    all(){

    }

    any(){
        this.attributes.forEach(val => {
            if(this.has(val)){
                return true;
            }
        });
        return false;
    }

    clear() {
        this.items = [];
    }

    count(){
        return this.items.length;
    }

    first(field) {
        const item = this.items.find(item => item.field === field)
        if(item){
            return item.msg;
        }
        return undefined;
    }

    firstById(id) {
        const item = this.items.find(item => item.id === id)
        if(item){
            return item.msg;
        }
        return undefined;
    }

    firstByRule(field, rule) {
        const item = this.items.find(item => item.field === field && item.rule === rule)
        if(item){
            return item.msg;
        }
        return undefined;
    }

    firstNot(field, rule) {
        const item = this.items.find(item => item.field === field && item.rule === rule)
        if(item){
            return item.msg;
        }
        return undefined;
    }

    has(field){
        const item = this.items.find(item => item.field === field)
        return item ? true : false;
    }
    
    remove(field){
        const items = this.items.filter(obj => obj.field !== field);
        this.items = items;
        return true;
    }

    removeById(id){
        const items = this.items.filter(obj => obj.id !== id);
        this.items = items;
        return true;
    }
    
    update(id, error){
        const items = this.items.map(obj => {
            if (obj.id === id) {
                return { ...obj, ...error, id };
            }
            return obj;
        });
        this.items = items;
    }

}

module.exports = { ErrorBag };
