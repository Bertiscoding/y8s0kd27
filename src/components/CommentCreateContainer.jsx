import { useState } from 'react'
import { useUser } from '../context/UserContext'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import ActionButton from './ActionButton'

const CommentCreateContainer = ({ onAddComment }) => {
  const { user } = useUser()

  const [formOpen, setFormOpen] = useState(true)
  const [newCommentText, setNewCommentText] = useState('')

  const toggleForm = () => (setFormOpen(!formOpen))

  const handleFormChange = (e) => {
    setNewCommentText(e.target.value)
  }

  const handleSaveNewComment = (e) => {
    e.preventDefault()
    const trimmedCommentText = newCommentText.trim()
    if (!trimmedCommentText) return
  
    const newComment = {
      id: Date.now().toString(),
      text: trimmedCommentText,
      authorFirstName: user?.authorFirstName || 'Dan',
      authorLastName: user?.authorLastName || 'Druff',
      authorId: user?.authorId || 0,
      edited: false,
      createdOn: new Date(),
      replies: [],
    }
  
    onAddComment(newComment)
    setNewCommentText('')
    setFormOpen(false)
  }

  return (
    <>
      <div className='h-[30px] flex items-end bg-gradient-to-t from-brand-primary-dark-II via-brand-primary-dark-II to-transparent rounded-br-md rounded-bl-md'>
        <ActionButton
          btnClassNames="text-brand-primary-dark w-22 h-4 pl-base"
          disabled={false}
          onClick={toggleForm}
        >
          <span className='mr-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3"
              transform={formOpen ? 'scale(1, 1)' : 'scale(1, -1)'}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
          <span>{formOpen ? 'Close' : 'Open'} form</span>
        </ActionButton>
      </div>
      { formOpen && (
          <div className='flex flex-col items-end p-base rounded-br-md rounded-bl-md justify-end bg-brand-primary-dark-II'>
            <div className="pb-base w-full">
              <CommentForm
                id={Date.now().toString()}
                text={newCommentText}
                placeholder='What is on your mind...'
                onChange={handleFormChange}
              />
            </div>
            <button
              disabled={!newCommentText}
              onClick={handleSaveNewComment}
              className='bg-brand-primary disabled:bg-brand-grey-light rounded-md text-white font-semibold fit-content px-5 py-3'>
              Post comment
            </button>
          </div>
        ) }
    </>
  )
}

CommentCreateContainer.propTypes = {
  onAddComment: PropTypes.func,
}

export default CommentCreateContainer
