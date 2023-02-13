import { TokenStorage } from "@/token-storage";

type Location = {
  lat: number
  lon: number
}

type UserState = {
  details: object
  accessToken: string
  refreshToken: string
  location: Location
}
type Action = {
  type: string
  data: UserState
}
const USER_DETAILS_KEY = 'userDetails'
const initialValue: UserState = {
  details: {},
// @ts-ignore
  accessToken: null,
// @ts-ignore
  refreshToken: null,
  location: { lat: 0, lon: 0 },
}

const userReducer = (state: UserState = initialValue, action: Action) => {
  switch (action.type) {
    case 'LOAD':
      return {
        ...state,
// @ts-ignore
        details: action.data.userDetails || null,
        location: action.data.location,
        accessToken: TokenStorage.getAccessToken(),
        refreshToken: TokenStorage.getRefreshToken(),
      }
    case 'UPDATE_USER_DETAILS':
// @ts-ignore
      return { ...state, details: action.data.userDetails || null }
    case 'SET_TOKENS':
      return { ...state, ...action.data }
    case 'SET_USER_DETAILS':
      localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(action.data))
      return { ...state, details: action.data }
    case 'LOGOUT':
      localStorage.removeItem(USER_DETAILS_KEY)
      TokenStorage.clear()
      return { ...initialValue, location: state.location }
    default:
      return state
  }
}

// @ts-ignore
export const setUserDetails = (userDetails) => {
  return {
    type: '' + '',
    data: userDetails,
  }
}

// @ts-ignore
export const setTokens = ({ accessToken, refreshToken }) => {
  return {
    type: 'SET_TOKENS',
    data: { accessToken, refreshToken },
  }
}

// export const loadUser = () => {
//   return async (dispatch) => {
//     const location = await getUserLocation()
//     const userDetails = await me()
//     dispatch({
//       type: 'LOAD',
//       data: { location, userDetails },
//     })
//     // TODO: Manera fea de ver si no hay user
//     if (!userDetails.email) dispatch(logout())
//   }
// }
//
// export const updateUserDetails = () => {
//   return async (dispatch) => {
//     const userDetails = await me()
//     dispatch({
//       type: 'UPDATE_USER_DETAILS',
//       data: { userDetails },
//     })
//   }
// }

export const logout = () => {
// @ts-ignore
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default userReducer