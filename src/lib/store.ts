"use client"
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import { combineReducers } from "redux";
import { authSlice } from "./features/auth.slice";
import { projectReducer } from "./features/project.slice";
import storage from "./storage";
import createProjectReducer from "./features/create.project.slice";


const rootReducer = combineReducers({
    auth: authSlice.reducer,
    project: projectReducer,
    createProject: createProjectReducer,
    // Add other reducers here as needed
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

// Explicitly create and export the persistor
export const persistor = persistStore(store);

// Types for state and dispatch
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
