import { ACTIONS } from '../context/WorkoutContext'
import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'

export default function useLogout() {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()
    const logout = () => {
        localStorage.removeItem('user')
        workoutsDispatch({ type: ACTIONS.SET_WORKOUTS, payload: [] })
        dispatch({ type: ACTIONS.LOGOUT })
    }

    return { logout }

}
