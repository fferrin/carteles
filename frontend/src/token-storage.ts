import { isBrowser } from "@/utils";

const refreshToken = () => {}

const dummyStorage = {
  // eslint-disable-next-line no-unused-vars
// @ts-ignore
  getItem: (key) => {},
  // eslint-disable-next-line no-unused-vars
// @ts-ignore
  setItem: (key, value) => {},
  // eslint-disable-next-line no-unused-vars
// @ts-ignore
  removeItem: (key) => {},
}

const storage = isBrowser ? localStorage : dummyStorage

export class TokenStorage {
  static ACCESS_TOKEN = 'accessToken';
  static REFRESH_TOKEN = 'refreshToken';

  static getRefreshToken = () => {
    return storage.getItem(TokenStorage.REFRESH_TOKEN)
  };

  static getAccessToken = () => {
    return storage.getItem(TokenStorage.ACCESS_TOKEN)
  };

// @ts-ignore
  static storeAccessToken = (token) => {
    storage.setItem(TokenStorage.ACCESS_TOKEN, token)
  };

// @ts-ignore
  static storeRefreshToken = (refreshToken) => {
    storage.setItem(TokenStorage.REFRESH_TOKEN, refreshToken)
  };

  static isAuthenticated = () => {
    return this.getAccessToken() !== null
  };

  static getNewToken = async () => {
    const userRefreshToken = this.getRefreshToken()

    if (!userRefreshToken) return null

    return new Promise((resolve, reject) => {
// @ts-ignore
      refreshToken(userRefreshToken)
        // @ts-ignore
        .then((response) => {
          resolve(response.accessToken)
        })
        // @ts-ignore
        .catch((error) => {
          reject(error)
        })
    })
  };

  static clear = () => {
    storage.removeItem(TokenStorage.ACCESS_TOKEN)
    storage.removeItem(TokenStorage.REFRESH_TOKEN)
  };
}