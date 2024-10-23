import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { seedComments } from '../seed-db'

const CommentsContext = createContext()

export const CommentsProvider = ({ children }) => {

  const loadInitialComments = () => {
    try {
      const savedComments = localStorage.getItem('comments')
      const parsedComments = savedComments ? JSON.parse(savedComments) : []

      if (parsedComments.length === 0) {
        return [...seedComments].sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn))
      }
  
      return parsedComments.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn))
    } catch (error) {
      console.error(error)
      return seedComments
    }
  }

  const [comments, setComments] = useState(loadInitialComments)

  useEffect(() => {
    if (comments.length > 0) {
      try {
        localStorage.setItem('comments', JSON.stringify(comments))
      } catch (error) {
        console.error(error)
      }
    }
  }, [comments])

  const addComment = (newComment) => {
    setComments((prev) => [...prev, newComment])
  }

  const updateComment = (id, updatedText) => {
    setComments((prev) =>
      prev.map((comment) => (comment.id === id ? { ...comment, text: updatedText, edited: true } : comment))
    )
  }

  const deleteComment = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this comment?")
    if (isConfirmed) {
      setComments((prev) => prev.filter((comment) => comment.id !== id))
    }
  }

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch (error) {
      console.error('Error loading user from localStorage', error)
      return null
    }
  }, [])

  const addReply = (commentId, replyText) => {
    if (!currentUser) {
      console.error("User is not defined")
      return
    }

    const newReply = {
      id: Date.now().toString(),
      text: replyText,
      authorFirstName: currentUser.authorFirstName,
      authorLastName: currentUser.authorLastName,
      authorId: currentUser.authorId,
      createdOn: new Date(),
      edited: false,
      replies: [],
    }

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    )
  }

  const isAuthor = (authorId) => {
    return currentUser && currentUser.authorId === authorId
  }

  const providerValue = useMemo(() => ({
    comments,
    setComments,
    addComment,
    updateComment,
    deleteComment,
    addReply,
    isAuthor,
  // eslint-disable-next-line
  }), [comments, currentUser])

  return (
    <CommentsContext.Provider value={providerValue}>
      {children}
    </CommentsContext.Provider>
  )
}

export const useComments = () => {
  const context = useContext(CommentsContext)
  if (!context) {
    throw new Error('not in CommentsProvider')
  }
  return context
}
