import { configureStore } from "@reduxjs/toolkit";
import bucketSlice from "../features/buckets/bucketSlice";
import globalSlice from "../features/global/globalSlice";
import historySlice from "../features/history/historySlice";

/** Configuring the Store */

export const store = configureStore({
  reducer: {
    global: globalSlice,
    buckets: bucketSlice,
    history: historySlice,
  },
});
