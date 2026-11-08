 import React,{  createContext,
  useContext,
  useState,
  useEffect} from 'react'
  import { refreshAccessToken } from '../api/Auth'
  import { setStoredAccessToken } from '../lib/authToken'
 
    const AuthContext = createContext()

export function AuthProvider({children}) {
    const [accessToken, setAccessTokenState] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const setAccessToken = (token) => {
    setStoredAccessToken(token);
    setAccessTokenState(token);
  };

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
    if (!accessToken || !user) return undefined;

    const refreshSession = async () => {
      try {
        const session = await refreshAccessToken();
        if (!session?.accessToken) {
          setAccessToken(null);
          setUser(null);
          return;
        }

        setAccessToken(session.accessToken);
        setUser(session.user);
      } catch (err) {
        console.error('Failed to refresh access token', err);
      }
    };

    const intervalId = window.setInterval(refreshSession, 8 * 60 * 1000);
    return () => window.clearInterval(intervalId);
  }, [accessToken, user]);

  useEffect(() => {
    const handleSessionExpired = () => {
      setAccessToken(null);
      setUser(null);
    };

    window.addEventListener('auth:session-expired', handleSessionExpired);
    return () => window.removeEventListener('auth:session-expired', handleSessionExpired);
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    return useContext(AuthContext)
    
}
    

   
 

 
