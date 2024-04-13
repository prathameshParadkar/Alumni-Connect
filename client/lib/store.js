import { configureStore } from '@reduxjs/toolkit'
import { siteCustomSlice } from './features/SiteCustom'

export const makeStore = () => {
    return configureStore({
        reducer: {
            // Add reducers here
            siteCustom: siteCustomSlice.reducer,
        },
    })
}