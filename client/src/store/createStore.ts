import { combineReducers, configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articles";
import tagsReducer from "./tags";
import usersReducer from "./users";

const rootReducer = combineReducers({
    users: usersReducer,
    tags: tagsReducer,
    articles: articlesReducer
});

function createStore () {
    return configureStore({
        reducer: rootReducer
    });
};

const store = createStore();

export default store;
