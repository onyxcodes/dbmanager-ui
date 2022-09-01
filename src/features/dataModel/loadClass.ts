import { createAsyncThunk  } from '@reduxjs/toolkit';
import DbManager from '../../utils/dbManager';

const action = createAsyncThunk(
    'loadClass',
    async ( args: {
        dbName: string,
        className: string
    }, thunkApi ) => {
        let db = new DbManager(args.dbName);
        db = await DbManager.build(db);
        let currentClass = await db.getClass(args.className);
        return currentClass;
    }
);

export default action;