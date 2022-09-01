import DbManager from '..';
import Attribute from '../Attribute'
// import DbManager from '..';

const CLASS_TYPE = "class";
const SUPERCLASS_TYPE = "superclass";
const CLASS_TYPES = [CLASS_TYPE, SUPERCLASS_TYPE];

class Class {
    db?: DbManager | null;
    name: string;
    type: 'class' | 'superclass';
    title: string;
    attributes: Attribute[];
    id: string | null;
    parentClass: null;

    constructor(
        db: DbManager | null = null,
        name: string,
        type: 'class' | 'superclass' = CLASS_TYPE,
        title = name,
        parentClassName = null
    ) {
        this.name = name,
            this.title = title,
            this.type = type,
            this.attributes = [],
            this.db = null,
            this.id = null,
            this.parentClass = null;
        if ( db ) {
            this.db = db;
        }
    }


    static async build( classObj: Class ) {
        let db = classObj.getDb();
        if ( db ) {
            // if (parentClassName) this.setParentClass(parentClassName);
            let id = await db.addClass(classObj);
            classObj.setId(id);
            return classObj;
        } else {
            throw new Error("Missing db configuration");
        }

    }

    setId( id: string ) {
        if ( id ) this.id = id;
        else throw Error("Missing id");
    } 

    getName() {
        return this.name;
    }

    getDb() {
        return this.db;
    }

    getTitle() {
        return this.title;
    }

    getType() {
        return this.type;
    }

    getId() {
        return this.id;
    }

    getModel() {
        let model: {
            name?: string;
            description?: string;
            schema?: {}[];
            type?: string,
        } = {};

        model["name"] = this.getName();
        model["description"] = this.getTitle();
        model["schema"] = [];
        model["type"] = this.getType();
        // iterate over attributes and append their model
        for ( let attribute of this.getAttributes() ) {
            let attributeModel = attribute.getModel();
            model["schema"].push( attributeModel );
        }
        return model;
    }

    // TODO: should be no longer needed
    setType( type: 'class' | 'superclass' ) {
        this.type = type;
        // return this?
    }

    // TODO
    // async getSuperClassIfExists( superClassName ) {
    //     let db = this.getDb();
    //     let schema = await db.getClassModel(SUPERCLASS_TYPE, superClassName);
    //     return null; // TODO: change into superclass object
    // }

    // async setParentClass( superClassName ) {
    //     let parentClass = await this.getSuperClassIfExists(superClassName);
    //     if ( parentClass ) {
    //         // ereditate all attributes
    //         // parentClass.getAttributes()
    //         this.parentClass = parentClass;
    //     }
    // }


    getAttributes( ...names: string[] ) {
        let attributes = [ ];
        for ( let attribute of this.attributes ) {
            if ( names.length > 0 ) {
                // filter with given names
                for ( let name of names ) {
                    // match?
                    if ( name != null && attribute.getName() == name ) {
                        return [ attribute ];
                    } 
                }
            } else attributes.push(attribute); // no filter, add all
        }
        return attributes
    }

    hasAllAttributes( ...names: string[] ) {
        let result = false;
        let attributes = this.getAttributes(...names);
        for ( let attribute of attributes ) {
            result = names.includes(attribute.getName())
            if ( !result ) break;
        }
        return result;
    }

    hasAnyAttributes( ...names: string[] ) {
        let result = false;
        let attributes = this.getAttributes(...names);
        for ( let attribute of attributes ) {
            result = names.includes(attribute.getName())
            if ( result ) break;
        }
        return result;
    }

    // interface of hasAnyAttributes
    hasAttribute( name: string ) {
        return this.hasAnyAttributes( name )
    }

    /**
     * 
     * @param {Attribute} attribute 
     */
    async addAttribute( attribute: Attribute ) {
        try {
            let name = attribute.getName();
            if ( !this.hasAttribute(name) ) {
                this.attributes.push(attribute);
                // update class on db
                if ( this.db && this.id ) {
                    this.db.updateClass(this);
                    // TODO: Check if this class has subclasses
                    // if ( this.class ) 
                }
                return this; // return class object
            } else throw Error("Attribute with name "+name+" already exists within this Class")
        } catch (e) {
            throw Error(''+e);
        }
    }

    async addNewAttribute( name: string, type: string ) {
        let attribute = new Attribute(this, name, type);
        await this.addAttribute(attribute);
    }
}


export default Class;