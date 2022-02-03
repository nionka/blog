import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";

const rootReducer = combineReducers({
    users: usersReducer
});

function createStore () {
    return configureStore({
        reducer: rootReducer
    });
};

const store = createStore();

export default store;
