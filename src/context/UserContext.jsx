import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {

  const loadUser = () => {
    try {
      const savedUser = localStorage.getItem('user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const [user, setUser] = useState(loadUser())

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('user', JSON.stringify(user))
      } catch (error) {
        console.error( error)
      }
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const providerValue = useMemo(() => ({ user, setUser }), [user])

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('not in UserProvider')
  }
  return context
}
