 import React,{  createContext,
  useContext,
  useState,
  useEffect} from 'react'
  import { refreshAccessToken } from '../api/Auth'
  import { setStoredAccessToken } from '../lib/authToken'
 
    const AuthContext = createContext()

export function AuthProvider({children}) {
    const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

 useEffect(() => {
    const loadAuth = async () => {
      try {
        const { accessToken: newToken, user } = await refreshAccessToken();
        setAccessToken(newToken);
        setUser(user);
      } catch (err) {
        console.log('Failed to refresh access token', err);
      }
    };
    loadAuth();
}, []);

useEffect(() => {
    setStoredAccessToken(accessToken);
}, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
    return useContext(AuthContext)
    
}
    

   
 

 