import { createReducer } from '@reduxjs/toolkit';
import getDatabaseList from './getDatabaseList';
import addDatabase from './addDatabase';

export interface DataModelState {
    databaseList: {name: string}[];
    classList: string[];
    databaseAddition: {
        pending: boolean,
        lastValue: string | null;
    }
}

const initialState = {
    databaseList: [],
    classList: [],
    databaseAddition: {
        pending: false,
        lastValue: null
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

export default reducer;