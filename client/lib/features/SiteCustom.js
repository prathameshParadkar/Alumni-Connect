import { createSlice } from "@reduxjs/toolkit";

export const siteCustomSlice = createSlice({
    name: "siteCustom",
    initialState: {
        sidebarOpen: true,
    },
    reducers: {
        setSidebarOn: (state) => {
            state.sidebarOpen = true;
        },
        setSidebarOff: (state) => {
            state.sidebarOpen = false;
        },
    },
});

export const { setSidebarOff, setSidebarOn } = siteCustomSlice.actions;