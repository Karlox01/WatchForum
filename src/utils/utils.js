export const shouldRefreshToken = () => {
    return !!localStorage.getItem('refreshTokenTimestamp')
  }


export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimestamp')
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}