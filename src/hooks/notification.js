import { useContext } from 'react'
import NotificationContext from '../NotificationContext'


export const useNotificationValue = () => {
    return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
    return useContext(NotificationContext)[1]
}

let timeoutID = null

export const createNotification = (dispatch, message) => {
    clearTimeout(timeoutID)
    dispatch({ 
        type: 'SHOW', 
        payload: message 
        })

    timeoutID = setTimeout(() => {
    dispatch({ type: 'REMOVE' })
    }, 5000)
}