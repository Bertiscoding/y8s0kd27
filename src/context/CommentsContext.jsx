import { createContext, useContext, useEffect, useState } from 'react'
import { seedComments } from '../seed-db'

const CommentsContext = createContext()

export const CommentsProvider = ({ children }) => {

  const getComments = () => {
    const savedComments = localStorage.getItem('comments')
    return savedComments ? [...seedComments, ...JSON.parse(savedComments)] : seedComments
  }

  const [comments, setComments] = useState(() => getComments())
  
  useEffect(() => {
    if (comments && comments.length > 0) {
      localStorage.setItem('comments', JSON.stringify(comments))
    }
  }, [comments])

  return (
    <CommentsContext.Provider value={{ comments, setComments }}>
      {children}
    </CommentsContext.Provider>
  )
}

export const useComments = () => useContext(CommentsContext)

