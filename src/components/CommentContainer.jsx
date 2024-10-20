import { useEffect, useState } from 'react'
import Comment from './Comment'
import { otherComments } from '../db'

const CommentContainer = () => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const localStorageComments = JSON.parse(localStorage.getItem('comments')) || []
    const allComments = [...otherComments, ...localStorageComments]
    const sortedComments = allComments.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
    setComments(sortedComments)
  // eslint-disable-next-line
  }, [])

  const handleUpdateComment = (id, updatedText) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, text: updatedText, edited: true } : comment
    )
    setComments(updatedComments)
    localStorage.setItem('comments', JSON.stringify(updatedComments))
  }

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id)
    setComments(updatedComments)
    localStorage.setItem('comments', JSON.stringify(updatedComments))
  }

  const handleAddReply = (commentId, replyText) => {
    const newReply = {
      id: Date.now().toString(),
      text: replyText,
      authorFirstName: 'FirstName', // Replace with actual user data
      authorLastName: 'LastName',
      createdOn: new Date(),
      replies: [],
    }
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment
    )
    setComments(updatedComments)
    localStorage.setItem('comments', JSON.stringify(updatedComments))
  }


  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onUpdateComment={handleUpdateComment}
          onDeleteComment={handleDeleteComment}
          onAddReply={handleAddReply}
        />
      ))}
    </>
  )
}

export default CommentContainer
