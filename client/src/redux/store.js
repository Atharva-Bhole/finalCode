import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import trainerReducer  from "./slices/trainer.slice";
import storage from "redux-persist/lib/storage";
import { subjectReducer } from "./slices/subject.slice";
const trainerPersistConfig = {
    key : "trainer",
    storage : storage,
    version : 1,
};

const store = configureStore({
    reducer : {
        trainer : persistReducer(trainerPersistConfig, trainerReducer),
        subject : subjectReducer,
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false,
    }),
});

export default store;
export const persistor = persistStore(store);