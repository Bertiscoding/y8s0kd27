import { useComments } from '../context/CommentsContext'
import Comment from './Comment'
import CommentCreateContainer from './CommentCreateContainer'

const CommentContainer = () => {
  const { comments, addComment } = useComments()

  const renderComments = (comments) => {
    if (!comments || comments.length === 0) {
      return <p>No comments available</p>
    }
  
    return comments.map((comment) => (
      <Comment
        key={comment.id}
        {...comment}
      />
    ))
  }

  return (
    <>
      {renderComments(comments)}
      <div className="absolute w-full bottom-0 left-0">
        <CommentCreateContainer onAddComment={addComment} />
      </div>
    </>
  )
}

export default CommentContainer
