import { configureStore } from '@reduxjs/toolkit';
import dataModel, { DataModelState } from './features/dataModel';

export type StoreState = {
    dataModel: DataModelState;
}

export const store = configureStore({
  reducer: {
    dataModel
  },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     })
});