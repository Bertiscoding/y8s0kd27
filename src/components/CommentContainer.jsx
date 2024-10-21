import { useUser } from '../context/UserContext'
import { useComments } from '../context/CommentsContext'
import Comment from './Comment'
import CommentCreateContainer from './CommentCreateContainer'

const CommentContainer = () => {
  const { user } = useUser()
  const { comments, setComments } = useComments()
  console.log('Loaded comments in CommentContainer:', comments)
  const handleAddComment = (newCommentText) => {
    const newComment = {
      id: Date.now().toString(),
      text: newCommentText,
      authorFirstName: user.authorFirstName,
      authorLastName: user.authorLastName,
      authorId: user.authorId,
      createdOn: new Date(),
      replies: [],
    }
    setComments((prevComments) => [...prevComments, newComment])
  }

  const handleUpdateComment = (id, updatedText) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, text: updatedText, edited: true } : comment
    )
    setComments(updatedComments)
  }

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments)
  }

  const handleAddReply = (commentId, replyText) => {
    const newReply = {
      id: Date.now().toString(),
      text: replyText,
      authorFirstName: user.authorFirstName,
      authorLastName: user.authorLastName,
      authorId: user.authorId,
      createdOn: new Date(),
      replies: [],
    }
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment
    )
    setComments(updatedComments)
  }

  return (
    <>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
            onAddReply={handleAddReply}
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
