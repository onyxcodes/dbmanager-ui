import { createAsyncThunk } from '@reduxjs/toolkit';
import LocalStorageList from '../../utils/localStorage/localStorage';

const loadDatabaseList = () => {
    const databaseList = new LocalStorageList('databaseList').get();
    return databaseList;
}

// Consider moving to utils/indexedDB
const checkIndexedDb = ( name: string ): Promise<Boolean> => {
    return new Promise( (resolve, reject) => {
        const DBOpenRequest = window.indexedDB.open(name);

        DBOpenRequest.onerror = (event) => {
            console.log(`Error while fetching indexedDB with name: ${name}`);
            reject(false);
        };
          
        DBOpenRequest.onsuccess = (event) => {
            let objectStoreNames = DBOpenRequest.result.objectStoreNames;
            resolve(Boolean(objectStoreNames.length));
        }

    });
}

const deleteIndexedDB = ( name: string ) => {
    return new Promise( (resolve, reject) => {
        const DBDeleteRequest = window.indexedDB.deleteDatabase(name);

        DBDeleteRequest.onerror = (event) => {
            console.log(`Error while fetching indexedDB with name: ${name}`);
            reject(false);
        };
          
        DBDeleteRequest.onsuccess = (event) => {
            resolve(true);
        }

    });
}

const deletePouchDB = async ( name: string ) => {
    let prefixedName = '_pouch_'.concat(name);
    let result = await deleteIndexedDB(prefixedName);
    if (result) {
        let databaseList = new LocalStorageList('databaseList');
        databaseList.removeElement(name);
        return result;
    } // else checkLogs
}

const checkPouchDB = ( name: string ) => {
    let prefixedName = '_pouch_'.concat(name);
    return checkIndexedDb(prefixedName);
}

const checkPouchDBs = ( list: (string | number)[] ): Promise<{name: string}[]> => {
    return new Promise( async (resolve, reject) => {
        let processedList = [],
            okList = [];
        for ( var i = 0; i < list.length ; i++ ) {
            let databaseName = list[i];
            // TODO: extract into a promise that exists only when finished
            if ( await checkPouchDB(""+databaseName) ) {
                okList.push({
                    name: ''+databaseName
                });
            } else {
                let clearedUnused = await deletePouchDB(''+databaseName);
                console.log(`Database with name "${databaseName}" does not exists`, clearedUnused);
            }
            processedList.push(''+databaseName);
        }
        if ( processedList.length === list.length ) resolve(okList)
    });
}

const action = createAsyncThunk(
    'getDatabaseList',
    async ( arg: boolean = true, thunkApi ) => {
        let databaseListLS = loadDatabaseList(),
            databaseList = await checkPouchDBs(databaseListLS);
        
        return databaseList;
    }
);

export default action;