"use client"
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import { authReducer } from "./features/auth.slice";
import { projectReducer } from "./features/project.slice";
import storage from "./storage";
import createProjectReducer from "./features/create.project.slice";
import { datastoreReducer } from "./features/datastore.slice";
import { feedbackReducer } from "./features/project.feedback.slice";
import { testimonialReducer } from "./features/testimonial";


const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    createProject: createProjectReducer,
    datastoreReducer: datastoreReducer,
    feedbackReducer: feedbackReducer,
    testimonialReducer: testimonialReducer,
    // Add other reducers here as needed
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "project", "createProject", "datastoreReducer", "feedbackReducer", "testimonialReducer"],
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
