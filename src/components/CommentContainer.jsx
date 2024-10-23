import { useUser } from '../context/UserContext'
import { useComments } from '../context/CommentsContext'
import Comment from './Comment'
import CommentCreateContainer from './CommentCreateContainer'

const CommentContainer = () => {
  const { user } = useUser()
  const { comments, setComments } = useComments()

  const handleAddComment = (newComment) => {
    setComments((prevComments) => {
      const addedComments = [...prevComments, newComment]
      return addedComments.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn))
    })
  }

  const handleUpdateComment = (id, updatedText) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, text: updatedText, edited: true } : comment
    )
    setComments(updatedComments)
  }

  const handleDeleteComment = (id) => {
    const deletedComments = comments.filter((comment) => comment.id !== id)
    setComments(deletedComments)
  }

  const handleAddReply = (commentId, replyText, user) => {
    const newReply = {
      id: Date.now().toString(),
      text: replyText,
      authorFirstName: user.authorFirstName,
      authorLastName: user.authorLastName,
      authorId: user.authorId,
      createdOn: new Date(),
      replies: [],
    }
  
    const replyComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment
    )
    setComments(replyComments)
  }  

  return (
    <>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            {...comment}
            user={user}
            isAuthor={user?.authorId === comment.authorId}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
            onAddReply={(replyText) => handleAddReply(comment.id, replyText, user)}
          />
        ))
      ) : (
        <p>No comments available</p>
      )}
      <div className="absolute w-full bottom-0 left-0">
        <CommentCreateContainer onAddComment={handleAddComment} />
      </div>
    </>
  )
}

export default CommentContainer
