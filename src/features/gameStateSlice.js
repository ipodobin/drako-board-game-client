import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    dwarfs: {
        warrior: {
            alive: false,
            position: {x: 10, y: 10, z: 10}
        },
        netter: {
            alive: false,
            position: {x: 10, y: 10, z: 10}
        },
        crossbowman: {
            alive: false,
            position: {x: 10, y: 10, z: 10}
        }
    },
    drako: {
        dragon: {
            alive: false,
            position: {x: 0, y: 0, z: 0}
        }
    },
}
const gameStateSlice = createSlice({
    name: 'gameState',
    initialState: initialState,
    reducers: {
        initGame: (state, action) => {
            console.log('action:', action);
            state.dwarfs = action.payload.dwarfs
            state.drako = action.payload.drako
            state.role = action.payload.role
        },
        move: (state, action) => {
            console.log('action:', action);
        },
    },
})

export const {initGame, move} = gameStateSlice.actions
export default gameStateSlice.reducer