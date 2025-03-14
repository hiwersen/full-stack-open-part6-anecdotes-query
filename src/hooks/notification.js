import { useContext } from "react"
import NotificationContext from "../components/NotificationContext"

export const useNotificationValue = () => {
    return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
    return useContext(NotificationContext)[1]
}

let timeoutID = null
export const useCreateNotification = () => {
    const dispatch = useContext(NotificationContext)[1]

    return notification => {
        clearTimeout(timeoutID)
        dispatch({ type: 'SHOW', payload: notification })
        timeoutID = setTimeout(() => {
            dispatch({ type: 'REMOVE' })
        }, 5 * 1e3)
    }
}