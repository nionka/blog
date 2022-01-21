import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({

});

function createStore () {
    return configureStore({
        reducer: rootReducer
    });
};

const store = createStore();

export default store;
