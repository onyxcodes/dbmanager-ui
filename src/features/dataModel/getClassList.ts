import { createAsyncThunk } from '@reduxjs/toolkit';
import DbManager from '../../utils/dbManager';

const action = createAsyncThunk(
    'getClassList',
    async (dbName: string, thunkApi ) => {
        let db = new DbManager(dbName);
        db = await DbManager.build(db);
        // consider mapping result with only the name of classes
        return await db.getAllClasses();
    }
)

export default action;