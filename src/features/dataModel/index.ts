import { createReducer } from '@reduxjs/toolkit';
import getDatabaseList from './getDatabaseList';
import getClassList from './getClassList';
import addDatabase from './addDatabase';
import addClass from './addClass';
import loadDatabase from './loadDatabase';
import DbManager from '../../utils/dbManager';

export interface DataModelState {
    databaseList: {name: string}[];
    classList: {name: string}[];
    databaseAddition: {
        pending: boolean,
        lastValue: string | null;
    },
    classAddition: {
        pending: boolean,
        lastValue: string | null;
    }
    currentDatabase: {
        pending: boolean;
        name: string | null;
        info: {
            "db_name": string,
            "doc_count": number,
            "update_seq": number
        } | null;
    }
}

const initialState = {
    databaseList: [],
    classList: [],
    databaseAddition: {
        pending: false,
        lastValue: null
    },
    classAddition: {
        pending: false,
        lastValue: null
    },
    currentDatabase: {
        pending: false,
        name: null,
        info: null
    }
} as DataModelState;

const reducer = createReducer( initialState, builder => {
    builder
        .addCase(getDatabaseList.pending, (state, action) => {
            // TODO: change to debug
            console.log('Pending request for getDatabaseList');
        })
        .addCase(getDatabaseList.fulfilled, (state, action) => {
            // TODO: create action that loads database (name) list from localstorage
            state.databaseList = action.payload;
            // payload should be the array retrieved from localStorage
            // therefore set it to thisState.databaseList
        })
        .addCase(addDatabase.pending, (state, action) => {
            // TODO: create async action that creates database (through DbManager)
            state.databaseAddition.pending = true;
            state.databaseAddition.lastValue = initialState.databaseAddition.lastValue;
        })
        .addCase(addDatabase.fulfilled, (state, action) => {
            state.databaseAddition.pending = initialState.databaseAddition.pending;
            state.databaseAddition.lastValue = action.payload;
        })
        .addCase(loadDatabase.pending , (state, action) => {
            state.currentDatabase = initialState.currentDatabase;
            state.currentDatabase.pending = initialState.currentDatabase.pending;
        })
        .addCase(loadDatabase.fulfilled, (state, action) => {
            state.currentDatabase.pending = initialState.currentDatabase.pending;
            state.currentDatabase.name = action.payload.name;
            state.currentDatabase.info = action.payload.info;
        })
        .addCase(getClassList.pending, (state, action) => {
            console.log('Pending request for getClassList')
        })
        .addCase(getClassList.fulfilled, (state, action) => {
            state.classList = action.payload;
        })
        .addCase(addClass.pending, (state, action) => {
            state.classAddition.pending = true;
            state.classAddition.lastValue = initialState.classAddition.lastValue;
        })
        .addCase(addClass.fulfilled, (state, action) => {
            state.classAddition.pending = initialState.classAddition.pending;
            state.classAddition.lastValue = action.payload;
        })
        // .addCase("removeDatabase", (state, action) => {
        //     // TODO2: create/refine prototype method on dbManager to delete database
        //     // TODO2: create async action that deletes database (through DbManager)
        //     let payload = action.payload;
        //     // payload should be the dbName, therefore push it thisState.databaseList;
        // })
        // .addCase("setActiveDatabase", (state, action) => {
        //     // TODO33: create async action that deletes database (through DbManager)
        //     let payload = action.payload;
        //     // payload should be the dbName, therefore push it thisState.databaseList;
        // })

});

export { loadDatabase, addClass, addDatabase, getDatabaseList, getClassList };
export default reducer;