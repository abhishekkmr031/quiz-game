import { commonModel } from "./commonModel";
import { commonGameUtilityCollectionClass } from "./myclass";

export class nameClass extends commonGameUtilityCollectionClass {
    key: string = "name";

    constructor() {
        super();
        this.setCollection(this.key);
    }

    addNew(value: string){
        this.push(this.key, value);
    }

    edit(value:commonModel){
        this.update(this.key, value);
    }

    remove(value:commonModel){
        this.delete(this.key, value);
    }
}