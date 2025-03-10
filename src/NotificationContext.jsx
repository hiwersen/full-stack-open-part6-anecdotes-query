import { useReducer, createContext } from 'react'


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

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[ notification, notificationDispatch ]} >
            { children }
        </NotificationContext.Provider>
    )
}

export default NotificationContext