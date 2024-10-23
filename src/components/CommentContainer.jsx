import { useComments } from '../context/CommentsContext'
import Comment from './Comment'
import CommentCreateContainer from './CommentCreateContainer'

const CommentContainer = () => {
  const { comments, setComments } = useComments()

  const handleAddComment = (newComment) => {
    setComments((prevComments) => {
      const addedComments = [...prevComments, newComment]
      return addedComments.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn))
    })
  } 

  return (
    <>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            {...comment}
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
