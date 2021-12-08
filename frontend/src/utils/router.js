import { setItem, clearKey } from "./storageManager";


const login = (history, userData) => {
  setItem('user_SF', userData.user);
  setItem('accessToken_SF', userData.accessToken);
  setItem('refreshToken_SF', userData.refreshToken);
  history.push('feed');
};

const logout = (history) => {
  clearKey('user_SF');
  clearKey('accessToken_SF');
  clearKey('refreshToken_SF');
  history.push('/home');
}

export { login, logout };