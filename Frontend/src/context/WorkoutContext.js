import { createContext, useReducer } from 'react'

export const ACTIONS = {
    SET_WORKOUTS: 'SET_WORKOUTS',
    ADD_WORKOUT: 'ADD_WORKOUT',
    DELETE_WORKOUT: 'DELETE_WORKOUT',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
}

export const workoutContext = createContext()

const workoutReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_WORKOUTS:
            return {
                workouts: action.payload
            }
        case ACTIONS.ADD_WORKOUT:
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case ACTIONS.DELETE_WORKOUT:
            return {
                workouts: state.workouts.filter(workout => workout._id !== action.payload._id)
            }


        default:
            return state
    }
}

export const WorkoutContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: null
    })
    return (
        <workoutContext.Provider
            value={{
                dispatch,
                workouts: state.workouts
            }}
        >
            {children}
        </workoutContext.Provider>
    )

}


