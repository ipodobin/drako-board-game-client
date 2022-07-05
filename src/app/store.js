import { configureStore } from '@reduxjs/toolkit'
import gameStateReducer from '../features/gameStateSlice.js'

export default configureStore({
  reducer: {
    gameState: gameStateReducer
  },
})