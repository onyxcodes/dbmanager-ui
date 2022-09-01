import { createAction } from "@reduxjs/toolkit";
import { useLinkClickHandler } from "react-router-dom";

// TODO: consider accepting also another arg: replace:boolean = false
// by default it will attach given path to current one
// if true it will replace it entirely
const action = createAction('route', (to: string) =>{
    return { payload: { path: to } }
} );

export default action;