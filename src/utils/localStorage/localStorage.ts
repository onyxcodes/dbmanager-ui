
class LocalStorageList {
    list: (number | string)[];
    key: string;
    constructor( key = "myList", list?: (number | string)[] ) {
        if ( !list ) { // NOTE: should consider also case `list === []`
            this.list = this.get();
        } else {
            this.list = this.update(list);
        }
        this.key = key;
    }
    
    get() {
        let list: (number | string)[] = [];
        try {
            let _list = localStorage.getItem(this.key);
            if (_list) list = JSON.parse(_list);
        } catch (e) {
            console.log("get - problem while fetching or parsing list", e);
        }
        return list;
    }

    update( list: (number | string)[] ) {
        let listStr: string =  JSON.stringify(list)
        localStorage.setItem(this.key, listStr);
        this.list = list;
        return this.list;
    }

    addElement( el: number | string ) {
        if (el) {
            let list = this.get();
            if ( !list.includes(el) ) {
                list.push(el);
                this.update(list);
            } else console.log("addElement - attention, element `"+el+"` already present", list);
            return list;
        } else throw new Error("addElement - missing element argument");
    }

    removeElement(el: number | string) {
        if (el) {
            let list = this.get();
            let found = false;
            list = list.filter( element => {
                if (!found) found = element === el;
                return element !== el;
            });
            if ( found ) {
                this.update(list);
            } else console.log("removeElement - attention, element `"+el+"` was not found", list);
            return list;
        } else throw new Error("removeElement - missing element argument");
    }
}

export default LocalStorageList;