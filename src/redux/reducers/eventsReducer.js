import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    eventsData: [
        {
            title: 'Практика 2222',
            createdAt: '01.05.22',
            beginning_date: '05.05.22',
            ending_date: '07.07.07',
            type: 'Производственная',
            course: 2,
            description: 'Это тестовое описание практики. Производственная практика — практическая часть учебного процесса ' +
                'подготовки квалифицированных рабочих и специалистов, проходящая, как правило, на различных ' +
                'предприятиях в условиях реального производства.'
        }
    ]
}

const eventsSlice = createSlice({
    name: 'eventItems',
    initialState,
    reducers: {}
})

export const selectEvent = (state) => {
    return state.events.eventsData;
}

export default eventsSlice.reducer;