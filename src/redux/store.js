import {configureStore} from "@reduxjs/toolkit";
import eventsReducer from "./reducers/eventsReducer";

export const store = configureStore({
    reducer: {
        events: eventsReducer
    }
});