import { configureStore } from '@reduxjs/toolkit';
import dataModel, { DataModelState } from './features/dataModel';
import ui, { UIState } from './features/ui';

export type StoreState = {
    dataModel: DataModelState;
    ui: UIState;
}

export const store = configureStore({
  reducer: {
    dataModel,
    ui
  },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     })
});