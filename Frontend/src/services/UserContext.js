import { createContext, useContext, useState, useEffect, useCallback } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const USER_LOCAL_STORAGE_KEY = "username";

  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        setUser(null)
      }
    }
  }, [])

  // Save or remove user on change
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    }
  }, [user])

  const login = useCallback((user) => {
    if (user.username.trim()) {
      setUser(user)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}


export function useAuth() {
    return useContext(UserContext)
}
