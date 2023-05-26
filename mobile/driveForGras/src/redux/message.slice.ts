import { createSlice } from "@reduxjs/toolkit"

const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: "Initial message"
  },
  reducers: {}
})

export default messageSlice.reducer