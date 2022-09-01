import { createAsyncThunk } from "@reduxjs/toolkit";
import DbManager from "../../utils/dbManager";

const action = createAsyncThunk(
    'loadDatabase',
    async (databaseName: string, thunkApi) => {
        let db = new DbManager(databaseName);
        db = await DbManager.build(db);
        let info = await db.getInfo();
        // TODO: test adding a sleep to see spinning on DatabaseAccordion comp
        return {name: databaseName, info: info};
    }
);

export default action;