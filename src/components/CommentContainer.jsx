import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import { otherComments } from '../db'

const CommentContainer = () => {
  const [comments, setComments] = useState(otherComments)

  useEffect(() => {
    // if comments.length check
    const sortedComments = comments.sort((a, b) => { // not working!
      return new Date(b.createdOn) - new Date(a.createdOn)
    })
    setComments(sortedComments)
  // eslint-disable-next-line
  }, [])

  // also get comments from localStorage

  return (
    <div className='bg-white rounded-md p-base w-[425px] h-[90vh] overflow-y-scroll mx-auto'>
      {
        comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))
      }
    </div>
  )
}

CommentContainer.propTypes = {
  comments: PropTypes.array,
}

export default CommentContainer
