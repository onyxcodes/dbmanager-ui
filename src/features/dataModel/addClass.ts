import { createAsyncThunk } from '@reduxjs/toolkit';
import DbManager from '../../utils/dbManager';
import Class from '../../utils/dbManager/Class';

const action = createAsyncThunk(
    'addClass',
    async ( args: {
        dbName: string;
        className: string;
        // parentClass: string
    }, thunkApi ) => {
        let db = new DbManager(args.dbName);
        db = await DbManager.build(db);
        let newClass = new Class(db, args.className, 'class');
        newClass = await Class.build(newClass);
        // TODO: consider running a getClassList to update state ref
        return args.className;
    }
)

export default action;