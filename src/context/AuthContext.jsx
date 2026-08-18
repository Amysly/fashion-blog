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
  const [loading, setLoading] = useState(true); 


   useEffect(() => {
    const loadAuth = async () => {
      try {
        const session = await refreshAccessToken();
        if (!session) return;

        const { accessToken: newToken, user } = session;
        setAccessToken(newToken);
        setUser(user);
      } catch (err) {
        console.error('Failed to refresh access token', err);
      } finally {
        setLoading(false); 
      }
    };
    loadAuth();
  }, []);

  useEffect(() => {
    setStoredAccessToken(accessToken);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    return useContext(AuthContext)
    
}
    

   
 

 
