import { createContext, useEffect, useState } from "react"


const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isTokenExpired = (tokenExpiration) => {
    if(!tokenExpiration) return true;
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - tokenExpiration.getTime();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Un día en milisegundos

    return timeDifference >= oneDayInMilliseconds;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration') || null
    if (token && tokenExpiration) {
      setIsLoggedIn(true);
      const expirationDate = new Date(parseInt(tokenExpiration, 10));
      if (isTokenExpired(expirationDate)) {
        logout();
      }
    }
  }, []);
  
  const login = async(token, tokenExpiration) => {
    localStorage.setItem('token', token)
    localStorage.setItem('tokenExpiration', tokenExpiration.getTime().toString())
    setIsLoggedIn(true);
  }
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };