import { createAsyncThunk } from '@reduxjs/toolkit';
import getDatabaseList from './getDatabaseList';
import DbManager from '../../utils/dbManager';
import LocalStorageList from '../../utils/localStorage/localStorage';

const action = createAsyncThunk(
    'addDatabase',
    async ( name: string, thunkApi ) => {
        let db = new DbManager(name);
        db = await DbManager.build(db);
        let databaseList = new LocalStorageList('databaseList').addElement(db.getName());
        await thunkApi.dispatch(getDatabaseList(true));
        return name;
    }
)

export default action;