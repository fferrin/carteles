type Notification = {
  show: boolean
  message: string
}

type Action = {
  type: string
  data: string
}

const initialValue: Notification = { show: false, message: '' }

const notificationReducer = (state: Notification = initialValue, action: Action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { show: true, message: action.data }
    case 'UNSET_NOTIFICATION':
      return { show: false, message: '' }
    default:
      return state
  }
}

export const setNotification = (message: string) => {
  return {
    type: 'SET_NOTIFICATION',
    data: message,
  }
}

export const unsetNotification = () => {
  return {
    type: 'UNSET_NOTIFICATION',
  }
}

export default notificationReducer
