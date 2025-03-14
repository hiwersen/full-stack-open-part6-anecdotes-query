import { useReducer, createContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.payload
        case 'REMOVE':
            return null
        default:
            return state
    }
}

export const NotificationContextProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[ notification, notificationDispatch ]} >
            { children }
        </NotificationContext.Provider>
    )
}

export default NotificationContext